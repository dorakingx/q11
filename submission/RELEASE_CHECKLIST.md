# Q11 release checklist (pre-publication gates + approval-only publication steps)

Status legend: ☐ not done · ☑ done with evidence · ⛔ blocked (external). Nothing below the "APPROVAL REQUIRED" line is executed without the user's explicit, written approval naming the target and time.

## Pre-publication gates (all must be ☑ before asking for approval)
- ☐ `npm run verify:release` exits 0 (lint, typecheck, unit, build, verify:quantum, e2e) — `reports/release-verification.json`
- ☐ Quantum verification: ≥1000 seeded cases + exhaustive gate tables + 28 rsc3 patterns + six-eigenstate StabilizerState check + Aer mission circuits, 0 mismatches — `reports/quantum-verification.json`
- ☐ Real-browser screenshots reviewed: title, dispatch, propagation replay, silent failure, mobile — `reports/screenshots/`
- ☐ GitHub `dorakingx/q11` is **private** (`gh repo view --json isPrivate` = true); `main` pushed; HEAD SHA recorded in `submission/EVIDENCE_INDEX.md`
- ☐ Vercel project `q11` has Vercel Authentication = **All Deployments**; `node scripts/check-protection.mjs <urls>` passes (401/redirect, no app body for anonymous) — `reports/protection-check.json`
- ☐ Protected deployment's git SHA == GitHub HEAD SHA (recorded)
- ☐ Qollab draft project exists in the user's account; ran on built-in simulator and on an IonQ remote simulator (backend name, shots, timestamp, job id if shown) — `reports/qollab-runs.md`
- ☐ Icons: `public/icon.svg`, favicon.ico, PNG 16/32/64/180/192/512 reviewed at small sizes — `reports/icons/REVIEW.md`
- ☐ `submission/DEMO.mp4` recorded from the real app, 120–180 s, sha256 recorded; NOT uploaded anywhere
- ☐ `LICENSE` MIT; `submission/ATTRIBUTION.md` complete (libraries, versions, AI tools, references); attribution line "This effort is supported by Qollab & IonQ" present in README and project page
- ☐ No secrets in repo/history (`git grep` patterns clean; `.env*`, `.vercel/` ignored)
- ☐ `submission/KNOWN_LIMITATIONS.md` honest and current
- ☐ Final commit pushed; working tree clean

## ────────── APPROVAL REQUIRED BELOW THIS LINE ──────────
The user must explicitly approve *which* of the following to perform and *when*. Each step is independent.

1. **Qollab publish** (user, in browser): open the Q11 draft → Project Card: paste `submission/PROJECT_PAGE.md`, set license MIT, thumbnail = `public/og-image.png` or icon → Code tab: press Run on the built-in simulator once more → **Publish**. Record the public URL `qollab.xyz/u/<username>/<project>`.
2. **Demo video public link** (user): upload `submission/DEMO.mp4` to a host viewable without sign-in (e.g. YouTube unlisted). Record the URL. Test in a logged-out/private window.
3. **GitHub public** (optional for the hackathon; only if the user wants source public): `gh repo edit dorakingx/q11 --visibility public --accept-visibility-change-consequences`. Before that: re-run the secret scan and confirm the history is clean.
4. **Vercel protection removal** (optional; only if the user wants a public web demo): Vercel dashboard → q11 → Settings → Deployment Protection → Vercel Authentication: *Only Preview Deployments* or Off. Alternatively keep the Vercel site private and rely on Qollab as the public runnable.
5. **Logged-out link check** (user or assistant with approval): open every public URL in a private window.
6. **Submission** (captain, in browser): qollab.xyz/programs/hackathon/register → team page → Submit → project URL, demo video URL, descriptions from `submission/SHORT_DESCRIPTION.md` → confirm. Deadline **Oct 11 19:00 ET = Oct 12 08:00 JST**. The form can be edited by the captain until the deadline.
