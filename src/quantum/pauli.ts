/**
 * Binary symplectic Pauli algebra (phase dropped).
 *
 * A Pauli on n qubits is `(x, z)` with x[i], z[i] ∈ {0,1}. Letters: I=(0,0), X=(1,0), Z=(0,1), Y=(1,1).
 * Composition is bitwise XOR; p·p = I always. Strings are qubit-0-first ("XIZ" = X on q0, Z on q2).
 *
 * Numeric encoding (used for deterministic tie-breaking): digit d_i = x_i + 2·z_i ∈ {0:I, 1:X, 2:Z, 3:Y},
 * index = Σ_i d_i · 4^i. The identity has index 0 and X on qubit 0 has index 1.
 */
import type { Pauli, PauliLetter } from './types';

/** Letter for (x, z) bits: index = x + 2z. */
const LETTER_BY_BITS: readonly PauliLetter[] = ['I', 'X', 'Z', 'Y'];

/** Largest n for which integer bit masks are used (JS bitwise ops are 32-bit). */
export const MAX_MASK_QUBITS = 30;

function assertQubitCount(n: number): void {
  if (!Number.isInteger(n) || n < 0) throw new RangeError(`qubit count must be a non-negative integer, got ${String(n)}`);
}

export function assertQubitIndex(i: number, n: number): void {
  if (!Number.isInteger(i) || i < 0 || i >= n) throw new RangeError(`qubit index ${String(i)} out of range for n=${String(n)}`);
}

export function isPauliLetter(s: string): s is PauliLetter {
  return s === 'I' || s === 'X' || s === 'Y' || s === 'Z';
}

/** (x, z) bits of a single letter. */
export function letterToBits(letter: PauliLetter): { readonly x: 0 | 1; readonly z: 0 | 1 } {
  switch (letter) {
    case 'I':
      return { x: 0, z: 0 };
    case 'X':
      return { x: 1, z: 0 };
    case 'Z':
      return { x: 0, z: 1 };
    case 'Y':
      return { x: 1, z: 1 };
  }
}

export function bitsToLetter(x: number, z: number): PauliLetter {
  return LETTER_BY_BITS[((x & 1) | ((z & 1) << 1)) as 0 | 1 | 2 | 3] ?? 'I';
}

export function identity(n: number): Pauli {
  assertQubitCount(n);
  return { n, x: new Uint8Array(n), z: new Uint8Array(n) };
}

/** Parse a qubit-0-first Pauli string of letters I X Y Z. */
export function fromString(s: string): Pauli {
  const n = s.length;
  const x = new Uint8Array(n);
  const z = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const c = s[i] ?? '';
    if (!isPauliLetter(c)) throw new Error(`invalid Pauli letter '${c}' at position ${String(i)} in "${s}"`);
    const b = letterToBits(c);
    x[i] = b.x;
    z[i] = b.z;
  }
  return { n, x, z };
}

export function toString(p: Pauli): string {
  let out = '';
  for (let i = 0; i < p.n; i++) out += bitsToLetter(p.x[i] ?? 0, p.z[i] ?? 0);
  return out;
}

export function clone(p: Pauli): Pauli {
  return { n: p.n, x: new Uint8Array(p.x), z: new Uint8Array(p.z) };
}

export function equals(a: Pauli, b: Pauli): boolean {
  if (a.n !== b.n) return false;
  for (let i = 0; i < a.n; i++) {
    if ((a.x[i] ?? 0) !== (b.x[i] ?? 0) || (a.z[i] ?? 0) !== (b.z[i] ?? 0)) return false;
  }
  return true;
}

export function isIdentity(p: Pauli): boolean {
  for (let i = 0; i < p.n; i++) if ((p.x[i] ?? 0) !== 0 || (p.z[i] ?? 0) !== 0) return false;
  return true;
}

/** Composition a·b with the global phase dropped: bitwise XOR of x and of z. */
export function multiply(a: Pauli, b: Pauli): Pauli {
  if (a.n !== b.n) throw new RangeError(`cannot multiply Paulis on ${String(a.n)} and ${String(b.n)} qubits`);
  const x = new Uint8Array(a.n);
  const z = new Uint8Array(a.n);
  for (let i = 0; i < a.n; i++) {
    x[i] = (a.x[i] ?? 0) ^ (b.x[i] ?? 0);
    z[i] = (a.z[i] ?? 0) ^ (b.z[i] ?? 0);
  }
  return { n: a.n, x, z };
}

/** Number of qubits with a non-identity letter. */
export function weight(p: Pauli): number {
  let w = 0;
  for (let i = 0; i < p.n; i++) if (((p.x[i] ?? 0) | (p.z[i] ?? 0)) !== 0) w++;
  return w;
}

/** Qubit indices with a non-identity letter, ascending. */
export function support(p: Pauli): number[] {
  const out: number[] = [];
  for (let i = 0; i < p.n; i++) if (((p.x[i] ?? 0) | (p.z[i] ?? 0)) !== 0) out.push(i);
  return out;
}

/** Symplectic product parity: 0 when a and b commute, 1 when they anticommute. */
export function symplecticProduct(a: Pauli, b: Pauli): 0 | 1 {
  if (a.n !== b.n) throw new RangeError(`cannot compare Paulis on ${String(a.n)} and ${String(b.n)} qubits`);
  let s = 0;
  for (let i = 0; i < a.n; i++) {
    s ^= ((a.x[i] ?? 0) & (b.z[i] ?? 0)) ^ ((a.z[i] ?? 0) & (b.x[i] ?? 0));
  }
  return (s & 1) as 0 | 1;
}

export function commutes(a: Pauli, b: Pauli): boolean {
  return symplecticProduct(a, b) === 0;
}

export function anticommutes(a: Pauli, b: Pauli): boolean {
  return symplecticProduct(a, b) === 1;
}

export function letterAt(p: Pauli, i: number): PauliLetter {
  assertQubitIndex(i, p.n);
  return bitsToLetter(p.x[i] ?? 0, p.z[i] ?? 0);
}

/** Returns a new Pauli with qubit i set to `letter` (the input is not mutated). */
export function setLetter(p: Pauli, i: number, letter: PauliLetter): Pauli {
  assertQubitIndex(i, p.n);
  const out = clone(p);
  const b = letterToBits(letter);
  out.x[i] = b.x;
  out.z[i] = b.z;
  return out;
}

/** The Pauli with `letter` on every qubit in `qubits` and I elsewhere. Qubits must be distinct and in range. */
export function fromSupport(n: number, letter: PauliLetter, qubits: readonly number[]): Pauli {
  const p = identity(n);
  const seen = new Set<number>();
  const b = letterToBits(letter);
  for (const q of qubits) {
    assertQubitIndex(q, n);
    if (seen.has(q)) throw new RangeError(`duplicate qubit ${String(q)} in support`);
    seen.add(q);
    p.x[q] = b.x;
    p.z[q] = b.z;
  }
  return p;
}

/** Integer bit masks (bit i ↔ qubit i). Only for n ≤ MAX_MASK_QUBITS. */
export function toMasks(p: Pauli): { readonly x: number; readonly z: number } {
  if (p.n > MAX_MASK_QUBITS) throw new RangeError(`masks support at most ${String(MAX_MASK_QUBITS)} qubits`);
  let x = 0;
  let z = 0;
  for (let i = 0; i < p.n; i++) {
    if ((p.x[i] ?? 0) !== 0) x |= 1 << i;
    if ((p.z[i] ?? 0) !== 0) z |= 1 << i;
  }
  return { x, z };
}

export function fromMasks(n: number, xMask: number, zMask: number): Pauli {
  if (n > MAX_MASK_QUBITS) throw new RangeError(`masks support at most ${String(MAX_MASK_QUBITS)} qubits`);
  const p = identity(n);
  for (let i = 0; i < n; i++) {
    p.x[i] = (xMask >>> i) & 1;
    p.z[i] = (zMask >>> i) & 1;
  }
  return p;
}

/** Deterministic numeric encoding: Σ_i (x_i + 2 z_i) · 4^i. Exact for n ≤ 26 (fits in 2^53). */
export function pauliIndex(p: Pauli): number {
  if (p.n > 26) throw new RangeError('pauliIndex supports at most 26 qubits');
  let idx = 0;
  let place = 1;
  for (let i = 0; i < p.n; i++) {
    idx += ((p.x[i] ?? 0) + 2 * (p.z[i] ?? 0)) * place;
    place *= 4;
  }
  return idx;
}

/** Inverse of pauliIndex. */
export function pauliFromIndex(n: number, index: number): Pauli {
  if (!Number.isInteger(index) || index < 0 || index >= 4 ** n) {
    throw new RangeError(`Pauli index ${String(index)} out of range for n=${String(n)}`);
  }
  const p = identity(n);
  let rest = index;
  for (let i = 0; i < n; i++) {
    const d = rest % 4;
    rest = Math.floor(rest / 4);
    p.x[i] = d & 1;
    p.z[i] = (d >> 1) & 1;
  }
  return p;
}

/** Symplectic row [x | z] of length 2n, as used for GF(2) membership tests. */
export function toSymplecticRow(p: Pauli): Uint8Array {
  const row = new Uint8Array(2 * p.n);
  row.set(p.x, 0);
  row.set(p.z, p.n);
  return row;
}
