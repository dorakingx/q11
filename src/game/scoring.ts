/**
 * Scoring per docs/GAME_DESIGN.md. Never "more crews = more points", never "alarms off = success".
 *
 *  outcome  = engine verdict of residual R = C·E (success / logical-error / detectable)
 *  quality  = compare the player's crews C with the min-weight decoder's dispatch D for the same alarms:
 *               optimal  C ≡ D up to a stabilizer, no more crews than D, and the outcome is success
 *               unlucky  C ≡ D up to a stabilizer but the outcome is logical-error (the alarms could not tell)
 *               lucky    success on a mission with maxStars 1 (the alarms could not justify it) and C ≢ D
 *               valid    success otherwise (more crews than the minimum, or a different equivalent pattern that costs more)
 *               off      anything else
 *  stars    = 3 success & optimal · 2 success & valid · 1 unlucky or lucky, or detectable with at most one wrong
 *             block AND at least one crew placed (standing down with fires present = 0) · 0 otherwise,
 *             then capped at the mission's maxStars (default 3; mission 6 declares 1).
 *  "wrong blocks" = number of blocks where C differs from D (weight of C·D).
 */
import { minWeightEquivalent, multiply, weight, type Pauli, type StabilizerCode, type VerdictKind } from '../quantum';
import type { DecisionQuality, Score, StarCount } from './types';

export interface ScoreInput {
  readonly code: StabilizerCode;
  readonly outcome: VerdictKind;
  /** Player's crews. */
  readonly crews: Pauli;
  /** Min-weight decoder's dispatch for the same alarms (propagation missions: the propagated fire itself). */
  readonly decoderCrews: Pauli;
  /** Highest rating the mission can award (default 3). */
  readonly maxStars?: StarCount;
}

export function decisionQuality(input: ScoreInput): DecisionQuality {
  const equivalent = minWeightEquivalent(input.code, input.crews, input.decoderCrews);
  const noCostlier = weight(input.crews) <= weight(input.decoderCrews);
  const maxStars = input.maxStars ?? 3;
  if (equivalent && noCostlier && input.outcome === 'success') return 'optimal';
  if (equivalent && input.outcome === 'logical-error') return 'unlucky';
  if (input.outcome === 'success' && maxStars <= 1 && !equivalent) return 'lucky';
  if (input.outcome === 'success') return 'valid';
  return 'off';
}

export interface StarsInput {
  readonly quality: DecisionQuality;
  readonly outcome: VerdictKind;
  /** Blocks where the player's crews differ from the decoder's dispatch. */
  readonly wrongBlocks: number;
  /** Number of crews the player placed. */
  readonly crewsUsed: number;
  readonly maxStars?: StarCount;
}

export function stars({ quality, outcome, wrongBlocks, crewsUsed, maxStars = 3 }: StarsInput): StarCount {
  let s: StarCount = 0;
  if (outcome === 'success' && quality === 'optimal') s = 3;
  else if (outcome === 'success' && quality === 'valid') s = 2;
  else if (quality === 'unlucky' || quality === 'lucky') s = 1;
  else if (outcome === 'detectable' && wrongBlocks <= 1 && crewsUsed > 0) s = 1;
  return s > maxStars ? maxStars : s;
}

export function score(input: ScoreInput): Score {
  const quality = decisionQuality(input);
  const wrongBlocks = weight(multiply(input.crews, input.decoderCrews));
  const crewsUsed = weight(input.crews);
  const maxStars = input.maxStars ?? 3;
  const s = stars({ quality, outcome: input.outcome, wrongBlocks, crewsUsed, maxStars });
  return {
    outcome: input.outcome,
    quality,
    stars: s,
    maxStars,
    crewsUsed,
    minCrews: weight(input.decoderCrews),
    completed: input.outcome === 'success' || quality === 'unlucky',
  };
}

export const QUALITY_LABEL: Readonly<Record<DecisionQuality, string>> = {
  optimal: 'Optimal call',
  valid: 'Valid, but costly',
  unlucky: 'Optimal call, unlucky outcome',
  lucky: 'Lucky guess — the alarms did not justify it',
  off: 'Off target',
};

/** Verdict labels for stabilizer codes (codes with alarm stations). */
export const OUTCOME_LABEL: Readonly<Record<VerdictKind, string>> = {
  success: 'Logical qubit safe',
  'logical-error': 'Silent failure — logical qubit flipped',
  detectable: 'Fires still burning',
};

/** Verdict label for a propagation mission (bare wires, no stabilizers): a miss is a missed prediction, not a silent failure. */
export const PROPAGATION_MISS_LABEL = 'Prediction missed — fires left on the wires';

/** The banner text for a verdict on a given code: codes without checks never "silently fail". */
export function outcomeLabel(kind: VerdictKind, hasChecks: boolean): string {
  if (!hasChecks && kind === 'logical-error') return PROPAGATION_MISS_LABEL;
  return OUTCOME_LABEL[kind];
}

/** Result-screen heading. */
export function resultHeading(score: Score): string {
  if (score.stars === 3) return 'Flawless dispatch';
  if (score.stars === 2) return 'Fires out';
  if (score.quality === 'unlucky') return 'Right call, cruel luck';
  if (score.quality === 'lucky') return 'Lucky guess';
  if (score.stars === 1) return 'Close';
  if (score.outcome === 'detectable' && score.crewsUsed === 0) return 'Stood down';
  return 'Off target';
}
