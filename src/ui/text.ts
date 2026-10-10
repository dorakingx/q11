import { fromString, getCode, letterAt, support, type CodeId } from '../quantum';
import type { Debrief, GameState, PublicMissionView } from '../game';

/** Live alarm summary text (also used as the board's aria-describedby). */
export function alarmSummary(codeId: CodeId, syndrome: readonly number[] | null): string {
  const code = getCode(codeId);
  if (code.checks.length === 0) return 'This district has no alarm stations.';
  if (syndrome === null) return 'Alarms not read yet.';
  const ringing = code.checks.filter((_, i) => (syndrome[i] ?? 0) === 1).map((c) => c.id);
  if (ringing.length === 0) return `All ${String(code.checks.length)} stations quiet.`;
  return `${String(ringing.length)} of ${String(code.checks.length)} stations ringing: ${ringing.join(', ')}.`;
}

/** "X fire on block 0" / "X fire on block 0 and Z fire on block 1" — used for lesson step labels. */
export function fireLabel(fire: string): string {
  const p = fromString(fire);
  const parts = support(p).map((q) => `${letterAt(p, q)} fire on block ${String(q)}`);
  if (parts.length === 0) return 'no fires';
  if (parts.length === 1) return parts[0] ?? '';
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1] ?? ''}`;
}

/** Ids of the stations that watch block q, in checks order: "Z0, Z1, X0, X1". */
export function watchersOf(codeId: CodeId, q: number): string[] {
  return getCode(codeId)
    .checks.filter((c) => c.qubits.includes(q))
    .map((c) => c.id);
}

const APP_NAME = 'Q11';

/** document.title per screen, e.g. "Q11 — Mission 4 · Blind Dispatch". */
export function documentTitle(state: GameState, mission: PublicMissionView | null): string {
  const missionPart = mission === null ? null : `Mission ${String(mission.index)} · ${mission.title}`;
  switch (state.screen) {
    case 'title':
      return `${APP_NAME} — Quantum Emergency Response`;
    case 'how':
      return `${APP_NAME} — How it works`;
    case 'settings':
      return `${APP_NAME} — Settings`;
    case 'missions':
      return `${APP_NAME} — Missions`;
    case 'summary':
      return `${APP_NAME} — Shift complete`;
    case 'briefing':
    case 'training':
    case 'challenge':
    case 'dispatch':
    case 'debrief':
    case 'result':
      return missionPart === null ? `${APP_NAME} — Missions` : `${APP_NAME} — ${missionPart}`;
  }
}

/** Short message for the persistent aria-live region after each screen mount. */
export function screenAnnouncement(state: GameState, mission: PublicMissionView | null, debrief: Debrief | null): string {
  const m = mission === null ? '' : `Mission ${String(mission.index)}`;
  switch (state.screen) {
    case 'title':
      return 'Q11 title screen.';
    case 'how':
      return 'How it works.';
    case 'settings':
      return 'Settings.';
    case 'missions':
      return 'Mission list.';
    case 'summary':
      return 'Shift complete: summary of every mission.';
    case 'briefing':
      return `${m} briefing.`;
    case 'training':
      return `${m} training, lesson ${String(state.lesson + 1)}${mission === null ? '' : ` of ${String(mission.training.length)}`}. Fires visible.`;
    case 'challenge':
      if (mission === null) return 'Dispatch.';
      return mission.kind === 'propagation'
        ? `${m} dispatch. Predict where the fires end up; ${String(mission.budget)} crew${mission.budget === 1 ? '' : 's'} available.`
        : `${m} dispatch. ${alarmSummary(mission.code, mission.syndrome)}`;
    case 'dispatch':
      return debrief === null ? `${m} training replay: answer check.` : `${m} training replay: answer check. ${debrief.verdictLabel}.`;
    case 'debrief':
      return debrief === null ? `${m} debrief.` : `${m} debrief. ${debrief.verdictLabel}.`;
    case 'result':
      return debrief === null ? `${m} result.` : `${m} result: ${String(debrief.score.stars)} of ${String(debrief.score.maxStars)} stars.`;
  }
}
