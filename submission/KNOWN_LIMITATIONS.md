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

## Software
- Client-side game; progress is in localStorage (none inside Qollab's sandbox). Not a tamper-proof competitive system.
- E2E tests run on Chromium (desktop + mobile emulation). WebKit/real Safari was **not** part of automated runs unless stated in EVIDENCE_INDEX.
- Japanese UI (P1) not implemented unless EVIDENCE_INDEX says otherwise. English only.
- Sound is minimal (Web Audio tones), off by default.

## Process
- Built 2026-10-10 → 2026-10-12 JST within the hackathon window with AI assistance (Claude Code); disclosed in ATTRIBUTION.md.
