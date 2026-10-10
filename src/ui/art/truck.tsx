/**
 * Fire truck, side view (≈150 wide × 70 tall at scale 1), red with a ladder. Faces +x by default so it
 * drives "forward" along a road from left to right; pass facing=-1 to drive left.
 * Anchor = bottom-centre (ground under the wheels).
 */
import { ART, OUTLINE, OUTLINE_THIN } from './palette';
import { GroundShadow, Part, type PartProps } from './primitives';

export interface FireTruckProps extends PartProps {
  readonly facing?: 1 | -1;
  /** Beacon lit (static; animate by toggling between frames). */
  readonly lights?: boolean;
  /** Wheel frame for a simple rolling effect (0 or 1). */
  readonly wheelFrame?: 0 | 1;
  /** Clean red body (no lockers, no hose reel) so lettering can be painted on it — used by the brand mark. */
  readonly plain?: boolean;
}

export function FireTruck({ facing = 1, lights = false, wheelFrame = 0, plain = false, ...part }: FireTruckProps) {
  return (
    <Part {...part}>
      <GroundShadow cx={0} cy={2} rx={72} ry={6} />
      <g transform={facing === -1 ? 'scale(-1 1)' : undefined}>
        {/* ladder */}
        <g stroke={ART.ink} strokeWidth={OUTLINE_THIN}>
          <rect x={-66} y={-66} width={92} height={5} fill={ART.ladder} />
          <rect x={-66} y={-58} width={92} height={5} fill={ART.ladder} />
          {[-58, -44, -30, -16, -2, 12].map((x) => (
            <line key={x} x1={x} y1={-66} x2={x} y2={-53} />
          ))}
        </g>
        {/* body */}
        <rect x={-72} y={-52} width={100} height={42} rx={4} fill={ART.truck} stroke={ART.ink} strokeWidth={OUTLINE} />
        <rect x={-72} y={-32} width={100} height={6} fill={ART.truckTrim} />
        {/* lockers (omitted on the plain body) */}
        {plain ? null : (
          <g fill={ART.truckDark} stroke={ART.ink} strokeWidth={OUTLINE_THIN}>
            <rect x={-64} y={-47} width={22} height={13} rx={2} />
            <rect x={-38} y={-47} width={22} height={13} rx={2} />
            <rect x={-12} y={-47} width={22} height={13} rx={2} />
          </g>
        )}
        {/* cab */}
        <path d="M28 -10 L28 -58 Q28 -62 32 -62 L58 -62 Q66 -62 70 -54 L76 -36 L76 -10 Z" fill={ART.truck} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
        <path d="M34 -56 L58 -56 Q63 -56 65 -51 L70 -38 L34 -38 Z" fill={ART.glass} stroke={ART.ink} strokeWidth={OUTLINE_THIN} strokeLinejoin="round" />
        <rect x={28} y={-32} width={48} height={6} fill={ART.truckTrim} />
        {/* bumper + hose reel */}
        <rect x={70} y={-18} width={10} height={8} rx={2} fill={ART.inkSoft} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
        {plain ? null : <circle cx={-56} cy={-24} r={6} fill={ART.hose} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />}
        {/* beacon */}
        <rect x={40} y={-70} width={14} height={8} rx={3} fill={lights ? ART.beaconBlue : ART.glass} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
        {lights ? <circle cx={47} cy={-66} r={11} fill="none" stroke={ART.beaconBlue} strokeWidth={2} /> : null}
        {/* wheels */}
        <Wheel cx={-42} frame={wheelFrame} />
        <Wheel cx={48} frame={wheelFrame} />
      </g>
    </Part>
  );
}

function Wheel({ cx, frame }: { readonly cx: number; readonly frame: 0 | 1 }) {
  return (
    <g>
      <circle cx={cx} cy={-13} r={13} fill={ART.wheel} />
      <circle cx={cx} cy={-13} r={6.5} fill={ART.hub} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      <line x1={cx - 5} y1={frame === 0 ? -13 : -18} x2={cx + 5} y2={frame === 0 ? -13 : -8} stroke={ART.ink} strokeWidth={1.6} />
    </g>
  );
}
