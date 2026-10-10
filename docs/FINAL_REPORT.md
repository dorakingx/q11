# Q11 — Final build report (2026-10-10 12:35 JST; deadline 2026-10-12 08:00 JST)

**Status: READY_FOR_RELEASE_APPROVAL.** All A1–A9 gates pass with execution evidence; nothing has been published or submitted.

| # | Criterion | Result | Evidence |
|---|---|---|---|
| A1 | 6 missions, propagation, hidden syndrome, correction, replay playable | PASS | web (Vite/React) + Qollab JS page; e2e 32/32 covers every mission, replay, retry, keyboard, mobile |
| A2 | Quantum model tests + independent Qiskit comparison | PASS | vitest 158/158; `quantum/verify.py` 4,746 comparisons, 0 mismatches (symplectic replay, Clifford evolve, dense operators, StabilizerState on six logical eigenstates, Aer mission circuits, BasicSimulator) |
| A3 | lint/typecheck/unit/e2e/build/verify:release | PASS | `node scripts/verify-release.mjs` exit 0 at SHA 98fc691: lint 0 · typecheck 0 · unit 158 · build 0 · verify:quantum 4746/0 · e2e 32/32 · demo 149 s · secret scan 0 |
| A4 | Real-browser desktop/mobile screens | PASS | Playwright screenshots (6) reviewed; manual checks in the Claude browser pane at desktop and 375×812 |
| A5 | GitHub private, verified commit pushed | PASS | `github.com/dorakingx/q11` isPrivate=true; code SHA d537465 (verified 98fc691 + shipped bundle) |
| A6 | Protected Vercel deployment | PASS | project `q11`, Vercel Authentication = All Deployments since creation; deployment dpl_x1f6VTdK8hLQ6HNGpT3kvniv8iHz (q11-dllwgw7a6-doraking.vercel.app, SHA d537465): 16/16 anonymous → 302 sso-api; authenticated fetch returns the app; transient bypass secret revoked |
| A7 | Qollab IonQ simulator run of a core mission | PASS | draft `qollab.xyz/u/doraking/q11-quantum-emergency-response` (private): IonQ Aria 1 jobs 01a12375 (rep3), 01a12378 + 01a12396 (blind-dispatch, Python runner + JS page bridge), 01a1237b (silent-failure, logical flip observed 97%); built-in simulator exact (latest 944f6891 on the final bundle) |
| A8 | Icons, README/MIT/attribution/Qollab materials, demo video | PASS | `public/` icon set; MIT; `submission/*.md`; `submission/DEMO.mp4` 149 s sha256 d3260716… (local only) |
| A9 | No publish/submit; only approval pending | PASS | Qollab draft unpublished (card filled), repo private, Vercel protected, video not uploaded, team page 0/5 submitted |

## Commands and exit codes (final run, 2026-10-10 03:28–03:30 UTC)
- `npm run lint` → 0 · `npm run typecheck` → 0 · `npm run test:unit` → 0 (17 files, 158 tests)
- `npm run build` → 0 · `node scripts/verify-quantum.mjs` → 0 (4,746 compared / 0 mismatches / 48 Aer runs)
- `npm run test:e2e` → 0 (32 passed: desktop-chromium 16, mobile-chromium 16)
- `node scripts/verify-release.mjs` → 0 (PASS, `reports/release-verification.json`)
- `node scripts/check-protection.mjs <final deployment + 3 aliases>` → 0 (16/16 blocked)

## Where things are
- Repo: `https://github.com/dorakingx/q11` (private), branch `main`.
- Protected deployment: `https://q11-dllwgw7a6-doraking.vercel.app` (+ aliases q11-pied.vercel.app, q11-doraking.vercel.app, q11-git-main-doraking.vercel.app) — requires Vercel login.
- Qollab draft (owner only): `https://qollab.xyz/u/doraking/q11-quantum-emergency-response`.
- Demo video: `submission/DEMO.mp4` (git-ignored, local), report `reports/demo-recording.json`.
- Icons: `public/icon.svg`, `favicon.ico`, PNG 16/32/64/180/192/512, `wordmark.svg`, `og-image.png`.
- Submission texts: `submission/PROJECT_PAGE.md` (already pasted into the Qollab card), `SHORT_DESCRIPTION.md`, `DEMO_SCRIPT.md`, `ATTRIBUTION.md`, `QOLLAB_IMPORT.md`, `RELEASE_CHECKLIST.md`, `KNOWN_LIMITATIONS.md`, `EVIDENCE_INDEX.md`.

## Open items (not blockers)
- Publication steps require the user's explicit approval (RELEASE_CHECKLIST, below the line): Qollab Publish, public demo-video link, optional repo public / Vercel unprotect, captain submission on the team page before Oct 11 19:00 ET.
- Known limitations are listed in `submission/KNOWN_LIMITATIONS.md` (Clifford+Pauli, perfect syndromes, distance 3, no QPU, Chromium-only automated e2e, in-memory progress inside Qollab).
