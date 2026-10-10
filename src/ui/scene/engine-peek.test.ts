/**
 * The UI layer never peeks at the true error: `confirmDispatch` / `revealMission` (src/game) are reducer-only.
 * Every Debrief the UI draws, including the Why? alternative, comes from the reducer's committed state.
 * Dev previews count as UI too; test files are the only exception (they build debriefs to check the pictures).
 * Comments are stripped first: naming the functions in a doc comment is fine, calling or importing them is not.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/** vitest runs from the repo root (vitest.config.ts); vite-node module URLs are not file: URLs, so resolve from cwd. */
const UI_ROOT = resolve(process.cwd(), 'src', 'ui');
const FORBIDDEN = ['revealMission', 'confirmDispatch'];

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...sourceFiles(full));
      continue;
    }
    if (!/\.(ts|tsx)$/.test(name) || /\.test\.(ts|tsx)$/.test(name)) continue;
    out.push(full);
  }
  return out;
}

/** Source with block and line comments removed, so a doc comment may still *name* the forbidden functions. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`])\/\/.*$/gm, '$1');
}

describe('src/ui never imports the engine reveal', () => {
  const files = sourceFiles(UI_ROOT);

  it('scans a real tree (sanity)', () => {
    expect(files.length).toBeGreaterThan(20);
    expect(files.some((f) => f.endsWith('WhyCompare.tsx'))).toBe(true);
    expect(files.some((f) => f.endsWith('App.tsx'))).toBe(true);
  });

  for (const word of FORBIDDEN) {
    it(`no non-test file under src/ui mentions ${word}`, () => {
      const offenders = files.filter((f) => stripComments(readFileSync(f, 'utf8')).includes(word)).map((f) => f.slice(UI_ROOT.length));
      expect(offenders).toEqual([]);
    });
  }
});
