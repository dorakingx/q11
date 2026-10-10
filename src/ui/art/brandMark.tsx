/**
 * The Q11 Emergency brand mark: the game's own fire truck with "Q11" painted in white on its red body and the two kinds of error, a red X flame and a blue Z flame, side by side above it.
 * One source of truth for public/icon.svg (via scripts/build-icon-svg.tsx), the raster icon set and the in-app mark
 * (src/ui/glyphs.tsx `Q11Mark`), so the Qollab bundle needs no asset URL. Draw it inside a 512 × 512 frame.
 */
import { Flame } from './fire';
import { FireTruck } from './truck';
import { BRAND_MARK_BBOX, BRAND_MARK_LABEL } from './brandMarkMeta';

/** The mark's content for a 512 × 512 viewBox (no <svg> element). `lettering` is what is painted on the truck: "Q11" (911) in English, "11Q" (119) in Japanese. */
export function BrandMarkContent({ lettering = 'Q11' }: { readonly lettering?: string | undefined } = {}) {
  return (
    <g>
      {/* the two kinds of error, side by side above the truck: a red X flame and a blue Z flame */}
      <Flame letter="X" x={150} y={240} scale={1.4} />
      <Flame letter="Z" x={262} y={240} scale={1.4} />
      <FireTruck x={256} y={440} scale={3} lettering={lettering} />
    </g>
  );
}

export function BrandMark({ size = 72, label, lettering, fluid = false, crop = false }: { readonly size?: number; readonly label?: string | undefined; readonly lettering?: string | undefined; readonly fluid?: boolean; readonly crop?: boolean }) {
  // fluid: fill the parent's width (height follows the aspect); crop: frame = the drawn truck + flames (no empty margin)
  // so a chip-high mark (size = height) is as big as it can be. Both crop the 512 frame to BRAND_MARK_BBOX.
  const b = BRAND_MARK_BBOX;
  const cropped = fluid || crop;
  const bw = b.x1 - b.x0;
  const bh = b.y1 - b.y0;
  const viewBox = cropped ? `${String(b.x0)} ${String(b.y0)} ${String(bw)} ${String(bh)}` : '0 0 512 512';
  const width = fluid ? '100%' : crop ? Math.round((size * bw) / bh) : size;
  return (
    <svg
      width={width}
      height={fluid ? undefined : size}
      viewBox={viewBox}
      role="img"
      aria-label={label ?? BRAND_MARK_LABEL}
      focusable="false"
      style={fluid ? { display: 'block', height: 'auto' } : { display: 'block' }}
    >
      <BrandMarkContent lettering={lettering} />
    </svg>
  );
}
