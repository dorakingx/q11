# Art parts — visual review (2026-10-10)

Scope: `src/ui/art/**` (new), `gallery.html` + `src/ui/art/gallery-entry.tsx` (dev-only gallery). `public/` untouched.
Reviewed by rendering `gallery.html` with Playwright Chromium (1700 px wide viewport, device scale 1) and reading the
screenshots at 100% and 50%.

Files: `gallery.png` (final, full page), `gallery-first-pass.png` (before the fixes below), `sections/*.png` (per section).

## What was reviewed and changed
| Pass | Finding | Change |
|---|---|---|
| 1 | Flames, water, detectors, trucks, houses, special buildings and tiles all recognisable at 50%; Y split flame reads as red/blue halves; water (pale cyan, round drops) clearly not a flame. | kept |
| 1 | Crew helmet letter too small at 50% (badge r = 5.5 → ~5 px). | helmet dome enlarged, badge r = 7.5 |
| 1 | City: the "available" flag stood in front of the middle rowhouse door and on top of an old-town tall house; the roadblock reused the same spot. | `DistrictBox` gained a `block` point (roadblock on the road at the entrance) separate from `gate` (flag, kept clear of buildings); old-town box moved to y 770–990; rowhouses/shops/old-town houses re-spaced |
| 1 | The lab's mirror machine wrote an "H" into the city backdrop (art must carry no text except X/Z/Y/!/?). | `MirrorMachine` got `label` (default true for lane boards); `ConversionLab` passes `label={false}`; test asserts the backdrop has no text |
| 1 | Vertical footpaths in the 3×3 scene grazed the house side walls; watch-tint ellipses bled into neighbouring houses. | footpaths moved to the column midline (+50) and narrowed to 10; tint rx 52 → 40 |
| 1 | Lint: `react-refresh/only-export-components` warnings (constants and helpers in component files). | moved to `util.ts`, `crewGeometry.ts`, `sceneLayout.ts`; gallery split into `Gallery.tsx` (components) + `gallery-entry.tsx` (mount) |
| 2 | All of the above verified in `gallery.png`; the city at 25% (400 px, phone width) still shows the road network, river, smoke, flags and fog. | final |

## Not done / limits
- Only Chromium was rendered (Playwright). WebKit/Firefox rendering of the SVG parts is not verified here.
- These are static frames: run/spray/wheel frames and `Stream.progress` / `Splash.spread` are meant to be stepped by
  the effect timeline (`src/game/effects.ts`, other owner). No animation is verified in this gallery.
- No real-device check (the 50% groups and the 25% city tile are the phone-size proxies).
- The gallery is a dev page served by `vite` only; it is not part of `npm run build`.
