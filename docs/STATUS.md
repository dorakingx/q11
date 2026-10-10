# Q11 Status

_Last updated: 2026-10-10 09:30 JST_

Overall: **IN PROGRESS** (foundation phase). Nothing deployed, nothing published.

## A1–A9
| # | Criterion | State | Evidence |
|---|---|---|---|
| A1 | 6 missions, propagation, hidden syndrome, correction, replay playable | TODO | — |
| A2 | Quantum model tests + independent Qiskit comparison pass | TODO | — |
| A3 | lint/typecheck/unit/e2e/build/verify:release pass | TODO | — |
| A4 | Real-browser desktop/mobile screens checked | TODO | — |
| A5 | GitHub private, verified commit pushed | TODO | repo not yet created |
| A6 | Protected Vercel deploy works with auth, blocked without | TODO | project not yet created |
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
- Qollab run requires the user's signed-in Qollab session in a browser (no API/CLI). To be checked.

## Verification log
(appended as commands run — command, exit code, counts)
