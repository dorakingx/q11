# Qollab runs (real executions in the user's Qollab account; no credentials recorded)

Project: **Q11 — Quantum Emergency Response** — draft (private), owner `doraking`, URL `https://qollab.xyz/u/doraking/q11-quantum-emergency-response` (draft; only the owner can open it). Created 2026-10-10 ≈01:03 UTC via the Qollab web editor (Brave + Claude in Chrome, user-authorised). **Not published.**

| # | Time (UTC) | Files | Backend (Select QPU dialog) | Kind | Shots | Params | Result | Match vs Pauli-frame prediction |
|---|---|---|---|---|---|---|---|---|
| 1 | 2026-10-10 01:07 | `reports/qollab-early-check/main.py` (rep3 syndrome circuit, 5 qubits) | **Built-in simulator (24q)** (`basic_simulator`) | local ideal simulator, free | 200 | error_qubit=1, correct=True | alarms `{'11': 200}`, blocks after dispatch `{'000': 200}`; console run time 5.1 s; probabilities panel `11000` 100.0% | alarms 1.000, blocks 1.000 (ideal: `11`, `000`) |
| 2 | 2026-10-10 01:08 | same `main.py` | **IonQ Aria 1 (25q)** remote simulator (`ionq_simulator`), labelled *Noise model · Free* in the dialog; Quantum Computer entries (credits) NOT selected | remote noise-model simulator, free, one job per run | 100 | error_qubit=1, correct=True | alarms `{'11': 100}`, blocks after dispatch `{'000': 100}`; console run time 18.9 s; Circuit panel showed the submitted 5-qubit circuit; probabilities `11000` 100.0%; no job id printed by this script (job.job_id() will be printed by the final project) | alarms 1.000, blocks 1.000 |

Notes
- The `backend` object is pre-created by the runtime; the code never hard-codes a backend. `main(shots, error_qubit, correct)` appeared as a Run-settings form exactly as documented.
- File upload: the editor's file-tree "Browse" accepts single files; uploading `main.py` asked "Erase existing files first?" → "Keep and add" replaced `main.py` and kept `README.md`, `requirements.txt`.
- Select QPU dialog (observed 2026-10-10): Run settings form (from `main()` parameters) → Locally Run Simulators: Built-in simulator (24q) *Ideal Free*, AWS Braket local simulator (25q) *Ideal Free*, IBM 8 simulators *Noise model Free* → Remotely Run Simulators: IonQ Aria 1 (25q), IonQ Aria 2 (25q), IonQ Forte 1 (29q), IonQ Forte Enterprise 1 (29q), all *Noise model Free* → Quantum Computer: IonQ Forte 1 (36q) *Credits apply*, IonQ Forte Enterprise 1 (36q) *Offline*. Only free simulators were ever used.
- Status: early technical check PASSED on both the built-in and an IonQ simulator. The core-mission (distance-3 surface code) circuits are run once the `q11` Python package lands (see STATUS.md).
