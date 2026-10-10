# Short descriptions (English)

Where each text goes (verified against the live forms on 2026-10-10): the **project About** field accepts ≤240 characters (shown on the project card and used by the submission); the **Project Card write-up** is the long description (Markdown); the submission form itself has no description field — only project, theme, demo video URL (≤512 chars), optional "What didn't work?" (≤4000 chars), an outside-Qollab-IonQ checkbox, and a dependencies textarea.

## About field (≤240 chars, currently set on the draft)
A fire-dispatch game about quantum error correction: Pauli errors are fires, stabilizer checks are alarms, corrections are firefighters. The same missions run as Qiskit circuits on Qollab's simulators, including IonQ's.

## "What didn't work?" (optional, ≤4000 chars) — draft
The web game simulates perfect syndrome extraction (no measurement noise), so repeated rounds and detection events are out of scope. On IonQ's noise-model simulators the measured syndrome histogram only approximates the ideal prediction; the algebraic verdict is the proof, the counts are a demonstration. We did not run on hardware. A union-find/MWPM decoder as a second "what if" was planned but not built in the 48-hour window.

## One sentence (≤ 140 chars)
Q11: a fire-dispatch game where alarms are stabilizer checks — read them, send crews, and learn why silent failures happen.

## Short (≈ 60 words)
Q11 — Quantum Emergency Response turns quantum error correction into a dispatch game. Fires are Pauli errors, alarm stations are stabilizer checks, firefighters are corrections. Watch errors propagate through CNOT and H, dispatch from alarms alone on a distance-3 surface code, then replay the truth — including the correction that silenced every alarm yet flipped the logical qubit.

## Long (≈ 160 words)
Q11 — Quantum Emergency Response is an educational game about how quantum error correction actually reasons. You are the dispatcher of a quantum city whose blocks are qubits. An arsonist named Noise lights red fires (X errors) and blue fires (Z errors). In training you step through circuits and watch fires move: red copies forward through a CNOT, blue copies backward, and a Hadamard swaps the colours. In the field you never see the fires — only alarm stations, which are parity (stabilizer) checks that ring when a Pauli anticommutes with them. You choose where to send crews on a distance-3 rotated surface code, commit, and the debrief replays the truth: the real fires, your crews, the residual, and a verdict computed by GF(2) algebra (stabilizer-equivalent corrections count as success). Mission 6 shows the unsettling case where the best possible call silences all alarms but flips the logical qubit. A Qiskit implementation runs the same missions as circuits on Qollab's simulators, including IonQ's.
