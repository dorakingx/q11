/**
 * Pure game state machine. Screens are explicit; the true error enters the state only through
 * `confirmDispatch`, which builds the Debrief when the player commits. Everything before that works
 * from `PublicMissionView` alone.
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
import { getPublicMission, listPublicMissions, nextMissionId, revealMission } from './missions';
import { DEFAULT_SETTINGS } from './persistence';
import { buildReplay, buildWhatIf } from './replay';
import { score } from './scoring';
import type { Action, CrewLetter, Debrief, GameState, MissionProgress, PublicMissionView, SaveData, Screen } from './types';

export function initialState(save?: SaveData, notice: string | null = null): GameState {
  return {
    screen: 'title',
    returnTo: 'title',
    missionId: null,
    lesson: 0,
    lessonCursor: -1,
    placements: {},
    selected: 'X',
    standDownDialog: false,
    replayIndex: 0,
    autoPlay: false,
    debrief: null,
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
  const sc = score({ code, outcome: verdict.kind, crews, decoderCrews });
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
  return {
    missionId,
    fires: toString(finalFire),
    startFires: toString(start),
    crews: toString(crews),
    residual: toString(verdict.residual),
    syndromeOfFires: syndromeToArray(syndrome(code, finalFire)),
    syndromeOfResidual: syndromeToArray(verdict.syndrome),
    verdict: verdict.kind,
    logicalFlip: { x: [...verdict.logicalFlip.x], z: [...verdict.logicalFlip.z] },
    score: sc,
    narrative: m.debrief[verdict.kind],
    steps,
    whatIf,
  };
}

function mergeProgress(
  progress: Readonly<Record<string, MissionProgress>>,
  missionId: string,
  stars: 0 | 1 | 2 | 3,
  completed: boolean,
): Record<string, MissionProgress> {
  const prev = progress[missionId];
  const next: MissionProgress = {
    stars: prev === undefined ? stars : (Math.max(prev.stars, stars) as 0 | 1 | 2 | 3),
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
    selected: m.allowed.includes(state.selected) ? state.selected : first,
    standDownDialog: false,
    debrief: null,
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
    selected: m.allowed[0] ?? 'X',
    standDownDialog: false,
    debrief: null,
    replayIndex: 0,
    autoPlay: false,
  };
}

const OVERLAYS: readonly Screen[] = ['how', 'settings'];

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, progress: action.save.progress, settings: action.save.settings, notice: action.notice ?? state.notice };
    case 'PLAY':
      return { ...state, screen: 'missions', notice: state.notice };
    case 'OPEN_HOW':
      return OVERLAYS.includes(state.screen) ? { ...state, screen: 'how' } : { ...state, screen: 'how', returnTo: state.screen };
    case 'OPEN_SETTINGS':
      return OVERLAYS.includes(state.screen) ? { ...state, screen: 'settings' } : { ...state, screen: 'settings', returnTo: state.screen };
    case 'CLOSE_OVERLAY':
      return OVERLAYS.includes(state.screen) ? { ...state, screen: state.returnTo } : state;
    case 'OPEN_MISSIONS':
      return { ...state, screen: 'missions', standDownDialog: false, autoPlay: false };
    case 'OPEN_TITLE':
      return { ...state, screen: 'title', standDownDialog: false, autoPlay: false };
    case 'SELECT_MISSION':
      return enterBriefing(state, action.id);
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
        next[action.qubit] = state.selected; // swap colour on an occupied block (same crew count)
      } else {
        if (crewCount(state.placements) >= m.budget) return state; // budget enforced
        next[action.qubit] = state.selected;
      }
      return { ...state, placements: next };
    }
    case 'CLEAR_CREWS':
      if (state.screen !== 'challenge') return state;
      return { ...state, placements: {} };
    case 'CONFIRM': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'challenge') return state;
      if (crewCount(state.placements) === 0) return { ...state, standDownDialog: true };
      return commit(state, m);
    }
    case 'STAND_DOWN_CANCEL':
      return { ...state, standDownDialog: false };
    case 'STAND_DOWN_CONFIRM': {
      const m = currentMission(state);
      if (m === null || state.screen !== 'challenge' || !state.standDownDialog) return state;
      return commit(state, m);
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
      const last = state.debrief.steps.length - 1;
      // Starting auto-play from the end restarts the replay.
      return { ...state, autoPlay: action.on, replayIndex: action.on && state.replayIndex >= last ? 0 : state.replayIndex };
    }
    case 'SHOW_RESULT':
      if (state.debrief === null || state.screen !== 'debrief') return state;
      return { ...state, screen: 'result', autoPlay: false };
    case 'TRY_AGAIN': {
      const m = currentMission(state);
      if (m === null || (state.screen !== 'debrief' && state.screen !== 'result')) return state;
      return enterChallenge(state, m);
    }
    case 'NEXT_MISSION': {
      if (state.missionId === null) return state;
      const next = nextMissionId(state.missionId);
      if (next === null) return { ...state, screen: 'summary', autoPlay: false };
      return enterBriefing(state, next);
    }
    case 'SET_SOUND':
      return { ...state, settings: { ...state.settings, sound: action.on } };
    case 'SET_REDUCED_MOTION':
      return { ...state, settings: { ...state.settings, reducedMotion: action.on } };
    case 'RESET_PROGRESS':
      return { ...state, progress: {}, notice: 'Progress reset.' };
    case 'SHOW_NOTICE':
      return { ...state, notice: action.text };
    case 'DISMISS_NOTICE':
      return { ...state, notice: null };
  }
}

function commit(state: GameState, m: PublicMissionView): GameState {
  const debrief = confirmDispatch(m.id, state.placements);
  return {
    ...state,
    screen: 'debrief',
    standDownDialog: false,
    debrief,
    replayIndex: debrief.steps.length - 1,
    autoPlay: false,
    progress: mergeProgress(state.progress, m.id, debrief.score.stars, debrief.score.completed),
  };
}

export function toSave(state: GameState): SaveData {
  return { version: 1, progress: state.progress, settings: state.settings };
}

export function totalStars(progress: Readonly<Record<string, MissionProgress>>): number {
  return listPublicMissions().reduce((acc, m) => acc + (progress[m.id]?.stars ?? 0), 0);
}
