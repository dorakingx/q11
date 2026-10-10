# Q11 — Quantum Emergency Response

*A fire-dispatch game that teaches how quantum error correction reasons: errors you cannot see, alarms you can, and the moment a perfect call still fails.*

**This effort is supported by Qollab & IonQ.** · MIT License · Theme: **Quantum Unlocked** (also playable as a Quantum Playground entry)

---

## The problem
Quantum error correction is usually explained with equations: stabilizers, syndromes, decoders. The intuition behind them is simple but rarely *felt*: you never observe the error itself, only parity checks; a correction that looks right can still destroy the logical information; and the code distance tells you exactly when you are safe and when you are not. Q11 turns that reasoning into a game you can finish in a few minutes.

## How to play
You are the dispatcher of a quantum city. Blocks are qubits. An arsonist called *Noise* lights **red fires (X errors)** and **blue fires (Z errors)**; a split red/blue fire is a **Y**. **Alarm stations** between the blocks are stabilizer checks: a station rings when the fire pattern anticommutes with its parity check — not because a fire is "near". You respond by sending **crews**: a red crew applies X, a blue crew applies Z. A crew on a burning block puts the fire out (X·X = I); a crew on a safe block starts a new one (it's XOR).

Each of the six missions has up to four phases:
1. **Briefing** — one paragraph.
2. **Training** — fires are visible. In the propagation missions you step through a small circuit and watch red fires copy *forward* through a CNOT, blue fires copy *backward*, and a Hadamard swap the colours.
3. **Dispatch** — fires are hidden. You read the alarms, choose crews within a budget, and **confirm**. Nothing on screen reads the hidden error before you commit.
4. **Debrief** — the truth is replayed step by step: the real fires, your crews, the residual, every check's result, and the verdict. A "what if" panel shows what a minimum-weight decoder would have done and whether it is equivalent to your call.

Missions: **First Alarm** (3-qubit repetition code) · **Red Forward / Blue Backward** (CNOT) · **Color Switch** (Hadamard) · **Blind Dispatch** (distance-3 rotated surface code) · **Two Kinds of Trouble** (X and Z alarms together) · **Silent Failure** (two fires, one alarm — the optimal call silences every alarm and flips the logical qubit).

Keyboard, mouse and touch are all supported; shapes and letters carry every meaning so colour is never required; sound is off by default; reduced motion is respected.

## What is original here
Not "QEC as a game" — that exists. Q11's contribution is the *combination* inside one consistent model:
- **Time-resolved propagation**: Pauli frames move through gates by the actual Clifford rules (H: X↔Z; CNOT: X forward, Z backward), not by adjacency or "entanglement spreads it".
- **Hidden-error inference**: the challenge view is given only the syndrome and the public circuit; the true error lives in the game state and is revealed only in the debrief.
- **Counterfactual replay with a real verdict**: success is decided by GF(2) algebra — the residual must lie in the stabilizer group. Stabilizer-equivalent corrections count as equal successes; "alarms off" alone never does.
- **The same missions as Qiskit circuits**: the Python package in this project builds encode → inject → syndrome extraction → correct → readout circuits for each mission and runs them on the backend you pick in Qollab's dialog, printing the measured syndrome and logical outcome next to the classical prediction.

## The quantum mechanics inside
- Paulis are binary symplectic pairs (x, z); composition is XOR; commutation is the symplectic product.
- Gates: H swaps x/z; S: z ^= x; CNOT(c,t): x_t ^= x_c, z_c ^= z_t.
- Codes: the 3-qubit repetition code (X noise only — a lone Z is undetectable and the game says so) and the distance-3 rotated surface code with 9 data qubits and 8 checks (Z: {0,1,3,4}, {4,5,7,8}, {1,2}, {6,7}; X: {1,2,4,5}, {3,4,6,7}, {0,3}, {5,8}; X̄ = X0X1X2, Z̄ = Z0Z3Z6). Commutation, rank, distance and all 27 single-qubit errors (plus the no-error case: 28 patterns) are machine-verified.
- Verdict on R = C·E: R ∈ stabilizer group ⇒ success; commutes but ∉ group ⇒ logical error (which logical is read from anticommutation with X̄/Z̄); anticommutes with a check ⇒ detectable.
- Perfect syndrome model; Clifford + Pauli educational simulation. No claim about non-Clifford noise, measurement errors or hardware fidelity.

## Qiskit, Qollab and IonQ
This is a **JS/Qiskit** Qollab project: the page is the game; `q11/*.py` is a pure-Python Qiskit package. Press **Run** and choose a backend in *Select QPU*. On the free local simulators the page immediately runs a self-test (the Blind Dispatch circuit, 100 shots) and prints the measured syndrome / logical statistics next to the Pauli-frame prediction in the console; then play, and in any surface-code debrief press **Verify on this backend (100 shots)** to run *your* dispatch as a circuit. A text-mode `main.py` (delete `index.html`/`main.js` in a fork) exposes the same circuits with a Run-settings form. On the built-in simulator the measured syndrome distribution is deterministic and matches the prediction exactly. On IonQ's free noise-model simulators (Aria 1/2, Forte 1/Enterprise) counts deviate statistically; the page labels them as such. One job per run on IonQ, by Qollab's rules. **No hardware (QPU) runs were made, and none are claimed.**

Recorded runs (free IonQ Aria 1 noise-model simulator, 100 shots each, from this project's `main.py`): *Blind Dispatch* — job `01a12378-c4f2-71ea-b5df-920acd440520`, dominant alarm pattern Z0·Z1 in 69% of shots, logical readout 0 in 93%; *Silent Failure* with the minimum-weight crew — job `01a1237b-5f60-7349-89d0-a343dca0201c`, dominant alarm pattern Z0 in 73%, logical readout **1 in 97%**: the alarms are explained and silenced, and the logical qubit is flipped, exactly as the GF(2) verdict predicts. On the built-in ideal simulator the same circuits reproduce the prediction in 100% of shots.

## Reproduce and extend
```
# source repository: link on this page once public (MIT)
npm ci && npm run dev       # play locally
npm run test:unit           # engine + game tests
npm run verify:quantum      # independent Python/Qiskit comparison: exhaustive gate tables, 28 single-error patterns,
                            # ≥1000 seeded propagation cases, ≥1000 seeded verdict cases, six-eigenstate StabilizerState check,
                            # Aer runs of every mission circuit
```
Ideas to extend: measurement noise and detection events across rounds; a union-find or MWPM decoder as a second "what if"; larger-distance codes; hook errors from the ancilla schedule.

## Demo video
2–3 minute recording of the real app (link added at publication; viewable without sign-in).

## Limitations
See `KNOWN_LIMITATIONS.md` in the repository: Clifford + Pauli only, perfect syndromes, distance 3, cached/absent cloud results in the web build, no QPU runs.

## Credits
Design and implementation: Tomoya Hatanaka (GitHub `dorakingx`), built during the hackathon window with AI assistance (Claude Code), disclosed in `ATTRIBUTION.md`. Libraries: React, Vite (MIT); Qiskit, qiskit-aer (Apache-2.0). All art is original SVG.
