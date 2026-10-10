/**
 * Linear algebra over GF(2) on rows stored as Uint8Array (one byte per bit).
 * Used for stabilizer-group membership: a Pauli R is in the group iff its symplectic row [x|z]
 * lies in the span of the generators' rows.
 */

export interface Gf2Basis {
  /** Reduced row echelon form rows (all non-zero), one per pivot. */
  readonly rows: readonly Uint8Array[];
  /** pivots[i] is the pivot column of rows[i]; strictly increasing. */
  readonly pivots: readonly number[];
  /** Row length. */
  readonly width: number;
}

function assertWidth(rows: readonly Uint8Array[], width: number): void {
  for (const r of rows) {
    if (r.length !== width) throw new RangeError(`GF(2) row width mismatch: ${String(r.length)} vs ${String(width)}`);
  }
}

function xorInto(target: Uint8Array, source: Uint8Array): void {
  for (let j = 0; j < target.length; j++) target[j] = ((target[j] ?? 0) ^ (source[j] ?? 0)) & 1;
}

/** Gaussian elimination to reduced row echelon form. Zero rows are dropped. */
export function rowReduce(rows: readonly Uint8Array[], width?: number): Gf2Basis {
  const w = width ?? rows[0]?.length ?? 0;
  assertWidth(rows, w);
  const work = rows.map((r) => Uint8Array.from(r, (b) => b & 1));
  const pivots: number[] = [];
  const reduced: Uint8Array[] = [];
  let rowIdx = 0;
  for (let col = 0; col < w && rowIdx < work.length; col++) {
    let pivot = -1;
    for (let r = rowIdx; r < work.length; r++) {
      if ((work[r]?.[col] ?? 0) === 1) {
        pivot = r;
        break;
      }
    }
    if (pivot === -1) continue;
    const pivotRow = work[pivot];
    const swapRow = work[rowIdx];
    if (pivotRow === undefined || swapRow === undefined) continue;
    work[pivot] = swapRow;
    work[rowIdx] = pivotRow;
    for (let r = 0; r < work.length; r++) {
      const row = work[r];
      if (r !== rowIdx && row !== undefined && (row[col] ?? 0) === 1) xorInto(row, pivotRow);
    }
    pivots.push(col);
    reduced.push(pivotRow);
    rowIdx++;
  }
  return { rows: reduced, pivots, width: w };
}

export function rank(rows: readonly Uint8Array[], width?: number): number {
  return rowReduce(rows, width).rows.length;
}

/** Remainder of v after reduction by the basis; zero iff v is in the span. */
export function reduceVector(basis: Gf2Basis, v: Uint8Array): Uint8Array {
  if (v.length !== basis.width) throw new RangeError(`vector width ${String(v.length)} does not match basis width ${String(basis.width)}`);
  const rem = Uint8Array.from(v, (b) => b & 1);
  for (let i = 0; i < basis.rows.length; i++) {
    const col = basis.pivots[i];
    const row = basis.rows[i];
    if (col === undefined || row === undefined) continue;
    if ((rem[col] ?? 0) === 1) xorInto(rem, row);
  }
  return rem;
}

export function isZero(v: Uint8Array): boolean {
  for (let j = 0; j < v.length; j++) if ((v[j] ?? 0) !== 0) return false;
  return true;
}

function isBasis(x: readonly Uint8Array[] | Gf2Basis): x is Gf2Basis {
  return !Array.isArray(x) && 'pivots' in x;
}

/** Is v in the GF(2) span of `rows` (or of a pre-reduced basis)? */
export function inSpan(rows: readonly Uint8Array[] | Gf2Basis, v: Uint8Array): boolean {
  const basis = isBasis(rows) ? rows : rowReduce(rows, v.length);
  return isZero(reduceVector(basis, v));
}

/**
 * Express v as a combination of the ORIGINAL rows: returns coefficients c (one per row) with
 * Σ c_i·rows[i] = v, or null when v is not in the span. Deterministic (first representation found).
 */
export function representation(rows: readonly Uint8Array[], v: Uint8Array): Uint8Array | null {
  const w = v.length;
  assertWidth(rows, w);
  const m = rows.length;
  // Augment each row with an identity tag so the elimination tracks which original rows were combined.
  const work = rows.map((r, i) => {
    const aug = new Uint8Array(w + m);
    for (let j = 0; j < w; j++) aug[j] = (r[j] ?? 0) & 1;
    aug[w + i] = 1;
    return aug;
  });
  const rem = new Uint8Array(w + m);
  for (let j = 0; j < w; j++) rem[j] = (v[j] ?? 0) & 1;
  let rowIdx = 0;
  for (let col = 0; col < w && rowIdx < work.length; col++) {
    let pivot = -1;
    for (let r = rowIdx; r < work.length; r++) {
      if ((work[r]?.[col] ?? 0) === 1) {
        pivot = r;
        break;
      }
    }
    if (pivot === -1) continue;
    const pivotRow = work[pivot];
    const swapRow = work[rowIdx];
    if (pivotRow === undefined || swapRow === undefined) continue;
    work[pivot] = swapRow;
    work[rowIdx] = pivotRow;
    for (let r = 0; r < work.length; r++) {
      const row = work[r];
      if (r !== rowIdx && row !== undefined && (row[col] ?? 0) === 1) xorInto(row, pivotRow);
    }
    if ((rem[col] ?? 0) === 1) xorInto(rem, pivotRow);
    rowIdx++;
  }
  for (let j = 0; j < w; j++) if ((rem[j] ?? 0) !== 0) return null;
  return rem.slice(w);
}
