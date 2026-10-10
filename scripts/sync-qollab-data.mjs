#!/usr/bin/env node
/**
 * sync-qollab-data — copies the shared fixtures into the Qollab project's Python package data folder
 * (qollab/q11/data/) and then verifies byte equality. Exit 1 on any drift.
 *
 *   node scripts/sync-qollab-data.mjs          copy, then verify
 *   node scripts/sync-qollab-data.mjs --check  verify only (no writes); exit 1 if the copies differ or are missing
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const checkOnly = process.argv.includes('--check');
const pairs = [
  ['fixtures/codes.json', 'qollab/q11/data/codes.json'],
  ['fixtures/missions.json', 'qollab/q11/data/missions.json'],
];

const sha = (buf) => createHash('sha256').update(buf).digest('hex');
let drift = 0;
for (const [from, to] of pairs) {
  const src = readFileSync(path.join(root, from));
  const dest = path.join(root, to);
  if (!checkOnly) {
    mkdirSync(path.dirname(dest), { recursive: true });
    const before = existsSync(dest) ? readFileSync(dest) : null;
    if (before === null || !before.equals(src)) {
      writeFileSync(dest, src);
      console.log(`[sync-qollab-data] ${before === null ? 'created' : 'updated'} ${to} (${src.length} bytes)`);
    }
  }
  if (!existsSync(dest)) {
    console.error(`[sync-qollab-data] MISSING ${to}`);
    drift++;
    continue;
  }
  const copy = readFileSync(dest);
  const same = copy.equals(src);
  console.log(`[sync-qollab-data] ${from} -> ${to}: ${same ? 'identical' : 'DRIFT'} sha256=${sha(src).slice(0, 16)}… ${same ? '' : `(copy ${sha(copy).slice(0, 16)}…)`}`);
  if (!same) drift++;
}
if (drift) {
  console.error(`[sync-qollab-data] FAIL: ${drift} file(s) differ`);
  process.exit(1);
}
console.log(`[sync-qollab-data] OK: ${pairs.length} files identical`);
