/**
 * QuantumBridge: how the game asks for a circuit-level verification of a mission dispatch.
 *  - `none` (web build): no live backend. Shows cached results from fixtures/cloud-results.json, which must
 *    only ever contain results that were actually executed; it ships empty ({ schema: 1, results: [] }).
 *  - `qollab` (Qollab build): implemented in qollab/main.js, runs on the backend the person chose in the Run dialog.
 * Results are labelled by `source`: Local (Aer) / Cached cloud result / Live cloud result. Nothing is invented.
 */
import cloudResultsJson from '../../fixtures/cloud-results.json';

export type CloudSource = 'local-simulator' | 'cached-cloud' | 'live-cloud';

export interface CloudRequest {
  readonly missionId: string;
  /** Player's crews, qubit-0-first Pauli string. */
  readonly correction: string;
  readonly shots: number;
  readonly prep?: '0' | '+';
  readonly readoutBasis?: 'Z' | 'X';
}

export interface CloudResultOk {
  readonly status: 'ok';
  readonly source: CloudSource;
  readonly backendName: string;
  readonly missionId: string;
  readonly correction: string;
  readonly shots: number;
  readonly counts: Readonly<Record<string, number>>;
  /** Backend-specific analysis produced by the Python side (shape documented in qollab/). */
  readonly analysis: unknown;
  readonly prediction: unknown;
  readonly jobId: string | null;
  readonly startedAt: string;
  readonly finishedAt: string;
}

export interface CloudResultError {
  readonly status: 'error';
  readonly message: string;
}

export type CloudResult = CloudResultOk | CloudResultError;

export interface QuantumBridge {
  readonly kind: 'none' | 'qollab';
  readonly backendName?: string;
  readonly isLocalSimulator?: boolean;
  /** Remaining jobs allowed in this run (Qollab: one IonQ job per Run). */
  jobsRemaining?(): number;
  run?(request: CloudRequest): Promise<CloudResult>;
  /** Previously recorded results for a mission (the web build reads fixtures/cloud-results.json). */
  cached(missionId: string): readonly CloudResultOk[];
}

export const SOURCE_LABEL: Readonly<Record<CloudSource, string>> = {
  'local-simulator': 'Local (Aer)',
  'cached-cloud': 'Cached cloud result',
  'live-cloud': 'Live cloud result',
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function parseCounts(v: unknown): Record<string, number> | null {
  if (!isRecord(v)) return null;
  const out: Record<string, number> = {};
  for (const [k, n] of Object.entries(v)) {
    if (typeof n !== 'number' || !Number.isFinite(n)) return null;
    out[k] = n;
  }
  return out;
}

/** Validate one cached record; invalid records are dropped rather than displayed. */
export function parseCachedResult(v: unknown): CloudResultOk | null {
  if (!isRecord(v)) return null;
  const source = v['source'];
  if (source !== 'local-simulator' && source !== 'cached-cloud' && source !== 'live-cloud') return null;
  const counts = parseCounts(v['counts']);
  if (counts === null) return null;
  const str = (k: string): string | null => {
    const x = v[k];
    return typeof x === 'string' ? x : null;
  };
  const missionId = str('missionId');
  const correction = str('correction');
  const backendName = str('backendName');
  const startedAt = str('startedAt');
  const finishedAt = str('finishedAt');
  const shots = v['shots'];
  if (missionId === null || correction === null || backendName === null || startedAt === null || finishedAt === null) return null;
  if (typeof shots !== 'number' || !Number.isInteger(shots) || shots <= 0) return null;
  return {
    status: 'ok',
    source,
    backendName,
    missionId,
    correction,
    shots,
    counts,
    analysis: v['analysis'] ?? null,
    prediction: v['prediction'] ?? null,
    jobId: str('jobId'),
    startedAt,
    finishedAt,
  };
}

export function parseCloudResults(raw: unknown): CloudResultOk[] {
  if (!isRecord(raw) || raw['schema'] !== 1 || !Array.isArray(raw['results'])) return [];
  const out: CloudResultOk[] = [];
  for (const r of raw['results']) {
    const parsed = parseCachedResult(r);
    if (parsed !== null) out.push(parsed);
  }
  return out;
}

/** The web build's bridge: no live runs, only recorded results (none shipped yet). */
export function noneBridge(results: readonly CloudResultOk[] = parseCloudResults(cloudResultsJson)): QuantumBridge {
  return {
    kind: 'none',
    cached: (missionId) => results.filter((r) => r.missionId === missionId),
  };
}
