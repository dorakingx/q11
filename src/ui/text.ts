/**
 * Localised text helpers for the UI layer (no React): alarm summaries, fire labels, document titles, the announcer
 * message per screen and the key maps for the English labels generated inside src/game (scoring / verdicts).
 * Every function takes a bound `t` (useT() or translator(lang)) so the same helper serves React and tests.
 */
import { fromString, getCode, letterAt, support, type CodeId } from '../quantum';
import type { CrewLetter, Debrief, DecisionQuality, GameState, PublicMissionView, Score, VerdictKind } from '../game';
import type { Key, Translate } from './i18n';

export const CREW_KEY: Readonly<Record<CrewLetter, Key>> = { X: 'crew.X', Z: 'crew.Z', Y: 'crew.Y' };
export const CREW_NAME_KEY: Readonly<Record<CrewLetter, Key>> = { X: 'crew.name.X', Z: 'crew.name.Z', Y: 'crew.name.Y' };
export const PUTS_OUT_KEY: Readonly<Record<CrewLetter, Key>> = { X: 'palette.putsOut.X', Z: 'palette.putsOut.Z', Y: 'palette.putsOut.Y' };

/** Decision quality (src/game/scoring QUALITY_LABEL, English) → result.quality.* keys. */
export const QUALITY_KEY: Readonly<Record<DecisionQuality, Key>> = {
  optimal: 'result.quality.optimal',
  valid: 'result.quality.valid',
  unlucky: 'result.quality.unlucky',
  lucky: 'result.quality.lucky',
  off: 'result.quality.off',
};

/** Verdict (src/game/scoring OUTCOME_LABEL / PROPAGATION_MISS_LABEL) → result.outcome.* keys. */
export function outcomeKey(kind: VerdictKind, hasChecks: boolean): Key {
  if (kind === 'success') return 'result.outcome.success';
  if (kind === 'detectable') return 'result.outcome.detectable';
  return hasChecks ? 'result.outcome.logicalError' : 'result.outcome.propagationMiss';
}

/**
 * Result buttons (dispatch overlay, Why? footer, result screen): a completed mission moves on ("Next district",
 * "Summary" after the old town, "Back to the city" in the guided first run); a failed one keeps "Try again" as the
 * primary action and offers the city as a ghost button. NEXT_MISSION itself always returns to the city (reducer).
 */
export function resultActions(t: Translate, debrief: Pick<Debrief, 'score'>, isLast: boolean, tutorialActive: boolean): { readonly nextLabel: string; readonly primary: 'next' | 'retry' } {
  const completed = debrief.score.completed;
  if (tutorialActive) return { nextLabel: t('result.city'), primary: completed ? 'next' : 'retry' };
  if (!completed) return { nextLabel: t('result.city'), primary: 'retry' };
  return { nextLabel: isLast ? t('result.summary') : t('result.next'), primary: 'next' };
}

/** Mirrors src/game/scoring resultHeading (kept in English there) as result.heading.* keys. */
export function resultHeadingKey(score: Score): Key {
  if (score.stars === 3) return 'result.heading.flawless';
  if (score.stars === 2) return 'result.heading.firesOut';
  if (score.quality === 'unlucky') return 'result.heading.unlucky';
  if (score.quality === 'lucky') return 'result.heading.lucky';
  if (score.stars === 1) return 'result.heading.close';
  if (score.outcome === 'detectable' && score.crewsUsed === 0) return 'result.heading.stoodDown';
  return 'result.heading.off';
}

const BADGE_KEY: Readonly<Record<string, Key>> = {
  'first-alarm': 'city.badgeName.firstAlarm',
  'red-forward-blue-backward': 'city.badgeName.redForwardBlueBackward',
  'color-switch': 'city.badgeName.colorSwitch',
  'blind-dispatch': 'city.badgeName.blindDispatch',
  'two-kinds-of-trouble': 'city.badgeName.twoKindsOfTrouble',
  'silent-failure': 'city.badgeName.silentFailure',
};

/** Chapter badge name key for a mission (the city module has its own copy in src/ui/city/geometry.ts). */
export function badgeNameKey(missionId: string): Key {
  return BADGE_KEY[missionId] ?? 'city.badges';
}

export const CODE_KEY: Readonly<Record<string, Key>> = {
  rep3: 'mission.code.rep3',
  rsc3: 'mission.code.rsc3',
  trivial2: 'mission.code.trivial2',
  trivial3: 'mission.code.trivial3',
};

export const STEP_TITLE_KEY: Readonly<Record<string, Key>> = {
  placed: 'debrief.stepTitle.placed',
  gate: 'debrief.stepTitle.gate',
  alarms: 'debrief.stepTitle.alarms',
  dispatch: 'debrief.stepTitle.dispatch',
  residual: 'debrief.stepTitle.residual',
  verdict: 'debrief.stepTitle.verdict',
};

export function stepTitle(t: Translate, stepId: string): string {
  const key = STEP_TITLE_KEY[stepId.startsWith('gate-') ? 'gate' : stepId];
  return key === undefined ? stepId : t(key);
}

/** Live alarm summary text (also the board's aria-describedby). */
export function alarmSummary(t: Translate, codeId: CodeId, syndrome: readonly number[] | null): string {
  const code = getCode(codeId);
  if (code.checks.length === 0) return t('alarms.summary.none');
  if (syndrome === null) return t('alarms.summary.notRead');
  const ringing = code.checks.filter((_, i) => (syndrome[i] ?? 0) === 1).map((c) => c.id);
  if (ringing.length === 0) return t('alarms.summary.allQuiet', { n: code.checks.length });
  return t('alarms.summary.ringing', { ringing: ringing.length, total: code.checks.length, list: ringing.join(', ') });
}

/**
 * "X fire on house 0" / "X fire on house 0, Z fire on house 1 and Y fire on house 2" — lesson step labels. The list is
 * joined through the spray.list.* templates so each language gets its own separators (EN ", " / " and ", JA "、" / " と ").
 */
export function fireLabel(t: Translate, fire: string): string {
  const p = fromString(fire);
  const parts = support(p).map((q) => t('fire.onHouse', { letter: letterAt(p, q), q }));
  if (parts.length === 0) return t('fire.none');
  let acc = parts[0] ?? '';
  for (let i = 1; i < parts.length; i++) {
    const b = parts[i] ?? '';
    acc = i === parts.length - 1 ? t('spray.list.and', { a: acc, b }) : t('spray.list.comma', { a: acc, b });
  }
  return acc;
}

/** Ids of the stations that watch house q, in checks order: "Z0, Z1, X0, X1". */
export function watchersOf(codeId: CodeId, q: number): string[] {
  return getCode(codeId)
    .checks.filter((c) => c.qubits.includes(q))
    .map((c) => c.id);
}

/** document.title per screen, e.g. "Q11 Emergency — Mission 4 · Blind Dispatch". */
export function documentTitle(t: Translate, state: GameState, mission: PublicMissionView | null): string {
  const app = t('app.name');
  switch (state.screen) {
    case 'title':
      return t('doc.title', { app });
    case 'how':
      return t('doc.how', { app });
    case 'settings':
      return t('doc.settings', { app });
    case 'missions':
      return t('doc.city', { app });
    case 'summary':
      return t('doc.summary', { app });
    case 'briefing':
    case 'training':
    case 'challenge':
    case 'dispatch':
    case 'debrief':
    case 'result':
      return mission === null ? t('doc.city', { app }) : t('doc.mission', { app, n: mission.index, title: mission.title });
  }
}

/** Short message for the persistent aria-live region after each screen mount (and when the spray finishes). */
export function screenAnnouncement(t: Translate, state: GameState, mission: PublicMissionView | null, debrief: Debrief | null): string {
  const n = mission?.index ?? 0;
  const hasChecks = mission !== null && getCode(mission.code).checks.length > 0;
  const verdict = debrief === null ? '' : t(outcomeKey(debrief.verdict, hasChecks));
  switch (state.screen) {
    case 'title':
      return t('a11y.screen.title');
    case 'how':
      return t('a11y.screen.how');
    case 'settings':
      return t('a11y.screen.settings');
    case 'missions':
      return t('a11y.screen.city');
    case 'summary':
      return t('a11y.screen.summary');
    case 'briefing':
      return t('a11y.screen.briefing', { n });
    case 'training':
      return t('a11y.screen.training', { n, lesson: state.lesson + 1, total: mission?.training.length ?? 1 });
    case 'challenge':
      if (mission === null) return t('a11y.screen.challenge.plain');
      return mission.kind === 'propagation'
        ? t('a11y.screen.challenge.predict', { n, crews: mission.budget === 1 ? t('a11y.crews.one') : t('a11y.crews.other', { n: mission.budget }) })
        : t('a11y.screen.challenge.alarms', { n, summary: alarmSummary(t, mission.code, mission.syndrome) });
    case 'dispatch':
      return debrief === null || !state.dispatchDone ? t('a11y.screen.dispatch', { n }) : t('a11y.screen.dispatch.verdict', { n, verdict });
    case 'debrief':
      return debrief === null ? t('a11y.screen.debrief', { n }) : t('a11y.screen.debrief.verdict', { n, verdict });
    case 'result':
      return debrief === null ? t('a11y.screen.result', { n }) : t('a11y.screen.result.stars', { n, stars: debrief.score.stars, max: debrief.score.maxStars });
  }
}
