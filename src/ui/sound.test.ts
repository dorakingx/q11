import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS, initialState, reducer, type Action, type GameState } from '../game';
import { soundFor } from './sound';

/** Districts unlock in order; the tests pick any mission, so start with Free roam on and the tutorial done. */
function toChallenge(id: string): GameState {
  const start = initialState({ version: 2, progress: {}, settings: { ...DEFAULT_SETTINGS, freeRoam: true }, tutorialDone: true });
  let s = reducer(reducer(start, { type: 'SELECT_MISSION', id }), { type: 'START_MISSION' });
  for (let guard = 0; guard < 50 && s.screen === 'training'; guard++) s = reducer(s, { type: 'LESSON_NEXT' });
  return s;
}

function tone(state: GameState, action: Action) {
  return { name: soundFor(action, state, reducer(state, action)), next: reducer(state, action) };
}

describe('soundFor (tones only for accepted actions)', () => {
  it('place / remove / blocked / select / confirm / step', () => {
    let s = toChallenge('blind-dispatch'); // budget 1, X/Z
    expect(tone(s, { type: 'SELECT_LETTER', letter: 'Z' }).name).toBe('select');
    expect(tone(s, { type: 'SELECT_LETTER', letter: 'X' }).name).toBeNull(); // already selected
    expect(tone(s, { type: 'SELECT_LETTER', letter: 'Y' }).name).toBeNull(); // not allowed → refused silently
    const placed = tone(s, { type: 'TOGGLE_BLOCK', qubit: 4 });
    expect(placed.name).toBe('place');
    s = placed.next;
    expect(tone(s, { type: 'TOGGLE_BLOCK', qubit: 5 }).name).toBe('blocked'); // budget reached
    s = reducer(s, { type: 'SELECT_LETTER', letter: 'Z' });
    expect(tone(s, { type: 'TOGGLE_BLOCK', qubit: 4 }).name).toBe('place'); // colour swap counts as a placement
    s = reducer(s, { type: 'SELECT_LETTER', letter: 'X' });
    expect(tone(s, { type: 'TOGGLE_BLOCK', qubit: 4 }).name).toBe('remove');
    expect(tone(s, { type: 'RECALL_BLOCK', qubit: 4 }).name).toBe('remove');
    expect(tone(s, { type: 'RECALL_BLOCK', qubit: 2 }).name).toBeNull();
    expect(tone(s, { type: 'CLEAR_CREWS' }).name).toBe('remove');
    expect(tone(reducer(s, { type: 'CLEAR_CREWS' }), { type: 'CLEAR_CREWS' }).name).toBeNull();
    expect(tone(s, { type: 'TOGGLE_BLOCK', qubit: 99 }).name).toBeNull(); // invalid block, budget not the reason
    const confirmed = tone(s, { type: 'CONFIRM' });
    expect(confirmed.name).toBe('confirm');
    const d = confirmed.next;
    expect(tone(d, { type: 'REPLAY_NEXT' }).name).toBe('step');
    expect(tone(d, { type: 'REPLAY_PREV' }).name).toBeNull(); // already at step 1
    const last = (d.debrief?.steps.length ?? 1) - 1;
    expect(tone(d, { type: 'REPLAY_GOTO', index: last }).name).toBe('step');
    expect(tone(d, { type: 'REPLAY_GOTO', index: 0 }).name).toBeNull();
  });

  it('standing down: CONFIRM with no crews only opens the dialog (no tone); STAND_DOWN_CONFIRM commits (tone)', () => {
    const s = toChallenge('first-alarm');
    const asked = tone(s, { type: 'CONFIRM' });
    expect(asked.name).toBeNull();
    expect(asked.next.standDownDialog).toBe(true);
    expect(tone(asked.next, { type: 'TOGGLE_BLOCK', qubit: 0 }).name).toBeNull(); // dialog open: not a budget refusal
    expect(tone(asked.next, { type: 'STAND_DOWN_CONFIRM' }).name).toBe('confirm');
  });
});
