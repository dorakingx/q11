import { describe, expect, it } from 'vitest';
import { fromString, getCode, letterAt, getMission } from '../quantum';
import { confirmDispatch, crewCount, initialState, placementsToPauli, PROGRESS_RESET_NOTICE, reducer, toSave, totalStars } from './machine';
import { listPublicMissions, maxTotalStars, missionMaxStars } from './missions';
import type { Action, CrewLetter, GameState } from './types';

function run(state: GameState, ...actions: Action[]): GameState {
  return actions.reduce(reducer, state);
}

/** Placements that reproduce a Pauli string. */
function placementsOf(s: string): Record<number, CrewLetter> {
  const p = fromString(s);
  const out: Record<number, CrewLetter> = {};
  for (let q = 0; q < p.n; q++) {
    const l = letterAt(p, q);
    if (l !== 'I') out[q] = l;
  }
  return out;
}

function toChallenge(id: string): GameState {
  let s = run(initialState(), { type: 'PLAY' }, { type: 'SELECT_MISSION', id }, { type: 'START_MISSION' });
  // Walk through every training lesson/gate until the challenge starts.
  for (let guard = 0; guard < 50 && s.screen === 'training'; guard++) s = reducer(s, { type: 'LESSON_NEXT' });
  expect(s.screen).toBe('challenge');
  return s;
}

function place(state: GameState, placements: Record<number, CrewLetter>): GameState {
  let s = state;
  for (const [q, letter] of Object.entries(placements)) {
    s = reducer(s, { type: 'SELECT_LETTER', letter });
    s = reducer(s, { type: 'TOGGLE_BLOCK', qubit: Number(q) });
  }
  return s;
}

describe('navigation', () => {
  it('title → missions → briefing → training/challenge; overlays return where they came from', () => {
    let s = initialState();
    expect(s.screen).toBe('title');
    s = reducer(s, { type: 'OPEN_HOW' });
    expect(s.screen).toBe('how');
    s = reducer(s, { type: 'CLOSE_OVERLAY' });
    expect(s.screen).toBe('title');
    s = reducer(s, { type: 'PLAY' });
    expect(s.screen).toBe('missions');
    s = reducer(s, { type: 'OPEN_SETTINGS' });
    expect(s.screen).toBe('settings');
    s = reducer(s, { type: 'CLOSE_OVERLAY' });
    expect(s.screen).toBe('missions');
    s = reducer(s, { type: 'SELECT_MISSION', id: 'first-alarm' });
    expect(s.screen).toBe('briefing');
    expect(s.missionId).toBe('first-alarm');
    s = reducer(s, { type: 'START_MISSION' });
    expect(s.screen).toBe('training');
    s = reducer(s, { type: 'START_CHALLENGE' });
    expect(s.screen).toBe('challenge');
    // Mission 5 has no training: START_MISSION goes straight to the challenge.
    const m5 = run(initialState(), { type: 'SELECT_MISSION', id: 'two-kinds-of-trouble' }, { type: 'START_MISSION' });
    expect(m5.screen).toBe('challenge');
  });

  it('training cursor walks every gate of every lesson before the challenge', () => {
    let s = run(initialState(), { type: 'SELECT_MISSION', id: 'color-switch' }, { type: 'START_MISSION' });
    expect(s.screen).toBe('training');
    expect([s.lesson, s.lessonCursor]).toEqual([0, -1]);
    s = reducer(s, { type: 'LESSON_NEXT' });
    expect([s.lesson, s.lessonCursor]).toEqual([0, 0]); // H applied
    s = reducer(s, { type: 'LESSON_NEXT' });
    expect([s.lesson, s.lessonCursor]).toEqual([1, -1]);
    s = reducer(s, { type: 'LESSON_NEXT' });
    s = reducer(s, { type: 'LESSON_NEXT' });
    expect([s.lesson, s.lessonCursor]).toEqual([1, 1]);
    s = reducer(s, { type: 'LESSON_PREV' });
    expect([s.lesson, s.lessonCursor]).toEqual([1, 0]);
    s = reducer(s, { type: 'LESSON_PREV' });
    s = reducer(s, { type: 'LESSON_PREV' });
    expect([s.lesson, s.lessonCursor]).toEqual([0, 0]);
    s = run(s, { type: 'LESSON_NEXT' }, { type: 'LESSON_NEXT' }, { type: 'LESSON_NEXT' }, { type: 'LESSON_NEXT' });
    expect(s.screen).toBe('challenge');
  });
});

describe('challenge placement rules', () => {
  it('places, swaps and removes crews; enforces the budget and the allowed palette', () => {
    let s = toChallenge('blind-dispatch'); // rsc3, X/Z, budget 1
    expect(s.selected).toBe('X');
    s = reducer(s, { type: 'SELECT_LETTER', letter: 'Y' }); // not allowed
    expect(s.selected).toBe('X');
    s = reducer(s, { type: 'TOGGLE_BLOCK', qubit: 4 });
    expect(s.placements).toEqual({ 4: 'X' });
    s = reducer(s, { type: 'TOGGLE_BLOCK', qubit: 5 }); // over budget → ignored
    expect(s.placements).toEqual({ 4: 'X' });
    s = reducer(s, { type: 'SELECT_LETTER', letter: 'Z' });
    s = reducer(s, { type: 'TOGGLE_BLOCK', qubit: 4 }); // swap colour on the same block
    expect(s.placements).toEqual({ 4: 'Z' });
    s = reducer(s, { type: 'TOGGLE_BLOCK', qubit: 4 }); // same colour again → remove
    expect(s.placements).toEqual({});
    s = reducer(s, { type: 'TOGGLE_BLOCK', qubit: 99 });
    expect(s.placements).toEqual({});
    s = reducer(s, { type: 'TOGGLE_BLOCK', qubit: 2 });
    s = reducer(s, { type: 'CLEAR_CREWS' });
    expect(crewCount(s.placements)).toBe(0);
  });

  it('confirming with no crews asks first; stand down commits the identity', () => {
    let s = toChallenge('first-alarm');
    s = reducer(s, { type: 'CONFIRM' });
    expect(s.screen).toBe('challenge');
    expect(s.standDownDialog).toBe(true);
    const cancelled = reducer(s, { type: 'STAND_DOWN_CANCEL' });
    expect(cancelled.standDownDialog).toBe(false);
    expect(cancelled.screen).toBe('challenge');
    s = reducer(s, { type: 'STAND_DOWN_CONFIRM' });
    expect(s.screen).toBe('debrief');
    expect(s.debrief?.crews).toBe('III');
    expect(s.debrief?.verdict).toBe('detectable');
  });

  it('placementsToPauli round-trips', () => {
    expect(placementsToPauli(9, placementsOf('IXIIIIZII')).x[1]).toBe(1);
    expect(placementsToPauli(9, placementsOf('IXIIIIZII')).z[6]).toBe(1);
  });
});

describe('full flow of every mission', () => {
  const missions = listPublicMissions();

  for (const m of missions) {
    it(`${m.id}: min-weight dispatch yields the expected verdict and stars`, () => {
      const def = getMission(m.id);
      let s = toChallenge(m.id);
      s = place(s, placementsOf(def.expected.minWeightCorrection));
      expect(crewCount(s.placements)).toBeLessThanOrEqual(m.budget);
      s = reducer(s, { type: 'CONFIRM' });
      expect(s.screen).toBe('debrief');
      const d = s.debrief;
      expect(d).not.toBeNull();
      if (d === null) return;
      expect(d.verdict).toBe(def.expected.minWeightVerdict);
      expect(d.fires).toBe(def.expected.propagated);
      expect(d.crews).toBe(def.expected.minWeightCorrection);
      if (m.id === 'silent-failure') {
        expect(d.verdict).toBe('logical-error');
        expect(d.verdictLabel).toBe('Silent failure — logical qubit flipped');
        expect(d.score.quality).toBe('unlucky');
        expect(d.score.stars).toBe(1);
        expect(d.score.maxStars).toBe(1);
        expect(d.score.completed).toBe(true);
        expect(d.logicalFlip.x).toEqual([true]);
        expect(d.whatIf.trueFireCrews).toBe('IXXIIIIII');
      } else {
        expect(d.verdict).toBe('success');
        expect(d.verdictLabel).toBe('Logical qubit safe');
        expect(d.score.quality).toBe('optimal');
        expect(d.score.stars).toBe(3);
        expect(d.score.maxStars).toBe(3);
      }
      expect(d.narrative).toBe(def.debrief[d.verdict]);
      expect(d.steps[d.steps.length - 1]?.id).toBe('verdict');
      // The debrief opens on step 1 and auto-plays (motion allowed); the banner is rendered regardless of the step.
      expect(s.replayIndex).toBe(0);
      expect(s.autoPlay).toBe(true);
      // Progress stored
      expect(s.progress[m.id]?.attempts).toBe(1);
      expect(s.progress[m.id]?.stars).toBe(d.score.stars);
      // Debrief → result → next mission
      s = reducer(s, { type: 'SHOW_RESULT' });
      expect(s.screen).toBe('result');
      s = reducer(s, { type: 'NEXT_MISSION' });
      expect(s.screen).toBe(m.index === 6 ? 'summary' : 'briefing');
    });

    it(`${m.id}: a wrong dispatch is not a success and Try again restarts the same mission`, () => {
      const def = getMission(m.id);
      const code = getCode(m.code);
      // Send one crew that is wrong: to a block that is NOT burning in the final fire, or (when every
      // block burns, as in the propagation lessons) a crew of the wrong colour to block 0.
      const fire = fromString(def.expected.propagated);
      let wrong: Record<number, CrewLetter> | null = null;
      for (let q = 0; q < code.n && wrong === null; q++) {
        if (letterAt(fire, q) === 'I') wrong = { [q]: m.allowed[0] ?? 'X' };
      }
      if (wrong === null) {
        const other = m.allowed.find((l) => l !== letterAt(fire, 0));
        expect(other).toBeDefined();
        wrong = { 0: other ?? 'X' };
      }
      let s = toChallenge(m.id);
      s = place(s, wrong);
      s = reducer(s, { type: 'CONFIRM' });
      expect(s.screen).toBe('debrief');
      expect(s.debrief?.verdict).not.toBe('success');
      expect(s.debrief?.score.stars).toBeLessThanOrEqual(1);
      s = reducer(s, { type: 'TRY_AGAIN' });
      expect(s.screen).toBe('challenge');
      expect(s.missionId).toBe(m.id);
      expect(s.placements).toEqual({});
      expect(s.debrief).toBeNull();
    });
  }

  it('mission 6 (maxStars 1): crews on blocks 1 and 2 succeed but score "lucky" (1 star); the block-3 crew is the same optimal call', () => {
    expect(missionMaxStars('silent-failure')).toBe(1);
    expect(missionMaxStars('first-alarm')).toBe(3);
    expect(missionMaxStars('no-such-mission')).toBe(3);
    expect(missionMaxStars('x', [{ id: 'x', maxStars: 7 }])).toBe(3);
    expect(missionMaxStars('x', [{ id: 'x', maxStars: 2 }])).toBe(2);
    expect(maxTotalStars()).toBe(16);
    const a = confirmDispatch('silent-failure', { 1: 'X', 2: 'X' });
    expect(a.verdict).toBe('success');
    expect(a.score.quality).toBe('lucky');
    expect(a.score.stars).toBe(1);
    expect(a.score.maxStars).toBe(1);
    expect(a.whatIf.trueFireCrews).toBeNull(); // the player sent exactly the true-fire crews: no counterfactual
    expect(a.whatIf.explanation).toMatch(/could not justify/);
    const b = confirmDispatch('silent-failure', { 3: 'X' });
    expect(b.verdict).toBe('logical-error');
    expect(b.score.quality).toBe('unlucky');
    expect(b.score.stars).toBe(1);
    expect(b.whatIf.equivalentToDecoder).toBe(true);
    expect(b.whatIf.explanation).toContain('is XIIIIIIII; your IIIXIIIII differs from it by a stabilizer, so it is the same call');
    expect(b.whatIf.explanation).toContain('leave IXXXIIIII on blocks 1, 2 and 3');
    const c = confirmDispatch('silent-failure', { 0: 'X' });
    expect(c.whatIf.explanation).toContain('is XIIIIIIII, and that is what you sent');
    expect(c.whatIf.explanation).toContain('leave XXXIIIIII on blocks 0, 1 and 2');
    expect(c.whatIf.explanation).toContain('on blocks 1 and 2: 2 fires');
  });

  it('mission 5: Z on block 6 or 7 are equivalent corrections (stabilizer twins); no counterfactual when crews equal the true fires', () => {
    const a = confirmDispatch('two-kinds-of-trouble', { 1: 'X', 6: 'Z' });
    const b = confirmDispatch('two-kinds-of-trouble', { 1: 'X', 7: 'Z' });
    expect(a.verdict).toBe('success');
    expect(b.verdict).toBe('success');
    expect(a.score.stars).toBe(3);
    expect(b.score.stars).toBe(3);
    expect(b.whatIf.equivalentToDecoder).toBe(true);
    expect(b.whatIf.explanation).toMatch(/stabilizer/);
    // a = decoder's dispatch (Z6); the true fire is on block 7, so the counterfactual is shown.
    expect(a.whatIf.trueFireCrews).toBe('IXIIIIIZI');
    // b = the true fires themselves: not shown "as if different".
    expect(b.whatIf.trueFireCrews).toBeNull();
    expect(b.whatIf.explanation).toContain('Your crews sat exactly on the true fires.');
  });

  it('propagation miss: the verdict label is a missed prediction, never a silent failure', () => {
    const d = confirmDispatch('color-switch', { 0: 'X', 1: 'X' }); // true end state XZ
    expect(d.verdict).toBe('logical-error');
    expect(d.verdictLabel).toBe('Prediction missed — fires left on the wires');
    expect(d.steps[d.steps.length - 1]?.caption).toMatch(/leaves a red-and-blue fire \(Y\) on block 1/);
    expect(d.whatIf.explanation).toContain('leave a red-and-blue fire (Y) on block 1 (1 block)');
    const ok = confirmDispatch('color-switch', { 0: 'X', 1: 'Z' });
    expect(ok.verdictLabel).toBe('Logical qubit safe');
  });

  it('standing down with fires present scores 0 stars and is not "close"', () => {
    const d = confirmDispatch('first-alarm', {});
    expect(d.verdict).toBe('detectable');
    expect(d.score.crewsUsed).toBe(0);
    expect(d.score.stars).toBe(0);
    expect(d.score.completed).toBe(false);
  });

  it('RECALL_BLOCK removes just that block; CLEAR_CREWS and CONFIRM are ignored while the stand-down dialog is open', () => {
    let s = toChallenge('two-kinds-of-trouble');
    s = place(s, { 1: 'X', 7: 'Z' });
    s = reducer(s, { type: 'RECALL_BLOCK', qubit: 7 });
    expect(s.placements).toEqual({ 1: 'X' });
    const same = reducer(s, { type: 'RECALL_BLOCK', qubit: 4 }); // empty block → no change (same reference)
    expect(same).toBe(s);
    s = reducer(s, { type: 'RECALL_BLOCK', qubit: 1 });
    expect(s.placements).toEqual({});
    s = reducer(s, { type: 'CONFIRM' });
    expect(s.standDownDialog).toBe(true);
    expect(reducer(s, { type: 'TOGGLE_BLOCK', qubit: 1 })).toBe(s);
    expect(reducer(s, { type: 'CLEAR_CREWS' })).toBe(s);
    expect(reducer(s, { type: 'CONFIRM' })).toBe(s);
  });

  it('CONFIRM with reducedMotion opens the debrief on step 1 without auto-play', () => {
    let s = toChallenge('first-alarm');
    s = place(s, { 1: 'X' });
    const reduced = reducer(s, { type: 'CONFIRM', reducedMotion: true });
    expect(reduced.screen).toBe('debrief');
    expect(reduced.replayIndex).toBe(0);
    expect(reduced.autoPlay).toBe(false);
    const full = reducer(s, { type: 'CONFIRM', reducedMotion: false });
    expect(full.replayIndex).toBe(0);
    expect(full.autoPlay).toBe(true);
    const standDown = reducer(reducer(toChallenge('first-alarm'), { type: 'CONFIRM' }), { type: 'STAND_DOWN_CONFIRM', reducedMotion: true });
    expect(standDown.screen).toBe('debrief');
    expect(standDown.autoPlay).toBe(false);
  });

  it('progress keeps the best stars and counts attempts; totalStars sums over missions', () => {
    let s = toChallenge('first-alarm');
    s = place(s, { 0: 'X' });
    s = reducer(s, { type: 'CONFIRM' });
    expect(s.progress['first-alarm']).toEqual({ stars: 0, attempts: 1, completed: false });
    s = reducer(s, { type: 'TRY_AGAIN' });
    s = place(s, { 1: 'X' });
    s = reducer(s, { type: 'CONFIRM' });
    expect(s.progress['first-alarm']).toEqual({ stars: 3, attempts: 2, completed: true });
    expect(totalStars(s.progress)).toBe(3);
    expect(toSave(s)).toEqual({ version: 1, progress: s.progress, settings: s.settings });
    s = reducer(s, { type: 'RESET_PROGRESS' });
    expect(s.progress).toEqual({});
  });

  it('"Progress reset." clears on the next screen change; other notices persist until dismissed', () => {
    let s = run(initialState(), { type: 'PLAY' }, { type: 'OPEN_SETTINGS' }, { type: 'RESET_PROGRESS' });
    expect(s.notice).toBe(PROGRESS_RESET_NOTICE);
    s = reducer(s, { type: 'SET_SOUND', on: true }); // same screen → notice stays
    expect(s.notice).toBe(PROGRESS_RESET_NOTICE);
    s = reducer(s, { type: 'CLOSE_OVERLAY' });
    expect(s.screen).toBe('missions');
    expect(s.notice).toBeNull();
    let c = run(initialState(undefined, 'Saved progress was unreadable and has been reset.'), { type: 'PLAY' });
    expect(c.notice).toBe('Saved progress was unreadable and has been reset.');
    c = reducer(c, { type: 'DISMISS_NOTICE' });
    expect(c.notice).toBeNull();
  });
});

describe('replay controls', () => {
  it('prev/next/goto clamp and auto-play stops at the end', () => {
    let s = toChallenge('red-forward-blue-backward');
    s = place(s, { 0: 'Y', 1: 'Y' });
    s = reducer(s, { type: 'CONFIRM' });
    const last = (s.debrief?.steps.length ?? 0) - 1;
    expect(s.replayIndex).toBe(0);
    expect(s.autoPlay).toBe(true);
    s = reducer(s, { type: 'REPLAY_GOTO', index: last });
    expect(s.autoPlay).toBe(false);
    s = reducer(s, { type: 'REPLAY_AUTO', on: true }); // from the end: restarts
    expect(s.replayIndex).toBe(0);
    expect(s.autoPlay).toBe(true);
    for (let i = 0; i < last; i++) s = reducer(s, { type: 'REPLAY_NEXT' });
    expect(s.replayIndex).toBe(last);
    expect(s.autoPlay).toBe(false);
    s = reducer(s, { type: 'REPLAY_NEXT' });
    expect(s.replayIndex).toBe(last);
    s = reducer(s, { type: 'REPLAY_GOTO', index: -5 });
    expect(s.replayIndex).toBe(0);
    s = reducer(s, { type: 'REPLAY_PREV' });
    expect(s.replayIndex).toBe(0);
  });
});

describe('settings', () => {
  it('sound is off by default and toggles persist in the save', () => {
    let s = initialState();
    expect(s.settings).toEqual({ sound: false, reducedMotion: false });
    s = reducer(s, { type: 'SET_SOUND', on: true });
    s = reducer(s, { type: 'SET_REDUCED_MOTION', on: true });
    expect(toSave(s).settings).toEqual({ sound: true, reducedMotion: true });
    s = reducer(s, { type: 'HYDRATE', save: { version: 1, progress: {}, settings: { sound: false, reducedMotion: false } }, notice: 'x' });
    expect(s.settings.sound).toBe(false);
    expect(s.notice).toBe('x');
    expect(reducer(s, { type: 'DISMISS_NOTICE' }).notice).toBeNull();
  });
});
