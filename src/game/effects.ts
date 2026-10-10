/**
 * Effect timeline for the spray showpiece. Pure presentation data derived ONLY from the engine's Debrief:
 * every per-house outcome is read from the residual the engine computed (and asserted to equal before ⊕ crew),
 * so the pictures can never disagree with the verdict. No randomness, no React, no timers.
 *
 * Timeline (ms, full motion): [propagation prelude] → trucks arrive → for each crew in ascending house order: run,
 * spray (the sprayed house's fog lifts and the TRUE fire shows for the whole stream), impact → reveal fires nobody
 * sprayed → alarms of the residual → outcome → done. Impacts are spaced by `stagger` and the tail starts `hold` after
 * the last impact so every impact caption holds at least that long. Reduced motion: one frame per event.
 *
 * Propagation prelude (missions with a non-empty circuit, i.e. the lane boards): BEFORE the trucks the public start
 * fires appear at the lane input ('fires-start'), travel through every gate in order ('gate' — the pattern switches
 * from `before` to `after` exactly as the engine's propagate() frames say) and reach the output houses
 * ('fires-arrive', whose fires equal Debrief.fires). The lit houses then hold for `arriveHold` (the arrival caption
 * stays readable) before the trucks start. It plays only in the answer check, never during planning.
 */
import { bitsToLetter, fromString, getCode, letterAt, letterToBits, propagate, support, toString, weight, type Circuit, type Gate, type PauliLetter } from '../quantum';
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
  /** Prelude: the public start fires (`fires` = Debrief.startFires) appear as tokens at the lane input. */
  | { readonly type: 'fires-start'; readonly t: number; readonly dur: number; readonly fires: string }
  /**
   * Prelude: the tokens travel from the previous column (the input for index 0) to gate column `index` during the
   * first `travel` fraction of `dur`; the gate highlights and at `travel` the pattern switches from `before` to
   * `after` (both from the engine's propagate() frames: before = frames[index], after = frames[index + 1]).
   */
  | {
      readonly type: 'gate';
      readonly t: number;
      readonly dur: number;
      readonly index: number;
      readonly gate: Gate;
      readonly before: string;
      readonly after: string;
      readonly changed: boolean;
      readonly travel: number;
    }
  /** Prelude: the tokens travel from the last gate column to the output; at completion the houses show `fires` (= Debrief.fires). */
  | { readonly type: 'fires-arrive'; readonly t: number; readonly dur: number; readonly fires: string }
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
  /** Prelude: the start tokens appear. */
  firesStart: 450,
  /** Prelude: one gate (travel to the column, then the pattern switch). */
  gate: 750,
  /** Prelude: the tokens reach the output houses. */
  arrive: 450,
  /**
   * Prelude: the fires sit in the houses (with the "fires reach the houses" line) before the trucks start. Without
   * it the trucks' caption would replace the arrival line the instant it appears. ≥ CAPTION_HOLD.
   */
  arriveHold: 500,
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

/** Fraction of a 'gate' event spent travelling to the gate column before the pattern switches. */
export const GATE_TRAVEL = 0.55;

/** The prelude event types (lane boards only). */
export const PRELUDE_EVENTS: ReadonlySet<EffectEvent['type']> = new Set<EffectEvent['type']>(['fires-start', 'gate', 'fires-arrive']);

/** Whether a timeline starts with the propagation prelude (fires travelling through the gates before the trucks). */
export function hasPrelude(timeline: EffectTimeline): boolean {
  return timeline.events.some((e) => PRELUDE_EVENTS.has(e.type));
}

export interface EffectOptions {
  /** Circuit to propagate the start fires through (default: the mission's public circuit; unknown mission id → none). */
  readonly circuit?: Circuit;
  /** `false` leaves the prelude out even when the circuit is non-empty (the Why? comparison is about the sprays). */
  readonly propagation?: boolean;
}

/** The mission's public circuit, or [] when the debrief's id is not a mission (synthetic debriefs). */
function circuitFor(debrief: Pick<Debrief, 'missionId'>, opts: EffectOptions): Circuit {
  if (opts.circuit !== undefined) return opts.circuit;
  try {
    return getPublicMission(debrief.missionId).circuit;
  } catch {
    return [];
  }
}

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
 * The propagation prelude for a non-empty circuit: start tokens → one event per gate → arrival → hold. Every pattern
 * comes from the engine's propagate() frames; the last frame must equal Debrief.fires (else the pictures would lie).
 * `end` (where the trucks start) includes the hold after the arrival.
 */
function preludeEvents(debrief: Pick<Debrief, 'fires' | 'startFires'>, circuit: Circuit): { readonly events: EffectEvent[]; readonly end: number } {
  const T = EFFECT_TIMING;
  const start = fromString(debrief.startFires);
  const traj = propagate(start, circuit);
  const last = traj.frames[traj.frames.length - 1];
  if (last === undefined || toString(last) !== debrief.fires) {
    throw new Error(`effects: propagating ${debrief.startFires} through the circuit gives ${last === undefined ? '?' : toString(last)}, but the debrief says ${debrief.fires}`);
  }
  const events: EffectEvent[] = [{ type: 'fires-start', t: 0, dur: T.firesStart, fires: debrief.startFires }];
  let t: number = T.firesStart;
  circuit.forEach((gate, index) => {
    const before = traj.frames[index];
    const after = traj.frames[index + 1];
    if (before === undefined || after === undefined) throw new Error(`effects: propagate() returned no frame for gate ${String(index)}`);
    const b = toString(before);
    const a = toString(after);
    events.push({ type: 'gate', t, dur: T.gate, index, gate, before: b, after: a, changed: a !== b, travel: GATE_TRAVEL });
    t += T.gate;
  });
  events.push({ type: 'fires-arrive', t, dur: T.arrive, fires: debrief.fires });
  return { events, end: t + T.arrive + T.arriveHold };
}

/**
 * Build the timeline. Deterministic: same debrief ⇒ same events. Throws if the engine residual ever disagrees
 * with before ⊕ crew at some house (it cannot, but the assertion keeps the pictures honest), or if the prelude's
 * propagated fires differ from Debrief.fires.
 */
export function buildEffects(debrief: Debrief, reducedMotion: boolean, opts: EffectOptions = {}): EffectTimeline {
  const fires = fromString(debrief.fires);
  const crews = fromString(debrief.crews);
  const residual = fromString(debrief.residual);
  if (fires.n !== crews.n || fires.n !== residual.n) throw new Error('effects: fires, crews and residual must share the qubit count');
  const T = EFFECT_TIMING;
  const circuit = opts.propagation === false ? [] : circuitFor(debrief, opts);
  const prelude = circuit.length > 0 ? preludeEvents(debrief, circuit) : { events: [], end: 0 };
  const offset = prelude.end;
  const events: EffectEvent[] = [...prelude.events, { type: 'trucks-arrive', t: offset, dur: T.trucks }];
  let cursor: number = offset + T.trucks;
  const sprayed = support(crews);
  sprayed.forEach((q, i) => {
    const crew = letterAt(crews, q);
    if (crew === 'I') return; // unreachable: support() only lists non-identity sites
    const run = offset + T.trucks + i * T.stagger;
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
