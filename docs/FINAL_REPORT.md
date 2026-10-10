# Q11 — Final build report, redesigned build (2026-10-10 23:50 JST; deadline 2026-10-12 08:00 JST)

> Applies to commit **b0a6f5f** (web sources verified at **c3581f9**; b0a6f5f adds only reports, docs and the rebuilt Qollab bundle). The earlier report for the card-list build (2cfae98, 12:35 JST) is superseded. Fun is not self-certified: what is claimed below is what was executed and recorded.

**Status: READY_FOR_RELEASE_APPROVAL.** Every A1–A9 and R1–R15 gate passes with execution evidence; nothing has been published or submitted.

## Redesign acceptance criteria R1–R15 (`docs/UX_REDESIGN.md`)
| # | Criterion | Result | Evidence (executed) |
|---|---|---|---|
| R1 | City map replaces the card list (original SVG city; clickable districts with locked / available / selected / solved states) | PASS | `src/ui/city/*`, `src/ui/art/*`; e2e `city.spec.ts` (statuses, locked toast, panel) on 4 projects; screenshots `reports/screenshots/after/city-{1440x900,768x1024,390x844,375x812}.png`, `city-panel-1280x800.png`; demo 0:24–0:32 |
| R2 | Dispatch travel: truck drives along the road (~1.5 s, skippable, static under reduced motion) | PASS | `CityScreen` rAF drive on `getPointAtLength`; e2e "truck drive finishes on its own … dispatches exactly once" + skip test (incl. WebKit); demo 0:32–0:36 |
| R3 | Sequential progression, replayable solved districts, free roam for judges, save v1→v2 migration, Qollab storage note | PASS | unit `src/game/city.test.ts`, `persistence.test.ts` (migration); e2e city free-roam flow; settings screenshot; Qollab page shows the in-memory-progress note |
| R4 | Scene art: houses/detectors/firefighters/trucks/hoses, warm toy style, no numbered circles/emoji/glow/dark grids; detector tap highlights watched houses; roads never propagate | PASS | `src/ui/scene/Scene.tsx` + `src/ui/art`; `reports/art/gallery.png`, `reports/scene/*.png`, after-screenshots (challenge, spray-mid, results); e2e detector highlight (`.watch-tint` count 4 / `data-watch-q`); propagation stays in the engine (`src/quantum`) |
| R5 | Three-tap first run (pick crew → tap house → spray) with separate beginner callouts | PASS | tutorial flag in save v2; e2e `smoke.spec.ts` first-run flow + callout DOM order on mobile; `tutorial-1280x800.png`; demo 0:08–0:24 |
| R6 | Planning stage with undo/redo/clear/preview, tap-only, mobile scene-first + bottom bar, ≥48 px targets | PASS | `machine.ts` plan history (unit tests); e2e `missions.spec.ts` undo/redo; `viewports.spec.ts` at 375/390/768/1440 (no horizontal overflow, bottom bar never covers the scene, target sizes) |
| R7 | Spray showpiece (2–3 s, skippable, deterministic; one Pauli correction per house; same-type extinguishes, different type changes the component, wrong correction on an empty house ignites) | PASS | `src/game/effects.ts` deterministic timeline (unit tests); `SprayPlayer`; e2e `spray.spec.ts` (restored / safe-pattern / still-burning / logical-failure, skip, reduced-motion stepper, rapid taps); `spray-mid-*.png`; demo 0:16–0:20, 1:20 |
| R8 | Secrecy: Training may show true fires; Challenge pre-confirm leaks nothing (flames/smoke/sound/DOM/ARIA/hints identical); after confirm labelled "Training replay: answer check" | PASS | source-scan unit test (UI never reads the true error before confirm; `Debrief.alternative` comes from the engine); e2e hint non-leak (DOM/ARIA diff between candidate houses); `challenge-*.png` (identical fog) |
| R9 | Four results readable on the board; memory beacon only at result time | PASS | `ResultOverlay` + e2e `spray.spec.ts` result 1–4 (`data-result` = restored / safe-pattern / still-burning / logical-failure, beacon shows logical X pattern `XXXIIIIII` only after confirm); screenshots `result-*-{4 sizes}.png`; demo 1:20–1:30 |
| R10 | One lesson per district; reaction/prediction/discovery per action; retry same situation; "Why?" animated comparison; non-blaming silent failure | PASS | mission copy EN/JA (`src/ui/i18n/missions.*`), `WhyCompare`; e2e `missions.spec.ts` walks all six districts (training predictions, Why?, Try again); `why-*.png`; demo 1:30–1:48 |
| R11 | EN/JA switch; kid-friendly text first, jargon under "Details" | PASS | `src/ui/i18n` (470+ keys, unit parity tests); e2e language toggle; JA title in the demo's phone insert |
| R12 | Sound opt-in only; reduced motion = static frames with step-through | PASS | settings (Sound off by default, Reduce motion); e2e reduced-motion stepper test (prev/next, fog lifts at spray-start) |
| R13 | React/Vite kept; state / public info / effects / rendering separated; no double application on skip/retry/rapid taps | PASS | `src/game/{machine,effects,replay}.ts` + tests; e2e rapid-tap/skip/retry (`spray.spec.ts`), "dispatches exactly once" (`city.spec.ts`) |
| R14 | lint/typecheck/unit/e2e/build/verify:quantum/verify:release pass; new tests; browser checks at 375×812 / 390×844 / 768×1024 / 1440×900 (+ WebKit); input ≤100 ms measured | PASS | `node scripts/verify-release.mjs` exit 0 at c3581f9 (see below); `viewports.spec.ts` matrix; desktop-webkit project (smoke/city/spray); `reports/perf.json` max 3.9 ms |
| R15 | build:qollab + embedded page updated and run (Local / Cached / Live labels kept); mission texts, README, submission docs, new 120–180 s demo; same private repo + same protected Vercel project; unauth blocked / auth works | PASS | Qollab run 12 (built-in simulator, exact, job 601a8c4d…); cloud panel labels unchanged (`fixtures/cloud-results.json` = cached real results); README + `submission/*` rewritten; DEMO.mp4 138.4 s; deployment dpl_DtPwF1mnrNuL7S1VKcVNqVeGdCLP checked (16/16 blocked, authenticated OK) |

## A1–A9 (original spec)
| # | Criterion | Result | Evidence |
|---|---|---|---|
| A1 | 6 missions, propagation, hidden syndrome, correction, replay playable | PASS | web (Vite/React) + Qollab JS page; e2e walks every district (training, challenge, spray, results, Why?, retry), keyboard, mobile, tablet, WebKit |
| A2 | Quantum model tests + independent Qiskit comparison | PASS | vitest 435/435 (25 files, incl. `src/quantum` 82); `quantum/verify.py` 4,746 comparisons, 0 mismatches, 48 Aer mission runs (qiskit 2.5.2 / aer 0.17.2) |
| A3 | lint/typecheck/unit/e2e/build/verify:release | PASS | `node scripts/verify-release.mjs` exit 0 at c3581f9: lint 0 · typecheck 0 · unit 435 · build 0 · verify:quantum 4746/0 · e2e 91 passed / 9 skipped-by-design / 0 failed · demo 138 s · secret-like lines 0 |
| A4 | Real-browser desktop/mobile screens | PASS | 62 after-screenshots at 4 sizes (+ 6 before) reviewed; manual play in the Claude browser pane and the Qollab preview |
| A5 | GitHub private, verified commit pushed | PASS | `github.com/dorakingx/q11` private; verified web SHA c3581f9; b0a6f5f (reports/docs/bundle) pushed; working tree clean |
| A6 | Protected Vercel deployment | PASS | dpl_DtPwF1mnrNuL7S1VKcVNqVeGdCLP = q11-pou4pz35d-doraking.vercel.app (SHA b0a6f5f) + aliases: 16/16 anonymous → 302 sso-api (`reports/protection-check.json`, 13:43 UTC); authenticated fetch returns the app (title + assets/index-DK6lR-WY.js = local build); bypass secret revoked (0 after); sso "all", no password/IP rules |
| A7 | Qollab IonQ simulator run of a core mission | PASS | IonQ Aria 1 jobs 01a12375 (rep3), 01a12378 + 01a12396 (blind-dispatch; Python runner + JS page bridge), 01a1237b (silent-failure, logical flip 97 %); built-in simulator exact on the final bundle (run 12, job 601a8c4d-c67b-4c78-a09b-ea4433446a44) — circuits unchanged by the redesign |
| A8 | Icons, README/MIT/attribution/Qollab materials, demo video | PASS | icon set unchanged; MIT; `submission/*.md` rewritten; DEMO.mp4 138.4 s sha256 3596c11d… (local only) |
| A9 | No publish/submit; only approval pending | PASS | Qollab draft unpublished (card/About/tags filled), repo private, Vercel protected, video not uploaded, team page 0/5 submitted |

## Commands and exit codes (final run, 2026-10-10 13:38–13:45 UTC)
- `node scripts/verify-release.mjs` → 0 — inside it: `npm run -s lint` 0 (37.5 s) · `npm run -s typecheck` 0 · `npm run -s test:unit` 0 (25 files, 435 tests) · `npm run -s build` 0 · `node scripts/verify-quantum.mjs` 0 (4,746 compared / 0 mismatches) · `npm run -s test:e2e` 0 (91 passed, 9 skipped, 108 s; desktop-chromium / mobile-chromium / tablet-chromium / desktop-webkit) · DEMO.mp4 138 s within 120–180 · secret scan 0 → `reports/release-verification.{json,log}`
- `BASE_URL=http://localhost:4173 node scripts/record-demo.mjs` → 0 (79 shots; `reports/demo-recording.json`)
- `npm run build:qollab` → 0 (17 files, 668 KiB) → Qollab Run (built-in simulator) → self-test exact
- `node scripts/check-protection.mjs <deployment + 3 aliases>` → 0 (16/16 blocked); `npx vercel@latest curl / --deployment …` → app HTML; bypass secret revoked (PATCH protection-bypass → 0)
- Earlier the same evening: full e2e 84/9/7 (7 test-side) → fixes → targeted 64/65 (WebKit skip click) → bounded → 6/6 ×3 (`reports/e2e-full.log`, `reports/e2e-rerun.log`, `reports/e2e-city-webkit-rerun.log`)

## Where things are
- Repo: `https://github.com/dorakingx/q11` (private), branch `main`, HEAD b0a6f5f (+ this docs commit).
- Protected deployment: `https://q11-pou4pz35d-doraking.vercel.app` (+ aliases q11-pied / q11-doraking / q11-git-main-doraking .vercel.app) — requires Vercel login; every push to `main` deploys.
- Qollab draft (owner only, unpublished): `https://qollab.xyz/u/doraking/q11-quantum-emergency-response` — final bundle, card, About, tags, thumbnail filled.
- Demo video: `submission/DEMO.mp4` (git-ignored, local only), 138.4 s, sha256 `3596c11ddf55a736337cde08080b71df9e16caa2f07b109923a0a79509fec3a7`; storyboard `submission/DEMO_SCRIPT.md`.
- Screenshots: `reports/screenshots/before/` (6, card-list build) and `reports/screenshots/after/` (62: city, briefing, training, challenge, spray-mid, four results, why, summary, settings, how, title at 1440×900 / 768×1024 / 390×844 / 375×812 + tutorial / city-panel at 1280×800); art previews `reports/art/`, `reports/city/`, `reports/scene/`.
- Submission texts: `submission/PROJECT_PAGE.md` (pasted into the Qollab card), `SHORT_DESCRIPTION.md` (About), `DEMO_SCRIPT.md`, `ATTRIBUTION.md`, `QOLLAB_IMPORT.md`, `RELEASE_CHECKLIST.md`, `KNOWN_LIMITATIONS.md`, `EVIDENCE_INDEX.md`.

## Open items (not blockers)
- Publication requires the user's explicit approval per `submission/RELEASE_CHECKLIST.md` (below the line): Qollab Publish, public demo-video link, optional repo public / Vercel unprotect, captain submission on the team page before Oct 11 19:00 ET (= Oct 12 08:00 JST).
- Known limitations: `submission/KNOWN_LIMITATIONS.md` (Clifford+Pauli, perfect syndromes, distance 3, no QPU, WebKit automated e2e limited to smoke/city/spray, in-memory progress inside Qollab).
