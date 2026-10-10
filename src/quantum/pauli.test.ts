import { describe, expect, it } from 'vitest';
import {
  anticommutes,
  commutes,
  equals,
  fromString,
  fromSupport,
  identity,
  isIdentity,
  letterAt,
  multiply,
  pauliFromIndex,
  pauliIndex,
  setLetter,
  support,
  toMasks,
  fromMasks,
  toString,
  weight,
  toSymplecticRow,
} from './pauli';
import { mulberry32 } from './rng';

function randomPauli(rng: ReturnType<typeof mulberry32>, n: number) {
  let p = identity(n);
  for (let q = 0; q < n; q++) p = setLetter(p, q, (['I', 'X', 'Y', 'Z'] as const)[rng.int(4)] ?? 'I');
  return p;
}

describe('Pauli strings', () => {
  it('round-trips qubit-0-first strings', () => {
    for (const s of ['I', 'X', 'Y', 'Z', 'XIZ', 'IYXZ', 'IIIIIIIII', 'ZIIZIIZII']) expect(toString(fromString(s))).toBe(s);
  });
  it('rejects invalid letters', () => {
    expect(() => fromString('XQ')).toThrow(/invalid Pauli letter/);
  });
  it('maps letters to symplectic bits (Y = X and Z)', () => {
    const p = fromString('IXZY');
    expect(Array.from(p.x)).toEqual([0, 1, 0, 1]);
    expect(Array.from(p.z)).toEqual([0, 0, 1, 1]);
    expect(Array.from(toSymplecticRow(p))).toEqual([0, 1, 0, 1, 0, 0, 1, 1]);
  });
});

describe('XOR composition', () => {
  it('p·p = I for 500 random Paulis (cancellation, not OR)', () => {
    const rng = mulberry32(7);
    for (let i = 0; i < 500; i++) {
      const p = randomPauli(rng, 1 + rng.int(9));
      expect(isIdentity(multiply(p, p))).toBe(true);
    }
  });
  it('X·Z = Y, X·Y = Z, Y·Z = X on one qubit (phase dropped)', () => {
    expect(toString(multiply(fromString('X'), fromString('Z')))).toBe('Y');
    expect(toString(multiply(fromString('X'), fromString('Y')))).toBe('Z');
    expect(toString(multiply(fromString('Y'), fromString('Z')))).toBe('X');
  });
  it('is associative and commutative on the frame level', () => {
    const rng = mulberry32(11);
    for (let i = 0; i < 200; i++) {
      const a = randomPauli(rng, 5);
      const b = randomPauli(rng, 5);
      const c = randomPauli(rng, 5);
      expect(equals(multiply(a, b), multiply(b, a))).toBe(true);
      expect(equals(multiply(multiply(a, b), c), multiply(a, multiply(b, c)))).toBe(true);
    }
  });
  it('rejects mismatched sizes', () => {
    expect(() => multiply(fromString('XI'), fromString('X'))).toThrow(RangeError);
  });
});

describe('commutation', () => {
  it('single-qubit table', () => {
    const [I, X, Y, Z] = ['I', 'X', 'Y', 'Z'].map(fromString) as [ReturnType<typeof fromString>, ReturnType<typeof fromString>, ReturnType<typeof fromString>, ReturnType<typeof fromString>];
    expect(commutes(X, X)).toBe(true);
    expect(commutes(I, Z)).toBe(true);
    expect(anticommutes(X, Z)).toBe(true);
    expect(anticommutes(X, Y)).toBe(true);
    expect(anticommutes(Y, Z)).toBe(true);
  });
  it('is symmetric and every Pauli commutes with itself', () => {
    const rng = mulberry32(3);
    for (let i = 0; i < 500; i++) {
      const n = 1 + rng.int(8);
      const a = randomPauli(rng, n);
      const b = randomPauli(rng, n);
      expect(commutes(a, b)).toBe(commutes(b, a));
      expect(commutes(a, a)).toBe(true);
    }
  });
  it('XX commutes with ZZ, XI anticommutes with ZI', () => {
    expect(commutes(fromString('XX'), fromString('ZZ'))).toBe(true);
    expect(anticommutes(fromString('XI'), fromString('ZI'))).toBe(true);
  });
});

describe('helpers', () => {
  it('weight, support, letterAt, setLetter (immutable), fromSupport', () => {
    const p = fromString('XIYZ');
    expect(weight(p)).toBe(3);
    expect(support(p)).toEqual([0, 2, 3]);
    expect(letterAt(p, 2)).toBe('Y');
    const q = setLetter(p, 1, 'Z');
    expect(toString(q)).toBe('XZYZ');
    expect(toString(p)).toBe('XIYZ');
    expect(toString(fromSupport(5, 'Z', [4, 0]))).toBe('ZIIIZ');
    expect(() => fromSupport(3, 'X', [3])).toThrow(RangeError);
    expect(() => fromSupport(3, 'X', [1, 1])).toThrow(RangeError);
    expect(() => letterAt(p, 4)).toThrow(RangeError);
  });
  it('numeric encoding is a bijection on all 4^n Paulis and starts I=0, X0=1', () => {
    expect(pauliIndex(identity(3))).toBe(0);
    expect(pauliIndex(fromString('XII'))).toBe(1);
    expect(pauliIndex(fromString('ZII'))).toBe(2);
    expect(pauliIndex(fromString('IXI'))).toBe(4);
    const seen = new Set<string>();
    for (let i = 0; i < 4 ** 4; i++) {
      const p = pauliFromIndex(4, i);
      expect(pauliIndex(p)).toBe(i);
      seen.add(toString(p));
    }
    expect(seen.size).toBe(256);
  });
  it('masks round-trip', () => {
    const p = fromString('XIYZIIIIZ');
    const m = toMasks(p);
    expect(equals(fromMasks(9, m.x, m.z), p)).toBe(true);
  });
});
