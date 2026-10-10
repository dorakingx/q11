import { describe, expect, it } from 'vitest';
import type { CodeId, StabilizerCode } from './types';
import { CODE_IDS, getAllCodes, getCode, getLayout, isCodeId, stabilizerRows } from './codes';
import { rank } from './gf2';
import { anticommutes, commutes, fromMasks, toString, weight } from './pauli';
import { inStabilizerGroup } from './verdict';

/**
 * Brute-force distance: min weight over Paulis commuting with every check and outside the group.
 * `letters` restricts the error model (e.g. X-only for the repetition code).
 */
function bruteForceDistance(code: StabilizerCode, letters: readonly ('X' | 'Y' | 'Z')[] = ['X', 'Y', 'Z']): number {
  let best = Infinity;
  const total = 4 ** code.n;
  const allowX = letters.includes('X');
  const allowZ = letters.includes('Z');
  const allowY = letters.includes('Y');
  for (let idx = 1; idx < total; idx++) {
    let x = 0;
    let z = 0;
    let rest = idx;
    let ok = true;
    for (let q = 0; q < code.n; q++) {
      const d = rest & 3;
      rest >>= 2;
      if (d === 1 && !allowX) ok = false;
      if (d === 2 && !allowZ) ok = false;
      if (d === 3 && !allowY) ok = false;
      if (d & 1) x |= 1 << q;
      if (d & 2) z |= 1 << q;
    }
    if (!ok) continue;
    const p = fromMasks(code.n, x, z);
    const w = weight(p);
    if (w >= best) continue;
    if (!code.checks.every((c) => commutes(c.pauli, p))) continue;
    if (inStabilizerGroup(code, p)) continue;
    best = w;
  }
  return best;
}

describe('codes.json loading', () => {
  it('exposes exactly the four codes with matching ids', () => {
    expect(CODE_IDS).toEqual(['trivial2', 'trivial3', 'rep3', 'rsc3']);
    for (const id of CODE_IDS) expect(getCode(id).id).toBe(id);
    expect(getAllCodes().length).toBe(4);
    expect(isCodeId('rsc3')).toBe(true);
    expect(isCodeId('nope')).toBe(false);
    expect(getCode('rsc3')).toBe(getCode('rsc3'));
  });
  it('rsc3 has the documented checks, in Z-then-X order', () => {
    const c = getCode('rsc3');
    expect(c.n).toBe(9);
    expect(c.k).toBe(1);
    expect(c.checks.map((k) => k.id)).toEqual(['Z0', 'Z1', 'Z2', 'Z3', 'X0', 'X1', 'X2', 'X3']);
    expect(c.checks.map((k) => k.qubits)).toEqual([
      [0, 1, 3, 4], [4, 5, 7, 8], [1, 2], [6, 7],
      [1, 2, 4, 5], [3, 4, 6, 7], [0, 3], [5, 8],
    ]);
    expect(c.checks.map((k) => toString(k.pauli))).toEqual([
      'ZZIZZIIII', 'IIIIZZIZZ', 'IZZIIIIII', 'IIIIIIZZI',
      'IXXIXXIII', 'IIIXXIXXI', 'XIIXIIIII', 'IIIIIXIIX',
    ]);
    expect(toString(c.logicalX[0]?.pauli ?? fromMasks(9, 0, 0))).toBe('XXXIIIIII');
    expect(toString(c.logicalZ[0]?.pauli ?? fromMasks(9, 0, 0))).toBe('ZIIZIIZII');
  });
  it('layouts: rsc3 grid with 8 station positions, rep3 line, trivial wires', () => {
    const g = getLayout('rsc3');
    expect(g.kind).toBe('grid');
    if (g.kind === 'grid') {
      expect(g.rows).toBe(3);
      expect(g.cols).toBe(3);
      expect(g.blocks.map((b) => [b.q, b.row, b.col])).toEqual([
        [0, 0, 0], [1, 0, 1], [2, 0, 2], [3, 1, 0], [4, 1, 1], [5, 1, 2], [6, 2, 0], [7, 2, 1], [8, 2, 2],
      ]);
      expect(g.checkPositions).toEqual({
        Z0: { row: 0.5, col: 0.5 }, Z1: { row: 1.5, col: 1.5 }, Z2: { row: -0.5, col: 1.5 }, Z3: { row: 2.5, col: 0.5 },
        X0: { row: 0.5, col: 1.5 }, X1: { row: 1.5, col: 0.5 }, X2: { row: 0.5, col: -0.5 }, X3: { row: 1.5, col: 2.5 },
      });
    }
    const l = getLayout('rep3');
    expect(l.kind).toBe('line');
    if (l.kind === 'line') {
      expect(l.blocks.length).toBe(3);
      expect(Object.keys(l.checkPositions).sort()).toEqual(['Z0', 'Z1']);
    }
    const w = getLayout('trivial2');
    expect(w).toEqual({ kind: 'wires', wires: 2 });
    expect(getLayout('trivial3')).toEqual({ kind: 'wires', wires: 3 });
  });
});

describe.each<CodeId>(['rep3', 'rsc3'])('code invariants: %s', (id) => {
  const code = getCode(id);
  it('all generators pairwise commute', () => {
    for (const a of code.checks) for (const b of code.checks) expect(commutes(a.pauli, b.pauli), `${a.id} vs ${b.id}`).toBe(true);
  });
  it('generators are independent: rank = n - k', () => {
    expect(rank(stabilizerRows(code), 2 * code.n)).toBe(code.n - code.k);
    expect(code.checks.length).toBe(code.n - code.k);
  });
  it('logical X and Z commute with every check, anticommute with each other, and are not stabilizers', () => {
    for (const l of [...code.logicalX, ...code.logicalZ]) {
      for (const c of code.checks) expect(commutes(l.pauli, c.pauli), `${l.label} vs ${c.id}`).toBe(true);
      expect(inStabilizerGroup(code, l.pauli)).toBe(false);
    }
    code.logicalX.forEach((lx, i) => {
      code.logicalZ.forEach((lz, j) => {
        expect(i === j ? anticommutes(lx.pauli, lz.pauli) : commutes(lx.pauli, lz.pauli)).toBe(true);
      });
    });
  });
  it('brute-force distance under its own noise model equals the declared distance (3)', () => {
    expect(code.distance).toBe(3);
    // rep3 is an X-noise-only code: its declared distance is the X-distance. rsc3 is measured against all Paulis.
    const letters = id === 'rep3' ? (['X'] as const) : (['X', 'Y', 'Z'] as const);
    expect(bruteForceDistance(code, letters)).toBe(3);
  });
});

describe('rep3 is NOT a general quantum code', () => {
  it('its full Pauli distance is 1 (a single Z is an undetectable logical Z), as the noise note says', () => {
    const code = getCode('rep3');
    expect(bruteForceDistance(code)).toBe(1);
    expect(bruteForceDistance(code, ['Z'])).toBe(1);
    expect(code.noiseNote).toMatch(/X noise only/);
  });
  it('rsc3 has distance 3 against X-only, Z-only and full Pauli noise', () => {
    const code = getCode('rsc3');
    expect(bruteForceDistance(code, ['X'])).toBe(3);
    expect(bruteForceDistance(code, ['Z'])).toBe(3);
  });
});

describe('CSS structure of rsc3', () => {
  it('H_X · H_Z^T = 0 (every X check overlaps every Z check on an even number of qubits)', () => {
    const code = getCode('rsc3');
    const xs = code.checks.filter((c) => c.type === 'X');
    const zs = code.checks.filter((c) => c.type === 'Z');
    expect(xs.length).toBe(4);
    expect(zs.length).toBe(4);
    for (const x of xs) for (const z of zs) {
      const overlap = x.qubits.filter((q) => z.qubits.includes(q)).length;
      expect(overlap % 2, `${x.id}∩${z.id}`).toBe(0);
    }
  });
});

describe('trivial codes', () => {
  it('have no checks and k = n with single-qubit logicals', () => {
    for (const id of ['trivial2', 'trivial3'] as const) {
      const c = getCode(id);
      expect(c.checks.length).toBe(0);
      expect(c.k).toBe(c.n);
      expect(c.logicalX.length).toBe(c.n);
      expect(c.logicalZ.length).toBe(c.n);
    }
  });
});
