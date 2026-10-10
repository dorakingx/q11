/**
 * Deterministic generator for fixtures/cases/*.json and the `expected` blocks of fixtures/missions.json.
 * Pure: returns file contents keyed by path relative to fixtures/. scripts/gen-fixtures.ts writes them.
 * Same seed ⇒ byte-identical output (stable JSON formatting, mulberry32 PRNG).
 */
import type { Circuit, CodeId, Gate, Pauli, PauliLetter, StabilizerCode } from './types';
import { fromString, identity, multiply, pauliFromIndex, setLetter, toString } from './pauli';
import { propagateFinal } from './gates';
import { getCode } from './codes';
import { evaluate, syndrome, syndromeToArray } from './verdict';
import { lookupDecoder } from './decoder';
import { mulberry32, type Rng } from './rng';
import { computeExpected, parseMission } from './missions';
import { stableStringify, type JsonValue } from './stable-json';

export const FIXTURE_SEED = 20261010;
export const ENGINE_VERSION = '1';
export const GENERATOR_NAME = 'scripts/gen-fixtures.ts';

export const CASE_FILES = [
  'cases/gates-exhaustive.json',
  'cases/propagation-1000.json',
  'cases/rsc3-single.json',
  'cases/rsc3-logical.json',
  'cases/verdicts-1000.json',
] as const;

type Letter = PauliLetter;
const NON_IDENTITY: readonly Letter[] = ['X', 'Z', 'Y'];
const ALL_LETTERS: readonly Letter[] = ['I', 'X', 'Z', 'Y'];

function gateJson(g: Gate): JsonValue {
  switch (g.kind) {
    case 'H':
    case 'S':
      return { kind: g.kind, q: g.q };
    case 'CNOT':
      return { kind: g.kind, c: g.c, t: g.t };
    case 'CZ':
    case 'SWAP':
      return { kind: g.kind, a: g.a, b: g.b };
  }
}

function circuitJson(c: Circuit): JsonValue {
  return c.map(gateJson);
}

function envelope(cases: JsonValue[], seed: number | null): JsonValue {
  const out: { [k: string]: JsonValue } = { generator: GENERATOR_NAME, engineVersion: ENGINE_VERSION, count: cases.length, cases };
  if (seed !== null) out['seed'] = seed;
  return out;
}

function gateCase(id: number, n: number, circuit: Circuit, input: Pauli): JsonValue {
  return { id, kind: 'gate', n, circuit: circuitJson(circuit), input: toString(input), output: toString(propagateFinal(input, circuit)) };
}

/** All 4 single-qubit Paulis through H and S; all 16 two-qubit Paulis through CNOT(0,1), CNOT(1,0), CZ, SWAP. */
export function gatesExhaustive(): JsonValue {
  const cases: JsonValue[] = [];
  let id = 0;
  const oneQ: Gate[] = [{ kind: 'H', q: 0 }, { kind: 'S', q: 0 }];
  for (const g of oneQ) for (let i = 0; i < 4; i++) cases.push(gateCase(id++, 1, [g], pauliFromIndex(1, i)));
  const twoQ: Gate[] = [
    { kind: 'CNOT', c: 0, t: 1 },
    { kind: 'CNOT', c: 1, t: 0 },
    { kind: 'CZ', a: 0, b: 1 },
    { kind: 'SWAP', a: 0, b: 1 },
  ];
  for (const g of twoQ) for (let i = 0; i < 16; i++) cases.push(gateCase(id++, 2, [g], pauliFromIndex(2, i)));
  return envelope(cases, null);
}

function randomGate(rng: Rng, n: number): Gate {
  const kinds: readonly Gate['kind'][] = ['H', 'S', 'CNOT', 'CZ', 'SWAP'];
  const kind = rng.pick(kinds);
  const a = rng.int(n);
  let b = rng.int(n - 1);
  if (b >= a) b++;
  switch (kind) {
    case 'H':
    case 'S':
      return { kind, q: a };
    case 'CNOT':
      return { kind, c: a, t: b };
    case 'CZ':
    case 'SWAP':
      return { kind, a, b };
  }
}

function randomPauli(rng: Rng, n: number): Pauli {
  let p = identity(n);
  for (let q = 0; q < n; q++) p = setLetter(p, q, rng.pick(ALL_LETTERS));
  return p;
}

/** Random Pauli with exactly `w` non-identity qubits using letters from `letters`. */
function randomPauliOfWeight(rng: Rng, n: number, w: number, letters: readonly Letter[]): Pauli {
  const qubits: number[] = [];
  const pool = Array.from({ length: n }, (_, i) => i);
  for (let i = 0; i < w; i++) {
    const k = rng.int(pool.length);
    const q = pool[k];
    if (q === undefined) throw new Error('unreachable');
    pool.splice(k, 1);
    qubits.push(q);
  }
  let p = identity(n);
  for (const q of qubits) p = setLetter(p, q, rng.pick(letters));
  return p;
}

/** 1000 random circuits on 2–4 qubits, 1–8 gates, random input Pauli (first case id continues from `startId`). */
export function propagationCases(rng: Rng, count: number): JsonValue {
  const cases: JsonValue[] = [];
  for (let id = 0; id < count; id++) {
    const n = 2 + rng.int(3);
    const depth = 1 + rng.int(8);
    const circuit: Gate[] = [];
    for (let i = 0; i < depth; i++) circuit.push(randomGate(rng, n));
    const input = randomPauli(rng, n);
    cases.push({ id, kind: 'propagation', n, circuit: circuitJson(circuit), input: toString(input), output: toString(propagateFinal(input, circuit)) });
  }
  return envelope(cases, FIXTURE_SEED);
}

function verdictFields(code: StabilizerCode, error: Pauli, correction: Pauli): { [k: string]: JsonValue } {
  const v = evaluate(code, error, correction);
  return {
    code: code.id,
    error: toString(error),
    correction: toString(correction),
    syndromeE: syndromeToArray(syndrome(code, error)),
    residual: toString(v.residual),
    syndromeR: syndromeToArray(v.syndrome),
    verdict: v.kind,
    logicalFlip: { x: [...v.logicalFlip.x], z: [...v.logicalFlip.z] },
    residualWeight: v.weight,
  };
}

/** Identity + all 27 weight-1 errors on rsc3, with syndrome, lookup correction and verdict. */
export function rsc3Single(): JsonValue {
  const code = getCode('rsc3');
  const decoder = lookupDecoder(code);
  const cases: JsonValue[] = [];
  let id = 0;
  const push = (error: Pauli): void => {
    const s = syndrome(code, error);
    const correction = decoder.decode(s);
    cases.push({ id: id++, kind: 'single', ...verdictFields(code, error, correction), syndrome: syndromeToArray(s) });
  };
  push(identity(code.n));
  for (const letter of NON_IDENTITY) for (let q = 0; q < code.n; q++) push(setLetter(identity(code.n), q, letter));
  return envelope(cases, null);
}

function stabilizerProducts(code: StabilizerCode): { label: string; pauli: Pauli }[] {
  const out: { label: string; pauli: Pauli }[] = [];
  const gens = code.checks;
  for (const g of gens) out.push({ label: g.id, pauli: g.pauli });
  for (let i = 0; i < gens.length; i++) {
    for (let j = i + 1; j < gens.length; j++) {
      const a = gens[i];
      const b = gens[j];
      if (a === undefined || b === undefined) continue;
      out.push({ label: `${a.id}*${b.id}`, pauli: multiply(a.pauli, b.pauli) });
    }
  }
  let all = identity(code.n);
  for (const g of gens) all = multiply(all, g.pauli);
  out.push({ label: gens.map((g) => g.id).join('*'), pauli: all });
  return out;
}

/** Logical X, Z, Y (and each times a few stabilizers) → logical-error; stabilizer products → success. */
export function rsc3Logical(): JsonValue {
  const code = getCode('rsc3');
  const lx = code.logicalX[0]?.pauli;
  const lz = code.logicalZ[0]?.pauli;
  if (lx === undefined || lz === undefined) throw new Error('rsc3 must have one logical qubit');
  const ly = multiply(lx, lz);
  const I = identity(code.n);
  const cases: JsonValue[] = [];
  let id = 0;
  const stabs = stabilizerProducts(code);
  const dressing = [stabs[0], stabs[4], stabs[8], stabs[stabs.length - 1]].filter((s): s is { label: string; pauli: Pauli } => s !== undefined);
  for (const [label, logical] of [
    ['X', lx],
    ['Z', lz],
    ['Y', ly],
  ] as const) {
    cases.push({ id: id++, kind: 'logical', label: `logical ${label}`, ...verdictFields(code, logical, I) });
    for (const d of dressing) {
      cases.push({ id: id++, kind: 'logical', label: `logical ${label} * ${d.label}`, ...verdictFields(code, multiply(logical, d.pauli), I) });
    }
  }
  for (const s of stabs) cases.push({ id: id++, kind: 'stabilizer', label: s.label, ...verdictFields(code, s.pauli, I) });
  return envelope(cases, null);
}

function randomStabilizer(rng: Rng, code: StabilizerCode): Pauli {
  let s = identity(code.n);
  for (const g of code.checks) if (rng.int(2) === 1) s = multiply(s, g.pauli);
  return s;
}

/** 1000 random (error, correction) pairs on rsc3 and rep3, weights 0–3, including degenerate pairs. */
export function verdictCases(rng: Rng, count: number): JsonValue {
  const codes: readonly CodeId[] = ['rsc3', 'rsc3', 'rsc3', 'rep3'];
  const cases: JsonValue[] = [];
  for (let id = 0; id < count; id++) {
    const code = getCode(rng.pick(codes));
    const decoder = lookupDecoder(code);
    const letters = code.id === 'rep3' && rng.int(4) !== 0 ? (['X'] as const) : NON_IDENTITY;
    const error = randomPauliOfWeight(rng, code.n, rng.int(Math.min(3, code.n) + 1), letters);
    const s = syndrome(code, error);
    const mode = rng.int(5);
    let correction: Pauli;
    let strategy: string;
    if (mode === 0) {
      correction = decoder.decode(s);
      strategy = 'decoder';
    } else if (mode === 1) {
      correction = multiply(decoder.decode(s), randomStabilizer(rng, code));
      strategy = 'decoder*stabilizer';
    } else if (mode === 2) {
      correction = multiply(error, randomStabilizer(rng, code));
      strategy = 'error*stabilizer';
    } else {
      correction = randomPauliOfWeight(rng, code.n, rng.int(Math.min(3, code.n) + 1), letters);
      strategy = 'random';
    }
    cases.push({ id, kind: 'verdict', strategy, ...verdictFields(code, error, correction) });
  }
  return envelope(cases, FIXTURE_SEED);
}

export interface MissionsFillResult {
  readonly text: string;
  readonly expected: readonly { id: string; expected: JsonValue }[];
}

/** Re-emit missions.json with every `expected` block recomputed, in stable formatting. */
export function fillMissions(rawMissions: unknown): MissionsFillResult {
  if (!Array.isArray(rawMissions)) throw new Error('missions.json root must be an array');
  const expectedOut: { id: string; expected: JsonValue }[] = [];
  const filled: JsonValue[] = rawMissions.map((raw: unknown, i) => {
    const m = parseMission(raw, `missions[${String(i)}]`);
    const exp = computeExpected(m);
    const expJson: JsonValue = {
      syndrome: [...exp.syndrome],
      propagated: exp.propagated,
      minWeightCorrection: exp.minWeightCorrection,
      minWeightVerdict: exp.minWeightVerdict,
    };
    expectedOut.push({ id: m.id, expected: expJson });
    return {
      id: m.id,
      index: m.index,
      title: m.title,
      code: m.code,
      kind: m.kind,
      training: m.training.map((t) => ({ error: t.error, circuit: circuitJson(t.circuit), caption: t.caption })),
      challenge: { error: m.challenge.error, circuit: circuitJson(m.challenge.circuit) },
      allowed: [...m.allowed],
      budget: m.budget,
      briefing: m.briefing,
      debrief: { ...m.debrief },
      expected: expJson,
    };
  });
  return { text: stableStringify(filled), expected: expectedOut };
}

/** Every generated fixture file, keyed by path relative to fixtures/. */
export function generateFixtures(rawMissions: unknown, seed: number = FIXTURE_SEED): Map<string, string> {
  const files = new Map<string, string>();
  files.set('cases/gates-exhaustive.json', stableStringify(gatesExhaustive()));
  files.set('cases/propagation-1000.json', stableStringify(propagationCases(mulberry32(seed), 1000)));
  files.set('cases/rsc3-single.json', stableStringify(rsc3Single()));
  files.set('cases/rsc3-logical.json', stableStringify(rsc3Logical()));
  files.set('cases/verdicts-1000.json', stableStringify(verdictCases(mulberry32(seed ^ 0x5bd1e995), 1000)));
  files.set('missions.json', fillMissions(rawMissions).text);
  return files;
}

/** Sanity helper used by tests: parse a Pauli string list. */
export function paulis(strings: readonly string[]): Pauli[] {
  return strings.map(fromString);
}
