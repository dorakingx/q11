# Q11 Emergency — Quantum Emergency Response

![Q11 Emergency icon: a red fire truck lettered Q11 with a red X flame and a blue Z flame above its ladder](https://pub.qollab.xyz/assets/01a12c87-1104-7267-a003-7cf2ec51efb2)

*Q11 Emergency is a fire-dispatch game that teaches how quantum error correction reasons: errors you cannot see, alarms you can, and the moment a perfect call still fails.*

**This effort is supported by Qollab & IonQ.** · MIT License · Theme: **Quantum Unlocked** (also playable as a Quantum Playground entry)

**Play:** press **Run** above (Code tab) and pick a free simulator · **Demo video (2:54):** https://www.youtube.com/watch?v=caRB8CaDgBE · **Web build:** https://q11-emergency.vercel.app · **Source (MIT):** https://github.com/dorakingx/q11-emergency

![Title screen: the Q11 fire truck with X and Z flames, "Fires you cannot see. Alarms you can. Send the right crew!", Play and How it works buttons](https://pub.qollab.xyz/assets/01a12c87-6bf0-705f-b253-21262624e844)

---

## The problem
Quantum error correction is usually explained with equations: stabilizers, syndromes, decoders. The intuition behind them is simple but rarely *felt*: you never observe the error itself, only parity checks; a correction that looks right can still destroy the logical information; and the code distance tells you exactly when you are safe and when you are not. Q11 Emergency turns that reasoning into a game you can finish in a few minutes, for kids and judges alike, in English and Japanese.

## How the game maps to quantum error correction

| In the city | In the physics |
|---|---|
| House | Data qubit |
| Red fire / blue fire / split fire | Pauli error $X$ / $Z$ / $Y$ |
| Alarm station (rings or stays quiet) | Stabilizer check: rings when the error **anticommutes** with it |
| Red crew / blue crew | Correction $X$ / $Z$ on one qubit; composition is XOR, so $X \cdot X = I$ puts a fire out and a crew on a safe house starts one |
| Fog over the houses | The error is hidden; only the syndrome is observable |
| Spray! and the answer check | Residual $R = C \cdot E$ evaluated over $\mathbb{F}_2$ |
| Houses restored / harmless pattern | $R = I$ / $R \in \mathcal{S}$ (a stabilizer): logical information safe |
| Fires still burning | $R$ anticommutes with a check: detectable |
| Memory tower flips while every alarm is quiet | $R \in N(\mathcal{S}) \setminus \mathcal{S}$: **logical error** |
| Fire travelling through the gates | Pauli-frame propagation: $H$ swaps $X \leftrightarrow Z$, CNOT copies $X$ forward and $Z$ backward |

## A tour of the game

### 1. The city map
You are the dispatcher of a toy quantum city. Each district is one mission: Rowhouse Lane, Harbor Bridge, Conversion Lab, Central District, Market Square and Old Town. Districts unlock in order (a *Free roam* setting opens everything for reviewers). Press **Play**, tap a district with smoke, press **Dispatch!**, and the fire truck drives you there. The very first dispatch of Rowhouse Lane is a three-tap guided scene: pick a crew, tap the house, spray.

![City map with six districts: Rowhouse Lane, Harbor Bridge, Conversion Lab, Central District, Market Square and Old Town](https://pub.qollab.xyz/assets/01a12c84-d735-7194-b6b4-97853b765a01)

### 2. Training: the fires are visible
In the propagation districts you step a fire through a small circuit and tap where it will be **before** the gate reveals it. A CNOT copies a red fire *forward* (control → target) and a blue fire *backward* (target → control); a Hadamard swaps the colours. Fires never move on their own.

![Training at Harbor Bridge: two wires joined by a CNOT; a red X fire on the control has just copied onto the target](https://pub.qollab.xyz/assets/01a12c85-3893-7e5d-bbc1-94cc5c344a63)

### 3. Dispatch: the fires are hidden
On the distance-3 rotated surface code (9 houses, 8 alarm stations) the houses are covered in fog. You read which stations ring, tap a station to see the houses it watches, place crews within a budget (undo/redo), and press **Spray!**. Nothing on screen reads the hidden error before you commit.

![Dispatch at Market Square: fogged 3×3 houses, three ringing stations, an X crew planned on house 1](https://pub.qollab.xyz/assets/01a12c85-9804-740c-93e3-154baa2c9c96)

### 4. Spray: the answer check
In the propagation missions the board first replays the fire travelling through the gates. Then the crews run in and each hose applies exactly **one Pauli correction computed by the engine**: the same colour puts a fire out, a different colour changes it ($X$ on $Z$ gives $Y$, since $XZ \propto Y$), and a crew on an empty house starts a new fire. The fog lifts and one of four results appears: houses restored, a harmless pattern, fires still burning, or a **silent logical failure**, shown below: the minimum-weight call in Old Town silences every alarm and still flips the city's memory tower.

![Result screen "Silent failure": three X fires in a row, every alarm quiet, the memory tower showing a logical X flip](https://pub.qollab.xyz/assets/01a12c85-f6c7-7cf7-ad8a-2b189145f071)

### 5. Why?
Your spray and the alternative correction (the minimum-weight decoder, or crews on the true fires) replay side by side on the same board. The step-by-step replay and the raw residual live under *Details*.

![Why? screen: your spray and the other way animated on two identical boards](https://pub.qollab.xyz/assets/01a12c86-5045-7372-b24a-67c4e7a49ca0)

## Missions

| # | District | Mission | What it teaches |
|---|---|---|---|
| 1 | Rowhouse Lane | **First Alarm** | 3-qubit repetition code, $X$ noise only: two alarms, one crew |
| 2 | Harbor Bridge | **Red Forward / Blue Backward** | CNOT: $X$ copies control → target, $Z$ copies target → control |
| 3 | Conversion Lab | **Color Switch** | Hadamard swaps red and blue; chained with a CNOT |
| 4 | Central District | **Blind Dispatch** | distance-3 rotated surface code, one hidden fire, alarms only |
| 5 | Market Square | **Two Kinds of Trouble** | $X$ and $Z$ alarms at once; one $X$ crew and one $Z$ crew |
| 6 | Old Town | **Silent Failure** | two fires, one alarm: the optimal call flips the logical qubit |

Everything works by tapping; keyboard and screen readers are supported; shapes and X/Z/Y letters carry every meaning so colour is never required; sound is off until you turn it on; reduced motion plays the same causality as static frames. The Japanese version calls itself **11Q Emergency**, after Japan's 119.

## What is original here
Not "QEC as a game" — that exists. Q11 Emergency's contribution is the *combination* inside one consistent model:
- **Time-resolved propagation**: Pauli frames move through gates by the actual Clifford rules ($H: X \leftrightarrow Z$; CNOT: $X$ forward, $Z$ backward), not by adjacency or "entanglement spreads it".
- **Hidden-error inference**: the challenge view is given only the syndrome and the public circuit; the true error lives in the game state and is revealed only after you press Spray! (the answer check).
- **Counterfactual replay with a real verdict**: success is decided by $\mathbb{F}_2$ linear algebra — the residual must lie in the stabilizer group. Stabilizer-equivalent corrections count as equal successes; "alarms off" alone never does.
- **The same missions as Qiskit circuits**: the Python package in this project builds encode → inject → syndrome extraction → correct → readout circuits for each mission and runs them on the backend you pick in Qollab's dialog, printing the measured syndrome and logical outcome next to the classical prediction.

## The quantum mechanics inside
An $n$-qubit Pauli error (up to phase) is a binary symplectic vector $P = (x, z) \in \mathbb{F}_2^{n} \times \mathbb{F}_2^{n}$. Composing errors and corrections is XOR, and two Paulis commute exactly when their symplectic product is zero:

$$(x, z) \cdot (x', z') = (x \oplus x',\ z \oplus z'), \qquad \langle P, P' \rangle = x \cdot z' + z \cdot x' \bmod 2$$

Gates move the frame:

$$H:\ x \leftrightarrow z, \qquad S:\ z \leftarrow z \oplus x, \qquad \mathrm{CNOT}_{c \to t}:\ x_t \leftarrow x_t \oplus x_c,\quad z_c \leftarrow z_c \oplus z_t$$

- **Codes**: the 3-qubit repetition code ($X$ noise only — a lone $Z$ is undetectable and the game says so) and the distance-3 rotated surface code with 9 data qubits and 8 checks ($Z$ checks $Z_0 Z_1 Z_3 Z_4$, $Z_4 Z_5 Z_7 Z_8$, $Z_1 Z_2$, $Z_6 Z_7$; $X$ checks $X_1 X_2 X_4 X_5$, $X_3 X_4 X_6 X_7$, $X_0 X_3$, $X_5 X_8$; logical operators $\bar X = X_0 X_1 X_2$, $\bar Z = Z_0 Z_3 Z_6$). Commutation, rank, distance and all 27 single-qubit errors (plus the no-error case: 28 patterns) are machine-verified.
- **Verdict** on the residual $R = C \cdot E$ (stabilizer group $\mathcal{S}$): $R \in \mathcal{S} \Rightarrow$ success; $R \in N(\mathcal{S}) \setminus \mathcal{S}$ (commutes with every check but is not in the group) $\Rightarrow$ logical error, and which logical is read from anticommutation with $\bar X$ / $\bar Z$; $R$ anticommutes with a check $\Rightarrow$ detectable.
- Perfect-syndrome model; Clifford + Pauli educational simulation. No claim about non-Clifford noise, measurement errors or hardware fidelity.

## Qiskit, Qollab and IonQ
This is a **JS/Qiskit** Qollab project: the page is the game; `q11/*.py` is a pure-Python Qiskit package. Press **Run** and choose a backend in *Select QPU*. On the free local simulators the page immediately runs a self-test (the Blind Dispatch circuit, 100 shots) and prints the measured syndrome / logical statistics next to the Pauli-frame prediction in the console; then play, and on any surface-code result open **Details → Verify on this backend (100 shots)** to run *your* dispatch as a circuit. A text-mode `main.py` (delete `index.html`/`main.js` in a fork) exposes the same circuits with a Run-settings form. On the built-in simulator the measured syndrome distribution is deterministic and matches the prediction exactly. On IonQ's free noise-model simulators (Aria 1/2, Forte 1/Enterprise) counts deviate statistically; the page labels them as such. One job per run on IonQ, by Qollab's rules. **No hardware (QPU) runs were made, and none are claimed.**

Recorded runs (free IonQ Aria 1 noise-model simulator, 100 shots each, from this project's `main.py`): *Blind Dispatch* — job `01a12378-c4f2-71ea-b5df-920acd440520`, dominant alarm pattern $Z_0 Z_1$ in 69% of shots, logical readout 0 in 93%; *Silent Failure* with the minimum-weight crew — job `01a1237b-5f60-7349-89d0-a343dca0201c`, dominant alarm pattern $Z_0$ in 73%, logical readout **1 in 97%**: the alarms are explained and silenced, and the logical qubit is flipped, exactly as the $\mathbb{F}_2$ verdict predicts. On the built-in ideal simulator the same circuits reproduce the prediction in 100% of shots.

## Reproduce and extend
Source (MIT): https://github.com/dorakingx/q11-emergency · Live web build of the same game: https://q11-emergency.vercel.app (the Qollab page above is the entry; the web build is an extra).
```
# source repository (MIT): https://github.com/dorakingx/q11-emergency
npm ci && npm run dev       # play locally
npm run test:unit           # engine + game tests
npm run verify:quantum      # independent Python/Qiskit comparison: exhaustive gate tables, 28 single-error patterns,
                            # ≥1000 seeded propagation cases, ≥1000 seeded verdict cases, six-eigenstate StabilizerState check,
                            # Aer runs of every mission circuit
```
Ideas to extend: measurement noise and detection events across rounds; a union-find or MWPM decoder as a second "what if"; larger-distance codes; hook errors from the ancilla schedule.

## Demo video
https://www.youtube.com/watch?v=caRB8CaDgBE — a 2 min 54 s recording of the real app with an AI voiceover generated in Google Vids (YouTube, public).

## Limitations
See `KNOWN_LIMITATIONS.md` in the repository: Clifford + Pauli only, perfect syndromes, distance 3, cached/absent cloud results in the web build, no QPU runs.

## Credits
Design and implementation: Tomoya Hatanaka (GitHub `dorakingx`), built during the hackathon window with AI assistance (Claude Code), disclosed in `ATTRIBUTION.md`. Libraries: React, Vite (MIT); Qiskit, qiskit-aer (Apache-2.0). All art is original SVG.
