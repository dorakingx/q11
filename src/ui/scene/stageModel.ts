/** Stage model helpers (no React): frame options and result decoration derived from a Debrief. */
import { fromString, letterAt, support } from '../../quantum';
import { districtForMission, getPublicMission, isCrewLetter, type CrewLetter, type Debrief, type MissionKind } from '../../game';
import type { HouseState } from '../art';
import type { FrameOptions, SceneFrame } from './frame';
import type { SceneOutcome } from './Scene';
import { letterOf } from './houseState';

export function missionKindOf(missionId: string, override: MissionKind | undefined): MissionKind {
  if (override !== undefined) return override;
  try {
    return getPublicMission(missionId).kind;
  } catch {
    return 'dispatch';
  }
}

/**
 * Frame options for a debrief: fog before the spray on dispatch missions, the propagated true fire on propagation
 * missions — or, when the timeline carries the propagation prelude (`prelude`), plain houses until the fires arrive
 * through the gates; the alarms show the true fire's syndrome from the start (codes with stations) and switch to the
 * residual's at the 'alarms' event.
 */
export function frameOptionsFor(debrief: Debrief, n: number, kind: MissionKind, prelude = false): FrameOptions {
  const fires = fromString(debrief.fires);
  const residual = fromString(debrief.residual);
  const preState = (q: number): HouseState => {
    if (kind === 'dispatch') return { kind: 'fog' };
    if (prelude) return { kind: 'normal' };
    const l = letterOf(debrief.fires, q);
    return l === 'I' ? { kind: 'normal' } : { kind: 'fire', letter: l };
  };
  return {
    n: Math.max(n, fires.n, residual.n),
    preState,
    residualAt: (q) => letterOf(debrief.residual, q),
    initialSyndrome: debrief.syndromeOfFires.length > 0 ? debrief.syndromeOfFires : null,
  };
}

/** Result decoration for the end of a spray: the chain is the engine residual's support; beacon for the old town or a logical failure. */
export function outcomeFor(debrief: Debrief, frame: SceneFrame): SceneOutcome | undefined {
  if (frame.outcome === null) return undefined;
  const hasBeacon = districtForMission(debrief.missionId)?.hasBeacon ?? false;
  return {
    result: frame.outcome,
    logicalFlip: debrief.logicalFlip,
    patternQubits: support(fromString(debrief.residual)),
    beacon: hasBeacon || frame.outcome === 'logical-failure',
  };
}

/**
 * The Why? alternative as a Debrief for the stage: the same true fires with the engine's residual / alarms / flip for
 * the alternative crews (all computed by the reducer at commit, see Debrief.alternative).
 */
export function alternativeDebrief(mine: Debrief): Debrief {
  const alt = mine.alternative;
  return { ...mine, crews: alt.crews, residual: alt.residual, syndromeOfResidual: alt.syndromeOfResidual, verdict: alt.verdict, logicalFlip: alt.logicalFlip };
}

/** Crews string → placements map (the shape the reducer's placements take). */
export function placementsFromCrews(crews: string): Record<number, CrewLetter> {
  const p = fromString(crews);
  const out: Record<number, CrewLetter> = {};
  for (let q = 0; q < p.n; q++) {
    const l = letterAt(p, q);
    if (isCrewLetter(l)) out[q] = l;
  }
  return out;
}
