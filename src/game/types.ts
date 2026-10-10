/**
 * Game-layer types. No React here. The quantum engine (src/quantum) owns the physics; this layer owns
 * missions-as-seen-by-the-player, the state machine, scoring, replay steps and persistence.
 */
import type { Circuit, CodeId, PauliLetter, Syndrome, Verdict, VerdictKind } from '../quantum';

/** A letter the player may dispatch (a firefighter crew colour). */
export type CrewLetter = 'X' | 'Z' | 'Y';

export function isCrewLetter(l: PauliLetter): l is CrewLetter {
  return l !== 'I';
}

export type MissionKind = 'dispatch' | 'propagation';

/** A visible training lesson: the true fire is shown on purpose. */
export interface TrainingLesson {
  /** Visible starting fire, qubit-0-first. */
  readonly fire: string;
  readonly circuit: Circuit;
  readonly caption: string;
}

/**
 * Everything the Challenge view is allowed to know. There is deliberately NO `error` key here:
 * for dispatch missions only the alarms (`syndrome`) are public; for propagation missions the
 * starting fire (`visibleStart`) and the public circuit are shown and the player predicts the end state.
 */
export interface PublicMissionView {
  readonly id: string;
  readonly index: number;
  readonly title: string;
  readonly code: CodeId;
  readonly kind: MissionKind;
  readonly allowed: readonly CrewLetter[];
  readonly budget: number;
  readonly briefing: string;
  /** Highest star rating this mission can award (missions.json `maxStars`, default 3). Mission 6 declares 1. */
  readonly maxStars: StarCount;
  readonly circuit: Circuit;
  /** Alarm bits of the hidden fire, in code.checks order (empty for codes without checks). */
  readonly syndrome: readonly number[];
  /** Propagation missions: the public starting fire. Dispatch missions: null (the fire is hidden). */
  readonly visibleStart: string | null;
  readonly training: readonly TrainingLesson[];
}

export type Screen =
  | 'title'
  | 'how'
  | 'missions'
  | 'settings'
  | 'briefing'
  | 'training'
  | 'challenge'
  | 'debrief'
  | 'result'
  | 'summary';

/**
 *  optimal  C ≡ D (stabilizer-equivalent to the min-weight dispatch) and success
 *  valid    success with more crews than D
 *  unlucky  C ≡ D but the outcome is a logical error (the alarms could not tell; mission 6)
 *  lucky    success on a mission whose alarms did not justify the call (maxStars 1, C ≢ D; mission 6)
 *  off      anything else
 */
export type DecisionQuality = 'optimal' | 'valid' | 'unlucky' | 'lucky' | 'off';

export type StarCount = 0 | 1 | 2 | 3;

export interface Score {
  readonly outcome: VerdictKind;
  readonly quality: DecisionQuality;
  /** 0–maxStars */
  readonly stars: StarCount;
  /** Highest rating the mission can award (default 3). */
  readonly maxStars: StarCount;
  readonly crewsUsed: number;
  readonly minCrews: number;
  /** Mission counts as complete (success, or an optimal call that was unlucky). */
  readonly completed: boolean;
}

/** One frame of the debrief replay. All Paulis are qubit-0-first strings so the state stays serialisable. */
export interface ReplayStep {
  readonly id: string;
  readonly caption: string;
  /** Fires to draw on the board at this step. */
  readonly fires: string;
  /** Crews to draw (null = not yet dispatched in the story). */
  readonly crews: string | null;
  /** Residual fires to draw with the "R" outline (null = not yet). */
  readonly residual: string | null;
  /** Alarm bits to show; null = alarms not yet read (all quiet rendering). */
  readonly syndrome: readonly number[] | null;
  /** Propagation missions: index of the gate just applied (-1 = before the circuit, circuit.length = after all). */
  readonly gateCursor: number;
  /** Whether the verdict banner is shown at this step. */
  readonly showVerdict: boolean;
}

export interface WhatIf {
  /** Minimum-weight decoder dispatch for the same alarms. */
  readonly decoderCrews: string;
  readonly decoderVerdict: VerdictKind;
  /** True when the player's dispatch and the decoder's differ only by a stabilizer. */
  readonly equivalentToDecoder: boolean;
  /** Human explanation. */
  readonly explanation: string;
  /** Mission 6 style counterfactual: the dispatch that would have put out the true fires (null when it equals the decoder's). */
  readonly trueFireCrews: string | null;
}

/** Full reveal after Confirm. Only exists in the 'debrief' / 'result' screens. */
export interface Debrief {
  readonly missionId: string;
  /** TRUE fire after propagation (what the crews actually met). */
  readonly fires: string;
  /** TRUE starting fire (before the circuit). Equals `fires` for dispatch missions. */
  readonly startFires: string;
  readonly crews: string;
  readonly residual: string;
  readonly syndromeOfFires: readonly number[];
  readonly syndromeOfResidual: readonly number[];
  readonly verdict: VerdictKind;
  /** Verdict banner text for this mission's code (propagation missions have no stabilizers, so no "silent failure"). */
  readonly verdictLabel: string;
  readonly logicalFlip: { readonly x: readonly boolean[]; readonly z: readonly boolean[] };
  readonly score: Score;
  readonly narrative: string;
  readonly steps: readonly ReplayStep[];
  readonly whatIf: WhatIf;
}

export interface MissionProgress {
  readonly stars: StarCount;
  readonly attempts: number;
  readonly completed: boolean;
}

export interface Settings {
  readonly sound: boolean;
  readonly reducedMotion: boolean;
}

export const SAVE_VERSION = 1 as const;

export interface SaveData {
  readonly version: typeof SAVE_VERSION;
  readonly progress: Readonly<Record<string, MissionProgress>>;
  readonly settings: Settings;
}

export interface GameState {
  readonly screen: Screen;
  /** Screen to return to when leaving settings/how. */
  readonly returnTo: Screen;
  readonly missionId: string | null;
  /** Training: lesson index and gate cursor (-1 = before the circuit). */
  readonly lesson: number;
  readonly lessonCursor: number;
  /** Challenge: crews placed per qubit index. */
  readonly placements: Readonly<Record<number, CrewLetter>>;
  readonly selected: CrewLetter;
  /** "Stand down with no crews?" dialog open. */
  readonly standDownDialog: boolean;
  /** Debrief: current replay step and auto-play flag. */
  readonly replayIndex: number;
  readonly autoPlay: boolean;
  /** Null until the player confirms. */
  readonly debrief: Debrief | null;
  readonly progress: Readonly<Record<string, MissionProgress>>;
  readonly settings: Settings;
  /** One-line notice (e.g. save reset). */
  readonly notice: string | null;
}

export type Action =
  | { type: 'PLAY' }
  | { type: 'OPEN_HOW' }
  | { type: 'OPEN_SETTINGS' }
  | { type: 'CLOSE_OVERLAY' }
  | { type: 'OPEN_MISSIONS' }
  | { type: 'OPEN_TITLE' }
  | { type: 'SELECT_MISSION'; id: string }
  | { type: 'START_MISSION' }
  | { type: 'LESSON_PREV' }
  | { type: 'LESSON_NEXT' }
  | { type: 'LESSON_CURSOR'; cursor: number }
  | { type: 'LESSON_SELECT'; lesson: number }
  | { type: 'START_CHALLENGE' }
  | { type: 'SELECT_LETTER'; letter: CrewLetter }
  | { type: 'TOGGLE_BLOCK'; qubit: number }
  /** Recall the crew on one block (Backspace on a focused block). No-op when the block is empty. */
  | { type: 'RECALL_BLOCK'; qubit: number }
  | { type: 'CLEAR_CREWS' }
  /** `reducedMotion` (UI-supplied) decides whether the debrief replay auto-plays from step 1. */
  | { type: 'CONFIRM'; reducedMotion?: boolean }
  | { type: 'STAND_DOWN_CONFIRM'; reducedMotion?: boolean }
  | { type: 'STAND_DOWN_CANCEL' }
  | { type: 'REPLAY_GOTO'; index: number }
  | { type: 'REPLAY_PREV' }
  | { type: 'REPLAY_NEXT' }
  | { type: 'REPLAY_AUTO'; on: boolean }
  | { type: 'SHOW_RESULT' }
  | { type: 'TRY_AGAIN' }
  | { type: 'NEXT_MISSION' }
  | { type: 'SET_SOUND'; on: boolean }
  | { type: 'SET_REDUCED_MOTION'; on: boolean }
  | { type: 'RESET_PROGRESS' }
  | { type: 'SHOW_NOTICE'; text: string }
  | { type: 'DISMISS_NOTICE' }
  | { type: 'HYDRATE'; save: SaveData; notice: string | null };

/** Re-exported for convenience in the UI layer. */
export type { Circuit, CodeId, PauliLetter, Syndrome, Verdict, VerdictKind };
