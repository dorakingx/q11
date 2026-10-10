# Q11 Emergency release checklist (pre-publication gates + approval-only publication steps)

Status legend: ☐ not done · ☑ done with evidence · ⛔ blocked (external). Nothing below the "APPROVAL REQUIRED" line is executed without the user's explicit, written approval naming the target and time.

> All pre-publication gates below are ☑ for the final "Q11 Emergency" build (commit c1760e1, web sources verified at aed04f3, 2026-10-10 22:15 UTC). Nothing below the approval line has been done.

## Pre-publication gates (all must be ☑ before asking for approval)
- ☑ `verify:release` exits 0 on the final Q11 Emergency build (sources aed04f3, 2026-10-10 18:42 UTC; `Q11_E2E_WORKERS=2 Q11_E2E_TIMEOUT=360000` under external load): lint 0 · typecheck 0 · unit 459/459 (25 files) · build 0 · verify:quantum 4746/0 · e2e 101 passed / 13 skipped-by-design / 0 failed on 4 browser projects · demo 163 s · secret-like lines 0 — `reports/release-verification.json`
- ☑ Quantum verification: 4,746 comparisons, 0 mismatches (`reports/QUANTUM_VERIFICATION.md`) — unchanged by the redesign (engine/fixtures mechanics untouched)
- ☑ Real-browser screenshots: 62 "after" screenshots at 1440×900 / 768×1024 / 390×844 / 375×812 (`reports/screenshots/after/`), reviewed; "before" set kept in `reports/screenshots/before/`
- ☑ GitHub `dorakingx/q11` private (`isPrivate: true`), `main` pushed at every milestone; final redesign SHA recorded in STATUS.md at the end
- ☑ Vercel `q11`: Vercel Authentication = All Deployments since creation (never changed); anonymous/authenticated checks on the final redesign deployment: see the last row of this list
- ☑ Qollab draft exists (private); 13 runs incl. 4 IonQ Aria 1 jobs with ids; the final Q11 Emergency page (commit aed04f3 bundle) uploaded and self-tested on the built-in simulator (run 13, job e7ec00e7…, exact) — `reports/qollab-runs.md`
- ☑ Icons reviewed at 16/32/64/128 on dark and light — `reports/icons/REVIEW.md` (brand mark unchanged by the redesign)
- ☑ `submission/DEMO.mp4` re-recorded from the final app with narration (no captions, no phone insert): 162.6 s, sha256 3b503c13… (`reports/demo-recording.json`, 2026-10-10 18:19 UTC); NOT uploaded
- ☑ MIT `LICENSE`; `ATTRIBUTION.md` updated for the redesign art + JA copy; attribution line present in README, project page and the game's title screen
- ☑ Secret-pattern scan 0 hits in tracked files (verify:release); `.env*`, `.vercel/` ignored
- ☑ `submission/KNOWN_LIMITATIONS.md` updated for the redesign
- ☑ Project Card on the Qollab draft re-pasted from the renamed `submission/PROJECT_PAGE.md` (2026-10-11 02:55 JST); title "Q11 Emergency — Quantum Emergency Response"; About (222 chars); thumbnail = the new truck og-image; tags kept
- ☑ Final commit pushed (c1760e1; web sources verified at aed04f3); working tree clean; protected deployment dpl_6NnSKV4Ntma1XpfLPfGeBqzqjbiJ (q11-nc9q9fvvn-doraking.vercel.app, domain q11-emergency.vercel.app + 2 auto aliases) checked 2026-10-10 22:15 UTC: 16/16 anonymous blocked, authenticated fetch returns the app, bypass secret revoked (0)

## ────────── APPROVAL REQUIRED BELOW THIS LINE ──────────
The user must explicitly approve *which* of the following to perform and *when*. Each step is independent.

1. **Qollab publish** (user, in browser): open the Q11 draft → Project Card (write-up, thumbnail and tags are already filled from `submission/PROJECT_PAGE.md`) → **substitute the real links**: in the write-up replace the line "source repository: link on this page once public" with the GitHub URL (after step 3) and fill the "Demo video" section with the public video URL (after step 2); optionally fill *Project Website* (`https://q11-emergency.vercel.app`, only after step 4) and *Repository* → Code tab: press Run on the built-in simulator once more → **Publish** (choose the MIT licence if asked). Record the public URL `qollab.xyz/u/doraking/q11-quantum-emergency-response`.
2. **Demo video public link** (user): upload `submission/DEMO.mp4` to a host viewable without sign-in (e.g. YouTube unlisted). Record the URL. Test in a logged-out/private window.
3. **GitHub public** (optional for the hackathon; only if the user wants source public): `gh repo edit dorakingx/q11 --visibility public --accept-visibility-change-consequences`. Before that: re-run the secret scan and confirm the history is clean.
4. **Vercel protection removal** (optional; only if the user wants a public web demo): Vercel dashboard → q11 → Settings → Deployment Protection → Vercel Authentication: *Only Preview Deployments* or Off. Alternatively keep the Vercel site private and rely on Qollab as the public runnable.
5. **Logged-out link check** (user or assistant with approval): open every public URL in a private window.
6. **Submission** (captain, in browser): qollab.xyz/programs/hackathon/register → team page → Submit → project URL, demo video URL, descriptions from `submission/SHORT_DESCRIPTION.md` → confirm. Deadline **Oct 11 19:00 ET = Oct 12 08:00 JST**. The form can be edited by the captain until the deadline.
