import { describe, expect, it } from 'vitest';
import { evaluate, fromString, getCode, propagateFinal } from '../quantum';
import { buildReplay, describeFires, describeGate } from './replay';

describe('buildReplay', () => {
  it('orders steps E placed → gates → alarms → dispatch → residual → verdict (propagation mission)', () => {
    const code = getCode('trivial2');
    const start = fromString('ZI');
    const circuit = [{ kind: 'H', q: 0 } as const, { kind: 'CNOT', c: 0, t: 1 } as const, { kind: 'H', q: 1 } as const];
    const final = propagateFinal(start, circuit);
    const crews = fromString('XZ');
    const verdict = evaluate(code, final, crews);
    const steps = buildReplay({ kind: 'propagation', code, start, circuit, crews, verdict });
    expect(steps.map((s) => s.id)).toEqual(['placed', 'gate-0', 'gate-1', 'gate-2', 'alarms', 'dispatch', 'residual', 'verdict']);
    expect(steps.map((s) => s.fires)).toEqual(['ZI', 'XI', 'XX', 'XZ', 'XZ', 'XZ', 'XZ', 'XZ']);
    expect(steps.map((s) => s.gateCursor)).toEqual([-1, 0, 1, 2, 3, 3, 3, 3]);
    expect(steps[1]?.caption).toContain('H on block 0: ZI becomes XI');
    expect(steps[2]?.caption).toContain('CNOT from block 0 to block 1: XI becomes XX');
    // crews appear only from the dispatch step on; residual only from the residual step
    expect(steps.slice(0, 5).every((s) => s.crews === null && s.residual === null)).toBe(true);
    expect(steps[5]?.crews).toBe('XZ');
    expect(steps[5]?.residual).toBeNull();
    expect(steps[6]?.residual).toBe('II');
    expect(steps[7]?.showVerdict).toBe(true);
    expect(steps.slice(0, 7).every((s) => !s.showVerdict)).toBe(true);
    expect(steps[7]?.caption).toMatch(/Logical qubit safe/);
  });

  it('dispatch mission: no gate steps; alarms step names the ringing stations; residual explains logical error', () => {
    const code = getCode('rsc3');
    const start = fromString('IXXIIIIII');
    const crews = fromString('XIIIIIIII');
    const verdict = evaluate(code, start, crews);
    const steps = buildReplay({ kind: 'dispatch', code, start, circuit: [], crews, verdict });
    expect(steps.map((s) => s.id)).toEqual(['placed', 'alarms', 'dispatch', 'residual', 'verdict']);
    expect(steps[0]?.caption).toBe('Noise lit a red fire (X) on block 1 and a red fire (X) on block 2.');
    expect(steps[1]?.caption).toMatch(/^Alarms: Z0 rings/);
    expect(steps[1]?.syndrome).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
    expect(steps[3]?.residual).toBe('XXXIIIIII');
    expect(steps[3]?.syndrome).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(steps[4]?.caption).toMatch(/acts as logical X\. Silent failure\./);
  });

  it('detectable verdict caption names the still-ringing stations; identity residual says every fire is out', () => {
    const code = getCode('rep3');
    const e = fromString('IXI');
    const bad = buildReplay({ kind: 'dispatch', code, start: e, circuit: [], crews: fromString('XII'), verdict: evaluate(code, e, fromString('XII')) });
    expect(bad[bad.length - 1]?.caption).toMatch(/still trips Z1/);
    const good = buildReplay({ kind: 'dispatch', code, start: e, circuit: [], crews: e, verdict: evaluate(code, e, e) });
    expect(good[good.length - 1]?.caption).toMatch(/every fire is out/);
    expect(good[good.length - 2]?.caption).toMatch(/every pair cancels/);
  });

  it('describe helpers', () => {
    expect(describeFires(fromString('III'))).toBe('no fires');
    expect(describeFires(fromString('YII'))).toBe('a red-and-blue fire (Y) on block 0');
    expect(describeGate({ kind: 'SWAP', a: 0, b: 1 })).toBe('SWAP of blocks 0 and 1');
    expect(describeGate({ kind: 'CZ', a: 0, b: 1 })).toBe('CZ between blocks 0 and 1');
    expect(describeGate({ kind: 'S', q: 2 })).toBe('S on block 2');
  });
});
