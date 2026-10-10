/**
 * City tiles and scenery: ground, roads, trees, street lights, flags, roadblocks, fog, smoke plumes, clouds.
 * Roads are scenery only — nothing in the game propagates along them.
 */
import { ART, OUTLINE, OUTLINE_THIN } from './palette';
import { GroundShadow, Part, type PartProps } from './primitives';
import { fmt } from './util';
import { Smoke } from './fire';

/** Cream ground rectangle (the scene floor). */
export function Ground({ x = 0, y = 0, width, height, rx = 0 }: { readonly x?: number; readonly y?: number; readonly width: number; readonly height: number; readonly rx?: number }) {
  return <rect x={x} y={y} width={width} height={height} rx={rx} fill={ART.sand} />;
}

/** A grass patch. */
export function GrassPatch({ cx, cy, rx, ry }: { readonly cx: number; readonly cy: number; readonly rx: number; readonly ry: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={ART.grass} />;
}

export interface RoadPathProps {
  /** Any SVG path; drawn as a road (edge, asphalt, dashed centre line). */
  readonly d: string;
  readonly width?: number;
  readonly className?: string;
}

export function RoadPath({ d, width = 40, className }: RoadPathProps) {
  return (
    <g className={className} fill="none" strokeLinecap="butt" strokeLinejoin="round">
      <path d={d} stroke={ART.roadEdge} strokeWidth={width + 6} />
      <path d={d} stroke={ART.road} strokeWidth={width} />
      <path d={d} stroke={ART.roadLine} strokeWidth={Math.max(2, width * 0.08)} strokeDasharray={`${fmt(width * 0.5)} ${fmt(width * 0.45)}`} />
    </g>
  );
}

export function RoadStraight({ x1, y1, x2, y2, width = 40 }: { readonly x1: number; readonly y1: number; readonly x2: number; readonly y2: number; readonly width?: number }) {
  return <RoadPath d={`M${fmt(x1)} ${fmt(y1)} L${fmt(x2)} ${fmt(y2)}`} width={width} />;
}

/** Quarter-circle road corner from (x1,y1) to (x2,y2) bending through the control point (cx,cy). */
export function RoadCurve({ x1, y1, cx, cy, x2, y2, width = 40 }: { readonly x1: number; readonly y1: number; readonly cx: number; readonly cy: number; readonly x2: number; readonly y2: number; readonly width?: number }) {
  return <RoadPath d={`M${fmt(x1)} ${fmt(y1)} Q${fmt(cx)} ${fmt(cy)} ${fmt(x2)} ${fmt(y2)}`} width={width} />;
}

/** Footpath between houses (narrow, sand-dark). */
export function Footpath({ d, width = 14 }: { readonly d: string; readonly width?: number }) {
  return <path d={d} fill="none" stroke={ART.sandDark} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />;
}

/** River band drawn from a path (vertical or meandering). */
export function River({ d, width = 60 }: { readonly d: string; readonly width?: number }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={ART.riverDark} strokeWidth={width + 6} />
      <path d={d} stroke={ART.river} strokeWidth={width} />
      <path d={d} stroke={ART.paper} strokeWidth={2} strokeDasharray="14 22" transform="translate(-10 0)" />
    </g>
  );
}

/** Round park tree. ≈36 wide × 56 tall. Anchor = trunk base. */
export function Tree({ size = 1, ...part }: PartProps & { readonly size?: number }) {
  return (
    <Part {...part} scale={(part.scale ?? 1) * size}>
      <GroundShadow cx={2} cy={1} rx={14} ry={4} />
      <rect x={-4} y={-22} width={8} height={22} fill={ART.trunk} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      <circle cx={0} cy={-38} r={19} fill={ART.tree} stroke={ART.ink} strokeWidth={OUTLINE} />
      <circle cx={-9} cy={-30} r={11} fill={ART.treeDark} />
      <circle cx={7} cy={-46} r={7} fill={ART.grass} />
    </Part>
  );
}

/** Street light. ≈70 tall. Anchor = post base. */
export function StreetLight({ lit = false, ...part }: PartProps & { readonly lit?: boolean }) {
  return (
    <Part {...part}>
      <rect x={-2.5} y={-62} width={5} height={62} fill={ART.lampPost} stroke={ART.ink} strokeWidth={1.2} />
      <rect x={-8} y={-4} width={16} height={4} rx={1.5} fill={ART.lampPost} stroke={ART.ink} strokeWidth={1.2} />
      <path d="M0 -62 Q0 -70 10 -70" fill="none" stroke={ART.lampPost} strokeWidth={4} />
      <ellipse cx={13} cy={-70} rx={8} ry={5} fill={lit ? ART.windowLit : ART.lamp} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      {lit ? <path d="M6 -64 L13 -52 L20 -64 Z" fill={ART.windowLit} fillOpacity={0.6} /> : null}
    </Part>
  );
}

/** Pennant flag marking an available district. ≈60 tall. Anchor = pole base. */
export function Flag({ colour = ART.flag, ...part }: PartProps & { readonly colour?: string }) {
  return (
    <Part {...part}>
      <rect x={-2} y={-62} width={4} height={62} fill={ART.flagPole} stroke={ART.ink} strokeWidth={1} />
      <path d="M2 -62 L36 -50 L2 -38 Z" fill={colour} stroke={ART.ink} strokeWidth={OUTLINE_THIN} strokeLinejoin="round" />
      <circle cx={0} cy={-64} r={3.5} fill={ART.alarmRing} stroke={ART.ink} strokeWidth={1} />
    </Part>
  );
}

/** Striped roadblock barrier (locked district). ≈70 wide × 34 tall. Anchor = base centre. */
export function Roadblock(part: PartProps) {
  return (
    <Part {...part}>
      <g fill={ART.barrierStripe} stroke={ART.ink} strokeWidth={OUTLINE_THIN}>
        <rect x={-30} y={-22} width={6} height={22} />
        <rect x={24} y={-22} width={6} height={22} />
      </g>
      <rect x={-36} y={-34} width={72} height={14} rx={3} fill={ART.barrier} stroke={ART.ink} strokeWidth={OUTLINE} />
      <g fill={ART.barrierStripe}>
        {[-28, -10, 8, 26].map((x) => (
          <path key={x} d={`M${String(x)} -32 L${String(x + 8)} -32 L${String(x)} -22 L${String(x - 8)} -22 Z`} />
        ))}
      </g>
    </Part>
  );
}

/** Soft fog patch covering a locked district (no letters, same for every district). */
export function FogPatch({ x, y, width, height }: { readonly x: number; readonly y: number; readonly width: number; readonly height: number }) {
  const r = Math.min(width, height) * 0.28;
  return (
    <g fill={ART.fog} fillOpacity={0.8} stroke={ART.fogDark} strokeWidth={OUTLINE_THIN}>
      <rect x={x} y={y} width={width} height={height} rx={r} />
      <circle cx={x + width * 0.22} cy={y + height * 0.2} r={r * 0.8} />
      <circle cx={x + width * 0.78} cy={y + height * 0.76} r={r * 0.9} />
    </g>
  );
}

/** Tall smoke plume over a district on fire (no fire type is shown). */
export function SmokePlume(part: PartProps) {
  return (
    <>
      <Smoke {...part} scale={(part.scale ?? 1) * 1.3} />
      <Smoke {...part} x={part.x + 26 * (part.scale ?? 1)} y={part.y - 40 * (part.scale ?? 1)} scale={(part.scale ?? 1) * 0.9} />
    </>
  );
}

/** Flat cloud. Anchor = cloud base centre. */
export function Cloud({ size = 1, ...part }: PartProps & { readonly size?: number }) {
  return (
    <Part {...part} scale={(part.scale ?? 1) * size}>
      <g fill={ART.cloud} stroke={ART.skyDeep} strokeWidth={OUTLINE_THIN}>
        <ellipse cx={0} cy={-10} rx={44} ry={12} />
        <circle cx={-14} cy={-18} r={14} />
        <circle cx={10} cy={-22} r={18} />
      </g>
    </Part>
  );
}

/** A small chapter badge (shield with a star) for the result screen. ≈48 wide × 56 tall. Anchor = bottom-centre. */
export function ChapterBadge({ colour = ART.crewZ, earned = true, ...part }: PartProps & { readonly colour?: string; readonly earned?: boolean }) {
  return (
    <Part {...part}>
      <path d="M-22 -54 H22 V-24 Q22 -8 0 0 Q-22 -8 -22 -24 Z" fill={earned ? colour : ART.fog} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <path d="M0 -44 L4.5 -35 L14 -34 L7 -27 L9 -17 L0 -22 L-9 -17 L-7 -27 L-14 -34 L-4.5 -35 Z" fill={earned ? ART.alarmRing : ART.paper} stroke={ART.ink} strokeWidth={OUTLINE_THIN} strokeLinejoin="round" />
    </Part>
  );
}
