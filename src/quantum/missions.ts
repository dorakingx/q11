/**
 * Mission definitions (fixtures/missions.json) — validated on load, with the engine's recomputation of
 * the `expected` block so the UI, the fixture generator and the Python checker agree on one rule set.
 *
 * `expected` rules:
 *  - syndrome: syndrome of the TRUE (unpropagated) challenge error on the mission's code (empty for codes without checks).
 *  - propagated: the challenge error pushed through the challenge circuit (equals the error when the circuit is empty).
 *  - minWeightCorrection: dispatch missions → lookup-decoder output for `syndrome`;
 *                         propagation missions → the propagated error itself (the ideal dispatch when the fire path is known).
 *  - minWeightVerdict: verdict of that correction against the propagated error.
 */
import missionsJson from '../../fixtures/missions.json';
import type { Circuit, CodeId, Gate, PauliLetter, VerdictKind } from './types';
import { isCodeId, getCode } from './codes';
import { fromString, isPauliLetter, letterAt, toString, weight } from './pauli';
import { propagateFinal, validateCircuit } from './gates';
import { evaluate, syndrome, syndromeToArray } from './verdict';
import { lookupDecoder } from './decoder';

export type MissionKind = 'dispatch' | 'propagation';

export const VERDICT_KINDS: readonly VerdictKind[] = ['success', 'logical-error', 'detectable'];

export interface TrainingStep {
  /** Visible true error, qubit-0-first. */
  readonly error: string;
  readonly circuit: Circuit;
  readonly caption: string;
}

export interface MissionChallenge {
  /** TRUE hidden error. Must never reach the challenge view. */
  readonly error: string;
  readonly circuit: Circuit;
}

export interface MissionExpected {
  readonly syndrome: readonly number[];
  readonly propagated: string;
  readonly minWeightCorrection: string;
  readonly minWeightVerdict: VerdictKind;
}

export interface MissionDefinition {
  readonly id: string;
  readonly index: number;
  readonly title: string;
  readonly code: CodeId;
  readonly kind: MissionKind;
  readonly training: readonly TrainingStep[];
  readonly challenge: MissionChallenge;
  readonly allowed: readonly PauliLetter[];
  readonly budget: number;
  readonly briefing: string;
  readonly debrief: Readonly<Record<VerdictKind, string>>;
  readonly expected: MissionExpected;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function str(v: unknown, what: string): string {
  if (typeof v !== 'string') throw new Error(`missions.json: ${what} must be a string`);
  return v;
}

function int(v: unknown, what: string): number {
  if (typeof v !== 'number' || !Number.isInteger(v)) throw new Error(`missions.json: ${what} must be an integer`);
  return v;
}

export function parseGate(v: unknown, what = 'gate'): Gate {
  if (!isRecord(v)) throw new Error(`${what} must be an object`);
  const kind = str(v['kind'], `${what}.kind`);
  switch (kind) {
    case 'H':
    case 'S':
      return { kind, q: int(v['q'], `${what}.q`) };
    case 'CNOT':
      return { kind, c: int(v['c'], `${what}.c`), t: int(v['t'], `${what}.t`) };
    case 'CZ':
    case 'SWAP':
      return { kind, a: int(v['a'], `${what}.a`), b: int(v['b'], `${what}.b`) };
    default:
      throw new Error(`${what}.kind '${kind}' is not a supported gate`);
  }
}

export function parseCircuit(v: unknown, what = 'circuit'): Circuit {
  if (!Array.isArray(v)) throw new Error(`${what} must be an array`);
  return v.map((g, i) => parseGate(g, `${what}[${String(i)}]`));
}

function parseExpected(v: unknown, what: string): MissionExpected {
  if (!isRecord(v)) throw new Error(`missions.json: ${what} must be an object`);
  if (!Array.isArray(v['syndrome'])) throw new Error(`missions.json: ${what}.syndrome must be an array`);
  const synd = v['syndrome'].map((b, i) => {
    const n = int(b, `${what}.syndrome[${String(i)}]`);
    if (n !== 0 && n !== 1) throw new Error(`missions.json: ${what}.syndrome bits must be 0/1`);
    return n;
  });
  const verdict = str(v['minWeightVerdict'], `${what}.minWeightVerdict`);
  if (!(VERDICT_KINDS as readonly string[]).includes(verdict)) throw new Error(`missions.json: ${what}.minWeightVerdict invalid`);
  return {
    syndrome: synd,
    propagated: str(v['propagated'], `${what}.propagated`),
    minWeightCorrection: str(v['minWeightCorrection'], `${what}.minWeightCorrection`),
    minWeightVerdict: verdict as VerdictKind,
  };
}

/** Parse and structurally validate one mission. `expected` may be absent (the generator fills it). */
export function parseMission(v: unknown, what = 'mission'): Omit<MissionDefinition, 'expected'> & { expected: MissionExpected | null } {
  if (!isRecord(v)) throw new Error(`missions.json: ${what} must be an object`);
  const id = str(v['id'], `${what}.id`);
  const codeId = str(v['code'], `${what}.code`);
  if (!isCodeId(codeId)) throw new Error(`missions.json: ${id}.code '${codeId}' is unknown`);
  const code = getCode(codeId);
  const kind = str(v['kind'], `${id}.kind`);
  if (kind !== 'dispatch' && kind !== 'propagation') throw new Error(`missions.json: ${id}.kind must be dispatch|propagation`);
  if (!Array.isArray(v['training'])) throw new Error(`missions.json: ${id}.training must be an array`);
  const training: TrainingStep[] = v['training'].map((t, i) => {
    const w = `${id}.training[${String(i)}]`;
    if (!isRecord(t)) throw new Error(`missions.json: ${w} must be an object`);
    const error = str(t['error'], `${w}.error`);
    if (fromString(error).n !== code.n) throw new Error(`missions.json: ${w}.error length must be ${String(code.n)}`);
    const circuit = parseCircuit(t['circuit'], `${w}.circuit`);
    validateCircuit(circuit, code.n);
    return { error, circuit, caption: str(t['caption'], `${w}.caption`) };
  });
  const ch = v['challenge'];
  if (!isRecord(ch)) throw new Error(`missions.json: ${id}.challenge must be an object`);
  const challengeError = str(ch['error'], `${id}.challenge.error`);
  if (fromString(challengeError).n !== code.n) throw new Error(`missions.json: ${id}.challenge.error length must be ${String(code.n)}`);
  const challengeCircuit = parseCircuit(ch['circuit'], `${id}.challenge.circuit`);
  validateCircuit(challengeCircuit, code.n);
  if (kind === 'dispatch' && challengeCircuit.length > 0) throw new Error(`missions.json: ${id} is a dispatch mission but has a circuit`);
  if (!Array.isArray(v['allowed']) || v['allowed'].length === 0) throw new Error(`missions.json: ${id}.allowed must be a non-empty array`);
  const allowed: PauliLetter[] = v['allowed'].map((l, i) => {
    const s = str(l, `${id}.allowed[${String(i)}]`);
    if (!isPauliLetter(s) || s === 'I') throw new Error(`missions.json: ${id}.allowed[${String(i)}] must be X, Y or Z`);
    return s;
  });
  const budget = int(v['budget'], `${id}.budget`);
  if (budget < 1 || budget > code.n) throw new Error(`missions.json: ${id}.budget out of range`);
  const db = v['debrief'];
  if (!isRecord(db)) throw new Error(`missions.json: ${id}.debrief must be an object`);
  const debrief = {
    success: str(db['success'], `${id}.debrief.success`),
    'logical-error': str(db['logical-error'], `${id}.debrief.logical-error`),
    detectable: str(db['detectable'], `${id}.debrief.detectable`),
  };
  const expected = v['expected'] === undefined || v['expected'] === null ? null : parseExpected(v['expected'], `${id}.expected`);
  return {
    id,
    index: int(v['index'], `${id}.index`),
    title: str(v['title'], `${id}.title`),
    code: codeId,
    kind,
    training,
    challenge: { error: challengeError, circuit: challengeCircuit },
    allowed,
    budget,
    briefing: str(v['briefing'], `${id}.briefing`),
    debrief,
    expected,
  };
}

/** Recompute the `expected` block from the engine (the rule the generator and tests use). */
export function computeExpected(m: Omit<MissionDefinition, 'expected'>): MissionExpected {
  const code = getCode(m.code);
  const error = fromString(m.challenge.error);
  const propagated = propagateFinal(error, m.challenge.circuit);
  const synd = syndrome(code, error);
  const correction = m.kind === 'dispatch' ? lookupDecoder(code).decode(synd) : propagated;
  const verdict = evaluate(code, propagated, correction);
  return {
    syndrome: syndromeToArray(synd),
    propagated: toString(propagated),
    minWeightCorrection: toString(correction),
    minWeightVerdict: verdict.kind,
  };
}

/** True when every letter of the TRUE error (propagated for propagation missions) is dispatchable within the budget. */
export function challengeIsDispatchable(m: Omit<MissionDefinition, 'expected'>): boolean {
  const code = getCode(m.code);
  const final = propagateFinal(fromString(m.challenge.error), m.challenge.circuit);
  for (let q = 0; q < code.n; q++) {
    const l = letterAt(final, q);
    if (l !== 'I' && !m.allowed.includes(l)) return false;
  }
  return weight(final) <= m.budget;
}

/** Parse the whole missions array, requiring a complete `expected` block on each mission. */
export function parseMissions(raw: unknown): MissionDefinition[] {
  if (!Array.isArray(raw)) throw new Error('missions.json: root must be an array');
  const out: MissionDefinition[] = [];
  const ids = new Set<string>();
  raw.forEach((v, i) => {
    const m = parseMission(v, `missions[${String(i)}]`);
    if (m.expected === null) throw new Error(`missions.json: ${m.id} has no expected block (run scripts/gen-fixtures.ts)`);
    if (ids.has(m.id)) throw new Error(`missions.json: duplicate id ${m.id}`);
    ids.add(m.id);
    if (m.index !== i + 1) throw new Error(`missions.json: ${m.id} index ${String(m.index)} should be ${String(i + 1)}`);
    out.push({ ...m, expected: m.expected });
  });
  return out;
}

let cache: readonly MissionDefinition[] | undefined;

/** The six missions, in play order. */
export function getMissions(): readonly MissionDefinition[] {
  cache ??= parseMissions(missionsJson);
  return cache;
}

export function getMission(id: string): MissionDefinition {
  const m = getMissions().find((x) => x.id === id);
  if (m === undefined) throw new Error(`unknown mission '${id}'`);
  return m;
}
