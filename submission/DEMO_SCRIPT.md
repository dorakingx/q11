# Demo video script & storyboard (target ~140 s; hard range 120–180 s)

**Redesign take (2026-10-10, after the city/scene redesign).** Recorded with `scripts/record-demo.mjs` + `scripts/demo-shots.json` (78 scripted shots) against the built app on `http://localhost:4173`: `submission/DEMO.mp4` (git-ignored, never uploaded). Duration, sha256 and the recording timestamp are in `reports/demo-recording.json` and `submission/EVIDENCE_INDEX.md`. Captions are burned in; no narration; no cloud run is shown as live (the Qollab/IonQ results are quoted in a caption with their recorded figures from `reports/qollab-runs.md`). The earlier 149 s take of the card-list build (2cfae98) is superseded.

Recording: the real app in Chromium at 1280×800 (desktop) with one phone-size insert (390×844); captions burned in; no narration required. The table below is the storyboard the shot list implements (times approximate; spray showpieces and truck drives add a few seconds each).

| t (s) | Shot | On screen | Caption |
|---|---|---|---|
| 0–8 | Title | Q11 icon, warm city title screen, Play | "Q11 — Quantum Emergency Response. A toy city where fires are quantum errors and alarms are parity checks." |
| 8–24 | First call (Station Row, 3-qubit repetition code) | Straight into the three-tap experience: pick the red crew → tap house 1 → Spray. Answer check: the truck arrives, firefighters run, one hose = one exact Pauli correction; fires out, houses restored | "Both alarms ring — the fire is in the house they both watch." · "Fires out, houses restored. X·X = I." |
| 24–32 | City map | The map replaces the card list: roads, fire station, districts; smoke clears over Station Row and a chapter badge appears; the next district unlocks | "The city map. Districts unlock in order; the smoke clears and a badge is earned." |
| 32–58 | Harbor Bridge (CNOT) | Dispatch: the truck drives along the road. Training: tap where the fire will be after the CNOT (red copies forward, blue copies backward). Challenge: X on house 0 and Z on house 1 → predict both become Y; Spray; result | "Dispatch! The fire truck drives to Harbor Bridge." · "Red copies forward… Blue copies backward." · "Both become Y." |
| 58–84 | Central District (distance-3 surface code) | Briefing skipped; fog hides the fires; tapping alarm station Z0 highlights the houses it watches; plan a red crew on house 4; Spray reveals the true fire and puts it out; every station goes quiet | "Fires are hidden behind fog. Tap a station to see the houses it watches." · "Z0 and Z1 both ring — only house 4 is watched by both." |
| 84–92 | Free roam | Settings → "free selection" (for judges) → back to the city map; Old Town opens without playing the districts in between | — |
| 92–118 | Old Town (Silent Failure) | One alarm; red crew on house 0; Spray; **every alarm goes quiet, yet the memory tower flips** (logical X); Why? shows the player's spray and the alternative side by side; "Investigation complete" (non-blaming) | "Every alarm goes quiet… yet the memory tower flips: two fires fooled the alarms. That is distance 3." · "Why? Your spray and the alternative side by side." |
| 118–125 | Verification caption (on the Why? view) | Caption quoting the recorded Qollab runs: built-in simulator exact; IonQ Aria 1 simulator logical bit 1 in 97 % of shots | "The same missions run as Qiskit circuits on Qollab…" |
| 125–135 | Phone insert + outro | 390×844 title screen; EN → JA switch; outro caption with MIT + "This effort is supported by Qollab & IonQ" | "日本語でも遊べます。タッチだけで操作。 Open source, MIT…" |

## Production notes
- Capture with the Playwright-driven recorder (`BASE_URL=http://localhost:4173 node scripts/record-demo.mjs`) against `npm run build && npm run preview`; 30 fps; ffmpeg to H.264 MP4, no audio track (sound in the game is opt-in and off by default).
- Keep the real UI; no mock-ups. Old Town must show the *actual* result overlay text and the real Why? comparison.
- Verify duration with `ffprobe`; `npm run verify:release` enforces 120–180 s.
- Store at `submission/DEMO.mp4` (git-ignored). Record sha256 in `EVIDENCE_INDEX.md`. Do not upload without approval.
