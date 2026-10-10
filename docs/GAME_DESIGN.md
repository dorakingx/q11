# Q11 — Game design brief (authoritative for the UI/game implementation)

Q11 is a **fire-dispatch command game** about quantum error correction. The player is the dispatcher of a quantum city.
Qubits are **city blocks**. Pauli errors are **fires** lit by an arsonist called *Noise*: red fire = X, blue fire = Z,
a red+blue (split) fire = Y. Stabilizer checks are **alarm stations** standing between blocks: an alarm rings when the
parity check anticommutes with the fire pattern — *not* when fires are "near". Corrections are **firefighters**:
red crew = X, blue crew = Z, mixed crew = Y. Sending a crew to a burning block puts the fire out (X·X = I);
sending a crew to a safe block *starts* a fire (XOR). The fiction is a metaphor and the UI says so once (Title → "How it works").

## Modes (per mission)
1. **Briefing** – one short paragraph + "Start".
2. **Training** (optional, per mission) – true fires visible. Propagation missions: a circuit diagram, Prev/Next step controls;
   fires move/transform through gates. Dispatch missions: a visible example fire and its alarms.
3. **Challenge / Dispatch** – fires hidden (dispatch missions) or final positions hidden (propagation missions: the
   starting fire and the public circuit are shown; the player predicts where fires end up and sends crews there).
   Only alarms and the public circuit are visible. Palette: X / Z / (Y if allowed). Tap a block to place the selected
   crew; tap again to remove. Budget shown as "Crews: 1 / 2". **Confirm dispatch** commits. Nothing in this phase may
   read the true error (enforced in code: the challenge view receives only `syndrome`, `circuit`, `code`, `allowed`, `budget`).
4. **Debrief** – reveal: true fires E, your crews C, residual R = C ⊕ E, every check's result, logical result.
   Verdict banner: **Logical qubit safe** (success) / **Silent failure — logical qubit flipped** (logical-error) /
   **Fires still burning** (detectable). Step replay: Prev / Next / Auto-play with captions:
   `E placed` → `(gates…)` → `alarms` → `your dispatch` → `residual` → `verdict`. "What if" panel: the minimum-weight
   decoder's dispatch and its verdict, plus the explanation when both are equivalent (stabilizer-equivalent corrections).
   Buttons: **Try again** (same mission, same error — different decision), **Next mission**, **Missions**.
5. **Result** (after each mission, and a summary after mission 6): stars, decision quality, outcome, cost.

## Scoring (never "more crews = more points", never "alarms off = success")
- **Outcome**: success / logical-error / detectable (from the engine verdict).
- **Decision quality**: compare the player's C with the min-weight decoder output D for the same syndrome:
  `optimal` (C ≡ D up to stabilizer), `valid` (success but weight(C) > weight(D)), `unlucky` (C ≡ D but outcome is
  logical-error — the information could not distinguish; mission 6), `off` (otherwise).
- Stars: 3 = success & optimal; 2 = success & valid; 1 = unlucky (optimal call, bad luck) or detectable with ≤1 wrong block **and at least one crew placed** (standing down with fires present = 0); 0 otherwise. A mission may declare `maxStars` (mission 6: 1); on such a mission a success that is not equivalent to the decoder's dispatch is scored `lucky` (1 star, "Lucky guess"), so the summary total is out of 16.
  Mission 6's intended path yields **1 star + "Optimal call"** and the mission counts as complete; the debrief explains distance 3.
- Cost shown as crews used vs minimum.

## The six missions (mechanics fixed in `fixtures/missions.json`; narrative text lives there too)
1. **First Alarm** — rep3, X-only. Training: visible X on block 0 → alarm Z0 only. Challenge: hidden `IXI` (both alarms). Palette X. Budget 1.
2. **Red Forward / Blue Backward** — trivial2, CNOT(0→1). Training steps: `XI`→`XX` (red copies to target), `IZ`→`ZZ` (blue copies to control). Challenge: `XZ` through CNOT → `YY`. Palette X, Z, Y. Budget 2.
3. **Color Switch** — trivial2. Training: `XI` through H(0) → `ZI`; `ZI` through H(0),CNOT(0,1) → `XX`. Challenge: `ZI` through H(0), CNOT(0,1), H(1) → `XZ`. Palette X, Z, Y. Budget 2.
4. **Blind Dispatch** — rsc3. Training: visible X on block 0 → alarm Z0 (and the degenerate twin, block 3, is explained). Challenge: hidden `X` on block 4 → alarms Z0 & Z1. Palette X, Z. Budget 1.
5. **Two Kinds of Trouble** — rsc3. Challenge: hidden `IXIIIIIZI` (X on 1, Z on 7) → red alarms Z0, Z2; blue alarm X1. Palette X, Z (Y deliberately excluded: Y1·Z4 is an equally likely, inequivalent explanation of the same alarms — see KNOWN_LIMITATIONS). Budget 2.
6. **Silent Failure** — rsc3. Challenge: hidden `IXXIIIIII` → only alarm Z0. Min-weight crew (block 0 or 3) silences every alarm but R = X̄ → logical flip. Palette X, Z. Budget 2. Debrief explains: distance 3 ⇒ any 1 fire is fixed, 2 fires can fool any dispatcher; shows the counterfactual (crews at 1 and 2) and why no alarm pattern justified it.

Missions are listed in order; all are selectable (judges may jump). Completion stars are stored.

## Board rendering (SVG, the hero of every screen)
- **rsc3**: 3×3 blocks (circles, label "0"…"8"), four bulk alarm stations at face centres and four boundary stations
  (Z: top {1,2} and bottom {6,7}; X: left {0,3} and right {5,8}). Z stations = diamond with "Z"; X stations = square with "X".
  Ringing = amber fill (#ffc53d) + thick ring + "!" glyph + optional gentle pulse (disabled under reduced motion).
  Quiet = dim outline. Fires: red flame glyph (X), blue flame glyph (Z), split red/blue flame (Y). Crews: helmet badge
  with letter (X red, Z blue, Y purple). Residual fires in debrief: outlined flame with "R".
- **rep3**: three blocks in a row with two Z stations between them.
- **trivial2 / circuit**: wires per qubit (horizontal), gates (H box, CNOT dot–⊕, S box), time cursor; fire tokens on wires at the cursor.
- Everything is identifiable by **shape + letter + color**; never color alone. Minimum touch target 44×44 CSS px.
- Layout: desktop ≥ 1024px: board left (≈60%), side panel right (palette, alarm list, actions). Mobile ≤ 480px: board top,
  panel below; sticky bottom action bar for Confirm. No horizontal scroll at 390×844 or 1280×800.

## Visual language
- Background #0b1a33 (navy), panel #12264a, decorative lines #27416f, block outlines / quiet watch lines #5a7fbf (≥3:1 non-text contrast on the board), text #e8eefc, muted #9fb3d9. X red #ff5a3c, Z blue #3c8dff, Y purple #b86cff, alarm amber #ffc53d, success green #3ddc97.
- System font stack. No neon glow, no gradients beyond a subtle panel tint, no particle effects, no emoji-as-art. Original SVG glyphs only.
- Title screen: Q11 icon (public/icon.svg), "Q11 — Quantum Emergency Response", one sentence, **Play**, "How it works", Settings gear.

## Accessibility & input
- All controls are real `<button>`s with `aria-label`s; the board blocks are buttons inside a `role="group"` with `aria-describedby` live alarm summary (`aria-live="polite"`).
- Keyboard: Tab order palette → blocks → actions; arrows move focus between blocks; `1/2/3` select X/Z/Y; `Enter/Space` toggles; `Backspace` recalls the focused block's crew (or clears when no block is focused); `C` confirms. Shortcuts are active only while focus is inside the dispatch screen's main region (board, palette, actions, heading).
- Touch: tap = click; no hover-only information. Sound: off by default; toggle enables simple Web Audio tones after a user gesture; always mutable. Motion: respects `prefers-reduced-motion` and a manual toggle.
- Persistence: `localStorage["q11.save.v1"]` `{ version: 1, progress: {missionId: {stars, attempts, completed}}, settings: {sound, reducedMotion} }`. Corrupt/unknown data ⇒ reset with a visible notice. If storage is unavailable (Qollab sandbox) ⇒ in-memory only, silently.

## Architecture rules
- `src/quantum` has no React. `src/game` has no React (pure reducer/state machine + scoring + replay builder + persistence). `src/ui` renders state and dispatches actions.
- The Challenge view must be given a `PublicMissionView` (no `error` field). The true error lives in `src/game` state and reaches the UI only in Debrief.
- A `QuantumBridge` interface (`src/game/bridge.ts`): `{ kind: 'none' | 'qollab'; run?(request): Promise<CloudResult> }`. Web build uses `none` and shows cached results from `fixtures/cloud-results.json` labelled **Local (Aer)** / **Cached cloud result** / **Live cloud result**. The Qollab build injects a bridge implemented in `qollab/main.js`.
- Deterministic: all randomness goes through a seeded PRNG; hand-made missions use fixed errors.
