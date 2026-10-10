"""Qiskit circuit builders for Q11 missions, plus prediction and counts analysis.

Pipeline of one mission circuit (ALL measurements at the very end — no mid-circuit measurement, reset or
classical feed-forward is needed, which keeps it runnable on every Qollab backend):

    prepare logical eigenstate  ->  inject the mission's true error E  ->  mission Clifford circuit U
    ->  syndrome extraction (one fresh ancilla per check)  ->  apply the chosen correction C
    ->  uncompute U (U^dagger, propagation missions only)  ->  measure ancillas, then data

Bit order. Qiskit prints a counts key with classical bit 0 at the RIGHT end. We allocate a single
classical register ``c`` of m + n bits: c[j] = ancilla of ``code.checks[j]`` (j < m), c[m + q] = data
qubit q. Reversing a key (``key[::-1]``) therefore yields our usual qubit-0-first order; see
:func:`split_key`. Pauli *labels* handed to ``qiskit.quantum_info`` are likewise reversed
(``Pauli.to_qiskit_label``).

Readout. ``readout_basis`` is 'Z', 'X' or 'Y'. Each data qubit is rotated into the basis of the letter
the corresponding logical operator has on it (Z: none, X: H, Y: Sdg then H; qubits outside the support
of the logical operator are measured in Z for basis Z/X and in the Y basis for Y). The logical bit of
logical qubit i is the parity of the measured bits over the support of that logical operator; it is
deterministic only when the preparation and the readout refer to the same logical basis.
"""

from __future__ import annotations

from qiskit import ClassicalRegister, QuantumCircuit, QuantumRegister
from qiskit.quantum_info import Pauli as QPauli
from qiskit.quantum_info import StabilizerState

from . import ENGINE_VERSION
from . import decoder as _decoder
from . import missions as _missions
from . import verdict as _verdict
from .codes import StabilizerCode, get_code
from .pauli import Pauli, inverse_circuit, propagate

PREP_STATES = ("0", "1", "+", "-", "+i", "-i")
_PREP_BASIS = {"0": "Z", "1": "Z", "+": "X", "-": "X", "+i": "Y", "-i": "Y"}
_PREP_SIGN_BIT = {"0": 0, "1": 1, "+": 0, "-": 1, "+i": 0, "-i": 1}


# ---- logical operators -----------------------------------------------------------------------------------

def logical_y(code: StabilizerCode, i: int):
    """Logical Y_i = i * X_i * Z_i as a (Pauli, qiskit phase-correct label) pair.

    qiskit's Pauli keeps track of the phase, so the sign of the stabilizer generator used to prepare
    the +1 eigenstate of logical Y is exact (for rsc3: i * XXXIIIIII * ZIIZIIZII = YXXZIIZII, phase +1)."""
    qx = QPauli(code.logical_x[i].to_qiskit_label())
    qz = QPauli(code.logical_z[i].to_qiskit_label())
    qy = 1j * qx.dot(qz)
    bits = Pauli.from_qiskit_label(qy.to_label())
    return bits, qy


def logical_operator(code: StabilizerCode, basis: str, i: int = 0):
    """(Pauli bits, qiskit Pauli with correct phase) of logical X/Y/Z number i."""
    if basis == "Z":
        p = code.logical_z[i]
        return p, QPauli(p.to_qiskit_label())
    if basis == "X":
        p = code.logical_x[i]
        return p, QPauli(p.to_qiskit_label())
    if basis == "Y":
        return logical_y(code, i)
    raise ValueError("basis must be X, Y or Z")


def stabilizer_labels(code: StabilizerCode, which: str):
    """Qiskit-order generator labels (with sign) whose unique common +1 eigenstate is the logical
    eigenstate ``which`` on every logical qubit."""
    if which not in PREP_STATES:
        raise ValueError("which must be one of %r" % (PREP_STATES,))
    labels = [c.pauli.to_qiskit_label() for c in code.checks]
    basis = _PREP_BASIS[which]
    sign = "-" if _PREP_SIGN_BIT[which] else ""
    for i in range(code.k):
        _bits, qp = logical_operator(code, basis, i)
        label = qp.to_label()  # may carry an explicit phase prefix; logical_y is phase-free by construction
        if label[0] in "+-i":
            raise ValueError("unexpected phase on logical operator label %r" % label)
        labels.append(sign + label)
    return labels


# ---- builders ------------------------------------------------------------------------------------------------

def prepare_logical_state(code: StabilizerCode, which: str = "0") -> QuantumCircuit:
    """Circuit on ``code.n`` qubits that maps |0...0> to the chosen logical eigenstate, via Clifford
    synthesis of the stabilizer tableau. Verified in quantum/verify.py with Aer (all generators +1)."""
    state = StabilizerState.from_stabilizer_list(stabilizer_labels(code, which))
    qc = state.clifford.to_circuit()
    qc.name = "prep_%s_%s" % (code.id, which)
    return qc


def stabilizer_state(code: StabilizerCode, which: str = "0") -> StabilizerState:
    return StabilizerState.from_stabilizer_list(stabilizer_labels(code, which))


def inject_error(qc: QuantumCircuit, pauli, data=None) -> None:
    """Apply a Pauli (qubit-0-first string or Pauli) as gates on the data register."""
    p = pauli if isinstance(pauli, Pauli) else Pauli.from_string(pauli)
    data = data if data is not None else qc.qubits[: p.n]
    for i in range(p.n):
        letter = p.letter(i)
        if letter == "X":
            qc.x(data[i])
        elif letter == "Z":
            qc.z(data[i])
        elif letter == "Y":
            qc.y(data[i])


apply_correction = inject_error  # a correction is just another Pauli frame applied as gates


def apply_gate_list(qc: QuantumCircuit, circuit, data=None) -> None:
    """Append fixture-style gates ({"kind": "CNOT", "c": 0, "t": 1}, ...) to the data register."""
    data = data if data is not None else qc.qubits
    for g in circuit:
        kind = g["kind"]
        if kind == "H":
            qc.h(data[g["q"]])
        elif kind == "S":
            if g.get("inverse"):
                qc.sdg(data[g["q"]])
            else:
                qc.s(data[g["q"]])
        elif kind == "CNOT":
            qc.cx(data[g["c"]], data[g["t"]])
        elif kind == "CZ":
            qc.cz(data[g["a"]], data[g["b"]])
        elif kind == "SWAP":
            qc.swap(data[g["a"]], data[g["b"]])
        else:
            raise ValueError("unknown gate kind %r" % kind)


def circuit_from_gates(n: int, circuit) -> QuantumCircuit:
    qc = QuantumCircuit(n)
    apply_gate_list(qc, circuit)
    return qc


def syndrome_extraction(qc: QuantumCircuit, code: StabilizerCode, data, anc) -> None:
    """One ancilla per check. Z check: CNOT data->ancilla for each data qubit (ancilla ends in the Z parity).
    X check: H ancilla, CNOT ancilla->data for each data qubit, H ancilla (ancilla ends in the X parity)."""
    if len(anc) != len(code.checks):
        raise ValueError("need one ancilla per check")
    for j, chk in enumerate(code.checks):
        if chk.type == "Z":
            for q in chk.qubits:
                qc.cx(data[q], anc[j])
        else:
            qc.h(anc[j])
            for q in chk.qubits:
                qc.cx(anc[j], data[q])
            qc.h(anc[j])


def readout_letters(code: StabilizerCode, basis: str):
    """Per-data-qubit measurement letter for the chosen logical readout basis."""
    letters = ["Z"] * code.n
    if basis == "Y":
        letters = ["Y"] * code.n
    for i in range(code.k):
        bits, _q = logical_operator(code, basis, i)
        for q in range(code.n):
            if bits.letter(q) != "I":
                letters[q] = bits.letter(q)
    return letters


def readout(qc: QuantumCircuit, code: StabilizerCode, basis: str, data, creg, offset: int) -> None:
    """Rotate each data qubit into its readout basis and measure into creg[offset + q]."""
    for q, letter in enumerate(readout_letters(code, basis)):
        if letter == "X":
            qc.h(data[q])
        elif letter == "Y":
            qc.sdg(data[q])
            qc.h(data[q])
    for q in range(code.n):
        qc.measure(data[q], creg[offset + q])


def build_mission_circuit(mission_id: str, correction: str, prep: str = "0", readout_basis: str = "Z") -> QuantumCircuit:
    """The full end-measured circuit for one mission and one correction (see module docstring)."""
    mission = mission_id if isinstance(mission_id, dict) else _missions.get_mission(mission_id)
    code = _missions.mission_code(mission)
    corr = Pauli.from_string(correction)
    if corr.n != code.n:
        raise ValueError("correction must have %d letters" % code.n)
    m = len(code.checks)
    data = QuantumRegister(code.n, "data")
    creg = ClassicalRegister(m + code.n, "c")
    if m:
        anc = QuantumRegister(m, "anc")
        qc = QuantumCircuit(data, anc, creg, name="q11_%s" % mission["id"])
    else:
        anc = []
        qc = QuantumCircuit(data, creg, name="q11_%s" % mission["id"])

    qc.compose(prepare_logical_state(code, prep), qubits=list(data), inplace=True)
    inject_error(qc, _missions.mission_error(mission), data)
    gates = _missions.mission_circuit(mission)
    apply_gate_list(qc, gates, data)
    if m:
        syndrome_extraction(qc, code, data, anc)
    apply_correction(qc, corr, data)
    if gates:
        apply_gate_list(qc, inverse_circuit(gates), data)
    for j in range(m):
        qc.measure(anc[j], creg[j])
    readout(qc, code, readout_basis, data, creg, m)
    return qc


# ---- prediction (classical Pauli frame) ---------------------------------------------------------------------

def reference_correction(mission: dict) -> Pauli:
    """Dispatch missions: minimum-weight lookup from the syndrome alone. Propagation missions (bare wires,
    no checks): the only information is the public circuit + visible starting fire, so the reference is the
    propagated error itself."""
    code = _missions.mission_code(mission)
    err = propagate(_missions.mission_error(mission), _missions.mission_circuit(mission))
    if mission["kind"] == "propagation" or not code.checks:
        return err
    return _decoder.decode(code, _verdict.syndrome(code, err))


def predict(mission_id: str, correction: str, prep: str = "0", readout_basis: str = "Z") -> dict:
    """Classical Pauli-frame prediction for the circuit built by :func:`build_mission_circuit`.

    Includes the game verdict (on the residual at the END of the mission circuit, R = C xor E') and the
    exact measurement outcome the perfect-model circuit must produce: the ancilla syndrome of E' and, when
    deterministic, the logical bit(s) read from the data register."""
    mission = mission_id if isinstance(mission_id, dict) else _missions.get_mission(mission_id)
    code = _missions.mission_code(mission)
    corr = Pauli.from_string(correction)
    gates = _missions.mission_circuit(mission)
    ev = _verdict.evaluate(code, _missions.mission_error(mission), corr, gates)
    residual = Pauli.from_string(ev["residual"])
    # Residual as seen at readout: propagation missions uncompute U, pulling R back through U^dagger.
    residual_at_readout = propagate(residual, inverse_circuit(gates)) if gates else residual
    flips_readout = _verdict.logical_flips(code, residual_at_readout)
    deterministic = _PREP_BASIS[prep] == readout_basis
    base = _PREP_SIGN_BIT[prep]
    expected_bits = None
    if deterministic:
        expected_bits = []
        for i in range(code.k):
            if readout_basis == "Z":
                flip = flips_readout["x"][i]
            elif readout_basis == "X":
                flip = flips_readout["z"][i]
            else:
                flip = flips_readout["x"][i] != flips_readout["z"][i]
            expected_bits.append(base ^ int(flip))
    letters = readout_letters(code, readout_basis)
    data_checks = {}
    for chk in code.checks:
        if all(letters[q] == chk.type for q in chk.qubits):
            data_checks[chk.id] = 0 if chk.pauli.commutes(residual_at_readout) else 1
    ref = reference_correction(mission)
    ref_ev = _verdict.evaluate(code, _missions.mission_error(mission), ref, gates)
    return {
        "missionId": mission["id"],
        "kind": mission["kind"],
        "code": code.id,
        "error": ev["error"],
        "propagated": ev["propagated"],
        "correction": ev["correction"],
        "residual": ev["residual"],
        "residualWeight": ev["residualWeight"],
        "syndrome": ev["syndromeE"],
        "syndromeR": ev["syndromeR"],
        "verdict": ev["verdict"],
        "logicalFlip": ev["logicalFlip"],
        "referenceCorrection": str(ref),
        "referenceVerdict": ref_ev["verdict"],
        "equivalentToReference": code.in_stabilizer_group(corr.compose(ref)),
        "prep": prep,
        "readoutBasis": readout_basis,
        "expected": {
            "ancillaSyndrome": ev["syndromeE"],
            "logicalDeterministic": deterministic,
            "logicalBits": expected_bits,
            "dataCheckParities": data_checks,
            "residualAtReadout": str(residual_at_readout),
        },
        "model": "Clifford+Pauli, perfect syndrome; engine " + ENGINE_VERSION,
    }


# ---- counts analysis -------------------------------------------------------------------------------------------

def split_key(key: str, m: int, n: int):
    """Counts key -> (ancilla bits in check order, data bits qubit-0-first). Handles register spaces and
    short keys (left-pads with zeros) so IonQ / BasicSimulator / Aer keys all parse the same way."""
    s = str(key).replace(" ", "")
    if len(s) < m + n:
        s = s.rjust(m + n, "0")
    s = s[-(m + n):]
    bits = [int(ch) for ch in s[::-1]]  # clbit 0 first
    return bits[:m], bits[m:]


def analyze_counts(counts, mission_id, correction: str = None, readout_basis: str = "Z", prep: str = "0", code=None, mission=None) -> dict:
    """Recover the syndrome distribution, the data-derived check parities and the logical outcome from
    measurement counts, and compare each with the classical prediction when a correction is given."""
    mission = mission or (mission_id if isinstance(mission_id, dict) else _missions.get_mission(mission_id))
    code = code or _missions.mission_code(mission)
    m, n = len(code.checks), code.n
    counts = dict(counts)
    shots = int(sum(int(v) for v in counts.values()))
    syn_hist = {}
    logical_hist = [{} for _ in range(code.k)]
    check_odd = {chk.id: 0 for chk in code.checks}
    letters = readout_letters(code, readout_basis)
    logical_supports = []
    for i in range(code.k):
        bits, _q = logical_operator(code, readout_basis, i)
        logical_supports.append([q for q in range(n) if bits.letter(q) != "I"])
    measurable = {chk.id: all(letters[q] == chk.type for q in chk.qubits) for chk in code.checks}
    for key, cnt in counts.items():
        cnt = int(cnt)
        anc, data = split_key(key, m, n)
        s = _verdict.syndrome_string(anc)
        syn_hist[s] = syn_hist.get(s, 0) + cnt
        for i, sup in enumerate(logical_supports):
            bit = 0
            for q in sup:
                bit ^= data[q]
            logical_hist[i][str(bit)] = logical_hist[i].get(str(bit), 0) + cnt
        for chk in code.checks:
            if measurable[chk.id]:
                par = 0
                for q in chk.qubits:
                    par ^= data[q]
                if par:
                    check_odd[chk.id] += cnt
    dominant = max(syn_hist.items(), key=lambda kv: kv[1])[0] if syn_hist else ""
    result = {
        "shots": shots,
        "syndromeHistogram": syn_hist,
        "syndromeDeterministic": len(syn_hist) == 1,
        "dominantSyndrome": [int(ch) for ch in dominant],
        "logicalHistograms": logical_hist,
        "logicalBits": [max(h.items(), key=lambda kv: kv[1])[0] if h else None for h in logical_hist],
        "logicalDeterministic": all(len(h) == 1 for h in logical_hist),
        "dataCheckOddFraction": {cid: (check_odd[cid] / shots if shots else None) for cid in check_odd if measurable[cid]},
        "readoutBasis": readout_basis,
    }
    if correction is not None:
        pred = predict(mission, correction, prep=prep, readout_basis=readout_basis)
        exp = pred["expected"]
        syn_ok = result["syndromeDeterministic"] and result["dominantSyndrome"] == exp["ancillaSyndrome"]
        if exp["logicalDeterministic"]:
            logical_ok = result["logicalDeterministic"] and [int(b) for b in result["logicalBits"]] == exp["logicalBits"]
        else:
            logical_ok = None  # not an eigenstate of the readout operator: statistics only
        checks_ok = all(
            (result["dataCheckOddFraction"][cid] == 1.0) == bool(bit) and result["dataCheckOddFraction"][cid] in (0.0, 1.0)
            for cid, bit in exp["dataCheckParities"].items()
        )
        result["prediction"] = pred
        result["matches"] = {"syndrome": syn_ok, "logical": logical_ok, "dataChecks": checks_ok}
        result["matchesPrediction"] = syn_ok and checks_ok and (logical_ok is not False)
        # Noise-tolerant view (for noise-model simulators / hardware): compare the DOMINANT outcomes only.
        pred_syn = _verdict.syndrome_string(exp["ancillaSyndrome"])
        dom_syn_ok = result["dominantSyndrome"] == exp["ancillaSyndrome"]
        if exp["logicalDeterministic"]:
            dom_logical_ok = [int(b) for b in result["logicalBits"]] == exp["logicalBits"]
            logical_share = [
                (h.get(str(b), 0) / shots if shots else None) for h, b in zip(logical_hist, exp["logicalBits"])
            ]
        else:
            dom_logical_ok = None
            logical_share = None
        dom_checks_ok = all(
            (result["dataCheckOddFraction"][cid] > 0.5) == bool(bit) for cid, bit in exp["dataCheckParities"].items()
        )
        result["dominantMatches"] = {"syndrome": dom_syn_ok, "logical": dom_logical_ok, "dataChecks": dom_checks_ok}
        result["dominantAgrees"] = dom_syn_ok and dom_checks_ok and (dom_logical_ok is not False)
        result["predictedSyndromeShare"] = (syn_hist.get(pred_syn, 0) / shots) if shots else None
        result["predictedLogicalShare"] = logical_share
    return result
