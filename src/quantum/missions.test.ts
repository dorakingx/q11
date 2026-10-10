import { describe, expect, it } from 'vitest';
import missionsJson from '../../fixtures/missions.json';
import { getCode } from './codes';
import { challengeIsDispatchable, computeExpected, getMission, getMissions, parseMissions } from './missions';
import { fromString, letterAt, weight } from './pauli';
import { propagateFinal } from './gates';
import { ringingChecks, syndrome } from './verdict';

describe('missions.json', () => {
  const missions = getMissions();

  it('has the six missions in play order with the designed codes and kinds', () => {
    expect(missions.map((m) => [m.index, m.id, m.code, m.kind])).toEqual([
      [1, 'first-alarm', 'rep3', 'dispatch'],
      [2, 'red-forward-blue-backward', 'trivial2', 'propagation'],
      [3, 'color-switch', 'trivial2', 'propagation'],
      [4, 'blind-dispatch', 'rsc3', 'dispatch'],
      [5, 'two-kinds-of-trouble', 'rsc3', 'dispatch'],
      [6, 'silent-failure', 'rsc3', 'dispatch'],
    ]);
    expect(getMission('silent-failure').title).toBe('Silent Failure');
    expect(() => getMission('nope')).toThrow();
  });

  it('expected blocks match recomputation by the engine', () => {
    for (const m of missions) {
      const { expected, ...rest } = m;
      expect(computeExpected(rest), m.id).toEqual(expected);
    }
  });

  it('challenge errors fit the code size, use only allowed letters, and fit the budget', () => {
    for (const m of missions) {
      const code = getCode(m.code);
      const e = fromString(m.challenge.error);
      expect(e.n, m.id).toBe(code.n);
      const final = propagateFinal(e, m.challenge.circuit);
      for (let q = 0; q < code.n; q++) {
        const l = letterAt(final, q);
        if (l !== 'I') expect(m.allowed, `${m.id} q${String(q)}`).toContain(l);
      }
      expect(weight(final), m.id).toBeLessThanOrEqual(m.budget);
      expect(challengeIsDispatchable(m)).toBe(true);
      for (const t of m.training) expect(fromString(t.error).n).toBe(code.n);
      expect(m.budget).toBeGreaterThanOrEqual(1);
      expect(m.allowed).not.toContain('I');
    }
  });

  it('has real narrative text for every phase', () => {
    for (const m of missions) {
      expect(m.briefing.length).toBeGreaterThan(80);
      for (const k of ['success', 'logical-error', 'detectable'] as const) expect(m.debrief[k].length, `${m.id}/${k}`).toBeGreaterThan(40);
      for (const t of m.training) expect(t.caption.length).toBeGreaterThan(30);
    }
    expect(getMission('silent-failure').debrief['logical-error']).toMatch(/distance 3/);
    expect(getMission('silent-failure').debrief['logical-error']).toMatch(/optimal call/i);
  });

  it('designed alarm patterns: mission 1 both alarms, 4 → Z0 & Z1, 5 → Z0 Z2 X1, 6 → Z0 only', () => {
    const ring = (id: string) => {
      const m = getMission(id);
      return ringingChecks(getCode(m.code), syndrome(getCode(m.code), fromString(m.challenge.error)));
    };
    expect(ring('first-alarm')).toEqual(['Z0', 'Z1']);
    expect(ring('blind-dispatch')).toEqual(['Z0', 'Z1']);
    expect(ring('two-kinds-of-trouble')).toEqual(['Z0', 'Z2', 'X1']);
    expect(ring('silent-failure')).toEqual(['Z0']);
    expect(getMission('silent-failure').expected.minWeightVerdict).toBe('logical-error');
    expect(getMission('two-kinds-of-trouble').expected.minWeightVerdict).toBe('success');
    expect(getMission('red-forward-blue-backward').expected.propagated).toBe('YY');
    expect(getMission('color-switch').expected.propagated).toBe('XZ');
  });

  it('training steps match the design brief', () => {
    expect(getMission('first-alarm').training.map((t) => t.error)).toEqual(['XII']);
    expect(getMission('red-forward-blue-backward').training.map((t) => t.error)).toEqual(['XI', 'IZ']);
    expect(getMission('color-switch').training.map((t) => t.error)).toEqual(['XI', 'ZI']);
    expect(getMission('blind-dispatch').training.map((t) => t.error)).toEqual(['XIIIIIIII']);
    const cs = getMission('color-switch');
    expect(cs.challenge.circuit).toEqual([{ kind: 'H', q: 0 }, { kind: 'CNOT', c: 0, t: 1 }, { kind: 'H', q: 1 }]);
  });

  it('parser rejects malformed input', () => {
    expect(() => parseMissions({})).toThrow(/array/);
    const broken = structuredClone(missionsJson) as unknown as Record<string, unknown>[];
    broken[0] = { ...broken[0], budget: 0 };
    expect(() => parseMissions(broken)).toThrow(/budget/);
    const noExpected = structuredClone(missionsJson) as unknown as Record<string, unknown>[];
    delete noExpected[1]?.['expected'];
    expect(() => parseMissions(noExpected)).toThrow(/expected/);
  });
});
