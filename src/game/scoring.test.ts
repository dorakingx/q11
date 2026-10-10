import { describe, expect, it } from 'vitest';
import { evaluate, fromString, getCode, lookupDecoder, syndrome } from '../quantum';
import { decisionQuality, outcomeLabel, PROPAGATION_MISS_LABEL, QUALITY_LABEL, resultHeading, score, stars } from './scoring';
import type { StarCount } from './types';

const rsc3 = getCode('rsc3');
const rep3 = getCode('rep3');

function scoreFor(codeId: 'rsc3' | 'rep3', error: string, crews: string, maxStars: StarCount = 3) {
  const code = codeId === 'rsc3' ? rsc3 : rep3;
  const e = fromString(error);
  const c = fromString(crews);
  const d = lookupDecoder(code).decode(syndrome(code, e));
  const v = evaluate(code, e, c);
  return score({ code, outcome: v.kind, crews: c, decoderCrews: d, maxStars });
}

describe('scoring', () => {
  it('3 stars: success and equivalent to the min-weight dispatch', () => {
    const s = scoreFor('rep3', 'IXI', 'IXI');
    expect(s).toMatchObject({ outcome: 'success', quality: 'optimal', stars: 3, crewsUsed: 1, minCrews: 1, completed: true });
  });

  it('3 stars also for a stabilizer-equivalent dispatch (block 3 instead of block 0 on rsc3)', () => {
    const s = scoreFor('rsc3', 'XIIIIIIII', 'IIIXIIIII');
    expect(s.outcome).toBe('success');
    expect(s.quality).toBe('optimal');
    expect(s.stars).toBe(3);
  });

  it('2 stars: success with more crews than needed (valid)', () => {
    // Error X on block 1 of rsc3; crews X1 plus the stabilizer X2 pattern (X0 X3) — success, weight 3 > 1.
    const s = scoreFor('rsc3', 'IXIIIIIII', 'XXIXIIIII');
    expect(s.outcome).toBe('success');
    expect(s.quality).toBe('valid');
    expect(s.stars).toBe(2);
    expect(s.crewsUsed).toBe(3);
    expect(s.minCrews).toBe(1);
  });

  it('1 star: mission 6 "unlucky" — optimal call, logical error', () => {
    const s = scoreFor('rsc3', 'IXXIIIIII', 'XIIIIIIII');
    expect(s.outcome).toBe('logical-error');
    expect(s.quality).toBe('unlucky');
    expect(s.stars).toBe(1);
    expect(s.completed).toBe(true);
  });

  it('mission 6 (maxStars 1): the guess at blocks 1,2 is a success but "lucky" — 1 star, labelled as not justified', () => {
    const s = scoreFor('rsc3', 'IXXIIIIII', 'IXXIIIIII', 1);
    expect(s).toMatchObject({ outcome: 'success', quality: 'lucky', stars: 1, maxStars: 1, completed: true });
    expect(QUALITY_LABEL.lucky).toBe('Lucky guess — the alarms did not justify it');
    expect(resultHeading(s)).toBe('Lucky guess');
    // The optimal path on the same mission stays "unlucky", 1 star, and the label is still "Optimal call …".
    const u = scoreFor('rsc3', 'IXXIIIIII', 'XIIIIIIII', 1);
    expect(u).toMatchObject({ outcome: 'logical-error', quality: 'unlucky', stars: 1, maxStars: 1, completed: true });
    expect(QUALITY_LABEL.unlucky).toMatch(/^Optimal call/);
    // Without the cap the same guess is an ordinary "valid" 2-star success (the rule is per mission, not global).
    expect(scoreFor('rsc3', 'IXXIIIIII', 'IXXIIIIII')).toMatchObject({ quality: 'valid', stars: 2, maxStars: 3 });
  });

  it('maxStars caps the rating of any outcome (an optimal success on a 1-star mission is 1 star)', () => {
    const s = scoreFor('rep3', 'IXI', 'IXI', 1);
    expect(s.quality).toBe('optimal');
    expect(s.stars).toBe(1);
    expect(scoreFor('rep3', 'IXI', 'IXI', 2).stars).toBe(2);
  });

  it('0 stars: standing down with fires present is never "close" (no crew placed)', () => {
    const s = scoreFor('rep3', 'IXI', 'III');
    expect(s.outcome).toBe('detectable');
    expect(s.quality).toBe('off');
    expect(s.crewsUsed).toBe(0);
    expect(s.stars).toBe(0);
    expect(s.completed).toBe(false);
    expect(resultHeading(s)).toBe('Stood down');
    expect(scoreFor('rsc3', 'IIIIXIIII', 'IIIIIIIII').stars).toBe(0);
  });

  it('1 star: detectable with at most one wrong block and at least one crew placed', () => {
    // rsc3: error X4 (Z0, Z1 ring); crew on block 1 → residual X1 X4 still rings; one wrong block vs the decoder's X4? no: two.
    // Use rep3: error X1, crew X1 plus a wrong crew X0? budget aside: crews X0 differ from decoder X1 on 2 blocks → 0.
    // A single-wrong-block near miss: rsc3 error X4, crews X4 X0 → residual X0 (detectable), differs from X4 by one block.
    const s = scoreFor('rsc3', 'IIIIXIIII', 'XIIIXIIII');
    expect(s.outcome).toBe('detectable');
    expect(s.stars).toBe(1);
    expect(resultHeading(s)).toBe('Close');
  });

  it('0 stars: detectable with two wrong blocks, or a logical error that was not the optimal call', () => {
    expect(scoreFor('rep3', 'IXI', 'XII').stars).toBe(0);
    // rsc3: error X4 (alarms Z0, Z1); crews X0 X8? → residual X0 X4 X8 anticommutes → detectable, 3 wrong blocks.
    expect(scoreFor('rsc3', 'IIIIXIIII', 'XIIIIIIIX').stars).toBe(0);
    // logical error that is not the decoder's call: error X1, crews X0 X2 → residual X0X1X2 = logical X.
    const s = scoreFor('rsc3', 'IXIIIIIII', 'XIXIIIIII');
    expect(s.outcome).toBe('logical-error');
    expect(s.quality).toBe('off');
    expect(s.stars).toBe(0);
  });

  it('alarms off is never a success by itself; more crews never add stars', () => {
    const silent = scoreFor('rsc3', 'IXIIIIIII', 'XIXIIIIII');
    expect(silent.outcome).not.toBe('success');
    const one = scoreFor('rsc3', 'IIIIXIIII', 'IIIIXIIII');
    const many = scoreFor('rsc3', 'IIIIXIIII', 'XXIXXIIII'); // X4 plus stabilizer X0X1X3? no: X0 X1 X3 is not a stabilizer → detectable
    expect(one.stars).toBe(3);
    expect(many.stars).toBeLessThan(one.stars);
  });

  it('stars table is exhaustive', () => {
    expect(stars({ quality: 'optimal', outcome: 'success', wrongBlocks: 0, crewsUsed: 1 })).toBe(3);
    expect(stars({ quality: 'valid', outcome: 'success', wrongBlocks: 2, crewsUsed: 3 })).toBe(2);
    expect(stars({ quality: 'unlucky', outcome: 'logical-error', wrongBlocks: 0, crewsUsed: 1 })).toBe(1);
    expect(stars({ quality: 'lucky', outcome: 'success', wrongBlocks: 3, crewsUsed: 2, maxStars: 1 })).toBe(1);
    expect(stars({ quality: 'off', outcome: 'detectable', wrongBlocks: 1, crewsUsed: 1 })).toBe(1);
    expect(stars({ quality: 'off', outcome: 'detectable', wrongBlocks: 1, crewsUsed: 0 })).toBe(0);
    expect(stars({ quality: 'off', outcome: 'detectable', wrongBlocks: 2, crewsUsed: 1 })).toBe(0);
    expect(stars({ quality: 'off', outcome: 'logical-error', wrongBlocks: 0, crewsUsed: 2 })).toBe(0);
    expect(stars({ quality: 'optimal', outcome: 'success', wrongBlocks: 0, crewsUsed: 1, maxStars: 1 })).toBe(1);
    const code = rsc3;
    const e = fromString('IXXIIIIII');
    const d = lookupDecoder(code).decode(syndrome(code, e));
    expect(decisionQuality({ code, outcome: 'logical-error', crews: d, decoderCrews: d })).toBe('unlucky');
  });

  it('verdict labels: a miss on bare wires is a missed prediction, never a silent failure', () => {
    expect(outcomeLabel('logical-error', true)).toBe('Silent failure — logical qubit flipped');
    expect(outcomeLabel('logical-error', false)).toBe(PROPAGATION_MISS_LABEL);
    expect(outcomeLabel('success', false)).toBe('Logical qubit safe');
    expect(outcomeLabel('detectable', true)).toBe('Fires still burning');
    const off = scoreFor('rsc3', 'IXIIIIIII', 'XIXIIIIII');
    expect(resultHeading(off)).toBe('Off target');
  });
});
