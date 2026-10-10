/**
 * Mission loader for the game layer. Builds the player-facing `PublicMissionView` (without the true error)
 * from the engine's mission definitions. The true error is only read inside `revealMission`, which the
 * reducer calls when the player confirms a dispatch.
 */
import { fromString, getCode, getMission, getMissions, syndrome, syndromeToArray, type MissionDefinition } from '../quantum';
import type { CrewLetter, PublicMissionView } from './types';
import { isCrewLetter } from './types';

function toPublicView(m: MissionDefinition): PublicMissionView {
  const code = getCode(m.code);
  const allowed: CrewLetter[] = m.allowed.filter(isCrewLetter);
  const synd = m.kind === 'dispatch' ? syndromeToArray(syndrome(code, fromString(m.challenge.error))) : [];
  return {
    id: m.id,
    index: m.index,
    title: m.title,
    code: m.code,
    kind: m.kind,
    allowed,
    budget: m.budget,
    briefing: m.briefing,
    circuit: m.challenge.circuit,
    syndrome: synd,
    visibleStart: m.kind === 'propagation' ? m.challenge.error : null,
    training: m.training.map((t) => ({ fire: t.error, circuit: t.circuit, caption: t.caption })),
  };
}

let cache: readonly PublicMissionView[] | undefined;

/** The six missions as the player may see them before confirming. */
export function listPublicMissions(): readonly PublicMissionView[] {
  cache ??= getMissions().map(toPublicView);
  return cache;
}

export function getPublicMission(id: string): PublicMissionView {
  const m = listPublicMissions().find((x) => x.id === id);
  if (m === undefined) throw new Error(`unknown mission '${id}'`);
  return m;
}

export function nextMissionId(id: string): string | null {
  const all = listPublicMissions();
  const i = all.findIndex((m) => m.id === id);
  const next = all[i + 1];
  return next === undefined ? null : next.id;
}

/** The engine definition INCLUDING the true error. Only the reducer's confirm path may call this. */
export function revealMission(id: string): MissionDefinition {
  return getMission(id);
}
