# Q11 redesign — screen flow and layout spec (for the integration wave)

Theme: warm daytime. App chrome switches from navy to a light theme: background sky #dff0ff → cream ground #f6efe0, panels #fffaf0 with 2px outline #3a2f2a (dark warm brown), text #2b2420, muted #6b5f58, accents X red #e8432a, Z blue #2f6fdd, Y purple #8a4fd6, alarm amber #f2b200, ok green #2bb673, water cyan #7fd3ff. Focus ring 3px #ff9b2f. The Q11 brand mark (public/icon.svg) stays as is. Dark-navy classes are replaced, not kept alongside.

## 1. Title (first run)
Brand mark + "Q11 — Quantum Emergency Response", one kid-friendly line ("Fires you can't see. Alarms you can. Send the right crew!"), **Play** (primary, ≥52px), "How it works", language toggle EN/JA (pill), gear. First run (`tutorialDone` false) → Play goes straight into the station-row scene in tutorial mode (R5). Returning players → city map.

## 2. City map (`screen 'missions'`)
One SVG (CityBackdrop from src/ui/art) scaled to the viewport width (max 1600 units); districts are `<button>`s absolutely positioned over the SVG (≥48px). HUD (top): stars x of 16, badges earned, storage note (Qollab: "Progress lasts for this Run"), Free roam toggle (settings). Selecting a district shows a small panel (bottom on phones, right on desktop): district name, one-line goal, status, best stars, **Dispatch** (primary) / "Replay" for solved. Locked districts: toast "Clear <previous district> first" (no navigation). Dispatch → truck drives along ROADS[id] (≈1.5 s, CSS/JS animation, skip on tap, static under reduced motion) → briefing.

## 3. Briefing (district goal)
Scene header: district art thumbnail, kid goal, "What you'll learn" one-liner, buttons: **Start training** (if lessons) / **Go!**. "Details" fold holds the original briefing text (EN) / fixtureCopyJa (JA).

## 4. Training
Scene with the true fire visible, captions as short kid lines; each lesson step asks a one-tap prediction where possible ("Which house will burn after the gate? tap it") before revealing — at minimum the propagation lessons must ask the player to tap the predicted house before the step reveals (R10). Prev/Next/Skip to dispatch.

## 5. Challenge (planning)
Scene (fog on every house for dispatch missions; identical markup/ARIA for all houses). Detectors are buttons: tap → highlight watched houses (lines + tint), tap again → clear. Crew palette (X/Z/Y as big chips with helmet art), placement = plan markers (ghost firefighter + letter) with Undo/Redo/Clear, budget counter "Crews 1/2". **Spray!** (primary) confirms. Beginner callouts (tutorial mode only): 3 numbered bubbles. Mobile: scene first, then alarms (compact), then palette; bottom action bar (Undo · Spray!) fixed but the scene container has bottom padding so it is never covered.

## 6. Dispatch (spray showpiece, `screen 'dispatch'`)
Header: "Training replay: answer check". The scene plays the EffectTimeline (src/game/effects): **propagation prelude on the lane boards (missions with a circuit; never during planning):** the public start fires appear as tokens at the lane input, travel through each gate in order (the gate highlights; the pattern switches exactly as the engine's propagate() frames say — X copies forward through CNOT, Z copies backward, H swaps red/blue, S adds a blue part to red) and reach the output houses, which light with the final fires (= Debrief.fires) and hold for a moment (EFFECT_TIMING.arriveHold, so the arrival line is readable) → then trucks arrive → crews run (CSS transform along a straight path) → hose stream (animated dash offset) → splash → house state change (from the engine) → remaining true fires revealed → alarms → outcome. Missions with an empty circuit (rep3 / rsc3) have no prelude. Caption line narrates each event (i18n), naming the propagation rule that fired at each gate; the narration never leads the picture (a gate's line appears exactly when its tokens switch pattern, the arrival line exactly when the houses light); the live region announces the fires' arrival, the trucks, each impact and the outcome. **Skip** always available; under reduced motion the timeline is a stepper (Prev/Next) with static frames. When done: result overlay on the scene: result type (4 kinds, R9), stars (out of maxStars), one-line reaction (missionCopy.reactions), buttons **Why?** (→ debrief replay), **Try again**, **Next district** (or "Back to city"), "Details" fold with the raw residual string, alarms, decision quality, cloud verification panel.
Logical failure: the memory beacon (old-town tower, or a corner tower in other grids) lights with the X/Z anomaly flag and the logical pattern houses get a dashed chain outline; alarms stay quiet. Safe pattern: ghost houses with letters + "Logical info safe" badge.

## 7. Why? (`screen 'debrief'`)
Side-by-side (stacked on phones) two mini scenes: "Your spray" vs "Alternative" (decoder dispatch or the true-fire crews), each animating the same timeline; captions explain equivalence / distance-3. Existing replay steps remain available under "Step by step".

## 8. Result / badges
Next district returns to the city map, which shows the district restored (smoke clears, lights on, park) with a chapter badge toast and pre-selects the next district ("Alarm Reader", "Gate Tracker", "Colour Switcher", "Blind Dispatcher", "Two-Colour Chief", "Investigator"). Summary screen after old-town: badges + stars + "Play again / Free roam".

## 9. Settings
Sound, Reduce motion, Language, Free roam, Reset progress, storage note.

## Accessibility & input
Real buttons for houses/detectors/districts; arrow-key navigation on the scene; focus moves to the screen heading; live region announces alarms/outcome; all meanings by shape + letter; ≥48px targets; no hover-only content; no horizontal scroll at 375/390/768/1440 widths.
