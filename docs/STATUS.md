# Q11 Status

_Last updated: 2026-10-10 11:15 JST_

Overall: **IN PROGRESS** (foundation phase). Nothing deployed, nothing published.

## A1–A9
| # | Criterion | State | Evidence |
|---|---|---|---|
| A1 | 6 missions, propagation, hidden syndrome, correction, replay playable | IN PROGRESS (implemented, verifying) | src/game + src/ui complete; e2e flows for all missions pass; manual play check pending |
| A2 | Quantum model tests + independent Qiskit comparison pass | PASS (so far) | `npx vitest run src/quantum` 82/82; `.venv/bin/python quantum/verify.py` 4749 comparisons, 0 mismatches (exit 0) — `reports/QUANTUM_VERIFICATION.md` |
| A3 | lint/typecheck/unit/e2e/build/verify:release pass | IN PROGRESS | 2026-10-10 10:50: lint 0, typecheck 0, unit 137/137, build OK; e2e 24/26 in the full run (quality.spec flaky under full parallel load; passes alone 4/4) — investigating; verify:release not yet run |
| A4 | Real-browser desktop/mobile screens checked | IN PROGRESS | Playwright screenshots (title, mission1/4 challenge, mission6 debrief, mobile title/mission4) reviewed by the orchestrator: no overlap/clipping; Qollab-mode bundle mounted in the local harness (title → missions → board) |
| A5 | GitHub private, verified commit pushed | IN PROGRESS | `dorakingx/q11` created private 2026-10-10 00:28 UTC (`isPrivate: true`); `main` pushed; final verified SHA pending |
| A6 | Protected Vercel deploy works with auth, blocked without | IN PROGRESS | project `q11` (prj_JIAQjMOr0rAnEHwhbY46UaeTNonL) created with `ssoProtection.deploymentType="all"` BEFORE any deployment; linked to GitHub `dorakingx/q11`, production branch `main`; first deployment `dpl_BMJ2zXAFvDsSCz5HMPwp6BjQPvqr` (production, Git push, SHA 809c365) READY; anonymous check of 16 URL/path combos on q11-gwwim0mw3-doraking / q11-git-main-doraking / q11-doraking / q11-pied .vercel.app → all 302 → vercel.com/sso-api, no app body (`reports/protection-check.json` passed). Authenticated fetch via `npx vercel@latest curl` returned the app HTML (title confirmed); the automation bypass secret that command auto-created was revoked right after. Final verified-SHA deployment pending. |
| A7 | Qollab IonQ simulator run of core mission confirmed | PASS | Draft project created in the user's account (private). Early check circuit (rep3 syndrome extraction + correction) ran on **Built-in simulator** (200 shots) and on **IonQ Aria 1 remote simulator** (`ionq_simulator`, 100 shots, 18.9 s) with results matching the Pauli-frame prediction 100% — `reports/qollab-runs.md`. **Core mission confirmed on IonQ**: blind-dispatch rsc3 circuit (17 qubits) ran on the Qollab built-in simulator (job aea7dacd…, exact match) and on **IonQ Aria 1 remote simulator** (job 01a12375-0bf0-71f4-ae8f-e30bd8185309, 100 shots, dominant syndrome 78%, majority logical 94%). Also silent-failure on IonQ Aria 1 (job 01a1237b-5f60-7349-89d0-a343dca0201c): predicted logical flip observed (97%). Raw counts in `reports/qollab-runs/*.json`. JS game page uploaded to the draft: renders above the console; on-load self-test through the JS→Python bridge on the built-in simulator exact (job 7d179532…). IonQ Aria 1 through the page's bridge: job 01a12396-c213-7984-9259-bb3fb25b8f46 (76% predicted alarms, 97% predicted logical bit). Shipped main.js restored (self-test local-only). |
| A8 | Icons, README/MIT/attribution/Qollab materials, demo video | IN PROGRESS | icons done (`reports/icons/REVIEW.md`); README/MIT/ATTRIBUTION/PROJECT_PAGE/DEMO_SCRIPT/QOLLAB_IMPORT/KNOWN_LIMITATIONS/RELEASE_CHECKLIST/EVIDENCE_INDEX drafted; DEMO.mp4 not recorded yet |
| A9 | No publish/submit performed; only approval pending | OK so far | nothing public |

## Open P0 items
- [ ] Scaffold Vite/React/TS + vitest + playwright + eslint, pinned, lockfile
- [ ] Engine + tests; Python reference; fixtures; verify:quantum
- [ ] Game state machine, 6 missions, UI, settings, persistence
- [ ] E2E suite + screenshots
- [ ] Icon set
- [ ] Private repo + protected Vercel project + deploy + protection check
- [ ] Qollab draft project + simulator runs (built-in, IonQ)
- [ ] Submission docs + DEMO.mp4

## Blocked / external
- Qollab access: RESOLVED 2026-10-10 10:05 JST — the user authorised use of their signed-in Brave browser (Claude in Chrome). Team page confirms: Tomoya Hatanaka, captain, solo, node IIIT Dharwad (Professional), 0 of 5 submitted. Submission form fields: public project (radio), theme (Impact/Playground/Unlocked/Other), demo video URL (≤512 chars; YouTube/Loom/Vimeo/Google Drive, no sign-in), optional 'What didn't work?' (≤4000), 'version outside Qollab runs on IonQ' checkbox, 'Dependencies and environment' textarea, confirmation checkbox. The project's About/description (≤240 chars) and the Project Card write-up are the submission text. Nothing was submitted.
- Vercel MCP connector has no access to team scope `doraking` (403); using the authenticated Vercel CLI instead (works).

## Verification log
(appended as commands run — command, exit code, counts)
- 2026-10-10 09:35 `npm run typecheck` exit 0; `npm run lint` exit 0; `npm run build` exit 0 (scaffold)
- 2026-10-10 09:33 `gh repo view dorakingx/q11 --json isPrivate` → true
- 2026-10-10 09:49 `node scripts/check-protection.mjs <4 urls>` exit 0 — ssoProtection all, 16/16 anonymous requests blocked (302 → vercel.com/sso-api), 0 body leaks
- 2026-10-10 09:47 `npx vercel@latest api /v9/projects/q11` → ssoProtection.deploymentType = "all", passwordProtection null, trustedIps null, latestDeployments []
