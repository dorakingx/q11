/**
 * Q11 quantum engine — public contract.
 *
 * Everything here is a Clifford + Pauli *educational* model:
 *  - A Pauli operator on n qubits is a binary symplectic pair (x, z). Y = X·Z (both bits set).
 *  - Composition of Pauli frames is bitwise XOR. Global phase is dropped.
 *  - Propagation happens ONLY through gates. H swaps x/z; S: z ^= x; CNOT(c,t): x[t] ^= x[c], z[c] ^= z[t].
 *  - Codes are stabilizer codes given by generators; verdicts use GF(2) linear algebra.
 *  - Perfect syndrome model (no measurement noise) unless a mission says otherwise.
 */

/** Binary symplectic Pauli. x[i] = 1 means an X component on qubit i, z[i] = 1 a Z component. */
export interface Pauli {
  readonly n: number;
  readonly x: Uint8Array;
  readonly z: Uint8Array;
}

/** Single-qubit Pauli letter. */
export type PauliLetter = 'I' | 'X' | 'Y' | 'Z';

/** Clifford gates supported by the propagation engine. Qubit indices are 0-based. */
export type Gate =
  | { readonly kind: 'H'; readonly q: number }
  | { readonly kind: 'S'; readonly q: number }
  | { readonly kind: 'CNOT'; readonly c: number; readonly t: number }
  | { readonly kind: 'CZ'; readonly a: number; readonly b: number }
  | { readonly kind: 'SWAP'; readonly a: number; readonly b: number };

export type Circuit = readonly Gate[];

/** Identifier of a code supported by the engine. `trivial` = no stabilizers (propagation lessons). */
export type CodeId = 'trivial2' | 'trivial3' | 'rep3' | 'rsc3';

/** Type of a check / stabilizer generator (CSS codes only). */
export type CheckType = 'X' | 'Z';

export interface Check {
  /** Stable id used by UI + fixtures, e.g. "Z0", "X3". */
  readonly id: string;
  readonly type: CheckType;
  /** Data qubits in the support, ascending. */
  readonly qubits: readonly number[];
  /** Full Pauli form on n qubits. */
  readonly pauli: Pauli;
}

export interface LogicalOperator {
  readonly label: 'X' | 'Z';
  readonly pauli: Pauli;
}

export interface StabilizerCode {
  readonly id: CodeId;
  readonly name: string;
  /** Number of data qubits. */
  readonly n: number;
  /** Number of logical qubits (n - rank). */
  readonly k: number;
  /** Distance under the code's declared noise model (see noiseNote): rsc3 = 3 for all Paulis; rep3 = 3 for X noise only (its full-Pauli distance is 1). Machine-verified in tests. */
  readonly distance: number;
  /** Independent generators, in a fixed order (Z checks first, then X checks for CSS codes). */
  readonly checks: readonly Check[];
  readonly logicalX: readonly LogicalOperator[];
  readonly logicalZ: readonly LogicalOperator[];
  /** Human note on the noise model this code is meant for (e.g. rep3 = X noise only). */
  readonly noiseNote: string;
}

/** 0/1 per check, in `code.checks` order. */
export type Syndrome = Uint8Array;

export type VerdictKind =
  /** Residual R = C·E is in the stabilizer group (up to phase): logical info preserved. */
  | 'success'
  /** R commutes with every check but is not in the group: a logical error happened. */
  | 'logical-error'
  /** R anticommutes with at least one check: a detectable error remains (alarms still ringing). */
  | 'detectable';

export interface Verdict {
  readonly kind: VerdictKind;
  /** The residual operator R = C·E (XOR). */
  readonly residual: Pauli;
  /** Residual syndrome of R (all zeros for success / logical-error). */
  readonly syndrome: Syndrome;
  /** For logical-error (and success → all false): which logical operators R acts as.
   *  logicalFlip.x[i] = true means R anticommutes with logical Z_i (i.e. behaves like logical X on qubit i). */
  readonly logicalFlip: { readonly x: readonly boolean[]; readonly z: readonly boolean[] };
  /** Weight of the residual. */
  readonly weight: number;
}

/** A decoder maps a syndrome to a proposed correction using ONLY the syndrome and the public code. */
export interface Decoder {
  readonly name: string;
  decode(syndrome: Syndrome): Pauli;
}

/** Serialisable form used in fixtures and the Python bridge. */
export interface PauliJSON {
  /** Pauli string, qubit 0 first, e.g. "XIZ" (little-endian by qubit index, NOT Qiskit's reversed order). */
  readonly s: string;
}
