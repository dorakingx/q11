import { describe, expect, it } from 'vitest';
import { evaluate, fromString, getCode, getMission, letterAt, syndromeToArray, toString } from '../quantum';
import { DISTRICTS } from './city';
import { confirmDispatch, crewCount, initialState, placementsToPauli, PROGRESS_RESET_NOTICE, reducer, toSave, totalStars, TUTORIAL_MISSION_ID } from './machine';
import { listPublicMissions, maxTotalStars, missionMaxStars } from './missions';
import { DEFAULT_SETTINGS } from './persistence';
import { openSave, openState, place, placementsOf, run, toChallenge } from './test-utils';
import type { CrewLetter, GameState } from './types';

/** Fresh install: nothing saved, tutorial not done, free roam off. */
function fresh(): GameState {
  return initialState();
}

/** Confirm and play the spray through to the finished dispatch screen. */
function confirmAndFinish(state: GameState): GameState {
  const s = reducer(state, { type: 'CONFIRM' });
  expect(s.screen).toBe('dispatch');
  return reducer(s, { type: 'DISPATCH_DONE' });
}

describe('navigation', () => {
  it('title → city → briefing → training/challenge; overlays return where they came from', () => {
    let s = initialState(openSave());
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
    const m5 = run(openState(), { type: 'SELECT_MISSION', id: 'two-kinds-of-trouble' }, { type: 'START_MISSION' });
    expect(m5.screen).toBe('challenge');
  });

  it('training cursor walks every gate of every lesson before the challenge', () => {
    let s = run(openState(), { type: 'SELECT_MISSION', id: 'color-switch' }, { type: 'START_MISSION' });
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

describe('guided first run (tutorial)', () => {
  it('PLAY on a fresh save skips the city and opens the first district briefing with the tutorial active', () => {
    const s = reducer(fresh(), { type: 'PLAY' });
    expect(TUTORIAL_MISSION_ID).toBe('first-alarm');
    expect(s.screen).toBe('briefing');
    expect(s.missionId).toBe('first-alarm');
    expect(s.tutorialActive).toBe(true);
    expect(s.tutorialDone).toBe(false);
  });

  it('success in the tutorial marks it done; Next then reveals the city; PLAY afterwards goes to the city', () => {
    let s = run(fresh(), { type: 'PLAY' }, { type: 'START_MISSION' }, { type: 'START_CHALLENGE' });
    expect(s.screen).toBe('challenge');
    s = place(s, { 1: 'X' });
    s = confirmAndFinish(s);
    expect(s.debrief?.verdict).toBe('success');
    expect(s.tutorialDone).toBe(true);
    expect(s.tutorialActive).toBe(true);
    s = reducer(s, { type: 'NEXT_MISSION' });
    expect(s.screen).toBe('missions');
    expect(s.tutorialActive).toBe(false);
    expect(toSave(s).tutorialDone).toBe(true);
    const again = run(initialState(toSave(s)), { type: 'PLAY' });
    expect(again.screen).toBe('missions');
    expect(again.tutorialActive).toBe(false);
  });

  it('a failed tutorial attempt keeps the tutorial active and not done; Try again stays in the guided scene', () => {
    let s = run(fresh(), { type: 'PLAY' }, { type: 'START_MISSION' }, { type: 'START_CHALLENGE' });
    s = place(s, { 0: 'X' });
    s = confirmAndFinish(s);
    expect(s.debrief?.verdict).toBe('detectable');
    expect(s.tutorialDone).toBe(false);
    expect(s.tutorialActive).toBe(true);
    s = reducer(s, { type: 'TRY_AGAIN' });
    expect(s.screen).toBe('challenge');
    expect(s.tutorialActive).toBe(true);
    // Replaying the saved state: PLAY would still enter the tutorial.
    expect(run(initialState(toSave(s)), { type: 'PLAY' }).screen).toBe('briefing');
  });

  it('TUTORIAL_SKIP and OPEN_MISSIONS end the tutorial and open the city with tutorialDone = true', () => {
    const inTutorial = run(fresh(), { type: 'PLAY' });
    const skipped = reducer(inTutorial, { type: 'TUTORIAL_SKIP' });
    expect(skipped.screen).toBe('missions');
    expect(skipped.tutorialDone).toBe(true);
    expect(skipped.tutorialActive).toBe(false);
    const left = reducer(inTutorial, { type: 'OPEN_MISSIONS' });
    expect(left.screen).toBe('missions');
    expect(left.tutorialDone).toBe(true);
    expect(left.tutorialActive).toBe(false);
    // Skipping outside the tutorial only flips the flag.
    const idle = reducer(fresh(), { type: 'TUTORIAL_SKIP' });
    expect(idle.screen).toBe('title');
    expect(idle.tutorialDone).toBe(true);
  });

  it('HYDRATE restores tutorialDone', () => {
    const s = reducer(fresh(), { type: 'HYDRATE', save: openSave({ tutorialDone: true }), notice: null });
    expect(s.tutorialDone).toBe(true);
    expect(reducer(s, { type: 'PLAY' }).screen).toBe('missions');
  });
});

describe('district progression', () => {
  it('only the first unsolved district is selectable; solving it unlocks the next; solved ones stay replayable', () => {
    let s = run(initialState(openSave({ settings: DEFAULT_SETTINGS })), { type: 'PLAY' });
    expect(s.screen).toBe('missions');
    expect(reducer(s, { type: 'SELECT_MISSION', id: 'red-forward-blue-backward' })).toBe(s); // locked → no-op
    expect(reducer(s, { type: 'SELECT_MISSION', id: 'silent-failure' })).toBe(s);
    expect(reducer(s, { type: 'SELECT_MISSION', id: 'no-such-mission' })).toBe(s);
    s = reducer(s, { type: 'SELECT_MISSION', id: 'first-alarm' });
    expect(s.screen).toBe('briefing');
    s = toChallenge('first-alarm', run(s, { type: 'OPEN_MISSIONS' }));
    s = place(s, { 1: 'X' });
    s = confirmAndFinish(s);
    s = reducer(s, { type: 'OPEN_MISSIONS' });
    expect(reducer(s, { type: 'SELECT_MISSION', id: 'red-forward-blue-backward' }).screen).toBe('briefing');
    expect(reducer(s, { type: 'SELECT_MISSION', id: 'first-alarm' }).screen).toBe('briefing'); // replayable
    expect(reducer(s, { type: 'SELECT_MISSION', id: 'color-switch' })).toBe(s); // still locked
  });

  it('Free roam opens every district; turning it off locks them again', () => {
    let s = run(initialState(openSave({ settings: DEFAULT_SETTINGS })), { type: 'PLAY' });
    s = reducer(s, { type: 'SET_FREE_ROAM', on: true });
    expect(s.settings.freeRoam).toBe(true);
    for (const d of DISTRICTS) expect(reducer(s, { type: 'SELECT_MISSION', id: d.missionId }).screen).toBe('briefing');
    s = reducer(s, { type: 'SET_FREE_ROAM', on: false });
    expect(reducer(s, { type: 'SELECT_MISSION', id: 'old-town-nope' })).toBe(s);
    expect(reducer(s, { type: 'SELECT_MISSION', id: 'silent-failure' })).toBe(s);
    expect(reducer(s, { type: 'SET_FREE_ROAM', on: false })).toBe(s); // unchanged → same reference
  });

  it('NEXT_MISSION returns to the city with the next district pre-selected, and ends on the summary after Old Town', () => {
    let s = toChallenge('two-kinds-of-trouble');
    s = place(s, { 1: 'X', 6: 'Z' });
    s = confirmAndFinish(s);
    s = reducer(s, { type: 'NEXT_MISSION' });
    expect(s.screen).toBe('missions');
    expect(s.celebrate).toBe('market');
    expect(s.citySelect).toBe('old-town');
    expect(s.debrief).not.toBeNull(); // the debrief stays until the next briefing
    s = reducer(s, { type: 'SELECT_MISSION', id: 'silent-failure' });
    expect(s.screen).toBe('briefing');
    expect(s.celebrate).toBeNull();
    expect(s.citySelect).toBeNull();
    s = run(s, { type: 'START_MISSION' });
    s = place(s, { 0: 'X' });
    s = confirmAndFinish(s);
    s = reducer(s, { type: 'SHOW_RESULT' });
    s = reducer(s, { type: 'NEXT_MISSION' });
    expect(s.screen).toBe('summary');
    expect(s.celebrate).toBeNull();
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

  it('undo/redo walk the placement history; a new placement drops the redo branch; history is bounded', () => {
    let s = toChallenge('two-kinds-of-trouble'); // budget 2
    expect(reducer(s, { type: 'UNDO_PLACEMENT' })).toBe(s);
    expect(reducer(s, { type: 'REDO_PLACEMENT' })).toBe(s);
    s = place(s, { 1: 'X' });
    s = place(s, { 7: 'Z' });
    expect(s.undoStack).toEqual([{}, { 1: 'X' }]);
    s = reducer(s, { type: 'UNDO_PLACEMENT' });
    expect(s.placements).toEqual({ 1: 'X' });
    expect(s.redoStack).toEqual([{ 1: 'X', 7: 'Z' }]);
    s = reducer(s, { type: 'UNDO_PLACEMENT' });
    expect(s.placements).toEqual({});
    expect(reducer(s, { type: 'UNDO_PLACEMENT' })).toBe(s); // nothing left
    s = reducer(s, { type: 'REDO_PLACEMENT' });
    expect(s.placements).toEqual({ 1: 'X' });
    s = reducer(s, { type: 'REDO_PLACEMENT' });
    expect(s.placements).toEqual({ 1: 'X', 7: 'Z' });
    expect(reducer(s, { type: 'REDO_PLACEMENT' })).toBe(s);
    s = reducer(s, { type: 'UNDO_PLACEMENT' });
    s = reducer(s, { type: 'RECALL_BLOCK', qubit: 1 }); // new change → redo branch gone
    expect(s.placements).toEqual({});
    expect(s.redoStack).toEqual([]);
    s = reducer(s, { type: 'CLEAR_CREWS' }); // nothing to clear → no history entry
    expect(s.undoStack).toEqual([{}, { 1: 'X' }]);
    // Bounded history: 30 toggles keep only the last 20 snapshots.
    let t = toChallenge('blind-dispatch');
    for (let i = 0; i < 30; i++) t = reducer(t, { type: 'TOGGLE_BLOCK', qubit: 4 });
    expect(t.undoStack).toHaveLength(20);
    expect(t.placements).toEqual({});
    // Undo/redo are planning-stage only.
    const d = reducer(place(toChallenge('first-alarm'), { 1: 'X' }), { type: 'CONFIRM' });
    expect(reducer(d, { type: 'UNDO_PLACEMENT' })).toBe(d);
  });

  it('tapping a detector highlights its houses; same detector again clears; invalid index ignored; cleared on screen change', () => {
    let s = toChallenge('blind-dispatch');
    expect(s.highlightedCheck).toBeNull();
    s = reducer(s, { type: 'TOGGLE_DETECTOR_HIGHLIGHT', checkIndex: 3 });
    expect(s.highlightedCheck).toBe(3);
    s = reducer(s, { type: 'TOGGLE_DETECTOR_HIGHLIGHT', checkIndex: 5 });
    expect(s.highlightedCheck).toBe(5);
    expect(reducer(s, { type: 'TOGGLE_DETECTOR_HIGHLIGHT', checkIndex: 8 })).toBe(s); // rsc3 has checks 0..7
    expect(reducer(s, { type: 'TOGGLE_DETECTOR_HIGHLIGHT', checkIndex: -1 })).toBe(s);
    expect(reducer(s, { type: 'TOGGLE_DETECTOR_HIGHLIGHT', checkIndex: 1.5 })).toBe(s);
    s = reducer(s, { type: 'TOGGLE_DETECTOR_HIGHLIGHT', checkIndex: 5 });
    expect(s.highlightedCheck).toBeNull();
    s = reducer(s, { type: 'TOGGLE_DETECTOR_HIGHLIGHT', checkIndex: 0 });
    expect(reducer(s, { type: 'TOGGLE_DETECTOR_HIGHLIGHT', checkIndex: null }).highlightedCheck).toBeNull();
    s = place(s, { 4: 'X' });
    s = reducer(s, { type: 'CONFIRM' });
    expect(s.screen).toBe('dispatch');
    expect(s.highlightedCheck).toBeNull();
    // No mission (title) → ignored.
    const title = fresh();
    expect(reducer(title, { type: 'TOGGLE_DETECTOR_HIGHLIGHT', checkIndex: 0 })).toBe(title);
  });

  it('confirming with no crews asks first; stand down commits the identity and opens the dispatch screen', () => {
    let s = toChallenge('first-alarm');
    s = reducer(s, { type: 'CONFIRM' });
    expect(s.screen).toBe('challenge');
    expect(s.standDownDialog).toBe(true);
    const cancelled = reducer(s, { type: 'STAND_DOWN_CANCEL' });
    expect(cancelled.standDownDialog).toBe(false);
    expect(cancelled.screen).toBe('challenge');
    s = reducer(s, { type: 'STAND_DOWN_CONFIRM' });
    expect(s.screen).toBe('dispatch');
    expect(s.dispatchDone).toBe(false);
    expect(s.debrief?.crews).toBe('III');
    expect(s.debrief?.verdict).toBe('detectable');
  });

  it('placementsToPauli round-trips', () => {
    expect(placementsToPauli(9, placementsOf('IXIIIIZII')).x[1]).toBe(1);
    expect(placementsToPauli(9, placementsOf('IXIIIIZII')).z[6]).toBe(1);
  });
});

describe('dispatch (spray) screen', () => {
  it('CONFIRM → dispatch; DISPATCH_DONE/SKIP are idempotent; OPEN_WHY / SHOW_RESULT only once the spray is done', () => {
    let s = toChallenge('blind-dispatch');
    s = place(s, { 4: 'X' });
    s = reducer(s, { type: 'CONFIRM' });
    expect(s.screen).toBe('dispatch');
    expect(s.dispatchDone).toBe(false);
    expect(s.debrief).not.toBeNull();
    expect(s.progress['blind-dispatch']?.attempts).toBe(1);
    // Not yet: the player must watch (or skip) the spray first.
    expect(reducer(s, { type: 'OPEN_WHY' })).toBe(s);
    expect(reducer(s, { type: 'SHOW_RESULT' })).toBe(s);
    expect(reducer(s, { type: 'NEXT_MISSION' })).toBe(s);
    // Second CONFIRM on the dispatch screen: no-op, progress not double counted.
    expect(reducer(s, { type: 'CONFIRM' })).toBe(s);
    expect(reducer(s, { type: 'STAND_DOWN_CONFIRM' })).toBe(s);
    const done = reducer(s, { type: 'DISPATCH_DONE' });
    expect(done.dispatchDone).toBe(true);
    expect(done.screen).toBe('dispatch');
    expect(reducer(done, { type: 'DISPATCH_DONE' })).toBe(done);
    expect(reducer(done, { type: 'DISPATCH_SKIP' })).toBe(done);
    expect(reducer(s, { type: 'DISPATCH_SKIP' })).toEqual(done);
    expect(done.progress['blind-dispatch']?.attempts).toBe(1);
    // Rapid taps: CONFIRM / DISPATCH_DONE / CONFIRM again never add an attempt or change the debrief.
    const hammered = run(done, { type: 'CONFIRM' }, { type: 'DISPATCH_DONE' }, { type: 'CONFIRM' }, { type: 'DISPATCH_SKIP' });
    expect(hammered).toBe(done);
    // From the finished dispatch: Why? (debrief replay) or straight to the result.
    const why = reducer(done, { type: 'OPEN_WHY' });
    expect(why.screen).toBe('debrief');
    expect(why.replayIndex).toBe(0);
    expect(why.autoPlay).toBe(true);
    const result = reducer(done, { type: 'SHOW_RESULT' });
    expect(result.screen).toBe('result');
    // Result → Why? works too; debrief → result works; TRY_AGAIN works from all three.
    expect(reducer(result, { type: 'OPEN_WHY' }).screen).toBe('debrief');
    expect(reducer(why, { type: 'SHOW_RESULT' }).screen).toBe('result');
    for (const st of [done, why, result]) {
      const again = reducer(st, { type: 'TRY_AGAIN' });
      expect(again.screen).toBe('challenge');
      expect(again.placements).toEqual({});
      expect(again.undoStack).toEqual([]);
      expect(again.redoStack).toEqual([]);
      expect(again.debrief).toBeNull();
      expect(again.dispatchDone).toBe(false);
    }
    // DISPATCH_DONE outside the dispatch screen is ignored.
    expect(reducer(why, { type: 'DISPATCH_DONE' })).toBe(why);
    expect(reducer(toChallenge('first-alarm'), { type: 'DISPATCH_DONE' }).dispatchDone).toBe(false);
  });

  it('OPEN_WHY respects reduced motion (no auto-play) and the setting when the flag is omitted', () => {
    let s = toChallenge('first-alarm');
    s = place(s, { 1: 'X' });
    const done = confirmAndFinish(s);
    expect(reducer(done, { type: 'OPEN_WHY', reducedMotion: true }).autoPlay).toBe(false);
    expect(reducer(done, { type: 'OPEN_WHY', reducedMotion: false }).autoPlay).toBe(true);
    const reducedSetting = { ...done, settings: { ...done.settings, reducedMotion: true } };
    expect(reducer(reducedSetting, { type: 'OPEN_WHY' }).autoPlay).toBe(false);
  });

  it('CONFIRM with reducedMotion prepares the later replay without auto-play', () => {
    let s = toChallenge('first-alarm');
    s = place(s, { 1: 'X' });
    const reduced = reducer(s, { type: 'CONFIRM', reducedMotion: true });
    expect(reduced.screen).toBe('dispatch');
    expect(reduced.replayIndex).toBe(0);
    expect(reduced.autoPlay).toBe(false);
    const full = reducer(s, { type: 'CONFIRM', reducedMotion: false });
    expect(full.autoPlay).toBe(true);
    const standDown = reducer(reducer(toChallenge('first-alarm'), { type: 'CONFIRM' }), { type: 'STAND_DOWN_CONFIRM', reducedMotion: true });
    expect(standDown.screen).toBe('dispatch');
    expect(standDown.autoPlay).toBe(false);
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
      expect(s.screen).toBe('dispatch');
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
      // Progress stored once, at confirm.
      expect(s.progress[m.id]?.attempts).toBe(1);
      expect(s.progress[m.id]?.stars).toBe(d.score.stars);
      // Spray → Why? replay (opens on step 1, auto-plays) → result → next district
      s = reducer(s, { type: 'DISPATCH_DONE' });
      s = reducer(s, { type: 'OPEN_WHY' });
      expect(s.screen).toBe('debrief');
      expect(s.replayIndex).toBe(0);
      expect(s.autoPlay).toBe(true);
      s = reducer(s, { type: 'SHOW_RESULT' });
      expect(s.screen).toBe('result');
      expect(s.progress[m.id]?.attempts).toBe(1);
      s = reducer(s, { type: 'NEXT_MISSION' });
      // Every completed mission returns to the city (the next call pre-selected); a completed Old Town ends the shift.
      const here = DISTRICTS[m.index - 1];
      const next = DISTRICTS[m.index];
      if (m.index === 6) {
        expect(s.screen).toBe('summary');
      } else {
        expect(s.screen).toBe('missions');
        expect(s.celebrate).toBe(here?.id);
        expect(s.citySelect).toBe(next?.id);
      }
      expect(s.progress[m.id]?.attempts).toBe(1);
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
      expect(s.screen).toBe('dispatch');
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
    expect(b.whatIf.explanation).toContain('leave IXXXIIIII on houses 1, 2 and 3');
    const c = confirmDispatch('silent-failure', { 0: 'X' });
    expect(c.whatIf.explanation).toContain('is XIIIIIIII, and that is what you sent');
    expect(c.whatIf.explanation).toContain('leave XXXIIIIII on houses 0, 1 and 2');
    expect(c.whatIf.explanation).toContain('on houses 1 and 2: 2 fires');
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
    expect(d.steps[d.steps.length - 1]?.caption).toMatch(/leaves a red-and-blue fire \(Y\) on house 1/);
    expect(d.whatIf.explanation).toContain('leave a red-and-blue fire (Y) on house 1 (1 house)');
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
    expect(reducer(s, { type: 'UNDO_PLACEMENT' })).toBe(s);
    expect(reducer(s, { type: 'CONFIRM' })).toBe(s);
  });

  it('progress keeps the best stars and counts attempts exactly once per confirm; totalStars sums over missions', () => {
    let s = toChallenge('first-alarm');
    s = place(s, { 0: 'X' });
    s = confirmAndFinish(s);
    expect(s.progress['first-alarm']).toEqual({ stars: 0, attempts: 1, completed: false });
    s = run(s, { type: 'OPEN_WHY' }, { type: 'SHOW_RESULT' });
    expect(s.progress['first-alarm']?.attempts).toBe(1);
    s = reducer(s, { type: 'TRY_AGAIN' });
    s = place(s, { 1: 'X' });
    s = confirmAndFinish(s);
    expect(s.progress['first-alarm']).toEqual({ stars: 3, attempts: 2, completed: true });
    expect(totalStars(s.progress)).toBe(3);
    expect(toSave(s)).toEqual({ version: 2, progress: s.progress, settings: s.settings, tutorialDone: true });
    s = reducer(s, { type: 'RESET_PROGRESS' });
    expect(s.progress).toEqual({});
  });

  it('"Progress reset." clears on the next screen change; other notices persist until dismissed', () => {
    let s = run(openState(), { type: 'OPEN_SETTINGS' }, { type: 'RESET_PROGRESS' });
    expect(s.notice).toBe(PROGRESS_RESET_NOTICE);
    s = reducer(s, { type: 'SET_SOUND', on: true }); // same screen → notice stays
    expect(s.notice).toBe(PROGRESS_RESET_NOTICE);
    s = reducer(s, { type: 'CLOSE_OVERLAY' });
    expect(s.screen).toBe('missions');
    expect(s.notice).toBeNull();
    let c = run(initialState(openSave(), 'Saved progress was unreadable and has been reset.'), { type: 'PLAY' });
    expect(c.notice).toBe('Saved progress was unreadable and has been reset.');
    c = reducer(c, { type: 'DISMISS_NOTICE' });
    expect(c.notice).toBeNull();
  });
});

describe('replay controls', () => {
  it('prev/next/goto clamp and auto-play stops at the end', () => {
    let s = toChallenge('red-forward-blue-backward');
    s = place(s, { 0: 'Y', 1: 'Y' });
    s = run(s, { type: 'CONFIRM' }, { type: 'DISPATCH_DONE' }, { type: 'OPEN_WHY' });
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

describe('city arrival contract (celebrate / citySelect / CELEBRATED)', () => {
  /** Progress with the first `n` districts solved (3 stars each) and free roam off. */
  function solvedUpTo(n: number): GameState {
    const progress = Object.fromEntries(DISTRICTS.slice(0, n).map((d) => [d.missionId, { stars: 3 as const, attempts: 1, completed: true }]));
    return run(initialState(openSave({ settings: DEFAULT_SETTINGS, progress })), { type: 'PLAY' });
  }

  it('fresh state and PLAY carry no celebration or pre-selection', () => {
    expect(initialState()).toMatchObject({ celebrate: null, citySelect: null });
    expect(openState()).toMatchObject({ screen: 'missions', celebrate: null, citySelect: null });
  });

  it('success → city: celebrate = the solved district, citySelect = the next district (now available), attempts counted once', () => {
    let s = toChallenge('first-alarm', solvedUpTo(0));
    s = place(s, { 1: 'X' });
    s = confirmAndFinish(s);
    expect(s.progress['first-alarm']?.attempts).toBe(1);
    s = reducer(s, { type: 'NEXT_MISSION' });
    expect(s.screen).toBe('missions');
    expect(s.celebrate).toBe('station-row');
    expect(s.citySelect).toBe('bridge');
    expect(s.progress['first-alarm']).toEqual({ stars: 3, attempts: 1, completed: true });
    // The city reports the toast finished: celebrate clears, the pre-selection stays; a second CELEBRATED is a no-op.
    const done = reducer(s, { type: 'CELEBRATED' });
    expect(done.celebrate).toBeNull();
    expect(done.citySelect).toBe('bridge');
    expect(reducer(done, { type: 'CELEBRATED' })).toBe(done);
  });

  it('failure → city: nothing to celebrate, citySelect = the current district (the next one is still locked)', () => {
    let s = toChallenge('first-alarm', solvedUpTo(0));
    s = place(s, { 0: 'X' });
    s = confirmAndFinish(s);
    expect(s.debrief?.score.completed).toBe(false);
    for (const via of [{ type: 'NEXT_MISSION' } as const, { type: 'OPEN_MISSIONS' } as const]) {
      const city = reducer(s, via);
      expect(city.screen).toBe('missions');
      expect(city.celebrate).toBeNull();
      expect(city.citySelect).toBe('station-row');
      expect(reducer(city, { type: 'SELECT_MISSION', id: 'red-forward-blue-backward' })).toBe(city); // never a locked briefing
    }
    // Why? → result → Next: the same arrival.
    const viaResult = run(s, { type: 'OPEN_WHY' }, { type: 'SHOW_RESULT' }, { type: 'NEXT_MISSION' });
    expect(viaResult).toMatchObject({ screen: 'missions', celebrate: null, citySelect: 'station-row' });
  });

  it('OPEN_MISSIONS from a finished (or still playing) dispatch, the debrief and the result celebrates a completed mission', () => {
    let s = toChallenge('blind-dispatch', solvedUpTo(3));
    s = place(s, { 4: 'X' });
    const playing = reducer(s, { type: 'CONFIRM' });
    expect(reducer(playing, { type: 'NEXT_MISSION' })).toBe(playing); // not while the spray plays
    expect(reducer(playing, { type: 'OPEN_MISSIONS' })).toMatchObject({ screen: 'missions', celebrate: 'central', citySelect: 'market' });
    const done = reducer(playing, { type: 'DISPATCH_DONE' });
    expect(reducer(done, { type: 'OPEN_MISSIONS' })).toMatchObject({ screen: 'missions', celebrate: 'central', citySelect: 'market' });
    const why = reducer(done, { type: 'OPEN_WHY' });
    expect(reducer(why, { type: 'OPEN_MISSIONS' })).toMatchObject({ screen: 'missions', celebrate: 'central', citySelect: 'market' });
    const result = reducer(why, { type: 'SHOW_RESULT' });
    expect(reducer(result, { type: 'OPEN_MISSIONS' })).toMatchObject({ screen: 'missions', celebrate: 'central', citySelect: 'market' });
    expect(reducer(result, { type: 'NEXT_MISSION' })).toMatchObject({ screen: 'missions', celebrate: 'central', citySelect: 'market' });
  });

  it('OPEN_MISSIONS from the briefing / training / challenge celebrates nothing and pre-selects nothing', () => {
    const briefing = reducer(openState(), { type: 'SELECT_MISSION', id: 'blind-dispatch' });
    expect(reducer(briefing, { type: 'OPEN_MISSIONS' })).toMatchObject({ screen: 'missions', celebrate: null, citySelect: null });
    const challenge = toChallenge('blind-dispatch');
    expect(reducer(place(challenge, { 4: 'X' }), { type: 'OPEN_MISSIONS' })).toMatchObject({ screen: 'missions', celebrate: null, citySelect: null });
  });

  it('replaying a solved district: the next district is already solved, so the city pre-selects the district just played', () => {
    let s = toChallenge('first-alarm', solvedUpTo(2));
    s = place(s, { 1: 'X' });
    s = confirmAndFinish(s);
    s = reducer(s, { type: 'NEXT_MISSION' });
    expect(s).toMatchObject({ screen: 'missions', celebrate: 'station-row', citySelect: 'station-row' });
  });

  it('free roam: the next district is pre-selected even when it would otherwise be locked or is solved', () => {
    let s = toChallenge('first-alarm'); // openState = free roam
    s = place(s, { 1: 'X' });
    s = confirmAndFinish(s);
    expect(reducer(s, { type: 'NEXT_MISSION' })).toMatchObject({ screen: 'missions', celebrate: 'station-row', citySelect: 'bridge' });
    let m5 = toChallenge('two-kinds-of-trouble'); // districts 1–4 unsolved, free roam on
    m5 = place(m5, { 1: 'X', 7: 'Z' });
    m5 = confirmAndFinish(m5);
    expect(reducer(m5, { type: 'NEXT_MISSION' })).toMatchObject({ screen: 'missions', celebrate: 'market', citySelect: 'old-town' });
  });

  it('Old Town: completed → summary; not completed → city with Old Town pre-selected', () => {
    let s = toChallenge('silent-failure');
    s = place(s, { 0: 'X' }); // optimal, unlucky: completed
    s = confirmAndFinish(s);
    expect(s.debrief?.score.completed).toBe(true);
    expect(reducer(s, { type: 'NEXT_MISSION' })).toMatchObject({ screen: 'summary', celebrate: null, citySelect: null });
    let bad = toChallenge('silent-failure');
    bad = place(bad, { 4: 'X' }); // wrong house: still burning, not completed
    bad = confirmAndFinish(bad);
    expect(bad.debrief?.score.completed).toBe(false);
    expect(reducer(bad, { type: 'NEXT_MISSION' })).toMatchObject({ screen: 'missions', celebrate: null, citySelect: 'old-town' });
  });

  it('the guided first run: Next reveals the city celebrating Rowhouse Lane with Harbor Bridge pre-selected', () => {
    let s = run(fresh(), { type: 'PLAY' }, { type: 'START_MISSION' }, { type: 'START_CHALLENGE' });
    s = place(s, { 1: 'X' });
    s = confirmAndFinish(s);
    s = reducer(s, { type: 'NEXT_MISSION' });
    expect(s).toMatchObject({ screen: 'missions', tutorialActive: false, tutorialDone: true, celebrate: 'station-row', citySelect: 'bridge' });
  });

  it('OPEN_TITLE and the next briefing drop the city state; overlays keep it', () => {
    let s = toChallenge('first-alarm', solvedUpTo(0));
    s = place(s, { 1: 'X' });
    s = run(confirmAndFinish(s), { type: 'NEXT_MISSION' });
    expect(s.celebrate).toBe('station-row');
    const settings = reducer(s, { type: 'OPEN_SETTINGS' });
    expect(settings.celebrate).toBe('station-row');
    expect(reducer(settings, { type: 'CLOSE_OVERLAY' })).toMatchObject({ screen: 'missions', celebrate: 'station-row', citySelect: 'bridge' });
    expect(reducer(s, { type: 'OPEN_TITLE' })).toMatchObject({ celebrate: null, citySelect: null });
    expect(reducer(s, { type: 'SELECT_MISSION', id: 'red-forward-blue-backward' })).toMatchObject({ screen: 'briefing', celebrate: null, citySelect: null });
  });
});

describe('Debrief.alternative (computed at commit)', () => {
  it('true-fire crews when the call was decoder-equivalent and the fires sit elsewhere (mission 5 Z6 vs the true Z7; mission 6 unlucky)', () => {
    const a = confirmDispatch('two-kinds-of-trouble', { 1: 'X', 6: 'Z' });
    expect(a.alternative).toEqual({ crews: 'IXIIIIIZI', verdict: 'success', kind: 'true-fires', residual: 'IIIIIIIII', syndromeOfResidual: [0, 0, 0, 0, 0, 0, 0, 0], logicalFlip: { x: [false], z: [false] } });
    const u = confirmDispatch('silent-failure', { 0: 'X' });
    expect(u.alternative).toMatchObject({ crews: 'IXXIIIIII', verdict: 'success', kind: 'true-fires', residual: 'IIIIIIIII' });
  });

  it("decoder crews otherwise: a miss (blind dispatch X5), a lucky guess (mission 6 X1 X2) and the player's own exact call", () => {
    const miss = confirmDispatch('blind-dispatch', { 5: 'X' });
    expect(miss.alternative).toMatchObject({ crews: 'IIIIXIIII', verdict: 'success', kind: 'decoder', residual: 'IIIIIIIII' });
    const lucky = confirmDispatch('silent-failure', { 1: 'X', 2: 'X' });
    expect(lucky.alternative).toMatchObject({ crews: 'XIIIIIIII', verdict: 'logical-error', kind: 'decoder', residual: 'XXXIIIIII', syndromeOfResidual: [0, 0, 0, 0, 0, 0, 0, 0], logicalFlip: { x: [true], z: [false] } });
    const exact = confirmDispatch('blind-dispatch', { 4: 'X' });
    expect(exact.alternative).toMatchObject({ crews: exact.crews, verdict: 'success', kind: 'decoder' });
  });

  it('bare wires: the alternative is the crews where the fires really ended, evaluated by the engine', () => {
    const d = confirmDispatch('color-switch', { 0: 'X', 1: 'X' });
    expect(d.alternative).toEqual({ crews: 'XZ', verdict: 'success', kind: 'decoder', residual: 'II', syndromeOfResidual: [], logicalFlip: { x: [false, false], z: [false, false] } });
    const ok = confirmDispatch('color-switch', { 0: 'X', 1: 'Z' });
    expect(ok.alternative).toMatchObject({ crews: 'XZ', kind: 'decoder' });
  });

  it('is honest: residual = crews ⊕ fires and the verdict is the engine evaluation of that residual', () => {
    for (const m of listPublicMissions()) {
      for (const placements of [placementsOf(getMission(m.id).expected.minWeightCorrection), {}, { 0: m.allowed[0] ?? 'X' }]) {
        const d = confirmDispatch(m.id, placements);
        const code = getCode(m.code);
        const alt = d.alternative;
        const check = evaluate(code, fromString(d.fires), fromString(alt.crews));
        expect(alt.residual).toBe(toString(check.residual));
        expect(alt.verdict).toBe(check.kind);
        expect(alt.syndromeOfResidual).toEqual(syndromeToArray(check.syndrome));
      }
    }
  });
});

describe('reduced motion never auto-plays', () => {
  it('REPLAY_AUTO is refused with the action flag, the flag remembered at CONFIRM / OPEN_WHY, or the setting', () => {
    let s = toChallenge('first-alarm');
    s = place(s, { 1: 'X' });
    const reduced = run(reducer(s, { type: 'CONFIRM', reducedMotion: true }), { type: 'DISPATCH_DONE' }, { type: 'OPEN_WHY', reducedMotion: true });
    expect(reduced.screen).toBe('debrief');
    expect(reduced.autoPlay).toBe(false);
    expect(reducer(reduced, { type: 'REPLAY_AUTO', on: true })).toBe(reduced); // remembered flag → no-op
    const full = run(reducer(s, { type: 'CONFIRM', reducedMotion: false }), { type: 'DISPATCH_DONE' }, { type: 'OPEN_WHY', reducedMotion: false });
    expect(full.autoPlay).toBe(true);
    const paused = reducer(full, { type: 'REPLAY_AUTO', on: false });
    expect(paused.autoPlay).toBe(false);
    expect(reducer(paused, { type: 'REPLAY_AUTO', on: true }).autoPlay).toBe(true);
    expect(reducer(paused, { type: 'REPLAY_AUTO', on: true, reducedMotion: true }).autoPlay).toBe(false); // flag on the action
    const setting = { ...paused, settings: { ...paused.settings, reducedMotion: true } };
    expect(reducer(setting, { type: 'REPLAY_AUTO', on: true }).autoPlay).toBe(false);
    // Turning the setting on mid-replay stops a running auto-play.
    expect(reducer(full, { type: 'SET_REDUCED_MOTION', on: true }).autoPlay).toBe(false);
    expect(reducer(full, { type: 'SET_REDUCED_MOTION', on: true }).motionReduced).toBe(true);
  });
});

describe('settings', () => {
  it('sound is off by default; language en; free roam off; toggles persist in the save', () => {
    let s = initialState();
    expect(s.settings).toEqual({ sound: false, reducedMotion: false, language: 'en', freeRoam: false });
    s = reducer(s, { type: 'SET_SOUND', on: true });
    s = reducer(s, { type: 'SET_REDUCED_MOTION', on: true });
    s = reducer(s, { type: 'SET_LANGUAGE', language: 'ja' });
    expect(reducer(s, { type: 'SET_LANGUAGE', language: 'ja' })).toBe(s); // unchanged → same reference
    s = reducer(s, { type: 'SET_FREE_ROAM', on: true });
    expect(toSave(s).settings).toEqual({ sound: true, reducedMotion: true, language: 'ja', freeRoam: true });
    s = reducer(s, { type: 'HYDRATE', save: openSave({ settings: DEFAULT_SETTINGS }), notice: 'x' });
    expect(s.settings.sound).toBe(false);
    expect(s.settings.language).toBe('en');
    expect(s.notice).toBe('x');
    expect(reducer(s, { type: 'DISMISS_NOTICE' }).notice).toBeNull();
  });
});
