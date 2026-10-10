/**
 * The Q11 Emergency brand mark: the game's own fire truck with a "Q11" plate, a red (X) flame and smoke behind it.
 * One source of truth for public/icon.svg (via scripts/build-icon-svg.tsx), the raster icon set and the in-app mark
 * (src/ui/glyphs.tsx `Q11Mark`), so the Qollab bundle needs no asset URL. Draw it inside a 512 × 512 frame.
 */
import { ART } from './palette';
import { Flame, Smoke } from './fire';
import { Part } from './primitives';
import { FireTruck } from './truck';
import { FONT } from './util';
import { BRAND_MARK_LABEL } from './brandMarkMeta';

/** The mark's content for a 512 × 512 viewBox (no <svg> element). */
export function BrandMarkContent() {
  return (
    <g>
      <Smoke x={400} y={150} scale={1.6} size={1.2} />
      <Flame letter="X" x={390} y={250} scale={1.6} />
      <FireTruck x={230} y={430} scale={2.9} lights />
      <Part x={230} y={430} scale={2.9}>
        <rect x={-68} y={-50} width={92} height={24} rx={4} fill={ART.paper} stroke={ART.ink} strokeWidth={1.8} />
        <text x={-22} y={-31} textAnchor="middle" fontSize={21} fontWeight={900} fill={ART.fireX} fontFamily={FONT} letterSpacing={1} style={{ userSelect: 'none' }}>
          Q11
        </text>
      </Part>
    </g>
  );
}

export function BrandMark({ size = 72, label }: { readonly size?: number; readonly label?: string | undefined }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" role="img" aria-label={label ?? BRAND_MARK_LABEL} focusable="false">
      <BrandMarkContent />
    </svg>
  );
}
