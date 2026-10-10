/**
 * Scoring per docs/GAME_DESIGN.md. Never "more crews = more points", never "alarms off = success".
 *
 *  outcome  = engine verdict of residual R = C·E (success / logical-error / detectable)
 *  quality  = compare the player's crews C with the min-weight decoder's dispatch D for the same alarms:
 *               optimal  C ≡ D up to a stabilizer, no more crews than D, and the outcome is success
 *               unlucky  C ≡ D up to a stabilizer but the outcome is logical-error (the alarms could not tell)
 *               valid    success otherwise (more crews than the minimum, or a different equivalent pattern that costs more)
 *               off      anything else
 *  stars    = 3 success & optimal · 2 success & valid · 1 unlucky, or detectable with at most one wrong block · 0 otherwise
 *  "wrong blocks" = number of blocks where C differs from D (weight of C·D).
 */
import { minWeightEquivalent, multiply, weight, type Pauli, type StabilizerCode, type VerdictKind } from '../quantum';
import type { DecisionQuality, Score } from './types';

export interface ScoreInput {
  readonly code: StabilizerCode;
  readonly outcome: VerdictKind;
  /** Player's crews. */
  readonly crews: Pauli;
  /** Min-weight decoder's dispatch for the same alarms (propagation missions: the propagated fire itself). */
  readonly decoderCrews: Pauli;
}

export function decisionQuality(input: ScoreInput): DecisionQuality {
  const equivalent = minWeightEquivalent(input.code, input.crews, input.decoderCrews);
  const noCostlier = weight(input.crews) <= weight(input.decoderCrews);
  if (equivalent && noCostlier && input.outcome === 'success') return 'optimal';
  if (equivalent && input.outcome === 'logical-error') return 'unlucky';
  if (input.outcome === 'success') return 'valid';
  return 'off';
}

export function stars(quality: DecisionQuality, outcome: VerdictKind, wrongBlocks: number): 0 | 1 | 2 | 3 {
  if (outcome === 'success' && quality === 'optimal') return 3;
  if (outcome === 'success' && quality === 'valid') return 2;
  if (quality === 'unlucky') return 1;
  if (outcome === 'detectable' && wrongBlocks <= 1) return 1;
  return 0;
}

export function score(input: ScoreInput): Score {
  const quality = decisionQuality(input);
  const wrongBlocks = weight(multiply(input.crews, input.decoderCrews));
  const s = stars(quality, input.outcome, wrongBlocks);
  return {
    outcome: input.outcome,
    quality,
    stars: s,
    crewsUsed: weight(input.crews),
    minCrews: weight(input.decoderCrews),
    completed: input.outcome === 'success' || quality === 'unlucky',
  };
}

export const QUALITY_LABEL: Readonly<Record<DecisionQuality, string>> = {
  optimal: 'Optimal call',
  valid: 'Valid, but costly',
  unlucky: 'Optimal call, unlucky outcome',
  off: 'Off target',
};

export const OUTCOME_LABEL: Readonly<Record<VerdictKind, string>> = {
  success: 'Logical qubit safe',
  'logical-error': 'Silent failure — logical qubit flipped',
  detectable: 'Fires still burning',
};
