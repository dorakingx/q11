/**
 * Regenerate fixtures/cases/*.json and the `expected` blocks in fixtures/missions.json.
 * Usage: npx tsx scripts/gen-fixtures.ts [outDir]   (default: ./fixtures)
 * Deterministic: seed 20261010; repeated runs produce byte-identical files.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateFixtures } from '../src/quantum/fixture-gen';

const here = dirname(fileURLToPath(import.meta.url));
const fixturesDir = resolve(here, '..', 'fixtures');
const outDir = resolve(process.argv[2] ?? fixturesDir);

const rawMissions: unknown = JSON.parse(readFileSync(join(fixturesDir, 'missions.json'), 'utf8'));
const files = generateFixtures(rawMissions);

let written = 0;
let unchanged = 0;
for (const [rel, text] of files) {
  const target = join(outDir, rel);
  mkdirSync(dirname(target), { recursive: true });
  let previous: string | null = null;
  try {
    previous = readFileSync(target, 'utf8');
  } catch {
    previous = null;
  }
  if (previous === text) {
    unchanged++;
    continue;
  }
  writeFileSync(target, text, 'utf8');
  written++;
  console.log(`wrote ${target} (${String(text.length)} bytes)`);
}
console.log(`gen-fixtures: ${String(written)} written, ${String(unchanged)} unchanged, out=${outDir}`);
