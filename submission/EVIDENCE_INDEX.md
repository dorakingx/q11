# Evidence index (filled with real values as gates pass — no placeholders are to be treated as results)

| Area | Evidence | Location / value |
|---|---|---|
| Spec | Build specification kept verbatim | `spec/Q11_BUILD_SPEC.md` (sha256 `e1236c4ccb1a942eedf5d63626c8aae597f6eea198aaf96dcaf6867769529aa6`) |
| Unit tests | vitest run output | `npm run test:unit` — count: _pending_ |
| Quantum verification | TS vs Python/Qiskit comparison report | `reports/quantum-verification.json`, `reports/QUANTUM_VERIFICATION.md` — cases: _pending_, mismatches: _pending_ |
| E2E | Playwright run (desktop-chromium, mobile-chromium) | `npm run test:e2e` — count: _pending_; `playwright-report/` (local) |
| Build | `npm run build` | exit: _pending_ |
| Release aggregate | `npm run verify:release` | `reports/release-verification.json` — passed: _pending_ |
| Real-browser screenshots | title, dispatch, propagation replay, silent failure, mobile | `reports/screenshots/*.png` (local, git-ignored) — reviewed on: _pending_ |
| Icons | SVG + PNG set, small-size review | `public/`, `reports/icons/REVIEW.md` |
| GitHub | private repo, HEAD | `https://github.com/dorakingx/q11` — `isPrivate: true` (checked 2026-10-10 00:28 UTC); final SHA: _pending_ |
| Vercel project | protection set before first deploy | `prj_JIAQjMOr0rAnEHwhbY46UaeTNonL`, `ssoProtection.deploymentType = "all"` (2026-10-10 00:47 UTC, `latestDeployments: []` at that time) |
| Vercel deployment | protected deployment URL, id, git SHA, anonymous check | `reports/protection-check.json` — _pending_ |
| Qollab | draft project, built-in simulator runs, IonQ simulator runs | `reports/qollab-runs.md`: draft `qollab.xyz/u/doraking/q11-quantum-emergency-response` (private); built-in simulator: rep3 early check + blind-dispatch (exact match); IonQ Aria 1: rep3 early check, blind-dispatch (job 01a12375…, 01a12378…), silent-failure (job 01a1237b…); raw counts `reports/qollab-runs/*.json` |
| Demo video | 120–180 s recording of the real app | `submission/DEMO.mp4` (local only, git-ignored), recorded 2026-10-10 02:15 UTC by `scripts/record-demo.mjs` from the built app at localhost:4173 — duration 146 s, 4,063,995 bytes, sha256 `75a4dd7af15b8f98279e9450390907723003f4d9f46fb95d803ba1c5c4d90765` (`reports/demo-recording.json`); NOT uploaded anywhere |
| Submission docs | project page, descriptions, script, attribution, import, checklist, limitations | `submission/*.md` |
| Publication | NOT performed | Qollab unpublished draft; repo private; Vercel protected; video not uploaded |
