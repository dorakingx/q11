# Q11 — Quantum Emergency Response: Build Plan

Created 2026-10-10 09:25 JST. Deadline **2026-10-12 08:00 JST (2026-10-11 23:00 UTC)**.
Spec: `spec/Q11_BUILD_SPEC.md` (sha256 e1236c4c…9aa6). Status: `docs/STATUS.md`. Decisions: `docs/DECISIONS.md`.

## Environment (verified 2026-10-10 09:20 JST)
| Item | Value |
|---|---|
| Working dir | `/Users/hatanakatomoya/Developer/App/Q11` (was empty, now `git init -b main`) |
| GitHub | `gh` logged in as **dorakingx** (User). No `dorakingx/q11` repo yet. Scopes include `repo`. |
| Vercel | CLI 48.10.12, user **doraking**, plan **hobby**, default team `team_SbNwzYVsNb0NXjlFkKvPjcQT`. No `q11` project (2 pages checked). Vercel Authentication "All Deployments" is free on every plan since 2026-09-09 (changelog verified). |
| Node | v20.18.0, npm 10.8.2 |
| Python | 3.14.7 default (no Qiskit). `uv 0.9.10` + Python 3.12 → qiskit 2.5.2, qiskit-aer 0.17.2, qiskit-ionq 1.1.1 install OK. |
| Tools | ffmpeg 9.0.1, ImageMagick (`magick`), Playwright Chromium caches present. Disk: 23 GB free (be frugal). |
| Qollab | Pyodide (in-browser) Python, `main.py` entrypoint, `backend` pre-created, `main(shots: int)` optional. `requirements.txt` for pure-Python wheels. Up to 100 files × 2 MB. Built-in sim = Qiskit `BasicSimulator` (24q, ideal). IonQ Aria-1/2, Forte-1/Enterprise remote **noise-model** simulators: free, **one job per run**, shot-aware (slow at high shots). Drafts are private; Publish makes public at `qollab.xyz/u/<user>/<project>`. Judges run every project on a free local simulator. |
| Hackathon terms | Qiskit project, MIT, published & runnable on Qollab before deadline, 2–3 min public demo video, project page, attribution line "This effort is supported by Qollab & IonQ", AI/tool usage disclosed, accessibility best practices, remain available 12 months. Themes: Quantum Unlocked (primary fit), Quantum Playground. |

## Architecture
- **Web**: Vite + React 18 + TypeScript strict, SVG board. Pure `src/quantum` engine (no React), `src/game` state machine + scoring + replay, `src/ui` views. localStorage with versioned schema. No backend.
- **Quantum model**: binary symplectic Pauli frames; gates H, S, CNOT (+CZ, SWAP derived); codes: `trivial(n)` (propagation lessons), `rep3` (Z0Z1, Z1Z2; X-noise only), `rsc3` distance-3 rotated surface code:
  - data qubits q = 3·row + col; Z checks {0,1,3,4}, {4,5,7,8}, {1,2}, {6,7}; X checks {1,2,4,5}, {3,4,6,7}, {0,3}, {5,8}; logical Z̄ = Z0Z3Z6, X̄ = X0X1X2. Machine-verified: commutation, rank 8, distance 3, all 27 weight-1 errors + identity (28 patterns) correctable (degenerate pairs X0~X3, X5~X8, Z1~Z2, Z6~Z7 are stabilizer-equivalent).
  - Verdict on R = C·E: stabilizer ⇒ success; commutes but not in group ⇒ logical error (report which logical); anticommutes ⇒ detectable residual.
  - Decoder: minimum-weight lookup table (brute force) used only for Debrief comparison, never shown before commit.
- **Missions (6)**: 1 First Alarm (rep3, hidden single X) · 2 Red Forward / Blue Backward (CNOT propagation, training + predict) · 3 Color Switch (H + CNOT propagation) · 4 Blind Dispatch (rsc3, hidden single X or Z) · 5 Two Kinds of Trouble (rsc3, Y / X+Z) · 6 Silent Failure (rsc3, weight-2 X1X2 → one alarm → min-weight fix completes logical X̄: alarms silent, logical flipped; debrief explains distance; scoring does not blame the player).
- **Verification bridge**: `fixtures/*.json` (mission defs, seeded cases). TS emits expected results; Python recomputes independently (own GF(2) + Qiskit `quantum_info` Clifford/Pauli + Aer statevector on six logical eigenstates) and diffs. ≥1000 seeded random propagation/correction cases.
- **Qollab project** (`qollab/`): `main.py` + modules + mission JSON. One circuit per run: encode logical state → inject mission error → ancilla syndrome extraction → apply chosen correction → measure ancillas + logical observable at the end (no mid-circuit measurement needed) → print syndrome histogram, logical outcome, and the classical Pauli-frame prediction side by side. Works on built-in simulator and IonQ remote simulators (one job).

## Phases
1. **Foundation (now)**: docs, scaffold, lint/type/test config, private repo, first commit/push. Vercel project created with `ssoProtection.deploymentType = "all"` *before* first deploy, verified.
2. **Engine**: `src/quantum` + unit tests (gates, XOR, code invariants, 28 patterns, verdicts). Python reference + comparison script. Fixtures.
3. **Game + UI**: intro, 6 missions, challenge/debrief/replay, retry, results, settings (sound, reduced motion), touch + keyboard, English.
4. **Quality**: E2E (Playwright), real-browser screenshots desktop 1280×800 / mobile 390×844, fixes.
5. **Assets & submission**: icon SVG → favicon/PNGs, README, ATTRIBUTION, PROJECT_PAGE, DEMO_SCRIPT, KNOWN_LIMITATIONS, RELEASE_CHECKLIST, EVIDENCE_INDEX, recorded DEMO.mp4 (120–180 s, local only).
6. **Qollab**: draft project in the user's account (private), run on built-in simulator and an IonQ simulator; record backend/job metadata. If no session/access → BLOCKED_EXTERNAL.
7. **Final verify**: lint/typecheck/unit/e2e/build/verify:quantum/verify:release; private repo + protected deployment at the same SHA; final report with A1–A9.

## Acceptance (A1–A9) → see STATUS.md for live state
