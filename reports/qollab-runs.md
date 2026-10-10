# Qollab runs (real executions in the user's Qollab account; no credentials recorded)

Project: **Q11 — Quantum Emergency Response** — draft (private), owner `doraking`, URL `https://qollab.xyz/u/doraking/q11-quantum-emergency-response` (draft; only the owner can open it). Created 2026-10-10 ≈01:03 UTC via the Qollab web editor (Brave + Claude in Chrome, user-authorised). **Not published.**

| # | Time (UTC) | Files | Backend (Select QPU dialog) | Kind | Shots | Params | Result | Match vs Pauli-frame prediction |
|---|---|---|---|---|---|---|---|---|
| 1 | 2026-10-10 01:07 | `reports/qollab-early-check/main.py` (rep3 syndrome circuit, 5 qubits) | **Built-in simulator (24q)** (`basic_simulator`) | local ideal simulator, free | 200 | error_qubit=1, correct=True | alarms `{'11': 200}`, blocks after dispatch `{'000': 200}`; console run time 5.1 s; probabilities panel `11000` 100.0% | alarms 1.000, blocks 1.000 (ideal: `11`, `000`) |

Notes
- The `backend` object is pre-created by the runtime; the code never hard-codes a backend. `main(shots, error_qubit, correct)` appeared as a Run-settings form exactly as documented.
- File upload: the editor's file-tree "Browse" accepts single files; uploading `main.py` asked "Erase existing files first?" → "Keep and add" replaced `main.py` and kept `README.md`, `requirements.txt`.
