# Scene · spray showpiece · four results · Why comparison — visual review (2026-10-10)

Scope: `src/ui/scene/**` (new), `scene-preview.html` + `src/ui/scene/preview-entry.tsx` (dev-only preview page, not in
the production build). Reviewed by rendering the preview with Playwright Chromium at 1440×900, 768×1024, 390×844 and
375×812 (device scale 1), plus live spray frames and the reduced-motion stepper. Every debrief on the page is a real
`confirmDispatch`, every timeline a real `buildEffects` — no hand-made outcomes.

## Files
| File | What it shows |
|---|---|
| `fog-{1440x900,768x1024,390x844,375x812}.png` | Challenge (rsc3, two-kinds alarms): identical fog on all nine houses, Z0 tapped → watch lines + tint on houses 0, 1, 3, 4 only, plan marker (idle X firefighter + helmet chip + "Plan" tag) on house 1. |
| `row-1440x900.png`, `row-375x812.png` | Rowhouse Lane (rep3): training with the true X fire visible; planning with fog + a planned crew. |
| `lanes-{1440x900,768x1024,375x812}.png` | Bridge (CNOT coupler, river) and lab (mirror machines for H, coupler) lanes with input tokens, travelling tokens and the time cursor; bridge planning with Y crews on both end houses. |
| `frames-1440x900.png`, `frames-390x844.png` | Frozen frames of the spray at fixed clock times (two kinds X1+Z6 and blind dispatch X on 5): truck in → crews run → stream rises → true letter flashes at impact → out / ignited → fog lifts → residual / ghost. |
| `spray-restored-1440x900-t{350,900,1400}.png`, `-end.png` | Live SprayPlayer, blind dispatch X on 4: trucks, run, spray, impact, restored house, quiet alarms, caption line. |
| `spray-safe-pattern-390x844-t{900,1400}.png`, `-end.png` | Live SprayPlayer on a phone, two kinds X1+Z6: "House 6: a blue (Z) fire started…", ghost houses 6–7 + "Logical qubit safe" badge at the end. |
| `spray-logical-failure-1440x900-end.png`, `spray-logical-failure-390x844-t1400.png` | Silent failure X0: quiet alarms, memory tower with the X anomaly, dashed chain around houses 0–2. |
| `spray-reduced-{1440x900,390x844}.png` | Reduced motion: no clock, Prev / Next stepper ("Frame 5 of 8"), static frame with the revealed true fire. |
| `results-{1440x900,768x1024,390x844,375x812}.png` | The four ResultOverlays beside (≥900px) / below (phones) the scene with the matching scene decoration. |
| `why-{1440x900,768x1024,390x844,375x812}.png` | WhyCompare: "Your spray" vs "The other way" on one clock, side by side / stacked, equivalence and "alarms alone cannot decide" captions. |

## What was reviewed and changed
| Pass | Finding | Change |
|---|---|---|
| 1 | Ghost houses of the safe-pattern result were invisible: the CSS rule for the selected-crew preview (`.house-ghost { opacity: 0 }`) also matched the SVG group `house house-ghost`. | preview span renamed `.crew-preview`; test asserts the ghost houses are present |
| 1 | The planned-crew helmet chip at the house's top-right collided with the Z2 detector (house 1) and the Z1 ring (rep3 house 1). | chip moved to the house's top-left, scale 0.45 |
| 1 | The firefighter beside a house touched the neighbouring detector's highlight ring (house 1 vs Z0, house 4 vs X1). | crew spot moved to (x − 20, y + 22) at scale 0.55: clear of every lamp + ring on the rsc3 grid (checked for all nine houses against the eight detector positions) |
| 1 | The logical-failure chain was a dashed polyline through the house centres, crossing the roofs. | connector drawn behind the houses (visible only in the gaps), dashed outlines per house drawn on top |
| 2 | All of the above verified at the four widths; no horizontal scroll at any width (checked by script: `scrollWidth ≤ innerWidth`); every house/detector hit area ≥ 48 px (CSS floor `max(100%, 48px)` on the centred button, verified by the geometry test). | final |

## Readability of the spray as stills
- Who sprays where: each firefighter stands at the front-left corner of *its* house with the helmet letter, the hose
  stream rises from the nozzle onto that roof; the caption names the crew and the house number.
- What changed: the true letter flashes on the house at impact (fog → flame with its badge), then the after-state
  from the engine: `out` (steam + check) → `restored` (lit windows), a changed letter, or a newly ignited flame; the
  fog lifts on every house at `reveal-remaining`; `still-burning` adds the thick red outline + ringing detectors,
  `safe-pattern` dashed ghost flames + the badge, `logical-failure` the tower anomaly + the purple chain.

## Not done / limits
- Only Chromium was rendered. WebKit/Firefox rendering of the SVG is not verified here.
- The hose stream is nearly vertical on the dense 3×3 grid (the crew stands at the house's foot and sprays the roof)
  because the 100-unit grid leaves no free spot beside a house that clears the detector lamps; it reads fine as
  "this crew sprays this house" but is not a long arc.
- On lane boards at 375 px the end houses and the H mirror machines are small (≈ 25 px drawn); the buttons are
  enlarged to 48 px by CSS, and the token letters stay legible.
- The preview page is a dev page served by `vite` only (`npx vite --port 4181 --strictPort` →
  `/scene-preview.html?section=fog|row|lanes|spray|frames|results|why`, `&reduced=1`, `&lang=ja`).
