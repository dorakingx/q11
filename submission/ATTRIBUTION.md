# Attribution & disclosure

**This effort is supported by Qollab & IonQ.**

## Authorship
- Concept, design, implementation and verification: Tomoya Hatanaka (GitHub `dorakingx`), 2026-10-10 → 2026-10-12 JST, during the Qollab × IonQ Global Quantum Hackathon window.
- AI assistance: **Claude Code (Anthropic, model Claude Fable 5.1)** was used extensively for code generation, test authoring, documentation drafting and asset generation under the author's direction. All quantum definitions were machine-verified (see `reports/quantum-verification.json`). Disclosed per the hackathon terms.

## Libraries (all MIT-licensed unless noted) — exact versions in `package-lock.json` / `quantum/requirements.txt`
| Library | Version | License | Use |
|---|---|---|---|
| React / react-dom | 18.3.1 | MIT | UI |
| Vite | 6.4.4 | MIT | build |
| TypeScript | 5.9.3 | Apache-2.0 | language (dev only, not shipped) |
| Vitest | 3.2.7 | MIT | unit tests (dev) |
| Playwright | 1.64.0 | Apache-2.0 | e2e tests (dev) |
| ESLint + typescript-eslint | 9.39.5 / 8.71.1 | MIT | lint (dev) |
| sharp | 0.35.5 | Apache-2.0 | icon rasterisation (dev) |
| tsx | 4.23.15 | MIT | TS script runner (dev) |
| Qiskit | 2.5.2 | Apache-2.0 | reference circuits / quantum_info cross-check / Qollab runtime |
| qiskit-aer | 0.17.2 | Apache-2.0 | local statevector/shots simulation (verification only) |
| qiskit-ionq | 1.1.1 | Apache-2.0 | installed for API-compat checks; **no IonQ API key is used by this project** |
| NumPy | 2.x | BSD-3 | Python reference |

The shipped web app contains only React/react-dom at runtime (MIT). Apache-2.0 tools are development-time dependencies; the Qollab project depends on Qiskit (Apache-2.0), which the Qollab platform provides.

## References consulted (no code copied)
- Stabilizer formalism and surface-code layout: IBM Quantum Learning, "Foundations of quantum error correction — Stabilizer codes"; Pauli propagation rules through Clifford gates (standard textbook results, e.g. Nielsen & Chuang; Gottesman's stabilizer formalism).
- Qollab docs: runtime environment, JS/Qiskit projects, compute backends (read 2026-10-10).
- Vercel docs: Deployment Protection / Vercel Authentication.

## Assets
- All icons, glyphs (flames, helmets, alarm stations, wordmark) and the Q-ring logo are original SVGs created for Q11. No third-party art, emoji sets, fonts (system font stack only), or agency insignia.
- Sounds: synthesized at runtime with Web Audio; no samples.

## Not used
- No templates, no forked Qollab projects, no pre-existing codebase of the author.
