/**
 * Builds the ordered debrief replay from engine results:
 *   E placed → (one step per gate) → alarms → your dispatch → residual → verdict
 * Captions are derived from the engine (frames, ringing checks, residual weight), never hand-typed per mission.
 */
import {
  fromString,
  getCode,
  lookupDecoder,
  propagate,
  ringingChecks,
  support,
  syndrome,
  syndromeFromArray,
  syndromeToArray,
  toString,
  weight,
  letterAt,
  type Circuit,
  type Gate,
  type Pauli,
  type StabilizerCode,
  type Verdict,
} from '../quantum';
import type { MissionKind, ReplayStep, WhatIf } from './types';

export function describeGate(g: Gate): string {
  switch (g.kind) {
    case 'H':
      return `H on block ${String(g.q)}`;
    case 'S':
      return `S on block ${String(g.q)}`;
    case 'CNOT':
      return `CNOT from block ${String(g.c)} to block ${String(g.t)}`;
    case 'CZ':
      return `CZ between blocks ${String(g.a)} and ${String(g.b)}`;
    case 'SWAP':
      return `SWAP of blocks ${String(g.a)} and ${String(g.b)}`;
  }
}

const COLOUR: Readonly<Record<string, string>> = { X: 'red', Z: 'blue', Y: 'red-and-blue' };

/** "a red fire (X) on block 1 and a blue fire (Z) on block 7" */
export function describeFires(p: Pauli): string {
  const qs = support(p);
  if (qs.length === 0) return 'no fires';
  const parts = qs.map((q) => {
    const l = letterAt(p, q);
    return `a ${COLOUR[l] ?? ''} fire (${l}) on block ${String(q)}`;
  });
  if (parts.length === 1) return parts[0] ?? '';
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1] ?? ''}`;
}

export function describeCrews(p: Pauli): string {
  const qs = support(p);
  if (qs.length === 0) return 'no crews';
  const parts = qs.map((q) => {
    const l = letterAt(p, q);
    return `a ${COLOUR[l] ?? ''} crew (${l}) to block ${String(q)}`;
  });
  if (parts.length === 1) return parts[0] ?? '';
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1] ?? ''}`;
}

function alarmsCaption(code: StabilizerCode, s: Uint8Array): string {
  if (code.checks.length === 0) return 'This district has no alarm stations: on bare wires nothing rings, so the dispatch must come from the prediction alone.';
  const ringing = ringingChecks(code, s);
  if (ringing.length === 0) return 'Every station reads an even count and stays quiet.';
  return `Alarms: ${ringing.join(', ')} ring${ringing.length === 1 ? 's' : ''}. Each ringing station sees an odd number of fires of its colour.`;
}

function verdictCaption(v: Verdict, code: StabilizerCode): string {
  switch (v.kind) {
    case 'success':
      return weight(v.residual) === 0
        ? 'Residual is the identity: every fire is out. Logical qubit safe.'
        : `Residual ${toString(v.residual)} is a stabilizer of the code (it acts trivially on the encoded qubit). Logical qubit safe.`;
    case 'logical-error': {
      const flips: string[] = [];
      v.logicalFlip.x.forEach((f, i) => {
        if (f) flips.push(code.k === 1 ? 'logical X' : `logical X${String(i)}`);
      });
      v.logicalFlip.z.forEach((f, i) => {
        if (f) flips.push(code.k === 1 ? 'logical Z' : `logical Z${String(i)}`);
      });
      return `Residual ${toString(v.residual)} commutes with every station yet is not a stabilizer: it acts as ${flips.join(' and ')}. Silent failure.`;
    }
    case 'detectable':
      return `Residual ${toString(v.residual)} still trips ${ringingChecks(code, v.syndrome).join(', ')}. Fires are still burning.`;
  }
}

export interface ReplayInput {
  readonly kind: MissionKind;
  readonly code: StabilizerCode;
  /** True starting fire (before the circuit). */
  readonly start: Pauli;
  readonly circuit: Circuit;
  readonly crews: Pauli;
  readonly verdict: Verdict;
}

export function buildReplay(input: ReplayInput): ReplayStep[] {
  const { code, start, circuit, crews, verdict } = input;
  const traj = propagate(start, circuit);
  const steps: ReplayStep[] = [];
  const finalFire = traj.frames[traj.frames.length - 1] ?? start;
  const startStr = toString(start);
  steps.push({
    id: 'placed',
    caption: `Noise lit ${describeFires(start)}.`,
    fires: startStr,
    crews: null,
    residual: null,
    syndrome: null,
    gateCursor: -1,
    showVerdict: false,
  });
  circuit.forEach((g, i) => {
    const before = traj.frames[i] ?? start;
    const after = traj.frames[i + 1] ?? before;
    const changed = toString(before) !== toString(after);
    steps.push({
      id: `gate-${String(i)}`,
      caption: changed
        ? `${describeGate(g)}: ${toString(before)} becomes ${toString(after)}.`
        : `${describeGate(g)}: the fire pattern ${toString(before)} is unchanged.`,
      fires: toString(after),
      crews: null,
      residual: null,
      syndrome: null,
      gateCursor: i,
      showVerdict: false,
    });
  });
  const s = syndrome(code, finalFire);
  const sArr = syndromeToArray(s);
  const finalStr = toString(finalFire);
  steps.push({
    id: 'alarms',
    caption: alarmsCaption(code, s),
    fires: finalStr,
    crews: null,
    residual: null,
    syndrome: sArr,
    gateCursor: circuit.length,
    showVerdict: false,
  });
  steps.push({
    id: 'dispatch',
    caption: `Your dispatch: ${describeCrews(crews)}.`,
    fires: finalStr,
    crews: toString(crews),
    residual: null,
    syndrome: sArr,
    gateCursor: circuit.length,
    showVerdict: false,
  });
  const residualStr = toString(verdict.residual);
  steps.push({
    id: 'residual',
    caption:
      weight(verdict.residual) === 0
        ? 'Crews meet fires: every pair cancels (X·X = I, Z·Z = I, Y·Y = I). Nothing remains.'
        : `Crews meet fires (XOR): what remains is ${residualStr}, that is ${describeFires(verdict.residual)}.`,
    fires: finalStr,
    crews: toString(crews),
    residual: residualStr,
    syndrome: syndromeToArray(verdict.syndrome),
    gateCursor: circuit.length,
    showVerdict: false,
  });
  steps.push({
    id: 'verdict',
    caption: verdictCaption(verdict, code),
    fires: finalStr,
    crews: toString(crews),
    residual: residualStr,
    syndrome: syndromeToArray(verdict.syndrome),
    gateCursor: circuit.length,
    showVerdict: true,
  });
  return steps;
}

export interface WhatIfInput {
  readonly kind: MissionKind;
  readonly code: StabilizerCode;
  readonly finalFire: Pauli;
  readonly crews: Pauli;
  readonly syndrome: readonly number[];
  readonly verdict: Verdict;
  readonly equivalent: boolean;
  readonly decoderCrews: Pauli;
  readonly decoderVerdict: Verdict;
}

export function buildWhatIf(input: WhatIfInput): WhatIf {
  const { code, finalFire, crews, decoderCrews, decoderVerdict, equivalent, verdict } = input;
  const decStr = toString(decoderCrews);
  const trueCrews = toString(finalFire);
  const trueDiffers = trueCrews !== decStr;
  let explanation: string;
  if (code.checks.length === 0) {
    explanation = equivalent
      ? `The fire ended as ${trueCrews}; your crews matched it exactly, so the prediction was right.`
      : `The fire ended as ${trueCrews}. Crews ${toString(crews)} differ from it on ${String(weight(verdict.residual))} block(s); on bare wires every leftover component acts on the data.`;
  } else if (equivalent && verdict.kind === 'success') {
    explanation =
      toString(crews) === decStr
        ? `Your dispatch is exactly the minimum-weight dispatch for these alarms.`
        : `Your dispatch ${toString(crews)} and the minimum-weight dispatch ${decStr} differ by a stabilizer, so they are equivalent corrections: the code cannot tell them apart and both succeed.`;
    if (trueDiffers) {
      explanation += ` The true fires were ${trueCrews}; crews there would differ from yours by a stabilizer as well, so the code treats both dispatches as the same correction.`;
    }
  } else if (equivalent && verdict.kind === 'logical-error') {
    explanation = `The minimum-weight dispatch for these alarms is ${decStr}, and that is what you sent. The true fire was ${trueCrews}: two fires that look, to every station, exactly like one. Crews at ${toString(finalFire)} would have worked, but no alarm pattern justified them. Distance 3 means any single fire is always fixed and two fires can fool any dispatcher.`;
  } else if (verdict.kind === 'success') {
    explanation = `You succeeded with ${String(weight(crews))} crew(s); the minimum-weight dispatch ${decStr} needs ${String(weight(decoderCrews))} and its verdict is ${OUTCOME_SHORT[decoderVerdict.kind]}.`;
  } else {
    explanation = `The minimum-weight dispatch for these alarms is ${decStr} (${OUTCOME_SHORT[decoderVerdict.kind]}). Compare it with your ${toString(crews)} step by step in the replay.`;
  }
  return {
    decoderCrews: decStr,
    decoderVerdict: decoderVerdict.kind,
    equivalentToDecoder: equivalent,
    explanation,
    trueFireCrews: trueDiffers ? trueCrews : null,
  };
}

const OUTCOME_SHORT: Readonly<Record<Verdict['kind'], string>> = {
  success: 'success',
  'logical-error': 'silent failure',
  detectable: 'fires still burning',
};

/** Convenience used by tests: decoder dispatch for a public syndrome. */
export function decoderDispatch(codeId: Parameters<typeof getCode>[0], synd: readonly number[]): Pauli {
  const code = getCode(codeId);
  return lookupDecoder(code).decode(syndromeFromArray(synd));
}

export { fromString as pauliFromString };
