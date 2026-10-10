# Q11 — Quantum Emergency Response · text-mode mission runner (Python / Qiskit).
#
# This file is the Python fallback of the Qollab project. When index.html and main.js are present the page
# version runs instead; delete those two files (or fork without them) to use this plain runner.
#
# `backend` is pre-created by the Qollab runtime (never hard-coded). One job per run on IonQ backends.
# All measurements are at the end of the circuit: ancilla syndrome bits, then the data readout.
# NOTE: no `from __future__` here — Qollab prepends runtime code to main.py, so a __future__ import is a SyntaxError.
import json
import time

from qiskit.providers.jobstatus import JobStatus

from q11 import circuits, missions

MISSION_IDS = [m["id"] for m in missions.load_missions()]


def _wait(job):
    terminal = (JobStatus.DONE, JobStatus.ERROR, JobStatus.CANCELLED)
    while True:
        try:
            st = job.status()
        except Exception:  # some backends only expose result()
            break
        if st in terminal:
            break
        time.sleep(2)


def main(shots: int = 200, mission: str = "blind-dispatch", correction: str = "IIIIXIIII", prep: str = "0", readout_basis: str = "Z"):
    """Run one mission as a real Qiskit circuit on the backend chosen in the Select QPU dialog.

    mission        one of: first-alarm, red-forward-blue-backward, color-switch, blind-dispatch,
                   two-kinds-of-trouble, silent-failure
    correction     the crews you dispatch, qubit 0 first, letters I X Y Z (e.g. IIIIXIIII = X crew on block 4)
    prep           logical eigenstate to protect: 0, 1, +, -, +i, -i
    readout_basis  Z, X or Y (which logical operator the data readout measures)
    """
    if mission not in MISSION_IDS:
        raise SystemExit("unknown mission %r; choose one of %s" % (mission, ", ".join(MISSION_IDS)))
    m = missions.get_mission(mission)
    print("Q11 mission:", m["title"], "(%s, code %s)" % (mission, m["code"]))
    print("Hidden fires (true error E):", m["challenge"]["error"], "| your crews (C):", correction)

    prediction = circuits.predict(mission, correction, prep=prep, readout_basis=readout_basis)
    print("Classical Pauli-frame prediction:")
    print("  alarms (syndrome of E):", prediction["syndrome"])
    print("  residual R = C xor E':", prediction["residual"], "| verdict:", prediction["verdict"], "| logical flip:", prediction["logicalFlip"])
    print("  min-weight reference crews:", prediction["referenceCorrection"], "->", prediction["referenceVerdict"],
          "| your crews equivalent to reference:", prediction["equivalentToReference"])

    qc = circuits.build_mission_circuit(mission, correction, prep=prep, readout_basis=readout_basis)
    print("Circuit: %d qubits, depth %d, ops %s" % (qc.num_qubits, qc.depth(), dict(qc.count_ops())))

    name = getattr(backend, "name", None)
    name = name() if callable(name) else name
    print("Backend selected in the Run dialog:", name)
    started = time.time()
    job = backend.run(qc, shots=shots)
    job_id = None
    try:
        job_id = job.job_id() if callable(getattr(job, "job_id", None)) else getattr(job, "job_id", None)
    except Exception:
        job_id = None
    print("Job id:", job_id)
    _wait(job)
    counts = job.result().get_counts()
    elapsed = time.time() - started

    analysis = circuits.analyze_counts(counts, mission, correction, readout_basis=readout_basis, prep=prep)
    print("Measured (%d shots, %.1f s):" % (shots, elapsed))
    print("  alarm histogram (ancilla bits, checks order %s):" % [c.id for c in missions.mission_code(m).checks],
          json.dumps(analysis["syndromeHistogram"]))
    print("  dominant alarms:", analysis["dominantSyndrome"], "| predicted:", prediction["expected"]["ancillaSyndrome"])
    print("  logical readout histogram:", json.dumps(analysis["logicalHistograms"]),
          "| predicted bits:", prediction["expected"]["logicalBits"] if prediction["expected"]["logicalDeterministic"] else "not deterministic for this prep/basis")
    print("  data-derived check parities (odd fraction):", json.dumps(analysis["dataCheckOddFraction"]))
    print("  exact match with the ideal (noiseless) model:", json.dumps(analysis.get("matches")),
          "-> expected True only on ideal simulators")
    print("  dominant-outcome agreement (noise-tolerant):", json.dumps(analysis.get("dominantMatches")),
          "| share of shots with the predicted alarms: %s | share with the predicted logical bit: %s" % (
              analysis.get("predictedSyndromeShare"), analysis.get("predictedLogicalShare")))
    print("Model: Clifford+Pauli educational simulation, perfect syndrome extraction. Counts are statistics;",
          "the GF(2) verdict above is the proof. Simulator result, not hardware.")
    record = {
        "schema": 1, "mission": mission, "correction": correction, "prep": prep, "readoutBasis": readout_basis,
        "backend": str(name), "shots": shots, "jobId": str(job_id) if job_id else None, "seconds": round(elapsed, 2),
        "counts": {str(k): int(v) for k, v in counts.items()},
        "syndromeHistogram": analysis["syndromeHistogram"], "logicalHistograms": analysis["logicalHistograms"],
        "dominantMatches": analysis.get("dominantMatches"), "exactMatches": analysis.get("matches"),
        "predictedSyndromeShare": analysis.get("predictedSyndromeShare"), "predictedLogicalShare": analysis.get("predictedLogicalShare"),
        "prediction": {k: prediction[k] for k in ("syndrome", "residual", "verdict", "logicalFlip", "referenceCorrection", "referenceVerdict", "equivalentToReference")},
        "finishedAtUnix": int(time.time()),
    }
    print("raw counts:", json.dumps(record["counts"], sort_keys=True))
    try:
        from js import sendFile  # Qollab runtime only: offers the record as a downloadable JSON in the console
        sendFile("q11-run-%s.json" % mission, "application/json", json.dumps(record, indent=1, sort_keys=True))
    except Exception:
        pass
