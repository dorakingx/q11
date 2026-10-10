# Q11 Emergency — Quantum Emergency Response

**Q11 Emergency** is a fire-dispatch command game about quantum error correction, built for the **Qollab × IonQ Global Quantum Hackathon 2026** (theme: Quantum Unlocked).

> A toy city with houses, alarm stations and fire crews. Fires are Pauli errors (red = X, blue = Z, split = Y); alarm stations are stabilizer checks; crews are corrections.
> Pick a district on the city map, ride the fire truck to the scene, read the alarms, plan your crews, press **Spray!** and watch the hoses do one exact Pauli correction each — then the answer-check replay reveals the hidden fires and one of four outcomes: houses restored, a harmless pattern, fires still burning, or a silent logical failure shown on the city's memory tower. English and Japanese.

**This effort is supported by Qollab & IonQ.** License: MIT (see `LICENSE`). Attribution and tool disclosure: `submission/ATTRIBUTION.md`.

## Play
- Web (Vite + React, client-side): `npm ci && npm run dev` → http://localhost:5173
- Qollab (JS/Qiskit project, runs on Qollab's free simulators incl. IonQ's): see `submission/QOLLAB_IMPORT.md`.

## The city (six districts, six lessons)
Rowhouse Lane (First Alarm) → Harbor Bridge (CNOT: red forward, blue backward) → Conversion Lab (Hadamard colour switch) → Central District (Blind Dispatch on the distance-3 surface code) → Market Square (two kinds of alarms) → Old Town (Silent Failure and the memory tower). Districts unlock in order; solved districts can be replayed; a Free roam setting opens everything for review.

## Missions
1. **First Alarm** — 3-qubit repetition code, X noise only: read two alarms, send one crew.
2. **Red Forward / Blue Backward** — X copies forward through a CNOT, Z copies backward.
3. **Color Switch** — a Hadamard swaps red and blue; chain it with a CNOT.
4. **Blind Dispatch** — distance-3 rotated surface code, one hidden fire, alarms only.
5. **Two Kinds of Trouble** — red and blue alarms at once; one X crew and one Z crew (Y is taught in mission 2).
6. **Silent Failure** — two fires, one alarm: the optimal dispatch silences everything and flips the logical qubit.

## Science in one paragraph
Errors are binary symplectic Pauli frames composed by XOR; gates act as H: x↔z, S: z^=x, CNOT(c,t): x_t^=x_c, z_c^=z_t.
Checks ring on anticommutation. The verdict on the residual R = C·E is decided by GF(2) algebra: stabilizer ⇒ success,
commuting-but-not-stabilizer ⇒ logical error, anticommuting ⇒ detectable. Details: `docs/SCIENCE.md`.

## Verification
```bash
npm run lint && npm run typecheck && npm run test:unit && npm run build
npm run test:e2e            # Playwright: Chromium desktop 1280×800 / tablet 768×1024 / phone 390×844 + WebKit desktop (smoke, city, spray); viewport matrix 1440/768/390/375 with screenshots in reports/screenshots/after
npm run verify:quantum      # regenerates fixtures, runs the independent Python/Qiskit comparison (≥1000 seeded cases)
npm run verify:release      # everything above + submission asset checks → reports/release-verification.json
```
Python: `uv venv --python 3.12 .venv && uv pip install --python .venv/bin/python -r quantum/requirements.txt`.

## Repository layout
```
src/quantum   Pauli frames, codes, GF(2), verdicts, decoder        quantum/   Python/Qiskit reference + comparison
src/game      missions, state machine, scoring, replay, storage   qollab/    Qollab-native project (JS page + Python Qiskit modules)
src/ui        React UI (SVG board)                                fixtures/  shared mission + verification JSON
public/       original icon set                                   scripts/   verification, icons, protection checks
submission/   project page, demo script, checklist, evidence      reports/   test and verification outputs (no secrets)
docs/         plan, status, decisions, science, Qollab runtime    spec/      build specification
```

## Evidence of real runs
- Qollab built-in simulator and **IonQ Aria 1 remote simulator** executed the project's surface-code mission circuits (17 qubits): see `reports/qollab-runs.md` (job ids, histograms) and `reports/qollab-runs/*.json` (raw counts, re-analysed locally).
- Independent Python/Qiskit comparison: `reports/QUANTUM_VERIFICATION.md`.

## Limitations
Clifford + Pauli educational model, perfect syndromes, distance 3, no QPU runs, no claims of quantum advantage. Full list: `submission/KNOWN_LIMITATIONS.md`.

## Status
See `docs/STATUS.md`. Publication (Qollab publish, demo video link, repository visibility) happens only after the author's explicit approval; see `submission/RELEASE_CHECKLIST.md`.
