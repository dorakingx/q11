/**
 * City map geometry (1600 × 1000 SVG units). Districts map 1:1 to missions (ids = fixtures/missions.json ids,
 * art kinds are the scene they open). ROADS gives one path per district from the fire-station driveway so a
 * truck can travel along it with getPointAtLength; every path starts at the same point.
 */
export const CITY_W = 1600;
export const CITY_H = 1000;
/** Sky above, ground below. */
export const HORIZON_Y = 170;

export type DistrictId = 'station-row' | 'bridge' | 'lab' | 'central' | 'market' | 'old-town';

export const DISTRICT_ORDER: readonly DistrictId[] = ['station-row', 'bridge', 'lab', 'central', 'market', 'old-town'];

export type DistrictVisualState = 'locked' | 'available' | 'selected' | 'solved';

export interface Pt {
  readonly x: number;
  readonly y: number;
}

export interface DistrictBox {
  readonly id: DistrictId;
  readonly missionId: string;
  /** Bounding box (also the clickable hit area). */
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  /** Where the HTML label sits (top-centre of the box). */
  readonly label: Pt;
  /** Where the truck stops (end of its road). */
  readonly entry: Pt;
  /** Where the flag stands (clear of the buildings). */
  readonly gate: Pt;
  /** Where the roadblock stands when locked (on the road at the entrance). */
  readonly block: Pt;
  /** Where the smoke plume rises when the district is on fire. */
  readonly smoke: Pt;
}

export const STATION = { x: 80, y: 540, w: 230, h: 160, door: { x: 195, y: 700 } } as const;

/** Main avenue (horizontal) and the river (vertical) — scenery constants used by the backdrop and tests. */
export const AVENUE_Y = 720;
export const ROAD_W = 40;
export const RIVER_X = 730;
export const RIVER_W = 60;

export const DISTRICTS: readonly DistrictBox[] = [
  { id: 'station-row', missionId: 'first-alarm', x: 380, y: 520, w: 260, h: 180, label: { x: 510, y: 505 }, entry: { x: 510, y: 720 }, gate: { x: 396, y: 596 }, block: { x: 510, y: 700 }, smoke: { x: 510, y: 600 } },
  { id: 'bridge', missionId: 'red-forward-blue-backward', x: 640, y: 640, w: 180, h: 120, label: { x: 730, y: 625 }, entry: { x: 600, y: 720 }, gate: { x: 662, y: 664 }, block: { x: 628, y: 724 }, smoke: { x: 740, y: 700 } },
  { id: 'lab', missionId: 'color-switch', x: 860, y: 260, w: 240, h: 180, label: { x: 980, y: 245 }, entry: { x: 940, y: 460 }, gate: { x: 876, y: 404 }, block: { x: 940, y: 468 }, smoke: { x: 1010, y: 340 } },
  { id: 'central', missionId: 'blind-dispatch', x: 1000, y: 470, w: 300, h: 230, label: { x: 1150, y: 455 }, entry: { x: 1150, y: 720 }, gate: { x: 1016, y: 560 }, block: { x: 1150, y: 700 }, smoke: { x: 1150, y: 560 } },
  { id: 'market', missionId: 'two-kinds-of-trouble', x: 1340, y: 240, w: 240, h: 200, label: { x: 1460, y: 225 }, entry: { x: 1340, y: 460 }, gate: { x: 1344, y: 424 }, block: { x: 1340, y: 468 }, smoke: { x: 1470, y: 340 } },
  { id: 'old-town', missionId: 'silent-failure', x: 1300, y: 770, w: 260, h: 220, label: { x: 1430, y: 755 }, entry: { x: 1430, y: 720 }, gate: { x: 1312, y: 822 }, block: { x: 1430, y: 764 }, smoke: { x: 1490, y: 850 } },
];

export function districtById(id: DistrictId): DistrictBox {
  const d = DISTRICTS.find((b) => b.id === id);
  if (d === undefined) throw new Error(`unknown district ${id}`);
  return d;
}

/** Start of every truck route: the station driveway meeting the avenue. */
export const ROAD_START: Pt = { x: STATION.door.x, y: AVENUE_Y };

/** One SVG path per district from ROAD_START to the district's entry point. */
export const ROADS: Readonly<Record<DistrictId, string>> = {
  'station-row': 'M195 720 H510',
  bridge: 'M195 720 H600',
  lab: 'M195 720 H920 Q940 720 940 700 V460',
  central: 'M195 720 H1150',
  market: 'M195 720 H1320 Q1340 720 1340 700 V460',
  'old-town': 'M195 720 H1430',
};

/** The whole road network as drawn (avenue + branches + driveway); the truck routes are subsets of it. */
export const ROAD_NETWORK: readonly string[] = ['M150 720 H1560', 'M195 700 V720', 'M940 720 V440', 'M1340 720 V440'];

export const CITY_LAYOUT = {
  width: CITY_W,
  height: CITY_H,
  horizon: HORIZON_Y,
  station: STATION,
  districts: DISTRICTS,
  roads: ROADS,
  roadStart: ROAD_START,
} as const;
