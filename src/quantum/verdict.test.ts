import { describe, expect, it } from 'vitest';
import { getCode } from './codes';
import { fromString, identity, multiply, setLetter, toString } from './pauli';
import { classify, evaluate, inStabilizerGroup, residual, ringingChecks, syndrome, syndromeKey, syndromeToArray } from './verdict';
import { mulberry32 } from './rng';

describe('syndrome', () => {
  it('rsc3: X on block 0 rings only Z0; X on block 4 rings Z0 and Z1; mission-5 error rings Z0, Z2, X1', () => {
    const code = getCode('rsc3');
    expect(ringingChecks(code, syndrome(code, fromString('XIIIIIIII')))).toEqual(['Z0']);
    expect(ringingChecks(code, syndrome(code, fromString('IIIIXIIII')))).toEqual(['Z0', 'Z1']);
    expect(ringingChecks(code, syndrome(code, fromString('IXIIIIIZI')))).toEqual(['Z0', 'Z2', 'X1']);
    expect(syndromeToArray(syndrome(code, fromString('IXXIIIIII')))).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
    expect(syndromeKey(syndrome(code, fromString('IXXIIIIII')))).toBe('10000000');
  });
  it('rep3: single X errors have distinct syndromes, Z errors are invisible', () => {
    const code = getCode('rep3');
    expect(syndromeToArray(syndrome(code, fromString('XII')))).toEqual([1, 0]);
    expect(syndromeToArray(syndrome(code, fromString('IXI')))).toEqual([1, 1]);
    expect(syndromeToArray(syndrome(code, fromString('IIX')))).toEqual([0, 1]);
    expect(syndromeToArray(syndrome(code, fromString('ZII')))).toEqual([0, 0]);
  });
  it('rejects a Pauli of the wrong size', () => {
    expect(() => syndrome(getCode('rsc3'), fromString('XI'))).toThrow(RangeError);
  });
});

describe('stabilizer group membership', () => {
  it('products of generators are in the group, logicals are not', () => {
    const code = getCode('rsc3');
    const rng = mulberry32(5);
    for (let i = 0; i < 100; i++) {
      let s = identity(9);
      for (const g of code.checks) if (rng.int(2)) s = multiply(s, g.pauli);
      expect(inStabilizerGroup(code, s)).toBe(true);
      const lx = code.logicalX[0]?.pauli ?? identity(9);
      expect(inStabilizerGroup(code, multiply(s, lx))).toBe(false);
    }
  });
  it('group of a trivial code is {I}', () => {
    const code = getCode('trivial2');
    expect(inStabilizerGroup(code, identity(2))).toBe(true);
    expect(inStabilizerGroup(code, fromString('XI'))).toBe(false);
  });
});

describe('classify / evaluate', () => {
  it('residual is the XOR of correction and error', () => {
    expect(toString(residual(fromString('XIZ'), fromString('XZZ')))).toBe('IZI');
  });
  it('rsc3 success / logical-error / detectable', () => {
    const code = getCode('rsc3');
    const ok = evaluate(code, fromString('IIIIXIIII'), fromString('IIIIXIIII'));
    expect(ok.kind).toBe('success');
    expect(ok.weight).toBe(0);
    expect(ok.logicalFlip).toEqual({ x: [false], z: [false] });
    // degenerate: X0 error corrected by X3 → residual X0X3 = X2 check → success
    expect(evaluate(code, fromString('XIIIIIIII'), fromString('IIIXIIIII')).kind).toBe('success');
    // mission 6: residual XXX on the top row = logical X
    const m6 = evaluate(code, fromString('IXXIIIIII'), fromString('XIIIIIIII'));
    expect(m6.kind).toBe('logical-error');
    expect(m6.logicalFlip).toEqual({ x: [true], z: [false] });
    expect(syndromeToArray(m6.syndrome)).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(m6.weight).toBe(3);
    // logical Z and logical Y flips
    expect(classify(code, fromString('ZIIZIIZII')).logicalFlip).toEqual({ x: [false], z: [true] });
    expect(classify(code, multiply(fromString('ZIIZIIZII'), fromString('XXXIIIIII'))).logicalFlip).toEqual({ x: [true], z: [true] });
    // wrong block: X on 5 for an X-on-4 fire → still ringing
    const bad = evaluate(code, fromString('IIIIXIIII'), fromString('IIIIIXIII'));
    expect(bad.kind).toBe('detectable');
    expect(syndromeToArray(bad.syndrome)).not.toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    // syndrome zero is NOT enough: the residual must be in the group
    expect(evaluate(code, identity(9), fromString('XXXIIIIII')).kind).toBe('logical-error');
  });
  it('rep3: single X corrected; single Z is undetectable and is a logical Z flip', () => {
    const code = getCode('rep3');
    for (let q = 0; q < 3; q++) {
      const e = setLetter(identity(3), q, 'X');
      expect(evaluate(code, e, e).kind).toBe('success');
    }
    const z = evaluate(code, fromString('ZII'), identity(3));
    expect(syndromeToArray(syndrome(code, fromString('ZII')))).toEqual([0, 0]);
    expect(z.kind).toBe('logical-error');
    expect(z.logicalFlip).toEqual({ x: [false], z: [true] });
    expect(evaluate(code, fromString('XXX'), identity(3)).logicalFlip).toEqual({ x: [true], z: [false] });
  });
  it('trivial code: success iff residual is identity, otherwise logical-error', () => {
    const code = getCode('trivial2');
    expect(evaluate(code, fromString('YY'), fromString('YY')).kind).toBe('success');
    const v = evaluate(code, fromString('YY'), fromString('XY'));
    expect(v.kind).toBe('logical-error');
    expect(toString(v.residual)).toBe('ZI');
    expect(v.logicalFlip).toEqual({ x: [false, false], z: [true, false] });
    expect(evaluate(code, fromString('XZ'), identity(2)).logicalFlip).toEqual({ x: [true, false], z: [false, true] });
  });
});
