import { describe, expect, it } from 'vitest';
import { DISTRICTS, districtForMission, districtStatus, districtsMatchMissions, firstAvailable, getDistrict, missionStatus, solvedCount } from './city';
import type { MissionProgress } from './types';

const done: MissionProgress = { stars: 3, attempts: 1, completed: true };
const tried: MissionProgress = { stars: 0, attempts: 2, completed: false };

describe('city districts', () => {
  it('six districts in mission order with the expected ids, kinds and the single beacon', () => {
    expect(DISTRICTS.map((d) => d.id)).toEqual(['station-row', 'bridge', 'lab', 'central', 'market', 'old-town']);
    expect(DISTRICTS.map((d) => d.missionId)).toEqual([
      'first-alarm',
      'red-forward-blue-backward',
      'color-switch',
      'blind-dispatch',
      'two-kinds-of-trouble',
      'silent-failure',
    ]);
    expect(DISTRICTS.map((d) => d.kind)).toEqual(['houses-row', 'bridge', 'lab', 'grid', 'grid', 'grid']);
    expect(DISTRICTS.filter((d) => d.hasBeacon).map((d) => d.id)).toEqual(['old-town']);
    expect(districtsMatchMissions()).toBe(true);
    expect(getDistrict('lab').missionId).toBe('color-switch');
    expect(() => getDistrict('nowhere')).toThrow();
    expect(districtForMission('silent-failure')?.id).toBe('old-town');
    expect(districtForMission('nope')).toBeUndefined();
  });

  it('fresh progress: only the first district is available, the rest are locked', () => {
    expect(districtStatus('station-row', {}, false)).toBe('available');
    for (const d of DISTRICTS.slice(1)) expect(districtStatus(d.id, {}, false)).toBe('locked');
    expect(firstAvailable({})?.id).toBe('station-row');
    expect(solvedCount({})).toBe(0);
  });

  it('solving unlocks the next district in order; attempts without completion do not', () => {
    const p1 = { 'first-alarm': done };
    expect(districtStatus('station-row', p1, false)).toBe('solved');
    expect(districtStatus('bridge', p1, false)).toBe('available');
    expect(districtStatus('lab', p1, false)).toBe('locked');
    expect(firstAvailable(p1)?.id).toBe('bridge');
    const p2 = { 'first-alarm': done, 'red-forward-blue-backward': tried };
    expect(districtStatus('bridge', p2, false)).toBe('available');
    expect(districtStatus('lab', p2, false)).toBe('locked');
    expect(solvedCount(p2)).toBe(1);
  });

  it('a gap in progress (e.g. after free roam) keeps later districts locked until every earlier one is solved', () => {
    const skipped = { 'first-alarm': done, 'color-switch': done };
    expect(districtStatus('bridge', skipped, false)).toBe('available');
    expect(districtStatus('lab', skipped, false)).toBe('solved'); // solved stays solved (replayable)
    expect(districtStatus('central', skipped, false)).toBe('locked');
    expect(firstAvailable(skipped)?.id).toBe('bridge');
  });

  it('free roam makes every unsolved district available (solved stay solved)', () => {
    const p = { 'first-alarm': done };
    expect(districtStatus('station-row', p, true)).toBe('solved');
    for (const d of DISTRICTS.slice(1)) expect(districtStatus(d.id, p, true)).toBe('available');
    expect(missionStatus('silent-failure', p, true)).toBe('available');
    expect(missionStatus('silent-failure', p, false)).toBe('locked');
    expect(missionStatus('unknown', p, true)).toBeUndefined();
  });

  it('all solved: no district is available next, everything is solved', () => {
    const all = Object.fromEntries(DISTRICTS.map((d) => [d.missionId, done]));
    for (const d of DISTRICTS) expect(districtStatus(d.id, all, false)).toBe('solved');
    expect(firstAvailable(all)).toBeNull();
    expect(solvedCount(all)).toBe(6);
    expect(() => districtStatus('nowhere', all, false)).toThrow();
  });
});
