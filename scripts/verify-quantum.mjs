#!/usr/bin/env node
/**
 * verify:quantum — regenerate fixtures from the TypeScript engine, sync them into the Qollab Python package,
 * make sure the Python environment exists, then run the independent Python/Qiskit comparison.
 *
 *   npx tsx scripts/gen-fixtures.ts
 *   node scripts/sync-qollab-data.mjs
 *   (uv venv --python 3.12 .venv && uv pip install --python .venv/bin/python -r quantum/requirements.txt)  if .venv is missing
 *   .venv/bin/python quantum/verify.py
 *
 * Exit codes propagate; the last line is a one-line PASS/FAIL summary with counts read from
 * reports/quantum-verification.json.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const py = path.join(root, '.venv', 'bin', 'python');

function step(label, cmd, args) {
  console.log(`\n[verify:quantum] ${label}: ${cmd} ${args.join(' ')}`);
  const r = spawnSync(cmd, args, { cwd: root, stdio: 'inherit', shell: false });
  if (r.error) {
    console.error(`[verify:quantum] FAIL ${label}: ${r.error.message}`);
    process.exit(1);
  }
  if (r.status !== 0) {
    console.error(`[verify:quantum] FAIL ${label}: exit ${r.status}`);
    process.exit(r.status ?? 1);
  }
}

step('generate fixtures (TypeScript engine)', 'npx', ['tsx', 'scripts/gen-fixtures.ts']);
step('sync fixtures into qollab/q11/data', 'node', ['scripts/sync-qollab-data.mjs']);
if (!existsSync(py)) {
  step('create .venv (uv, Python 3.12)', 'uv', ['venv', '--python', '3.12', '.venv']);
  step('install quantum/requirements.txt', 'uv', ['pip', 'install', '--python', py, '-r', 'quantum/requirements.txt']);
}
step('independent Python/Qiskit comparison', py, ['quantum/verify.py']);

let summary = 'PASS (report unreadable)';
try {
  const rep = JSON.parse(readFileSync(path.join(root, 'reports', 'quantum-verification.json'), 'utf8'));
  const t = rep.totals;
  summary = `${rep.pass ? 'PASS' : 'FAIL'} — ${t.casesCompared} comparisons, ${t.mismatches} mismatches, ${rep.aerRuns.length} Aer mission runs (qiskit ${rep.versions.qiskit}, aer ${rep.versions.qiskit_aer})`;
  if (!rep.pass) {
    console.error(`[verify:quantum] ${summary}`);
    process.exit(1);
  }
} catch (err) {
  console.error(`[verify:quantum] could not read report: ${err.message}`);
  process.exit(1);
}
console.log(`[verify:quantum] ${summary}`);
