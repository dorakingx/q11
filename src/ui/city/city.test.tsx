/**
 * City screen component tests (jsdom + @testing-library). requestAnimationFrame is stubbed onto fake timers and
 * SVG path geometry (getTotalLength / getPointAtLength) is stubbed, since jsdom has neither.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { initialState, type Action, type GameState, type MissionProgress, type StarCount } from '../../game';
import { DISTRICT_ORDER } from '../art';
import { LanguageProvider } from '../i18n';
import { CityScreen, RESTORE_MS, TRAVEL_MS, badgeKey, statusesOf } from './index';

const solved = (stars: StarCount): MissionProgress => ({ stars, attempts: 1, completed: true });

function stateWith(progress: Record<string, MissionProgress> = {}, freeRoam = false, reducedMotion = false): GameState {
  const s = initialState();
  return { ...s, screen: 'missions', progress, settings: { ...s.settings, freeRoam, reducedMotion } };
}

interface Opts {
  readonly state?: GameState;
  readonly recentlySolved?: string | null;
  readonly reducedMotion?: boolean;
  readonly lang?: 'en' | 'ja';
}

function renderCity({ state = stateWith(), recentlySolved = null, reducedMotion, lang = 'en' }: Opts = {}) {
  const dispatch = vi.fn<(a: Action) => void>();
  const onSettings = vi.fn();
  const onTitle = vi.fn();
  const utils = render(
    <LanguageProvider language={lang}>
      <CityScreen state={state} dispatch={dispatch} storageNote="Progress is saved in this browser." recentlySolved={recentlySolved} onSettings={onSettings} onTitle={onTitle} {...(reducedMotion === undefined ? {} : { reducedMotion })} />
    </LanguageProvider>,
  );
  return { ...utils, dispatch, onSettings, onTitle };
}

const selectMissions = (dispatch: ReturnType<typeof vi.fn>) => dispatch.mock.calls.filter((c) => (c[0] as Action).type === 'SELECT_MISSION');

/** rAF on fake timers (16 ms frames, Date.now() timestamps) + SVG path geometry. */
function stubAnimation() {
  vi.useFakeTimers();
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => globalThis.setTimeout(() => cb(Date.now()), 16) as unknown as number);
  vi.stubGlobal('cancelAnimationFrame', (id: number) => globalThis.clearTimeout(id));
  const proto = SVGElement.prototype as unknown as { getTotalLength?: () => number; getPointAtLength?: (l: number) => { x: number; y: number } };
  proto.getTotalLength = () => 1000;
  proto.getPointAtLength = (l: number) => ({ x: 195 + l, y: 720 });
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('CityScreen — districts', () => {
  it('renders one real, focusable button per district in unlock order with status + stars in the label', () => {
    renderCity({ state: stateWith({ 'first-alarm': solved(3) }) });
    const map = screen.getByTestId('city-map');
    const buttons = within(map).getAllByRole('button');
    expect(buttons).toHaveLength(6);
    buttons.forEach((b, i) => {
      expect(b.tagName).toBe('BUTTON');
      expect(b).toHaveAttribute('data-testid', `mission-${String(i + 1)}`);
      expect(b).toHaveAttribute('data-district', DISTRICT_ORDER[i]);
    });
    expect(screen.getByTestId('mission-1')).toHaveAttribute('data-status', 'solved');
    expect(screen.getByTestId('mission-1')).toHaveAccessibleName('Mission 1: Rowhouse Lane, Safe, 3 of 3 stars');
    expect(screen.getByTestId('mission-2')).toHaveAttribute('data-status', 'available');
    expect(screen.getByTestId('mission-2')).toHaveAccessibleName('Mission 2: Harbor Bridge, Fire reported, not played yet, up to 3 stars');
    expect(screen.getByTestId('mission-3')).toHaveAttribute('data-status', 'locked');
    expect(screen.getByTestId('mission-3')).toHaveAccessibleName(/^Mission 3: Conversion Lab, Locked, /);
    expect(screen.getByTestId('mission-6')).toHaveAccessibleName(/up to 1 star$/);
    // the backdrop mirrors the statuses
    expect(map.querySelector('[data-district="station-row"][data-state="solved"]')).not.toBeNull();
    expect(map.querySelector('[data-district="lab"][data-state="locked"]')).not.toBeNull();
    // focusable
    screen.getByTestId('mission-3').focus();
    expect(screen.getByTestId('mission-3')).toHaveFocus();
  });

  it('free roam opens every district and shows the indicator', () => {
    renderCity({ state: stateWith({}, true) });
    expect(screen.getByTestId('free-roam')).toHaveTextContent('Free roam');
    for (let i = 1; i <= 6; i++) expect(screen.getByTestId(`mission-${String(i)}`)).toHaveAttribute('data-status', 'available');
    expect(statusesOf({}, true)['old-town']).toBe('available');
  });

  it('a locked district shows the "finish the previous district" toast and does not dispatch or select', async () => {
    const user = userEvent.setup();
    const { dispatch } = renderCity();
    await user.click(screen.getByTestId('mission-3'));
    const region = screen.getByTestId('city-toast-region');
    expect(region).toHaveAttribute('role', 'status');
    expect(within(region).getByTestId('toast-locked')).toHaveTextContent('Finish Harbor Bridge first to open this road.');
    expect(dispatch).not.toHaveBeenCalled();
    expect(screen.getByTestId('city-panel')).not.toBeVisible();
  });

  it('an available district opens the selection panel with goal, status, stars and Dispatch!', async () => {
    const user = userEvent.setup();
    const { dispatch } = renderCity();
    await user.click(screen.getByTestId('mission-1'));
    const panel = screen.getByTestId('city-panel');
    expect(panel).toBeVisible();
    expect(within(panel).getByRole('heading', { name: 'Rowhouse Lane' })).toBeInTheDocument();
    expect(within(panel).getByText(/Two alarms ring/)).toBeInTheDocument();
    expect(within(panel).getByText('Fire reported')).toBeInTheDocument();
    expect(within(panel).getByRole('img', { name: 'not played yet, up to 3 stars' })).toBeInTheDocument();
    expect(screen.getByTestId('dispatch-go')).toHaveTextContent('Dispatch!');
    expect(screen.getByTestId('mission-1')).toHaveAttribute('aria-pressed', 'true');
    expect(dispatch).not.toHaveBeenCalled();
    // the map shows the selected highlight
    expect(screen.getByTestId('city-map').querySelector('[data-district="station-row"][data-state="selected"]')).not.toBeNull();
  });

  it('a solved district offers "Play again" and its badge name; Close returns focus to the district', async () => {
    const user = userEvent.setup();
    renderCity({ state: stateWith({ 'first-alarm': solved(2) }) });
    await user.click(screen.getByTestId('mission-1'));
    expect(screen.getByTestId('dispatch-go')).toHaveTextContent('Play again');
    expect(within(screen.getByTestId('city-panel')).getByText('Alarm Reader')).toBeInTheDocument();
    expect(within(screen.getByTestId('city-panel')).getByRole('img', { name: '2 of 3 stars' })).toBeInTheDocument();
    await user.click(screen.getByTestId('panel-close'));
    expect(screen.getByTestId('city-panel')).not.toBeVisible();
    expect(screen.getByTestId('mission-1')).toHaveFocus();
  });

  it('keyboard: Enter selects, arrows move between districts, Escape closes the panel', async () => {
    const user = userEvent.setup();
    renderCity();
    screen.getByTestId('mission-1').focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('mission-2')).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByTestId('mission-1')).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('city-panel')).toBeVisible();
    await user.keyboard('{Escape}');
    expect(screen.getByTestId('city-panel')).not.toBeVisible();
    expect(screen.getByTestId('mission-1')).toHaveFocus();
  });
});

describe('CityScreen — HUD', () => {
  it('shows stars x of 16, earned badges, the storage note and the settings / title buttons', async () => {
    const user = userEvent.setup();
    const { onSettings, onTitle } = renderCity({ state: stateWith({ 'first-alarm': solved(3), 'red-forward-blue-backward': solved(2) }) });
    expect(screen.getByTestId('city-stars')).toHaveTextContent('5 of 16 stars');
    expect(screen.getByRole('heading', { level: 1, name: 'Quantum City' })).toBeInTheDocument();
    const badges = screen.getByTestId('city-badges');
    expect(within(badges).getByText('Alarm Reader')).toBeInTheDocument();
    expect(within(badges).getByText('Gate Tracker')).toBeInTheDocument();
    expect(within(badges).queryByText('Colour Switcher')).toBeNull();
    expect(screen.getByTestId('storage-note')).toHaveTextContent('Progress is saved in this browser.');
    expect(screen.queryByTestId('free-roam')).toBeNull();
    await user.click(screen.getByTestId('settings'));
    expect(onSettings).toHaveBeenCalledTimes(1);
    await user.click(screen.getByTestId('city-title'));
    expect(onTitle).toHaveBeenCalledTimes(1);
  });

  it('speaks Japanese when the provider says so', () => {
    renderCity({ lang: 'ja' });
    expect(screen.getByRole('heading', { level: 1, name: '量子の街' })).toBeInTheDocument();
    expect(screen.getByTestId('mission-1')).toHaveAccessibleName(/^ミッション 1：長屋通り \(Rowhouse Lane\)、火事発生、/);
  });
});

describe('CityScreen — dispatch travel', () => {
  beforeEach(stubAnimation);

  it('Dispatch! drives the truck for ≈1.5 s then dispatches exactly one SELECT_MISSION; a second tap is ignored', () => {
    const { dispatch } = renderCity();
    fireEvent.click(screen.getByTestId('mission-1'));
    fireEvent.click(screen.getByTestId('dispatch-go'));
    expect(screen.getByTestId('travel-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('travel-skip')).toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    // the truck is on the road and the panel is out of the way
    const truck = screen.getByTestId('travel-truck');
    expect(truck.getAttribute('transform') ?? truck.innerHTML).toBeTruthy();
    expect(screen.getByTestId('city-panel')).not.toBeVisible();
    expect(dispatch).not.toHaveBeenCalled();
    // district taps during the drive are ignored
    fireEvent.click(screen.getByTestId('mission-2'));
    expect(screen.queryByTestId('toast-locked')).toBeNull();
    act(() => {
      vi.advanceTimersByTime(TRAVEL_MS + 200);
    });
    expect(selectMissions(dispatch)).toHaveLength(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'SELECT_MISSION', id: 'first-alarm' });
    expect(screen.queryByTestId('travel-overlay')).toBeNull();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(selectMissions(dispatch)).toHaveLength(1);
  });

  it('Skip ends the drive immediately with exactly one SELECT_MISSION', () => {
    const { dispatch } = renderCity();
    fireEvent.click(screen.getByTestId('mission-1'));
    fireEvent.click(screen.getByTestId('dispatch-go'));
    act(() => {
      vi.advanceTimersByTime(100);
    });
    fireEvent.click(screen.getByTestId('travel-skip'));
    expect(selectMissions(dispatch)).toHaveLength(1);
    expect(screen.queryByTestId('travel-overlay')).toBeNull();
    act(() => {
      vi.advanceTimersByTime(TRAVEL_MS * 2);
    });
    expect(selectMissions(dispatch)).toHaveLength(1);
  });

  it('tapping anywhere on the overlay also skips', () => {
    const { dispatch } = renderCity();
    fireEvent.click(screen.getByTestId('mission-1'));
    fireEvent.click(screen.getByTestId('dispatch-go'));
    fireEvent.pointerDown(screen.getByTestId('travel-overlay'));
    expect(selectMissions(dispatch)).toHaveLength(1);
  });

  it('free roam: a far district can be dispatched; the truck rolls with alternating wheel frames facing +x', () => {
    const { dispatch } = renderCity({ state: stateWith({}, true) });
    fireEvent.click(screen.getByTestId('mission-4'));
    fireEvent.click(screen.getByTestId('dispatch-go'));
    const frames = new Set<string>();
    for (let i = 0; i < 8; i++) {
      act(() => {
        vi.advanceTimersByTime(64);
      });
      frames.add(screen.getByTestId('travel-truck').innerHTML);
    }
    expect(frames.size).toBeGreaterThan(1); // the pose changes frame to frame (position / wheels)
    expect(screen.getByTestId('travel-truck').innerHTML).not.toContain('scale(-1 1)'); // faces +x along the avenue
    act(() => {
      vi.advanceTimersByTime(TRAVEL_MS);
    });
    expect(dispatch).toHaveBeenCalledWith({ type: 'SELECT_MISSION', id: 'blind-dispatch' });
    expect(selectMissions(dispatch)).toHaveLength(1);
  });

  it('reduced motion (prop) dispatches at once with no drive', () => {
    const { dispatch } = renderCity({ reducedMotion: true });
    fireEvent.click(screen.getByTestId('mission-1'));
    fireEvent.click(screen.getByTestId('dispatch-go'));
    expect(screen.queryByTestId('travel-overlay')).toBeNull();
    expect(selectMissions(dispatch)).toHaveLength(1);
  });

  it('reduced motion (Settings.reducedMotion or the app marker) dispatches at once too', () => {
    const a = renderCity({ state: stateWith({}, false, true) });
    fireEvent.click(screen.getByTestId('mission-1'));
    fireEvent.click(screen.getByTestId('dispatch-go'));
    expect(screen.queryByTestId('travel-overlay')).toBeNull();
    expect(selectMissions(a.dispatch)).toHaveLength(1);
    a.unmount();
    const marker = document.createElement('div');
    marker.setAttribute('data-reduced-motion', 'true');
    document.body.appendChild(marker);
    try {
      const b = renderCity();
      fireEvent.click(screen.getByTestId('mission-1'));
      fireEvent.click(screen.getByTestId('dispatch-go'));
      expect(screen.queryByTestId('travel-overlay')).toBeNull();
      expect(selectMissions(b.dispatch)).toHaveLength(1);
    } finally {
      marker.remove();
    }
  });
});

describe('CityScreen — restoration moment', () => {
  beforeEach(stubAnimation);

  it('recentlySolved shows the badge toast (aria-live) and the smoke-clears effect, which ends by itself', () => {
    renderCity({ state: stateWith({ 'first-alarm': solved(3) }), recentlySolved: 'station-row' });
    const region = screen.getByTestId('city-toast-region');
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(within(region).getByTestId('toast-badge')).toHaveTextContent('Alarm Reader earned!');
    expect(screen.getByTestId('restore-fx')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(RESTORE_MS + 50);
    });
    expect(screen.queryByTestId('restore-fx')).toBeNull();
    expect(screen.getByTestId('city-map').querySelector('[data-district="station-row"][data-state="solved"]')).not.toBeNull();
  });

  it('is skippable by a tap on the map and static under reduced motion', () => {
    const a = renderCity({ state: stateWith({ 'first-alarm': solved(3) }), recentlySolved: 'station-row' });
    fireEvent.pointerDown(screen.getByTestId('city-map').firstElementChild as Element);
    expect(screen.queryByTestId('restore-fx')).toBeNull();
    a.unmount();
    renderCity({ state: stateWith({ 'first-alarm': solved(3) }), recentlySolved: 'station-row', reducedMotion: true });
    expect(screen.queryByTestId('restore-fx')).toBeNull();
    expect(screen.getByTestId('toast-badge')).toHaveTextContent('Alarm Reader earned!');
  });

  it('ignores a recentlySolved id that is not actually solved', () => {
    renderCity({ recentlySolved: 'station-row' });
    expect(screen.queryByTestId('toast-badge')).toBeNull();
    expect(screen.queryByTestId('restore-fx')).toBeNull();
  });

  it('maps every mission to a badge name key', () => {
    expect(badgeKey('silent-failure')).toBe('city.badgeName.silentFailure');
    expect(badgeKey('first-alarm')).toBe('city.badgeName.firstAlarm');
  });
});
