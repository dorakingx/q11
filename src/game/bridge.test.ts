import { describe, expect, it } from 'vitest';
import cloudResultsJson from '../../fixtures/cloud-results.json';
import { filterByDispatch, noneBridge, parseCachedResult, parseCloudResults, sameDispatch, SOURCE_LABEL, type CloudResultOk } from './bridge';

function rec(missionId: string, correction: string, jobId = 'j1'): CloudResultOk {
  return {
    status: 'ok',
    source: 'cached-cloud',
    backendName: 'ionq_simulator (aria-1 noise model)',
    missionId,
    correction,
    shots: 100,
    counts: { '000': 97, '001': 3 },
    analysis: null,
    prediction: null,
    jobId,
    startedAt: '2026-10-10T00:00:00Z',
    finishedAt: '2026-10-10T00:00:05Z',
  };
}

describe('cloud results fixture', () => {
  it('ships with schema 1 and only well-formed records (none invented)', () => {
    expect(cloudResultsJson.schema).toBe(1);
    expect(Array.isArray(cloudResultsJson.results)).toBe(true);
    const parsed = parseCloudResults(cloudResultsJson);
    expect(parsed.length).toBe(cloudResultsJson.results.length);
    for (const r of parsed) {
      expect(['local-simulator', 'cached-cloud', 'live-cloud']).toContain(r.source);
      expect(Object.values(r.counts).reduce((a, b) => a + b, 0)).toBeGreaterThan(0);
    }
  });

  it('none bridge has no run() and returns cached results per mission', () => {
    const b = noneBridge([
      {
        status: 'ok',
        source: 'cached-cloud',
        backendName: 'ionq_simulator (aria-1 noise model)',
        missionId: 'first-alarm',
        correction: 'IXI',
        shots: 100,
        counts: { '000': 97, '001': 3 },
        analysis: null,
        prediction: null,
        jobId: 'j1',
        startedAt: '2026-10-10T00:00:00Z',
        finishedAt: '2026-10-10T00:00:05Z',
      },
    ]);
    expect(b.kind).toBe('none');
    expect('run' in b && b.run !== undefined).toBe(false);
    expect(b.cached('first-alarm')).toHaveLength(1);
    expect(b.cached('silent-failure')).toHaveLength(0);
    expect(SOURCE_LABEL['cached-cloud']).toBe('Cached cloud result');
    expect(SOURCE_LABEL['live-cloud']).toBe('Live cloud result');
    expect(SOURCE_LABEL['local-simulator']).toBe('Local (Aer)');
  });

  it('cached(missionId, correction) returns only results of that dispatch or a stabilizer-equivalent one', () => {
    const b = noneBridge([rec('blind-dispatch', 'IIIIXIIII', 'a'), rec('blind-dispatch', 'XIIIIIIII', 'b'), rec('silent-failure', 'XIIIIIIII', 'c'), rec('first-alarm', 'IXI', 'd')]);
    expect(b.cached('blind-dispatch')).toHaveLength(2); // no correction → everything recorded for the mission (Qollab live path)
    expect(b.cached('blind-dispatch', 'IIIIXIIII').map((r) => r.jobId)).toEqual(['a']);
    expect(b.cached('blind-dispatch', 'XIIIIIIII').map((r) => r.jobId)).toEqual(['b']);
    // Block 3 differs from block 0 by the X2 stabilizer (X0 X3): the same correction, so the recorded run applies.
    expect(b.cached('blind-dispatch', 'IIIXIIIII').map((r) => r.jobId)).toEqual(['b']);
    expect(b.cached('silent-failure', 'IIIXIIIII').map((r) => r.jobId)).toEqual(['c']);
    // The lucky guess on mission 6 is NOT equivalent to the recorded block-0 crew → no card.
    expect(b.cached('silent-failure', 'IXXIIIIII')).toEqual([]);
    expect(b.cached('blind-dispatch', 'IIIIIIIII')).toEqual([]);
    expect(b.cached('first-alarm', 'IXI')).toHaveLength(1);
    expect(b.cached('first-alarm', 'XII')).toEqual([]);
    // Malformed or wrong-length strings never match, and unknown missions never throw.
    expect(sameDispatch('blind-dispatch', 'IIIIXIIII', 'IIIIXIIII')).toBe(true);
    expect(sameDispatch('blind-dispatch', 'IIIIXIIII', 'XIIIIIIII')).toBe(false);
    expect(sameDispatch('blind-dispatch', 'IIIIXIIII', 'IXI')).toBe(false);
    expect(sameDispatch('blind-dispatch', 'IIIIXIIII', 'not a pauli')).toBe(false);
    expect(sameDispatch('nope', 'IXI', 'XII')).toBe(false);
    expect(filterByDispatch([rec('first-alarm', 'IXI')], 'first-alarm')).toHaveLength(1);
    expect(filterByDispatch([rec('first-alarm', 'IXI')], 'first-alarm', 'XII')).toHaveLength(0);
  });

  it('the shipped fixture holds only block-4 (mission 4) and block-0 (mission 6) runs, so other dispatches show no card', () => {
    const b = noneBridge();
    expect(b.cached('blind-dispatch', 'IIIIXIIII').length).toBeGreaterThan(0);
    expect(b.cached('blind-dispatch', 'XIIIIIIII')).toEqual([]);
    expect(b.cached('silent-failure', 'XIIIIIIII').length).toBeGreaterThan(0);
    expect(b.cached('silent-failure', 'IIIXIIIII').length).toBeGreaterThan(0);
    expect(b.cached('silent-failure', 'IXXIIIIII')).toEqual([]);
    expect(b.cached('first-alarm', 'IXI')).toEqual([]);
  });

  it('rejects malformed records', () => {
    expect(parseCachedResult({ source: 'live-cloud' })).toBeNull();
    expect(parseCachedResult({ source: 'made-up', counts: {}, missionId: 'x', correction: 'I', backendName: 'b', shots: 1, startedAt: 's', finishedAt: 'f' })).toBeNull();
    expect(parseCloudResults({ schema: 2, results: [] })).toEqual([]);
    expect(parseCloudResults(null)).toEqual([]);
  });
});
