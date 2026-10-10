import { describe, expect, it } from 'vitest';
import { getCode } from './codes';
import { lookupDecoder, minWeightCorrections, minWeightEquivalent, minWeightFor } from './decoder';
import { equals, fromString, identity, isIdentity, setLetter, toString, weight } from './pauli';
import { evaluate, syndrome, syndromeFromArray } from './verdict';

describe('lookup decoder on rsc3', () => {
  const code = getCode('rsc3');
  const decoder = lookupDecoder(code);

  it('returns identity for the zero syndrome', () => {
    expect(isIdentity(decoder.decode(new Uint8Array(8)))).toBe(true);
  });

  it('corrects identity + all 27 weight-1 errors up to a stabilizer (28 patterns)', () => {
    const patterns = [identity(9)];
    for (const letter of ['X', 'Y', 'Z'] as const) for (let q = 0; q < 9; q++) patterns.push(setLetter(identity(9), q, letter));
    expect(patterns.length).toBe(28);
    for (const e of patterns) {
      const c = decoder.decode(syndrome(code, e));
      expect(weight(c)).toBeLessThanOrEqual(weight(e));
      expect(evaluate(code, e, c).kind, toString(e)).toBe('success');
    }
  });

  it('degenerate pairs share a syndrome and the decoder output is equivalent to both', () => {
    const pairs: [string, string][] = [
      ['XIIIIIIII', 'IIIXIIIII'],
      ['IIIIIXIII', 'IIIIIIIIX'],
      ['IZIIIIIII', 'IIZIIIIII'],
      ['IIIIIIZII', 'IIIIIIIZI'],
    ];
    for (const [a, b] of pairs) {
      const pa = fromString(a);
      const pb = fromString(b);
      const sa = syndrome(code, pa);
      expect(Array.from(sa)).toEqual(Array.from(syndrome(code, pb)));
      const c = decoder.decode(sa);
      expect(weight(c)).toBe(1);
      expect(minWeightEquivalent(code, c, pa)).toBe(true);
      expect(minWeightEquivalent(code, c, pb)).toBe(true);
      expect(minWeightEquivalent(code, pa, pb)).toBe(true);
      const all = minWeightCorrections(code, sa).map(toString).sort();
      expect(all).toEqual([a, b].sort());
    }
    expect(minWeightEquivalent(code, fromString('XIIIIIIII'), fromString('IXIIIIIII'))).toBe(false);
  });

  it('breaks ties deterministically by lowest numeric encoding (X0 before X3)', () => {
    expect(toString(decoder.decode(syndromeFromArray([1, 0, 0, 0, 0, 0, 0, 0])))).toBe('XIIIIIIII');
    expect(toString(lookupDecoder(code).decode(syndromeFromArray([1, 0, 0, 0, 0, 0, 0, 0])))).toBe('XIIIIIIII');
  });

  it('mission 6: E = IXXIIIIII → decoder output completes a logical X, residual syndrome zero', () => {
    const e = fromString('IXXIIIIII');
    const c = decoder.decode(syndrome(code, e));
    expect(toString(c)).toBe('XIIIIIIII');
    const v = evaluate(code, e, c);
    expect(v.kind).toBe('logical-error');
    expect(v.logicalFlip.x[0]).toBe(true);
    expect(v.logicalFlip.z[0]).toBe(false);
    expect(Array.from(v.syndrome)).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(toString(v.residual)).toBe('XXXIIIIII');
  });

  it('mission 5: prefers X1·Z6 (two components) over Y1·Z4 (three) at equal qubit weight', () => {
    const e = fromString('IXIIIIIZI');
    const s = syndrome(code, e);
    expect(minWeightFor(code, s)).toBe(2);
    const c = decoder.decode(s);
    expect(toString(c)).toBe('IXIIIIZII');
    expect(evaluate(code, e, c).kind).toBe('success');
    expect(minWeightCorrections(code, s).map(toString)).toEqual(['IXIIIIZII', 'IXIIIIIZI']);
    // the rejected alternative is a genuine competitor: same syndrome, same qubit weight, logical-Z residual
    const alt = fromString('IYIIZIIII');
    expect(Array.from(syndrome(code, alt))).toEqual(Array.from(s));
    expect(evaluate(code, e, alt).kind).toBe('logical-error');
  });

  it('every one of the 256 syndromes decodes to a Pauli with that syndrome', () => {
    for (let k = 0; k < 256; k++) {
      const bits = Array.from({ length: 8 }, (_, i) => (k >> i) & 1);
      const s = syndromeFromArray(bits);
      const c = decoder.decode(s);
      expect(Array.from(syndrome(code, c))).toEqual(bits);
      for (const alt of minWeightCorrections(code, s)) expect(weight(alt)).toBe(weight(c));
    }
  });

  it('rejects syndromes of the wrong length', () => {
    expect(() => decoder.decode(new Uint8Array(2))).toThrow(RangeError);
  });
});

describe('lookup decoder on rep3 and trivial codes', () => {
  it('rep3 corrects all single X errors; a single Z is invisible (decoder returns I)', () => {
    const code = getCode('rep3');
    const d = lookupDecoder(code);
    for (let q = 0; q < 3; q++) {
      const e = setLetter(identity(3), q, 'X');
      expect(equals(d.decode(syndrome(code, e)), e)).toBe(true);
    }
    const z = fromString('IZI');
    expect(isIdentity(d.decode(syndrome(code, z)))).toBe(true);
    expect(evaluate(code, z, d.decode(syndrome(code, z))).kind).toBe('logical-error');
  });
  it('trivial code decoder always returns identity', () => {
    const code = getCode('trivial2');
    expect(isIdentity(lookupDecoder(code).decode(new Uint8Array(0)))).toBe(true);
  });
});
