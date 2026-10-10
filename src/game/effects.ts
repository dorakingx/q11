/**
 * Effect timeline for the spray showpiece. Pure presentation data derived ONLY from the engine's Debrief:
 * every per-house outcome is read from the residual the engine computed (and asserted to equal before ⊕ crew),
 * so the pictures can never disagree with the verdict. No randomness, no React, no timers.
 *
 * Timeline (ms, full motion): trucks arrive → for each crew in ascending house order: run, spray (the sprayed
 * house's fog lifts and the TRUE fire shows for the whole stream), impact → reveal fires nobody sprayed → alarms of
 * the residual → outcome → done. Impacts are spaced by `stagger` and the tail starts `hold` after the last impact
 * so every impact caption holds at least that long. Reduced motion: one frame per event.
 */
import { bitsToLetter, fromString, getCode, letterAt, letterToBits, support, weight, type PauliLetter } from '../quantum';
import { getPublicMission } from './missions';
import type { CrewLetter, Debrief } from './types';

/**
 * The readable results (R9) plus the bare-wire miss:
 *   restored         residual I — fires out, houses restored
 *   safe-pattern     non-trivial stabilizer residual — harmless pattern, logical information safe
 *   still-burning    detectable residual — a fire remains and its alarms ring
 *   logical-failure  logical error on a code with checks — alarms quiet, the memory beacon shows the flip
 *   prediction-miss  a miss on bare wires (no checks, so no alarms and no beacon): a fire is still on the wire
 */
export type ResultType = 'restored' | 'safe-pattern' | 'still-burning' | 'logical-failure' | 'prediction-miss';

/** What one spray did to one house. */
export type ImpactEffect = 'extinguished' | 'changed' | 'ignited';

export type EffectEvent =
  | { readonly type: 'trucks-arrive'; readonly t: number; readonly dur: number }
  | { readonly type: 'crew-run'; readonly t: number; readonly dur: number; readonly q: number; readonly crew: CrewLetter }
  /** The hose stream starts: the sprayed house shows its TRUE fire (`before`) from here on. */
  | { readonly type: 'spray-start'; readonly t: number; readonly dur: number; readonly q: number; readonly crew: CrewLetter; readonly before: PauliLetter }
  | {
      readonly type: 'impact';
      readonly t: number;
      readonly dur: number;
      readonly q: number;
      readonly crew: CrewLetter;
      /** Fire component at q before the spray (the propagated true fire). */
      readonly before: PauliLetter;
      /** Fire component at q after the spray = engine residual at q. */
      readonly after: PauliLetter;
      readonly effect: ImpactEffect;
    }
  /** Houses that still burn and were never sprayed (the fire nobody found). */
  | { readonly type: 'reveal-remaining'; readonly t: number; readonly dur: number; readonly qs: readonly number[] }
  | { readonly type: 'alarms'; readonly t: number; readonly dur: number; readonly syndrome: readonly number[] }
  | { readonly type: 'outcome'; readonly t: number; readonly dur: number; readonly result: ResultType }
  | { readonly type: 'done'; readonly t: number; readonly dur: 0 };

export interface EffectTimeline {
  readonly durationMs: number;
  readonly events: readonly EffectEvent[];
}

/**
 * Timing in ms. `stagger` (between crews) and `hold` (from the last impact to the reveal) are both ≥ CAPTION_HOLD so
 * each impact's caption ("House 4: fire out.") stays on screen at least that long before the next line replaces it.
 * One crew plays in ≈2.6 s, two crews in ≈3.0 s.
 */
export const EFFECT_TIMING = {
  trucks: 400,
  run: 400,
  stagger: 420,
  sprayAfterRun: 250,
  spray: 500,
  impact: 300,
  hold: 420,
  reveal: 300,
  alarms: 300,
  outcome: 400,
} as const;

/** Minimum time an impact caption is shown (ms). */
export const CAPTION_HOLD = 400;

/** Pauli product of two single-qubit letters (XOR of symplectic bits; phase dropped). */
export function xorLetters(a: PauliLetter, b: PauliLetter): PauliLetter {
  const p = letterToBits(a);
  const r = letterToBits(b);
  return bitsToLetter(p.x ^ r.x, p.z ^ r.z);
}

/** Whether the mission's code has alarm stations (unknown mission ids are treated as a code with checks). */
function hasChecks(missionId: string): boolean {
  try {
    return getCode(getPublicMission(missionId).code).checks.length > 0;
  } catch {
    return true;
  }
}

/**
 * Classify the readable results. The verdict comes from the engine (stabilizer membership), never from alarms; the
 * code is looked up through the mission id so a miss on bare wires (no checks) is a 'prediction-miss', not a
 * 'logical-failure' with a beacon.
 */
export function resultType(debrief: Pick<Debrief, 'missionId' | 'verdict' | 'residual'>): ResultType {
  switch (debrief.verdict) {
    case 'success':
      return weight(fromString(debrief.residual)) === 0 ? 'restored' : 'safe-pattern';
    case 'detectable':
      return hasChecks(debrief.missionId) ? 'still-burning' : 'prediction-miss';
    case 'logical-error':
      return hasChecks(debrief.missionId) ? 'logical-failure' : 'prediction-miss';
  }
}

function impactEffect(before: PauliLetter, after: PauliLetter): ImpactEffect {
  if (after === 'I') return 'extinguished';
  if (before === 'I') return 'ignited';
  return 'changed';
}

export type HouseOutcome =
  /** A crew sprayed this house. */
  | { readonly kind: 'sprayed'; readonly crew: CrewLetter; readonly before: PauliLetter; readonly after: PauliLetter; readonly effect: ImpactEffect }
  /** No crew, but the fire is still there. */
  | { readonly kind: 'burning'; readonly before: PauliLetter; readonly after: PauliLetter }
  /** No crew, no fire. */
  | { readonly kind: 'quiet' };

/** Per-house outcome for the result overlay; `after` is always the engine residual at q. */
export function houseOutcome(debrief: Pick<Debrief, 'fires' | 'crews' | 'residual'>, q: number): HouseOutcome {
  const fires = fromString(debrief.fires);
  const crews = fromString(debrief.crews);
  const residual = fromString(debrief.residual);
  const before = letterAt(fires, q);
  const crew = letterAt(crews, q);
  const after = letterAt(residual, q);
  if (xorLetters(before, crew) !== after) {
    throw new Error(`effects: residual at house ${String(q)} is ${after}, but ${before} ⊕ ${crew} = ${xorLetters(before, crew)}`);
  }
  if (crew !== 'I') return { kind: 'sprayed', crew, before, after, effect: impactEffect(before, after) };
  if (after !== 'I') return { kind: 'burning', before, after };
  return { kind: 'quiet' };
}

/** Houses carrying the residual (the logical pattern when the verdict is logical-error; the beacon points at these). */
export function logicalPatternSupport(debrief: Pick<Debrief, 'residual'>): readonly number[] {
  return support(fromString(debrief.residual));
}

export interface RemainingAlarm {
  /** Index in code.checks order. */
  readonly index: number;
  readonly id: string;
  readonly type: 'X' | 'Z';
  readonly qubits: readonly number[];
}

/** Detectors that still ring for the residual (empty for success and logical failure). */
export function remainingAlarms(debrief: Pick<Debrief, 'missionId' | 'syndromeOfResidual'>): readonly RemainingAlarm[] {
  const code = getCode(getPublicMission(debrief.missionId).code);
  const out: RemainingAlarm[] = [];
  code.checks.forEach((c, index) => {
    if ((debrief.syndromeOfResidual[index] ?? 0) === 1) out.push({ index, id: c.id, type: c.type, qubits: c.qubits });
  });
  return out;
}

/**
 * Build the timeline. Deterministic: same debrief ⇒ same events. Throws if the engine residual ever disagrees
 * with before ⊕ crew at some house (it cannot, but the assertion keeps the pictures honest).
 */
export function buildEffects(debrief: Debrief, reducedMotion: boolean): EffectTimeline {
  const fires = fromString(debrief.fires);
  const crews = fromString(debrief.crews);
  const residual = fromString(debrief.residual);
  if (fires.n !== crews.n || fires.n !== residual.n) throw new Error('effects: fires, crews and residual must share the qubit count');
  const T = EFFECT_TIMING;
  const events: EffectEvent[] = [{ type: 'trucks-arrive', t: 0, dur: T.trucks }];
  let cursor: number = T.trucks;
  const sprayed = support(crews);
  sprayed.forEach((q, i) => {
    const crew = letterAt(crews, q);
    if (crew === 'I') return; // unreachable: support() only lists non-identity sites
    const run = T.trucks + i * T.stagger;
    const spray = run + T.sprayAfterRun;
    const impact = spray + T.spray;
    const before = letterAt(fires, q);
    const after = letterAt(residual, q);
    if (xorLetters(before, crew) !== after) {
      throw new Error(`effects: residual at house ${String(q)} is ${after}, but ${before} ⊕ ${crew} = ${xorLetters(before, crew)}`);
    }
    events.push({ type: 'crew-run', t: run, dur: T.run, q, crew });
    events.push({ type: 'spray-start', t: spray, dur: T.spray, q, crew, before });
    events.push({ type: 'impact', t: impact, dur: T.impact, q, crew, before, after, effect: impactEffect(before, after) });
    cursor = Math.max(cursor, impact + T.hold);
  });
  const remaining = support(residual).filter((q) => letterAt(crews, q) === 'I');
  events.push({ type: 'reveal-remaining', t: cursor, dur: T.reveal, qs: remaining });
  cursor += T.reveal;
  events.push({ type: 'alarms', t: cursor, dur: T.alarms, syndrome: [...debrief.syndromeOfResidual] });
  cursor += T.alarms;
  events.push({ type: 'outcome', t: cursor, dur: T.outcome, result: resultType(debrief) });
  cursor += T.outcome;
  events.push({ type: 'done', t: cursor, dur: 0 });
  // Events are pushed in non-decreasing time order already; sort defensively by t (stable) so players can index by time.
  events.sort((a, b) => a.t - b.t);
  if (reducedMotion) {
    const frames = events.map((e, index) => (e.type === 'done' ? { ...e, t: index } : { ...e, t: index, dur: 1 }));
    return { durationMs: frames.length, events: frames };
  }
  return { durationMs: cursor, events };
}
