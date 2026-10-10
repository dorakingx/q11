/**
 * Frame model for the spray showpiece (no React). `computeFrame(timeline, time)` turns an EffectTimeline
 * (src/game/effects.ts, built from the engine's Debrief) plus a clock reading into one static picture: every house
 * state, the detector bits, where the truck and each firefighter are, how far each hose stream reaches, splashes
 * and the result badge. Every "after" state is read from the timeline events — never recomputed here (R7, R13).
 *
 * Readability (fog missions): a house's fog lifts the moment its hose stream starts, showing the TRUE fire the crew
 * is spraying for the whole stream; the splash lands at impact and the after-state follows. Houses nobody sprays
 * stay fogged until 'reveal-remaining'. The detectors show the true fire's alarms from the first frame and switch
 * to the residual's alarms at the 'alarms' event.
 *
 * Propagation prelude (lane boards, timelines with 'fires-start' / 'gate' / 'fires-arrive' events): `lanes` carries
 * the travelling tokens (column -1 = input, 0..steps-1 = gate columns, steps = output), the active gate cursor and
 * whether the fires have arrived. The houses stay normal until 'fires-arrive' completes, then show the final fires;
 * every later rule (spray-start, impact, reveal, outcome) is untouched. Timelines without a prelude: `lanes` = null.
 *
 * Reduced motion uses the same function on the reduced timeline (one unit of time per event): the stepper shows
 * `computeFrame(reduced, step + 1, { strict: true })`, i.e. every event up to `step` completed and nothing after.
 */
import type { CrewLetter, EffectEvent, EffectTimeline, ResultType } from '../../game';
import { PRELUDE_EVENTS } from '../../game';
import type { CrewPose, HouseState } from '../art';
import { fromString, letterAt, type Pauli, type PauliLetter } from '../../quantum';

export interface TruckFrame {
  /** 0 = off-screen start, 1 = parked. */
  readonly progress: number;
  readonly lights: boolean;
  readonly wheelFrame: 0 | 1;
}

export interface CrewFrame {
  readonly q: number;
  readonly crew: CrewLetter;
  /** 0 = at the truck, 1 = at the house spot. */
  readonly progress: number;
  readonly pose: CrewPose;
}

export interface StreamFrame {
  readonly q: number;
  readonly progress: number;
}

export interface SplashFrame {
  readonly q: number;
  readonly spread: number;
}

/** One travelling fire token on a lane board. Columns: -1 = input, 0..steps-1 = gate columns, steps = output. */
export interface LaneTokenFrame {
  readonly q: number;
  readonly letter: CrewLetter;
  readonly from: number;
  readonly to: number;
  /** 0 = at `from`, 1 = at `to`. */
  readonly progress: number;
}

export interface LaneFrame {
  /** Active gate index: -1 before the first gate, `steps` once the tokens head for (or have reached) the output. */
  readonly cursor: number;
  readonly tokens: readonly LaneTokenFrame[];
  /** The fires have reached the houses (tokens gone, houses lit). */
  readonly arrived: boolean;
}

export interface SceneFrame {
  readonly houses: readonly HouseState[];
  /** Propagation prelude state (lane boards with a non-empty circuit); null when the timeline has no prelude. */
  readonly lanes: LaneFrame | null;
  /** Alarm bits shown on the detectors; null = no stations / nothing to show (all quiet drawing). */
  readonly syndrome: readonly number[] | null;
  readonly truck: TruckFrame | null;
  readonly crews: readonly CrewFrame[];
  readonly streams: readonly StreamFrame[];
  readonly splashes: readonly SplashFrame[];
  /** Result badge (outcome event started). */
  readonly outcome: ResultType | null;
  /** Fog lifted everywhere (reveal-remaining started). */
  readonly revealed: boolean;
  /** True once the `done` event has been reached. */
  readonly done: boolean;
  /** Houses that still carry a residual component after the outcome (from the timeline's impact/reveal events). */
  readonly residualQubits: readonly number[];
  /** Index of the most recent event that has started (for captions); -1 before the first. */
  readonly currentEvent: number;
}

export interface FrameOptions {
  /** Pre-spray state of every house: fog (dispatch missions) or the propagated true fire (propagation missions). */
  readonly preState: (q: number) => HouseState;
  /** Engine residual letter at q (Debrief.residual): what still burns after every spray. */
  readonly residualAt: (q: number) => PauliLetter;
  readonly n: number;
  /** Alarm bits of the TRUE fire (Debrief.syndromeOfFires), shown until the 'alarms' event; null/omitted = quiet. */
  readonly initialSyndrome?: readonly number[] | null;
  /** `strict`: an event with t === time has NOT started (reduced-motion stepper). Default false. */
  readonly strict?: boolean;
}

/** Progress of one event at `time`: undefined = not started, otherwise 0–1 (1 = complete). */
export function eventProgress(e: EffectEvent, time: number, strict = false): number | undefined {
  if (strict ? e.t >= time : e.t > time) return undefined;
  if (e.dur <= 0) return 1;
  const p = (time - e.t) / e.dur;
  return p >= 1 ? 1 : p < 0 ? 0 : p;
}

function fireState(letter: PauliLetter): HouseState {
  return letter === 'I' ? { kind: 'normal' } : { kind: 'fire', letter };
}

/** Tokens for a pattern string with every token between the same two columns. */
function tokensOf(pattern: Pauli, from: number, to: number, progress: number): LaneTokenFrame[] {
  const out: LaneTokenFrame[] = [];
  for (let q = 0; q < pattern.n; q++) {
    const letter = letterAt(pattern, q);
    if (letter !== 'I') out.push({ q, letter, from, to, progress });
  }
  return out;
}

/** Fraction of the impact event during which the splash lands on the still-true fire before the after-state appears. */
export const IMPACT_FLASH = 0.4;

export function computeFrame(timeline: EffectTimeline, time: number, opts: FrameOptions): SceneFrame {
  const strict = opts.strict ?? false;
  const houses: HouseState[] = Array.from({ length: opts.n }, (_, q) => opts.preState(q));
  // Propagation prelude: the gate columns are the 'gate' events; `arrivedFires` is set once the tokens reach the houses.
  const steps = timeline.events.filter((e) => e.type === 'gate').length;
  const prelude = timeline.events.some((e) => PRELUDE_EVENTS.has(e.type));
  let laneCursor = -1;
  let laneTokens: LaneTokenFrame[] = [];
  let arrivedFires: Pauli | null = null;
  const touched = new Set<number>();
  const residual = new Map<number, PauliLetter>();
  const crews = new Map<number, CrewFrame>();
  const streams: StreamFrame[] = [];
  const splashes: SplashFrame[] = [];
  let truck: TruckFrame | null = null;
  let syndrome: readonly number[] | null = opts.initialSyndrome ?? null;
  let outcome: ResultType | null = null;
  let revealed = false;
  let done = false;
  let currentEvent = -1;
  const sprayDone = new Set<number>();
  const wheelFrame: 0 | 1 = Math.floor(time / 120) % 2 === 0 ? 0 : 1;
  const runFrame: CrewPose = Math.floor(time / 150) % 2 === 0 ? 'run1' : 'run2';

  timeline.events.forEach((e, index) => {
    const p = eventProgress(e, time, strict);
    if (p === undefined) return;
    currentEvent = index;
    switch (e.type) {
      case 'fires-start':
        laneCursor = -1;
        laneTokens = tokensOf(fromString(e.fires), -1, -1, p);
        break;
      case 'gate':
        laneCursor = e.index;
        if (p < e.travel) {
          // travelling from the previous column (input for the first gate) to this gate's column
          laneTokens = tokensOf(fromString(e.before), e.index - 1, e.index, e.travel <= 0 ? 1 : p / e.travel);
        } else {
          // at the gate: the pattern has switched to the engine's next frame
          laneTokens = tokensOf(fromString(e.after), e.index, e.index, 1);
        }
        break;
      case 'fires-arrive':
        laneCursor = steps;
        if (p < 1) {
          laneTokens = tokensOf(fromString(e.fires), steps - 1, steps, p);
        } else {
          laneTokens = [];
          arrivedFires = fromString(e.fires);
          for (let q = 0; q < opts.n; q++) houses[q] = fireState(q < arrivedFires.n ? letterAt(arrivedFires, q) : 'I');
        }
        break;
      case 'trucks-arrive':
        truck = { progress: p, lights: p < 1, wheelFrame: p < 1 ? wheelFrame : 0 };
        break;
      case 'crew-run':
        crews.set(e.q, { q: e.q, crew: e.crew, progress: p, pose: p < 1 ? runFrame : 'idle' });
        break;
      case 'spray-start':
        crews.set(e.q, { q: e.q, crew: e.crew, progress: 1, pose: 'spray' });
        streams.push({ q: e.q, progress: p });
        // The sprayed house drops its fog: the crew (and the player) see the true fire for the whole stream.
        touched.add(e.q);
        houses[e.q] = fireState(e.before);
        break;
      case 'impact': {
        touched.add(e.q);
        // keep the stream at full reach while the impact plays, then drop it
        const sIndex = streams.findIndex((s) => s.q === e.q);
        if (p < 1) {
          if (sIndex >= 0) streams[sIndex] = { q: e.q, progress: 1 };
          splashes.push({ q: e.q, spread: p });
        } else {
          if (sIndex >= 0) streams.splice(sIndex, 1);
          sprayDone.add(e.q);
        }
        if (p < IMPACT_FLASH) {
          houses[e.q] = fireState(e.before);
        } else if (e.effect === 'extinguished') {
          houses[e.q] = p < 1 ? { kind: 'out' } : { kind: 'restored' };
        } else {
          houses[e.q] = fireState(e.after);
        }
        if (e.after !== 'I') residual.set(e.q, e.after);
        else residual.delete(e.q);
        break;
      }
      case 'reveal-remaining':
        revealed = true;
        for (let q = 0; q < opts.n; q++) {
          if (touched.has(q)) continue;
          // Lane boards with a prelude: the untouched houses keep the fires that arrived; otherwise the pre-spray state.
          const pre: HouseState = arrivedFires !== null ? fireState(q < arrivedFires.n ? letterAt(arrivedFires, q) : 'I') : opts.preState(q);
          houses[q] = pre.kind === 'fog' ? { kind: 'normal' } : pre;
        }
        e.qs.forEach((q) => {
          const letter = opts.residualAt(q);
          houses[q] = fireState(letter);
          if (letter !== 'I') residual.set(q, letter);
        });
        break;
      case 'alarms':
        syndrome = e.syndrome;
        break;
      case 'outcome':
        outcome = e.result;
        residual.forEach((letter, q) => {
          if (letter === 'I') return;
          if (e.result === 'still-burning') houses[q] = { kind: 'residual', letter };
          else if (e.result === 'safe-pattern') houses[q] = { kind: 'ghost', letter };
          else houses[q] = { kind: 'fire', letter };
        });
        if (e.result === 'restored') touched.forEach((q) => (houses[q] = { kind: 'restored' }));
        break;
      case 'done':
        done = true;
        break;
    }
  });

  // Crews whose spray finished stand idle beside their house.
  sprayDone.forEach((q) => {
    const c = crews.get(q);
    if (c !== undefined) crews.set(q, { ...c, pose: 'idle' });
  });

  return {
    houses,
    lanes: prelude ? { cursor: laneCursor, tokens: laneTokens, arrived: arrivedFires !== null } : null,
    syndrome,
    truck,
    crews: [...crews.values()].sort((a, b) => a.q - b.q),
    streams,
    splashes,
    outcome,
    revealed,
    done,
    residualQubits: [...residual.keys()].sort((a, b) => a - b),
    currentEvent,
  };
}

/** The frame of the final state (time ≥ duration). */
export function finalFrame(timeline: EffectTimeline, opts: FrameOptions): SceneFrame {
  return computeFrame(timeline, timeline.durationMs + 1, { ...opts, strict: false });
}
