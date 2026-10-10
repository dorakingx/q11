/**
 * Caption text for the spray showpiece (no React): one short line per timeline event, through i18n `spray.*`.
 * Letters are named with the shared `crew.X/Z/Y` labels so the caption never relies on colour.
 */
import type { CrewLetter, EffectEvent, EffectTimeline } from '../../game';
import type { Translate } from '../i18n';
import type { Key } from '../i18n';
import { eventProgress, IMPACT_FLASH } from './frame';
import type { PauliLetter } from '../../quantum';

const CREW_KEY: Readonly<Record<CrewLetter, Key>> = { X: 'crew.X', Z: 'crew.Z', Y: 'crew.Y' };

function letterName(t: Translate, l: PauliLetter): string {
  return l === 'I' ? '' : t(CREW_KEY[l]);
}

export const RESULT_TITLE_KEY = {
  restored: 'result.type.restored.title',
  'safe-pattern': 'result.type.safePattern.title',
  'still-burning': 'result.type.stillBurning.title',
  'logical-failure': 'result.type.logicalFailure.title',
} as const satisfies Record<string, Key>;

export const RESULT_BODY_KEY = {
  restored: 'result.type.restored.body',
  'safe-pattern': 'result.type.safePattern.body',
  'still-burning': 'result.type.stillBurning.body',
  'logical-failure': 'result.type.logicalFailure.body',
} as const satisfies Record<string, Key>;

export interface CaptionContext {
  readonly district: string;
  /** False for bare-wire boards (no alarm stations: the alarms event says nothing). */
  readonly hasChecks: boolean;
}

/** Caption for one event at progress p (0–1); null = this event adds no line (keep the previous caption). */
export function captionForEvent(t: Translate, e: EffectEvent, p: number, ctx: CaptionContext): string | null {
  switch (e.type) {
    case 'trucks-arrive':
      return t('spray.trucksArrive', { district: ctx.district });
    case 'crew-run':
      return t('spray.crewRun', { crew: letterName(t, e.crew), q: e.q });
    case 'spray-start':
      return t('spray.sprayStart', { crew: letterName(t, e.crew), q: e.q });
    case 'impact':
      if (p < IMPACT_FLASH) return t('spray.splash');
      if (e.effect === 'extinguished') return t('spray.extinguished', { q: e.q });
      if (e.effect === 'ignited') return t('spray.ignited', { q: e.q, after: letterName(t, e.after) });
      return t('spray.changed', { q: e.q, before: letterName(t, e.before), after: letterName(t, e.after) });
    case 'reveal-remaining':
      return e.qs.length > 0 ? t('spray.revealRemaining') : null;
    case 'alarms':
      return ctx.hasChecks ? t('spray.alarms') : null;
    case 'outcome':
      return t(RESULT_TITLE_KEY[e.result]);
    case 'done':
      return t('spray.done');
  }
}

/** The caption shown at `time`: the latest started event that has something to say. */
export function captionAt(t: Translate, timeline: EffectTimeline, time: number, ctx: CaptionContext, strict = false): string {
  let text = '';
  for (const e of timeline.events) {
    const p = eventProgress(e, time, strict);
    if (p === undefined) break;
    const c = captionForEvent(t, e, p, ctx);
    if (c !== null) text = c;
  }
  return text;
}
