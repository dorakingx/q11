/**
 * Mission loader for the game layer. Builds the player-facing `PublicMissionView` (without the true error)
 * from the engine's mission definitions. The true error is only read inside `revealMission`, which the
 * reducer calls when the player confirms a dispatch.
 */
import missionsJson from '../../fixtures/missions.json';
import { fromString, getCode, getMission, getMissions, syndrome, syndromeToArray, type MissionDefinition } from '../quantum';
import type { CrewLetter, PublicMissionView, StarCount } from './types';
import { isCrewLetter } from './types';

export const DEFAULT_MAX_STARS: StarCount = 3;

/**
 * Optional `maxStars` (1–3) per mission in fixtures/missions.json; anything else means the default 3.
 * The engine's parser (src/quantum) ignores the field, so the game layer reads it from the raw fixture.
 */
export function missionMaxStars(id: string, raw: unknown = missionsJson): StarCount {
  if (!Array.isArray(raw)) return DEFAULT_MAX_STARS;
  for (const m of raw as unknown[]) {
    if (typeof m !== 'object' || m === null || Array.isArray(m)) continue;
    const rec = m as Record<string, unknown>;
    if (rec['id'] !== id) continue;
    const v = rec['maxStars'];
    return v === 1 || v === 2 || v === 3 ? v : DEFAULT_MAX_STARS;
  }
  return DEFAULT_MAX_STARS;
}

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
    maxStars: missionMaxStars(m.id),
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

/** Sum of every mission's maxStars: the denominator of "x of N stars" (16 with mission 6 capped at 1). */
export function maxTotalStars(): number {
  return listPublicMissions().reduce((acc, m) => acc + m.maxStars, 0);
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
