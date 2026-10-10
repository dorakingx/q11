/**
 * Root component: owns the reducer, persistence, auto-play timer, sound, the reduced-motion flag,
 * focus management on screen changes, the persistent live region and document.title.
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
  type GameState,
  type QuantumBridge,
  type StorageLike,
} from '../game';
import { Dialog, Notice } from './panels';
import { ChallengeScreen, DebriefScreen, TrainingScreen } from './play';
import { BriefingScreen, HowItWorks, MissionList, ResultScreen, SettingsScreen, SummaryScreen, TitleScreen } from './screens';
import { playSound, soundFor } from './sound';
import { documentTitle, screenAnnouncement } from './text';

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

/** Where focus goes after a screen change: the verdict banner in the debrief, otherwise the screen's h1. */
function focusTargetFor(screen: GameState['screen'], root: HTMLElement): HTMLElement | null {
  if (screen === 'debrief') {
    const banner = root.querySelector<HTMLElement>('[data-testid="verdict"]');
    if (banner !== null) return banner;
  }
  return root.querySelector<HTMLElement>('main h1[data-focus-target]') ?? root.querySelector<HTMLElement>('main h1');
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
  const contentRef = useRef<HTMLDivElement>(null);

  // Latest state for the dispatch wrapper (sound decisions compare before/after without re-creating dispatch).
  // Synced after every render; the wrapper also advances it itself so back-to-back dispatches see the latest state.
  const stateRef = useRef(state);
  const soundRef = useRef(state.settings.sound);
  const reducedRef = useRef(reducedMotion);
  useEffect(() => {
    stateRef.current = state;
    soundRef.current = state.settings.sound;
    reducedRef.current = reducedMotion;
  });

  const dispatch = useCallback((a: Action) => {
    // The UI knows about motion preferences; the reducer stays pure and receives the flag on commit.
    const action: Action = a.type === 'CONFIRM' || a.type === 'STAND_DOWN_CONFIRM' ? { ...a, reducedMotion: reducedRef.current } : a;
    const before = stateRef.current;
    const after = reducer(before, action);
    stateRef.current = after;
    rawDispatch(action);
    const name = soundFor(action, before, after);
    if (name !== null) playSound(name, soundRef.current);
  }, []);

  // Verdict sound once per debrief.
  const lastVerdictKey = useRef<string>('');
  useEffect(() => {
    if (state.screen !== 'debrief' || state.debrief === null) return;
    const key = `${state.debrief.missionId}:${state.debrief.crews}:${String(state.progress[state.debrief.missionId]?.attempts ?? 0)}`;
    if (lastVerdictKey.current === key) return;
    lastVerdictKey.current = key;
    playSound(state.debrief.verdict === 'success' ? 'success' : 'failure', state.settings.sound);
  }, [state.screen, state.debrief, state.progress, state.settings.sound]);

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

  // Screen change: scroll to top, move focus to the new screen's heading (debrief: the verdict banner),
  // set document.title and announce the screen in the persistent live region.
  const mission = currentMission(state);
  const announcerRef = useRef<HTMLDivElement>(null);
  const firstMount = useRef(true);
  const announceKey = `${state.screen}:${state.missionId ?? ''}:${String(state.progress[state.missionId ?? '']?.attempts ?? 0)}`;
  useEffect(() => {
    try {
      globalThis.scrollTo?.({ top: 0 });
    } catch {
      /* ignore */
    }
    const root = contentRef.current;
    const snapshot = stateRef.current;
    const m = currentMission(snapshot);
    // Focus moves on every screen CHANGE; the initial page load keeps the browser's default focus.
    if (root !== null && !firstMount.current) focusTargetFor(snapshot.screen, root)?.focus({ preventScroll: true });
    firstMount.current = false;
    document.title = documentTitle(snapshot, m);
    // The live region is written directly (it is an announcement channel, not rendered state). Clear it first so
    // an identical message (Try again → the same dispatch screen) is still announced.
    const live = announcerRef.current;
    if (live !== null) live.textContent = '';
    const t = globalThis.setTimeout(() => {
      if (announcerRef.current !== null) announcerRef.current.textContent = screenAnnouncement(snapshot, m, snapshot.debrief);
    }, 60);
    return () => globalThis.clearTimeout(t);
  }, [announceKey]);

  const storageLabel = store === null ? 'Progress is kept in memory for this session only (no web storage available here).' : 'Progress is saved in this browser (localStorage, key q11.save.v1).';
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
      {/* Everything a dialog must shut out lives inside this wrapper (dialogs render in a portal on <body>). */}
      <div className="app-content" ref={contentRef} data-inert-root>
        {state.notice !== null ? <Notice text={state.notice} onDismiss={() => dispatch({ type: 'DISMISS_NOTICE' })} /> : null}
        {screen}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true" data-testid="announcer" ref={announcerRef} />
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
