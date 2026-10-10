import { afterEach, describe, expect, it, vi } from 'vitest';
import { fromString, getCode, getMission, letterAt, propagate, support, syndrome, syndromeToArray, toString, weight, type Circuit } from '../quantum';
import { buildEffects, CAPTION_HOLD, EFFECT_TIMING, GATE_TRAVEL, hasPrelude, houseOutcome, logicalPatternSupport, PRELUDE_EVENTS, remainingAlarms, resultType, xorLetters, type EffectEvent } from './effects';
import { confirmDispatch } from './machine';
import { getPublicMission, listPublicMissions } from './missions';
import type { CrewLetter, Debrief } from './types';

function placementsOf(s: string): Record<number, CrewLetter> {
  const p = fromString(s);
  const out: Record<number, CrewLetter> = {};
  for (let q = 0; q < p.n; q++) {
    const l = letterAt(p, q);
    if (l !== 'I') out[q] = l;
  }
  return out;
}

/** One wrong single crew per mission: a block that is not burning (or the wrong colour on block 0). */
function wrongDispatch(id: string): Record<number, CrewLetter> {
  const m = listPublicMissions().find((x) => x.id === id);
  const def = getMission(id);
  if (m === undefined) throw new Error(id);
  const fire = fromString(def.expected.propagated);
  for (let q = 0; q < fire.n; q++) if (letterAt(fire, q) === 'I') return { [q]: m.allowed[0] ?? 'X' };
  const other = m.allowed.find((l) => l !== letterAt(fire, 0)) ?? 'X';
  return { 0: other };
}

function types(events: readonly EffectEvent[]): string[] {
  return events.map((e) => e.type);
}

/** Structural checks every timeline must satisfy, whatever the dispatch. */
function checkTimeline(debrief: Debrief, reduced: boolean): void {
  const tl = buildEffects(debrief, reduced);
  const ev = tl.events;
  const fires = fromString(debrief.fires);
  const crews = fromString(debrief.crews);
  const residual = fromString(debrief.residual);
  const circuit = getPublicMission(debrief.missionId).circuit;
  // Shape: [prelude: fires-start, one gate per circuit gate, fires-arrive] → trucks → …, done last, one
  // run/spray/impact triple per crew in ascending house order. The prelude exists iff the circuit is non-empty.
  expect(hasPrelude(tl)).toBe(circuit.length > 0);
  const preludeTypes = circuit.length > 0 ? ['fires-start', ...circuit.map(() => 'gate'), 'fires-arrive'] : [];
  expect(types(ev).slice(0, preludeTypes.length + 1)).toEqual([...preludeTypes, 'trucks-arrive']);
  expect(ev.filter((e) => PRELUDE_EVENTS.has(e.type))).toHaveLength(preludeTypes.length);
  expect(ev[0]?.t).toBe(0);
  expect(ev[ev.length - 1]?.type).toBe('done');
  const trucks = ev.find((e) => e.type === 'trucks-arrive');
  if (circuit.length > 0) {
    // Prelude payloads come from the engine: every gate's before/after are consecutive propagate() frames.
    const traj = propagate(fromString(debrief.startFires), circuit);
    const gates = ev.filter((e): e is Extract<EffectEvent, { type: 'gate' }> => e.type === 'gate');
    gates.forEach((g, i) => {
      expect(g.index).toBe(i);
      expect(g.gate).toEqual(circuit[i]);
      expect(g.before).toBe(toString(traj.frames[i] ?? fromString(debrief.startFires)));
      expect(g.after).toBe(toString(traj.frames[i + 1] ?? fromString(debrief.startFires)));
      expect(g.changed).toBe(g.before !== g.after);
      expect(g.travel).toBe(GATE_TRAVEL);
    });
    const start = ev[0];
    expect(start?.type === 'fires-start' ? start.fires : null).toBe(debrief.startFires);
    const arrive = ev.find((e) => e.type === 'fires-arrive');
    expect(arrive?.type === 'fires-arrive' ? arrive.fires : null).toBe(debrief.fires);
    // The trucks arrive exactly when the prelude ends: after the arrival and its hold (the arrival line stays readable).
    if (!reduced) expect(trucks?.t).toBe(EFFECT_TIMING.firesStart + circuit.length * EFFECT_TIMING.gate + EFFECT_TIMING.arrive + EFFECT_TIMING.arriveHold);
  } else if (!reduced) {
    expect(trucks?.t).toBe(0);
  }
  const crewQs = support(crews);
  const runs = ev.filter((e) => e.type === 'crew-run');
  const sprays = ev.filter((e) => e.type === 'spray-start');
  const impacts = ev.filter((e): e is Extract<EffectEvent, { type: 'impact' }> => e.type === 'impact');
  expect(runs.map((e) => (e.type === 'crew-run' ? e.q : -1))).toEqual(crewQs);
  expect(sprays.map((e) => (e.type === 'spray-start' ? e.q : -1))).toEqual(crewQs);
  expect(impacts.map((e) => e.q)).toEqual(crewQs);
  // Each impact is exactly one discrete Pauli correction: after = before ⊕ crew = engine residual at q.
  for (const im of impacts) {
    expect(im.crew).toBe(letterAt(crews, im.q));
    expect(im.before).toBe(letterAt(fires, im.q));
    expect(im.after).toBe(letterAt(residual, im.q));
    expect(xorLetters(im.before, im.crew)).toBe(im.after);
    if (im.after === 'I') expect(im.effect).toBe('extinguished');
    else if (im.before === 'I') expect(im.effect).toBe('ignited');
    else expect(im.effect).toBe('changed');
  }
  // The fires nobody sprayed, the residual's alarms and the engine's result type.
  const reveal = ev.find((e) => e.type === 'reveal-remaining');
  expect(reveal?.type === 'reveal-remaining' ? reveal.qs : null).toEqual(support(residual).filter((q) => letterAt(crews, q) === 'I'));
  const alarms = ev.find((e) => e.type === 'alarms');
  expect(alarms?.type === 'alarms' ? alarms.syndrome : null).toEqual(debrief.syndromeOfResidual);
  const outcome = ev.find((e) => e.type === 'outcome');
  expect(outcome?.type === 'outcome' ? outcome.result : null).toBe(resultType(debrief));
  // Order of the tail and monotone times.
  const tail = types(ev).slice(-4);
  expect(tail).toEqual(['reveal-remaining', 'alarms', 'outcome', 'done']);
  for (let i = 1; i < ev.length; i++) expect((ev[i]?.t ?? 0) >= (ev[i - 1]?.t ?? 0)).toBe(true);
  if (reduced) {
    ev.forEach((e, i) => expect(e.t).toBe(i));
    expect(tl.durationMs).toBe(ev.length);
  } else {
    expect(tl.durationMs).toBe(ev[ev.length - 1]?.t);
    expect(tl.durationMs).toBeGreaterThan(0);
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('xorLetters', () => {
  it('is the Pauli product without phase (XOR of symplectic bits)', () => {
    expect(xorLetters('X', 'X')).toBe('I');
    expect(xorLetters('Z', 'Z')).toBe('I');
    expect(xorLetters('Y', 'Y')).toBe('I');
    expect(xorLetters('X', 'Z')).toBe('Y');
    expect(xorLetters('Z', 'X')).toBe('Y');
    expect(xorLetters('X', 'Y')).toBe('Z');
    expect(xorLetters('Y', 'Z')).toBe('X');
    expect(xorLetters('I', 'X')).toBe('X');
    expect(xorLetters('Z', 'I')).toBe('Z');
  });
});

describe('resultType — the four readable results (verdict by stabilizer membership, never alarms)', () => {
  it('blind-dispatch X on 4 → restored (residual I)', () => {
    const d = confirmDispatch('blind-dispatch', { 4: 'X' });
    expect(d.verdict).toBe('success');
    expect(d.residual).toBe('IIIIIIIII');
    expect(resultType(d)).toBe('restored');
    for (let q = 0; q < 9; q++) {
      const h = houseOutcome(d, q);
      if (q === 4) expect(h).toEqual({ kind: 'sprayed', crew: 'X', before: 'X', after: 'I', effect: 'extinguished' });
      else expect(h).toEqual({ kind: 'quiet' });
    }
    expect(remainingAlarms(d)).toEqual([]);
    expect(logicalPatternSupport(d)).toEqual([]);
  });

  it('blind-dispatch X on 0 → still-burning (new fire lit on 0, true fire on 4 remains, Z1 rings)', () => {
    const d = confirmDispatch('blind-dispatch', { 0: 'X' });
    expect(d.verdict).toBe('detectable');
    expect(resultType(d)).toBe('still-burning');
    expect(d.residual).toBe('XIIIXIIII');
    expect(houseOutcome(d, 0)).toEqual({ kind: 'sprayed', crew: 'X', before: 'I', after: 'X', effect: 'ignited' });
    expect(houseOutcome(d, 4)).toEqual({ kind: 'burning', before: 'X', after: 'X' });
    // Residual X0·X4: Z0 sees both (even → quiet), Z1 sees only 4 → rings.
    expect(remainingAlarms(d).map((a) => a.id)).toEqual(['Z1']);
    expect(remainingAlarms(d)[0]).toEqual({ index: 1, id: 'Z1', type: 'Z', qubits: [4, 5, 7, 8] });
    const tl = buildEffects(d, false);
    const reveal = tl.events.find((e) => e.type === 'reveal-remaining');
    expect(reveal?.type === 'reveal-remaining' ? reveal.qs : null).toEqual([4]);
  });

  it('two-kinds-of-trouble X on 1 + Z on 6 → safe-pattern: residual Z6Z7 is the stabilizer Z3 (weight 2, no alarms)', () => {
    const d = confirmDispatch('two-kinds-of-trouble', { 1: 'X', 6: 'Z' });
    expect(d.verdict).toBe('success');
    expect(d.residual).toBe('IIIIIIZZI');
    expect(weight(fromString(d.residual))).toBe(2);
    expect(resultType(d)).toBe('safe-pattern');
    // Verified against the engine: the residual is exactly the Z3 check of rsc3 and rings nothing.
    const code = getCode('rsc3');
    const z3 = code.checks.find((c) => c.id === 'Z3');
    expect(z3?.qubits).toEqual([6, 7]);
    expect(syndromeToArray(syndrome(code, fromString(d.residual)))).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(d.syndromeOfResidual).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(houseOutcome(d, 1)).toEqual({ kind: 'sprayed', crew: 'X', before: 'X', after: 'I', effect: 'extinguished' });
    expect(houseOutcome(d, 6)).toEqual({ kind: 'sprayed', crew: 'Z', before: 'I', after: 'Z', effect: 'ignited' });
    expect(houseOutcome(d, 7)).toEqual({ kind: 'burning', before: 'Z', after: 'Z' });
    expect(logicalPatternSupport(d)).toEqual([6, 7]);
    expect(remainingAlarms(d)).toEqual([]);
  });

  it('silent-failure X on 0 → logical-failure: alarms quiet, residual XXX on the top row (logical X)', () => {
    const d = confirmDispatch('silent-failure', { 0: 'X' });
    expect(d.verdict).toBe('logical-error');
    expect(resultType(d)).toBe('logical-failure');
    expect(d.residual).toBe('XXXIIIIII');
    expect(d.syndromeOfResidual).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(remainingAlarms(d)).toEqual([]);
    expect(logicalPatternSupport(d)).toEqual([0, 1, 2]);
    expect(d.logicalFlip).toEqual({ x: [true], z: [false] });
    expect(houseOutcome(d, 0)).toEqual({ kind: 'sprayed', crew: 'X', before: 'I', after: 'X', effect: 'ignited' });
    expect(houseOutcome(d, 1)).toEqual({ kind: 'burning', before: 'X', after: 'X' });
  });

  it('changed: a crew of a different letter changes the component instead of doing nothing (X on Z → Y)', () => {
    const d = confirmDispatch('two-kinds-of-trouble', { 1: 'X', 7: 'X' });
    expect(houseOutcome(d, 7)).toEqual({ kind: 'sprayed', crew: 'X', before: 'Z', after: 'Y', effect: 'changed' });
    expect(resultType(d)).toBe('still-burning');
    const im = buildEffects(d, false).events.find((e) => e.type === 'impact' && e.q === 7);
    expect(im?.type === 'impact' ? im.effect : null).toBe('changed');
  });

  it('propagation (wires) missions: before is the PROPAGATED fire, not the starting fire', () => {
    const d = confirmDispatch('color-switch', { 0: 'X', 1: 'X' }); // ZI → XZ through H, CNOT, H
    expect(d.startFires).toBe('ZI');
    expect(d.fires).toBe('XZ');
    expect(houseOutcome(d, 0)).toEqual({ kind: 'sprayed', crew: 'X', before: 'X', after: 'I', effect: 'extinguished' });
    expect(houseOutcome(d, 1)).toEqual({ kind: 'sprayed', crew: 'X', before: 'Z', after: 'Y', effect: 'changed' });
    expect(resultType(d)).toBe('prediction-miss'); // bare wires: any leftover acts on the data, with no alarms and no beacon
    const impacts = buildEffects(d, false).events.filter((e) => e.type === 'impact');
    expect(impacts.map((e) => (e.type === 'impact' ? e.before : null))).toEqual(['X', 'Z']);
    // spray-start carries the true fire the crew meets, so the frame can lift the fog as the stream starts
    const sprays = buildEffects(d, false).events.filter((e) => e.type === 'spray-start');
    expect(sprays.map((e) => (e.type === 'spray-start' ? e.before : null))).toEqual(['X', 'Z']);
  });

  it("prediction-miss: a miss on bare wires (bridge / lab) is never a 'logical-failure'; the code is looked up by mission id, never from alarms", () => {
    const bridge = confirmDispatch('red-forward-blue-backward', { 0: 'X', 1: 'Y' }); // true YY → residual ZI
    expect(bridge.verdict).toBe('logical-error');
    expect(bridge.residual).toBe('ZI');
    expect(resultType(bridge)).toBe('prediction-miss');
    expect(remainingAlarms(bridge)).toEqual([]);
    const lab = confirmDispatch('color-switch', { 0: 'Z', 1: 'Z' }); // true XZ → residual YI
    expect(resultType(lab)).toBe('prediction-miss');
    const standDown = confirmDispatch('red-forward-blue-backward', {});
    expect(resultType(standDown)).toBe('prediction-miss');
    // The outcome event carries the same classification.
    const outcome = buildEffects(bridge, false).events.find((e) => e.type === 'outcome');
    expect(outcome?.type === 'outcome' ? outcome.result : null).toBe('prediction-miss');
    // Bare-wire successes keep their surface-code names; grid misses keep theirs.
    expect(resultType(confirmDispatch('red-forward-blue-backward', { 0: 'Y', 1: 'Y' }))).toBe('restored');
    expect(resultType(confirmDispatch('silent-failure', { 0: 'X' }))).toBe('logical-failure');
    expect(resultType(confirmDispatch('blind-dispatch', { 0: 'X' }))).toBe('still-burning');
    // A debrief whose mission id is unknown is treated as a code with checks (the four surface-code types).
    expect(resultType({ missionId: 'no-such-mission', verdict: 'logical-error', residual: 'XX' })).toBe('logical-failure');
  });

  it('houseOutcome / buildEffects throw if a debrief ever disagreed with before ⊕ crew', () => {
    const d = confirmDispatch('first-alarm', { 1: 'X' });
    const forged: Debrief = { ...d, residual: 'IXI' }; // claims the fire survived its own crew
    expect(() => houseOutcome(forged, 1)).toThrow(/residual at house 1/);
    expect(() => buildEffects(forged, false)).toThrow(/residual at house 1/);
    expect(() => buildEffects({ ...d, residual: 'IIII' }, false)).toThrow(/qubit count/);
  });
});

describe('buildEffects timeline', () => {
  it('timing: trucks, staggered runs, spray after the run, impact after the spray; the tail starts `hold` after the last impact', () => {
    const d = confirmDispatch('two-kinds-of-trouble', { 1: 'X', 6: 'Z' });
    const tl = buildEffects(d, false);
    const T = EFFECT_TIMING;
    const byType = (type: EffectEvent['type']) => tl.events.filter((e) => e.type === type);
    expect(tl.events[0]).toEqual({ type: 'trucks-arrive', t: 0, dur: T.trucks });
    const runs = byType('crew-run');
    expect(runs.map((e) => e.t)).toEqual([T.trucks, T.trucks + T.stagger]);
    expect(runs.every((e) => e.dur === T.run)).toBe(true);
    const sprays = byType('spray-start');
    expect(sprays.map((e) => e.t)).toEqual([T.trucks + T.sprayAfterRun, T.trucks + T.stagger + T.sprayAfterRun]);
    const impacts = byType('impact');
    const lastImpact = T.trucks + T.stagger + T.sprayAfterRun + T.spray;
    expect(impacts.map((e) => e.t)).toEqual([T.trucks + T.sprayAfterRun + T.spray, lastImpact]);
    expect(impacts.every((e) => e.dur === T.impact)).toBe(true);
    const reveal = byType('reveal-remaining')[0];
    expect(reveal?.t).toBe(lastImpact + T.hold);
    expect(byType('alarms')[0]?.t).toBe(lastImpact + T.hold + T.reveal);
    expect(byType('outcome')[0]?.t).toBe(lastImpact + T.hold + T.reveal + T.alarms);
    expect(byType('done')[0]?.t).toBe(lastImpact + T.hold + T.reveal + T.alarms + T.outcome);
    expect(tl.durationMs).toBe(byType('done')[0]?.t);
    // Two crews play in ≤ 3 s; one crew well under.
    expect(tl.durationMs).toBeLessThanOrEqual(3000);
    expect(buildEffects(confirmDispatch('blind-dispatch', { 4: 'X' }), false).durationMs).toBeLessThanOrEqual(2700);
    // Every impact caption holds ≥ CAPTION_HOLD: impacts are spaced by `stagger` and the tail waits `hold` after the last one.
    expect(T.stagger).toBeGreaterThanOrEqual(CAPTION_HOLD);
    expect(T.hold).toBeGreaterThanOrEqual(CAPTION_HOLD);
    const im = impacts.map((e) => e.t);
    for (let i = 1; i < im.length; i++) expect((im[i] ?? 0) - (im[i - 1] ?? 0)).toBeGreaterThanOrEqual(CAPTION_HOLD);
    expect((reveal?.t ?? 0) - (im[im.length - 1] ?? 0)).toBeGreaterThanOrEqual(CAPTION_HOLD);
    // Chronological order: the second crew starts running after the first crew's stream is on, before its impact.
    expect(types(tl.events)).toEqual([
      'trucks-arrive',
      'crew-run',
      'spray-start',
      'crew-run',
      'spray-start',
      'impact',
      'impact',
      'reveal-remaining',
      'alarms',
      'outcome',
      'done',
    ]);
  });

  it('stand down (no crews): trucks, then the unsprayed fires are revealed, alarms, outcome, done', () => {
    const d = confirmDispatch('first-alarm', {});
    const tl = buildEffects(d, false);
    expect(types(tl.events)).toEqual(['trucks-arrive', 'reveal-remaining', 'alarms', 'outcome', 'done']);
    const reveal = tl.events[1];
    expect(reveal?.type === 'reveal-remaining' ? reveal.qs : null).toEqual([1]);
    expect(reveal?.t).toBe(EFFECT_TIMING.trucks);
    const outcome = tl.events[3];
    expect(outcome?.type === 'outcome' ? outcome.result : null).toBe('still-burning');
  });

  it('reduced motion: the same events as frames (t = index), one frame per event', () => {
    const d = confirmDispatch('blind-dispatch', { 4: 'X' });
    const full = buildEffects(d, false);
    const reduced = buildEffects(d, true);
    expect(types(reduced.events)).toEqual(types(full.events));
    reduced.events.forEach((e, i) => {
      expect(e.t).toBe(i);
      if (e.type !== 'done') expect(e.dur).toBe(1);
    });
    expect(reduced.durationMs).toBe(reduced.events.length);
    // Payloads identical apart from timing.
    const strip = (e: EffectEvent): Record<string, unknown> => Object.fromEntries(Object.entries(e).filter(([k]) => k !== 't' && k !== 'dur'));
    expect(reduced.events.map(strip)).toEqual(full.events.map(strip));
  });

  it('is deterministic and never consults Math.random', () => {
    const spy = vi.spyOn(Math, 'random');
    const d = confirmDispatch('silent-failure', { 0: 'X', 3: 'X' });
    const a = buildEffects(d, false);
    const b = buildEffects(d, false);
    expect(a).toEqual(b);
    expect(buildEffects(d, true)).toEqual(buildEffects(d, true));
    expect(spy).not.toHaveBeenCalled();
  });

  for (const m of listPublicMissions()) {
    it(`${m.id}: valid timelines for the min-weight dispatch, a wrong dispatch and stand down (full + reduced motion)`, () => {
      const def = getMission(m.id);
      const debriefs = [
        confirmDispatch(m.id, placementsOf(def.expected.minWeightCorrection)),
        confirmDispatch(m.id, wrongDispatch(m.id)),
        confirmDispatch(m.id, {}),
      ];
      for (const d of debriefs) {
        checkTimeline(d, false);
        checkTimeline(d, true);
        const tl = buildEffects(d, false);
        // The outcome shown is the engine's: success ⇔ stabilizer membership; alarms alone never decide it.
        const outcome = tl.events.find((e) => e.type === 'outcome');
        const result = outcome?.type === 'outcome' ? outcome.result : null;
        const wires = getCode(m.code).checks.length === 0;
        if (d.verdict === 'success') expect(result === 'restored' || result === 'safe-pattern').toBe(true);
        if (d.verdict === 'detectable') expect(result).toBe(wires ? 'prediction-miss' : 'still-burning');
        if (d.verdict === 'logical-error') expect(result).toBe(wires ? 'prediction-miss' : 'logical-failure');
      }
      // The min-weight dispatch of Silent Failure is a logical failure with every alarm quiet: the beacon's case.
      if (m.id === 'silent-failure') {
        const d = debriefs[0];
        expect(d && resultType(d)).toBe('logical-failure');
        expect(d && remainingAlarms(d)).toEqual([]);
        expect(d && logicalPatternSupport(d)).toEqual([0, 1, 2]);
      }
    });
  }
});

describe('buildEffects · propagation prelude (fires travel through the gates before the trucks)', () => {
  const bridge = confirmDispatch('red-forward-blue-backward', { 0: 'Y', 1: 'Y' }); // XZ → CNOT → YY
  const lab = confirmDispatch('color-switch', { 0: 'X', 1: 'Z' }); // ZI → H, CNOT, H → XZ

  it('mission 2: fires-start → gate(CNOT) → fires-arrive → trucks-arrive …; before/after are the engine frames XZ → YY', () => {
    const tl = buildEffects(bridge, false);
    const T = EFFECT_TIMING;
    expect(hasPrelude(tl)).toBe(true);
    expect(types(tl.events).slice(0, 5)).toEqual(['fires-start', 'gate', 'fires-arrive', 'trucks-arrive', 'crew-run']);
    expect(tl.events[0]).toEqual({ type: 'fires-start', t: 0, dur: T.firesStart, fires: 'XZ' });
    expect(tl.events[1]).toEqual({ type: 'gate', t: T.firesStart, dur: T.gate, index: 0, gate: { kind: 'CNOT', c: 0, t: 1 }, before: 'XZ', after: 'YY', changed: true, travel: GATE_TRAVEL });
    expect(tl.events[2]).toEqual({ type: 'fires-arrive', t: T.firesStart + T.gate, dur: T.arrive, fires: 'YY' });
    const preludeEnd = T.firesStart + T.gate + T.arrive + T.arriveHold;
    expect(tl.events[3]).toEqual({ type: 'trucks-arrive', t: preludeEnd, dur: T.trucks });
    // Every later event is shifted by the prelude; the duration includes it.
    const plain = buildEffects(bridge, false, { propagation: false });
    const shifted = tl.events.slice(3).map((e) => ({ ...e, t: e.t - preludeEnd }));
    expect(shifted).toEqual(plain.events);
    expect(tl.durationMs).toBe(plain.durationMs + preludeEnd);
    for (let i = 1; i < tl.events.length; i++) expect((tl.events[i]?.t ?? 0) >= (tl.events[i - 1]?.t ?? 0)).toBe(true);
    expect(tl.events[tl.events.length - 1]?.type).toBe('done');
  });

  it('mission 3: one gate event per circuit gate in order (H, CNOT, H) with the frames ZI → XI → XX → XZ; the arrival equals Debrief.fires', () => {
    const tl = buildEffects(lab, false);
    const gates = tl.events.filter((e): e is Extract<EffectEvent, { type: 'gate' }> => e.type === 'gate');
    expect(gates.map((g) => g.gate.kind)).toEqual(['H', 'CNOT', 'H']);
    expect(gates.map((g) => [g.before, g.after])).toEqual([
      ['ZI', 'XI'],
      ['XI', 'XX'],
      ['XX', 'XZ'],
    ]);
    expect(gates.every((g) => g.changed)).toBe(true);
    const arrive = tl.events.find((e) => e.type === 'fires-arrive');
    expect(arrive?.type === 'fires-arrive' ? arrive.fires : null).toBe(lab.fires);
    expect(lab.fires).toBe('XZ');
    const traj = propagate(fromString(lab.startFires), getPublicMission('color-switch').circuit);
    expect(toString(traj.frames[traj.frames.length - 1] ?? fromString('II'))).toBe(lab.fires);
  });

  it('the arrival holds before the trucks: fires-arrive completes, then the trucks start arriveHold (≥ CAPTION_HOLD) later, so the arrival line is never replaced the instant it appears', () => {
    expect(EFFECT_TIMING.arriveHold).toBeGreaterThanOrEqual(CAPTION_HOLD);
    for (const d of [bridge, lab, confirmDispatch('red-forward-blue-backward', {})]) {
      const tl = buildEffects(d, false);
      const arrive = tl.events.find((e) => e.type === 'fires-arrive');
      const trucks = tl.events.find((e) => e.type === 'trucks-arrive');
      if (arrive === undefined || trucks === undefined) throw new Error('prelude');
      expect(trucks.t - (arrive.t + arrive.dur)).toBe(EFFECT_TIMING.arriveHold);
      // Nothing else starts inside the hold.
      expect(tl.events.filter((e) => e.t > arrive.t && e.t < trucks.t)).toEqual([]);
    }
  });

  it('no prelude for missions with an empty circuit (rep3 / rsc3): the timeline is unchanged (trucks first at t = 0)', () => {
    for (const id of ['first-alarm', 'blind-dispatch', 'two-kinds-of-trouble', 'silent-failure']) {
      const def = getMission(id);
      const d = confirmDispatch(id, placementsOf(def.expected.minWeightCorrection));
      const tl = buildEffects(d, false);
      expect(hasPrelude(tl)).toBe(false);
      expect(tl.events[0]).toEqual({ type: 'trucks-arrive', t: 0, dur: EFFECT_TIMING.trucks });
      expect(tl).toEqual(buildEffects(d, false, { propagation: false }));
      expect(buildEffects(d, true)).toEqual(buildEffects(d, true, { propagation: false }));
    }
  });

  it('propagation:false removes the prelude; a synthetic debrief (unknown mission id) gets one only through options.circuit', () => {
    const off = buildEffects(bridge, false, { propagation: false });
    expect(hasPrelude(off)).toBe(false);
    expect(off.events[0]?.type).toBe('trucks-arrive');
    const synthetic: Debrief = { ...bridge, missionId: 'no-such-mission' };
    expect(hasPrelude(buildEffects(synthetic, false))).toBe(false);
    const circuit: Circuit = [{ kind: 'CNOT', c: 0, t: 1 }];
    const withCircuit = buildEffects(synthetic, false, { circuit });
    expect(hasPrelude(withCircuit)).toBe(true);
    expect(types(withCircuit.events).slice(0, 4)).toEqual(['fires-start', 'gate', 'fires-arrive', 'trucks-arrive']);
    // propagation:false wins over an explicit circuit.
    expect(hasPrelude(buildEffects(synthetic, false, { circuit, propagation: false }))).toBe(false);
  });

  it('throws when the propagated start fires do not reach Debrief.fires (the honesty rule)', () => {
    const forged: Debrief = { ...bridge, startFires: 'XI' }; // XI → XX ≠ YY
    expect(() => buildEffects(forged, false)).toThrow(/propagating XI .* gives XX, but the debrief says YY/);
    // A circuit that does not match the debrief's fires is refused too.
    expect(() => buildEffects(bridge, false, { circuit: [{ kind: 'H', q: 0 }] })).toThrow(/gives ZZ, but the debrief says YY/);
  });

  it('reduced motion: one frame per event, so the stepper gains k + 2 frames (fires start → each gate → fires arrive) and keeps the order', () => {
    for (const d of [bridge, lab]) {
      const k = getPublicMission(d.missionId).circuit.length;
      const reduced = buildEffects(d, true);
      const plain = buildEffects(d, true, { propagation: false });
      expect(reduced.events).toHaveLength(plain.events.length + k + 2);
      expect(reduced.durationMs).toBe(reduced.events.length);
      reduced.events.forEach((e, i) => {
        expect(e.t).toBe(i);
        if (e.type !== 'done') expect(e.dur).toBe(1);
      });
      expect(types(reduced.events).slice(0, k + 3)).toEqual(['fires-start', ...Array.from({ length: k }, () => 'gate'), 'fires-arrive', 'trucks-arrive']);
      // Payloads identical to the full-motion timeline apart from timing.
      const strip = (e: EffectEvent): Record<string, unknown> => Object.fromEntries(Object.entries(e).filter(([key]) => key !== 't' && key !== 'dur'));
      expect(reduced.events.map(strip)).toEqual(buildEffects(d, false).events.map(strip));
    }
  });

  it('stand down on a lane board still plays the prelude, then reveals the fires nobody sprayed', () => {
    const d = confirmDispatch('red-forward-blue-backward', {});
    const tl = buildEffects(d, false);
    expect(types(tl.events)).toEqual(['fires-start', 'gate', 'fires-arrive', 'trucks-arrive', 'reveal-remaining', 'alarms', 'outcome', 'done']);
    const reveal = tl.events.find((e) => e.type === 'reveal-remaining');
    expect(reveal?.type === 'reveal-remaining' ? reveal.qs : null).toEqual([0, 1]);
  });
});
