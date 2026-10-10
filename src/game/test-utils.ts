/**
 * Shared helpers for the game-layer tests (not a test file itself). Not exported from index.ts.
 */
import { fromString, letterAt } from '../quantum';
import { initialState, reducer } from './machine';
import { DEFAULT_SETTINGS } from './persistence';
import type { Action, CrewLetter, GameState, SaveData } from './types';

/** A save whose player has finished the guided first run and turned Free roam on (every district selectable). */
export function openSave(overrides: Partial<SaveData> = {}): SaveData {
  return { version: 2, progress: {}, settings: { ...DEFAULT_SETTINGS, freeRoam: true }, tutorialDone: true, ...overrides };
}

/** Initial state on the city with every district selectable. */
export function openState(): GameState {
  return reducer(initialState(openSave()), { type: 'PLAY' });
}

export function run(state: GameState, ...actions: Action[]): GameState {
  return actions.reduce(reducer, state);
}

/** Placements that reproduce a qubit-0-first Pauli string. */
export function placementsOf(s: string): Record<number, CrewLetter> {
  const p = fromString(s);
  const out: Record<number, CrewLetter> = {};
  for (let q = 0; q < p.n; q++) {
    const l = letterAt(p, q);
    if (l !== 'I') out[q] = l;
  }
  return out;
}

/** City → briefing → through every training lesson → challenge of the given mission (free roam). */
export function toChallenge(id: string, from: GameState = openState()): GameState {
  let s = run(from, { type: 'SELECT_MISSION', id }, { type: 'START_MISSION' });
  for (let guard = 0; guard < 50 && s.screen === 'training'; guard++) s = reducer(s, { type: 'LESSON_NEXT' });
  if (s.screen !== 'challenge') throw new Error(`toChallenge(${id}): ended on '${s.screen}'`);
  return s;
}

/** Select each letter and tap its block, in insertion order. */
export function place(state: GameState, placements: Record<number, CrewLetter>): GameState {
  let s = state;
  for (const [q, letter] of Object.entries(placements)) {
    s = reducer(s, { type: 'SELECT_LETTER', letter });
    s = reducer(s, { type: 'TOGGLE_BLOCK', qubit: Number(q) });
  }
  return s;
}
