# Q11 Emergency — Final build report (2026-10-11 03:50 JST; deadline 2026-10-12 08:00 JST)

> Applies to commit **cd7fc7f** (web sources verified at **aed04f3** by `verify:release`; c1760e1 added the verification evidence, the rebuilt Qollab bundle, two Playwright environment knobs and two hardened e2e assertions; 1e2d138 added the brand lettering on every fire truck (targeted 4-project e2e 85 passed / 5 skipped, Qollab run 14); ce42c30 adds Back to briefing and 6629b3e places it inside the screens (unit 461/461, targeted 4-project e2e 54 passed / 5 skipped on both, Qollab runs 15–16); 7a0296e and cd7fc7f add the brand lockup, the brand button → city map, the inset trim stripes and the home-screen row chip (targeted e2e 58/13/0 and 49/13/0, Qollab run 17). Supersedes the 2026-10-10 23:50 JST report (b0a6f5f). Fun is not self-certified: what is claimed below is what was executed and recorded.

**Status: SUBMITTED (2026-10-11 11:36 UTC).** Published 2026-10-11 11:30 UTC and submitted on the team page on the user's second approval (1 of 5 submitted, theme Quantum Unlocked, demo video linked). Every A1–A9 and R1–R15 gate and every follow-up requested on 2026-10-11 passes with execution evidence. Public artefacts: Qollab v1.0 `https://qollab.xyz/u/doraking/q11-quantum-emergency-response` · demo https://www.youtube.com/watch?v=Riyu0jshkGU (unlisted) · source `https://github.com/dorakingx/q11` · web build `https://q11-emergency.vercel.app`.

## Follow-ups requested on 2026-10-11 (all done)
| # | Request (owner, JA) | Result | Evidence |
|---|---|---|---|
| F1 | 配備後に火の伝搬（エラーの伝搬）も動かし、隊が消すところまで見せる | PASS | Answer check on lane boards replays fires-start → each gate (CNOT forward/backward, H swap, S) → fires-arrive before the trucks; tokens/patterns from `propagate()`; arrival asserted = `Debrief.fires`; reduced motion steps through it; Challenge untouched (no leak). Commit d78b711; unit +22 (`effects.test.ts`, `spray.test.tsx`), e2e prelude tests; frames `reports/…` and the demo at 0:57–1:05 |
| F2 | デモ動画に音声、字幕なし、日本語紹介なし | PASS | `scripts/record-demo.mjs` rewritten: macOS `say` narration (22 lines, 131 s of speech), no captions, single 1280×800 take, no phone/JA insert; `submission/DEMO.mp4` 162.6 s, H.264 + AAC, sha256 3b503c13…; alignment checked (silencedetect onsets vs cue times, frames at five cues) |
| F3 | q11-pied の意味／もっとシンプルなドメイン → q11-emergency | PASS | "pied" was Vercel's random suffix because `q11.vercel.app` belongs to another account (409 on add). Project domain now **q11-emergency.vercel.app** only (q11-pied, q11-quantum, a stray q11-game removed); protection unchanged, 16/16 anonymous probes blocked |
| F4 | アプリ名を Q11 Emergency に | PASS | Title screen h1 "Q11 Emergency" + kicker "Quantum Emergency Response"; brand chips (full accessible name; "Emergency" hidden visually < 480 px); document titles "Q11 Emergency — …"; manifest; Qollab page/title; README; submission texts; tests. Commit 829b9e1 |
| F7 | マップ上で動く消防車にもアイコンと同じ Q11 / 11Q の記載 | PASS | `FireTruck` gained a `lettering` prop (plain body + white outlined text); the map drive, the scene truck and the brand mark all use `app.lettering` (EN Q11 / JA 11Q); verified in the built app (EN/JA screenshots), e2e 85/5/0, Qollab run 14 |
| F8 | 出動(dispatch)した後に元の画面へ戻れるように | PASS | Training shows **Back to briefing** (JA 作戦説明にもどる) in its action row and the planning stage in the plan panel's tool row (inside the screen, per the owner's follow-up); returns to the district briefing and discards the plan; hidden during the guided first run and after Spray!. Reducer `BACK_TO_BRIEFING` + unit tests; e2e flow in smoke.spec; Qollab run 15 |
| F9 | ブランド表示: 初期画面はアイコンの下に名前(アイコンは名前と同じ幅)、ミッション画面の左上アイコン(+名前)を押すと街マップへ、「Quantum City」表記は廃止、ホーム画面はメニューバーに合わせた小さいアイコン+右に名前、消防車の白線の端で輪郭が切れていた点を修正 | PASS | `BrandLockup` (stack / row), fluid + crop mark variants, `a11y.backToCity`; sr-only city heading kept for screen readers; trim stripes inset by the stroke; measured on the built app at 1280 / 390; e2e green; Qollab run 17 |
| F5 | アイコンをタイトルと内容に合わせ、エラー訂正と分かるように／ゲーム内アセットを使う／消防車に Q11／白文字／家は不要／上部に X, Z のエラーを横並び／貼り付け感をなくす | PASS | Mark v3: the game's fire truck (plain body variant: no lockers/hose reel) with "Q11" painted in white (thin ink outline like the rest of the art) and a red X flame + blue Z flame side by side above the ladder; beacon unlit. Shared `src/ui/art/brandMark.tsx` → `scripts/build-icon-svg.tsx` → `scripts/build-icons.mjs` (favicons, ICO, PWA, maskable in the safe zone, OG). Candidate sheets + review: `reports/icons/` |
| F6 | 日本語版を自然な日本語に、ブランドは 11Q（119） | PASS | Every JA string rewritten against the EN source (glossary `docs/I18N.md`); JA brand "11Q Emergency" / "11Q", truck lettering per language (`app.lettering`); JA kicker 「量子エラー訂正の消防ゲーム」; district names ながや通り・みなと橋・変換ラボ・中央地区・市場ひろば・旧市街; `e2e/japanese.spec.ts` fit at 375×812 / 390×844; unit rule "no Q11 in JA". Commit aed04f3 |

## Redesign acceptance criteria R1–R15 (`docs/UX_REDESIGN.md`)
| # | Criterion | Result | Evidence (executed) |
|---|---|---|---|
| R1 | City map replaces the card list | PASS | `src/ui/city/*`; e2e `city.spec.ts` (4 projects); `reports/screenshots/after/city-*.png`; demo 0:24–0:34 |
| R2 | Dispatch travel (truck, ~1.5 s, skippable, static under reduced motion) | PASS | e2e truck-drive tests (incl. WebKit); demo 0:35 |
| R3 | Progression, replay, free roam, save v1→v2 migration, Qollab storage note | PASS | unit `city.test.ts`, `persistence.test.ts`; e2e free-roam; Qollab page note |
| R4 | Scene art, detector tap highlights, roads never propagate | PASS | `src/ui/art`, `Scene.tsx`; `reports/art/`, `reports/scene/`; e2e `.watch-tint`; propagation only in `src/quantum` |
| R5 | Three-tap first run | PASS | e2e smoke first-run flow; `tutorial-1280x800.png`; demo 0:14–0:24 |
| R6 | Planning stage (undo/redo/clear/preview), tap-only, mobile bottom bar, ≥48 px | PASS | unit plan history; e2e missions undo/redo; `viewports.spec.ts` + `japanese.spec.ts` |
| R7 | Spray showpiece (one Pauli correction per house; + propagation prelude on lane boards) | PASS | `effects.ts` deterministic timeline (unit); e2e `spray.spec.ts` four results, skip, reduced-motion stepper, rapid taps, prelude; demo 0:19, 0:57–1:05, 1:30 |
| R8 | Secrecy before confirm | PASS | source-scan unit test; e2e hint non-leak; identical fog in `challenge-*.png`; prelude only after confirm |
| R9 | Four results readable; memory beacon only at result time | PASS | e2e results 1–4 (`data-result`), beacon pattern; `result-*-{4 sizes}.png`; demo 1:40–1:50 |
| R10 | One lesson per district; reaction/prediction/discovery; Why? comparison; non-blaming | PASS | mission copy EN/JA; `WhyCompare`; e2e all six districts; demo 1:50–2:05 |
| R11 | EN/JA switch; kid-friendly text, jargon under Details | PASS | i18n parity tests; natural-JA pass; e2e JA titles |
| R12 | Sound opt-in; reduced motion = static frames | PASS | settings defaults; e2e reduced-motion stepper (incl. prelude steps) |
| R13 | React/Vite kept; state/public info/effects/rendering separated; no double application | PASS | `machine/effects/replay` + tests; e2e rapid-tap/skip/retry, "dispatches exactly once" |
| R14 | All gates pass; browser checks at 4 sizes + WebKit; input ≤100 ms | PASS | `verify:release` exit 0 (below); `reports/perf.json` ≤ 3.9 ms |
| R15 | Qollab page updated and run; docs; 120–180 s demo; same private repo / protected project; unauth blocked / auth works | PASS | Qollab run 13 exact (job e7ec00e7…); docs updated; DEMO 162.6 s; deployment dpl_BWqmaeXb… checked |

## A1–A9 (original spec)
| # | Criterion | Result | Evidence |
|---|---|---|---|
| A1 | 6 missions, propagation, hidden syndrome, correction, replay | PASS | web + Qollab page; e2e every district on 4 projects |
| A2 | Quantum model tests + Qiskit comparison | PASS | vitest 459/459; `quantum/verify.py` 4,746 comparisons, 0 mismatches, 48 Aer runs |
| A3 | lint/typecheck/unit/e2e/build/verify:release | PASS | `Q11_E2E_WORKERS=2 Q11_E2E_TIMEOUT=360000 node scripts/verify-release.mjs` exit 0 at aed04f3 (18:33–18:42 UTC): lint 0 · typecheck 0 · unit 459 · build 0 · verify:quantum 4746/0 · e2e 101 passed / 13 skipped / 0 failed · demo 163 s · secrets 0. (Unrelated jobs held the machine at load ≈26; the first default-worker run timed out on 7 wall-clock-bound tests, none on assertions) |
| A4 | Real-browser screens | PASS | 62 after-screenshots at 4 sizes + JA fit e2e; visual checks of the JA title and the prelude on the final build |
| A5 | GitHub private, verified commit pushed | PASS | `dorakingx/q11` private; aed04f3 verified; c1760e1 + 1e2d138 + ce42c30 + 6629b3e + 7a0296e + cd7fc7f pushed; tree clean; GitHub About → q11-emergency.vercel.app |
| A6 | Protected Vercel deployment | PASS | dpl_CoAbUoPCjWViaXeP7bQ8FJAoJaLc = q11-m72i37iyr-doraking.vercel.app (cd7fc7f) + domain q11-emergency.vercel.app + 2 auto aliases: 16/16 anonymous → 302 sso-api; authenticated fetch returns the app (title Q11 Emergency, assets = local build); bypass secret revoked (0); sso "all" |
| A7 | Qollab IonQ simulator run of a core mission | PASS | IonQ Aria 1 jobs 01a12375 / 01a12378 / 01a12396 / 01a1237b (unchanged circuits); built-in simulator exact on the final page (run 13, job e7ec00e7-f89b-458e-af92-a013bc2a7a8f) |
| A8 | Icons, README/MIT/attribution/Qollab materials, demo video | PASS | mark v3 icon set; MIT; `submission/*` renamed; narrated DEMO.mp4 (local only) |
| A9 | Publication only on explicit approval | PASS | Published 2026-10-11 on written approval (YouTube unlisted, Qollab v1.0 public default, repo public, Vercel unprotected); team page submitted 2026-10-11 11:36 UTC |

## Commands and exit codes (final run, 2026-10-10 18:19–22:56 UTC = 2026-10-11 03:19–03:44 JST)
- `BASE_URL=http://localhost:4173 node scripts/record-demo.mjs` → 0 (91 shots, 22 narrated lines; `reports/demo-recording.json`)
- `npm run build:qollab` → 0 (17 files, 682 KiB) → zip → Qollab Unpack / Keep and add → Run (Built-in simulator) → self-test exact
- `Q11_E2E_WORKERS=2 Q11_E2E_TIMEOUT=360000 node scripts/verify-release.mjs` → 0 — lint 0 (75 s) · typecheck 0 · unit 25 files / 459 tests · build 0 · verify:quantum 0 (4,746 / 0) · e2e 0 (101 passed, 13 skipped, 259 s) · DEMO.mp4 163 s · secret scan 0 → `reports/release-verification.{json,log}`
- `node scripts/check-protection.mjs <deployment + q11-emergency + 2 aliases>` → 0 (16/16 blocked); `npx vercel@latest curl / --deployment …` → app HTML; bypass secret revoked (PATCH protection-bypass → 0)
- Earlier on 2026-10-11: three orchestrated workflows (propagation prelude · rename · Japanese pass), each with implementation, adversarial review, fixes and verification (lint 0 / typecheck 0 / unit 457–459 / e2e green on 4 projects); details in `docs/STATUS.md`

## Where things are
- Repo: `https://github.com/dorakingx/q11` (private), branch `main`, HEAD cd7fc7f (+ this docs commit).
- Protected deployment: `https://q11-emergency.vercel.app` (project domain) = `https://q11-m72i37iyr-doraking.vercel.app` (+ q11-doraking / q11-git-main-doraking .vercel.app) — requires Vercel login; every push to `main` deploys.
- Qollab draft (owner only, unpublished): `https://qollab.xyz/u/doraking/q11-quantum-emergency-response` — title "Q11 Emergency — Quantum Emergency Response", final bundle, card, About, tags, thumbnail (truck OG image).
- Demo video: `submission/DEMO.mp4` (git-ignored), 162.6 s with narration, sha256 `3b503c131e299048c5df397448c7decb84dd22507aecd1ad37f6c78a414093b7`; script `submission/DEMO_SCRIPT.md`; uploaded 2026-10-11 to YouTube (unlisted, @dorakingxyz): https://www.youtube.com/watch?v=Riyu0jshkGU.
- Icons: `public/` (icon.svg, icon-rounded.svg, wordmark.svg, favicons, ICO, 192/512/maskable, apple-touch, og-image.png); sources `src/ui/art/brandMark.tsx`; candidate sheets and review `reports/icons/`.
- Screenshots: `reports/screenshots/before/` (6) and `reports/screenshots/after/` (62 at 1440×900 / 768×1024 / 390×844 / 375×812 + 1280×800).
- Japanese glossary: `docs/I18N.md`. Submission texts: `submission/PROJECT_PAGE.md` (pasted into the Qollab card), `SHORT_DESCRIPTION.md`, `DEMO_SCRIPT.md`, `ATTRIBUTION.md`, `QOLLAB_IMPORT.md`, `RELEASE_CHECKLIST.md`, `KNOWN_LIMITATIONS.md`, `EVIDENCE_INDEX.md`.

## Open items (not blockers)
- Publication steps 1–5 of `submission/RELEASE_CHECKLIST.md` were executed 2026-10-11 on the owner's written approval. Step 6 (captain submission on the team page) was executed 2026-10-11 11:36 UTC on a second written approval; nothing remains before the deadline except optional edits (the form stays editable by the captain until Oct 11 19:00 ET = Oct 12 08:00 JST).
- The static icon files carry "Q11"; only the in-app mark switches to "11Q" in Japanese (one icon per store listing).
- Known limitations: `submission/KNOWN_LIMITATIONS.md`.
