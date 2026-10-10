# Q11 icon set — visual review

Reviewer: build agent (icon task), 2026-10-10. Everything below was produced by `node scripts/build-icons.mjs`
from the two hand-authored sources `public/icon.svg` and `public/icon-rounded.svg`; nothing was drawn by hand
in a raster editor and no third-party artwork was used.

## The mark

One symbol: a bold **Q drawn as a protective ring** (closed circle, stroke 56/512 ≈ 11 % of the icon width,
with a diagonal tail that *crosses* the ring at the bottom-right) and a **small flame** inside the ring.
Two colours only: ring `#8fc1ff` (light blue), flame `#ff5a3c` (Q11 X-fire red). No gradients, glow, orbit
lines, city, text, or inner highlight — the highlight was tried and dropped (see below).

| File | Variant | Size | Notes |
|---|---|---|---|
| `public/icon.svg` | transparent | viewBox 0 0 512 512 | source of truth, referenced by `index.html` and the title screen |
| `public/icon-rounded.svg` | navy `#0b1a33` rounded square, radius 113 (≈22 %) | 512 | mark scaled to 0.86 and centred on its bounding box |
| `public/wordmark.svg` | transparent | viewBox 0 0 380 160 | Q mark + hand-drawn "11" paths (stroke 16.5, round caps); no fonts |
| `public/favicon-16.png` / `-32.png` / `-64.png` | transparent | 16 / 32 / 64 | RGBA |
| `public/favicon.ico` | transparent | 16 + 32 + 48 | PNG-in-ICO container written by hand in Node, read back and checked |
| `public/apple-touch-icon.png` | rounded, flattened on navy | 180 | RGB, no alpha (iOS ignores transparency anyway) |
| `public/icon-192.png`, `public/icon-512.png` | rounded | 192 / 512 | PWA `purpose: any` |
| `public/icon-512-maskable.png` | full-bleed navy, mark at 0.72 | 512 | farthest drawn point ≈ 197 px from centre, inside the 204.8 px (80 %) safe-zone circle |
| `public/og-image.png` | navy, mark + title text | 1200 × 630 | title rendered as SVG `<text>`; not uploaded anywhere |
| `public/manifest.webmanifest` | — | — | name / short_name / theme & background `#0b1a33` / standalone / 192, 512, 512-maskable |
| `reports/icons/preview-dark.png`, `preview-light.png` | — | 760 × 608 | both variants at 16 / 32 / 64 / 128 px 1:1, plus 16 px and 32 px magnified 4× (nearest neighbour) |

## What I saw, and what I changed

Each round rendered the SVG at 16 / 32 / 64 / 128 px with sharp (librsvg) and I looked at the PNGs.

1. **First draft: teardrop "flame", tail attached outside the ring, near-white ring `#f2f6ff`.**
   On navy: a ring with a red drop was legible at every size, but at 64–128 px the mark read as a
   *magnifying glass*, and the red shape read as a water drop, not fire.
   On a light background the near-white ring disappeared completely; only the red drop was visible.
2. **Flame shape.** Rendered four flame candidates (teardrop / notched / side-lick / simple-lick) at all four
   sizes. The two with a small left tongue read as fire at 64 and 128 px and still read as "a red flame-ish
   blob with a point" at 32 px. Kept the simpler of the two (`D_simple` in the scratch grid). At 16 px every
   candidate is a 3–4 px red mark inside the ring — that is the physical limit, and it is fine: the icon is
   "a Q with something red in it" at 16 px and "a Q with a flame" from 32 px upward.
3. **Tail.** Moved the tail so it starts *inside* the ring (`(334,326) → (424,416)`, round caps), i.e. a
   short stub is visible in the hole and a short tail outside. This is the single change that turned
   "magnifier" into "Q" at 64/128 px; at 16 px it is a one-pixel notch at the bottom-right, which still
   distinguishes it from a plain circle.
4. **Flame size and position.** Enlarged the flame from 0.72 to 0.8 of its design box and shifted it to
   centre `(238, 230)` (slightly up-left of the ring centre `(248, 240)`) so that it keeps ≈ 32 units
   (1 px at 16 px, 2 px at 32 px) of clear space from the tail stub and ≈ 38 units from the ring's inner top.
   Going to 0.9 was tried on paper: it would reduce the tip/ring gap to ≈ 20 units (0.6 px at 16 px) and the
   flame would merge with the ring, so 0.8 is the ceiling.
5. **Ring colour (the decision spec §7 asks for).** Rendered near-white `#f2f6ff` and light blue `#8fc1ff`
   on white, light grey `#e9ecf1` and navy at 16 / 32 / 64 px side by side. Near-white is invisible on
   white and grey; light blue is legible on all three backgrounds and still crisp on navy, and it matches the
   Z-blue family of the game palette. **Unified on `#8fc1ff`.** A `prefers-color-scheme` override inside the
   SVG was considered and rejected: `<img>` honours it, so the title-screen icon (always on navy) would turn
   navy on a light-mode OS.
6. **Inner highlight.** Tried a lighter/cut-out teardrop inside the flame; at 16–32 px it only made the flame
   look broken, and it added a third tone. Dropped. Solid flame.
7. **OG image.** The first render overflowed on the right ("Quantum Emergency Respo…"): at 52 px bold the
   second title line alone measured 780 px for a 620 px column. Added measured text fitting to the build
   script (`textWidth` rasterises the line alone and trims; `fitFontSize` scales down if needed), moved the
   mark to 340 px, split the tagline into two lines. Final render: all text inside the frame with margin.
8. **Maskable.** Drew the 80 % safe-zone circle over the maskable PNG and a circular-mask preview: at
   scale 0.74 the tail cap touched the dashed boundary (≈ 202 px of 204.8 px), so the scale was lowered to
   0.72 (≈ 197 px). Content now sits clearly inside the circle.
9. **Wordmark.** "11" are two hand-drawn strokes (bar + short flag) whose height matches the Q ring. The gap
   between the Q and the first "1" was ≈ 30 units too wide in the first render; tightened by 12 units and the
   viewBox trimmed to 380 wide.

## Legibility verdict (from `preview-dark.png` / `preview-light.png`)

- **16 px (transparent):** a blue Q (ring ≈ 1.75 px, tail notch visible) with a red mark inside, on both
  dark and light. Not a readable flame at this size — nothing is — but unmistakably *this* icon.
- **32 px:** Q with a flame-shaped red mark; the tongue on the left of the flame is already visible.
- **64 / 128 px:** clearly a Q guard ring with a flame; the crossing tail reads as a letter, not a handle.
- **Rounded variant:** at 16 px the navy tile leaves the Q only ≈ 11 px wide, which is weak; it is therefore
  *not* used for favicons or the ICO (those use the transparent variant). It is used at 180 / 192 / 512 where
  it is excellent.
- **Light background:** the light-blue ring is paler than on navy but present at every size; the red flame
  carries the mark. This is the reason for choosing `#8fc1ff` over near-white.

## Build-script safeguards (so a silent renderer change cannot ship a broken icon)

- Pixel sanity check on the 512 px transparent render: ring stroke pixel must be `#8fc1ff`, flame core
  must be `#ff5a3c`, a corner and the ring interior must be fully transparent. Any mismatch exits 1.
- ICO read-back: every directory entry must point at a PNG whose IHDR width/height equal the entry size.
- OG text fitting is measured, not assumed; a machine without Helvetica will still get a fitted fallback font.

## Verification run (2026-10-10, Node 20.18.0, sharp 0.35.5)

| Command | Exit | Result |
|---|---|---|
| `node scripts/build-icons.mjs` | 0 | 11 files written; sanity check and ICO read-back passed |
| `ls -la public` | 0 | 14 files: 3 SVG, 8 PNG, 1 ICO, 1 manifest |
| `node -e "<ICO header check>"` | 0 | `ICONDIR reserved=0 type=1 count=3`; entries 16×16 (551 B), 32×32 (1083 B), 48×48 (1598 B), all PNG payloads with matching IHDR; total 3286 B |
| `xmllint --noout public/*.svg` | 0 | all three SVGs well-formed |
| manifest JSON parse | 0 | name / short_name / standalone / `#0b1a33` / 192, 512, 512-maskable |
| `npx eslint scripts/build-icons.mjs` | 0 | clean |

## Known limitations / not done

- `og-image.png` depends on the fonts available to librsvg on the build machine (Helvetica here). Re-running
  the script elsewhere produces a correctly fitted but possibly different-looking title line.
- `index.html` (not owned by this task) points the PNG favicon at the transparent `favicon-32.png`. On a very
  light browser tab strip the light-blue ring is faint; if that matters for a Safari demo, pointing the PNG
  `<link>` at a rounded PNG would be the one-line fix. Chrome/Firefox use `icon.svg`.
- No browser-side check of the manifest install prompt was performed in this task (only JSON validity).
