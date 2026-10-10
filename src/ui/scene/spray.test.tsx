/**
 * SprayPlayer, frame model, ResultOverlay and WhyCompare tests. Every debrief is a real `confirmDispatch`
 * and every timeline a real `buildEffects`, so the pictures are checked against the engine, never against
 * numbers invented here.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { buildEffects, confirmDispatch, EFFECT_TIMING, getPublicMission, hasPrelude, resultType, type CrewLetter, type Debrief, type EffectEvent, type EffectTimeline } from '../../game';
import { fromString, letterAt, support, type Circuit } from '../../quantum';
import { missionCopy, translator } from '../i18n';
import { announcementAt, captionAt, captionForEvent, gateText } from './captions';
import { computeFrame, finalFrame, type LaneFrame } from './frame';
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

  it('propagation missions without the prelude (Why? comparison) start from the propagated true fire, not fog', () => {
    const d = confirmDispatch('red-forward-blue-backward', { 0: 'Y', 1: 'Y' });
    const tl = buildEffects(d, false, { propagation: false });
    expect(hasPrelude(tl)).toBe(false);
    const opts = frameOptionsFor(d, 2, 'propagation');
    const f = computeFrame(tl, 0, opts);
    expect(f.lanes).toBeNull();
    expect(f.houses).toEqual([
      { kind: 'fire', letter: 'Y' },
      { kind: 'fire', letter: 'Y' },
    ]);
    const end = finalFrame(tl, opts);
    expect(end.outcome).toBe('restored');
    expect(end.houses).toEqual([{ kind: 'restored' }, { kind: 'restored' }]);
  });
});

describe('computeFrame · propagation prelude (lane boards)', () => {
  const bridge = confirmDispatch('red-forward-blue-backward', { 0: 'Y', 1: 'Y' }); // XZ → CNOT → YY, both put out
  const lab = confirmDispatch('color-switch', { 0: 'X', 1: 'X' }); // ZI → H, CNOT, H → XZ; X on 1 misses (Y left)
  const lanesOf = (f: { readonly lanes: LaneFrame | null }): LaneFrame => {
    if (f.lanes === null) throw new Error('no lanes');
    return f.lanes;
  };
  const at = (tl: EffectTimeline, type: EffectEvent['type'], nth = 0): EffectEvent => {
    const e = tl.events.filter((x) => x.type === type)[nth];
    if (e === undefined) throw new Error(type);
    return e;
  };

  it('houses stay normal while the tokens travel; the final fires light the houses exactly when fires-arrive completes', () => {
    const tl = buildEffects(bridge, false);
    const opts = frameOptionsFor(bridge, 2, 'propagation', hasPrelude(tl));
    const arrive = at(tl, 'fires-arrive');
    const normal = [{ kind: 'normal' }, { kind: 'normal' }];
    expect(computeFrame(tl, 0, opts).houses).toEqual(normal);
    expect(computeFrame(tl, at(tl, 'gate').t + 10, opts).houses).toEqual(normal);
    expect(computeFrame(tl, arrive.t + arrive.dur - 1, opts).houses).toEqual(normal);
    const arrived = computeFrame(tl, arrive.t + arrive.dur, opts);
    expect(arrived.houses).toEqual([
      { kind: 'fire', letter: 'Y' },
      { kind: 'fire', letter: 'Y' },
    ]);
    expect(lanesOf(arrived)).toEqual({ cursor: 1, tokens: [], arrived: true });
    // No truck, crews or streams before the trucks arrive.
    const during = computeFrame(tl, arrive.t - 1, opts);
    expect(during.truck).toBeNull();
    expect(during.crews).toEqual([]);
    expect(during.streams).toEqual([]);
    expect(during.outcome).toBeNull();
  });

  it('tokens: start at the input, travel to the gate column and switch pattern at `travel`, then travel to the output; progress is monotonic', () => {
    const tl = buildEffects(bridge, false);
    const opts = frameOptionsFor(bridge, 2, 'propagation', true);
    const start = at(tl, 'fires-start');
    const gate = at(tl, 'gate');
    const arrive = at(tl, 'fires-arrive');
    if (gate.type !== 'gate') throw new Error('gate');
    // fires-start: the start fires XZ appear at the input (column -1).
    const f0 = lanesOf(computeFrame(tl, start.t + start.dur / 2, opts));
    expect(f0.cursor).toBe(-1);
    expect(f0.arrived).toBe(false);
    expect(f0.tokens.map((k) => [k.q, k.letter, k.from, k.to])).toEqual([
      [0, 'X', -1, -1],
      [1, 'Z', -1, -1],
    ]);
    expect(f0.tokens[0]?.progress).toBeCloseTo(0.5, 5);
    // gate, before travel: the tokens move from the input (-1) to the coupler (0) still as XZ.
    const travelling = lanesOf(computeFrame(tl, gate.t + gate.dur * gate.travel * 0.5, opts));
    expect(travelling.cursor).toBe(0);
    expect(travelling.tokens.map((k) => [k.q, k.letter, k.from, k.to])).toEqual([
      [0, 'X', -1, 0],
      [1, 'Z', -1, 0],
    ]);
    expect(travelling.tokens[0]?.progress).toBeCloseTo(0.5, 5);
    // gate, after travel: the pattern has switched to YY at the coupler.
    const switched = lanesOf(computeFrame(tl, gate.t + gate.dur * gate.travel, opts));
    expect(switched.tokens.map((k) => [k.q, k.letter, k.from, k.to, k.progress])).toEqual([
      [0, 'Y', 0, 0, 1],
      [1, 'Y', 0, 0, 1],
    ]);
    // fires-arrive: YY travels from the coupler (0) to the output (1 = steps).
    const arriving = lanesOf(computeFrame(tl, arrive.t + arrive.dur * 0.25, opts));
    expect(arriving.cursor).toBe(1);
    expect(arriving.tokens.map((k) => [k.q, k.letter, k.from, k.to])).toEqual([
      [0, 'Y', 0, 1],
      [1, 'Y', 0, 1],
    ]);
    expect(arriving.tokens[0]?.progress).toBeCloseTo(0.25, 5);
    // Monotonic: sampling every 10 ms through the prelude, (from, progress) never goes backwards.
    let last = -Infinity;
    for (let time = 0; time <= arrive.t + arrive.dur; time += 10) {
      const l = lanesOf(computeFrame(tl, time, opts));
      const tok = l.tokens[0];
      const pos = tok === undefined ? (l.arrived ? Infinity : last) : tok.from + tok.progress * (tok.to - tok.from);
      expect(pos).toBeGreaterThanOrEqual(last);
      last = pos;
      expect(l.tokens.every((k) => k.progress >= 0 && k.progress <= 1)).toBe(true);
    }
  });

  it('cursor sequence on the lab board: -1 (start) → 0 → 1 → 2 (gates) → 3 (arriving / arrived); gate patterns ZI → XI → XX → XZ', () => {
    const tl = buildEffects(lab, false);
    const opts = frameOptionsFor(lab, 2, 'propagation', true);
    const seq: number[] = [];
    const letters: string[] = [];
    for (let time = 0; time <= at(tl, 'trucks-arrive').t; time += 25) {
      const l = lanesOf(computeFrame(tl, time, opts));
      if (seq[seq.length - 1] !== l.cursor) seq.push(l.cursor);
      const pat = ['I', 'I'];
      l.tokens.forEach((k) => (pat[k.q] = k.letter));
      const str = pat.join('');
      if (letters[letters.length - 1] !== str) letters.push(str);
    }
    expect(seq).toEqual([-1, 0, 1, 2, 3]);
    // The pattern string seen on the tokens over time (II = tokens gone after arrival).
    expect(letters).toEqual(['ZI', 'XI', 'XX', 'XZ', 'II']);
    const arrived = computeFrame(tl, at(tl, 'trucks-arrive').t, opts);
    expect(arrived.houses).toEqual([
      { kind: 'fire', letter: 'X' },
      { kind: 'fire', letter: 'Z' },
    ]);
  });

  it('the final frame (skip / time ≥ duration) equals the no-prelude final frame: same houses, outcome, crews and residual', () => {
    for (const d of [bridge, lab, confirmDispatch('red-forward-blue-backward', {}), confirmDispatch('color-switch', { 0: 'Z', 1: 'Z' })]) {
      const withPrelude = buildEffects(d, false);
      const plain = buildEffects(d, false, { propagation: false });
      const a = finalFrame(withPrelude, frameOptionsFor(d, 2, 'propagation', true));
      const b = finalFrame(plain, frameOptionsFor(d, 2, 'propagation', false));
      expect(a.lanes).toEqual({ cursor: getPublicMission(d.missionId).circuit.length, tokens: [], arrived: true });
      expect(b.lanes).toBeNull();
      const strip = ({ lanes: _lanes, currentEvent: _c, ...rest }: typeof a) => rest;
      expect(strip(a)).toEqual(strip(b));
      expect(a.done).toBe(true);
      // Skip mid-prelude is the same final frame.
      expect(strip(computeFrame(withPrelude, withPrelude.durationMs, frameOptionsFor(d, 2, 'propagation', true)))).toEqual(strip(b));
    }
  });

  it('the stage preState is normal with a prelude and the propagated fire without one', () => {
    expect(frameOptionsFor(bridge, 2, 'propagation', true).preState(0)).toEqual({ kind: 'normal' });
    expect(frameOptionsFor(bridge, 2, 'propagation', false).preState(0)).toEqual({ kind: 'fire', letter: 'Y' });
    expect(frameOptionsFor(bridge, 2, 'propagation').preState(1)).toEqual({ kind: 'fire', letter: 'Y' });
    expect(frameOptionsFor(bridge, 2, 'dispatch', true).preState(0)).toEqual({ kind: 'fog' });
  });

  it('strict mode (reduced-motion stepper): step 0 = tokens at the input, step 1 = YY at the coupler, step 2 = fires in the houses, then trucks', () => {
    const tl = buildEffects(bridge, true);
    const opts = { ...frameOptionsFor(bridge, 2, 'propagation', true), strict: true };
    expect(tl.events.slice(0, 4).map((e) => e.type)).toEqual(['fires-start', 'gate', 'fires-arrive', 'trucks-arrive']);
    const s0 = computeFrame(tl, 1, opts);
    expect(s0.houses).toEqual([{ kind: 'normal' }, { kind: 'normal' }]);
    expect(lanesOf(s0)).toEqual({
      cursor: -1,
      arrived: false,
      tokens: [
        { q: 0, letter: 'X', from: -1, to: -1, progress: 1 },
        { q: 1, letter: 'Z', from: -1, to: -1, progress: 1 },
      ],
    });
    const s1 = computeFrame(tl, 2, opts);
    expect(s1.houses).toEqual([{ kind: 'normal' }, { kind: 'normal' }]);
    expect(lanesOf(s1)).toEqual({
      cursor: 0,
      arrived: false,
      tokens: [
        { q: 0, letter: 'Y', from: 0, to: 0, progress: 1 },
        { q: 1, letter: 'Y', from: 0, to: 0, progress: 1 },
      ],
    });
    const s2 = computeFrame(tl, 3, opts);
    expect(s2.houses).toEqual([
      { kind: 'fire', letter: 'Y' },
      { kind: 'fire', letter: 'Y' },
    ]);
    expect(lanesOf(s2)).toEqual({ cursor: 1, tokens: [], arrived: true });
    expect(s2.truck).toBeNull();
    const s3 = computeFrame(tl, 4, opts);
    expect(s3.truck).toEqual({ progress: 1, lights: false, wheelFrame: 0 });
    const last = computeFrame(tl, tl.events.length, opts);
    expect(last.done).toBe(true);
    expect(last.outcome).toBe('restored');
    expect(last.houses).toEqual([{ kind: 'restored' }, { kind: 'restored' }]);
  });

  it('is a pure function of the frame: no Math.random in the frame model', () => {
    const spy = vi.spyOn(Math, 'random');
    const tl = buildEffects(lab, false);
    const opts = frameOptionsFor(lab, 2, 'propagation', true);
    for (let time = 0; time <= tl.durationMs; time += 50) expect(computeFrame(tl, time, opts)).toEqual(computeFrame(tl, time, opts));
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('captions · propagation prelude', () => {
  const t = translator('en');
  const ja = translator('ja');
  const ctx = { district: 'Harbor Bridge', hasChecks: false };

  /** The instant a gate's tokens switch to `after` (the same threshold computeFrame uses). */
  const switchTime = (g: EffectEvent): number => (g.type === 'gate' ? g.t + g.dur * g.travel : -1);
  const endOf = (e: EffectEvent | undefined): number => (e === undefined ? -1 : e.t + e.dur);

  it('mission 2 (XZ through CNOT → YY): the start list names both fires with letters; the coupler caption names both directions once the tokens have switched', () => {
    const d = confirmDispatch('red-forward-blue-backward', { 0: 'Y', 1: 'Y' });
    const tl = buildEffects(d, false);
    const gate = tl.events.find((e) => e.type === 'gate');
    if (gate?.type !== 'gate') throw new Error('gate');
    const startLine = 'The fire starts here: red (X) fire on house 0 and blue (Z) fire on house 1.';
    const couplerLine = 'Through the coupler: the red (X) fire copies forward onto house 1 and the blue (Z) fire copies backward onto house 0.';
    const arriveLine = 'The fires reach the houses: red-and-blue (Y) fire on house 0 and red-and-blue (Y) fire on house 1.';
    expect(captionAt(t, tl, 0, ctx)).toBe(startLine);
    // While the tokens travel to the coupler they still read XZ, so the start line stays; the coupler line comes with the switch.
    expect(captionAt(t, tl, gate.t, ctx)).toBe(startLine);
    expect(captionAt(t, tl, switchTime(gate) - 1, ctx)).toBe(startLine);
    expect(captionAt(t, tl, switchTime(gate), ctx)).toBe(couplerLine);
    const arrive = tl.events.find((e) => e.type === 'fires-arrive');
    // Travelling to the houses (still plain): the coupler line holds; the arrival line comes when the houses light.
    expect(captionAt(t, tl, arrive?.t ?? -1, ctx)).toBe(couplerLine);
    expect(captionAt(t, tl, endOf(arrive) - 1, ctx)).toBe(couplerLine);
    expect(captionAt(t, tl, endOf(arrive), ctx)).toBe(arriveLine);
    // …and holds until the trucks (EFFECT_TIMING.arriveHold later).
    const trucks = tl.events.find((e) => e.type === 'trucks-arrive');
    expect(trucks?.t).toBe(endOf(arrive) + EFFECT_TIMING.arriveHold);
    expect(captionAt(t, tl, (trucks?.t ?? 0) - 1, ctx)).toBe(arriveLine);
    expect(captionAt(t, tl, trucks?.t ?? -1, ctx)).toBe('The trucks arrive at Harbor Bridge.');
    // Japanese says the same through the same letters.
    expect(captionAt(ja, tl, 0, ctx)).toBe('火はここから始まります：家 0 に 赤 (X) の火 と 家 1 に 青 (Z) の火。');
    expect(captionAt(ja, tl, switchTime(gate), ctx)).toContain('前へ家 1');
    expect(captionAt(ja, tl, switchTime(gate), ctx)).toContain('後ろへ家 0');
    // The live region announces the arrival when it happens (not the start, not the gate, not the travel), then the trucks as before.
    expect(announcementAt(t, tl, 0, ctx)).toBe('');
    expect(announcementAt(t, tl, switchTime(gate), ctx)).toBe('');
    expect(announcementAt(t, tl, arrive?.t ?? -1, ctx)).toBe('');
    expect(announcementAt(t, tl, endOf(arrive) - 1, ctx)).toBe('');
    expect(announcementAt(t, tl, endOf(arrive), ctx)).toBe(arriveLine);
    expect(announcementAt(t, tl, (trucks?.t ?? 0) - 1, ctx)).toBe(arriveLine);
    expect(announcementAt(t, tl, trucks?.t ?? -1, ctx)).toBe('The trucks arrive at Harbor Bridge.');
  });

  it('mission 3 (ZI through H, CNOT, H → XZ): the first mirror machine swaps, the coupler copies forward only, the last mirror machine swaps on house 1', () => {
    const d = confirmDispatch('color-switch', { 0: 'X', 1: 'Z' });
    const tl = buildEffects(d, false);
    const gates = tl.events.filter((e) => e.type === 'gate');
    const lines = [
      'The mirror machine on house 0 swaps red (X) and blue (Z).',
      'Through the coupler: the red (X) fire copies forward onto house 1.',
      'The mirror machine on house 1 swaps red (X) and blue (Z).',
    ];
    expect(gates.map((g) => captionForEvent(t, g, 1, ctx))).toEqual(lines);
    // Before the switch a gate adds no line (the previous one stays); from the switch on it speaks.
    expect(gates.map((g) => captionForEvent(t, g, 0, ctx))).toEqual([null, null, null]);
    expect(gates.map((g) => captionForEvent(t, g, (g.type === 'gate' ? g.travel : 1) - 0.01, ctx))).toEqual([null, null, null]);
    expect(gates.map((g) => captionForEvent(t, g, g.type === 'gate' ? g.travel : 1, ctx))).toEqual(lines);
    expect(gates.map((g) => captionAt(t, tl, switchTime(g), ctx))).toEqual(lines);
    expect(gates.map((g) => captionAt(t, tl, g.t, ctx))).toEqual(['The fire starts here: blue (Z) fire on house 0.', lines[0], lines[1]]);
    expect(captionAt(t, tl, 0, ctx)).toBe('The fire starts here: blue (Z) fire on house 0.');
    const arrive = tl.events.find((e) => e.type === 'fires-arrive');
    expect(captionAt(t, tl, arrive?.t ?? -1, ctx)).toBe(lines[2]);
    expect(captionAt(t, tl, endOf(arrive), ctx)).toBe('The fires reach the houses: red (X) fire on house 0 and blue (Z) fire on house 1.');
  });

  it('the narration never leads the picture: on every lane board the caption and the live region describe exactly what computeFrame shows at the same time', () => {
    // Sampled every 5 ms through the prelude (plus the exact thresholds): the gate line is shown iff the tokens carry
    // that gate's `after`; the arrival line (and its announcement) iff the houses are lit; the trucks' line only from
    // their own start. This is the regression test for "captions lead the picture by up to 412 / 450 ms".
    for (const d of [confirmDispatch('red-forward-blue-backward', { 0: 'Y', 1: 'Y' }), confirmDispatch('color-switch', { 0: 'X', 1: 'Z' }), confirmDispatch('color-switch', {})]) {
      const tl = buildEffects(d, false);
      const opts = frameOptionsFor(d, 2, 'propagation', true);
      const districtCtx = { district: d.missionId === 'color-switch' ? 'Conversion Lab' : 'Harbor Bridge', hasChecks: false };
      const gates = tl.events.filter((e): e is Extract<EffectEvent, { type: 'gate' }> => e.type === 'gate');
      const arrive = tl.events.find((e) => e.type === 'fires-arrive');
      const trucks = tl.events.find((e) => e.type === 'trucks-arrive');
      if (arrive?.type !== 'fires-arrive' || trucks === undefined) throw new Error('prelude');
      const arriveLine = captionForEvent(t, arrive, 1, districtCtx);
      const startLine = captionAt(t, tl, 0, districtCtx);
      expect(startLine).toMatch(/^The fire starts here/);
      const times = new Set<number>();
      for (let time = 0; time <= trucks.t; time += 5) times.add(time);
      gates.forEach((g) => times.add(switchTime(g)));
      times.add(endOf(arrive));
      times.add(trucks.t);
      for (const time of [...times].sort((a, b) => a - b)) {
        const frame = computeFrame(tl, time, opts);
        const lanes = frame.lanes;
        if (lanes === null) throw new Error('lanes');
        const caption = captionAt(t, tl, time, districtCtx);
        const announcement = announcementAt(t, tl, time, districtCtx);
        const shown = ['I', 'I'];
        lanes.tokens.forEach((k) => (shown[k.q] = k.letter));
        if (time >= trucks.t) {
          expect(caption, `t=${String(time)}`).toBe(`The trucks arrive at ${districtCtx.district}.`);
          continue;
        }
        if (lanes.arrived) {
          // Houses lit ⇔ the arrival line, in both channels.
          expect(frame.houses.some((h) => h.kind === 'fire') || d.fires === 'II', `t=${String(time)}`).toBe(true);
          expect(caption, `t=${String(time)}`).toBe(arriveLine);
          expect(announcement, `t=${String(time)}`).toBe(arriveLine);
          continue;
        }
        expect(frame.houses.every((h) => h.kind === 'normal'), `t=${String(time)}`).toBe(true);
        expect(announcement, `t=${String(time)}`).toBe('');
        // The tokens carry some gate's `after` (that gate's line) or still the start pattern (the start line).
        const switched = gates.filter((g) => time >= switchTime(g));
        const current = switched[switched.length - 1];
        if (current === undefined) {
          expect(shown.join(''), `t=${String(time)}`).toBe(d.startFires);
          expect(caption, `t=${String(time)}`).toBe(startLine);
        } else {
          expect(shown.join(''), `t=${String(time)}`).toBe(current.after);
          expect(caption, `t=${String(time)}`).toBe(gateText(t, current));
        }
      }
    }
  });

  it('other rules: blue-only through a coupler copies backward; nothing to copy; S adds / drops the blue part; CZ and SWAP use the generic line', () => {
    const base = confirmDispatch('red-forward-blue-backward', { 0: 'Y', 1: 'Y' });
    const synthetic = (startFires: string, fires: string, circuit: Circuit) =>
      buildEffects({ ...base, missionId: 'synthetic', startFires, fires, crews: 'II', residual: fires }, false, { circuit }).events.filter((e) => e.type === 'gate');
    expect(synthetic('IZ', 'ZZ', [{ kind: 'CNOT', c: 0, t: 1 }]).map((g) => captionForEvent(t, g, 1, ctx))).toEqual(['Through the coupler: the blue (Z) fire copies backward onto house 0.']);
    expect(synthetic('ZI', 'ZI', [{ kind: 'CNOT', c: 0, t: 1 }]).map((g) => captionForEvent(t, g, 1, ctx))).toEqual(['Through the coupler: nothing to copy, the fires pass unchanged.']);
    expect(synthetic('XI', 'YI', [{ kind: 'S', q: 0 }]).map((g) => captionForEvent(t, g, 1, ctx))).toEqual(['The dial on house 0: the red (X) fire picks up a blue (Z) part.']);
    expect(synthetic('YI', 'XI', [{ kind: 'S', q: 0 }]).map((g) => captionForEvent(t, g, 1, ctx))).toEqual(['The dial on house 0: the red-and-blue (Y) fire drops its blue (Z) part.']);
    expect(synthetic('ZI', 'ZI', [{ kind: 'S', q: 0 }]).map((g) => captionForEvent(t, g, 1, ctx))).toEqual(['The dial on house 0: nothing changes here.']);
    expect(synthetic('YI', 'YI', [{ kind: 'H', q: 0 }]).map((g) => captionForEvent(t, g, 1, ctx))).toEqual(['The mirror machine on house 0: nothing changes here.']);
    expect(synthetic('XI', 'XZ', [{ kind: 'CZ', a: 0, b: 1 }]).map((g) => captionForEvent(t, g, 1, ctx))).toEqual(['CZ between houses 0 and 1: XI becomes XZ.']);
    expect(synthetic('ZI', 'ZI', [{ kind: 'CZ', a: 0, b: 1 }]).map((g) => captionForEvent(t, g, 1, ctx))).toEqual(['CZ between houses 0 and 1: the fire pattern ZI is unchanged.']);
    expect(synthetic('XI', 'IX', [{ kind: 'SWAP', a: 0, b: 1 }]).map((g) => captionForEvent(t, g, 1, ctx))).toEqual(['SWAP of houses 0 and 1: XI becomes IX.']);
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

  it('Harbor Bridge: the prelude plays before the trucks — tokens travel (lane-token), houses stay normal, then light up; Skip jumps to the final frame', () => {
    const onDone = vi.fn();
    const debrief = confirmDispatch('red-forward-blue-backward', { 0: 'Y', 1: 'Y' });
    const timeline = buildEffects(debrief, false);
    const m = getPublicMission(debrief.missionId);
    const { container } = render(<SprayPlayer codeId={m.code} circuit={m.circuit} debrief={debrief} timeline={timeline} reducedMotion={false} onDone={onDone} missionCopy={missionCopy(m.id, 'en')} />);
    const state = (q: number) => container.querySelector(`[data-house="${String(q)}"]`)?.getAttribute('data-house-state');
    const tokens = () => Array.from(container.querySelectorAll('[data-testid="lane-token"]'));
    expect(screen.getByRole('heading', { name: 'Training replay: answer check' })).toBeInTheDocument();
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('The fire starts here: red (X) fire on house 0 and blue (Z) fire on house 1.');
    expect(tokens().map((k) => [k.getAttribute('data-lane-q'), k.getAttribute('data-letter')])).toEqual([
      ['0', 'X'],
      ['1', 'Z'],
    ]);
    expect(state(0)).toBe('normal');
    expect(state(1)).toBe('normal');
    expect(container.querySelector('.truck')).toBeNull();
    expect(container.querySelector('.time-cursor')).not.toBeNull();
    const gate = timeline.events.find((e) => e.type === 'gate');
    if (gate?.type !== 'gate') throw new Error('gate');
    tick(gate.t + gate.dur * gate.travel + 10);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('Through the coupler: the red (X) fire copies forward onto house 1 and the blue (Z) fire copies backward onto house 0.');
    expect(container.querySelector('.gate.is-active')).not.toBeNull();
    expect(tokens().map((k) => k.getAttribute('data-letter'))).toEqual(['Y', 'Y']);
    expect(state(0)).toBe('normal');
    const arrive = timeline.events.find((e) => e.type === 'fires-arrive');
    if (arrive?.type !== 'fires-arrive') throw new Error('arrive');
    // Arriving: YY travels to the houses (still plain), every gate done. The caption keeps the coupler line and the
    // live region stays silent: the arrival is only narrated once the houses light (the narration never leads the picture).
    tick(arrive.t + 30 - (gate.t + gate.dur * gate.travel + 10));
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('Through the coupler: the red (X) fire copies forward onto house 1 and the blue (Z) fire copies backward onto house 0.');
    expect(screen.getByTestId('spray-announcer').textContent).toBe('');
    expect(tokens().map((k) => k.getAttribute('data-letter'))).toEqual(['Y', 'Y']);
    expect(container.querySelectorAll('.gate.is-done')).toHaveLength(1);
    expect(container.querySelector('.gate.is-active')).toBeNull();
    expect(state(0)).toBe('normal');
    // Arrived: the tokens are gone, the houses carry the final fires, both channels say so — and the trucks wait (arriveHold).
    tick(arrive.dur - 30 + 20); // (+20: the rAF clock samples every 16 ms)
    expect(tokens()).toHaveLength(0);
    expect(container.querySelector('.time-cursor')).toBeNull();
    expect(state(0)).toBe('fire');
    expect(state(1)).toBe('fire');
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('The fires reach the houses: red-and-blue (Y) fire on house 0 and red-and-blue (Y) fire on house 1.');
    expect(screen.getByTestId('spray-announcer')).toHaveTextContent('The fires reach the houses: red-and-blue (Y) fire on house 0 and red-and-blue (Y) fire on house 1.');
    expect(container.querySelector('.truck')).toBeNull();
    // Then the usual spray: trucks (after the hold), crews, splash, outcome.
    const trucks = timeline.events.find((e) => e.type === 'trucks-arrive');
    expect(trucks?.t).toBe(arrive.t + arrive.dur + EFFECT_TIMING.arriveHold);
    tick(EFFECT_TIMING.arriveHold);
    expect(screen.getByTestId('spray-caption')).toHaveTextContent('The trucks arrive at Harbor Bridge.');
    expect(screen.getByTestId('spray-announcer')).toHaveTextContent('The trucks arrive at Harbor Bridge.');
    expect(container.querySelector('.truck')).not.toBeNull();
    tick(timeline.durationMs);
    expect(state(0)).toBe('restored');
    expect(state(1)).toBe('restored');
    expect(onDone).toHaveBeenCalledTimes(1);
    // Skip during the prelude: straight to the final frame.
    const onDone2 = vi.fn();
    const second = render(<SprayPlayer codeId={m.code} circuit={m.circuit} debrief={debrief} timeline={timeline} reducedMotion={false} onDone={onDone2} missionCopy={missionCopy(m.id, 'en')} />);
    tick(100);
    expect(second.container.querySelectorAll('[data-testid="lane-token"]')).toHaveLength(2);
    fireEvent.click(within(second.container).getByTestId('spray-skip'));
    expect(second.container.querySelectorAll('[data-testid="lane-token"]')).toHaveLength(0);
    expect(second.container.querySelector('[data-house="0"]')?.getAttribute('data-house-state')).toBe('restored');
    expect(onDone2).toHaveBeenCalledTimes(1);
  });

  it('Harbor Bridge under reduced motion: the stepper gains the prelude frames (start → gate → arrive → trucks …)', () => {
    const onDone = vi.fn();
    const debrief = confirmDispatch('red-forward-blue-backward', { 0: 'Y', 1: 'Y' });
    const timeline = buildEffects(debrief, true);
    const plain = buildEffects(debrief, true, { propagation: false });
    expect(timeline.events).toHaveLength(plain.events.length + 3);
    const m = getPublicMission(debrief.missionId);
    const { container } = render(<SprayPlayer codeId={m.code} circuit={m.circuit} debrief={debrief} timeline={timeline} reducedMotion onDone={onDone} missionCopy={missionCopy(m.id, 'en')} />);
    const state = (q: number) => container.querySelector(`[data-house="${String(q)}"]`)?.getAttribute('data-house-state');
    const tokens = () => Array.from(container.querySelectorAll('[data-testid="lane-token"]')).map((k) => k.getAttribute('data-letter'));
    expect(screen.getByTestId('spray-step')).toHaveTextContent(`Frame 1 of ${String(timeline.events.length)}`);
    expect(tokens()).toEqual(['X', 'Z']);
    expect(state(0)).toBe('normal');
    fireEvent.click(screen.getByTestId('spray-next')); // gate complete: YY at the coupler
    expect(tokens()).toEqual(['Y', 'Y']);
    expect(container.querySelector('.gate.is-active')).not.toBeNull();
    expect(state(0)).toBe('normal');
    fireEvent.click(screen.getByTestId('spray-next')); // arrived
    expect(tokens()).toEqual([]);
    expect(state(0)).toBe('fire');
    expect(state(1)).toBe('fire');
    expect(container.querySelector('.truck')).toBeNull();
    fireEvent.click(screen.getByTestId('spray-next')); // trucks
    expect(container.querySelector('.truck')).not.toBeNull();
    fireEvent.click(screen.getByTestId('spray-prev'));
    fireEvent.click(screen.getByTestId('spray-prev'));
    expect(tokens()).toEqual(['Y', 'Y']);
    expect(state(0)).toBe('normal');
    for (let i = 0; i < timeline.events.length; i++) fireEvent.click(screen.getByTestId('spray-next'));
    expect(state(0)).toBe('restored');
    expect(onDone).toHaveBeenCalledTimes(1);
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
    // The comparison is about the sprays: no propagation prelude, both panels start with the fires in the houses.
    expect(container.querySelectorAll('[data-testid="lane-token"]')).toHaveLength(0);
    expect(screen.getByTestId('why-mine').querySelector('[data-house="0"]')?.getAttribute('data-house-state')).toBe('fire');
    expect(screen.getByTestId('why-alt').querySelector('[data-house="0"]')?.getAttribute('data-house-state')).toBe('fire');
    expect(screen.getByTestId('why-mine').querySelector('.why-caption')).toHaveTextContent('The trucks arrive at Conversion Lab.');
    expect(screen.getByTestId('why-mine').querySelector('.spray-step-label, .why-compare .spray-step-label')).toBeNull();
    expect(screen.getByText(`Frame 1 of ${String(buildEffects(debrief, true, { propagation: false }).events.length)}`)).toBeInTheDocument();
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
