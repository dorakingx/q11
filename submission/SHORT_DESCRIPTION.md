# Short descriptions (English)

## One sentence (≤ 140 chars)
Q11: a fire-dispatch game where alarms are stabilizer checks — read them, send crews, and learn why silent failures happen.

## Short (≈ 50 words)
Q11 — Quantum Emergency Response turns quantum error correction into a dispatch game. Fires are Pauli errors, alarm stations are stabilizer checks, firefighters are corrections. Watch errors propagate through CNOT and H, dispatch from alarms alone on a distance-3 surface code, then replay the truth — including the correction that silenced every alarm yet flipped the logical qubit.

## Long (≈ 150 words)
Q11 — Quantum Emergency Response is an educational game about how quantum error correction actually reasons. You are the dispatcher of a quantum city whose blocks are qubits. An arsonist named Noise lights red fires (X errors) and blue fires (Z errors). In training you step through circuits and watch fires move: red copies forward through a CNOT, blue copies backward, and a Hadamard swaps the colours. In the field you never see the fires — only alarm stations, which are parity (stabilizer) checks that ring when a Pauli anticommutes with them. You choose where to send crews on a distance-3 rotated surface code, commit, and the debrief replays the truth: the real fires, your crews, the residual, and a verdict computed by GF(2) algebra (stabilizer-equivalent corrections count as success). Mission 6 shows the unsettling case where the best possible call silences all alarms but flips the logical qubit. A Qiskit implementation runs the same missions as circuits on Qollab's simulators, including IonQ's.
