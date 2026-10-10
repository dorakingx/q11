/**
 * The Q11 Emergency brand mark: the game's own fire truck with "Q11" painted in white on its red body and the two kinds of error, a red X flame and a blue Z flame, side by side above it.
 * One source of truth for public/icon.svg (via scripts/build-icon-svg.tsx), the raster icon set and the in-app mark
 * (src/ui/glyphs.tsx `Q11Mark`), so the Qollab bundle needs no asset URL. Draw it inside a 512 × 512 frame.
 */
import { ART } from './palette';
import { Flame } from './fire';
import { Part } from './primitives';
import { FireTruck } from './truck';
import { FONT } from './util';
import { BRAND_MARK_LABEL } from './brandMarkMeta';

/** The mark's content for a 512 × 512 viewBox (no <svg> element). */
export function BrandMarkContent() {
  return (
    <g>
      {/* the two kinds of error, side by side above the truck: a red X flame and a blue Z flame */}
      <Flame letter="X" x={150} y={240} scale={1.4} />
      <Flame letter="Z" x={262} y={240} scale={1.4} />
      <FireTruck x={256} y={440} scale={3} plain />
      <Part x={256} y={440} scale={3}>
        {/* "Q11" painted in white on the clean red body, above the white trim stripe */}
        <text x={-22} y={-35} textAnchor="middle" fontSize={20} fontWeight={900} fill={ART.paper} fontFamily={FONT} letterSpacing={1.5} style={{ userSelect: 'none' }}>
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
