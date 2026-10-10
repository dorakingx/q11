# Q11 Status

_Last updated: 2026-10-10 10:00 JST_

Overall: **IN PROGRESS** (foundation phase). Nothing deployed, nothing published.

## A1–A9
| # | Criterion | State | Evidence |
|---|---|---|---|
| A1 | 6 missions, propagation, hidden syndrome, correction, replay playable | TODO | — |
| A2 | Quantum model tests + independent Qiskit comparison pass | TODO | — |
| A3 | lint/typecheck/unit/e2e/build/verify:release pass | TODO | — |
| A4 | Real-browser desktop/mobile screens checked | TODO | — |
| A5 | GitHub private, verified commit pushed | IN PROGRESS | `dorakingx/q11` created private 2026-10-10 00:28 UTC (`isPrivate: true`); `main` pushed; final verified SHA pending |
| A6 | Protected Vercel deploy works with auth, blocked without | IN PROGRESS | project `q11` (prj_JIAQjMOr0rAnEHwhbY46UaeTNonL) created with `ssoProtection.deploymentType="all"` BEFORE any deployment; linked to GitHub `dorakingx/q11`, production branch `main`; first deployment + anonymous check pending |
| A7 | Qollab IonQ simulator run of core mission confirmed | TODO | account session unknown |
| A8 | Icons, README/MIT/attribution/Qollab materials, demo video | TODO | — |
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
- Qollab run requires the user's signed-in Qollab session in a browser (no API/CLI). Checked 2026-10-10 09:40 JST: the Claude browser pane is NOT signed in to qollab.xyz. **User action needed:** sign in at https://qollab.xyz/login inside the Claude browser pane (Google or GitHub, same provider as the hackathon registration). Until then A7 is BLOCKED_EXTERNAL; all Qollab materials are being built locally.
- Vercel MCP connector has no access to team scope `doraking` (403); using the authenticated Vercel CLI instead (works).

## Verification log
(appended as commands run — command, exit code, counts)
- 2026-10-10 09:35 `npm run typecheck` exit 0; `npm run lint` exit 0; `npm run build` exit 0 (scaffold)
- 2026-10-10 09:33 `gh repo view dorakingx/q11 --json isPrivate` → true
- 2026-10-10 09:47 `npx vercel@latest api /v9/projects/q11` → ssoProtection.deploymentType = "all", passwordProtection null, trustedIps null, latestDeployments []
