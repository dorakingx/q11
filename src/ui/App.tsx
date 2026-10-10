/**
 * Root component: owns the reducer, persistence (save v2), the language provider, the auto-play timer (Why? replay),
 * sound, the reduced-motion flag, focus management on screen changes, the persistent live region and document.title.
 * Styles: the warm theme (styles.css → tokens.css), the scene stylesheet and (through CityScreen) city.css.
 */
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import {
  currentMission,
  detectStorage,
  districtForMission,
  initialState,
  loadSave,
  noneBridge,
  PROGRESS_RESET_NOTICE,
  reducer,
  RESET_NOTICE,
  toSave,
  writeSave,
  type Action,
  type GameState,
  type QuantumBridge,
  type StorageLike,
} from '../game';
import { CityScreen } from './city';
import { LanguageProvider, translator, useT } from './i18n';
import { Dialog, Notice } from './panels';
import { ChallengeScreen, DebriefScreen, DispatchScreen, TrainingScreen } from './play';
import { BriefingScreen, HowItWorks, ResultScreen, SettingsScreen, SummaryScreen, TitleScreen } from './screens';
import { playSound, soundFor } from './sound';
import { documentTitle, screenAnnouncement } from './text';
import './styles.css';
import './scene/scene.css';

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

/**
 * Where focus goes after a screen change: the result heading once the spray is done, the Why heading on the debrief,
 * the city panel heading / first district on the city map, otherwise the screen's h1.
 */
function focusTargetFor(state: GameState, root: HTMLElement): HTMLElement | null {
  if (state.screen === 'dispatch' && state.dispatchDone) {
    const heading = root.querySelector<HTMLElement>('[data-testid="result-title"]');
    if (heading !== null) return heading;
  }
  if (state.screen === 'debrief') {
    const why = root.querySelector<HTMLElement>('[data-testid="why-heading"]');
    if (why !== null) return why;
  }
  return root.querySelector<HTMLElement>('main h1[data-focus-target]') ?? root.querySelector<HTMLElement>('main h1');
}

/** Screens the player leaves to return to the city with a possibly just-solved district. */
const RESULT_SCREENS: readonly GameState['screen'][] = ['dispatch', 'debrief', 'result'];

export function App({ bridge = noneBridge(), storage = 'local' }: AppProps) {
  const [store] = useState<StorageLike | null>(() => (storage === 'local' ? detectStorage() : null));
  const [state, rawDispatch] = useReducer(reducer, undefined, () => {
    const { save, notice } = loadSave(store);
    return initialState(save, notice);
  });
  const [resetDialog, setResetDialog] = useState(false);
  const [recentlySolved, setRecentlySolved] = useState<string | null>(null);
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
    // The UI knows about motion preferences; the reducer stays pure and receives the flag on commit / Why?.
    const action: Action = a.type === 'CONFIRM' || a.type === 'STAND_DOWN_CONFIRM' || a.type === 'OPEN_WHY' ? { ...a, reducedMotion: a.reducedMotion ?? reducedRef.current } : a;
    const before = stateRef.current;
    const after = reducer(before, action);
    stateRef.current = after;
    // Leaving a finished dispatch for the city: remember the district so the map plays its restoration moment.
    if ((action.type === 'NEXT_MISSION' || action.type === 'OPEN_MISSIONS') && after.screen === 'missions') {
      const solved = RESULT_SCREENS.includes(before.screen) && before.debrief !== null && before.debrief.score.completed ? (districtForMission(before.debrief.missionId)?.id ?? null) : null;
      setRecentlySolved(solved);
    }
    rawDispatch(action);
    const name = soundFor(action, before, after);
    if (name !== null) playSound(name, soundRef.current);
  }, []);

  // The guided first run (R5) skips the briefing: PLAY lands on the first district's planning scene in tutorial mode.
  useEffect(() => {
    if (state.screen === 'briefing' && state.tutorialActive) dispatch({ type: 'START_CHALLENGE' });
  }, [state.screen, state.tutorialActive, dispatch]);

  // Verdict sound once per dispatch, when the spray has finished.
  const lastVerdictKey = useRef<string>('');
  useEffect(() => {
    if (state.screen !== 'dispatch' || !state.dispatchDone || state.debrief === null) return;
    const key = `${state.debrief.missionId}:${state.debrief.crews}:${String(state.progress[state.debrief.missionId]?.attempts ?? 0)}`;
    if (lastVerdictKey.current === key) return;
    lastVerdictKey.current = key;
    playSound(state.debrief.verdict === 'success' ? 'success' : 'failure', state.settings.sound);
  }, [state.screen, state.dispatchDone, state.debrief, state.progress, state.settings.sound]);

  // Persistence (save v2): write whenever progress, settings or the tutorial flag change.
  const { progress, settings, tutorialDone } = state;
  useEffect(() => {
    writeSave(store, toSave({ ...stateRef.current, progress, settings, tutorialDone }));
  }, [store, progress, settings, tutorialDone]);

  // Auto-play timer for the step-by-step replay (Why? screen only).
  useEffect(() => {
    if (!state.autoPlay || state.screen !== 'debrief') return;
    const t = globalThis.setTimeout(() => rawDispatch({ type: 'REPLAY_NEXT' }), reducedMotion ? AUTOPLAY_MS + 600 : AUTOPLAY_MS);
    return () => globalThis.clearTimeout(t);
  }, [state.autoPlay, state.replayIndex, state.screen, reducedMotion]);

  // Screen change (and the spray finishing): scroll to top, move focus to the new screen's heading,
  // set document.title and announce the screen in the persistent live region — all through the current language.
  const announcerRef = useRef<HTMLDivElement>(null);
  const announceKey = `${state.screen}:${state.missionId ?? ''}:${String(state.progress[state.missionId ?? '']?.attempts ?? 0)}:${state.dispatchDone ? 'done' : ''}:${state.settings.language}`;
  const initialKey = useRef(announceKey);
  useEffect(() => {
    try {
      globalThis.scrollTo?.({ top: 0 });
    } catch {
      /* ignore */
    }
    const root = contentRef.current;
    const snapshot = stateRef.current;
    const m = currentMission(snapshot);
    const tr = translator(snapshot.settings.language);
    // Focus moves on every screen CHANGE; the initial page load (and StrictMode's effect replay) keeps the browser's default focus.
    if (root !== null && announceKey !== initialKey.current) focusTargetFor(snapshot, root)?.focus({ preventScroll: true });
    document.title = documentTitle(tr, snapshot, m);
    // The live region is written directly (it is an announcement channel, not rendered state). Clear it first so
    // an identical message (Try again → the same dispatch screen) is still announced.
    const live = announcerRef.current;
    if (live !== null) live.textContent = '';
    const t = globalThis.setTimeout(() => {
      if (announcerRef.current !== null) announcerRef.current.textContent = screenAnnouncement(tr, snapshot, m, snapshot.debrief);
    }, 60);
    return () => globalThis.clearTimeout(t);
  }, [announceKey]);

  return (
    <LanguageProvider language={state.settings.language}>
      <AppBody state={state} dispatch={dispatch} bridge={bridge} storageMode={storage} store={store} reducedMotion={reducedMotion} recentlySolved={recentlySolved} resetDialog={resetDialog} setResetDialog={setResetDialog} contentRef={contentRef} announcerRef={announcerRef} />
    </LanguageProvider>
  );
}

interface AppBodyProps {
  readonly state: GameState;
  readonly dispatch: (a: Action) => void;
  readonly bridge: QuantumBridge;
  readonly storageMode: 'local' | 'memory';
  readonly store: StorageLike | null;
  readonly reducedMotion: boolean;
  readonly recentlySolved: string | null;
  readonly resetDialog: boolean;
  readonly setResetDialog: (open: boolean) => void;
  readonly contentRef: React.RefObject<HTMLDivElement>;
  readonly announcerRef: React.RefObject<HTMLDivElement>;
}

function AppBody({ state, dispatch, bridge, storageMode, store, reducedMotion, recentlySolved, resetDialog, setResetDialog, contentRef, announcerRef }: AppBodyProps) {
  const t = useT();
  const mission = currentMission(state);
  const storageLabel = storageMode === 'memory' ? t('settings.storage.qollab') : store === null ? t('settings.storage.memory') : t('settings.storage.local', { key: 'q11.save.v1' });
  const storageNote = storageMode === 'memory' ? t('city.hud.storage.qollab') : store === null ? t('city.hud.storage.memory') : t('city.hud.storage.local');
  const noticeText = state.notice === PROGRESS_RESET_NOTICE ? t('notice.progressReset') : state.notice === RESET_NOTICE ? t('notice.saveReset') : state.notice;
  const props = { state, dispatch, storageLabel };
  const city = <CityScreen state={state} dispatch={dispatch} storageNote={storageNote} recentlySolved={recentlySolved} onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })} onTitle={() => dispatch({ type: 'OPEN_TITLE' })} />;
  const playProps = mission === null || state.debrief === null ? null : { state, dispatch, mission, debrief: state.debrief, bridge, reducedMotion };

  let screen: JSX.Element;
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
      screen = city;
      break;
    case 'briefing':
      screen = mission === null ? city : <BriefingScreen {...props} mission={mission} />;
      break;
    case 'training':
      screen = mission === null ? city : <TrainingScreen state={state} dispatch={dispatch} mission={mission} />;
      break;
    case 'challenge':
      screen =
        mission === null ? (
          city
        ) : (
          <ChallengeScreen
            mission={mission}
            placements={state.placements}
            selected={state.selected}
            standDownDialog={state.standDownDialog}
            highlightedCheck={state.highlightedCheck}
            canUndo={state.undoStack.length > 0}
            canRedo={state.redoStack.length > 0}
            tutorialActive={state.tutorialActive}
            dispatch={dispatch}
          />
        );
      break;
    case 'dispatch':
      screen = playProps === null ? city : <DispatchScreen {...playProps} />;
      break;
    case 'debrief':
      screen = playProps === null ? city : <DebriefScreen {...playProps} />;
      break;
    case 'result':
      screen = playProps === null ? city : <ResultScreen {...props} mission={playProps.mission} debrief={playProps.debrief} />;
      break;
    case 'summary':
      screen = <SummaryScreen {...props} />;
      break;
  }

  return (
    <div className="app" data-reduced-motion={reducedMotion ? 'true' : 'false'} data-screen={state.screen} data-language={state.settings.language}>
      {/* Everything a dialog must shut out lives inside this wrapper (dialogs render in a portal on <body>). */}
      <div className="app-content" ref={contentRef} data-inert-root>
        {noticeText !== null ? <Notice text={noticeText} onDismiss={() => dispatch({ type: 'DISMISS_NOTICE' })} /> : null}
        {screen}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true" data-testid="announcer" ref={announcerRef} />
      {resetDialog ? (
        <Dialog
          title={t('settings.resetDialog.title')}
          confirmLabel={t('settings.resetDialog.confirm')}
          danger
          onConfirm={() => {
            dispatch({ type: 'RESET_PROGRESS' });
            setResetDialog(false);
          }}
          onCancel={() => setResetDialog(false)}
        >
          <p>{t('settings.resetDialog.body')}</p>
        </Dialog>
      ) : null}
    </div>
  );
}
