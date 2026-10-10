# City map screen — visual review (2026-10-10)

Scope: `src/ui/city/**` (new), `city-preview.html` + `src/ui/city/preview-entry.tsx` (dev-only preview page, not in
the production build), 14 new i18n keys in `src/ui/i18n/en.ts` + `ja.ts` (`city.badgeName.*`, `city.badgeToast`,
`city.badgeOf`, `city.badges`, `city.aria.mission`, `city.aria.truck`, `city.select.best`, `city.select.none`).
No other files touched (App/play/screens/panels/styles/main/e2e/fixtures/quantum/game untouched).

Rendered with Playwright Chromium (device scale 1) from `npx vite --port 4181` → `/city-preview.html?bare=1&scenario=…`,
then read as images. Every run also audited the DOM: horizontal overflow (`scrollWidth` vs `innerWidth`), every
`<button>` ≥ 48 × 48 CSS px, label-chip rectangle overlaps, console/page errors. Final run: **no findings** at
1440×900, 768×1024, 390×844 and 375×812 for the fresh / three-solved / all-solved / restored scenarios, plus panel-open,
travel, restoring and Japanese shots.

Files: `desktop.png` (1440×900, three solved, Central District selected, right-column panel), `tablet.png` (768×1024,
same, bottom sheet), `phone.png` (390×844, same), `phone-375.png` (375×812, full page), `phone-fresh.png`,
`desktop-travel.png` / `phone-travel.png` (truck mid-drive with the Skip card), `desktop-restoring.png`
(Rowhouse Lane restoration moment + "Alarm Reader earned!" toast), `desktop-all-solved.png` (16 / 16, six badges),
`desktop-ja.png` / `phone-ja.png` (Japanese).

## What was reviewed and changed
| Pass | Finding | Change |
|---|---|---|
| 1 | Desktop: HUD, map, right-column panel, Dispatch! (52 px, red primary), truck drive and the restoration moment all read correctly; district states (fog + roadblock / smoke + flag / dashed highlight / lit windows + trees) are visible without colour. | kept |
| 1 | Phones (375/390): the "x of 16 stars" pill was clipped behind the settings gear; badge names wrapped onto two lines each, making the HUD three rows of broken text. | HUD is a two-column grid on < 768 px (brand + gear, then a stats row, then the storage note); badges are `white-space: nowrap` and wrap as a row. |
| 1 | Phones: 9 px district-name chips crowded the art ("Harbor Bridge" over the rowhouses, "Central District" over the lab) and the long Japanese names ran off the right edge of the map. | Chips are now "N · Name" with the mission number in a dark disc; under 640 px only the number disc shows (13 px, ≥ 24 px disc) and the full name lives in the panel heading and in every button's `aria-label` ("Mission 4: Central District, Fire reported, …"). Market Square / Old Town chips hug the right edge of their box so long names stay inside the map. |
| 1 | Tablet (768): chips were 9 px. | `font-size: clamp(11px, 1.15vw, 15px)`. |
| 1 | Panel: the status row was labelled "Selected" (`city.status.selected`), which read as a field name. | Status pill moved into the panel header next to "Mission N · Kid title"; no extra key needed. |
| 2 | All of the above verified in the final screenshots; audit clean (no overflow, no < 48 px button, no chip overlaps, no console errors). | final |

## Behaviour verified by unit tests (`npx vitest run src/ui/city` — 18 tests, all pass)
- One real `<button>` per district in unlock order (`data-testid="mission-{index}"`, `data-district="{id}"`,
  `data-status`), focusable, with "Mission N: {name}, {status}, {stars}" labels; backdrop `data-state` mirrors statuses.
- Free roam opens every district and shows the "Free roam" pill.
- Locked click → `role="status"` toast "Finish {previous district} first to open this road.", no dispatch, no panel.
- Available click → panel (name, kid title, goal, status, best stars as star art + text, Dispatch!); solved → "Play again"
  + badge name; Close returns focus to the district button.
- Keyboard: arrows / Home / End move between districts, Enter selects, Escape closes the panel (or skips the drive).
- Dispatch! → truck drive on stubbed rAF/fake timers (≈1.5 s) → exactly one `SELECT_MISSION`; district taps and a
  second Dispatch during the drive are ignored; Skip button and a tap anywhere on the overlay end it immediately with
  exactly one `SELECT_MISSION`; wheel frames alternate and the truck faces +x along the avenue.
- Reduced motion via prop, `Settings.reducedMotion`, or an ancestor `[data-reduced-motion="true"]` → immediate
  dispatch, no overlay, static restoration.
- `recentlySolved` → badge toast "{Badge} earned!" (`aria-live="polite"`) + the smoke-clears effect, which ends on its
  own (≤ 1.3 s) or on a tap; an id that is not actually solved is ignored.
- HUD: "x of 16 stars", earned badge names, storage note, settings / title callbacks; Japanese strings via the provider.

## Not done / limits
- Only Chromium was rendered (Playwright). WebKit/Firefox rendering of the SVG path geometry used by the truck drive is
  not verified here (the code falls back to a straight line when `getTotalLength` is missing).
- The truck drive and restoration animation were checked as single mid-animation frames, not as video.
- Under 640 px the map chips show the mission number only; the district name is one tap away (panel) and in the
  accessible name. If a full-name chip is wanted on phones it needs a different label layout (e.g. a legend row).
- The preview page mimics App (`<div class="app" data-reduced-motion>` + `LanguageProvider`) but does not load
  `src/ui/styles.css`; the city stylesheet is self-contained (`city-` prefixed classes, `@import '../tokens.css'`).
- `npx vitest run` overall: 370 pass, 7 fail — all 7 are in `src/ui/board.test.tsx` App flows that depend on the
  App.tsx contract change already known to be broken (`npm run typecheck` fails only in App.tsx); not touched here.
