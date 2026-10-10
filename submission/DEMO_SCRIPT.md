# Demo video script (narrated, no captions; hard range 120–180 s)

**Narrated take (2026-10-11).** `scripts/record-demo.mjs` drives the built app in Chromium at 1280×800, records the screen and lays a narration track under it. The narration is synthesised offline with macOS `say` (voice Samantha, 172 wpm) from the `narrate` shots in `scripts/demo-shots.json`; no captions are burned in, there is no phone insert and no language section (the EN/JA switch is still visible on the title screen). Nothing is uploaded; the file stays at `submission/DEMO.mp4` (git-ignored). Duration, sha256, the voice and every cue time are written to `reports/demo-recording.json` and copied into `submission/EVIDENCE_INDEX.md` after each take.

## Narration script (22 lines, ≈130 s of speech)
| # | On screen | Spoken line |
|---|---|---|
| 1 | Title screen (Q11 icon, Take the first call) | Q11, Quantum Emergency Response. A toy city where fires are quantum errors, alarm stations are parity checks, and you are the dispatcher. |
| 2 | Rowhouse Lane: first-call tutorial callouts | Your first call takes three taps. Pick a crew, tap the house, and spray. |
| 3 | Red crew planned on house 1 | Both alarms ring, so the fire must be in the house they both watch. |
| 4 | Answer check: truck, crew, hose, splash | Answer check. The truck arrives, the crew runs in, and one hose is exactly one Pauli correction. |
| 5 | Result: Fires out, houses restored (3 stars) | Fires out, houses restored. X times X is the identity. |
| 6 | City map: smoke clears over Rowhouse Lane, Alarm Reader badge | This is the city map. Districts unlock in order, the smoke clears, and you earn a badge. |
| 7 | Truck drives along the road to Harbor Bridge | Dispatch! The fire truck drives to Harbor Bridge. |
| 8 | Training lesson 1: CNOT, red copies forward (tap to predict) | Training first. Tap where the fire will be after the gate. A red fire copies forward through the coupler. |
| 9 | Training lesson 2: blue copies backward | And a blue fire copies backward. |
| 10 | Challenge: X on house 0, Z on house 1; Y crews planned | Now the challenge. A red fire starts on house zero and a blue fire on house one. After the gate, both houses carry a red-and-blue fire, so we send a Y crew to each. |
| 11 | Answer check: fires travel through the coupler (propagation prelude), then the crews spray | Watch the fires travel first. Through the coupler the red fire copies forward and the blue fire copies backward. Then the crews spray, and every pair cancels. |
| 12 | Settings: free selection switch | For reviewers there is free selection: with this switch every district opens from the map. |
| 13 | Truck drives to Central District (surface code briefing) | Central District is the distance-three surface code. Nine houses, eight alarm stations. |
| 14 | Fogged houses; station Z0 tapped: watched houses highlighted | Here the fires are hidden behind fog. Tap a station to see which houses it watches. |
| 15 | Red crew planned on house 4 | Z zero and Z one both ring, and only house four is watched by both. So we plan a red crew there and spray. |
| 16 | Answer check: fog lifts on house 4, fire out, stations quiet | The hose reveals the true fire, puts it out, and every station goes quiet. |
| 17 | City map: Central District restored, Blind Dispatcher badge | Central District is restored and a new badge is earned. With free selection, Old Town is already open. |
| 18 | Truck drives to Old Town; briefing (no training) | Old Town. One alarm rings, and the best explanation is a single fire on house zero. |
| 19 | Answer check: alarms quiet, memory tower flips (Silent failure) | Every alarm goes quiet. And yet the memory tower flips. Two fires fooled the alarms. That is what distance three means. |
| 20 | Why?: your spray vs the alternative side by side | Why? Your spray and the alternative, side by side. The investigation is complete: nobody could have known from the alarms alone. |
| 21 | Why? view (verification line) | The same missions run as Qiskit circuits on Qollab. Exact on the built-in simulator, and on IonQ's Aria 1 simulator the logical bit flipped in ninety-seven percent of shots. |
| 22 | City map outro | Q11 is open source under the MIT license. This effort is supported by Qollab and IonQ. |

Lines marked non-blocking in the shot list play over an animation (truck drive, spray answer check, propagation prelude) instead of pausing the recording.

## Production notes
- `npm run build && npx vite preview --port 4173 --strictPort`, then `BASE_URL=http://localhost:4173 node scripts/record-demo.mjs`. Env: `DEMO_VOICE`, `DEMO_RATE`.
- The recorder never overlaps two lines and pads 350 ms after each blocking line; cue times are shifted by the capture lead Playwright introduces before the first action (`leadMs` in the report).
- Verify with `ffprobe` (video + audio streams) and `npm run verify:release` (120–180 s). Store sha256 in `EVIDENCE_INDEX.md`. Do not upload without approval.
