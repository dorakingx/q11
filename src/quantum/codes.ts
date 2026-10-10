/**
 * Stabilizer codes loaded from fixtures/codes.json (the single source shared with Python and Qollab).
 * The JSON is validated at load time so a typo in the fixture fails loudly rather than silently.
 */
import codesJson from '../../fixtures/codes.json';
import type { Check, CheckType, CodeId, LogicalOperator, StabilizerCode } from './types';
import { fromString, fromSupport, toSymplecticRow } from './pauli';
import { rowReduce, type Gf2Basis } from './gf2';

export const CODE_IDS: readonly CodeId[] = ['trivial2', 'trivial3', 'rep3', 'rsc3'];

export function isCodeId(s: string): s is CodeId {
  return (CODE_IDS as readonly string[]).includes(s);
}

export interface GridPosition {
  readonly row: number;
  readonly col: number;
}

export interface BlockPosition extends GridPosition {
  /** Data qubit index. */
  readonly q: number;
}

/** Board geometry for the UI. Positions are in block units: block (r, c) sits at (row=r, col=c). */
export type CodeLayout =
  | {
      readonly kind: 'grid';
      readonly rows: number;
      readonly cols: number;
      readonly blocks: readonly BlockPosition[];
      /** Alarm station positions keyed by check id; half-integer coordinates sit between blocks. */
      readonly checkPositions: Readonly<Record<string, GridPosition>>;
    }
  | {
      readonly kind: 'line';
      readonly blocks: readonly BlockPosition[];
      readonly checkPositions: Readonly<Record<string, GridPosition>>;
    }
  | {
      /** One horizontal wire per qubit; used for propagation lessons. */
      readonly kind: 'wires';
      readonly wires: number;
    };

interface RawCheck {
  readonly id: string;
  readonly type: CheckType;
  readonly qubits: readonly number[];
}

interface RawCode {
  readonly name: string;
  readonly n: number;
  readonly k: number;
  readonly distance: number;
  readonly checks: readonly RawCheck[];
  readonly logicalX: readonly string[];
  readonly logicalZ: readonly string[];
  readonly layout: unknown;
  readonly noiseNote: string;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function expectNumber(v: unknown, what: string): number {
  if (typeof v !== 'number' || !Number.isFinite(v)) throw new Error(`codes.json: ${what} must be a number`);
  return v;
}

function expectString(v: unknown, what: string): string {
  if (typeof v !== 'string') throw new Error(`codes.json: ${what} must be a string`);
  return v;
}

function expectStringArray(v: unknown, what: string): string[] {
  if (!Array.isArray(v)) throw new Error(`codes.json: ${what} must be an array`);
  return v.map((s, i) => expectString(s, `${what}[${String(i)}]`));
}

function parseCheck(v: unknown, what: string): RawCheck {
  if (!isRecord(v)) throw new Error(`codes.json: ${what} must be an object`);
  const type = expectString(v['type'], `${what}.type`);
  if (type !== 'X' && type !== 'Z') throw new Error(`codes.json: ${what}.type must be X or Z`);
  if (!Array.isArray(v['qubits'])) throw new Error(`codes.json: ${what}.qubits must be an array`);
  const qubits = v['qubits'].map((q, i) => expectNumber(q, `${what}.qubits[${String(i)}]`));
  return { id: expectString(v['id'], `${what}.id`), type, qubits };
}

function parseRawCode(id: string, v: unknown): RawCode {
  if (!isRecord(v)) throw new Error(`codes.json: ${id} must be an object`);
  if (!Array.isArray(v['checks'])) throw new Error(`codes.json: ${id}.checks must be an array`);
  return {
    name: expectString(v['name'], `${id}.name`),
    n: expectNumber(v['n'], `${id}.n`),
    k: expectNumber(v['k'], `${id}.k`),
    distance: expectNumber(v['distance'], `${id}.distance`),
    checks: v['checks'].map((c, i) => parseCheck(c, `${id}.checks[${String(i)}]`)),
    logicalX: expectStringArray(v['logicalX'], `${id}.logicalX`),
    logicalZ: expectStringArray(v['logicalZ'], `${id}.logicalZ`),
    layout: v['layout'],
    noiseNote: expectString(v['noiseNote'], `${id}.noiseNote`),
  };
}

function parsePositions(v: unknown, what: string): Record<string, GridPosition> {
  if (!isRecord(v)) throw new Error(`codes.json: ${what} must be an object`);
  const out: Record<string, GridPosition> = {};
  for (const [key, pos] of Object.entries(v)) {
    if (!isRecord(pos)) throw new Error(`codes.json: ${what}.${key} must be an object`);
    out[key] = { row: expectNumber(pos['row'], `${what}.${key}.row`), col: expectNumber(pos['col'], `${what}.${key}.col`) };
  }
  return out;
}

function parseLayout(id: string, raw: RawCode): CodeLayout {
  const v = raw.layout;
  if (!isRecord(v)) throw new Error(`codes.json: ${id}.layout must be an object`);
  const kind = expectString(v['kind'], `${id}.layout.kind`);
  switch (kind) {
    case 'grid': {
      const rows = expectNumber(v['rows'], `${id}.layout.rows`);
      const cols = expectNumber(v['cols'], `${id}.layout.cols`);
      if (rows * cols !== raw.n) throw new Error(`codes.json: ${id}.layout grid size does not match n`);
      const blocks: BlockPosition[] = [];
      for (let q = 0; q < raw.n; q++) blocks.push({ q, row: Math.floor(q / cols), col: q % cols });
      const checkPositions = parsePositions(v['checkPositions'], `${id}.layout.checkPositions`);
      for (const c of raw.checks) {
        if (!(c.id in checkPositions)) throw new Error(`codes.json: ${id}.layout has no position for check ${c.id}`);
      }
      return { kind: 'grid', rows, cols, blocks, checkPositions };
    }
    case 'line': {
      const blocks: BlockPosition[] = [];
      for (let q = 0; q < raw.n; q++) blocks.push({ q, row: 0, col: q });
      const checkPositions = parsePositions(v['checkPositions'], `${id}.layout.checkPositions`);
      for (const c of raw.checks) {
        if (!(c.id in checkPositions)) throw new Error(`codes.json: ${id}.layout has no position for check ${c.id}`);
      }
      return { kind: 'line', blocks, checkPositions };
    }
    case 'wires':
      return { kind: 'wires', wires: raw.n };
    default:
      throw new Error(`codes.json: ${id}.layout.kind '${kind}' is unknown`);
  }
}

function buildCode(id: CodeId, raw: RawCode): StabilizerCode {
  const n = raw.n;
  const checks: Check[] = raw.checks.map((c) => {
    const sorted = [...c.qubits].sort((a, b) => a - b);
    return { id: c.id, type: c.type, qubits: sorted, pauli: fromSupport(n, c.type, sorted) };
  });
  const ids = new Set(checks.map((c) => c.id));
  if (ids.size !== checks.length) throw new Error(`codes.json: ${id} has duplicate check ids`);
  const toLogical = (label: 'X' | 'Z', s: string): LogicalOperator => {
    if (s.length !== n) throw new Error(`codes.json: ${id} logical ${label} "${s}" has wrong length`);
    return { label, pauli: fromString(s) };
  };
  const logicalX = raw.logicalX.map((s) => toLogical('X', s));
  const logicalZ = raw.logicalZ.map((s) => toLogical('Z', s));
  if (logicalX.length !== raw.k || logicalZ.length !== raw.k) throw new Error(`codes.json: ${id} needs k logical X and k logical Z`);
  return { id, name: raw.name, n, k: raw.k, distance: raw.distance, checks, logicalX, logicalZ, noiseNote: raw.noiseNote };
}

const rawById = new Map<CodeId, RawCode>();
{
  const root: unknown = codesJson;
  if (!isRecord(root)) throw new Error('codes.json: root must be an object');
  for (const id of CODE_IDS) {
    if (!(id in root)) throw new Error(`codes.json: missing code '${id}'`);
    rawById.set(id, parseRawCode(id, root[id]));
  }
}

const codeCache = new Map<CodeId, StabilizerCode>();
const layoutCache = new Map<CodeId, CodeLayout>();
const basisCache = new Map<CodeId, Gf2Basis>();

/** The code with the given id (same object on every call). */
export function getCode(id: CodeId): StabilizerCode {
  let code = codeCache.get(id);
  if (code === undefined) {
    const raw = rawById.get(id);
    if (raw === undefined) throw new Error(`unknown code '${id}'`);
    code = buildCode(id, raw);
    codeCache.set(id, code);
  }
  return code;
}

export function getLayout(id: CodeId): CodeLayout {
  let layout = layoutCache.get(id);
  if (layout === undefined) {
    const raw = rawById.get(id);
    if (raw === undefined) throw new Error(`unknown code '${id}'`);
    layout = parseLayout(id, raw);
    layoutCache.set(id, layout);
  }
  return layout;
}

export function getAllCodes(): readonly StabilizerCode[] {
  return CODE_IDS.map(getCode);
}

/** Symplectic rows [x|z] of the generators, in `code.checks` order. */
export function stabilizerRows(code: StabilizerCode): Uint8Array[] {
  return code.checks.map((c) => toSymplecticRow(c.pauli));
}

/** Reduced GF(2) basis of the stabilizer group (cached per code id). */
export function stabilizerBasis(code: StabilizerCode): Gf2Basis {
  let basis = basisCache.get(code.id);
  if (basis === undefined) {
    basis = rowReduce(stabilizerRows(code), 2 * code.n);
    basisCache.set(code.id, basis);
  }
  return basis;
}

export function getCheck(code: StabilizerCode, checkId: string): Check {
  const c = code.checks.find((k) => k.id === checkId);
  if (c === undefined) throw new Error(`code ${code.id} has no check '${checkId}'`);
  return c;
}
