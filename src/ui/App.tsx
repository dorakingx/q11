/**
 * Root component: owns the reducer, persistence, auto-play timer, sound and the reduced-motion flag.
 */
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import {
  currentMission,
  detectStorage,
  initialState,
  loadSave,
  noneBridge,
  reducer,
  writeSave,
  type Action,
  type QuantumBridge,
  type StorageLike,
} from '../game';
import { Dialog, Notice } from './panels';
import { ChallengeScreen, DebriefScreen, TrainingScreen } from './play';
import { BriefingScreen, HowItWorks, MissionList, ResultScreen, SettingsScreen, SummaryScreen, TitleScreen } from './screens';
import { playSound } from './sound';

export interface AppProps {
  readonly bridge?: QuantumBridge;
  /** 'local' = browser localStorage when available; 'memory' = never touch web storage (Qollab sandbox). */
  readonly storage?: 'local' | 'memory';
}

const AUTOPLAY_MS = 1600;

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState<boolean>(() => {
    try {
      return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    } catch {
      return false;
    }
  });
  useEffect(() => {
    let mq: MediaQueryList | undefined;
    try {
      mq = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
    } catch {
      mq = undefined;
    }
    if (mq === undefined) return;
    const onChange = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq?.removeEventListener('change', onChange);
  }, []);
  return prefers;
}

export function App({ bridge = noneBridge(), storage = 'local' }: AppProps) {
  const [store] = useState<StorageLike | null>(() => (storage === 'local' ? detectStorage() : null));
  const [state, rawDispatch] = useReducer(reducer, undefined, () => {
    const { save, notice } = loadSave(store);
    return initialState(save, notice);
  });
  const [resetDialog, setResetDialog] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const reducedMotion = prefersReduced || state.settings.reducedMotion;

  // Sound effects derived from actions (sound is off by default; the AudioContext is created on the first gesture).
  const soundOn = state.settings.sound;
  const dispatch = useCallback(
    (a: Action) => {
      rawDispatch(a);
      switch (a.type) {
        case 'SELECT_LETTER':
          playSound('select', soundOn);
          break;
        case 'TOGGLE_BLOCK':
          playSound('place', soundOn);
          break;
        case 'CLEAR_CREWS':
          playSound('remove', soundOn);
          break;
        case 'CONFIRM':
        case 'STAND_DOWN_CONFIRM':
          playSound('confirm', soundOn);
          break;
        case 'REPLAY_NEXT':
        case 'REPLAY_PREV':
        case 'REPLAY_GOTO':
          playSound('step', soundOn);
          break;
        default:
          break;
      }
    },
    [soundOn],
  );

  // Verdict sound once per debrief.
  const lastVerdictKey = useRef<string>('');
  useEffect(() => {
    if (state.screen !== 'debrief' || state.debrief === null) return;
    const key = `${state.debrief.missionId}:${state.debrief.crews}:${String(state.progress[state.debrief.missionId]?.attempts ?? 0)}`;
    if (lastVerdictKey.current === key) return;
    lastVerdictKey.current = key;
    playSound(state.debrief.verdict === 'success' ? 'success' : 'failure', soundOn);
  }, [state.screen, state.debrief, state.progress, soundOn]);

  // Persistence: write whenever progress or settings change.
  const { progress, settings } = state;
  useEffect(() => {
    writeSave(store, { version: 1, progress, settings });
  }, [store, progress, settings]);

  // Auto-play timer for the debrief replay.
  useEffect(() => {
    if (!state.autoPlay || state.screen !== 'debrief') return;
    const t = globalThis.setTimeout(() => rawDispatch({ type: 'REPLAY_NEXT' }), reducedMotion ? AUTOPLAY_MS + 600 : AUTOPLAY_MS);
    return () => globalThis.clearTimeout(t);
  }, [state.autoPlay, state.replayIndex, state.screen, reducedMotion]);

  // Scroll to top on screen change (mobile).
  useEffect(() => {
    try {
      globalThis.scrollTo?.({ top: 0 });
    } catch {
      /* ignore */
    }
  }, [state.screen]);

  const storageLabel = store === null ? 'Progress is kept in memory for this session only (no web storage available here).' : 'Progress is saved in this browser (localStorage, key q11.save.v1).';
  const mission = currentMission(state);
  const props = { state, dispatch, storageLabel };

  let screen: JSX.Element | null;
  switch (state.screen) {
    case 'title':
      screen = <TitleScreen {...props} />;
      break;
    case 'how':
      screen = <HowItWorks {...props} />;
      break;
    case 'settings':
      screen = <SettingsScreen {...props} onReset={() => setResetDialog(true)} />;
      break;
    case 'missions':
      screen = <MissionList {...props} />;
      break;
    case 'briefing':
      screen = mission === null ? <MissionList {...props} /> : <BriefingScreen {...props} mission={mission} />;
      break;
    case 'training':
      screen = mission === null ? <MissionList {...props} /> : <TrainingScreen state={state} dispatch={dispatch} mission={mission} />;
      break;
    case 'challenge':
      screen = mission === null ? <MissionList {...props} /> : <ChallengeScreen mission={mission} placements={state.placements} selected={state.selected} standDownDialog={state.standDownDialog} dispatch={dispatch} />;
      break;
    case 'debrief':
      screen = mission === null || state.debrief === null ? <MissionList {...props} /> : <DebriefScreen state={state} dispatch={dispatch} mission={mission} debrief={state.debrief} bridge={bridge} />;
      break;
    case 'result':
      screen = mission === null || state.debrief === null ? <MissionList {...props} /> : <ResultScreen {...props} mission={mission} debrief={state.debrief} />;
      break;
    case 'summary':
      screen = <SummaryScreen {...props} />;
      break;
  }

  return (
    <div className="app" data-reduced-motion={reducedMotion ? 'true' : 'false'} data-screen={state.screen}>
      {state.notice !== null ? <Notice text={state.notice} onDismiss={() => dispatch({ type: 'DISMISS_NOTICE' })} /> : null}
      {screen}
      {resetDialog ? (
        <Dialog
          title="Reset all progress?"
          confirmLabel="Reset"
          danger
          onConfirm={() => {
            dispatch({ type: 'RESET_PROGRESS' });
            setResetDialog(false);
          }}
          onCancel={() => setResetDialog(false)}
        >
          <p>Stars and attempts for every mission will be cleared. Settings are kept.</p>
        </Dialog>
      ) : null}
    </div>
  );
}
