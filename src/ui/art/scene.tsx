/**
 * Scene geometry + ground art for the three board kinds.
 *   rsc3  3 × 3 houses on a 100-unit grid, detectors at the eight check positions of fixtures/codes.json
 *   rep3  3 houses in a row, two Z detectors between them
 *   lanes bridge lanes (CNOT coupler) / lab lanes (H mirror machine, S dial) for the propagation missions
 * Geometry lives in sceneLayout.ts; this file draws the floors, watch highlights and lane gates.
 */
import type { CrewLetter } from '../../game';
import { Flame } from './fire';
import { ART, OUTLINE } from './palette';
import { Part, type PartProps } from './primitives';
import { SCENE_UNIT, type LaneGeometry, type SceneLayout } from './sceneLayout';
import { Footpath, GrassPatch, Ground, River, Tree } from './tiles';
import { FONT, fmt } from './util';

/** Ground for a house scene: cream floor, footpaths between the houses, grass corners, a tree or two. */
export function SceneGround({ layout }: { readonly layout: SceneLayout }) {
  const o = layout.origin;
  const rows = layout.kind === 'rsc3' ? 3 : 1;
  const cols = 3;
  const paths: string[] = [];
  for (let r = 0; r < rows; r++) paths.push(`M${fmt(o.x - 60)} ${fmt(o.y + r * SCENE_UNIT + 40)} H${fmt(o.x + (cols - 1) * SCENE_UNIT + 60)}`);
  if (rows > 1) for (let c = 0; c < cols; c++) paths.push(`M${fmt(o.x + c * SCENE_UNIT + 50)} ${fmt(o.y - 60)} V${fmt(o.y + (rows - 1) * SCENE_UNIT + 60)}`);
  return (
    <g>
      <Ground width={layout.width} height={layout.height} rx={18} />
      <GrassPatch cx={layout.width * 0.12} cy={layout.height * 0.9} rx={layout.width * 0.14} ry={layout.height * 0.06} />
      <GrassPatch cx={layout.width * 0.9} cy={layout.height * 0.1} rx={layout.width * 0.12} ry={layout.height * 0.05} />
      {paths.map((d) => (
        <Footpath key={d} d={d} width={10} />
      ))}
      <Tree x={layout.width - 28} y={layout.height - 16} size={0.7} />
      {layout.kind === 'rsc3' ? <Tree x={30} y={56} size={0.6} /> : null}
    </g>
  );
}

/** Watch lines from a detector lamp to the houses it watches (drawn when the detector is tapped). */
export function WatchLines({ from, to }: { readonly from: { readonly x: number; readonly y: number }; readonly to: readonly { readonly x: number; readonly y: number }[] }) {
  return (
    <g>
      {to.map((p, i) => (
        <line key={i} x1={from.x} y1={from.y} x2={p.x} y2={p.y - 40} stroke={ART.highlight} strokeWidth={OUTLINE * 1.6} strokeLinecap="round" strokeDasharray="10 7" />
      ))}
    </g>
  );
}

/** Tint behind a watched house (same highlight colour as the detector outline). */
export function WatchTint({ x, y }: { readonly x: number; readonly y: number }) {
  return <ellipse cx={x + 6} cy={y + 2} rx={40} ry={14} fill={ART.highlight} fillOpacity={0.35} />;
}

/* ------------------------------------------------------------------ lanes (propagation boards) */

/** Bridge lanes: a river below, one bridge deck per wire. */
export function BridgeLanes({ geometry }: { readonly geometry: LaneGeometry }) {
  const g = geometry;
  return (
    <g>
      <Ground width={g.width} height={g.height} rx={18} />
      <River d={`M30 ${fmt(g.height - 30)} Q${fmt(g.width / 2)} ${fmt(g.height - 70)} ${fmt(g.width - 30)} ${fmt(g.height - 30)}`} width={34} />
      <GrassPatch cx={40} cy={40} rx={50} ry={20} />
      <GrassPatch cx={g.width - 40} cy={40} rx={50} ry={20} />
      {Array.from({ length: g.lanes }, (_, i) => (
        <Deck key={i} y={g.laneY(i)} x1={g.inX - 40} x2={g.outX + 40} />
      ))}
    </g>
  );
}

function Deck({ y, x1, x2 }: { readonly y: number; readonly x1: number; readonly x2: number }) {
  return (
    <g>
      <rect x={x1} y={y - 12} width={x2 - x1} height={24} rx={4} fill={ART.wallStone} stroke={ART.ink} strokeWidth={OUTLINE} />
      <line x1={x1 + 6} y1={y - 16} x2={x2 - 6} y2={y - 16} stroke={ART.roofSlate} strokeWidth={3} />
      {Array.from({ length: Math.floor((x2 - x1) / 30) }, (_, i) => x1 + 15 + i * 30).map((x) => (
        <line key={x} x1={x} y1={y - 12} x2={x} y2={y + 12} stroke={ART.ink} strokeWidth={1} opacity={0.4} />
      ))}
    </g>
  );
}

/** Lab lanes: a tiled floor with one conveyor lane per wire. */
export function LabLanes({ geometry }: { readonly geometry: LaneGeometry }) {
  const g = geometry;
  return (
    <g>
      <rect width={g.width} height={g.height} rx={18} fill={ART.wallPowder} />
      <g stroke={ART.paper} strokeWidth={1.5}>
        {Array.from({ length: Math.ceil(g.width / 50) }, (_, i) => (
          <line key={`v${String(i)}`} x1={i * 50} y1={0} x2={i * 50} y2={g.height} />
        ))}
        {Array.from({ length: Math.ceil(g.height / 50) }, (_, i) => (
          <line key={`h${String(i)}`} x1={0} y1={i * 50} x2={g.width} y2={i * 50} />
        ))}
      </g>
      {Array.from({ length: g.lanes }, (_, i) => (
        <g key={i}>
          <rect x={g.inX - 40} y={g.laneY(i) - 11} width={g.outX - g.inX + 80} height={22} rx={11} fill={ART.inkSoft} stroke={ART.ink} strokeWidth={OUTLINE} />
          <line x1={g.inX - 24} y1={g.laneY(i)} x2={g.outX + 24} y2={g.laneY(i)} stroke={ART.paper} strokeWidth={2} strokeDasharray="6 10" />
        </g>
      ))}
    </g>
  );
}

/** CNOT coupler: a cable from the control lane (solid dot) to the target lane (⊕ ring). */
export function Coupler({ x, controlY, targetY, active = false }: { readonly x: number; readonly controlY: number; readonly targetY: number; readonly active?: boolean }) {
  const col = active ? ART.highlight : ART.ink;
  return (
    <g>
      <line x1={x} y1={controlY} x2={x} y2={targetY} stroke={col} strokeWidth={OUTLINE * 2} />
      <circle cx={x} cy={controlY} r={10} fill={col} />
      <circle cx={x} cy={targetY} r={16} fill={ART.paper} stroke={col} strokeWidth={OUTLINE * 1.4} />
      <line x1={x - 10} y1={targetY} x2={x + 10} y2={targetY} stroke={col} strokeWidth={OUTLINE * 1.4} />
      <line x1={x} y1={targetY - 10} x2={x} y2={targetY + 10} stroke={col} strokeWidth={OUTLINE * 1.4} />
    </g>
  );
}

/** S gate as a small dial. Anchor = dial centre. */
export function Dial({ active = false, ...part }: PartProps & { readonly active?: boolean }) {
  return (
    <Part {...part}>
      <circle cx={0} cy={0} r={18} fill={active ? ART.alarmRing : ART.wallButter} stroke={ART.ink} strokeWidth={OUTLINE} />
      <path d="M0 0 L0 -13" stroke={ART.ink} strokeWidth={3} strokeLinecap="round" />
      <circle cx={0} cy={0} r={3} fill={ART.ink} />
      <text x={0} y={13} textAnchor="middle" fontSize={11} fontWeight={800} fill={ART.ink} fontFamily={FONT} style={{ userSelect: 'none' }}>
        S
      </text>
    </Part>
  );
}

/** Fire token sitting on a lane (flame at half size on a small shadow). Anchor = lane centre. */
export function LaneToken({ letter, ...part }: PartProps & { readonly letter: CrewLetter }) {
  return (
    <Part {...part}>
      <ellipse cx={0} cy={2} rx={18} ry={5} fill={ART.shadow} />
      <Flame letter={letter} x={0} y={0} scale={0.5} />
    </Part>
  );
}
