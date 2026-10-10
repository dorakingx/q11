import { describe, expect, it } from 'vitest';
import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import gatesExhaustive from '../../fixtures/cases/gates-exhaustive.json';
import propagation1000 from '../../fixtures/cases/propagation-1000.json';
import rsc3Single from '../../fixtures/cases/rsc3-single.json';
import rsc3Logical from '../../fixtures/cases/rsc3-logical.json';
import verdicts1000 from '../../fixtures/cases/verdicts-1000.json';
import { CASE_FILES, FIXTURE_SEED, generateFixtures } from './fixture-gen';
import { stableStringify, type JsonValue } from './stable-json';
import { getCode, isCodeId } from './codes';
import { fromString, toString } from './pauli';
import { propagateFinal } from './gates';
import { parseCircuit } from './missions';
import { evaluate, syndrome, syndromeToArray } from './verdict';
import { lookupDecoder } from './decoder';

const fixturesDir = fileURLToPath(new URL('../../fixtures/', import.meta.url));

describe('stableStringify', () => {
  it('sorts keys, inlines flat containers, ends with a newline', () => {
    const v: JsonValue = { b: [1, 2], a: { y: 1, x: 's' }, c: [{ k: 1 }], d: [] };
    expect(stableStringify(v)).toBe('{\n  "a": {"x": "s", "y": 1},\n  "b": [1, 2],\n  "c": [\n    {"k": 1}\n  ],\n  "d": []\n}\n');
  });
});

describe('fixture generation', () => {
  const rawMissions: unknown = JSON.parse(readFileSync(join(fixturesDir, 'missions.json'), 'utf8'));
  const generated = generateFixtures(rawMissions);

  it('is byte-identical to the committed files (regenerate into a temp dir and compare)', () => {
    const dir = mkdtempSync(join(tmpdir(), 'q11-fixtures-'));
    try {
      for (const [rel, text] of generated) {
        const target = join(dir, rel);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, text, 'utf8');
      }
      for (const rel of [...CASE_FILES, 'missions.json']) {
        const fresh = readFileSync(join(dir, rel), 'utf8');
        const committed = readFileSync(join(fixturesDir, rel), 'utf8');
        expect(fresh, rel).toBe(committed);
        expect(fresh.endsWith('\n')).toBe(true);
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('is deterministic across two generator runs in one process', () => {
    const again = generateFixtures(rawMissions);
    for (const [rel, text] of generated) expect(again.get(rel), rel).toBe(text);
    expect(generateFixtures(rawMissions, FIXTURE_SEED + 1).get('cases/propagation-1000.json')).not.toBe(generated.get('cases/propagation-1000.json'));
  });

  it('has the documented counts and seed', () => {
    expect(propagation1000.count).toBe(1000);
    expect(propagation1000.cases.length).toBe(1000);
    expect(propagation1000.seed).toBe(20261010);
    expect(verdicts1000.count).toBe(1000);
    expect(verdicts1000.cases.length).toBe(1000);
    expect(rsc3Single.count).toBe(28);
    expect(gatesExhaustive.count).toBe(4 + 4 + 16 * 4);
    expect(rsc3Logical.cases.filter((c) => c.kind === 'logical').length).toBeGreaterThanOrEqual(3);
    expect(rsc3Logical.cases.filter((c) => c.kind === 'stabilizer').length).toBeGreaterThanOrEqual(8);
  });

  it('propagation and gate cases replay through the engine', () => {
    for (const c of [...propagation1000.cases, ...gatesExhaustive.cases]) {
      const circuit = parseCircuit(c.circuit);
      expect(toString(propagateFinal(fromString(c.input), circuit)), String(c.id)).toBe(c.output);
    }
  });

  it('verdict cases replay through the engine, and include every verdict kind, both codes and degenerate pairs', () => {
    const kinds = new Set<string>();
    const codes = new Set<string>();
    const strategies = new Set<string>();
    for (const c of verdicts1000.cases) {
      if (!isCodeId(c.code)) throw new Error(c.code);
      const code = getCode(c.code);
      const v = evaluate(code, fromString(c.error), fromString(c.correction));
      expect(v.kind, String(c.id)).toBe(c.verdict);
      expect(v.logicalFlip, String(c.id)).toEqual(c.logicalFlip);
      expect(v.weight).toBe(c.residualWeight);
      expect(syndromeToArray(syndrome(code, fromString(c.error)))).toEqual(c.syndromeE);
      expect(toString(v.residual)).toBe(c.residual);
      kinds.add(c.verdict);
      codes.add(c.code);
      strategies.add(c.strategy);
    }
    expect([...kinds].sort()).toEqual(['detectable', 'logical-error', 'success']);
    expect([...codes].sort()).toEqual(['rep3', 'rsc3']);
    expect(strategies).toContain('decoder*stabilizer');
    expect(strategies).toContain('error*stabilizer');
    const degenerate = verdicts1000.cases.filter((c) => c.verdict === 'success' && c.residualWeight > 0);
    expect(degenerate.length).toBeGreaterThan(50);
  });

  it('rsc3-single: 28 patterns all succeed with weight ≤ 1 corrections from the decoder', () => {
    const code = getCode('rsc3');
    const d = lookupDecoder(code);
    const seen = new Set<string>();
    for (const c of rsc3Single.cases) {
      seen.add(c.error);
      expect(c.verdict).toBe('success');
      expect(toString(d.decode(syndrome(code, fromString(c.error))))).toBe(c.correction);
      expect(c.syndrome).toEqual(syndromeToArray(syndrome(code, fromString(c.error))));
    }
    expect(seen.size).toBe(28);
  });

  it('rsc3-logical: logical operators are logical errors with the right flips; stabilizers succeed', () => {
    const code = getCode('rsc3');
    for (const c of rsc3Logical.cases) {
      const v = evaluate(code, fromString(c.error), fromString(c.correction));
      expect(v.kind, c.label).toBe(c.verdict);
      expect(v.logicalFlip).toEqual(c.logicalFlip);
      if (c.kind === 'stabilizer') expect(c.verdict).toBe('success');
      else expect(c.verdict).toBe('logical-error');
    }
    const byLabel = (l: string) => rsc3Logical.cases.find((c) => c.label === l);
    expect(byLabel('logical X')?.logicalFlip).toEqual({ x: [true], z: [false] });
    expect(byLabel('logical Z')?.logicalFlip).toEqual({ x: [false], z: [true] });
    expect(byLabel('logical Y')?.logicalFlip).toEqual({ x: [true], z: [true] });
  });
});
