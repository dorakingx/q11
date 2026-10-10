/**
 * SprayPlayer, frame model, ResultOverlay and WhyCompare tests. Every debrief is a real `confirmDispatch`
 * and every timeline a real `buildEffects`, so the pictures are checked against the engine, never against
 * numbers invented here.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { buildEffects, confirmDispatch, getPublicMission, resultType, type CrewLetter, type Debrief, type EffectTimeline } from '../../game';
import { fromString, letterAt, support } from '../../quantum';
import { missionCopy, translator } from '../i18n';
import { announcementAt, captionAt } from './captions';
import { computeFrame, finalFrame } from './frame';
import { ResultOverlay } from './ResultOverlay';
import { Scene } from './Scene';
import { SprayPlayer } from './SprayPlayer';
import { frameOptionsFor } from './stageModel';
import { WhyCompare } from './WhyCompare';

const CASES = {
  correct: { missionId: 'blind-dispatch', placements: { 4: 'X' } as Record<number, CrewLetter>, result: 'restored' },
  wrong: { missionId: 'blind-dispatch', placements: { 5: 'X' } as Record<number, CrewLetter>, result: 'still-burning' },
  twoKinds: { missionId: 'two-kinds-of-trouble', placements: { 1: 'X', 6: 'Z' } as Record<number, CrewLetter>, result: 'safe-pattern' },
  silent: { missionId: 'silent-failure', placements: { 0: 'X' } as Record<number, CrewLetter>, result: 'logical-failure' },
} as const;

function setup(key: keyof typeof CASES, reducedMotion = false): { debrief: Debrief; timeline: EffectTimeline; n: number } {
  const c = CASES[key];
  const debrief = confirmDispatch(c.missionId, c.placements);
  expect(resultType(debrief)).toBe(c.result);
  return { debrief, timeline: buildEffects(debrief, reducedMotion), n: fromString(debrief.fires).n };
}

describe('computeFrame · house states follow the timeline', () => {
  it('blind dispatch correct: fog → true X shown from the spray start → splash → out → restored; other fog lifts at reveal; alarms live from the start', () => {
    const { debrief, timeline, n } = setup('correct');
    const opts = frameOptionsFor(debrief, n, 'dispatch');
    const impact = timeline.events.find((e) => e.type === 'impact');
    const spray = timeline.events.find((e) => e.type === 'spray-start');
    if (impact?.type !== 'impact' || spray?.type !== 'spray-start') throw new Error('no impact / spray');
    expect(impact).toMatchObject({ q: 4, crew: 'X', before: 'X', after: 'I', effect: 'extinguished' });
    // Before the stream: every house fogged, the detectors already show the TRUE fire's alarms (Z0 and Z1 ring).
    const start = computeFrame(timeline, spray.t - 1, opts);
    expect(start.houses.every((h) => h.kind === 'fog')).toBe(true);
    expect(start.syndrome).toEqual(debrief.syndromeOfFires);
    expect(start.syndrome).toEqual([1, 1, 0, 0, 0, 0, 0, 0]);
    // The stream starts: the sprayed house drops its fog and shows the true X for the whole stream; the rest stay fogged.
    const streaming = computeFrame(timeline, spray.t + 10, opts);
    expect(streaming.houses[4]).toEqual({ kind: 'fire', letter: 'X' });
    expect(streaming.houses.filter((h) => h.kind === 'fog')).toHaveLength(8);
    expect(streaming.syndrome).toEqual(debrief.syndromeOfFires);
    const before = computeFrame(timeline, impact.t - 1, opts);
    expect(before.houses[4]).toEqual({ kind: 'fire', letter: 'X' });
    expect(before.streams).toHaveLength(1);
    expect(before.streams[0]?.progress ?? 0).toBeGreaterThan(0.99);
    const flash = computeFrame(timeline, impact.t + 10, opts);
    expect(flash.houses[4]).toEqual({ kind: 'fire', letter: 'X' });
    expect(flash.splashes).toHaveLength(1);
    const mid = computeFrame(timeline, impact.t + impact.dur * 0.6, opts);
    expect(mid.houses[4]).toEqual({ kind: 'out' });
    const reveal = timeline.events.find((e) => e.type === 'reveal-remaining');
    if (reveal?.type !== 'reveal-remaining') throw new Error('no reveal');
    expect(reveal.qs).toEqual([]);
    const revealed = computeFrame(timeline, reveal.t, opts);
    expect(revealed.houses[4]).toEqual({ kind: 'restored' });
    expect(revealed.houses.filter((h) => h.kind === 'fog')).toHaveLength(0);
    expect(revealed.streams).toHaveLength(0);
    expect(revealed.crews).toEqual([{ q: 4, crew: 'X', progress: 1, pose: 'idle' }]);
    // The alarms switch to the residual's at the 'alarms' event (not before).
    const alarms = timeline.events.find((e) => e.type === 'alarms');
    if (alarms?.type !== 'alarms') throw new Error('no alarms');
    expect(computeFrame(timeline, alarms.t - 1, opts).syndrome).toEqual(debrief.syndromeOfFires);
    expect(computeFrame(timeline, alarms.t, opts).syndrome).toEqual(debrief.syndromeOfResidual);
    const end = finalFrame(timeline, opts);
    expect(end.outcome).toBe('restored');
    expect(end.syndrome).toEqual(debrief.syndromeOfResidual);
    expect(end.syndrome?.every((b) => b === 0)).toBe(true);
    expect(end.done).toBe(true);
    expect(end.residualQubits).toEqual([]);
  });

  it('blind dispatch wrong: X on an empty house ignites it; the true fire is revealed; both ring the alarms', () => {
    const { debrief, timeline, n } = setup('wrong');
    const opts = frameOptionsFor(debrief, n, 'dispatch');
    const impact = timeline.events.find((e) => e.type === 'impact');
    if (impact?.type !== 'impact') throw new Error('no impact');
    expect(impact).toMatchObject({ q: 5, before: 'I', after: 'X', effect: 'ignited' });
    const afterImpact = computeFrame(timeline, impact.t + impact.dur - 1, opts);
    expect(afterImpact.houses[5]).toEqual({ kind: 'fire', letter: 'X' });
    expect(afterImpact.houses[4]).toEqual({ kind: 'fog' }); // never sprayed: fogged until the reveal
    expect(afterImpact.syndrome).toEqual(debrief.syndromeOfFires);
    const reveal = timeline.events.find((e) => e.type === 'reveal-remaining');
    if (reveal?.type !== 'reveal-remaining') throw new Error('no reveal');
    expect(reveal.qs).toEqual([4]);
    const revealed = computeFrame(timeline, reveal.t, opts);
    expect(revealed.houses[4]).toEqual({ kind: 'fire', letter: 'X' });
    const end = finalFrame(timeline, opts);
    expect(end.outcome).toBe('still-burning');
    expect(end.houses[4]).toEqual({ kind: 'residual', letter: 'X' });
    expect(end.houses[5]).toEqual({ kind: 'residual', letter: 'X' });
    expect(end.residualQubits).toEqual(support(fromString(debrief.residual)));
    expect(end.syndrome?.some((b) => b === 1)).toBe(true);
  });

  it('two kinds X1 + Z6: the Z crew next to the true Z fire leaves a stabilizer → ghost houses, safe pattern', () => {
    const { debrief, timeline, n } = setup('twoKinds');
    const opts = frameOptionsFor(debrief, n, 'dispatch');
    const impacts = timeline.events.filter((e) => e.type === 'impact');
    expect(impacts.map((e) => (e.type === 'impact' ? [e.q, e.effect] : null))).toEqual([
      [1, 'extinguished'],
      [6, 'ignited'],
    ]);
    const end = finalFrame(timeline, opts);
    expect(end.outcome).toBe('safe-pattern');
    const ghosts = end.houses.map((h, q) => (h.kind === 'ghost' ? q : -1)).filter((q) => q >= 0);
    expect(ghosts).toEqual(support(fromString(debrief.residual)));
    ghosts.forEach((q) => expect(end.houses[q]).toEqual({ kind: 'ghost', letter: letterAt(fromString(debrief.residual), q) }));
    expect(end.houses[1]).toEqual({ kind: 'restored' });
    expect(end.syndrome?.every((b) => b === 0)).toBe(true);
  });

  it('silent failure X0: quiet alarms, the leftover pattern is drawn as plain fires (logical failure)', () => {
    const { debrief, timeline, n } = setup('silent');
    const opts = frameOptionsFor(debrief, n, 'dispatch');
    const end = finalFrame(timeline, opts);
    expect(end.outcome).toBe('logical-failure');
    expect(end.syndrome?.every((b) => b === 0)).toBe(true);
    const fires = end.houses.map((h, q) => (h.kind === 'fire' ? q : -1)).filter((q) => q >= 0);
    expect(fires).toEqual(support(fromString(debrief.residual)));
    expect(end.houses.some((h) => h.kind === 'residual' || h.kind === 'ghost')).toBe(false);
  });

  it('reduced-motion timeline: the strict frame of step i has every event ≤ i complete and nothing after', () => {
    const { debrief, timeline, n } = setup('twoKinds', true);
    const opts = { ...frameOptionsFor(debrief, n, 'dispatch'), strict: true };
    expect(timeline.events.map((e) => e.t)).toEqual(timeline.events.map((_, i) => i));
    const f0 = computeFrame(timeline, 1, opts);
    expect(f0.truck).toEqual({ progress: 1, lights: false, wheelFrame: 0 });
    expect(f0.crews).toHaveLength(0);
    const runIndex = timeline.events.findIndex((e) => e.type === 'crew-run');
    const f1 = computeFrame(timeline, runIndex + 1, opts);
    expect(f1.crews).toEqual([{ q: 1, crew: 'X', progress: 1, pose: 'idle' }]);
    expect(f1.streams).toHaveLength(0);
    const last = computeFrame(timeline, timeline.events.length, opts);
    expect(last.done).toBe(true);
    expect(last.outcome).toBe('safe-pattern');
  });

  it('propagation missions start from the propagated true fire, not fog', () => {
    const d = confirmDispatch('red-forward-blue-backward', { 0: 'Y', 1: 'Y' });
    const tl = buildEffects(d, false);
    const opts = frameOptionsFor(d, 2, 'propagation');
    const f = computeFrame(tl, 0, opts);
    expect(f.houses).toEqual([
      { kind: 'fire', letter: 'Y' },
      { kind: 'fire', letter: 'Y' },
    ]);
    const end = finalFrame(tl, opts);
    expect(end.outcome).toBe('restored');
    expect(end.houses).toEqual([{ kind: 'restored' }, { kind: 'restored' }]);
  });
});

/** Advance the fake clock inside React's act (block body so act's void overload is used — no floating promise). */
function tick(ms: number): void {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

describe('SprayPlayer · clock, captions, onDone', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'requestAnimationFrame', 'cancelAnimationFrame', 'performance', 'Date'] });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  function renderPlayer(key: keyof typeof CASES, onDone: () => void, reducedMotion = false) {
    const { debrief, timeline } = setup(key, reducedMotion);
    const m = getPublicMission(debrief.missionId);
    const utils = render(<SprayPlayer codeId={m.code} circuit={m.circuit} debrief={debrief} timeline={timeline} reducedMotion={reducedMotion} onDone={onDone} missionCopy={missionCopy(m.id, 'en')} />);
    return { ...utils, debrief, timeline };
  }

  it('plays the events in order: trucks → crew runs → sprays → splash → house changes → alarms → outcome → done', () => {
    const onDone = vi.fn();
    const { container, timeline } = renderPlayer('correct', onDone);
    expect(screen.getByRole('heading', { name: 'Training replay: answer check' })).toBeInTheDocument();
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('The trucks arrive at Central District.');
    expect(container.querySelector('.truck')).not.toBeNull();
    const state = (q: number) => container.querySelector(`[data-house="${String(q)}"]`)?.getAttribute('data-house-state');
    expect(state(4)).toBe('fog');
    const at = (type: string) => {
      const e = timeline.events.find((x) => x.type === type);
      if (e === undefined) throw new Error(type);
      return e;
    };
    tick(at('crew-run').t + 50);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('red (X) crew runs to house 4.');
    expect(container.querySelector('.firefighter')?.getAttribute('data-pose')).toMatch(/run[12]/);
    tick(at('spray-start').t - at('crew-run').t);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('red (X) crew sprays house 4.');
    expect(container.querySelector('.firefighter')?.getAttribute('data-pose')).toBe('spray');
    expect(container.querySelector('.stream')).not.toBeNull();
    expect(state(4)).toBe('fire'); // the fog lifts as the stream starts: the true X is what the crew sprays
    expect(state(0)).toBe('fog');
    // The detectors show the true fire's alarms from the start (not dark).
    expect(container.querySelectorAll('.detector[data-ringing="true"]')).toHaveLength(2);
    const impact = at('impact');
    tick(impact.t - at('spray-start').t + 20);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('Splash! House 4: fire out.');
    expect(state(4)).toBe('fire'); // the splash lands on the true fire
    expect(container.querySelector('.splash')).not.toBeNull();
    tick(impact.dur * 0.6);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('House 4: fire out.');
    expect(state(4)).toBe('out');
    tick(at('alarms').t - (impact.t + impact.dur * 0.6) + 20);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('The alarms read again.');
    expect(state(4)).toBe('restored');
    expect(state(0)).toBe('normal');
    expect(container.querySelectorAll('.detector[data-ringing="true"]')).toHaveLength(0); // the residual rings nothing
    tick(at('outcome').t - at('alarms').t);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('Fires out, houses restored');
    expect(onDone).not.toHaveBeenCalled();
    tick(timeline.durationMs);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('All crews reported in.');
    expect(screen.getByTestId('spray-player')).toHaveAttribute('data-finished', 'true');
    expect(onDone).toHaveBeenCalledTimes(1);
    tick(5000);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('wrong dispatch: the ignited fire and the revealed one end as residual houses with ringing alarms', () => {
    const onDone = vi.fn();
    const { container, timeline } = renderPlayer('wrong', onDone);
    tick(timeline.durationMs + 100);
    expect(container.querySelector('[data-house="4"]')?.getAttribute('data-house-state')).toBe('residual');
    expect(container.querySelector('[data-house="5"]')?.getAttribute('data-house-state')).toBe('residual');
    expect(container.querySelectorAll('.detector[data-ringing="true"]').length).toBeGreaterThan(0);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('All crews reported in.');
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('two kinds: the ignited caption names the letters; the end shows ghost houses and the safe badge', () => {
    const onDone = vi.fn();
    const { container, timeline } = renderPlayer('twoKinds', onDone);
    const impacts = timeline.events.filter((e) => e.type === 'impact');
    const second = impacts[1];
    if (second?.type !== 'impact') throw new Error('impact');
    tick(second.t + second.dur * 0.6);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('House 6: a blue (Z) fire started. That house was not burning.');
    tick(timeline.durationMs);
    expect(container.querySelectorAll('[data-house-state="ghost"]')).toHaveLength(2);
    expect(screen.getByTestId('badge-safe')).toBeInTheDocument();
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('silent failure: alarms stay quiet, the tower lights the X anomaly and the pattern is chained', () => {
    const onDone = vi.fn();
    const { container, timeline, debrief } = renderPlayer('silent', onDone);
    tick(timeline.durationMs + 100);
    expect(container.querySelectorAll('.detector[data-ringing="true"]')).toHaveLength(0);
    expect(container.querySelector('.memory-tower')?.getAttribute('data-anomaly')).toBe('X');
    expect(container.querySelector('.logical-chain')?.getAttribute('data-chain')).toBe(support(fromString(debrief.residual)).join(','));
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('All crews reported in.');
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('Skip jumps to the final frame and calls onDone once; a second Skip and later ticks add nothing', () => {
    const onDone = vi.fn();
    const { container, timeline } = renderPlayer('correct', onDone);
    tick(200);
    fireEvent.click(screen.getByTestId('spray-skip'));
    expect(onDone).toHaveBeenCalledTimes(1);
    expect(container.querySelector('[data-house="4"]')?.getAttribute('data-house-state')).toBe('restored');
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('All crews reported in.');
    fireEvent.click(screen.getByTestId('spray-skip'));
    tick(timeline.durationMs * 2);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('unmount before the end never calls onDone; unmount after the end does not call it again', () => {
    const onDone = vi.fn();
    const first = renderPlayer('correct', onDone);
    tick(300);
    first.unmount();
    tick(10_000);
    expect(onDone).not.toHaveBeenCalled();
    const onDone2 = vi.fn();
    const second = renderPlayer('correct', onDone2);
    tick(second.timeline.durationMs + 50);
    expect(onDone2).toHaveBeenCalledTimes(1);
    second.unmount();
    expect(onDone2).toHaveBeenCalledTimes(1);
  });

  it('reduced motion: no clock — Prev/Next step static frames; the last step calls onDone exactly once', () => {
    const onDone = vi.fn();
    const { container, timeline } = renderPlayer('correct', onDone, true);
    expect(screen.getByTestId('spray-player')).toHaveAttribute('data-reduced-motion', 'true');
    expect(screen.getByTestId('spray-step')).toHaveTextContent(`Frame 1 of ${String(timeline.events.length)}`);
    expect(screen.getByTestId('spray-prev')).toBeDisabled();
    tick(60_000);
    expect(screen.getByTestId('spray-step')).toHaveTextContent('Frame 1 of');
    expect(onDone).not.toHaveBeenCalled();
    const state = (q: number) => container.querySelector(`[data-house="${String(q)}"]`)?.getAttribute('data-house-state');
    expect(state(4)).toBe('fog');
    fireEvent.click(screen.getByTestId('spray-next')); // crew-run complete
    expect(container.querySelector('.firefighter')?.getAttribute('data-pose')).toBe('idle');
    fireEvent.click(screen.getByTestId('spray-next')); // spray complete
    expect(container.querySelector('.stream')?.getAttribute('data-progress')).toBe('1.00');
    fireEvent.click(screen.getByTestId('spray-next')); // impact complete
    expect(state(4)).toBe('restored');
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('House 4: fire out.');
    fireEvent.click(screen.getByTestId('spray-prev'));
    expect(state(4)).toBe('fire'); // spray complete, impact not yet: the true fire under the stream
    fireEvent.click(screen.getByTestId('spray-prev'));
    fireEvent.click(screen.getByTestId('spray-prev'));
    expect(state(4)).toBe('fog'); // before the stream
    for (let i = 0; i < timeline.events.length; i++) fireEvent.click(screen.getByTestId('spray-next'));
    expect(screen.getByTestId('spray-next')).toBeDisabled();
    expect(onDone).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('spray-skip'));
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});

describe('ResultOverlay · four types', () => {
  const noop = () => undefined;
  function renderResult(key: keyof typeof CASES) {
    const { debrief } = setup(key);
    const m = getPublicMission(debrief.missionId);
    const result = resultType(debrief);
    const outcome = { result, logicalFlip: debrief.logicalFlip, patternQubits: support(fromString(debrief.residual)), beacon: key === 'silent' };
    const utils = render(
      <div className="scene-stage">
        <Scene codeId={m.code} circuit={m.circuit} fires={debrief.fires} crews={debrief.crews} residual={debrief.residual} syndrome={debrief.syndromeOfResidual} interactive={false} outcome={outcome} />
        <ResultOverlay debrief={debrief} result={result} missionCopy={missionCopy(m.id, 'en')} stars={debrief.score.stars} maxStars={debrief.score.maxStars} onWhy={noop} onRetry={noop} onNext={noop} nextLabel="Next district">
          <p data-testid="details-child">raw {debrief.residual}</p>
        </ResultOverlay>
      </div>,
    );
    return { ...utils, debrief };
  }

  it('restored: title, reaction, 3 stars, buttons and the details fold', () => {
    const { container } = renderResult('correct');
    expect(screen.getByTestId('result-title')).toHaveTextContent('Fires out, houses restored');
    expect(screen.getByTestId('result-title')).toHaveAttribute('tabindex', '-1');
    expect(screen.getByTestId('result-title')).toHaveAttribute('data-focus-target');
    expect(screen.getByTestId('result-reaction')).toHaveTextContent(missionCopy('blind-dispatch', 'en').reactions.restored);
    expect(screen.getByTestId('result-stars')).toHaveAttribute('aria-label', '3 of 3 stars');
    expect(screen.getByTestId('result-why')).toBeInTheDocument();
    expect(screen.getByTestId('result-retry')).toBeInTheDocument();
    expect(screen.getByTestId('result-next')).toHaveTextContent('Next district');
    const details = screen.getByTestId('result-details');
    expect(details.tagName).toBe('DETAILS');
    expect(within(details).getByTestId('details-child')).toBeInTheDocument();
    expect(container.querySelector('[data-house="4"]')?.getAttribute('data-house-state')).toBe('restored');
    expect(container.querySelector('.memory-tower')).toBeNull();
    expect(screen.getByText('Same crew puts a fire out. A different crew changes it. A crew on an empty house starts one. Quantum rules!')).toBeInTheDocument();
  });

  it('still burning: 0 stars, residual houses on the scene', () => {
    const { container } = renderResult('wrong');
    expect(screen.getByTestId('result-title')).toHaveTextContent('Still burning');
    expect(screen.getByTestId('result-stars')).toHaveAttribute('aria-label', '0 of 3 stars');
    expect(container.querySelectorAll('[data-house-state="residual"]')).toHaveLength(2);
    expect(screen.queryByTestId('result-beacon')).toBeNull();
  });

  it('safe pattern: ghosts + badge + raw residual in the details', () => {
    const { container, debrief } = renderResult('twoKinds');
    expect(screen.getByTestId('result-title')).toHaveTextContent('Safe pattern');
    expect(container.querySelectorAll('[data-house-state="ghost"]')).toHaveLength(2);
    expect(screen.getByTestId('badge-safe')).toBeInTheDocument();
    expect(within(screen.getByTestId('result-details')).getByText(`Raw residual: ${debrief.residual}`)).toBeInTheDocument();
  });

  it('logical failure: beacon line with the X flip, pattern, 1 of 1 star, tower anomaly on the scene', () => {
    const { container, debrief } = renderResult('silent');
    expect(screen.getByTestId('result-title')).toHaveTextContent('Silent failure');
    expect(screen.getByTestId('result-beacon')).toHaveTextContent('Memory beacon: logical X flip');
    expect(screen.getByTestId('result-beacon')).toHaveTextContent(`Caused by this pattern: ${debrief.residual}`);
    expect(screen.getByTestId('result-stars')).toHaveAttribute('aria-label', '1 of 1 star');
    expect(container.querySelector('.memory-tower')?.getAttribute('data-anomaly')).toBe('X');
    expect(container.querySelector('.logical-chain')).not.toBeNull();
  });

  it('prediction miss (bridge): its own title and body, a plain flame, no beacon line, no chain, faded start badges on the lanes', () => {
    const debrief = confirmDispatch('red-forward-blue-backward', { 0: 'X', 1: 'Y' }); // true YY → residual ZI
    const m = getPublicMission(debrief.missionId);
    const result = resultType(debrief);
    expect(result).toBe('prediction-miss');
    const outcome = { result, logicalFlip: debrief.logicalFlip, patternQubits: support(fromString(debrief.residual)), beacon: false };
    const { container } = render(
      <div className="scene-stage">
        <Scene codeId={m.code} circuit={m.circuit} fires={debrief.fires} crews={debrief.crews} residual={debrief.residual} syndrome={debrief.syndromeOfResidual} interactive={false} outcome={outcome} gateCursor={m.circuit.length} inputFires={debrief.startFires} />
        <ResultOverlay debrief={debrief} result={result} missionCopy={missionCopy(m.id, 'en')} stars={debrief.score.stars} maxStars={debrief.score.maxStars} onWhy={noop} onRetry={noop} onNext={noop} nextLabel="Next district" />
      </div>,
    );
    expect(screen.getByTestId('result-overlay')).toHaveAttribute('data-result', 'prediction-miss');
    expect(screen.getByTestId('result-title')).toHaveTextContent('Prediction missed');
    expect(screen.getByText('A fire is still on the wire. Bare wires have no code and no alarms, so every leftover fire acts straight on the information.')).toBeInTheDocument();
    expect(screen.getByTestId('result-reaction')).toHaveTextContent(missionCopy(m.id, 'en').reactions.logicalFailure);
    expect(screen.queryByTestId('result-beacon')).toBeNull();
    expect(screen.queryByTestId('result-beacon-ok')).toBeNull();
    expect(screen.getByTestId('result-overlay').textContent).not.toMatch(/Silent failure|beacon/i);
    expect(container.querySelector('.memory-tower')).toBeNull();
    expect(container.querySelector('.logical-chain')).toBeNull();
    expect(container.querySelector('[data-house="0"]')?.getAttribute('data-house-state')).toBe('fire');
    expect(container.querySelector('[data-house="1"]')?.getAttribute('data-house-state')).toBe('restored');
    // Input tokens become faded "start" badges once the outcome is reached.
    const starts = container.querySelectorAll('.lane-start');
    expect(starts).toHaveLength(2);
    starts.forEach((g) => expect(g.getAttribute('data-faded')).toBe('true'));
    expect(container.querySelectorAll('.lane-start-badge')).toHaveLength(2);
    expect(container.querySelector('.lane-start-badge')?.textContent).toBe('start');
  });

  it('Old Town success: the beacon-steady line and the note; the safe badge sits in the scene header, not over the board', () => {
    const debrief = confirmDispatch('silent-failure', { 1: 'X', 2: 'X' });
    const m = getPublicMission(debrief.missionId);
    const result = resultType(debrief);
    expect(result).toBe('restored');
    const { container } = render(
      <div className="scene-stage">
        <Scene codeId={m.code} circuit={m.circuit} fires={debrief.fires} crews={debrief.crews} residual={debrief.residual} syndrome={debrief.syndromeOfResidual} interactive={false} outcome={{ result, logicalFlip: debrief.logicalFlip, patternQubits: [], beacon: true }} />
        <ResultOverlay debrief={debrief} result={result} missionCopy={missionCopy(m.id, 'en')} stars={debrief.score.stars} maxStars={debrief.score.maxStars} onWhy={noop} onRetry={noop} onNext={noop} nextLabel="Next district" />
      </div>,
    );
    expect(screen.getByTestId('result-beacon-ok')).toHaveTextContent('Memory beacon steady: the stored information is intact.');
    expect(within(screen.getByTestId('result-details')).getByText('The beacon appears only at result time. During play, only the alarms can be read.')).toBeInTheDocument();
    expect(container.querySelector('.memory-tower')?.getAttribute('data-anomaly')).toBe('none');
    expect(screen.getByText('Each spray is one correction. Spraying longer or twice does nothing extra.')).toBeInTheDocument();
    // Safe pattern: the badge lives in the header band above the board.
    const safe = confirmDispatch('two-kinds-of-trouble', { 1: 'X', 6: 'Z' });
    const m5 = getPublicMission(safe.missionId);
    const r2 = render(<Scene codeId={m5.code} circuit={m5.circuit} fires={safe.fires} crews={safe.crews} residual={safe.residual} syndrome={safe.syndromeOfResidual} interactive={false} outcome={{ result: resultType(safe), logicalFlip: safe.logicalFlip, patternQubits: support(fromString(safe.residual)), beacon: false }} />);
    const header = within(r2.container).getByTestId('scene-header');
    expect(within(header).getByTestId('badge-safe')).toHaveTextContent('Logical qubit safe');
    expect(header.nextElementSibling?.classList.contains('scene-board')).toBe(true);
  });
});

describe('WhyCompare', () => {
  it('renders two scenes for the player and the true-fire alternative (from debrief.alternative), with the equivalence caption', () => {
    const { debrief } = setup('twoKinds');
    const m = getPublicMission(debrief.missionId);
    // The decoder picks the same Z6 as the player here, so the reducer's alternative is the true-fire dispatch (Z7).
    expect(debrief.whatIf.decoderCrews).toBe(debrief.crews);
    expect(debrief.alternative).toMatchObject({ kind: 'true-fires', crews: debrief.fires, verdict: 'success' });
    const { container } = render(<WhyCompare codeId={m.code} circuit={m.circuit} mine={debrief} reducedMotion missionCopy={missionCopy(m.id, 'en')} />);
    expect(container.querySelectorAll('[data-scene]')).toHaveLength(2);
    expect(screen.getByTestId('why-compare')).toHaveAttribute('data-alternative', 'true-fires');
    expect(screen.getByTestId('why-compare')).toHaveAttribute('data-relation', 'equivalent');
    expect(within(screen.getByTestId('why-mine')).getByRole('heading', { name: 'Your spray' })).toBeInTheDocument();
    expect(within(screen.getByTestId('why-alt')).getByRole('heading', { name: 'The other way · Crews on the true fires' })).toBeInTheDocument();
    expect(screen.getByTestId('why-explanation')).toHaveTextContent('differ only by a harmless pattern');
    // one shared stepper drives both scenes
    for (let i = 0; i < 12; i++) fireEvent.click(screen.getByTestId('why-next'));
    expect(screen.getByTestId('why-compare')).toHaveAttribute('data-finished', 'true');
    const houses = (root: HTMLElement) => Array.from(root.querySelectorAll('[data-house]')).map((h) => h.getAttribute('data-house-state'));
    expect(houses(screen.getByTestId('why-mine')).filter((s) => s === 'ghost')).toHaveLength(2);
    expect(houses(screen.getByTestId('why-alt')).filter((s) => s === 'restored')).toHaveLength(2);
  });

  it('silent failure vs the true-fire crews: undecidable (both residuals ring nothing, verdicts differ) → "alarms alone cannot decide"', () => {
    const { debrief } = setup('silent');
    const m = getPublicMission(debrief.missionId);
    expect(debrief.alternative).toMatchObject({ kind: 'true-fires', crews: 'IXXIIIIII', verdict: 'success' });
    render(<WhyCompare codeId={m.code} circuit={m.circuit} mine={debrief} reducedMotion={false} missionCopy={missionCopy(m.id, 'en')} />);
    expect(screen.getByTestId('why-compare')).toHaveAttribute('data-relation', 'undecidable');
    expect(screen.getByTestId('why-explanation')).toHaveTextContent('Both fire patterns ring exactly the same alarms. Alarms alone cannot decide.');
    expect(screen.getByTestId('why-explanation')).not.toHaveTextContent('harmless pattern');
    expect(screen.getByText('Nobody could have known from the alarms. That is the lesson, not a mistake.')).toBeInTheDocument();
    expect(within(screen.getByTestId('why-mine')).getByText('→ Silent failure — logical qubit flipped')).toBeInTheDocument();
    expect(within(screen.getByTestId('why-alt')).getByText('→ Logical qubit safe')).toBeInTheDocument();
    expect(screen.getByTestId('why-replay')).toBeInTheDocument();
  });

  it('a lucky guess (mission 6 X1 X2) compares with the decoder call, which silently fails: undecidable, but no "no blame" line for a success', () => {
    const debrief = confirmDispatch('silent-failure', { 1: 'X', 2: 'X' });
    const m = getPublicMission(debrief.missionId);
    expect(debrief.alternative).toMatchObject({ kind: 'decoder', crews: 'XIIIIIIII', verdict: 'logical-error' });
    render(<WhyCompare codeId={m.code} circuit={m.circuit} mine={debrief} reducedMotion missionCopy={missionCopy(m.id, 'en')} />);
    expect(screen.getByTestId('why-compare')).toHaveAttribute('data-relation', 'undecidable');
    expect(within(screen.getByTestId('why-alt')).getByRole('heading', { name: 'The other way · The smallest crew that silences every alarm' })).toBeInTheDocument();
    expect(screen.getByTestId('why-explanation')).toHaveTextContent('Alarms alone cannot decide.');
    expect(screen.queryByText('Nobody could have known from the alarms. That is the lesson, not a mistake.')).toBeNull();
  });

  it('identical crews (blind dispatch X4): "exactly the smallest correction for these alarms"', () => {
    const { debrief } = setup('correct');
    const m = getPublicMission(debrief.missionId);
    expect(debrief.alternative.crews).toBe(debrief.crews);
    render(<WhyCompare codeId={m.code} circuit={m.circuit} mine={debrief} reducedMotion missionCopy={missionCopy(m.id, 'en')} />);
    expect(screen.getByTestId('why-compare')).toHaveAttribute('data-relation', 'identical');
    expect(screen.getByTestId('why-explanation')).toHaveTextContent('Your spray is exactly the smallest correction for these alarms.');
  });

  it('a miss with ringing alarms (blind dispatch X5) is neither equivalent nor undecidable: the district why-line explains', () => {
    const { debrief } = setup('wrong');
    const m = getPublicMission(debrief.missionId);
    render(<WhyCompare codeId={m.code} circuit={m.circuit} mine={debrief} reducedMotion missionCopy={missionCopy(m.id, 'en')} />);
    expect(screen.getByTestId('why-compare')).toHaveAttribute('data-relation', 'other');
    expect(screen.getByTestId('why-explanation')).toHaveTextContent(missionCopy(m.id, 'en').whyShort);
  });

  it('bare wires (lab miss): the alternative is "crews where the fires really ended", the verdict reads as a missed prediction', () => {
    const debrief = confirmDispatch('color-switch', { 0: 'X', 1: 'X' });
    const m = getPublicMission(debrief.missionId);
    expect(resultType(debrief)).toBe('prediction-miss');
    const { container } = render(<WhyCompare codeId={m.code} circuit={m.circuit} mine={debrief} reducedMotion missionCopy={missionCopy(m.id, 'en')} />);
    expect(within(screen.getByTestId('why-alt')).getByRole('heading', { name: 'The other way · Crews where the fires really ended' })).toBeInTheDocument();
    expect(within(screen.getByTestId('why-mine')).getByText('→ Prediction missed — fires left on the wires')).toBeInTheDocument();
    expect(within(screen.getByTestId('why-alt')).getByText('→ Logical qubit safe')).toBeInTheDocument();
    expect(screen.getByTestId('why-explanation')).toHaveTextContent(missionCopy(m.id, 'en').whyShort);
    expect(screen.getByTestId('why-explanation')).not.toHaveTextContent('harmless pattern');
    for (let i = 0; i < 14; i++) fireEvent.click(screen.getByTestId('why-next'));
    // No beacon, no chain, no alarms on the wires; the leftover Y fire is a plain fire on house 1.
    expect(container.querySelector('.memory-tower')).toBeNull();
    expect(container.querySelector('.logical-chain')).toBeNull();
    expect(container.querySelectorAll('.detector')).toHaveLength(0);
    expect(within(screen.getByTestId('why-mine')).getByText((_, el) => el?.getAttribute('data-house') === '1' && el.getAttribute('data-house-state') === 'fire')).toBeInTheDocument();
  });

  it('live regions announce only the trucks, each impact and the outcome; the visible caption narrates everything', () => {
    const { debrief, timeline } = setup('twoKinds');
    const t = translator('en');
    const ctx = { district: 'Market Square', hasChecks: true };
    const at = (type: string, nth = 0) => {
      const e = timeline.events.filter((x) => x.type === type)[nth];
      if (e === undefined) throw new Error(type);
      return e;
    };
    expect(announcementAt(t, timeline, 0, ctx)).toBe('The trucks arrive at Market Square.');
    expect(captionAt(t, timeline, at('crew-run').t, ctx)).toMatch(/crew runs to house 1/);
    expect(announcementAt(t, timeline, at('crew-run').t, ctx)).toBe('The trucks arrive at Market Square.');
    expect(announcementAt(t, timeline, at('spray-start', 1).t, ctx)).toBe('The trucks arrive at Market Square.');
    expect(announcementAt(t, timeline, at('impact').t, ctx)).toBe('Splash! House 1: fire out.');
    expect(announcementAt(t, timeline, at('impact', 1).t, ctx)).toBe('Splash! House 6: a blue (Z) fire started. That house was not burning.');
    expect(announcementAt(t, timeline, at('alarms').t, ctx)).toBe('Splash! House 6: a blue (Z) fire started. That house was not burning.');
    expect(announcementAt(t, timeline, at('outcome').t, ctx)).toBe('Safe pattern');
    expect(announcementAt(t, timeline, timeline.durationMs, ctx)).toBe('Safe pattern');
    expect(captionAt(t, timeline, timeline.durationMs, ctx)).toBe('All crews reported in.');
    // Each impact caption holds for at least 400 ms before anything replaces it.
    const i1 = at('impact');
    for (let dt = 0; dt < 400; dt += 50) expect(captionAt(t, timeline, i1.t + dt, ctx)).toBe('Splash! House 1: fire out.');
    const i2 = at('impact', 1);
    for (let dt = 0; dt < 400; dt += 50) expect(captionAt(t, timeline, i2.t + dt, ctx)).toBe('Splash! House 6: a blue (Z) fire started. That house was not burning.');
    // The rendered player wires them up: the caption is not a live region, the announcer is.
    const m = getPublicMission(debrief.missionId);
    render(<SprayPlayer codeId={m.code} circuit={m.circuit} debrief={debrief} timeline={timeline} reducedMotion onDone={() => undefined} missionCopy={missionCopy(m.id, 'en')} />);
    expect(screen.getByTestId('spray-caption')).not.toHaveAttribute('aria-live');
    expect(screen.getByTestId('spray-announcer')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByTestId('spray-announcer')).toHaveTextContent('The trucks arrive at Market Square.');
  });
});
