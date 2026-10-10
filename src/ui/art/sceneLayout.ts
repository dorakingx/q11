/**
 * Scene geometry (no React).
 *   rsc3  3 × 3 houses on a 100-unit grid, detectors at the eight check positions of fixtures/codes.json
 *   rep3  3 houses in a row, two Z detectors between them
 *   lanes one horizontal lane per wire for the propagation boards (bridge / lab)
 * Houses and detectors are placed by the scene UI with the points exported here.
 */
export const SCENE_UNIT = 100;

export interface HousePoint {
  readonly q: number;
  readonly row: number;
  readonly col: number;
  /** House anchor (bottom-centre) in scene units. */
  readonly x: number;
  readonly y: number;
}

export interface DetectorPoint {
  readonly id: string;
  readonly type: 'X' | 'Z';
  readonly row: number;
  readonly col: number;
  /** Detector anchor (pole base). */
  readonly x: number;
  readonly y: number;
  /** Lamp centre (where highlight lines start). */
  readonly lamp: { readonly x: number; readonly y: number };
}

export interface SceneLayout {
  readonly kind: 'rsc3' | 'rep3';
  readonly width: number;
  readonly height: number;
  /** Grid origin: grid point (row 0, col 0) in scene units. */
  readonly origin: { readonly x: number; readonly y: number };
  readonly houses: readonly HousePoint[];
  readonly detectors: readonly DetectorPoint[];
}

/** Grid point → scene coordinates (house centre). */
export function gridPoint(origin: { readonly x: number; readonly y: number }, row: number, col: number): { x: number; y: number } {
  return { x: origin.x + col * SCENE_UNIT, y: origin.y + row * SCENE_UNIT };
}

const HOUSE_DROP = 32; // house anchor sits below the grid point so the house body is centred on it
const DETECTOR_DROP = 30; // pole base below the grid point so the lamp (y −44) sits ~14 above it

function house(origin: { readonly x: number; readonly y: number }, q: number, row: number, col: number): HousePoint {
  const p = gridPoint(origin, row, col);
  return { q, row, col, x: p.x, y: p.y + HOUSE_DROP };
}

function detector(origin: { readonly x: number; readonly y: number }, id: string, type: 'X' | 'Z', row: number, col: number): DetectorPoint {
  const p = gridPoint(origin, row, col);
  return { id, type, row, col, x: p.x, y: p.y + DETECTOR_DROP, lamp: { x: p.x, y: p.y + DETECTOR_DROP - 44 } };
}

const RSC3_ORIGIN = { x: 100, y: 110 } as const;

/** Check positions in row/col units (must equal fixtures/codes.json rsc3.layout.checkPositions — tested). */
export const RSC3_CHECKS: readonly { id: string; type: 'X' | 'Z'; row: number; col: number }[] = [
  { id: 'Z0', type: 'Z', row: 0.5, col: 0.5 },
  { id: 'Z1', type: 'Z', row: 1.5, col: 1.5 },
  { id: 'Z2', type: 'Z', row: -0.5, col: 1.5 },
  { id: 'Z3', type: 'Z', row: 2.5, col: 0.5 },
  { id: 'X0', type: 'X', row: 0.5, col: 1.5 },
  { id: 'X1', type: 'X', row: 1.5, col: 0.5 },
  { id: 'X2', type: 'X', row: 0.5, col: -0.5 },
  { id: 'X3', type: 'X', row: 1.5, col: 2.5 },
];

export const RSC3_SCENE: SceneLayout = {
  kind: 'rsc3',
  width: 400,
  height: 420,
  origin: RSC3_ORIGIN,
  houses: [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => house(RSC3_ORIGIN, r * 3 + c, r, c))),
  detectors: RSC3_CHECKS.map((c) => detector(RSC3_ORIGIN, c.id, c.type, c.row, c.col)),
};

const REP3_ORIGIN = { x: 100, y: 110 } as const;

export const REP3_SCENE: SceneLayout = {
  kind: 'rep3',
  width: 400,
  height: 200,
  origin: REP3_ORIGIN,
  houses: [0, 1, 2].map((c) => house(REP3_ORIGIN, c, 0, c)),
  detectors: [detector(REP3_ORIGIN, 'Z0', 'Z', 0, 0.5), detector(REP3_ORIGIN, 'Z1', 'Z', 0, 1.5)],
};

export function sceneFor(kind: 'rsc3' | 'rep3'): SceneLayout {
  return kind === 'rsc3' ? RSC3_SCENE : REP3_SCENE;
}

export interface LaneGeometry {
  readonly width: number;
  readonly height: number;
  readonly lanes: number;
  /** Lane centre y for wire i. */
  readonly laneY: (i: number) => number;
  /** Gate column x for step j of `steps`. */
  readonly stepX: (j: number, steps: number) => number;
  /** Input / output token x. */
  readonly inX: number;
  readonly outX: number;
}

export function laneGeometry(lanes: number, width = 600, height = 260): LaneGeometry {
  const pad = 60;
  const usable = height - pad * 2;
  return {
    width,
    height,
    lanes,
    laneY: (i) => (lanes === 1 ? height / 2 : pad + (usable * i) / (lanes - 1)),
    stepX: (j, steps) => 150 + ((width - 300) * (j + 0.5)) / Math.max(1, steps),
    inX: 80,
    outX: width - 80,
  };
}
