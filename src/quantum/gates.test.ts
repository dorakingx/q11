import { describe, expect, it } from 'vitest';
import type { Gate } from './types';
import { applyGate, propagate, propagateFinal, validateGate } from './gates';
import { fromString, toString } from './pauli';

function table(gate: Gate, rows: Record<string, string>): void {
  for (const [input, output] of Object.entries(rows)) {
    expect(toString(applyGate(fromString(input), gate)), `${gate.kind}: ${input}`).toBe(output);
  }
}

describe('single-qubit Clifford conjugation', () => {
  it('H swaps X and Z, fixes I and Y', () => {
    table({ kind: 'H', q: 0 }, { I: 'I', X: 'Z', Z: 'X', Y: 'Y' });
  });
  it('S maps X→Y, Y→X, fixes Z', () => {
    table({ kind: 'S', q: 0 }, { I: 'I', X: 'Y', Y: 'X', Z: 'Z' });
  });
  it('acts only on its own wire', () => {
    table({ kind: 'H', q: 1 }, { XI: 'XI', IX: 'IZ', ZZ: 'ZX', YY: 'YY' });
  });
});

describe('two-qubit Clifford conjugation (hand-written truth tables, all 16 inputs)', () => {
  it('CNOT(0,1): X copies forward, Z copies backward', () => {
    table(
      { kind: 'CNOT', c: 0, t: 1 },
      {
        II: 'II', XI: 'XX', ZI: 'ZI', YI: 'YX',
        IX: 'IX', XX: 'XI', ZX: 'ZX', YX: 'YI',
        IZ: 'ZZ', XZ: 'YY', ZZ: 'IZ', YZ: 'XY',
        IY: 'ZY', XY: 'YZ', ZY: 'IY', YY: 'XZ',
      },
    );
  });
  it('CNOT(1,0) is the mirror image', () => {
    table(
      { kind: 'CNOT', c: 1, t: 0 },
      {
        II: 'II', IX: 'XX', IZ: 'IZ', IY: 'XY',
        XI: 'XI', XX: 'IX', XZ: 'XZ', XY: 'IY',
        ZI: 'ZZ', ZX: 'YY', ZZ: 'ZI', ZY: 'YX',
        YI: 'YZ', YX: 'ZY', YZ: 'YI', YY: 'ZX',
      },
    );
  });
  it('CZ: X on one wire picks up Z on the other', () => {
    table(
      { kind: 'CZ', a: 0, b: 1 },
      {
        II: 'II', XI: 'XZ', ZI: 'ZI', YI: 'YZ',
        IX: 'ZX', XX: 'YY', ZX: 'IX', YX: 'XY',
        IZ: 'IZ', XZ: 'XI', ZZ: 'ZZ', YZ: 'YI',
        IY: 'ZY', XY: 'YX', ZY: 'IY', YY: 'XX',
      },
    );
  });
  it('SWAP exchanges the letters', () => {
    table(
      { kind: 'SWAP', a: 0, b: 1 },
      {
        II: 'II', XI: 'IX', ZI: 'IZ', YI: 'IY',
        IX: 'XI', XX: 'XX', ZX: 'XZ', YX: 'XY',
        IZ: 'ZI', XZ: 'ZX', ZZ: 'ZZ', YZ: 'ZY',
        IY: 'YI', XY: 'YX', ZY: 'YZ', YY: 'YY',
      },
    );
  });
  it('every gate is an involution or has the expected order (applying CNOT twice is identity)', () => {
    for (let i = 0; i < 16; i++) {
      const s = ['I', 'X', 'Y', 'Z'][i & 3] ?? 'I';
      const t = ['I', 'X', 'Y', 'Z'][i >> 2] ?? 'I';
      const p = fromString(s + t);
      const g: Gate = { kind: 'CNOT', c: 0, t: 1 };
      expect(toString(applyGate(applyGate(p, g), g))).toBe(s + t);
      const h: Gate = { kind: 'H', q: 0 };
      expect(toString(applyGate(applyGate(p, h), h))).toBe(s + t);
    }
  });
});

describe('validation', () => {
  it('throws RangeError for out-of-range or repeated qubits', () => {
    expect(() => applyGate(fromString('XI'), { kind: 'H', q: 2 })).toThrow(RangeError);
    expect(() => applyGate(fromString('XI'), { kind: 'CNOT', c: 0, t: 0 })).toThrow(RangeError);
    expect(() => applyGate(fromString('XI'), { kind: 'CZ', a: -1, b: 1 })).toThrow(RangeError);
    expect(() => validateGate({ kind: 'SWAP', a: 1, b: 1 }, 2)).toThrow(RangeError);
  });
  it('does not mutate its input', () => {
    const p = fromString('XI');
    applyGate(p, { kind: 'CNOT', c: 0, t: 1 });
    expect(toString(p)).toBe('XI');
  });
});

describe('propagate', () => {
  it('returns circuit.length + 1 frames with the input first', () => {
    const circuit: Gate[] = [{ kind: 'H', q: 0 }, { kind: 'CNOT', c: 0, t: 1 }, { kind: 'H', q: 1 }];
    const t = propagate(fromString('ZI'), circuit);
    expect(t.frames.length).toBe(4);
    expect(t.frames.map(toString)).toEqual(['ZI', 'XI', 'XX', 'XZ']);
    expect(toString(propagateFinal(fromString('ZI'), circuit))).toBe('XZ');
  });
  it('an empty circuit leaves the frame untouched', () => {
    const t = propagate(fromString('IXI'), []);
    expect(t.frames.length).toBe(1);
    expect(toString(t.frames[0] ?? fromString(''))).toBe('IXI');
  });
  it('mission 2 and 3 scenarios', () => {
    expect(toString(propagateFinal(fromString('XZ'), [{ kind: 'CNOT', c: 0, t: 1 }]))).toBe('YY');
    expect(toString(propagateFinal(fromString('IZ'), [{ kind: 'CNOT', c: 0, t: 1 }]))).toBe('ZZ');
    expect(toString(propagateFinal(fromString('XI'), [{ kind: 'H', q: 0 }]))).toBe('ZI');
    expect(toString(propagateFinal(fromString('ZI'), [{ kind: 'H', q: 0 }, { kind: 'CNOT', c: 0, t: 1 }]))).toBe('XX');
  });
});
