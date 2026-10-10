#!/usr/bin/env node
/**
 * verify:release — aggregates every gate and checks submission assets.
 * Writes reports/release-verification.json (no secrets). Exit 1 on any failure.
 * Usage: node scripts/verify-release.mjs [--skip-e2e] [--skip-quantum]
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = new Set(process.argv.slice(2));
const steps = [];
let failed = false;

function run(name, cmd, cmdArgs, opts = {}) {
  const started = Date.now();
  const r = spawnSync(cmd, cmdArgs, { cwd: root, stdio: 'inherit', env: { ...process.env, CI: process.env.CI ?? '1' }, ...opts });
  const code = r.status ?? 1;
  steps.push({ name, command: [cmd, ...cmdArgs].join(' '), exitCode: code, seconds: Math.round((Date.now() - started) / 100) / 10 });
  if (code !== 0) failed = true;
  console.log(`\n[verify:release] ${name}: exit ${code}\n`);
  return code;
}

run('lint', 'npm', ['run', '-s', 'lint']);
run('typecheck', 'npm', ['run', '-s', 'typecheck']);
run('unit', 'npm', ['run', '-s', 'test:unit']);
run('build', 'npm', ['run', '-s', 'build']);
if (!args.has('--skip-quantum')) run('verify:quantum', 'node', ['scripts/verify-quantum.mjs']);
if (!args.has('--skip-e2e')) run('e2e', 'npm', ['run', '-s', 'test:e2e']);

// Submission assets (presence + basic sanity; content is reviewed by humans)
const required = [
  'LICENSE', 'README.md', 'CLAUDE.md',
  'public/icon.svg', 'public/favicon.ico', 'public/favicon-16.png', 'public/favicon-32.png', 'public/apple-touch-icon.png', 'public/icon-192.png', 'public/icon-512.png', 'public/manifest.webmanifest',
  'submission/PROJECT_PAGE.md', 'submission/SHORT_DESCRIPTION.md', 'submission/DEMO_SCRIPT.md', 'submission/ATTRIBUTION.md', 'submission/QOLLAB_IMPORT.md', 'submission/RELEASE_CHECKLIST.md', 'submission/KNOWN_LIMITATIONS.md', 'submission/EVIDENCE_INDEX.md',
  'qollab/index.html', 'qollab/main.js', 'qollab/q11/__init__.py',
  'reports/quantum-verification.json',
];
const missing = required.filter((f) => !existsSync(path.join(root, f)));
if (missing.length) { failed = true; console.log('[verify:release] missing required files:', missing); }

// LICENSE must be MIT; attribution line must be present in PROJECT_PAGE and README
const checks = [];
function textCheck(file, needle, label) {
  const p = path.join(root, file);
  const ok = existsSync(p) && readFileSync(p, 'utf8').includes(needle);
  checks.push({ label, file, ok });
  if (!ok) failed = true;
}
textCheck('LICENSE', 'MIT License', 'LICENSE is MIT');
textCheck('submission/PROJECT_PAGE.md', 'This effort is supported by Qollab & IonQ', 'attribution line in project page');
textCheck('README.md', 'This effort is supported by Qollab & IonQ', 'attribution line in README');

// Demo video: optional file outside git; record sha256 + duration if present
const demo = path.join(root, 'submission/DEMO.mp4');
let demoInfo = { present: false };
if (existsSync(demo)) {
  const buf = readFileSync(demo);
  const sha256 = createHash('sha256').update(buf).digest('hex');
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', demo], { encoding: 'utf8' });
  const duration = parseFloat((probe.stdout || '').trim());
  demoInfo = { present: true, bytes: statSync(demo).size, sha256, durationSeconds: Number.isFinite(duration) ? Math.round(duration) : null,
    within120to180: Number.isFinite(duration) && duration >= 120 && duration <= 180 };
  if (!demoInfo.within120to180) { failed = true; console.log('[verify:release] DEMO.mp4 duration out of range:', duration); }
} else {
  failed = true; console.log('[verify:release] submission/DEMO.mp4 not present (local-only artifact; required for release)');
}

// Secret scan (patterns only, never prints matches content)
const scan = spawnSync('git', ['grep', '-nI', '-E', '(ghp_[A-Za-z0-9]{20,}|gho_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY|VERCEL_TOKEN=|IONQ_API_KEY=[A-Za-z0-9])', '--', '.', ':!scripts/verify-release.mjs'], { cwd: root, encoding: 'utf8' });
const secretHits = scan.status === 0 ? scan.stdout.trim().split('\n').length : 0;
if (secretHits > 0) { failed = true; console.log(`[verify:release] secret-like patterns found in tracked files: ${secretHits} line(s)`); }

// Git state
const sha = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout.trim();
const dirty = spawnSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).stdout.trim();

const report = { generatedAt: new Date().toISOString(), gitSha: sha, workingTreeClean: dirty.length === 0, steps, missingFiles: missing, checks, demo: demoInfo, secretLikeLines: secretHits, passed: !failed };
mkdirSync(path.join(root, 'reports'), { recursive: true });
writeFileSync(path.join(root, 'reports/release-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`\n[verify:release] ${failed ? 'FAIL' : 'PASS'} — report: reports/release-verification.json`);
process.exit(failed ? 1 : 0);
