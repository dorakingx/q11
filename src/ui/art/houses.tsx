/**
 * Buildings. Low 2.5D angle: a front face, a thin darker side face on the right, a roof with a visible top edge,
 * and a flat ground shadow. Anchor = bottom-centre of the front face. A small house is ≈72 wide × 78 tall.
 *
 * House states (R4/R8/R9):
 *   normal    plain house
 *   fog       unknown candidate: grey veil + "?" — IDENTICAL for every candidate (no letter, no size change)
 *   fire      flame on the roof with its X/Z/Y badge (Training, or after the answer check)
 *   out       steam puff + green check (fire extinguished)
 *   restored  lit windows
 *   ghost     dashed outline + letter: the harmless stabilizer pattern (component present, logical info safe)
 *   residual  fire + thick red outline (detectable residual)
 */
import type { CrewLetter } from '../../game';
import { CheckMark, Flame, SteamPuff } from './fire';
import { ART, OUTLINE, OUTLINE_THIN, ROOF_CYCLE, WALL_CYCLE } from './palette';
import { GroundShadow, LetterBadge, Part, type PartProps } from './primitives';
import { FONT } from './util';

export type HouseState =
  | { readonly kind: 'normal' }
  | { readonly kind: 'fog' }
  | { readonly kind: 'fire'; readonly letter: CrewLetter }
  | { readonly kind: 'out' }
  | { readonly kind: 'restored' }
  | { readonly kind: 'ghost'; readonly letter: CrewLetter }
  | { readonly kind: 'residual'; readonly letter: CrewLetter };

export type HouseVariant = 'small' | 'tall' | 'shop';

export interface HouseProps extends PartProps {
  readonly variant?: HouseVariant;
  readonly state?: HouseState;
  /** Index into the pastel wall/roof cycles so neighbours differ (default 0). */
  readonly tint?: number;
  /** Selected / planned target outline (planning preview). */
  readonly selected?: boolean;
}

interface Dims {
  readonly w: number;
  readonly h: number;
  readonly roof: number;
  readonly side: number;
}

const DIMS: Readonly<Record<HouseVariant, Dims>> = {
  small: { w: 64, h: 44, roof: 30, side: 12 },
  tall: { w: 56, h: 84, roof: 22, side: 12 },
  shop: { w: 84, h: 46, roof: 16, side: 12 },
};

export function House({ variant = 'small', state = { kind: 'normal' }, tint = 0, selected = false, ...part }: HouseProps) {
  const d = DIMS[variant];
  const wall = WALL_CYCLE[tint % WALL_CYCLE.length] ?? ART.wallPeach;
  const roof = ROOF_CYCLE[tint % ROOF_CYCLE.length] ?? ART.roofTerracotta;
  const hw = d.w / 2;
  const lit = state.kind === 'restored';
  const win = lit ? ART.windowLit : ART.windowDark;
  const top = -(d.h + d.roof);
  const fogged = state.kind === 'fog';
  return (
    <Part {...part}>
      <GroundShadow cx={d.side / 2} cy={2} rx={hw + d.side} ry={7} />
      {state.kind === 'residual' ? <rect x={-hw - 6} y={top - 6} width={d.w + d.side + 12} height={d.h + d.roof + 12} rx={8} fill="none" stroke={ART.danger} strokeWidth={OUTLINE * 2.4} /> : null}
      {selected ? <rect x={-hw - 8} y={top - 8} width={d.w + d.side + 16} height={d.h + d.roof + 16} rx={10} fill="none" stroke={ART.highlight} strokeWidth={OUTLINE * 1.6} strokeDasharray="10 6" /> : null}
      {/* side face */}
      <path d={`M${String(hw)} 0 L${String(hw + d.side)} ${String(-d.side * 0.6)} L${String(hw + d.side)} ${String(-d.h - d.side * 0.6)} L${String(hw)} ${String(-d.h)} Z`} fill={ART.side} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
      {/* front face */}
      <rect x={-hw} y={-d.h} width={d.w} height={d.h} fill={wall} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
      {/* roof */}
      {variant === 'small' ? (
        <>
          <path d={`M${String(hw + 4)} ${String(-d.h)} L${String(hw + d.side + 4)} ${String(-d.h - d.side * 0.6)} L${String(d.side)} ${String(top - d.side * 0.6)} L0 ${String(top)} Z`} fill={ART.roofSlate} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
          <path d={`M${String(-hw - 5)} ${String(-d.h)} L0 ${String(top)} L${String(hw + 5)} ${String(-d.h)} Z`} fill={roof} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d={`M${String(-hw - 4)} ${String(-d.h)} L${String(-hw - 4 + d.side)} ${String(-d.h - d.side * 0.6)} L${String(hw + d.side + 4)} ${String(-d.h - d.side * 0.6)} L${String(hw + 4)} ${String(-d.h)} Z`} fill={ART.roofSlate} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
          <rect x={-hw - 4} y={-d.h - d.roof} width={d.w + 8} height={d.roof} fill={roof} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
          {variant === 'shop' ? <path d={`M${String(-hw - 4)} ${String(-d.h - d.roof)} H${String(hw + 4)}`} stroke={ART.paper} strokeWidth={4} strokeDasharray="8 8" /> : null}
        </>
      )}
      {/* windows + door */}
      {variant === 'small' ? (
        <>
          <rect x={-hw + 9} y={-d.h + 10} width={16} height={14} rx={2} fill={win} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
          <rect x={hw - 25} y={-d.h + 10} width={16} height={14} rx={2} fill={win} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
          <rect x={-8} y={-22} width={16} height={22} rx={3} fill={ART.door} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
        </>
      ) : variant === 'tall' ? (
        <>
          {[0, 1, 2].map((row) => (
            <g key={row}>
              <rect x={-hw + 8} y={-d.h + 10 + row * 22} width={14} height={13} rx={2} fill={win} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
              <rect x={hw - 22} y={-d.h + 10 + row * 22} width={14} height={13} rx={2} fill={win} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
            </g>
          ))}
          <rect x={-8} y={-20} width={16} height={20} rx={3} fill={ART.door} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
        </>
      ) : (
        <>
          <rect x={-hw + 8} y={-d.h + 12} width={d.w - 40} height={22} rx={2} fill={win} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
          <rect x={hw - 26} y={-26} width={18} height={26} rx={3} fill={ART.door} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
          <rect x={-hw - 4} y={-d.h + 2} width={d.w + 8} height={6} fill={ART.paper} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
        </>
      )}
      {/* state overlays */}
      {state.kind === 'fire' || state.kind === 'residual' ? <Flame letter={state.letter} x={variant === 'shop' ? -10 : 0} y={top + 14} scale={0.62} residual={state.kind === 'residual'} /> : null}
      {state.kind === 'ghost' ? (
        <>
          <rect x={-hw - 6} y={top - 6} width={d.w + d.side + 12} height={d.h + d.roof + 12} rx={8} fill="none" stroke={ART.ghost} strokeWidth={OUTLINE} strokeDasharray="8 6" />
          <Flame letter={state.letter} x={0} y={top + 14} scale={0.62} ghost />
        </>
      ) : null}
      {state.kind === 'out' ? (
        <>
          <SteamPuff x={0} y={top + 10} scale={0.7} />
          <CheckMark x={hw - 4} y={-d.h + 6} scale={0.8} />
        </>
      ) : null}
      {fogged ? (
        <>
          <rect x={-hw - 10} y={top - 12} width={d.w + d.side + 20} height={d.h + d.roof + 14} rx={14} fill={ART.fog} fillOpacity={0.82} stroke={ART.fogDark} strokeWidth={OUTLINE} />
          <text x={d.side / 2} y={-(d.h + d.roof) / 2 + 14} textAnchor="middle" fontSize={38} fontWeight={800} fill={ART.paper} stroke={ART.fogDark} strokeWidth={1.2} fontFamily={FONT} style={{ userSelect: 'none' }}>
            ?
          </text>
        </>
      ) : null}
    </Part>
  );
}

/* ------------------------------------------------------------------ special buildings */

export interface MemoryTowerProps extends PartProps {
  /** Logical anomaly shown on the beacon at result time only: 'X' / 'Z' / 'Y' (both) or null. */
  readonly anomaly?: CrewLetter | null;
  /** Beacon lit (calm, white) — e.g. district solved. */
  readonly lit?: boolean;
}

/** Old-town memory tower (the logical qubit's "memory beacon"). ≈60 wide × 150 tall. */
export function MemoryTower({ anomaly = null, lit = false, ...part }: MemoryTowerProps) {
  const domeFill = anomaly === null ? (lit ? ART.windowLit : ART.beaconDome) : anomaly === 'X' ? ART.fireX : anomaly === 'Z' ? ART.fireZ : ART.crewY;
  return (
    <Part {...part}>
      <GroundShadow cx={6} cy={2} rx={44} ry={7} />
      <path d="M26 0 L38 -7 L38 -112 L26 -118 Z" fill={ART.side} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <rect x={-26} y={-118} width={52} height={118} fill={ART.wallStone} stroke={ART.ink} strokeWidth={OUTLINE} />
      {[0, 1, 2].map((row) => (
        <rect key={row} x={-7} y={-104 + row * 30} width={14} height={18} rx={7} fill={lit ? ART.windowLit : ART.windowDark} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      ))}
      <rect x={-10} y={-24} width={20} height={24} rx={4} fill={ART.door} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      <rect x={-32} y={-126} width={76} height={10} fill={ART.roofPlum} stroke={ART.ink} strokeWidth={OUTLINE} />
      <rect x={-22} y={-150} width={44} height={26} fill={ART.wallStone} stroke={ART.ink} strokeWidth={OUTLINE} />
      {/* beacon */}
      <path d="M-18 -150 Q0 -176 18 -150 Z" fill={domeFill} stroke={ART.ink} strokeWidth={OUTLINE} />
      <rect x={-22} y={-152} width={44} height={5} fill={ART.inkSoft} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      {anomaly !== null ? (
        <>
          <circle cx={0} cy={-158} r={28} fill="none" stroke={domeFill} strokeWidth={3} strokeDasharray="6 6" />
          {anomaly === 'Y' ? (
            <>
              <LetterBadge cx={-14} cy={-186} r={11} letter="X" ink={ART.fireX} stroke={ART.fireX} />
              <LetterBadge cx={14} cy={-186} r={11} letter="Z" ink={ART.fireZ} stroke={ART.fireZ} />
            </>
          ) : (
            <LetterBadge cx={0} cy={-186} r={12} letter={anomaly} ink={domeFill} stroke={domeFill} />
          )}
        </>
      ) : null}
    </Part>
  );
}

/** Fire station: brick, two bay doors, a small bell tower. ≈150 wide × 100 tall. */
export function FireStation({ open = false, ...part }: PartProps & { readonly open?: boolean }) {
  return (
    <Part {...part}>
      <GroundShadow cx={8} cy={2} rx={84} ry={8} />
      <path d="M70 0 L84 -8 L84 -72 L70 -64 Z" fill={ART.side} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <rect x={-70} y={-64} width={140} height={64} fill={ART.wallBrick} stroke={ART.ink} strokeWidth={OUTLINE} />
      <path d="M-74 -64 L-60 -72 L84 -72 L70 -64 Z" fill={ART.roofSlate} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <rect x={-74} y={-70} width={148} height={6} fill={ART.truckTrim} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      {/* bay doors */}
      <rect x={-58} y={-46} width={44} height={46} rx={4} fill={open ? ART.ink : ART.truckTrim} stroke={ART.ink} strokeWidth={OUTLINE} />
      <rect x={-4} y={-46} width={44} height={46} rx={4} fill={ART.truckTrim} stroke={ART.ink} strokeWidth={OUTLINE} />
      {!open ? <path d="M-54 -34 H-18 M-54 -22 H-18 M-54 -10 H-18" stroke={ART.ink} strokeWidth={1.4} /> : null}
      <path d="M0 -34 H36 M0 -22 H36 M0 -10 H36" stroke={ART.ink} strokeWidth={1.4} />
      <rect x={48} y={-52} width={14} height={14} rx={2} fill={ART.windowDark} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      {/* tower */}
      <rect x={-50} y={-104} width={28} height={34} fill={ART.wallBrick} stroke={ART.ink} strokeWidth={OUTLINE} />
      <path d="M-54 -104 L-36 -120 L-18 -104 Z" fill={ART.roofTerracotta} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <path d="M-42 -84 Q-36 -98 -30 -84 Z" fill={ART.alarmRing} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
    </Part>
  );
}

/** Conversion lab: a glass hall with a mirror machine (the H gate) on the roof. ≈130 wide × 100 tall. */
export function ConversionLab({ active = false, ...part }: PartProps & { readonly active?: boolean }) {
  return (
    <Part {...part}>
      <GroundShadow cx={8} cy={2} rx={76} ry={8} />
      <path d="M60 0 L74 -8 L74 -62 L60 -54 Z" fill={ART.side} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <rect x={-60} y={-54} width={120} height={54} fill={ART.wallPowder} stroke={ART.ink} strokeWidth={OUTLINE} />
      <path d="M-64 -54 L-50 -62 L74 -62 L60 -54 Z" fill={ART.roofSlate} stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <rect x={-52} y={-44} width={104} height={24} rx={4} fill={ART.glass} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      <path d="M-40 -44 V-20 M-20 -44 V-20 M0 -44 V-20 M20 -44 V-20 M40 -44 V-20" stroke={ART.paper} strokeWidth={2} />
      <rect x={-10} y={-18} width={20} height={18} rx={3} fill={ART.door} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      <MirrorMachine x={0} y={-62} scale={0.9} active={active} label={false} />
    </Part>
  );
}

/** The H gate as a tilted mirror on a stand; red in → blue out. Anchor = base of the stand. ≈50 wide × 46 tall. */
export function MirrorMachine({ active = false, label = true, ...part }: PartProps & { readonly active?: boolean; readonly label?: boolean }) {
  return (
    <Part {...part}>
      <rect x={-16} y={-6} width={32} height={6} rx={2} fill={ART.inkSoft} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      <rect x={-3} y={-20} width={6} height={14} fill={ART.inkSoft} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
      <g transform="rotate(-45 0 -30)">
        <rect x={-22} y={-34} width={44} height={8} rx={2} fill={active ? ART.alarmRing : ART.glass} stroke={ART.ink} strokeWidth={OUTLINE} />
        <line x1={-16} y1={-30} x2={14} y2={-30} stroke={ART.paper} strokeWidth={2} />
      </g>
      {label ? (
        <text x={0} y={-40} textAnchor="middle" fontSize={16} fontWeight={800} fill={ART.ink} fontFamily={FONT} style={{ userSelect: 'none' }}>
          H
        </text>
      ) : null}
    </Part>
  );
}

/** Bridge span over the river: deck, arch and railings. ≈160 wide × 60 tall. Anchor = deck bottom-centre. */
export function BridgeSpan({ width = 160, ...part }: PartProps & { readonly width?: number }) {
  const hw = width / 2;
  return (
    <Part {...part}>
      <path d={`M${String(-hw)} 0 Q0 -46 ${String(hw)} 0`} fill="none" stroke={ART.ink} strokeWidth={OUTLINE + 6} />
      <path d={`M${String(-hw)} 0 Q0 -46 ${String(hw)} 0`} fill="none" stroke={ART.wallStone} strokeWidth={6} />
      <rect x={-hw - 6} y={-12} width={width + 12} height={12} rx={3} fill={ART.wallStone} stroke={ART.ink} strokeWidth={OUTLINE} />
      <g stroke={ART.ink} strokeWidth={OUTLINE_THIN}>
        <line x1={-hw} y1={-12} x2={hw} y2={-12} />
        <line x1={-hw - 2} y1={-26} x2={hw + 2} y2={-26} stroke={ART.roofSlate} strokeWidth={3} />
        {Array.from({ length: Math.floor(width / 20) + 1 }, (_, i) => -hw + i * 20).map((x) => (
          <line key={x} x1={x} y1={-12} x2={x} y2={-26} />
        ))}
      </g>
      <g fill={ART.wallStone} stroke={ART.ink} strokeWidth={OUTLINE}>
        <rect x={-hw - 14} y={-30} width={14} height={30} rx={2} />
        <rect x={hw} y={-30} width={14} height={30} rx={2} />
      </g>
    </Part>
  );
}
