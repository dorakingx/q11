import { describe, expect, it } from 'vitest';
import cloudResultsJson from '../../fixtures/cloud-results.json';
import { noneBridge, parseCachedResult, parseCloudResults, SOURCE_LABEL } from './bridge';

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

  it('rejects malformed records', () => {
    expect(parseCachedResult({ source: 'live-cloud' })).toBeNull();
    expect(parseCachedResult({ source: 'made-up', counts: {}, missionId: 'x', correction: 'I', backendName: 'b', shots: 1, startedAt: 's', finishedAt: 'f' })).toBeNull();
    expect(parseCloudResults({ schema: 2, results: [] })).toEqual([]);
    expect(parseCloudResults(null)).toEqual([]);
  });
});
