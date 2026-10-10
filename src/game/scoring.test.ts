import { describe, expect, it } from 'vitest';
import { evaluate, fromString, getCode, lookupDecoder, syndrome } from '../quantum';
import { decisionQuality, score, stars } from './scoring';

const rsc3 = getCode('rsc3');
const rep3 = getCode('rep3');

function scoreFor(codeId: 'rsc3' | 'rep3', error: string, crews: string) {
  const code = codeId === 'rsc3' ? rsc3 : rep3;
  const e = fromString(error);
  const c = fromString(crews);
  const d = lookupDecoder(code).decode(syndrome(code, e));
  const v = evaluate(code, e, c);
  return score({ code, outcome: v.kind, crews: c, decoderCrews: d });
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

  it('mission 6 lucky guess at blocks 1,2 = success, valid, 2 stars', () => {
    const s = scoreFor('rsc3', 'IXXIIIIII', 'IXXIIIIII');
    expect(s).toMatchObject({ outcome: 'success', quality: 'valid', stars: 2 });
  });

  it('1 star: detectable with at most one wrong block (standing down on a single fire)', () => {
    const s = scoreFor('rep3', 'IXI', 'III');
    expect(s.outcome).toBe('detectable');
    expect(s.quality).toBe('off');
    expect(s.stars).toBe(1);
    expect(s.completed).toBe(false);
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
    expect(stars('optimal', 'success', 0)).toBe(3);
    expect(stars('valid', 'success', 0)).toBe(2);
    expect(stars('unlucky', 'logical-error', 0)).toBe(1);
    expect(stars('off', 'detectable', 1)).toBe(1);
    expect(stars('off', 'detectable', 2)).toBe(0);
    expect(stars('off', 'logical-error', 0)).toBe(0);
    const code = rsc3;
    const e = fromString('IXXIIIIII');
    const d = lookupDecoder(code).decode(syndrome(code, e));
    expect(decisionQuality({ code, outcome: 'logical-error', crews: d, decoderCrews: d })).toBe('unlucky');
  });
});
