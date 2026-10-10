import { describe, expect, it } from 'vitest';
import { mulberry32 } from './rng';

describe('mulberry32', () => {
  it('is deterministic for a seed and differs across seeds', () => {
    const a = mulberry32(20261010);
    const b = mulberry32(20261010);
    const c = mulberry32(1);
    const sa = Array.from({ length: 5 }, () => a.nextU32());
    const sb = Array.from({ length: 5 }, () => b.nextU32());
    const sc = Array.from({ length: 5 }, () => c.nextU32());
    expect(sa).toEqual(sb);
    expect(sa).not.toEqual(sc);
  });
  it('matches the reference first outputs for seed 0', () => {
    // Values cross-checked against an independent Python implementation of mulberry32 (2026-10-10).
    const r = mulberry32(0);
    expect(r.nextU32()).toBe(1144304738);
    expect(r.nextU32()).toBe(1416247);
    const s = mulberry32(20261010);
    expect(s.nextU32()).toBe(2544510192);
    expect(s.nextU32()).toBe(2862919775);
  });
  it('int() stays within bounds and rejects bad bounds', () => {
    const r = mulberry32(42);
    for (let i = 0; i < 1000; i++) {
      const v = r.int(7);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(7);
      const f = r.nextFloat();
      expect(f).toBeGreaterThanOrEqual(0);
      expect(f).toBeLessThan(1);
    }
    expect(() => r.int(0)).toThrow(RangeError);
    expect(() => r.pick([])).toThrow(RangeError);
  });
});
