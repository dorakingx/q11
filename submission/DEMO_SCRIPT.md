# Demo video script & storyboard (target 150 s; hard range 120–180 s)

Recording: real app in Chromium at 1280×800 (desktop) with one mobile insert; captions burned in; no narration required (optional voice). No cloud run is shown as "live" unless it actually ran during recording.

| t (s) | Shot | On screen | Caption |
|---|---|---|---|
| 0–8 | Title | Q11 icon, title, one sentence, Play | "Q11 — Quantum Emergency Response. Errors are fires. Checks are alarms. You are the dispatcher." |
| 8–25 | Mission 1 First Alarm | Training: fire on block 0 → alarm Z0; challenge: two alarms ring; place red crew on block 1; confirm; debrief: Logical qubit safe | "Alarms are parity checks. Two alarms → the fire is between them." |
| 25–45 | Mission 2 Red Forward / Blue Backward | Step through CNOT: red copies forward, blue copies backward; challenge XZ → predict YY; confirm; replay shows propagation | "Fires move only through gates: X forward, Z backward through a CNOT." |
| 45–58 | Mission 3 Color Switch | H swaps colours; H–CNOT–H chain; replay | "A Hadamard swaps red and blue." |
| 58–85 | Mission 4 Blind Dispatch | Surface code board; fires hidden; two amber alarms; place one red crew on block 4; confirm; debrief reveals the fire exactly there; what-if: decoder agrees | "Distance-3 surface code. You never see the fire — only the alarms." |
| 85–100 | Mission 5 Two Kinds of Trouble | Red and blue alarms at once; red crew on block 1, blue crew on block 7 (decoder's equivalent: block 6) | "Red alarms for X, blue alarms for Z. Equivalent corrections differ by a stabilizer." |
| 100–130 | Mission 6 Silent Failure | One alarm; red crew on block 0; confirm; **alarms all go quiet — verdict: Silent failure, logical qubit flipped**; replay shows two real fires on 1 and 2; what-if panel | "Every alarm is silent. The logical qubit flipped. Two fires can fool any dispatcher — that is what distance 3 means." |
| 130–145 | Verification | Terminal: `npm run verify:quantum` summary (counts, 0 mismatches); Qollab tab: project running on built-in simulator; if an IonQ simulator run exists, show the recorded result labelled with the backend name | "The same missions run as Qiskit circuits on Qollab — built-in and IonQ simulators. Algebra is the proof; counts agree." |
| 145–150 | Mobile insert + outro | Phone-size board of mission 4; title card with MIT + "This effort is supported by Qollab & IonQ" | "Open source, MIT. Built for the Qollab × IonQ Hackathon 2026." |

## Production notes
- Capture with the Playwright-driven recorder (`scripts/record-demo.mjs`) or a screen recorder; 30 fps; ffmpeg to H.264 MP4, AAC silent track optional.
- Keep the real UI; no mock-ups. Mission 6 must show the *actual* debrief text.
- Verify duration with `ffprobe`; `npm run verify:release` enforces 120–180 s.
- Store at `submission/DEMO.mp4` (git-ignored). Record sha256 in `EVIDENCE_INDEX.md`. Do not upload without approval.
