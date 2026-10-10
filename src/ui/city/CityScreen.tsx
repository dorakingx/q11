/**
 * City map screen (docs/UX_REDESIGN.md R1–R3, docs/UX_SCREENS.md §2): one SVG city with a real <button> per
 * district laid over it, a HUD (stars, badges, storage note, free roam, settings), a selection panel
 * (right column on wide screens, bottom sheet on phones), the truck drive on Dispatch and the restoration
 * moment for a just-solved district. Everything is tap-only, keyboard-reachable and reads by shape + text.
 *
 * Celebration contract (App): `recentlySolved` (= GameState.celebrate) starts the restoration + badge toast once,
 * captured at mount; `onCelebrated` fires exactly once when both have finished or were skipped (or on unmount).
 * `initialSelected` (= GameState.citySelect) opens the panel on that district without stealing focus from the h1.
 */
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type RefObject } from 'react';
import { firstAvailable, getPublicMission, maxTotalStars, totalStars, type Action, type DistrictStatus, type GameState } from '../../game';
import { ART, CITY_H, CITY_W, ChapterBadge, CityBackdrop, DISTRICTS, FireTruck, ROADS, ROAD_START, SmokePlume, districtById, type DistrictBox, type DistrictId, type DistrictVisualState } from '../art';
import { GearIcon, Q11Mark } from '../glyphs';
import { missionCopy, plural, useLanguage, useT } from '../i18n';
import { RESTORE_MS, TOAST_MS, TRAVEL_MS, WHEEL_MS, badgeColour, badgeKey, detectReducedMotion, easeInOut, hitBoxStyle, isDistrictId, neighbourDistrict, pointOnRoad, statusesOf, type MeasurablePath, type TruckPose } from './geometry';
import './city.css';

export interface CityScreenProps {
  readonly state: GameState;
  readonly dispatch: (a: Action) => void;
  /** Where progress lives (localStorage / memory / Qollab run) — shown in the HUD. */
  readonly storageNote: string;
  /** District id solved just before returning to the city: plays the restoration moment + badge toast on mount. */
  readonly recentlySolved: string | null;
  readonly onSettings: () => void;
  readonly onTitle: () => void;
  /** Called once after the restoration moment and the badge toast finished or were skipped (App clears `celebrate`). */
  readonly onCelebrated?: (() => void) | undefined;
  /** Force reduced motion (tests / App). Otherwise Settings.reducedMotion, the app's data-reduced-motion marker or the OS preference decide. */
  readonly reducedMotion?: boolean;
  /** District to pre-select at mount (the panel opens on it; focus stays on the heading). Locked / unknown ids are ignored. */
  readonly initialSelected?: string | null;
}

interface Toast {
  readonly kind: 'locked' | 'badge';
  readonly text: string;
  readonly colour: string | null;
}

/** The bottom-sheet breakpoint (city.css: the panel is fixed to the bottom below this width). */
const SHEET_MAX_WIDTH = 1024;

export function CityScreen({ state, dispatch, storageNote, recentlySolved, onSettings, onTitle, onCelebrated, reducedMotion, initialSelected = null }: CityScreenProps) {
  const t = useT();
  const lang = useLanguage();
  const statuses = statusesOf(state.progress, state.settings.freeRoam);
  const reducedProp = reducedMotion ?? (state.settings.reducedMotion ? true : undefined);
  const isReduced = useCallback((): boolean => reducedProp ?? detectReducedMotion(), [reducedProp]);

  // The just-solved district is captured once at mount: App may clear `celebrate` while the moment still plays.
  const [restoredId] = useState<DistrictId | null>(() => (isDistrictId(recentlySolved) && statuses[recentlySolved] === 'solved' ? recentlySolved : null));
  const validInitial = (id: string | null): DistrictId | null => (isDistrictId(id) && statuses[id] !== 'locked' ? id : null);

  const [selected, setSelected] = useState<DistrictId | null>(() => validInitial(initialSelected));
  const [travel, setTravel] = useState<DistrictId | null>(null);
  const [truck, setTruck] = useState<TruckPose | null>(null);
  const [restoring, setRestoring] = useState<boolean>(() => restoredId !== null && !(reducedProp ?? detectReducedMotion()));
  const [toast, setToast] = useState<Toast | null>(() => {
    if (restoredId === null) return null;
    const box = districtById(restoredId);
    const i = DISTRICTS.findIndex((b) => b.id === restoredId);
    return { kind: 'badge', text: t('city.badgeToast', { badge: t(badgeKey(box.missionId)) }), colour: badgeColour(i) };
  });
  const [sheetHeight, setSheetHeight] = useState<number | null>(null);

  const mainRef = useRef<HTMLElement>(null);
  const panelHeadingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const finishRef = useRef<(() => void) | null>(null);
  const lastFocusedDistrict = useRef<DistrictId | null>(null);
  /** The panel moves focus to its heading only for a selection the player made (never for `initialSelected`). */
  const [selectionByUser, setSelectionByUser] = useState(false);
  const celebration = useRef<'pending' | 'done' | 'none'>(restoredId === null ? 'none' : 'pending');
  const onCelebratedRef = useRef(onCelebrated);
  useEffect(() => {
    onCelebratedRef.current = onCelebrated;
  }, [onCelebrated]);

  /* ---------------------------------------------------------------- toasts */
  useEffect(() => {
    if (toast === null) return;
    const id = globalThis.setTimeout(() => setToast(null), TOAST_MS);
    return () => globalThis.clearTimeout(id);
  }, [toast]);

  /* ---------------------------------------------------------------- restoration moment */
  useEffect(() => {
    if (!restoring) return;
    const id = globalThis.setTimeout(() => setRestoring(false), RESTORE_MS);
    return () => globalThis.clearTimeout(id);
  }, [restoring]);

  // The celebration is over when the smoke has cleared and the badge toast is gone (or both were skipped).
  const celebrating = restoring || (toast !== null && toast.kind === 'badge');
  useEffect(() => {
    if (celebration.current !== 'pending' || celebrating) return;
    celebration.current = 'done';
    onCelebratedRef.current?.();
  }, [celebrating]);
  // Leaving the city mid-celebration counts as finished (the moment never replays on the next visit).
  useEffect(
    () => () => {
      if (celebration.current !== 'pending') return;
      celebration.current = 'done';
      onCelebratedRef.current?.();
    },
    [],
  );
  const skipCelebration = () => {
    if (restoring) setRestoring(false);
    setToast((cur) => (cur !== null && cur.kind === 'badge' ? null : cur));
  };

  /* ---------------------------------------------------------------- pre-selection (App: citySelect) */
  // A new pre-selection from the parent replaces the selection during render (no effect, no extra commit).
  const initialKey = validInitial(initialSelected);
  const [seenInitial, setSeenInitial] = useState<DistrictId | null>(initialKey);
  if (initialKey !== seenInitial) {
    setSeenInitial(initialKey);
    if (initialKey !== null) {
      setSelectionByUser(false);
      setSelected(initialKey);
    }
  }
  useEffect(() => {
    if (initialKey === null) return;
    // Bring the district into view once the app has scrolled the new screen to the top.
    const id = globalThis.setTimeout(() => {
      const btn = mainRef.current?.querySelector<HTMLElement>(`button[data-district="${initialKey}"]`);
      if (btn !== null && btn !== undefined && typeof btn.scrollIntoView === 'function') btn.scrollIntoView({ block: 'nearest' });
    }, 0);
    return () => globalThis.clearTimeout(id);
  }, [initialKey]);

  /* ---------------------------------------------------------------- selection → panel */
  useEffect(() => {
    if (selected === null) return;
    const panel = panelRef.current;
    if (panel === null) return;
    if (!selectionByUser) return;
    if (typeof window !== 'undefined' && window.innerWidth < SHEET_MAX_WIDTH && typeof panel.scrollIntoView === 'function') panel.scrollIntoView({ block: 'nearest' });
    panelHeadingRef.current?.focus({ preventScroll: true });
  }, [selected, selectionByUser]);

  /* ---------------------------------------------------------------- bottom sheet: reserve its real height below the map */
  const panelOpen = selected !== null && travel === null;
  useEffect(() => {
    const panel = panelRef.current;
    if (!panelOpen || panel === null || typeof window === 'undefined') {
      setSheetHeight(null);
      return;
    }
    const measure = () => setSheetHeight(window.innerWidth < SHEET_MAX_WIDTH ? Math.ceil(panel.getBoundingClientRect().height) : null);
    measure();
    const RO = globalThis.ResizeObserver;
    const ro = typeof RO === 'function' ? new RO(measure) : null;
    ro?.observe(panel);
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [panelOpen, selected]);

  /* ---------------------------------------------------------------- truck drive */
  useEffect(() => {
    if (travel === null) return;
    const box = districtById(travel);
    const missionId = box.missionId;
    let raf: number | null = null;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (raf !== null) globalThis.cancelAnimationFrame(raf);
      raf = null;
      finishRef.current = null;
      dispatch({ type: 'SELECT_MISSION', id: missionId });
      setTravel(null);
      setTruck(null);
    };
    finishRef.current = finish;
    const road: MeasurablePath | null = roadRef.current;
    let start: number | null = null;
    let last = pointOnRoad(road, ROAD_START, box.entry, 0);
    let facing: 1 | -1 = 1;
    const frame = (ts: number) => {
      if (done) return;
      if (start === null) start = ts;
      const elapsed = ts - start;
      const f = Math.min(1, elapsed / TRAVEL_MS);
      const p = pointOnRoad(road, ROAD_START, box.entry, easeInOut(f));
      const dx = p.x - last.x;
      if (dx > 0.01) facing = 1;
      else if (dx < -0.01) facing = -1;
      last = p;
      setTruck({ x: p.x, y: p.y, facing, wheelFrame: Math.floor(elapsed / WHEEL_MS) % 2 === 0 ? 0 : 1 });
      if (f < 1) raf = globalThis.requestAnimationFrame(frame);
      else finish();
    };
    raf = globalThis.requestAnimationFrame(frame);
    return () => {
      // Unmount or re-run mid-drive: stop the loop without dispatching twice.
      if (raf !== null) globalThis.cancelAnimationFrame(raf);
      if (finishRef.current === finish) finishRef.current = null;
    };
  }, [travel, dispatch]);

  const skipTravel = useCallback(() => {
    finishRef.current?.();
  }, []);

  /* ---------------------------------------------------------------- handlers */
  const select = (id: DistrictId) => {
    if (travel !== null) return;
    skipCelebration();
    const status = statuses[id];
    if (status === 'locked') {
      const next = firstAvailable(state.progress);
      const nextName = next === null ? '' : missionCopy(next.missionId, lang).districtName;
      setToast({ kind: 'locked', text: t('city.locked.hint', { district: nextName }), colour: null });
      return;
    }
    lastFocusedDistrict.current = id;
    setSelectionByUser(true);
    setSelected(id);
  };

  const closePanel = () => {
    setSelected(null);
    const id = lastFocusedDistrict.current;
    if (id !== null) mainRef.current?.querySelector<HTMLElement>(`button[data-district="${id}"]`)?.focus();
  };

  const go = () => {
    if (selected === null || travel !== null) return; // a second tap during the drive is ignored
    const box = districtById(selected);
    if (isReduced()) {
      dispatch({ type: 'SELECT_MISSION', id: box.missionId });
      return;
    }
    setTravel(selected);
  };

  const onMainKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      if (travel !== null) {
        e.preventDefault();
        skipTravel();
      } else if (selected !== null) {
        e.preventDefault();
        closePanel();
      }
    }
    if (restoring) skipCelebration();
  };

  const onMapPointerDown = (_e: PointerEvent<HTMLDivElement>) => {
    if (celebrating) skipCelebration();
  };

  /* ---------------------------------------------------------------- derived */
  const visual = {} as Record<DistrictId, DistrictVisualState>;
  for (const box of DISTRICTS) {
    const s = statuses[box.id];
    visual[box.id] = s === 'available' && selected === box.id && travel === null ? 'selected' : s;
  }
  const stars = totalStars(state.progress);
  const maxStars = maxTotalStars();
  const solvedBoxes = DISTRICTS.filter((b) => statuses[b.id] === 'solved');
  const selectedBox = selected === null ? null : districtById(selected);
  const travelBox = travel === null ? null : districtById(travel);
  const restoredBox = restoredId === null ? null : districtById(restoredId);

  const statusLabel = (s: DistrictStatus): string => (s === 'locked' ? t('city.status.locked') : s === 'solved' ? t('city.status.solved') : t('city.status.available'));
  const starsText = (box: DistrictBox): string => {
    const m = getPublicMission(box.missionId);
    const p = state.progress[box.missionId];
    return p === undefined ? plural(lang, 'mission.notPlayed', m.maxStars, { max: m.maxStars }) : t('mission.starsOf', { stars: p.stars, max: m.maxStars });
  };
  const mainStyle = sheetHeight === null ? undefined : ({ '--city-sheet-h': `${String(sheetHeight)}px` } as CSSProperties);

  return (
    <main className={`screen screen-city${panelOpen ? ' has-panel' : ''}${travel !== null ? ' is-travelling' : ''}`} ref={mainRef} onKeyDown={onMainKeyDown} aria-busy={travel !== null} style={mainStyle}>
      {/* ------------------------------------------------------------ HUD */}
      <header className="city-hud">
        <div className="city-brand-group">
          <button type="button" className="city-brand" onClick={onTitle} aria-label={t('a11y.cityBackToTitle')} data-testid="city-title">
            <Q11Mark size={40} />
            <span className="city-brand-name">{t('app.name')}</span>
          </button>
          <h1 className="city-brand-title" tabIndex={-1} data-focus-target>
            {t('city.title')}
          </h1>
        </div>
        <div className="city-hud-stats">
          <span className="city-stat" data-testid="city-stars">
            <StarIcon filled size={20} />
            <span>{t('mission.starsOf', { stars, max: maxStars })}</span>
          </span>
          <ul className="city-badges" aria-label={t('city.badges')} data-testid="city-badges">
            {solvedBoxes.length === 0 ? <li className="city-badges-empty">{t('city.badges')}: 0 / {DISTRICTS.length}</li> : null}
            {solvedBoxes.map((b) => {
              const i = DISTRICTS.findIndex((x) => x.id === b.id);
              const name = t(badgeKey(b.missionId));
              return (
                <li key={b.id} className="city-badge" data-badge={b.id}>
                  <svg viewBox="-26 -58 52 62" width={26} height={31} aria-hidden="true" focusable="false">
                    <ChapterBadge x={0} y={0} colour={badgeColour(i)} />
                  </svg>
                  <span className="city-badge-name">{name}</span>
                </li>
              );
            })}
          </ul>
          {state.settings.freeRoam ? (
            <span className="city-free-roam" data-testid="free-roam">
              <span className="city-pill">{t('city.hud.freeRoam')}</span>
              <span className="city-free-roam-desc">{t('city.hud.freeRoamOn')}</span>
            </span>
          ) : null}
        </div>
        <p className="city-storage" data-testid="storage-note">
          {storageNote}
        </p>
        <button type="button" className="city-icon-btn" onClick={onSettings} aria-label={t('title.settings')} data-testid="settings">
          <GearIcon size={24} />
        </button>
      </header>

      {/* toasts sit just below the HUD (never over it) */}
      <div className="city-toast-anchor">
        <div className="city-toast-region" role="status" aria-live="polite" aria-atomic="true" data-testid="city-toast-region">
          {toast !== null ? (
            <div className={`city-toast is-${toast.kind}`} data-testid={`toast-${toast.kind}`}>
              {toast.kind === 'badge' ? (
                <svg viewBox="-26 -58 52 62" width={28} height={33} aria-hidden="true" focusable="false">
                  <ChapterBadge x={0} y={0} colour={toast.colour ?? ART.crewZ} />
                </svg>
              ) : null}
              <span>{toast.text}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="city-body">
        {/* ------------------------------------------------------------ the city */}
        <section className="city-map-wrap" aria-label={t('city.aria.map')} data-testid="city-map">
          <div className="city-map" onPointerDown={onMapPointerDown} style={{ aspectRatio: `${String(CITY_W)} / ${String(CITY_H)}` }}>
            <svg className="city-svg" viewBox={`0 0 ${String(CITY_W)} ${String(CITY_H)}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
              <CityBackdrop states={visual} showSelection={false} />
              {/* selection highlight (drawn here so a solved district can be selected without re-growing smoke) */}
              {selectedBox !== null && travel === null ? (
                <rect className="city-select-ring" x={selectedBox.x - 8} y={selectedBox.y - 8} width={selectedBox.w + 16} height={selectedBox.h + 16} rx={18} fill={ART.alarmRing} fillOpacity={0.22} stroke={ART.highlight} strokeWidth={5} strokeDasharray="14 8" />
              ) : null}
              {/* restoration moment: smoke drifts away, sparkles over the lit windows */}
              {restoring && restoredBox !== null ? (
                <g className="city-restore" data-testid="restore-fx">
                  <rect className="city-restore-ring" x={restoredBox.x - 6} y={restoredBox.y - 6} width={restoredBox.w + 12} height={restoredBox.h + 12} rx={16} fill="none" stroke={ART.success} strokeWidth={5} />
                  <g className="city-restore-smoke">
                    <SmokePlume x={restoredBox.smoke.x} y={restoredBox.smoke.y} scale={0.9} />
                  </g>
                  {[0.2, 0.5, 0.8].map((fx, i) => (
                    <g key={fx} className="city-restore-spark" style={{ animationDelay: `${String(i * 120)}ms` }}>
                      <Sparkle x={restoredBox.x + restoredBox.w * fx} y={restoredBox.y + restoredBox.h * (0.3 + 0.2 * (i % 2))} />
                    </g>
                  ))}
                </g>
              ) : null}
              {/* the road the truck follows (invisible; measured with getPointAtLength) */}
              {travelBox !== null ? <path ref={roadRef} d={ROADS[travelBox.id]} fill="none" stroke="none" data-testid="travel-road" /> : null}
              {truck !== null ? (
                <g className="city-truck" data-testid="travel-truck">
                  <FireTruck x={truck.x} y={truck.y} scale={0.85} facing={truck.facing} lights={truck.wheelFrame === 0} wheelFrame={truck.wheelFrame} />
                </g>
              ) : null}
            </svg>
            {DISTRICTS.map((box) => {
              const status = statuses[box.id];
              const m = getPublicMission(box.missionId);
              const copy = missionCopy(box.missionId, lang);
              // The name starts with the visible chip text ("1 Rowhouse Lane") so label-in-name holds.
              const label = t('city.aria.mission', { n: m.index, name: copy.districtName, status: statusLabel(status), stars: starsText(box) });
              return (
                <button
                  key={box.id}
                  type="button"
                  className={`city-district is-${status}${selected === box.id ? ' is-selected' : ''}`}
                  style={hitBoxStyle(box)}
                  data-testid={`mission-${String(m.index)}`}
                  data-district={box.id}
                  data-status={status}
                  aria-label={label}
                  aria-pressed={selected === box.id}
                  aria-disabled={travel !== null ? true : undefined}
                  onClick={() => select(box.id)}
                  onKeyDown={(e) => onDistrictKeyDown(e, box.id, mainRef)}
                >
                  <span className="city-district-name" aria-hidden="true">
                    <span className="city-district-n">{m.index}</span>
                    <span className="city-district-text">{copy.districtName}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="city-hint">{t('city.subtitle')}</p>
        </section>

        {/* ------------------------------------------------------------ selection panel */}
        <aside className={`city-panel${panelOpen ? ' is-open' : ''}`} ref={panelRef} aria-labelledby="city-panel-heading" data-testid="city-panel" hidden={!panelOpen}>
          {selectedBox !== null ? (
            <SelectionPanel box={selectedBox} status={statuses[selectedBox.id]} state={state} headingRef={panelHeadingRef} starsText={starsText(selectedBox)} statusLabel={statusLabel(statuses[selectedBox.id])} onGo={go} onClose={closePanel} travelling={travel !== null} />
          ) : null}
        </aside>
      </div>

      {/* ------------------------------------------------------------ truck travel overlay (tap anywhere / Skip) */}
      {travelBox !== null ? (
        <div className="city-travel" onPointerDown={skipTravel} data-testid="travel-overlay">
          <div className="city-travel-card" role="status" aria-live="polite">
            <span className="city-travel-text">{t('city.truck.travel', { district: missionCopy(travelBox.missionId, lang).districtName })}</span>
            <button type="button" className="city-btn" onClick={skipTravel} data-testid="travel-skip" autoFocus>
              {t('city.truck.skip')}
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function onDistrictKeyDown(e: KeyboardEvent<HTMLButtonElement>, id: DistrictId, mainRef: RefObject<HTMLElement>) {
  let target: DistrictId | null = null;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') target = neighbourDistrict(id, 1);
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') target = neighbourDistrict(id, -1);
  else if (e.key === 'Home') target = DISTRICTS[0]?.id ?? null;
  else if (e.key === 'End') target = DISTRICTS[DISTRICTS.length - 1]?.id ?? null;
  if (target === null) return;
  e.preventDefault();
  mainRef.current?.querySelector<HTMLElement>(`button[data-district="${target}"]`)?.focus();
}

/* ------------------------------------------------------------------ selection panel */

interface SelectionPanelProps {
  readonly box: DistrictBox;
  readonly status: DistrictStatus;
  readonly state: GameState;
  readonly headingRef: RefObject<HTMLHeadingElement>;
  readonly starsText: string;
  readonly statusLabel: string;
  readonly travelling: boolean;
  readonly onGo: () => void;
  readonly onClose: () => void;
}

function SelectionPanel({ box, status, state, headingRef, starsText, statusLabel, travelling, onGo, onClose }: SelectionPanelProps) {
  const t = useT();
  const lang = useLanguage();
  const m = getPublicMission(box.missionId);
  const copy = missionCopy(box.missionId, lang);
  const p = state.progress[box.missionId];
  const solved = status === 'solved';
  return (
    <div className="city-panel-inner">
      <div className="city-panel-head">
        <h2 id="city-panel-heading" className="city-panel-title" ref={headingRef} tabIndex={-1}>
          {copy.districtName}
        </h2>
        <p className="city-panel-sub">
          <span>
            {t('mission.label', { n: m.index })} · {copy.kidTitle}
          </span>
          <span className={`city-status is-${status}`} data-testid="panel-status">
            {statusLabel}
          </span>
        </p>
      </div>
      <dl className="city-panel-facts">
        <div className="city-fact">
          <dt>{t('city.select.goal')}</dt>
          <dd>{copy.goal}</dd>
        </div>
        <div className="city-fact city-fact-row">
          <dt>{t('city.select.best')}</dt>
          <dd>
            <span className="city-stars" role="img" aria-label={starsText}>
              {Array.from({ length: m.maxStars }, (_, i) => (
                <StarIcon key={i} filled={(p?.stars ?? 0) > i} size={22} />
              ))}
            </span>
            <span className="city-stars-text">{starsText}</span>
          </dd>
        </div>
        {solved ? (
          <div className="city-fact city-fact-row">
            <dt>{t('city.badges')}</dt>
            <dd>{t(badgeKey(box.missionId))}</dd>
          </div>
        ) : null}
      </dl>
      <div className="city-panel-actions">
        <button type="button" className="city-btn city-btn-primary" onClick={onGo} data-testid="dispatch-go" aria-disabled={travelling ? true : undefined}>
          {solved ? t('city.status.replay') : t('city.dispatch')}
        </button>
        <button type="button" className="city-btn city-btn-ghost" onClick={onClose} data-testid="panel-close">
          {t('common.close')}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ small glyphs */

function StarIcon({ filled, size }: { readonly filled: boolean; readonly size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={`city-star${filled ? ' is-filled' : ''}`}>
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" fill={filled ? ART.alarmRing : ART.paper} stroke={ART.ink} strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  );
}

function Sparkle({ x, y }: { readonly x: number; readonly y: number }) {
  return (
    <g transform={`translate(${String(x)} ${String(y)})`}>
      <path d="M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z" fill={ART.windowLit} stroke={ART.ink} strokeWidth={2} strokeLinejoin="round" />
    </g>
  );
}
