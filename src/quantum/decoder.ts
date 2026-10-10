/**
 * Minimum-weight lookup decoder. Built by brute force over all 4^n Paulis (n ≤ MAX_LOOKUP_QUBITS).
 * For each syndrome the winner is chosen by, in order:
 *   1. lowest Pauli weight (number of non-identity qubits),
 *   2. lowest symplectic weight |x| + |z| (a Y counts as two components) — this is the choice that
 *      independent X/Z decoding of a CSS code makes, and it matters: e.g. on rsc3 the alarms of X1·Z7
 *      are also explained by Y1·Z4 (same qubit count), and the two differ by a logical Z,
 *   3. lowest numeric encoding (see pauliIndex in pauli.ts) for determinism.
 * `minWeightCorrections` returns every Pauli tied on keys 1 and 2.
 *
 * The decoder sees ONLY the syndrome and the public code. It never reads the true error.
 */
import type { Decoder, Pauli, StabilizerCode, Syndrome } from './types';
import { fromMasks, identity, multiply, pauliIndex, toMasks } from './pauli';
import { inStabilizerGroup, syndromeKey } from './verdict';

/** Brute force is 4^n syndromes computations; 4^9 = 262144 for rsc3 takes well under a second. */
export const MAX_LOOKUP_QUBITS = 10;

interface TableEntry {
  readonly weight: number;
  /** Symplectic weight |x| + |z| of the candidates (secondary key). */
  readonly symplecticWeight: number;
  /** Encodings of every Pauli tied on both keys, ascending (first = decoder output). */
  readonly candidates: number[];
}

interface LookupTable {
  readonly n: number;
  readonly entries: Map<string, TableEntry>;
}

const tableCache = new Map<string, LookupTable>();

function parityTable(bits: number): Uint8Array {
  const size = 1 << bits;
  const t = new Uint8Array(size);
  for (let i = 1; i < size; i++) t[i] = (t[i >> 1] ?? 0) ^ (i & 1);
  return t;
}

function popcountTable(bits: number): Uint8Array {
  const size = 1 << bits;
  const t = new Uint8Array(size);
  for (let i = 1; i < size; i++) t[i] = (t[i >> 1] ?? 0) + (i & 1);
  return t;
}

function buildTable(code: StabilizerCode): LookupTable {
  const n = code.n;
  if (n > MAX_LOOKUP_QUBITS) throw new RangeError(`lookup decoder supports at most ${String(MAX_LOOKUP_QUBITS)} qubits`);
  const cx = code.checks.map((c) => toMasks(c.pauli).x);
  const cz = code.checks.map((c) => toMasks(c.pauli).z);
  const parity = parityTable(n);
  const popcount = popcountTable(n);
  const entries = new Map<string, TableEntry>();
  const total = 4 ** n;
  // Enumerate in increasing pauliIndex order so the first hit per (syndrome, weight) is the tie-break winner.
  for (let idx = 0; idx < total; idx++) {
    let x = 0;
    let z = 0;
    let rest = idx;
    for (let q = 0; q < n; q++) {
      const d = rest & 3;
      rest >>= 2;
      if ((d & 1) !== 0) x |= 1 << q;
      if ((d & 2) !== 0) z |= 1 << q;
    }
    const w = popcount[x | z] ?? 0;
    const sw = (popcount[x] ?? 0) + (popcount[z] ?? 0);
    let key = '';
    for (let i = 0; i < cx.length; i++) {
      key += (parity[(x & (cz[i] ?? 0)) ^ (z & (cx[i] ?? 0))] ?? 0) === 0 ? '0' : '1';
    }
    const cur = entries.get(key);
    if (cur === undefined || w < cur.weight || (w === cur.weight && sw < cur.symplecticWeight)) {
      entries.set(key, { weight: w, symplecticWeight: sw, candidates: [idx] });
    } else if (w === cur.weight && sw === cur.symplecticWeight) {
      cur.candidates.push(idx);
    }
  }
  return { n, entries };
}

function tableFor(code: StabilizerCode): LookupTable {
  let t = tableCache.get(code.id);
  if (t === undefined) {
    t = buildTable(code);
    tableCache.set(code.id, t);
  }
  return t;
}

function decodeIndex(n: number, idx: number): Pauli {
  let x = 0;
  let z = 0;
  let rest = idx;
  for (let q = 0; q < n; q++) {
    const d = rest & 3;
    rest >>= 2;
    if ((d & 1) !== 0) x |= 1 << q;
    if ((d & 2) !== 0) z |= 1 << q;
  }
  return fromMasks(n, x, z);
}

function entryFor(code: StabilizerCode, s: Syndrome): TableEntry {
  if (s.length !== code.checks.length) {
    throw new RangeError(`syndrome has ${String(s.length)} bits but code ${code.id} has ${String(code.checks.length)} checks`);
  }
  const entry = tableFor(code).entries.get(syndromeKey(s));
  if (entry === undefined) throw new Error(`syndrome ${syndromeKey(s)} is not produced by any Pauli on code ${code.id}`);
  return entry;
}

/** Every Pauli tied for minimum (weight, symplectic weight) on the syndrome, in ascending numeric encoding. */
export function minWeightCorrections(code: StabilizerCode, s: Syndrome): Pauli[] {
  return entryFor(code, s).candidates.map((idx) => decodeIndex(code.n, idx));
}

/** The minimum weight of any Pauli producing the syndrome. */
export function minWeightFor(code: StabilizerCode, s: Syndrome): number {
  return entryFor(code, s).weight;
}

/** The lookup decoder for a code. decode() returns identity for the zero syndrome. */
export function lookupDecoder(code: StabilizerCode): Decoder {
  const table = tableFor(code);
  return {
    name: `min-weight lookup (${code.id})`,
    decode(s: Syndrome): Pauli {
      const entry = entryFor(code, s);
      const first = entry.candidates[0];
      if (first === undefined) return identity(table.n);
      return decodeIndex(table.n, first);
    },
  };
}

/** True when a and b differ only by a stabilizer (a·b ∈ group): equivalent corrections. */
export function minWeightEquivalent(code: StabilizerCode, a: Pauli, b: Pauli): boolean {
  return inStabilizerGroup(code, multiply(a, b));
}

/** Numeric encoding helper re-exported for fixtures / tests. */
export { pauliIndex };
