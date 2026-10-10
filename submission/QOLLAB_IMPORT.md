# Qollab import & run procedure (manual — Qollab has no project API/CLI)

Verified against the Qollab docs on 2026-10-10 (see `docs/QOLLAB_RUNTIME.md`). Qollab accounts are provider-specific (Google *or* GitHub) — use the same provider as the hackathon team registration.

## What gets uploaded (from this repo's `qollab/` folder)
```
qollab/
  index.html          ← body-only markup (the runtime drops html/head/body; <script> tags do not run)
  main.js             ← entry; imports ./game/q11-game.js (bundled game) and Python modules q11.*
  main.css            ← the only stylesheet the runtime loads
  game/q11-game.js    ← self-contained ESM bundle of the same game (built by `npm run build:qollab`)
  q11/__init__.py, pauli.py, gf2.py, codes.py, verdict.py, decoder.py, missions.py, circuits.py
  q11/data/codes.json, q11/data/missions.json   ← synced copies of fixtures/ (scripts/sync-qollab-data.mjs)
  requirements.txt    ← pins qiskit (pure-Python wheels only)
```
Limits: ≤100 files, ≤2 MB each. `index.html` + `main.js` at the top level make it a **JS project** (editor label HTML/JS).

## Verified editor behaviour (2026-10-10, draft `q11-quantum-emergency-response`)
- **+ New Project** dialog: Title, description (≤240 chars, becomes the About text), optional template, Project shape = Python / Qiskit · JS / Qiskit wrapper · Upload your own files (files, a folder, or a .zip/.tar archive; max 100 files, 2 MB each). Shape can be changed later by adding/removing top-level files.
- **Code → Edit Code → File tree view**: file list with *Add a file* and a drop zone with **Browse** (single file, folder, or archive). Uploading a file that already exists asks "Erase existing files first?" → *Keep and add* replaces that file only; *Erase first* wipes the project.
- **Run Project → Run** opens **Select QPU**: a Run-settings form generated from `main()` parameters (Python projects), then Locally Run Simulators (Built-in, AWS Braket local, IBM ×8), Remotely Run Simulators (IonQ Aria 1/2, Forte 1, Forte Enterprise 1 — all *Free*, noise model), Quantum Computer (IonQ Forte — *Credits apply*). The console shows stdout; IonQ runs add a Circuit panel; a Probabilities panel charts outcomes.
- Drafts auto-save ("Saved just now"). **Publish** is a separate orange button — never pressed without approval.

## Steps (user or assistant with the user's signed-in session)
1. Sign in at https://qollab.xyz/login (Google or GitHub). Drafts are private to the owner.
2. Create a new project (title "Q11 — Quantum Emergency Response"). Keep it a **draft** (do not publish).
3. In the **Code** tab, create each file above with the exact relative path and paste the contents (or use the editor's file upload if present). Folders are created by naming files `q11/pauli.py` etc.
4. Press **Run Project** → **Select QPU** → *Built-in simulator*. The game page renders above the console. Open a surface-code mission → Debrief → **Verify on this backend**: the Python module builds the Qiskit circuit, `backend.run(circuit, {shots})` executes it, the page shows measured syndrome / logical outcome next to the classical prediction.
5. Press **Stop**, then **Run Project** → *IonQ Aria 1* (free remote noise-model simulator). Start with 100 shots (shot-aware; slow at high shots). Only **one job per run** on IonQ: a second verify click is refused by design; press Stop/Run to try another mission.
6. Record in `reports/qollab-runs.md`: date/time (UTC), backend name shown in the dialog, shots, job id if displayed, measured counts summary, prediction match. No credentials.
7. Fill the **Project Card** (write-up) from `submission/PROJECT_PAGE.md`. Do **not** press Publish until the user approves (see RELEASE_CHECKLIST).

## Local rehearsal (no Qollab account needed)
- `npm run verify:quantum` runs the same `q11` Python package against Aer locally.
- `npm run build:qollab` produces `qollab/game/q11-game.js`; `npm run preview:qollab` serves a local harness that fakes the `backend` global with Aer-free dummy counts **clearly labelled "local harness"** — it never claims to be an IonQ result.
