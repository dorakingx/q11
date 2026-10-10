/**
 * Pure game state machine. Screens are explicit; the true error enters the state only through
 * `confirmDispatch`, which builds the Debrief when the player commits. Everything before that works
 * from `PublicMissionView` alone.
 *
 * Flow: title → PLAY → city ('missions'; a fresh save goes straight into the guided first run instead) → briefing →
 * training → challenge (planning: undo/redo/clear) → CONFIRM → 'dispatch' (spray + answer check, progress merged
 * exactly once here) → DISPATCH_DONE/SKIP → OPEN_WHY → 'debrief' (replay) → result → NEXT_MISSION → city again
 * (`celebrate` = the district just solved, `citySelect` = the next call) — or the summary after a completed Old Town.
 */
import {
  evaluate,
  fromString,
  getCode,
  identity,
  lookupDecoder,
  minWeightEquivalent,
  propagateFinal,
  setLetter,
  syndrome,
  syndromeFromArray,
  syndromeToArray,
  toString,
  type Pauli,
} from '../quantum';
import { DISTRICTS, districtForMission, districtStatus, missionStatus } from './city';
import { getPublicMission, listPublicMissions, nextMissionId, revealMission } from './missions';
import { DEFAULT_SETTINGS } from './persistence';
import { buildReplay, buildWhatIf } from './replay';
import { outcomeLabel, score } from './scoring';
import {
  PLACEMENT_HISTORY_LIMIT,
  SAVE_VERSION,
  type Action,
  type CrewLetter,
  type Debrief,
  type DebriefAlternative,
  type GameState,
  type MissionProgress,
  type PublicMissionView,
  type SaveData,
  type Screen,
  type StarCount,
} from './types';

/** The guided first run uses the first district's mission. */
export const TUTORIAL_MISSION_ID = DISTRICTS[0]?.missionId ?? 'first-alarm';

/** Shown after "Reset progress"; cleared automatically on the next screen change (unlike the corrupt-save notice). */
export const PROGRESS_RESET_NOTICE = 'Progress reset.';

export function initialState(save?: SaveData, notice: string | null = null): GameState {
  return {
    screen: 'title',
    returnTo: 'title',
    missionId: null,
    lesson: 0,
    lessonCursor: -1,
    placements: {},
    undoStack: [],
    redoStack: [],
    selected: 'X',
    highlightedCheck: null,
    standDownDialog: false,
    replayIndex: 0,
    autoPlay: false,
    debrief: null,
    dispatchDone: false,
    motionReduced: save?.settings.reducedMotion ?? false,
    celebrate: null,
    citySelect: null,
    tutorialActive: false,
    tutorialDone: save?.tutorialDone ?? false,
    progress: save?.progress ?? {},
    settings: save?.settings ?? DEFAULT_SETTINGS,
    notice,
  };
}

/** Crews as a Pauli on the mission's code. */
export function placementsToPauli(n: number, placements: Readonly<Record<number, CrewLetter>>): Pauli {
  let p = identity(n);
  for (const [q, letter] of Object.entries(placements)) p = setLetter(p, Number(q), letter);
  return p;
}

export function crewCount(placements: Readonly<Record<number, CrewLetter>>): number {
  return Object.keys(placements).length;
}

export function currentMission(state: GameState): PublicMissionView | null {
  return state.missionId === null ? null : getPublicMission(state.missionId);
}

/** Full reveal. The only place that reads the true error. */
export function confirmDispatch(missionId: string, placements: Readonly<Record<number, CrewLetter>>): Debrief {
  const m = revealMission(missionId);
  const code = getCode(m.code);
  const start = fromString(m.challenge.error);
  const finalFire = propagateFinal(start, m.challenge.circuit);
  const crews = placementsToPauli(code.n, placements);
  const verdict = evaluate(code, finalFire, crews);
  const publicSyndrome = syndromeToArray(syndrome(code, start));
  const decoderCrews = m.kind === 'dispatch' ? lookupDecoder(code).decode(syndromeFromArray(publicSyndrome)) : finalFire;
  const decoderVerdict = evaluate(code, finalFire, decoderCrews);
  const equivalent = minWeightEquivalent(code, crews, decoderCrews);
  const sc = score({ code, outcome: verdict.kind, crews, decoderCrews, maxStars: getPublicMission(missionId).maxStars });
  const steps = buildReplay({ kind: m.kind, code, start, circuit: m.challenge.circuit, crews, verdict });
  const whatIf = buildWhatIf({
    kind: m.kind,
    code,
    finalFire,
    crews,
    syndrome: publicSyndrome,
    verdict,
    equivalent,
    decoderCrews,
    decoderVerdict,
  });
  // The Why? alternative: the true-fire crews when the player's call was the decoder's (or succeeded) and the true
  // fires sit elsewhere; otherwise the decoder's dispatch (bare wires: the crews where the fires really ended).
  const trueFireCrews = toString(finalFire);
  const useTrueFires = (equivalent || verdict.kind === 'success') && trueFireCrews !== toString(crews);
  const altCrews = useTrueFires ? finalFire : decoderCrews;
  const altVerdict = useTrueFires ? evaluate(code, finalFire, finalFire) : decoderVerdict;
  const alternative: DebriefAlternative = {
    crews: toString(altCrews),
    verdict: altVerdict.kind,
    kind: useTrueFires ? 'true-fires' : 'decoder',
    residual: toString(altVerdict.residual),
    syndromeOfResidual: syndromeToArray(altVerdict.syndrome),
    logicalFlip: { x: [...altVerdict.logicalFlip.x], z: [...altVerdict.logicalFlip.z] },
  };
  return {
    missionId,
    fires: trueFireCrews,
    startFires: toString(start),
    crews: toString(crews),
    residual: toString(verdict.residual),
    syndromeOfFires: syndromeToArray(syndrome(code, finalFire)),
    syndromeOfResidual: syndromeToArray(verdict.syndrome),
    verdict: verdict.kind,
    verdictLabel: outcomeLabel(verdict.kind, code.checks.length > 0),
    logicalFlip: { x: [...verdict.logicalFlip.x], z: [...verdict.logicalFlip.z] },
    score: sc,
    narrative: m.debrief[verdict.kind],
    steps,
    whatIf,
    alternative,
  };
}

function mergeProgress(
  progress: Readonly<Record<string, MissionProgress>>,
  missionId: string,
  stars: StarCount,
  completed: boolean,
): Record<string, MissionProgress> {
  const prev = progress[missionId];
  const next: MissionProgress = {
    stars: prev === undefined ? stars : (Math.max(prev.stars, stars) as StarCount),
    attempts: (prev?.attempts ?? 0) + 1,
    completed: (prev?.completed ?? false) || completed,
  };
  return { ...progress, [missionId]: next };
}

function enterChallenge(state: GameState, m: PublicMissionView): GameState {
  const first = m.allowed[0] ?? 'X';
  return {
    ...state,
    screen: 'challenge',
    placements: {},
    undoStack: [],
    redoStack: [],
    selected: m.allowed.includes(state.selected) ? state.selected : first,
    highlightedCheck: null,
    standDownDialog: false,
    debrief: null,
    dispatchDone: false,
    replayIndex: 0,
    autoPlay: false,
  };
}

function enterBriefing(state: GameState, id: string): GameState {
  const m = getPublicMission(id);
  return {
    ...state,
    screen: 'briefing',
    missionId: id,
    lesson: 0,
    lessonCursor: -1,
    placements: {},
    undoStack: [],
    redoStack: [],
    selected: m.allowed[0] ?? 'X',
    highlightedCheck: null,
    standDownDialog: false,
    debrief: null,
    dispatchDone: false,
    replayIndex: 0,
    autoPlay: false,
    // City-only state is spent once a district is entered.
    celebrate: null,
    citySelect: null,
  };
}

/** Screens that hold a committed dispatch; leaving them for the city may carry a restoration moment. */
const RESULT_SCREENS: readonly Screen[] = ['dispatch', 'debrief', 'result'];

/**
 * The city arrival after a committed dispatch: `celebrate` names the district when the mission counts as completed,
 * `citySelect` the next district in unlock order when it is available (or Free roam is on), otherwise the district
 * just left (so replaying a solved district lands back on it). Outside the result screens nothing is celebrated or
 * pre-selected.
 */
function cityArrival(state: GameState): Pick<GameState, 'celebrate' | 'citySelect'> {
  const debrief = state.debrief;
  if (debrief === null || !RESULT_SCREENS.includes(state.screen)) return { celebrate: null, citySelect: null };
  const here = districtForMission(debrief.missionId) ?? null;
  const celebrate = debrief.score.completed ? (here?.id ?? null) : null;
  const nextId = nextMissionId(debrief.missionId);
  const next = nextId === null ? null : (districtForMission(nextId) ?? null);
  const nextOpen = next !== null && (state.settings.freeRoam || districtStatus(next.id, state.progress, false) === 'available');
  return { celebrate, citySelect: nextOpen ? next.id : (here?.id ?? null) };
}

/** Leave for the city: the tutorial counts as done (completed or skipped); a finished dispatch brings its celebration. */
function enterCity(state: GameState): GameState {
  return { ...state, screen: 'missions', standDownDialog: false, autoPlay: false, tutorialActive: false, tutorialDone: true, ...cityArrival(state) };
}

/** A placement change in the planning stage: remember the previous plan (bounded), forget the redo branch. */
function withPlacements(state: GameState, placements: Readonly<Record<number, CrewLetter>>): GameState {
  const undoStack = [...state.undoStack, state.placements].slice(-PLACEMENT_HISTORY_LIMIT);
  return { ...state, placements, undoStack, redoStack: [] };
}

const OVERLAYS: readonly Screen[] = ['how', 'settings'];

export function reducer(state: GameState, action: Action): GameState {
  let next = step(state, action);
  if (next.screen !== state.screen) {
    // The "Progress reset." notice is transient: it disappears on the next screen change.
    if (next.notice === PROGRESS_RESET_NOTICE) next = { ...next, notice: null };
    // The detector highlight is per-screen UI state.
    if (next.highlightedCheck !== null) next = { ...next, highlightedCheck: null };
  }
  return next;
}

function step(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'HYDRATE':
      return {
        ...state,
        progress: action.save.progress,
        settings: action.save.settings,
        motionReduced: state.motionReduced || action.save.settings.reducedMotion,
        tutorialDone: action.save.tutorialDone,
        notice: action.notice ?? state.notice,
      };
    case 'PLAY':
      // First run: skip the city and go straight into the guided first scene (pick a crew → tap a house → spray).
      if (!state.tutorialDone) return { ...enterBriefing(state, TUTORIAL_MISSION_ID), tutorialActive: true };
      return { ...state, screen: 'missions', tutorialActive: false, celebrate: null, citySelect: null };
    case 'TUTORIAL_SKIP':
      return state.tutorialActive ? enterCity(state) : { ...state, tutorialDone: true };
    case 'OPEN_HOW':
      return OVERLAYS.includes(state.screen) ? { ...state, screen: 'how' } : { ...state, screen: 'how', returnTo: state.screen };
    case 'OPEN_SETTINGS':
      return OVERLAYS.includes(state.screen) ? { ...state, screen: 'settings' } : { ...state, screen: 'settings', returnTo: state.screen };
    case 'CLOSE_OVERLAY':
      return OVERLAYS.includes(state.screen) ? { ...state, screen: state.returnTo } : state;
    case 'OPEN_MISSIONS':
      return enterCity(state);
    case 'OPEN_TITLE':
      return { ...state, screen: 'title', standDownDialog: false, autoPlay: false, tutorialActive: false, celebrate: null, citySelect: null };
    case 'CELEBRATED':
      return state.celebrate === null ? state : { ...state, celebrate: null };
    case 'SELECT_MISSION': {
      // Districts open in order; locked ones are not selectable (unless Free roam is on). Unknown ids are ignored.
      const status = missionStatus(action.id, state.progress, state.settings.freeRoam);
      if (status === undefined || status === 'locked') return state;
      return { ...enterBriefing(state, action.id), tutorialActive: false };
    }
    case 'START_MISSION': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'briefing') return state;
      if (m.training.length > 0) return { ...state, screen: 'training', lesson: 0, lessonCursor: -1 };
      return enterChallenge(state, m);
    }
    case 'LESSON_SELECT': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'training') return state;
      if (action.lesson < 0 || action.lesson >= m.training.length) return state;
      return { ...state, lesson: action.lesson, lessonCursor: -1 };
    }
    case 'LESSON_CURSOR': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'training') return state;
      const lesson = m.training[state.lesson];
      if (lesson === undefined) return state;
      const c = Math.max(-1, Math.min(lesson.circuit.length - 1, action.cursor));
      return { ...state, lessonCursor: c };
    }
    case 'LESSON_NEXT': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'training') return state;
      const lesson = m.training[state.lesson];
      if (lesson === undefined) return state;
      if (state.lessonCursor < lesson.circuit.length - 1) return { ...state, lessonCursor: state.lessonCursor + 1 };
      if (state.lesson < m.training.length - 1) return { ...state, lesson: state.lesson + 1, lessonCursor: -1 };
      return enterChallenge(state, m);
    }
    case 'LESSON_PREV': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'training') return state;
      if (state.lessonCursor > -1) return { ...state, lessonCursor: state.lessonCursor - 1 };
      if (state.lesson > 0) {
        const prev = m.training[state.lesson - 1];
        return { ...state, lesson: state.lesson - 1, lessonCursor: (prev?.circuit.length ?? 0) - 1 };
      }
      return state;
    }
    case 'BACK_TO_BRIEFING': {
      // Only before the crews are committed: training and the planning stage. The plan is discarded (the briefing's
      // buttons start fresh, exactly as if the district had just been opened).
      if (state.missionId === null || (state.screen !== 'training' && state.screen !== 'challenge')) return state;
      return { ...enterBriefing(state, state.missionId), tutorialActive: false };
    }
    case 'START_CHALLENGE': {
      const m = currentMission(state);
      if (m === null || (state.screen !== 'training' && state.screen !== 'briefing')) return state;
      return enterChallenge(state, m);
    }
    case 'SELECT_LETTER': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'challenge') return state;
      if (!m.allowed.includes(action.letter)) return state;
      return { ...state, selected: action.letter };
    }
    case 'TOGGLE_BLOCK': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'challenge' || state.standDownDialog) return state;
      const n = getCode(m.code).n;
      if (action.qubit < 0 || action.qubit >= n) return state;
      const current = state.placements[action.qubit];
      const next: Record<number, CrewLetter> = { ...state.placements };
      if (current === state.selected) {
        delete next[action.qubit];
      } else if (current !== undefined) {
        next[action.qubit] = state.selected; // swap colour on an occupied house (same crew count)
      } else {
        if (crewCount(state.placements) >= m.budget) return state; // budget enforced
        next[action.qubit] = state.selected;
      }
      return withPlacements(state, next);
    }
    case 'RECALL_BLOCK': {
      if (state.screen !== 'challenge' || state.standDownDialog) return state;
      if (state.placements[action.qubit] === undefined) return state;
      const next: Record<number, CrewLetter> = { ...state.placements };
      delete next[action.qubit];
      return withPlacements(state, next);
    }
    case 'CLEAR_CREWS':
      if (state.screen !== 'challenge' || state.standDownDialog) return state;
      if (crewCount(state.placements) === 0) return state;
      return withPlacements(state, {});
    case 'UNDO_PLACEMENT': {
      if (state.screen !== 'challenge' || state.standDownDialog) return state;
      const prev = state.undoStack[state.undoStack.length - 1];
      if (prev === undefined) return state;
      return {
        ...state,
        placements: prev,
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [...state.redoStack, state.placements].slice(-PLACEMENT_HISTORY_LIMIT),
      };
    }
    case 'REDO_PLACEMENT': {
      if (state.screen !== 'challenge' || state.standDownDialog) return state;
      const next = state.redoStack[state.redoStack.length - 1];
      if (next === undefined) return state;
      return {
        ...state,
        placements: next,
        redoStack: state.redoStack.slice(0, -1),
        undoStack: [...state.undoStack, state.placements].slice(-PLACEMENT_HISTORY_LIMIT),
      };
    }
    case 'TOGGLE_DETECTOR_HIGHLIGHT': {
      const m = currentMission(state);
      if (m === null) return state;
      if (action.checkIndex === null) return state.highlightedCheck === null ? state : { ...state, highlightedCheck: null };
      const checks = getCode(m.code).checks.length;
      if (!Number.isInteger(action.checkIndex) || action.checkIndex < 0 || action.checkIndex >= checks) return state;
      return { ...state, highlightedCheck: state.highlightedCheck === action.checkIndex ? null : action.checkIndex };
    }
    case 'CONFIRM': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'challenge' || state.standDownDialog) return state;
      if (crewCount(state.placements) === 0) return { ...state, standDownDialog: true };
      return commit(state, m, action.reducedMotion ?? state.settings.reducedMotion);
    }
    case 'STAND_DOWN_CANCEL':
      return { ...state, standDownDialog: false };
    case 'STAND_DOWN_CONFIRM': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'challenge' || !state.standDownDialog) return state;
      return commit(state, m, action.reducedMotion ?? state.settings.reducedMotion);
    }
    case 'DISPATCH_DONE':
    case 'DISPATCH_SKIP':
      // Idempotent: the timeline finishing, a skip tap and a second (rapid) tap all land on the same state.
      if (state.screen !== 'dispatch' || state.debrief === null || state.dispatchDone) return state;
      return { ...state, dispatchDone: true };
    case 'OPEN_WHY': {
      if (state.debrief === null) return state;
      const fromDispatch = state.screen === 'dispatch' && state.dispatchDone;
      if (!fromDispatch && state.screen !== 'result') return state;
      const reduced = action.reducedMotion ?? state.settings.reducedMotion;
      return { ...state, screen: 'debrief', replayIndex: 0, motionReduced: reduced, autoPlay: !reduced && state.debrief.steps.length > 1 };
    }
    case 'REPLAY_GOTO': {
      if (state.debrief === null) return state;
      const i = Math.max(0, Math.min(state.debrief.steps.length - 1, action.index));
      return { ...state, replayIndex: i, autoPlay: i === state.debrief.steps.length - 1 ? false : state.autoPlay };
    }
    case 'REPLAY_NEXT': {
      if (state.debrief === null) return state;
      const last = state.debrief.steps.length - 1;
      const i = Math.min(last, state.replayIndex + 1);
      return { ...state, replayIndex: i, autoPlay: i === last ? false : state.autoPlay };
    }
    case 'REPLAY_PREV':
      if (state.debrief === null) return state;
      return { ...state, replayIndex: Math.max(0, state.replayIndex - 1), autoPlay: false };
    case 'REPLAY_AUTO': {
      if (state.debrief === null) return state;
      // Reduced motion (the flag passed now, the one remembered at CONFIRM / OPEN_WHY, or the setting): never start the timer.
      const reduced = (action.reducedMotion ?? false) || state.motionReduced || state.settings.reducedMotion;
      const on = action.on && !reduced;
      if (on === state.autoPlay && (!on || state.replayIndex < state.debrief.steps.length - 1)) return state;
      const last = state.debrief.steps.length - 1;
      // Starting auto-play from the end restarts the replay.
      return { ...state, autoPlay: on, replayIndex: on && state.replayIndex >= last ? 0 : state.replayIndex };
    }
    case 'SHOW_RESULT': {
      if (state.debrief === null) return state;
      const fromDispatch = state.screen === 'dispatch' && state.dispatchDone;
      if (!fromDispatch && state.screen !== 'debrief') return state;
      return { ...state, screen: 'result', autoPlay: false };
    }
    case 'TRY_AGAIN': {
      const m = currentMission(state);
      if (m === null || (state.screen !== 'dispatch' && state.screen !== 'debrief' && state.screen !== 'result')) return state;
      return enterChallenge(state, m);
    }
    case 'NEXT_MISSION': {
      if (state.missionId === null || state.debrief === null) return state;
      if (!RESULT_SCREENS.includes(state.screen)) return state;
      if (state.screen === 'dispatch' && !state.dispatchDone) return state;
      // A completed last district ends the shift on the summary; everything else returns to the city
      // (the guided first run ends by revealing the city: the player's first look at the map).
      if (!state.tutorialActive && nextMissionId(state.missionId) === null && state.debrief.score.completed) {
        return { ...state, screen: 'summary', autoPlay: false, celebrate: null, citySelect: null };
      }
      return enterCity(state);
    }
    case 'SET_SOUND':
      return { ...state, settings: { ...state.settings, sound: action.on } };
    case 'SET_REDUCED_MOTION':
      // Turning reduced motion on stops a running auto-play; the next CONFIRM / OPEN_WHY re-reports the OS preference.
      return { ...state, settings: { ...state.settings, reducedMotion: action.on }, motionReduced: action.on, autoPlay: action.on ? false : state.autoPlay };
    case 'SET_LANGUAGE':
      return state.settings.language === action.language ? state : { ...state, settings: { ...state.settings, language: action.language } };
    case 'SET_FREE_ROAM':
      return state.settings.freeRoam === action.on ? state : { ...state, settings: { ...state.settings, freeRoam: action.on } };
    case 'RESET_PROGRESS':
      return { ...state, progress: {}, notice: PROGRESS_RESET_NOTICE };
    case 'SHOW_NOTICE':
      return { ...state, notice: action.text };
    case 'DISMISS_NOTICE':
      return { ...state, notice: null };
  }
}

/**
 * Commit the dispatch: build the Debrief (the only read of the true error), merge progress exactly once and open
 * the 'dispatch' screen where the spray timeline plays. The later "Why?" replay (debrief) auto-plays unless motion
 * is reduced (then the player steps through by hand). Only reachable from 'challenge', so a second CONFIRM is a no-op.
 */
function commit(state: GameState, m: PublicMissionView, reducedMotion: boolean): GameState {
  const debrief = confirmDispatch(m.id, state.placements);
  const tutorialSolved = state.tutorialActive && debrief.verdict === 'success';
  return {
    ...state,
    screen: 'dispatch',
    standDownDialog: false,
    debrief,
    dispatchDone: false,
    replayIndex: 0,
    motionReduced: reducedMotion,
    autoPlay: !reducedMotion && debrief.steps.length > 1,
    progress: mergeProgress(state.progress, m.id, debrief.score.stars, debrief.score.completed),
    tutorialDone: state.tutorialDone || tutorialSolved,
  };
}

export function toSave(state: GameState): SaveData {
  return { version: SAVE_VERSION, progress: state.progress, settings: state.settings, tutorialDone: state.tutorialDone };
}

export function totalStars(progress: Readonly<Record<string, MissionProgress>>): number {
  return listPublicMissions().reduce((acc, m) => acc + (progress[m.id]?.stars ?? 0), 0);
}
