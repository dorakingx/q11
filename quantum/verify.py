#!/usr/bin/env python
"""Q11 independent Python/Qiskit verification.

Replays every fixture produced by the TypeScript engine (fixtures/cases/*.json, fixtures/missions.json)
with the independent pure-Python symplectic implementation in qollab/q11, then cross-checks that
implementation itself against qiskit.quantum_info (Clifford/Pauli/Operator/StabilizerState) and against
shot-based Aer runs of the actual mission circuits. Writes reports/quantum-verification.json and
reports/QUANTUM_VERIFICATION.md. Exit code 1 on any mismatch.

Run from anywhere:  .venv/bin/python quantum/verify.py
"""

from __future__ import annotations

import datetime as _dt
import hashlib
import json
import os
import platform
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(ROOT, "qollab"))

import numpy as np  # noqa: E402
import qiskit  # noqa: E402
import qiskit_aer  # noqa: E402
import qiskit_ionq  # noqa: E402
from qiskit import qasm3  # noqa: E402
from qiskit.quantum_info import Clifford, Operator, Statevector  # noqa: E402
from qiskit.quantum_info import Pauli as QPauli  # noqa: E402
from qiskit_aer import AerSimulator  # noqa: E402

import q11  # noqa: E402
from q11 import circuits, codes, decoder, gf2, missions, verdict  # noqa: E402
from q11.pauli import Pauli, propagate  # noqa: E402

# Q11_FIXTURES_DIR / Q11_REPORTS_DIR exist only so a negative control (tampered fixture copy) can be run
# without touching the real fixtures or reports.
FIXTURES = os.environ.get("Q11_FIXTURES_DIR") or os.path.join(ROOT, "fixtures")
CASES = os.path.join(FIXTURES, "cases")
REPORTS = os.environ.get("Q11_REPORTS_DIR") or os.path.join(ROOT, "reports")
SHOTS = 2000
SEED = 20261010
VERDICT_SAMPLE_STRIDE = 5  # every 5th of the 1000 seeded verdict cases -> 200 StabilizerState checks

report = {
    "generatedAt": None,
    "versions": {
        "python": platform.python_version(),
        "qiskit": qiskit.__version__,
        "qiskit_aer": qiskit_aer.__version__,
        "qiskit_ionq": qiskit_ionq.__version__,
        "numpy": np.__version__,
        "q11_python_engine": q11.__version__,
    },
    "model": "Clifford+Pauli educational model, perfect syndrome extraction, no measurement noise",
    "totals": {"casesCompared": 0, "mismatches": 0},
    "perFile": {},
    "codeInvariants": {},
    "stabilizerStateChecks": {},
    "aerRuns": [],
    "notes": [],
}
mismatch_log = []


def tally(section: str, compared: int, mismatches: int, **extra):
    entry = report["perFile"].setdefault(section, {"compared": 0, "mismatches": 0})
    entry["compared"] += compared
    entry["mismatches"] += mismatches
    entry.update(extra)
    report["totals"]["casesCompared"] += compared
    report["totals"]["mismatches"] += mismatches


def fail(section: str, case_id, detail: str):
    mismatch_log.append({"section": section, "case": case_id, "detail": detail})
    if len(mismatch_log) <= 50:
        print("MISMATCH [%s] case %s: %s" % (section, case_id, detail))


def load(name: str) -> dict:
    with open(os.path.join(CASES, name), "r", encoding="utf-8") as fh:
        return json.load(fh)


def paulis_equal_up_to_phase(a: np.ndarray, b: np.ndarray) -> bool:
    idx = np.unravel_index(np.argmax(np.abs(b)), b.shape)
    if abs(b[idx]) < 1e-9:
        return np.allclose(a, b)
    phase = a[idx] / b[idx]
    return abs(abs(phase) - 1) < 1e-9 and np.allclose(a, phase * b, atol=1e-9)


# ------------------------------------------------------------------------------------------------------
# 0. code invariants (independent of fixtures)
# ------------------------------------------------------------------------------------------------------

def check_code_invariants():
    out = {}
    for cid, code in codes.all_codes().items():
        hx, hz = code.css_matrices()
        info = {
            "n": code.n,
            "k": code.k,
            "checks": len(code.checks),
            "rank": gf2.rank([c.pauli.symplectic() for c in code.checks]) if code.checks else 0,
            "hxHzTzero": all(sum(a & b for a, b in zip(rx, rz)) % 2 == 0 for rx in hx for rz in hz),
        }
        if cid == "rsc3":
            info["bruteForceDistance"] = code.min_distance_bruteforce()
            info["geometryAgrees"] = True  # get_code() asserted it already; reaching here means it passed
            info["rankHx+rankHz"] = gf2.rank(hx) + gf2.rank(hz)
            # all 27 weight-1 Paulis + identity are corrected by the lookup decoder (28 patterns)
            ok = 0
            for q in range(code.n):
                for letter in "XYZ":
                    e = Pauli.single(code.n, q, letter)
                    c = decoder.decode(code, verdict.syndrome(code, e))
                    if verdict.classify(code, c.compose(e))[0] == verdict.SUCCESS:
                        ok += 1
            ok += 1 if verdict.classify(code, decoder.decode(code, [0] * 8))[0] == verdict.SUCCESS else 0
            info["weight1Corrected"] = ok
            if info["bruteForceDistance"] != 3 or ok != 28 or info["rankHx+rankHz"] != 8:
                fail("codeInvariants", cid, json.dumps(info))
                tally("codeInvariants", 1, 1)
            else:
                tally("codeInvariants", 1, 0)
        elif cid == "rep3":
            # distance 3 against X noise only; a single Z is a logical error (documented limitation)
            x_only_logical = min(
                (Pauli.from_support(3, "X", qs).weight() for qs in ([0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2])
                 if not any(verdict.syndrome(code, Pauli.from_support(3, "X", qs))) and not code.in_stabilizer_group(Pauli.from_support(3, "X", qs))),
                default=None,
            )
            info["xOnlyDistance"] = x_only_logical
            info["fullDistanceBruteForce"] = code.min_distance_bruteforce()
            good = x_only_logical == 3 and info["fullDistanceBruteForce"] == 1
            if not good:
                fail("codeInvariants", cid, json.dumps(info))
            tally("codeInvariants", 1, 0 if good else 1)
        else:
            tally("codeInvariants", 1, 0)
        out[cid] = info
    report["codeInvariants"] = out
    print("code invariants:", json.dumps(out))


# ------------------------------------------------------------------------------------------------------
# (a) replay fixtures with the symplectic engine
# ------------------------------------------------------------------------------------------------------

def replay_propagation_file(name: str):
    data = load(name)
    bad = 0
    for c in data["cases"]:
        got = propagate(Pauli.from_string(c["input"]), c["circuit"])
        if str(got) != c["output"]:
            bad += 1
            fail(name, c["id"], "symplectic %s -> %s, fixture %s" % (c["input"], got, c["output"]))
    tally(name + " (symplectic)", len(data["cases"]), bad)
    return data


def replay_verdict_file(name: str):
    data = load(name)
    bad = 0
    for c in data["cases"]:
        code = codes.get_code(c["code"])
        ev = verdict.evaluate(code, Pauli.from_string(c["error"]), Pauli.from_string(c["correction"]))
        problems = []
        for key in ("residual", "residualWeight", "syndromeE", "syndromeR", "verdict", "logicalFlip"):
            if key in c and ev[key] != c[key]:
                problems.append("%s: python %r fixture %r" % (key, ev[key], c[key]))
        if "syndrome" in c and ev["syndromeE"] != c["syndrome"]:
            problems.append("syndrome: python %r fixture %r" % (ev["syndromeE"], c["syndrome"]))
        if problems:
            bad += 1
            fail(name, c["id"], "; ".join(problems))
    tally(name + " (symplectic)", len(data["cases"]), bad)
    return data


def replay_missions():
    bad = 0
    details = []
    for m in missions.load_missions():
        code = codes.get_code(m["code"])
        e = Pauli.from_string(m["challenge"]["error"])
        gates = m["challenge"]["circuit"]
        ep = propagate(e, gates)
        syn = verdict.syndrome(code, ep)
        exp = m["expected"]
        fx_corr = Pauli.from_string(exp["minWeightCorrection"])
        fx_verdict = verdict.evaluate(code, e, fx_corr, gates)["verdict"]
        ref = circuits.reference_correction(m)
        problems = []
        if syn != exp["syndrome"]:
            problems.append("syndrome python %r fixture %r" % (syn, exp["syndrome"]))
        if str(ep) != exp["propagated"]:
            problems.append("propagated python %s fixture %s" % (ep, exp["propagated"]))
        if fx_verdict != exp["minWeightVerdict"]:
            problems.append("verdict of fixture correction: python %s fixture %s" % (fx_verdict, exp["minWeightVerdict"]))
        if fx_corr.weight() != ref.weight():
            problems.append("fixture correction weight %d, python min weight %d" % (fx_corr.weight(), ref.weight()))
        if verdict.syndrome(code, fx_corr) != syn:
            problems.append("fixture correction does not produce the syndrome")
        equivalent = decoder.equivalent_corrections(code, fx_corr, ref)
        details.append({
            "mission": m["id"], "syndrome": syn, "propagated": str(ep),
            "fixtureMinWeightCorrection": str(fx_corr), "pythonReferenceCorrection": str(ref),
            "exactMatch": str(fx_corr) == str(ref), "stabilizerEquivalent": equivalent,
            "fixtureVerdict": fx_verdict, "pythonReferenceVerdict": verdict.evaluate(code, e, ref, gates)["verdict"],
        })
        if problems:
            bad += 1
            fail("missions.json", m["id"], "; ".join(problems))
    tally("missions.json expected (symplectic)", len(details), bad, missions=details)
    # training captions that state "<P> becomes <Q>" are science claims shown to the player: check them
    import re

    claims = 0
    cbad = 0
    for m in missions.load_missions():
        for t in m.get("training", []):
            for a, b in re.findall(r"\b([IXYZ]{2,9}) becomes ([IXYZ]{2,9})\b", t.get("caption", "")):
                claims += 1
                got = propagate(Pauli.from_string(a), t["circuit"])
                if str(got) != b or str(Pauli.from_string(t["error"])) != a:
                    cbad += 1
                    fail("training captions", m["id"], "caption says %s -> %s, engine %s -> %s" % (a, b, t["error"], got))
    tally("training captions (symplectic)", claims, cbad)


# ------------------------------------------------------------------------------------------------------
# (b) cross-check propagation with qiskit.quantum_info
# ------------------------------------------------------------------------------------------------------

def qiskit_crosscheck_propagation(name: str, data: dict):
    """Two independent Qiskit checks per case:
    1. Pauli(label).evolve(Clifford(U), frame='s') — Schrödinger frame returns U P U^dagger, which is the
       forward propagation E' with U E = E' U (frame='h' would give U^dagger P U, the *backward* map).
       Qiskit labels put qubit 0 on the right, so labels are reversed on the way in and out; the phase
       of the evolved Pauli is dropped before comparing.
    2. Full matrices: Operator(U) · E · Operator(U)^dagger == E' up to a global phase."""
    bad_clifford = 0
    bad_operator = 0
    for c in data["cases"]:
        inp = Pauli.from_string(c["input"])
        want = c["output"]
        qc = circuits.circuit_from_gates(c["n"], c["circuit"])
        evolved = QPauli(inp.to_qiskit_label()).evolve(Clifford(qc), frame="s")
        got = Pauli.from_qiskit_label(evolved.to_label())
        if str(got) != want:
            bad_clifford += 1
            fail(name + " (Clifford evolve)", c["id"], "%s -> %s, fixture %s" % (c["input"], got, want))
        u = Operator(qc).data
        lhs = u @ QPauli(inp.to_qiskit_label()).to_matrix() @ u.conj().T
        rhs = QPauli(Pauli.from_string(want).to_qiskit_label()).to_matrix()
        if not paulis_equal_up_to_phase(lhs, rhs):
            bad_operator += 1
            fail(name + " (Operator)", c["id"], "U E U^dag != %s" % want)
    tally(name + " (qiskit Clifford evolve)", len(data["cases"]), bad_clifford)
    tally(name + " (qiskit Operator matrix)", len(data["cases"]), bad_operator)


# ------------------------------------------------------------------------------------------------------
# (c) StabilizerState cross-check of verdicts on the six logical eigenstates
# ------------------------------------------------------------------------------------------------------

_SS_CACHE = {}


def logical_eigenstate(code, which):
    key = (code.id, which)
    if key not in _SS_CACHE:
        _SS_CACHE[key] = circuits.stabilizer_state(code, which)
    return _SS_CACHE[key]


def expect_bit(state, qpauli):
    v = state.expectation_value(qpauli)
    v = complex(v).real
    if abs(v - 1) < 1e-9:
        return 0
    if abs(v + 1) < 1e-9:
        return 1
    return None  # not an eigenstate


def stabilizer_state_check(section: str, cases):
    """For every case and each of the six logical eigenstates: evolve by E, read the syndrome from the
    expectation values of the checks, evolve by C, confirm the residual syndrome and the logical flips."""
    bad = 0
    states_checked = 0
    for c in cases:
        code = codes.get_code(c["code"])
        e = Pauli.from_string(c["error"])
        corr = Pauli.from_string(c["correction"])
        qe = QPauli(e.to_qiskit_label())
        qc_ = QPauli(corr.to_qiskit_label())
        check_ops = [QPauli(ch.pauli.to_qiskit_label()) for ch in code.checks]
        problems = []
        for which in circuits.PREP_STATES:
            st = logical_eigenstate(code, which)
            after_e = st.evolve(qe)
            syn = [expect_bit(after_e, op) for op in check_ops]
            if syn != c["syndromeE"]:
                problems.append("%s: syndrome(E) %r vs %r" % (which, syn, c["syndromeE"]))
            after_c = after_e.evolve(qc_)
            syn_r = [expect_bit(after_c, op) for op in check_ops]
            if syn_r != c["syndromeR"]:
                problems.append("%s: syndrome(R) %r vs %r" % (which, syn_r, c["syndromeR"]))
            # logical check: the prepared eigenstate's own logical operator must flip exactly per logicalFlip
            basis = circuits._PREP_BASIS[which]
            base = circuits._PREP_SIGN_BIT[which]
            for i in range(code.k):
                _bits, qop = circuits.logical_operator(code, basis, i)
                flips = c["logicalFlip"]
                if basis == "Z":
                    want_flip = flips["x"][i]
                elif basis == "X":
                    want_flip = flips["z"][i]
                else:
                    want_flip = flips["x"][i] != flips["z"][i]
                got = expect_bit(after_c, qop)
                want = base ^ int(want_flip)
                if c["verdict"] in (verdict.SUCCESS, verdict.LOGICAL_ERROR):
                    # in the code space: Pauli R acts as a logical operator -> eigenvalue is exact
                    if got != want:
                        problems.append("%s: logical %s bit %r, predicted %r" % (which, basis, got, want))
                    if c["verdict"] == verdict.SUCCESS and want_flip:
                        problems.append("success case claims a flip")
                else:
                    # detectable: still a Pauli acting on a stabilizer state -> deterministic eigenvalue
                    if got != want:
                        problems.append("%s: (detectable) logical %s bit %r, predicted %r" % (which, basis, got, want))
            states_checked += 1
        if problems:
            bad += 1
            fail(section, c["id"], "; ".join(problems[:4]))
    tally(section + " (qiskit StabilizerState, 6 eigenstates each)", len(cases), bad, statesChecked=states_checked)
    report["stabilizerStateChecks"][section] = {"cases": len(cases), "eigenstatesChecked": states_checked, "mismatches": bad}


# ------------------------------------------------------------------------------------------------------
# (d) Aer: preparation check, propagation statevector check, full mission circuits with shots
# ------------------------------------------------------------------------------------------------------

def aer_statevector(qc):
    sim = AerSimulator(method="statevector")
    c = qc.copy()
    c.save_statevector()
    res = sim.run(c, shots=1, seed_simulator=SEED).result()
    return Statevector(res.get_statevector(c))


def aer_check_preparation():
    bad = 0
    n = 0
    for cid, code in codes.all_codes().items():
        for which in circuits.PREP_STATES:
            n += 1
            qc = circuits.prepare_logical_state(code, which)
            sv = aer_statevector(qc)
            for label in circuits.stabilizer_labels(code, which):
                sign = -1 if label.startswith("-") else 1
                v = complex(sv.expectation_value(QPauli(label.lstrip("-")))).real * sign
                if abs(v - 1) > 1e-9:
                    bad += 1
                    fail("prep", "%s/%s" % (cid, which), "generator %s expectation %.3f" % (label, v))
                    break
    tally("logical eigenstate preparation (Aer statevector, all generators +1)", n, bad)


def aer_check_propagation_missions():
    """For every propagation mission (challenge + training circuits): U E |psi> == E' U |psi> up to global
    phase on all six eigenstates (Aer statevector), and the operator identity U E U^dag == E'."""
    bad = 0
    n = 0
    for m in missions.load_missions():
        if m["kind"] != "propagation":
            continue
        code = codes.get_code(m["code"])
        steps = [("challenge", m["challenge"])] + [("training %d" % i, t) for i, t in enumerate(m.get("training", []))]
        for label, step in steps:
            e = Pauli.from_string(step["error"])
            ep = propagate(e, step["circuit"])
            u = circuits.circuit_from_gates(code.n, step["circuit"])
            for which in circuits.PREP_STATES:
                n += 1
                prep = circuits.prepare_logical_state(code, which)
                a = prep.copy()
                circuits.inject_error(a, e)
                a.compose(u, inplace=True)
                b = prep.copy()
                b.compose(u, inplace=True)
                circuits.inject_error(b, ep)
                if not aer_statevector(a).equiv(aer_statevector(b)):
                    bad += 1
                    fail("propagation missions (Aer)", "%s/%s/%s" % (m["id"], label, which), "U E|psi> != E' U|psi>")
            um = Operator(u).data
            lhs = um @ QPauli(e.to_qiskit_label()).to_matrix() @ um.conj().T
            if not paulis_equal_up_to_phase(lhs, QPauli(ep.to_qiskit_label()).to_matrix()):
                bad += 1
                fail("propagation missions (Operator)", "%s/%s" % (m["id"], label), "U E U^dag != E'")
            n += 1
    tally("propagation missions (Aer statevector + Operator)", n, bad)


def circuit_hash(qc) -> str:
    return hashlib.sha256(qasm3.dumps(qc).encode("utf-8")).hexdigest()


def aer_run_missions():
    sim = AerSimulator()
    bad = 0
    runs = 0
    for m in missions.load_missions():
        code = codes.get_code(m["code"])
        e = Pauli.from_string(m["challenge"]["error"])
        ep = propagate(e, m["challenge"]["circuit"])
        ref = circuits.reference_correction(m)
        candidates = [("reference (min-weight / predicted frame)", str(ref)), ("identity (no dispatch)", "I" * code.n)]
        if str(ep) != str(ref):
            candidates.append(("counterfactual: exact propagated error", str(ep)))
        if m["kind"] == "dispatch":
            fx = m["expected"]["minWeightCorrection"]
            if fx != str(ref):
                candidates.append(("fixture min-weight correction (TS tie-break)", fx))
        seen = set()
        for label, corr in candidates:
            if corr in seen:
                continue
            seen.add(corr)
            for prep, basis in (("0", "Z"), ("+", "X"), ("+i", "Y")):
                qc = circuits.build_mission_circuit(m, corr, prep=prep, readout_basis=basis)
                t0 = time.time()
                result = sim.run(qc, shots=SHOTS, seed_simulator=SEED).result()
                counts = result.get_counts()
                analysis = circuits.analyze_counts(counts, m, corr, basis, prep)
                ok = bool(analysis["matchesPrediction"]) and analysis["syndromeDeterministic"] and analysis["logicalDeterministic"]
                runs += 1
                if not ok:
                    bad += 1
                    fail("aer missions", "%s/%s/%s%s" % (m["id"], corr, prep, basis), json.dumps(analysis["matches"]))
                report["aerRuns"].append({
                    "mission": m["id"],
                    "correctionLabel": label,
                    "correction": corr,
                    "prep": prep,
                    "readoutBasis": basis,
                    "backend": "AerSimulator (local, ideal, method=%s)" % result.results[0].metadata.get("method", "automatic"),
                    "source": "local-simulator",
                    "shots": SHOTS,
                    "seed": SEED,
                    "numQubits": qc.num_qubits,
                    "depth": qc.depth(),
                    "circuitSha256": circuit_hash(qc),
                    "syndromeHistogram": analysis["syndromeHistogram"],
                    "logicalBits": analysis["logicalBits"],
                    "logicalHistograms": analysis["logicalHistograms"],
                    "predicted": {
                        "verdict": analysis["prediction"]["verdict"],
                        "syndrome": analysis["prediction"]["syndrome"],
                        "logicalBits": analysis["prediction"]["expected"]["logicalBits"],
                        "residual": analysis["prediction"]["residual"],
                    },
                    "matches": analysis["matches"],
                    "pass": ok,
                    "wallSeconds": round(time.time() - t0, 3),
                })
    tally("mission circuits on AerSimulator (shots=%d, deterministic syndrome + logical readout)" % SHOTS, runs, bad)



def basic_simulator_and_ionq_serialization():
    """Qollab's built-in backend is qiskit's BasicSimulator and its remote backends go through qiskit-ionq.
    Offline checks only: (1) every mission circuit converts with qiskit_ionq's qis-gateset serializer (no job,
    no network, no credentials); (2) the reference-correction circuit runs on BasicSimulator (200 shots) with
    the predicted deterministic syndrome and logical bit."""
    from qiskit.providers.basic_provider import BasicSimulator
    from qiskit_ionq.helpers import qiskit_circ_to_ionq_circ

    bad_ser = 0
    n_ser = 0
    bad_bs = 0
    n_bs = 0
    bs = BasicSimulator()
    for m in missions.load_missions():
        code = codes.get_code(m["code"])
        ref = str(circuits.reference_correction(m))
        for corr in {ref, "I" * code.n, m["challenge"]["error"] if m["kind"] == "dispatch" else ref}:
            for prep, basis in (("0", "Z"), ("+", "X"), ("+i", "Y")):
                qc = circuits.build_mission_circuit(m, corr, prep=prep, readout_basis=basis)
                n_ser += 1
                try:
                    ionq_gates, _nq, _meas = qiskit_circ_to_ionq_circ(qc, gateset="qis")
                    if not ionq_gates:
                        raise ValueError("empty IonQ gate list")
                except Exception as exc:  # noqa: BLE001 - report any serializer failure as a mismatch
                    bad_ser += 1
                    fail("qiskit-ionq serialization", "%s/%s/%s%s" % (m["id"], corr, prep, basis), repr(exc))
        qc = circuits.build_mission_circuit(m, ref, prep="0", readout_basis="Z")
        n_bs += 1
        counts = bs.run(qc, shots=200, seed_simulator=SEED).result().get_counts()
        analysis = circuits.analyze_counts(counts, m, ref, "Z", "0")
        ok = bool(analysis["matchesPrediction"]) and analysis["syndromeDeterministic"] and analysis["logicalDeterministic"]
        if not ok:
            bad_bs += 1
            fail("BasicSimulator", m["id"], json.dumps(analysis["matches"]))
        report["aerRuns"].append({
            "mission": m["id"], "correctionLabel": "reference (min-weight / predicted frame)", "correction": ref,
            "prep": "0", "readoutBasis": "Z", "backend": "qiskit BasicSimulator (local, ideal; same class as Qollab's built-in simulator)",
            "source": "local-simulator", "shots": 200, "seed": SEED, "numQubits": qc.num_qubits, "depth": qc.depth(),
            "circuitSha256": circuit_hash(qc), "syndromeHistogram": analysis["syndromeHistogram"], "logicalBits": analysis["logicalBits"],
            "logicalHistograms": analysis["logicalHistograms"],
            "predicted": {"verdict": analysis["prediction"]["verdict"], "syndrome": analysis["prediction"]["syndrome"],
                          "logicalBits": analysis["prediction"]["expected"]["logicalBits"], "residual": analysis["prediction"]["residual"]},
            "matches": analysis["matches"], "pass": ok, "wallSeconds": None,
        })
    tally("mission circuits serialize with qiskit-ionq (qis gateset, offline, no job)", n_ser, bad_ser)
    tally("mission circuits on qiskit BasicSimulator (Qollab built-in class, 200 shots)", n_bs, bad_bs)


# ------------------------------------------------------------------------------------------------------
# (e) reports
# ------------------------------------------------------------------------------------------------------

def write_reports():
    os.makedirs(REPORTS, exist_ok=True)
    report["generatedAt"] = _dt.datetime.now(_dt.timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
    report["mismatchLog"] = mismatch_log[:200]
    report["pass"] = report["totals"]["mismatches"] == 0
    with open(os.path.join(REPORTS, "quantum-verification.json"), "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=2)
        fh.write("\n")
    lines = []
    lines.append("# Q11 quantum verification report")
    lines.append("")
    lines.append("Generated %s by `quantum/verify.py` (%s)." % (report["generatedAt"], "**PASS**" if report["pass"] else "**FAIL**"))
    lines.append("")
    lines.append("Independent Python/Qiskit reference (`qollab/q11`, written from first principles) replayed the fixtures")
    lines.append("emitted by the TypeScript engine, then cross-checked itself against `qiskit.quantum_info` and Aer.")
    lines.append("")
    lines.append("| Item | Value |")
    lines.append("|---|---|")
    for k, v in report["versions"].items():
        lines.append("| %s | %s |" % (k, v))
    lines.append("| model | %s |" % report["model"])
    lines.append("| total comparisons | %d |" % report["totals"]["casesCompared"])
    lines.append("| mismatches | %d |" % report["totals"]["mismatches"])
    lines.append("")
    lines.append("## Per section")
    lines.append("")
    lines.append("| Section | Compared | Mismatches |")
    lines.append("|---|---:|---:|")
    for name, entry in report["perFile"].items():
        lines.append("| %s | %d | %d |" % (name, entry["compared"], entry["mismatches"]))
    lines.append("")
    lines.append("## Code invariants")
    lines.append("")
    lines.append("```json")
    lines.append(json.dumps(report["codeInvariants"], indent=2))
    lines.append("```")
    lines.append("")
    lines.append("## Missions: fixture min-weight correction vs Python reference")
    lines.append("")
    lines.append("| Mission | Syndrome | Fixture correction | Python reference | Exact | Stabilizer-equivalent | Verdict (fixture corr.) |")
    lines.append("|---|---|---|---|---|---|---|")
    for d in report["perFile"].get("missions.json expected (symplectic)", {}).get("missions", []):
        lines.append("| %s | %s | `%s` | `%s` | %s | %s | %s |" % (
            d["mission"], "".join(str(b) for b in d["syndrome"]) or "(none)", d["fixtureMinWeightCorrection"],
            d["pythonReferenceCorrection"], "yes" if d["exactMatch"] else "no", "yes" if d["stabilizerEquivalent"] else "no", d["fixtureVerdict"]))
    lines.append("")
    lines.append("Where the two decoders disagree the fixture correction was still verified to have minimum weight and the")
    lines.append("right syndrome; the difference is tie-breaking between degenerate (and, for `two-kinds-of-trouble`,")
    lines.append("*inequivalent*) minimum-weight explanations. Both candidates were run on Aer (see below).")
    lines.append("")
    lines.append("## Mission runs on local ideal simulators (Aer %d shots; BasicSimulator 200 shots; seed %d)" % (SHOTS, SEED))
    lines.append("")
    lines.append("All measurements at the end of the circuit (ancillas, then data). Source label: **Local (Aer)**. No cloud,")
    lines.append("no QPU, no IonQ job was run by this script.")
    lines.append("")
    lines.append("| Mission | Correction | Prep/readout | Qubits | Backend | Syndrome histogram | Logical bits | Predicted verdict | Pass |")
    lines.append("|---|---|---|---:|---|---|---|---|---|")
    for r in report["aerRuns"]:
        lines.append("| %s | `%s` (%s) | %s/%s | %d | %s | %s | %s | %s | %s |" % (
            r["mission"], r["correction"], r["correctionLabel"], r["prep"], r["readoutBasis"], r["numQubits"], r["backend"].split(" (")[0],
            json.dumps(r["syndromeHistogram"]), json.dumps(r["logicalBits"]), r["predicted"]["verdict"], "yes" if r["pass"] else "NO"))
    lines.append("")
    lines.append("## What is NOT verified here")
    lines.append("")
    lines.append("- No IonQ simulator or hardware result: those runs happen inside Qollab (one job per Run) and are recorded separately, labelled Live/Cached.")
    lines.append("- No measurement noise, no non-Clifford gates, no coherent errors: the model is Clifford + Pauli with perfect syndrome extraction.")
    lines.append("- Counts agreement is evidence under the ideal model, not a proof of circuit equivalence; the exact checks are the algebraic ones above.")
    lines.append("")
    lines.append("## Commands")
    lines.append("")
    lines.append("```")
    lines.append("npm run verify:quantum          # gen-fixtures -> sync data -> this script")
    lines.append(".venv/bin/python quantum/verify.py")
    lines.append("```")
    if mismatch_log:
        lines.append("")
        lines.append("## Mismatches")
        lines.append("")
        for mm in mismatch_log[:200]:
            lines.append("- [%s] %s: %s" % (mm["section"], mm["case"], mm["detail"]))
    with open(os.path.join(REPORTS, "QUANTUM_VERIFICATION.md"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")


def main() -> int:
    t0 = time.time()
    print("Q11 quantum verification — python %s qiskit %s aer %s ionq %s numpy %s" % tuple(report["versions"][k] for k in ("python", "qiskit", "qiskit_aer", "qiskit_ionq", "numpy")))
    check_code_invariants()
    gates = replay_propagation_file("gates-exhaustive.json")
    prop = replay_propagation_file("propagation-1000.json")
    single = replay_verdict_file("rsc3-single.json")
    logical = replay_verdict_file("rsc3-logical.json")
    verdicts = replay_verdict_file("verdicts-1000.json")
    replay_missions()
    qiskit_crosscheck_propagation("gates-exhaustive.json", gates)
    qiskit_crosscheck_propagation("propagation-1000.json", prop)
    stabilizer_state_check("rsc3-single.json", single["cases"])
    stabilizer_state_check("rsc3-logical.json", logical["cases"])
    sample = [c for c in verdicts["cases"] if c["id"] % VERDICT_SAMPLE_STRIDE == 0]
    stabilizer_state_check("verdicts-1000.json sample (every %dth, %d cases)" % (VERDICT_SAMPLE_STRIDE, len(sample)), sample)
    aer_check_preparation()
    aer_check_propagation_missions()
    aer_run_missions()
    basic_simulator_and_ionq_serialization()
    write_reports()
    t = report["totals"]
    print("")
    for name, entry in report["perFile"].items():
        print("  %-95s %6d compared %4d mismatches" % (name, entry["compared"], entry["mismatches"]))
    print("")
    print("TOTAL %d comparisons, %d mismatches, %d Aer mission runs, %.1fs -> %s" % (
        t["casesCompared"], t["mismatches"], len(report["aerRuns"]), time.time() - t0, "PASS" if t["mismatches"] == 0 else "FAIL"))
    print("reports: reports/quantum-verification.json, reports/QUANTUM_VERIFICATION.md")
    return 0 if t["mismatches"] == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
