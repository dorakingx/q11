/**
 * Caption text for the spray showpiece (no React): one short line per timeline event, through i18n `spray.*`.
 * Letters are named with the shared `crew.X/Z/Y` labels so the caption never relies on colour.
 *
 * Two readers: `captionAt` is the visible caption (every event that has something to say; an impact caption is
 * one line "Splash! House 4: fire out." for the whole impact, and the timeline keeps impacts ≥ CAPTION_HOLD apart),
 * `announcementAt` is the live-region text (trucks, the fires' arrival, impacts and the outcome only, so a screen
 * reader is not read every run/spray/gate line).
 *
 * Propagation prelude: 'fires-start' lists the start fires, each 'gate' names the rule that fired (derived from the
 * engine letters in `before`: an X part on the CNOT control copies forward, a Z part on the target copies backward;
 * H swaps red and blue; S adds a blue part to red), 'fires-arrive' lists the fires that reached the houses.
 * The narration never leads the picture: a gate's line appears only once the tokens have switched to `after`
 * (p ≥ travel, the same instant frame.ts switches them) and the arrival line only once the houses are lit (p = 1);
 * until then the previous line stays (null). The timeline holds the arrival for EFFECT_TIMING.arriveHold before the
 * trucks' line replaces it.
 */
import type { CrewLetter, EffectEvent, EffectTimeline } from '../../game';
import type { Translate } from '../i18n';
import type { Key } from '../i18n';
import { eventProgress } from './frame';
import { fromString, letterAt, support, type Gate, type Pauli, type PauliLetter } from '../../quantum';

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

/** "red (X) fire on house 0 and blue (Z) fire on house 1" (letters through crew.X/Z/Y, never colour alone). */
export function fireList(t: Translate, pattern: Pauli): string {
  const parts = support(pattern).map((q) => t('fire.onHouse', { letter: letterName(t, letterAt(pattern, q)), q }));
  return joinList(t, parts);
}

/** Joins "a", "b", "c" as "a, b and c" through the spray.list.* keys (JA: "a、b と c"). */
export function joinList(t: Translate, parts: readonly string[]): string {
  if (parts.length === 0) return '';
  let acc = parts[0] ?? '';
  for (let i = 1; i < parts.length; i++) {
    const b = parts[i] ?? '';
    acc = i === parts.length - 1 ? t('spray.list.and', { a: acc, b }) : t('spray.list.comma', { a: acc, b });
  }
  return acc;
}

function hasX(l: PauliLetter): boolean {
  return l === 'X' || l === 'Y';
}

function hasZ(l: PauliLetter): boolean {
  return l === 'Z' || l === 'Y';
}

function gateName(t: Translate, g: Gate): string {
  switch (g.kind) {
    case 'H':
      return t('spray.gateName.h', { q: g.q });
    case 'S':
      return t('spray.gateName.s', { q: g.q });
    case 'CNOT':
      return t('spray.gateName.cnot', { c: g.c, t: g.t });
    case 'CZ':
      return t('spray.gateName.cz', { a: g.a, b: g.b });
    case 'SWAP':
      return t('spray.gateName.swap', { a: g.a, b: g.b });
  }
}

/** The one-line story of a gate: which propagation rule fired, read from the engine letters before the gate. */
export function gateText(t: Translate, e: Extract<EffectEvent, { type: 'gate' }>): string {
  const before = fromString(e.before);
  const red = t('crew.X');
  const blue = t('crew.Z');
  const g = e.gate;
  switch (g.kind) {
    case 'CNOT': {
      const forward = hasX(letterAt(before, g.c));
      const backward = hasZ(letterAt(before, g.t));
      if (forward && backward) return t('spray.gate.cnotBoth', { red, blue, c: g.c, t: g.t });
      if (forward) return t('spray.gate.cnotForward', { red, t: g.t });
      if (backward) return t('spray.gate.cnotBackward', { blue, c: g.c });
      return t('spray.gate.cnotNone');
    }
    case 'H':
      return e.changed ? t('spray.gate.h', { q: g.q, red, blue }) : t('spray.gate.hNone', { q: g.q });
    case 'S': {
      const l = letterAt(before, g.q);
      if (l === 'X') return t('spray.gate.s', { q: g.q, red, blue });
      if (l === 'Y') return t('spray.gate.sDrop', { q: g.q, mixed: t('crew.Y'), blue });
      return t('spray.gate.sNone', { q: g.q });
    }
    case 'CZ':
    case 'SWAP':
      return e.changed ? t('spray.gate.generic', { gate: gateName(t, g), before: e.before, after: e.after }) : t('spray.gate.genericNone', { gate: gateName(t, g), before: e.before });
  }
}

/**
 * Caption for one event at progress p (0–1); null = this event adds no line (keep the previous caption).
 * Prelude events speak only once the picture has changed: a gate from p ≥ travel (tokens switched), the arrival at p = 1
 * (houses lit) — the same thresholds computeFrame uses.
 */
export function captionForEvent(t: Translate, e: EffectEvent, p: number, ctx: CaptionContext): string | null {
  switch (e.type) {
    case 'fires-start': {
      const fires = fromString(e.fires);
      return support(fires).length > 0 ? t('spray.firesStart', { list: fireList(t, fires) }) : t('spray.firesStart.none');
    }
    case 'gate':
      // Still travelling to the gate column: the tokens carry `before`, so the previous line stays.
      return p < e.travel ? null : gateText(t, e);
    case 'fires-arrive': {
      // Still travelling to the output: the houses are plain until p = 1.
      if (p < 1) return null;
      const fires = fromString(e.fires);
      return support(fires).length > 0 ? t('spray.firesArrive', { list: fireList(t, fires) }) : t('spray.firesArrive.none');
    }
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

/** Events the live region announces: the fires reaching the houses, the trucks arriving, every impact and the outcome (nothing else). */
export const ANNOUNCED_EVENTS: ReadonlySet<EffectEvent['type']> = new Set<EffectEvent['type']>(['fires-arrive', 'trucks-arrive', 'impact', 'outcome']);

/** The live-region text at `time`: the latest started fires-arrive / trucks / impact / outcome event. */
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
