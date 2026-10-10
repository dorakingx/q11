/**
 * The city: six districts, one per mission, in play order. Pure data + status rules (no React, no art).
 * Districts unlock in order; solved ones stay replayable; `freeRoam` (judges / review) opens every district.
 */
import { listPublicMissions } from './missions';
import type { MissionProgress } from './types';

/** Art kind of a district (how the scene / city tile is drawn). */
export type DistrictKind = 'houses-row' | 'bridge' | 'lab' | 'grid';

export type DistrictStatus = 'locked' | 'available' | 'solved';

export interface District {
  readonly id: string;
  readonly missionId: string;
  readonly kind: DistrictKind;
  /** The memory beacon (logical X/Z anomaly indicator) exists in this district; shown only at result time. */
  readonly hasBeacon: boolean;
}

/** Ordered: the first district is the guided first run; each unlocks the next. */
export const DISTRICTS: readonly District[] = [
  { id: 'station-row', missionId: 'first-alarm', kind: 'houses-row', hasBeacon: false },
  { id: 'bridge', missionId: 'red-forward-blue-backward', kind: 'bridge', hasBeacon: false },
  { id: 'lab', missionId: 'color-switch', kind: 'lab', hasBeacon: false },
  { id: 'central', missionId: 'blind-dispatch', kind: 'grid', hasBeacon: false },
  { id: 'market', missionId: 'two-kinds-of-trouble', kind: 'grid', hasBeacon: false },
  { id: 'old-town', missionId: 'silent-failure', kind: 'grid', hasBeacon: true },
];

export function getDistrict(id: string): District {
  const d = DISTRICTS.find((x) => x.id === id);
  if (d === undefined) throw new Error(`unknown district '${id}'`);
  return d;
}

export function districtForMission(missionId: string): District | undefined {
  return DISTRICTS.find((d) => d.missionId === missionId);
}

function solved(d: District, progress: Readonly<Record<string, MissionProgress>>): boolean {
  return progress[d.missionId]?.completed === true;
}

/**
 * solved     the mission is completed (success, or the optimal-but-unlucky call of Silent Failure)
 * available  every earlier district is solved (so the first unsolved district in order), or freeRoam is on
 * locked     otherwise
 */
export function districtStatus(id: string, progress: Readonly<Record<string, MissionProgress>>, freeRoam: boolean): DistrictStatus {
  const index = DISTRICTS.findIndex((d) => d.id === id);
  if (index < 0) throw new Error(`unknown district '${id}'`);
  const d = DISTRICTS[index];
  if (d === undefined) throw new Error(`unknown district '${id}'`);
  if (solved(d, progress)) return 'solved';
  if (freeRoam) return 'available';
  const allPreviousSolved = DISTRICTS.slice(0, index).every((prev) => solved(prev, progress));
  return allPreviousSolved ? 'available' : 'locked';
}

/** Status of the district that hosts a mission (undefined for an unknown mission id). */
export function missionStatus(missionId: string, progress: Readonly<Record<string, MissionProgress>>, freeRoam: boolean): DistrictStatus | undefined {
  const d = districtForMission(missionId);
  return d === undefined ? undefined : districtStatus(d.id, progress, freeRoam);
}

/** The first unsolved district in order (null when every district is solved). */
export function firstAvailable(progress: Readonly<Record<string, MissionProgress>>): District | null {
  return DISTRICTS.find((d) => !solved(d, progress)) ?? null;
}

/** Number of solved districts (chapter badges / city restoration). */
export function solvedCount(progress: Readonly<Record<string, MissionProgress>>): number {
  return DISTRICTS.filter((d) => solved(d, progress)).length;
}

/** Sanity: every mission has exactly one district, in mission order. Used by tests. */
export function districtsMatchMissions(): boolean {
  const missions = listPublicMissions();
  if (missions.length !== DISTRICTS.length) return false;
  return missions.every((m, i) => DISTRICTS[i]?.missionId === m.id);
}
