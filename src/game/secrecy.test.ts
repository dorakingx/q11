/**
 * Secrecy invariant: nothing the Challenge view can see contains the true error, and the reducer does not
 * expose it before the 'debrief' phase.
 */
import { describe, expect, it } from 'vitest';
import { getMissions } from '../quantum';
import { initialState, reducer } from './machine';
import { listPublicMissions } from './missions';
import type { GameState, PublicMissionView } from './types';

function keysDeep(v: unknown, acc: Set<string> = new Set()): Set<string> {
  if (Array.isArray(v)) v.forEach((x) => keysDeep(x, acc));
  else if (typeof v === 'object' && v !== null) {
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) {
      acc.add(k);
      keysDeep(x, acc);
    }
  }
  return acc;
}

describe('PublicMissionView', () => {
  it('has no "error" key anywhere and the type forbids one', () => {
    for (const m of listPublicMissions()) {
      expect(Object.keys(m)).not.toContain('error');
      expect(keysDeep(m).has('error')).toBe(false);
      // Type-level: assigning an object with `error` to PublicMissionView must be a compile error.
      // @ts-expect-error — PublicMissionView must not accept an `error` field
      const bad: PublicMissionView = { ...m, error: 'XII' };
      expect(bad).toBeDefined();
    }
  });

  it('dispatch missions hide the fire; propagation missions show only the public starting fire', () => {
    const defs = getMissions();
    for (const m of listPublicMissions()) {
      const def = defs.find((d) => d.id === m.id);
      expect(def).toBeDefined();
      if (def === undefined) continue;
      if (m.kind === 'dispatch') {
        expect(m.visibleStart).toBeNull();
        // The serialised public view never contains the hidden Pauli string as a value.
        const values = JSON.stringify(m);
        expect(values).not.toContain(`"${def.challenge.error}"`);
        expect(m.syndrome).toEqual(def.expected.syndrome);
      } else {
        expect(m.visibleStart).toBe(def.challenge.error);
        // but never the propagated answer
        expect(JSON.stringify(m)).not.toContain(`"${def.expected.propagated}"`);
      }
    }
  });
});

describe('reducer before debrief', () => {
  it('state before confirm has debrief = null and contains no "error"/"fires" keys; after confirm it does', () => {
    for (const m of listPublicMissions()) {
      let s: GameState = reducer(reducer(initialState(), { type: 'SELECT_MISSION', id: m.id }), { type: 'START_MISSION' });
      const seen: GameState[] = [s];
      for (let guard = 0; guard < 50 && s.screen === 'training'; guard++) {
        s = reducer(s, { type: 'LESSON_NEXT' });
        seen.push(s);
      }
      expect(s.screen).toBe('challenge');
      s = reducer(s, { type: 'TOGGLE_BLOCK', qubit: 0 });
      seen.push(s);
      for (const st of seen) {
        expect(st.debrief).toBeNull();
        const keys = keysDeep(st);
        expect(keys.has('error')).toBe(false);
        expect(keys.has('fires')).toBe(false);
        expect(keys.has('residual')).toBe(false);
      }
      const committed = reducer(s, { type: 'CONFIRM' });
      expect(committed.screen).toBe('debrief');
      expect(committed.debrief).not.toBeNull();
    }
  });
});
