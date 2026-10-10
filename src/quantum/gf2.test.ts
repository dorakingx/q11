import { describe, expect, it } from 'vitest';
import { inSpan, rank, reduceVector, representation, rowReduce } from './gf2';

const r = (...bits: number[]) => Uint8Array.from(bits);

describe('GF(2) linear algebra', () => {
  it('rank of simple matrices', () => {
    expect(rank([r(1, 0, 0), r(0, 1, 0), r(1, 1, 0)])).toBe(2);
    expect(rank([r(1, 1), r(1, 1)])).toBe(1);
    expect(rank([r(0, 0), r(0, 0)])).toBe(0);
    expect(rank([], 3)).toBe(0);
    expect(rank([r(1, 0, 1), r(0, 1, 1), r(1, 1, 0)])).toBe(2);
  });
  it('rowReduce yields RREF with increasing pivots', () => {
    const b = rowReduce([r(1, 1, 0, 1), r(0, 1, 1, 0), r(1, 0, 1, 1)]);
    expect(b.pivots).toEqual([0, 1]);
    expect(b.rows.map((x) => Array.from(x))).toEqual([
      [1, 0, 1, 1],
      [0, 1, 1, 0],
    ]);
  });
  it('inSpan and reduceVector', () => {
    const rows = [r(1, 1, 0, 0), r(0, 1, 1, 0)];
    expect(inSpan(rows, r(1, 0, 1, 0))).toBe(true);
    expect(inSpan(rows, r(0, 0, 0, 0))).toBe(true);
    expect(inSpan(rows, r(0, 0, 0, 1))).toBe(false);
    expect(inSpan(rows, r(1, 0, 0, 0))).toBe(false);
    expect(Array.from(reduceVector(rowReduce(rows), r(1, 0, 1, 1)))).toEqual([0, 0, 0, 1]);
    expect(() => inSpan(rows, r(1, 0))).toThrow(RangeError);
  });
  it('representation returns coefficients over the original rows', () => {
    const rows = [r(1, 1, 0, 0), r(0, 1, 1, 0), r(0, 0, 1, 1)];
    const c = representation(rows, r(1, 0, 0, 1));
    expect(c).not.toBeNull();
    expect(Array.from(c ?? [])).toEqual([1, 1, 1]);
    expect(representation(rows, r(1, 0, 0, 0))).toBeNull();
    expect(Array.from(representation(rows, r(0, 0, 0, 0)) ?? [1])).toEqual([0, 0, 0]);
  });
});
