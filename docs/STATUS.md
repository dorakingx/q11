# Q11 Status

_Last updated: 2026-10-10 12:35 JST_

Overall: **READY_FOR_RELEASE_APPROVAL** — every pre-publication gate passes; the only remaining steps are the user-approved publication actions in `submission/RELEASE_CHECKLIST.md` (Qollab publish, demo-video link, optional repo/Vercel visibility, captain submission). Nothing has been published or submitted.

## A1–A9
| # | Criterion | State | Evidence |
|---|---|---|---|
| A1 | 6 missions, propagation, hidden syndrome, correction, replay playable | PASS | all six missions playable web + Qollab page; e2e covers every mission flow, replay, retry, keyboard, mobile; orchestrator played title/how/settings/mission 2 training/mission 4 & 6 dispatch+debrief in the built-in browser (desktop + 375×812) |
| A2 | Quantum model tests + independent Qiskit comparison pass | PASS (so far) | `npx vitest run src/quantum` 82/82; `.venv/bin/python quantum/verify.py` 4749 comparisons, 0 mismatches (exit 0) — `reports/QUANTUM_VERIFICATION.md` |
| A3 | lint/typecheck/unit/e2e/build/verify:release pass | PASS | After the review-fix wave (2396e1b): lint 0, typecheck 0, unit 158/158 (17 files), e2e 32/32, build 0, Python 4746/0 (orchestrator runs 03:20–03:27 UTC); final verify:release pending the demo re-record. Earlier: `node scripts/verify-release.mjs` at SHA 0e950e8 (2026-10-10 02:24 UTC): lint 0, typecheck 0, unit 137/137 (16 files), build 0, verify:quantum 4749/0 mismatches, e2e 26/26 (desktop + mobile), DEMO.mp4 146 s, secret scan 0 → PASS (`reports/release-verification.json`, `reports/release-verification.log`). Earlier 24/26 was a 30 s timeout under load → per-test timeout 90 s; a later failure was port 4173 held by a manual preview server (environmental). |
| A4 | Real-browser desktop/mobile screens checked | PASS | Playwright screenshots (title, mission1/4 challenge, mission6 debrief, mobile title/mission4) reviewed by the orchestrator: no overlap/clipping; Qollab-mode bundle mounted in the local harness (title → missions → board) |
| A5 | GitHub private, verified commit pushed | PASS | `dorakingx/q11` private (`isPrivate: true`, re-checked 2026-10-10 03:29 UTC); `main` pushed; verified code SHA **98fc691** (verify:release PASS) = same code as **d537465** (adds the shipped Qollab bundle/data) — later commits are docs only |
| A6 | Protected Vercel deploy works with auth, blocked without | PASS | project `q11` (prj_JIAQjMOr0rAnEHwhbY46UaeTNonL) created with Vercel Authentication = All Deployments BEFORE any deployment; Git-connected to the private repo (production branch `main`). Final deployment **dpl_x1f6VTdK8hLQ6HNGpT3kvniv8iHz** = `q11-dllwgw7a6-doraking.vercel.app`, githubCommitSha **d537465**, READY. Anonymous: 16/16 requests (deployment URL + aliases q11-git-main-doraking / q11-doraking / q11-pied .vercel.app × 4 paths) → 302 to vercel.com/sso-api, no app body (`reports/protection-check.json`, 03:30 UTC). Authenticated (`npx vercel@latest curl`): returned the app HTML (title + assets/index-DBGQXHEr.js, same hash as the local build); the auto-created bypass secret was revoked immediately (protectionBypass: 0 after). passwordProtection null, trustedIps null. |
| A7 | Qollab IonQ simulator run of core mission confirmed | PASS | Draft project created in the user's account (private). Early check circuit (rep3 syndrome extraction + correction) ran on **Built-in simulator** (200 shots) and on **IonQ Aria 1 remote simulator** (`ionq_simulator`, 100 shots, 18.9 s) with results matching the Pauli-frame prediction 100% — `reports/qollab-runs.md`. **Core mission confirmed on IonQ**: blind-dispatch rsc3 circuit (17 qubits) ran on the Qollab built-in simulator (job aea7dacd…, exact match) and on **IonQ Aria 1 remote simulator** (job 01a12375-0bf0-71f4-ae8f-e30bd8185309, 100 shots, dominant syndrome 78%, majority logical 94%). Also silent-failure on IonQ Aria 1 (job 01a1237b-5f60-7349-89d0-a343dca0201c): predicted logical flip observed (97%). Raw counts in `reports/qollab-runs/*.json`. JS game page uploaded to the draft: renders above the console; on-load self-test through the JS→Python bridge on the built-in simulator exact (job 7d179532…). IonQ Aria 1 through the page's bridge: job 01a12396-c213-7984-9259-bb3fb25b8f46 (76% predicted alarms, 97% predicted logical bit). Shipped main.js restored (self-test local-only). |
| A8 | Icons, README/MIT/attribution/Qollab materials, demo video | IN PROGRESS | icons done (`reports/icons/REVIEW.md`); README/MIT/ATTRIBUTION/PROJECT_PAGE/DEMO_SCRIPT/QOLLAB_IMPORT/KNOWN_LIMITATIONS/RELEASE_CHECKLIST/EVIDENCE_INDEX drafted; DEMO.mp4 re-recorded after the fixes (149 s, sha256 d3260716…, local only) — frames reviewed |
| A9 | No publish/submit performed; only approval pending | OK so far | nothing public |

## Qollab draft state (private, unpublished)
- Files: JS/Qiskit project (index.html, main.js, main.css, game/q11-game.js, q11/ package + data, main.py fallback, requirements.txt, README.md). Runs: see `reports/qollab-runs.md` (8 runs; 4 on IonQ Aria 1 with job ids).
- Project Card: write-up pasted from `submission/PROJECT_PAGE.md` (saved), thumbnail = `public/og-image.png`, tags being added (quantum, education, visualization, game). Project Website / Repository fields left empty (both are private until approval).
- **Publish not pressed.**

## P0 items
- [x] Scaffold Vite/React/TS + vitest + playwright + eslint, pinned, lockfile
- [x] Engine + tests; Python reference; fixtures; verify:quantum
- [x] Game state machine, 6 missions, UI, settings, persistence
- [x] E2E suite + screenshots
- [x] Icon set
- [x] Private repo + protected Vercel project + deploy + protection check
- [x] Qollab draft project + simulator runs (built-in, IonQ)
- [x] Submission docs + DEMO.mp4
- [x] Review-wave fixes applied (commit 2396e1b): scoring/stand-down, mission-6 wording from the residual, cloud panel filtered per dispatch, modal focus trap + inert, focus/announcer per screen, a11y minors; orchestrator re-ran lint 0 / typecheck 0 / unit 158 / fixtures idempotent / Python 4746-0 / build 0
- [x] Final: e2e 32/32, Qollab final bundle uploaded + run (job 944f6891…), demo re-recorded (149 s), verify:release PASS at 98fc691, final deployment d537465 protected + authenticated check, final report

## Blocked / external
- Qollab access: RESOLVED 2026-10-10 10:05 JST — the user authorised use of their signed-in Brave browser (Claude in Chrome). Team page confirms: Tomoya Hatanaka, captain, solo, node IIIT Dharwad (Professional), 0 of 5 submitted. Submission form fields: public project (radio), theme (Impact/Playground/Unlocked/Other), demo video URL (≤512 chars; YouTube/Loom/Vimeo/Google Drive, no sign-in), optional 'What didn't work?' (≤4000), 'version outside Qollab runs on IonQ' checkbox, 'Dependencies and environment' textarea, confirmation checkbox. The project's About/description (≤240 chars) and the Project Card write-up are the submission text. Nothing was submitted.
- Vercel MCP connector has no access to team scope `doraking` (403); using the authenticated Vercel CLI instead (works).

## Verification log
(appended as commands run — command, exit code, counts)
- 2026-10-10 09:35 `npm run typecheck` exit 0; `npm run lint` exit 0; `npm run build` exit 0 (scaffold)
- 2026-10-10 09:33 `gh repo view dorakingx/q11 --json isPrivate` → true
- 2026-10-10 12:33 `node scripts/check-protection.mjs` on q11-dllwgw7a6 (SHA d537465) + 3 aliases → 16/16 blocked; `npx vercel@latest curl` authenticated → app HTML; bypass secret revoked (0 after)
- 2026-10-10 12:28 `node scripts/verify-release.mjs` exit 0 at SHA 98fc691 (lint 0 · typecheck 0 · unit 158 · build 0 · verify:quantum 4746/0 · e2e 32/32 · demo 149 s · secrets 0)
- 2026-10-10 12:27 `npm run test:e2e` → 32 passed (desktop 16 + mobile 16)
- 2026-10-10 11:20 `node scripts/verify-release.mjs` exit 0 at SHA 0e950e8 (lint 0 · typecheck 0 · unit 137 · build 0 · verify:quantum 4749/0 · e2e 26/26 · demo 146 s · secrets 0)
- 2026-10-10 11:19 `node scripts/check-protection.mjs` on q11-i57ew4q0l (SHA 43e9c6b) + 3 aliases → 16/16 blocked
- 2026-10-10 11:45 `.venv/bin/python quantum/verify.py` after decoder tie-break alignment → 4746 comparisons, 0 mismatches
- 2026-10-10 09:49 `node scripts/check-protection.mjs <4 urls>` exit 0 — ssoProtection all, 16/16 anonymous requests blocked (302 → vercel.com/sso-api), 0 body leaks
- 2026-10-10 09:47 `npx vercel@latest api /v9/projects/q11` → ssoProtection.deploymentType = "all", passwordProtection null, trustedIps null, latestDeployments []
