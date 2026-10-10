/**
 * Scene geometry (no React). One `SceneGeometry` per scene kind tells the Scene, the spray player and the Why
 * comparison where every house, detector, truck, firefighter and hose stream sits, in SVG scene units.
 *
 *   houses-row  rep3: three houses in a row (REP3_SCENE from src/ui/art)
 *   grid        rsc3: 3 × 3 houses, eight detectors (RSC3_SCENE)
 *   bridge      trivial codes with a CNOT story: bridge decks, a coupler, a house at the end of every lane
 *   lab         trivial codes with an H story: lab conveyor lanes, mirror machines / dials, end houses
 *
 * Nothing here reads fires or crews: positions depend only on the code, the circuit and the house index, so the
 * geometry can never leak the hidden fire (R8).
 */
import { getCode, type Circuit, type CodeId } from '../../quantum';
import { REP3_SCENE, RSC3_SCENE, type DetectorPoint, type HouseVariant, type LaneGeometry } from '../art';

export type SceneKind = 'houses-row' | 'bridge' | 'lab' | 'grid';

export interface Pt {
  readonly x: number;
  readonly y: number;
}

export interface Box {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

export interface HouseSpot {
  readonly q: number;
  /** Ground anchor (bottom-centre of the front face). */
  readonly x: number;
  readonly y: number;
}

export interface CrewSpot extends Pt {
  readonly facing: 1 | -1;
}

export interface TruckLane {
  /** Off-screen start. */
  readonly from: Pt;
  /** Parking spot (where crews start running from). */
  readonly stop: Pt;
  readonly facing: 1 | -1;
  readonly scale: number;
}

export interface SceneGeometry {
  readonly kind: SceneKind;
  readonly codeId: CodeId;
  readonly width: number;
  readonly height: number;
  readonly n: number;
  readonly houses: readonly HouseSpot[];
  readonly houseScale: number;
  readonly detectors: readonly DetectorPoint[];
  readonly detectorScale: number;
  readonly truck: TruckLane;
  readonly crewScale: number;
  /** Where the memory beacon tower stands (null when the scene has no corner for it). */
  readonly tower: (Pt & { readonly scale: number }) | null;
  /** Lane boards only. */
  readonly lanes: LaneGeometry | null;
}

/** House drawing dimensions at scale 1 (mirrors `DIMS` in src/ui/art/houses.tsx: front width, wall + roof height, side depth). */
export const HOUSE_DIMS: Readonly<Record<HouseVariant, { readonly w: number; readonly h: number; readonly side: number }>> = {
  small: { w: 64, h: 74, side: 12 },
  tall: { w: 56, h: 106, side: 12 },
  shop: { w: 84, h: 62, side: 12 },
};

/** Default house variety: deterministic by index so neighbours differ (never by state). */
export function defaultHouseVariant(kind: SceneKind, q: number): HouseVariant {
  if (kind === 'bridge' || kind === 'lab') return 'small';
  if (kind === 'houses-row') return q === 1 ? 'tall' : 'small';
  // Tall houses only in the top row: their roof flame reaches ~27 units above the row line and would overlap the
  // house in front; a shop is wide, so it sits in the middle column where the street gaps on both sides are free.
  const cycle: readonly HouseVariant[] = ['tall', 'small', 'tall', 'small', 'shop', 'small', 'small', 'shop', 'small'];
  return cycle[q] ?? 'small';
}

/** Scene kind for a code and circuit: rep3 → row, rsc3 → grid, bare wires → lab when an H gate appears, else bridge. */
export function deriveSceneKind(codeId: CodeId, circuit: Circuit): SceneKind {
  if (codeId === 'rep3') return 'houses-row';
  if (codeId === 'rsc3') return 'grid';
  return circuit.some((g) => g.kind === 'H' || g.kind === 'S') ? 'lab' : 'bridge';
}

const HOUSE_SCALE = 0.85;
const DETECTOR_SCALE = 0.8;
const CREW_SCALE = 0.55;
/** Grid crews stand in the narrow street beside their house, so they are drawn a little smaller. */
const GRID_CREW_SCALE = 0.5;
const TRUCK_SCALE = 0.6;
const LANE_HOUSE_SCALE = 0.6;
/** Extra ground on the right of the house scenes: a reserved slot for the memory beacon (never crammed into a corner). */
export const TOWER_STRIP = 64;

function laneBoard(n: number): LaneGeometry {
  const width = 620;
  const height = 100 + n * 100;
  return {
    width,
    height,
    lanes: n,
    laneY: (i) => 115 + i * 100,
    stepX: (j, steps) => 150 + ((width - 300) * (j + 0.5)) / Math.max(1, steps),
    inX: 80,
    outX: 540,
  };
}

/** Build the geometry for a scene kind. The code decides the house count; the kind decides the picture. */
export function sceneGeometry(kind: SceneKind, codeId: CodeId): SceneGeometry {
  const n = getCode(codeId).n;
  if (kind === 'grid' || kind === 'houses-row') {
    const layout = kind === 'grid' ? RSC3_SCENE : REP3_SCENE;
    const houses = layout.houses.slice(0, n).map((h) => ({ q: h.q, x: h.x, y: h.y }));
    return {
      kind,
      codeId,
      width: layout.width + TOWER_STRIP,
      height: layout.height,
      n,
      houses,
      houseScale: HOUSE_SCALE,
      detectors: layout.detectors,
      detectorScale: DETECTOR_SCALE,
      truck: { from: { x: -80, y: layout.height - 6 }, stop: { x: 62, y: layout.height - 6 }, facing: 1, scale: TRUCK_SCALE },
      crewScale: kind === 'grid' ? GRID_CREW_SCALE : CREW_SCALE,
      // The tower stands in the reserved strip, on the ground line of the bottom row, clear of houses and detectors.
      tower: { x: layout.width + TOWER_STRIP / 2, y: layout.height - 24, scale: 0.5 },
      lanes: null,
    };
  }
  const g = laneBoard(n);
  const houses = Array.from({ length: n }, (_, q) => ({ q, x: g.outX, y: g.laneY(q) + 26 }));
  return {
    kind,
    codeId,
    width: g.width,
    height: g.height,
    n,
    houses,
    houseScale: LANE_HOUSE_SCALE,
    detectors: [],
    detectorScale: DETECTOR_SCALE,
    truck: { from: { x: -90, y: 56 }, stop: { x: 96, y: 56 }, facing: 1, scale: TRUCK_SCALE },
    crewScale: CREW_SCALE,
    tower: null,
    lanes: g,
  };
}

export function houseAt(geo: SceneGeometry, q: number): HouseSpot {
  const h = geo.houses[q];
  if (h === undefined) throw new Error(`scene: no house ${String(q)}`);
  return h;
}

/** Bounding box of the drawn house (fog veil extents), used for the HTML button hit area. */
export function houseBox(geo: SceneGeometry, q: number, variant: HouseVariant): Box {
  const h = houseAt(geo, q);
  const d = HOUSE_DIMS[variant];
  const s = geo.houseScale;
  return {
    x: h.x - (d.w / 2 + 10) * s,
    y: h.y - (d.h + 12) * s,
    w: (d.w + d.side + 20) * s,
    h: (d.h + 14) * s + 4,
  };
}

/** Extents of the drawn building itself (front face + side face, wall + roof), without the hit-box padding. */
export function houseDrawnBox(geo: SceneGeometry, q: number, variant: HouseVariant): Box {
  const h = houseAt(geo, q);
  const d = HOUSE_DIMS[variant];
  const s = geo.houseScale;
  return { x: h.x - (d.w / 2) * s, y: h.y - d.h * s, w: (d.w + d.side) * s, h: d.h * s };
}

/**
 * Where a firefighter stands to spray house q: on the footpath in front of the house's door (front-left), inside the
 * house's own footprint, so the crew never stands on a neighbouring roof or on an alarm station (the stations sit at
 * the street crossings between houses). Grid crews are drawn smaller and the tall houses stay in the top row, so the
 * spot is clear of the row in front as well (checked by the geometry test). Lanes: beside the house on the deck.
 */
export function crewSpot(geo: SceneGeometry, q: number): CrewSpot {
  const h = houseAt(geo, q);
  if (geo.lanes !== null) return { x: h.x - 44, y: h.y + 4, facing: 1 };
  return { x: h.x - 20, y: h.y + 22, facing: 1 };
}

/** Approximate drawn extents of an alarm station (lamp ±14 around its centre down to the pole base). */
export function detectorBox(geo: SceneGeometry, index: number): Box {
  const d = geo.detectors[index];
  if (d === undefined) throw new Error(`scene: no detector ${String(index)}`);
  const r = 18 * geo.detectorScale;
  return { x: d.lamp.x - r, y: d.lamp.y - r, w: 2 * r, h: d.y - d.lamp.y + r };
}

/** Approximate drawn extents of a firefighter standing at `spot` (helmet brim ±17, 80 tall at scale 1). */
export function crewBox(geo: SceneGeometry, spot: CrewSpot): Box {
  const s = geo.crewScale;
  return { x: spot.x - 17 * s, y: spot.y - 80 * s, w: 34 * s, h: 80 * s };
}

/** Approximate drawn extents of the roof flame of house q (the Flame part is 92 tall × ±38 wide at scale 0.62 inside the house). */
export function flameBox(geo: SceneGeometry, q: number, variant: HouseVariant): Box {
  const h = houseAt(geo, q);
  const d = HOUSE_DIMS[variant];
  const s = geo.houseScale;
  const flameScale = 0.62 * s;
  const base = h.y + (-d.h + 14) * s;
  const dx = variant === 'shop' ? -10 * s : 0;
  return { x: h.x + dx - 38 * flameScale, y: base - 92 * flameScale, w: 76 * flameScale, h: 92 * flameScale };
}

export function boxesIntersect(a: Box, b: Box): boolean {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

/** Where the hose stream lands: the lower half of the roof flame. */
export function flamePoint(geo: SceneGeometry, q: number, variant: HouseVariant): Pt {
  const h = houseAt(geo, q);
  const d = HOUSE_DIMS[variant];
  const s = geo.houseScale;
  const dx = variant === 'shop' ? -10 * s : 0;
  return { x: h.x + dx + 2, y: h.y + (-d.h + 14 - 22) * s };
}

/** Lane boards: x of a travelling token when the time cursor is at `cursor` (-1 = before the first gate). */
export function laneTokenX(g: LaneGeometry, cursor: number, steps: number): number {
  if (steps === 0) return (g.inX + g.outX) / 2;
  if (cursor < 0) return (g.inX + g.stepX(0, steps)) / 2;
  const here = g.stepX(Math.min(cursor, steps - 1), steps);
  const next = cursor + 1 < steps ? g.stepX(cursor + 1, steps) : g.outX;
  return (here + next) / 2;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpPt(a: Pt, b: Pt, t: number): Pt {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

export function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** Ease-out for the truck drive (fast in, soft stop). */
export function easeOut(t: number): number {
  const u = clamp01(t);
  return 1 - (1 - u) * (1 - u);
}
