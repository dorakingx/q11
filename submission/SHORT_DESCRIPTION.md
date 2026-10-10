# Short descriptions (English)

Where each text goes (verified against the live forms on 2026-10-10): the **project About** field accepts ≤240 characters (shown on the project card and used by the submission); the **Project Card write-up** is the long description (Markdown); the submission form itself has no description field — only project, theme, demo video URL (≤512 chars), optional "What didn't work?" (≤4000 chars), an outside-Qollab-IonQ checkbox, and a dependencies textarea.

## About field (≤240 chars, currently set on the draft)
A fire-dispatch game about quantum error correction: Pauli errors are fires, stabilizer checks are alarms, corrections are firefighters. The same missions run as Qiskit circuits on Qollab's simulators, including IonQ's.

## "What didn't work?" (optional, ≤4000 chars) — draft
The web game simulates perfect syndrome extraction (no measurement noise), so repeated rounds and detection events are out of scope. On IonQ's noise-model simulators the measured syndrome histogram only approximates the ideal prediction; the algebraic verdict is the proof, the counts are a demonstration. We did not run on hardware. A union-find/MWPM decoder as a second "what if" was planned but not built in the 48-hour window.

## One sentence (≤ 140 chars)
Q11: a toy-city fire puzzle where alarms are stabilizer checks — read them, spray the right crew, see why silent failures happen.

## Short (≈ 60 words)
Q11 — Quantum Emergency Response turns quantum error correction into a toy-city fire puzzle for kids and judges alike. Houses are qubits, alarm stations are stabilizer checks, fire crews are corrections. Ride the truck to a district, read the alarms, plan your crews and press Spray!: one exact Pauli correction per hose, then four readable results — including the call that silences every alarm yet flips the logical qubit. EN/JA.

## Long (≈ 170 words)
Q11 — Quantum Emergency Response is an educational game about how quantum error correction actually reasons, built as a toy city a child can play. Houses are qubits. An arsonist named Noise lights red fires (X errors) and blue fires (Z errors). On the city map you pick a district, ride the fire truck to the scene and, in training, tap where a fire will be after a CNOT or a Hadamard before the gate reveals it. In the field you never see the fires — only alarm stations, parity (stabilizer) checks that ring when a Pauli anticommutes with them. You plan crews on a distance-3 rotated surface code and press Spray!: each hose applies exactly one Pauli correction, then the answer check reveals the hidden fires and one of four results — houses restored, a harmless stabilizer pattern, fires still burning, or a silent logical failure shown on the city's memory tower. Why? animates your spray against the alternative on the same board. English and Japanese. A Qiskit package runs the same missions as circuits on Qollab's simulators, including IonQ's.
