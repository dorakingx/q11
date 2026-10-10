# Q11 release checklist (pre-publication gates + approval-only publication steps)

Status legend: ☐ not done · ☑ done with evidence · ⛔ blocked (external). Nothing below the "APPROVAL REQUIRED" line is executed without the user's explicit, written approval naming the target and time.

## Pre-publication gates (all must be ☑ before asking for approval)
- ☑ `npm run verify:release` exits 0 — passed:true at SHA 0e950e8, 2026-10-10 02:24 UTC (`reports/release-verification.json`); re-run after the review fixes (STATUS.md)
- ☑ Quantum verification: 4,746 comparisons, 0 mismatches (`reports/QUANTUM_VERIFICATION.md`)
- ☑ Real-browser screenshots reviewed 2026-10-10 10:50 JST + manual pane checks 11:30 JST (EVIDENCE_INDEX)
- ☑ GitHub `dorakingx/q11` private (`isPrivate: true`), `main` pushed at every milestone; final SHA in STATUS.md A5
- ☑ Vercel `q11`: Vercel Authentication = All Deployments since creation; `check-protection` 16/16 blocked (`reports/protection-check.json`); authenticated fetch verified, bypass secret revoked
- ☑ Deployments are Git-triggered, so each carries `meta.githubCommitSha`; final pair recorded in STATUS.md A6
- ☑ Qollab draft exists (private); 8 runs incl. 4 IonQ Aria 1 jobs with ids — `reports/qollab-runs.md`
- ☑ Icons reviewed at 16/32/64/128 on dark and light — `reports/icons/REVIEW.md`
- ☑ `submission/DEMO.mp4` recorded from the real app, 146 s, sha256 75a4dd7a… (`reports/demo-recording.json`); NOT uploaded
- ☑ MIT `LICENSE`; `ATTRIBUTION.md` complete; attribution line present in README, project page and the game's title screen
- ☑ Secret-pattern scan 0 hits in tracked files (verify:release); `.env*`, `.vercel/` ignored
- ☑ `submission/KNOWN_LIMITATIONS.md` current (updated after the review wave)
- ☐ Final commit pushed; working tree clean (done at the end of the build — see STATUS.md)

## ────────── APPROVAL REQUIRED BELOW THIS LINE ──────────
The user must explicitly approve *which* of the following to perform and *when*. Each step is independent.

1. **Qollab publish** (user, in browser): open the Q11 draft → Project Card (write-up, thumbnail and tags are already filled from `submission/PROJECT_PAGE.md`) → **substitute the real links**: in the write-up replace the line "source repository: link on this page once public" with the GitHub URL (after step 3) and fill the "Demo video" section with the public video URL (after step 2); optionally fill *Project Website* (protected Vercel URL only after step 4) and *Repository* → Code tab: press Run on the built-in simulator once more → **Publish** (choose the MIT licence if asked). Record the public URL `qollab.xyz/u/doraking/q11-quantum-emergency-response`.
2. **Demo video public link** (user): upload `submission/DEMO.mp4` to a host viewable without sign-in (e.g. YouTube unlisted). Record the URL. Test in a logged-out/private window.
3. **GitHub public** (optional for the hackathon; only if the user wants source public): `gh repo edit dorakingx/q11 --visibility public --accept-visibility-change-consequences`. Before that: re-run the secret scan and confirm the history is clean.
4. **Vercel protection removal** (optional; only if the user wants a public web demo): Vercel dashboard → q11 → Settings → Deployment Protection → Vercel Authentication: *Only Preview Deployments* or Off. Alternatively keep the Vercel site private and rely on Qollab as the public runnable.
5. **Logged-out link check** (user or assistant with approval): open every public URL in a private window.
6. **Submission** (captain, in browser): qollab.xyz/programs/hackathon/register → team page → Submit → project URL, demo video URL, descriptions from `submission/SHORT_DESCRIPTION.md` → confirm. Deadline **Oct 11 19:00 ET = Oct 12 08:00 JST**. The form can be edited by the captain until the deadline.
