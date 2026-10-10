# `src/ui/art` — original SVG parts for the toy-city redesign

Style guide + usage for the art layer described in `docs/UX_REDESIGN.md` (R1, R4, R7, R9). Everything here is
original, hand-written SVG (MIT, like the rest of the repo). No third-party images, characters or sounds.

## Style
- **A warm miniature city, low 2.5D angle.** Cream/sand ground (`ART.sand`), soft sky, pastel houses with a
  dark 2–3 px outline at 100-unit scale (`OUTLINE` = 2.5, `OUTLINE_THIN` = 1.6), flat colours, a thin darker
  side face on the right of each building, a flat ellipse shadow on the ground.
- **No gradients, no glow, no filters, no emoji, no photos** (`art.test.tsx` enforces the first three).
- **Shape + letter, never colour alone.** Every fire, crew and detector carries its letter in a white badge:
  X red flame, Z blue flame, Y split flame (red left / blue right). Z detectors are diamonds, X detectors are
  squares. Water is pale cyan with round drops and white highlights and never uses the Z-blue (`#2f7fe6`) —
  a blue Z fire and a hose stream cannot be confused.
- **Text in art is limited to the letters X / Z / Y, `!` (ringing), `?` (fog) and the gate labels H / S on
  lane boards.** District names, captions and buttons are HTML drawn over the SVG by the UI layer.
- Every part stays recognisable at 50% (see `reports/art/gallery.png`, right-hand groups).

## Parts (all pure `<g>` fragments: `{ x, y, scale?, title?, className? }`, no React state)
`x, y` is the **ground anchor** (bottom-centre where the object touches the ground), except where noted.

| File | Parts | Notes |
|---|---|---|
| `fire.tsx` | `Flame{letter, residual?, ghost?}`, `Smoke`, `SteamPuff`, `CheckMark` | Flame base at (0,0), 92 tall. `residual` = thick red outline (detectable residual). `ghost` = dashed outline (harmless stabilizer pattern). |
| `water.tsx` | `Stream{from, to, progress?, lift?}`, `Splash{spread?}`, `Drop` | `Stream` is absolute (nozzle → impact), `progress` 0–1 cuts the arc for animation; the impact disc only appears at 1. `Splash` anchor = impact point. |
| `firefighter.tsx` + `crewGeometry.ts` | `Firefighter{letter, pose: idle/run1/run2/spray, facing?}`, `HelmetChip{letter}`, `nozzleAt(x, y, scale, facing)` | ≈80 tall. Use `nozzleAt` for `Stream.from`. |
| `truck.tsx` | `FireTruck{facing?, lights?, wheelFrame?}` | 150 × 70, side view, faces +x. |
| `detector.tsx` | `Detector{type, ringing?, highlighted?}`, `DetectorLamp` (lamp only, anchor = lamp centre) | Pole base anchor, lamp centre at y −44. |
| `houses.tsx` | `House{variant: small/tall/shop, state, tint?, selected?}`, `MemoryTower{anomaly?, lit?}`, `FireStation{open?}`, `ConversionLab{active?}`, `MirrorMachine{active?, label?}`, `BridgeSpan{width?}` | `HouseState`: `normal · fog · fire(X/Z/Y) · out · restored · ghost(letter) · residual(letter)`. **`fog` is identical for every candidate** (grey veil + `?`, no letter, no size change). `MemoryTower.anomaly` is the result-time logical X/Z/Y beacon (Y = both flags). |
| `tiles.tsx` | `Ground`, `GrassPatch`, `RoadPath{d}`, `RoadStraight`, `RoadCurve`, `Footpath`, `River`, `Tree`, `StreetLight{lit?}`, `Flag`, `Roadblock`, `FogPatch`, `SmokePlume`, `Cloud`, `ChapterBadge{earned?}` | Roads are scenery only. |
| `cityLayout.ts` | `CITY_LAYOUT`, `DISTRICTS`, `DISTRICT_ORDER`, `ROADS`, `ROAD_START`, `STATION`, `districtById` | 1600 × 1000 map; each district has `{x,y,w,h}` (hit area), `label`, `entry` (truck stop), `gate` (flag), `block` (roadblock), `smoke`. `ROADS[id]` is an absolute SVG path from the station driveway to `entry` — use `getTotalLength/getPointAtLength` on a hidden `<path>` to drive the truck. |
| `CityBackdrop.tsx` | `CityBackdrop{states}` | Draws everything in the district's visual state: `locked` (fog + roadblock), `available` (smoke + flag), `selected` (highlight + smoke + flag), `solved` (clear, lit windows, trees). Each district group has `data-district` / `data-state`. |
| `sceneLayout.ts` | `RSC3_SCENE`, `REP3_SCENE`, `sceneFor`, `RSC3_CHECKS`, `gridPoint`, `laneGeometry` | House anchors on a 100-unit grid (`q = 3·row + col`), detector anchors at the eight check positions of `fixtures/codes.json` (tested against `getLayout('rsc3')`). |
| `scene.tsx` | `SceneGround{layout}`, `WatchLines{from, to}`, `WatchTint{x,y}`, `BridgeLanes{geometry}`, `LabLanes{geometry}`, `Coupler{x, controlY, targetY, active?}`, `Dial`, `LaneToken{letter}` | Floors and lane gates for the three board kinds. |
| `palette.ts` / `util.ts` / `primitives.tsx` | `ART`, `LETTER_COLOUR`, `OUTLINE`, `WALL_CYCLE`, `fmt`, `FONT`, `Part`, `LetterBadge`, `GroundShadow` | Build new parts with `Part` so they get the same anchor/scale/title contract. |

## Usage
```tsx
import { Detector, House, RSC3_SCENE, SceneGround, Stream, Splash, Firefighter, nozzleAt } from '../art';

<svg viewBox={`0 0 ${RSC3_SCENE.width} ${RSC3_SCENE.height}`}>
  <SceneGround layout={RSC3_SCENE} />
  {RSC3_SCENE.houses.map((h) => <House key={h.q} x={h.x} y={h.y} tint={h.q} state={{ kind: 'fog' }} scale={0.85} />)}
  {RSC3_SCENE.detectors.map((d) => <Detector key={d.id} type={d.type} x={d.x} y={d.y} ringing={syndrome[d.id]} scale={0.8} />)}
  <Firefighter letter="X" pose="spray" x={30} y={h.y} scale={0.75} />
  <Stream from={nozzleAt(30, h.y, 0.75)} to={{ x: h.x, y: h.y - 70 }} progress={t} />
</svg>
```
- Put real `<button>`s (HTML, ≥48 px) over the SVG for houses/detectors/districts; the art has no handlers.
- Secrecy (R8): in Challenge, give every candidate `{ kind: 'fog' }`. Only Training and the post-Confirm answer
  check may pass `fire` / `residual` / `ghost` states.
- Four results (R9): residual I → `out` then `restored`; harmless stabilizer → `ghost`; detectable → `residual`
  + `Detector ringing`; logical failure → quiet detectors + `MemoryTower anomaly="X" | "Z" | "Y"`.
- Reduced motion: the parts are static frames; step `Firefighter.pose`, `Stream.progress`, `Splash.spread` and
  `FireTruck.wheelFrame` from the effect timeline instead of CSS animation.

## Gallery
`gallery.html` (dev only, not in the production build): `npx vite --port 4181 --strictPort` → `http://localhost:4181/gallery.html`.
Every part in every state at 100% and 50%, plus composed scenes and the city in four state sets.
`reports/art/gallery.png` is the reviewed screenshot; `reports/art/REVIEW.md` lists the iteration.

## Brand mark
`public/icon.svg` (Q guard ring + flame) stays the brand mark; it is not redrawn here. The in-game flame
uses the same two-tongue silhouette family so the favicon and the fires belong together.
