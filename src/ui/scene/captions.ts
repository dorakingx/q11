/**
 * Caption text for the spray showpiece (no React): one short line per timeline event, through i18n `spray.*`.
 * Letters are named with the shared `crew.X/Z/Y` labels so the caption never relies on colour.
 *
 * Two readers: `captionAt` is the visible caption (every event that has something to say; an impact caption is
 * one line "Splash! House 4: fire out." for the whole impact, and the timeline keeps impacts ≥ CAPTION_HOLD apart),
 * `announcementAt` is the live-region text (trucks, impacts and the outcome only, so a screen reader is not read
 * every run/spray line).
 */
import type { CrewLetter, EffectEvent, EffectTimeline } from '../../game';
import type { Translate } from '../i18n';
import type { Key } from '../i18n';
import { eventProgress } from './frame';
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
  'prediction-miss': 'result.type.predictionMiss.title',
} as const satisfies Record<string, Key>;

export const RESULT_BODY_KEY = {
  restored: 'result.type.restored.body',
  'safe-pattern': 'result.type.safePattern.body',
  'still-burning': 'result.type.stillBurning.body',
  'logical-failure': 'result.type.logicalFailure.body',
  'prediction-miss': 'result.type.predictionMiss.body',
} as const satisfies Record<string, Key>;

export interface CaptionContext {
  readonly district: string;
  /** False for bare-wire boards (no alarm stations: the alarms event says nothing). */
  readonly hasChecks: boolean;
}

/** The one-line story of an impact: what the spray did to the house. */
function impactText(t: Translate, e: Extract<EffectEvent, { type: 'impact' }>): string {
  if (e.effect === 'extinguished') return t('spray.extinguished', { q: e.q });
  if (e.effect === 'ignited') return t('spray.ignited', { q: e.q, after: letterName(t, e.after) });
  return t('spray.changed', { q: e.q, before: letterName(t, e.before), after: letterName(t, e.after) });
}

/** Caption for one event at progress p (0–1); null = this event adds no line (keep the previous caption). */
export function captionForEvent(t: Translate, e: EffectEvent, _p: number, ctx: CaptionContext): string | null {
  switch (e.type) {
    case 'trucks-arrive':
      return t('spray.trucksArrive', { district: ctx.district });
    case 'crew-run':
      return t('spray.crewRun', { crew: letterName(t, e.crew), q: e.q });
    case 'spray-start':
      return t('spray.sprayStart', { crew: letterName(t, e.crew), q: e.q });
    case 'impact':
      return `${t('spray.splash')} ${impactText(t, e)}`;
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

/** Events the live region announces: the trucks arriving, every impact and the outcome (nothing else). */
export const ANNOUNCED_EVENTS: ReadonlySet<EffectEvent['type']> = new Set<EffectEvent['type']>(['trucks-arrive', 'impact', 'outcome']);

/** The live-region text at `time`: the latest started trucks / impact / outcome event. */
export function announcementAt(t: Translate, timeline: EffectTimeline, time: number, ctx: CaptionContext, strict = false): string {
  let text = '';
  for (const e of timeline.events) {
    const p = eventProgress(e, time, strict);
    if (p === undefined) break;
    if (!ANNOUNCED_EVENTS.has(e.type)) continue;
    const c = captionForEvent(t, e, p, ctx);
    if (c !== null) text = c;
  }
  return text;
}
