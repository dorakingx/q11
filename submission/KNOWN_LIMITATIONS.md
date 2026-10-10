# Known limitations (honest scope statement — keep current)

## Physics / model
- **Clifford + Pauli educational model.** Errors are Pauli frames (binary symplectic); gates are Clifford (H, S, CNOT, CZ, SWAP). No non-Clifford gates, no coherent/amplitude-damping noise, no leakage, no crosstalk.
- **Perfect syndrome extraction.** Alarms are ideal parity checks; measurement errors, repeated rounds and detection events (round-to-round differences) are not modelled (P2 in the spec).
- **Codes.** 3-qubit repetition code (X-noise only; a single Z is undetectable — the game says so) and the distance-3 rotated surface code (9 data, 8 checks). Distance 3 ⇒ any single error is corrected; two errors can cause a logical flip (Mission 6 shows this on purpose).
- **Decoder.** Minimum-weight lookup table (brute force), used only for the Debrief comparison. No MWPM/union-find, no soft information.
- **Verdict.** Residual R = C·E classified by GF(2) algebra (stabilizer / logical / detectable). Global phase is dropped; signs of stabilizers are not tracked because the game never prepares states with negative-sign stabilizers.
- **Hook errors from ancillas are not simulated** in the web game (syndrome extraction is treated as ideal). The Qollab circuit does extract syndromes with real ancillas but with noiseless injection.

## Quantum backends
- Measurement counts from simulators are **statistics, not proofs**: the algebraic verification is the proof; the circuits demonstrate agreement under an ideal simulator and *approximate* agreement under IonQ noise-model simulators.
- IonQ remote simulators accept **one job per run**; the Qollab page therefore verifies one mission per Run.
- No QPU (hardware) runs were performed. No claim of quantum advantage or fault tolerance.
- Cloud results shown in the web game are **cached** (labelled) or absent; live cloud execution only happens inside Qollab.

## Game design
- Mission 5's palette is X and Z only. With a Y crew allowed, the alarm pattern (Z0, Z2, X1) has two equally likely minimum-weight explanations (X1·Z6/Z7 vs Y1·Z4) that differ by a logical Z; rather than score a defensible call as a failure, the mission removes the ambiguity. Y is taught in mission 2.
- Hand-made missions only (fixed errors per mission, seeded fixtures for verification). No procedurally generated missions.

## Software
- Client-side game; progress is in localStorage (none inside Qollab's sandbox). Not a tamper-proof competitive system.
- E2E runs on Chromium (desktop 1280×800, tablet 768×1024, phone 390×844) and Playwright WebKit (desktop; smoke/city/spray specs); no physical Safari or phone was tested. Per-test timeout 120 s; the viewport matrix runs once on desktop-chromium (the other projects skip it by design).
- Inside Qollab, the game runs in a sandboxed iframe: no storage between runs (progress is in memory for that Run), and the page's **Verify** button is the only way to send an IonQ job (one per Run). Browser-automation tools cannot click inside that iframe, so the page's IonQ path was verified with the on-load self-test variant (same code path), see `reports/qollab-runs.md` run 8.
- Japanese UI: implemented on every screen (EN/JA switch on the title screen and in Settings). The original mission reports, replay step captions and the what-if explanation shown under Details are generated in English.
- Sound is minimal (Web Audio tones), off by default.

## Redesign (2026-10-10 evening)
- The city map, scene art and spray animation are original SVG; animation timing is presentation only (outcomes come from the engine before the animation starts).
- Automated browser checks: Chromium (desktop/tablet/phone emulation) and Playwright WebKit for the smoke/city/spray flows; no physical phone was tested.
- Japanese copy was written for children by the author with AI assistance; the English fixture texts remain the reference for physics statements.

## Process
- Built 2026-10-10 → 2026-10-12 JST within the hackathon window with AI assistance (Claude Code); disclosed in ATTRIBUTION.md.
