/**
 * Clifford conjugation of Pauli frames. A Pauli error E before a gate U becomes U E U† after it.
 * Each rule below is exact for the Pauli up to global phase:
 *   H:        swap x[q], z[q]
 *   S:        z[q] ^= x[q]
 *   CNOT(c,t): x[t] ^= x[c]; z[c] ^= z[t]      (X copies forward, Z copies backward)
 *   CZ(a,b):   z[a] ^= x[b]; z[b] ^= x[a]
 *   SWAP:      swap both components
 * Propagation happens only through gates; nothing else moves a fire.
 */
import type { Circuit, Gate, Pauli } from './types';
import { assertQubitIndex, clone } from './pauli';

/** Qubits touched by a gate, in gate order. */
export function gateQubits(gate: Gate): readonly number[] {
  switch (gate.kind) {
    case 'H':
    case 'S':
      return [gate.q];
    case 'CNOT':
      return [gate.c, gate.t];
    case 'CZ':
    case 'SWAP':
      return [gate.a, gate.b];
  }
}

/** Throws RangeError when a gate references an out-of-range qubit or the same qubit twice. */
export function validateGate(gate: Gate, n: number): void {
  const qs = gateQubits(gate);
  for (const q of qs) assertQubitIndex(q, n);
  if (qs.length === 2 && qs[0] === qs[1]) {
    throw new RangeError(`${gate.kind} needs two distinct qubits, got ${String(qs[0])} twice`);
  }
}

export function validateCircuit(circuit: Circuit, n: number): void {
  for (const g of circuit) validateGate(g, n);
}

/** Returns a new Pauli: the frame after conjugation by `gate`. The input is not mutated. */
export function applyGate(p: Pauli, gate: Gate): Pauli {
  validateGate(gate, p.n);
  const out = clone(p);
  const { x, z } = out;
  switch (gate.kind) {
    case 'H': {
      const q = gate.q;
      const xq = x[q] ?? 0;
      x[q] = z[q] ?? 0;
      z[q] = xq;
      break;
    }
    case 'S': {
      const q = gate.q;
      z[q] = (z[q] ?? 0) ^ (x[q] ?? 0);
      break;
    }
    case 'CNOT': {
      const { c, t } = gate;
      x[t] = (x[t] ?? 0) ^ (x[c] ?? 0);
      z[c] = (z[c] ?? 0) ^ (z[t] ?? 0);
      break;
    }
    case 'CZ': {
      const { a, b } = gate;
      const xa = x[a] ?? 0;
      const xb = x[b] ?? 0;
      z[a] = (z[a] ?? 0) ^ xb;
      z[b] = (z[b] ?? 0) ^ xa;
      break;
    }
    case 'SWAP': {
      const { a, b } = gate;
      const xa = x[a] ?? 0;
      const za = z[a] ?? 0;
      x[a] = x[b] ?? 0;
      z[a] = z[b] ?? 0;
      x[b] = xa;
      z[b] = za;
      break;
    }
  }
  return out;
}

export interface Trajectory {
  /** frames[0] is the input; frames[i] is the frame after gate i-1. Length = circuit.length + 1. */
  readonly frames: readonly Pauli[];
}

/** Propagate a Pauli frame through a circuit, keeping every intermediate frame for replay. */
export function propagate(p: Pauli, circuit: Circuit): Trajectory {
  validateCircuit(circuit, p.n);
  const frames: Pauli[] = [clone(p)];
  let cur = p;
  for (const g of circuit) {
    cur = applyGate(cur, g);
    frames.push(cur);
  }
  return { frames };
}

/** Final frame only. */
export function propagateFinal(p: Pauli, circuit: Circuit): Pauli {
  const t = propagate(p, circuit);
  return t.frames[t.frames.length - 1] ?? clone(p);
}
