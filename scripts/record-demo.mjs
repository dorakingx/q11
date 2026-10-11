#!/usr/bin/env node
/**
 * record-demo — drives the REAL built app with Playwright, records the screen and lays a narration track
 * (synthesised offline with macOS `say`) under it. No captions are burned in; nothing is uploaded.
 *
 * Shot list (scripts/demo-shots.json), executed in order:
 *   { "type": "goto", "url": "/" }                            navigate (relative to BASE_URL)
 *   { "type": "click", "selector": "[data-testid=play]" }     click the first match (10 s timeout)
 *   { "type": "press", "key": "Enter" }
 *   { "type": "wait", "ms": 1200 }
 *   { "type": "narrate", "text": "…", "block": true }         speak this line; block (default true) waits until the
 *                                                             clip has ended (+ NARRATION_PAD) before the next shot
 *   { "type": "narrate-wait" }                                wait until a non-blocking narration has ended
 * Requires: a preview of the built app on BASE_URL (default http://localhost:4173), ffmpeg + ffprobe on PATH, macOS `say`.
 * Env: DEMO_VOICE (default Samantha), DEMO_RATE (words per minute, default 172).
 * Output: submission/DEMO.mp4 (git-ignored) + submission/DEMO_SILENT.mp4 (same picture, no audio track, git-ignored)
 *         + reports/demo-recording.json (duration, sha256, narration lines with their start times).
 */
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync, statSync, rmSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const base = process.env.BASE_URL ?? 'http://localhost:4173';
const VOICE = process.env.DEMO_VOICE ?? 'Samantha';
const RATE = process.env.DEMO_RATE ?? '172';
const NARRATION_PAD = 350; // ms of silence kept after a blocking line
const VIEWPORT = { width: 1280, height: 800 };
const shots = JSON.parse(readFileSync(path.join(root, process.argv[2] ?? 'scripts/demo-shots.json'), 'utf8'));
const rawDir = path.join(root, 'submission/raw');
rmSync(rawDir, { recursive: true, force: true });
mkdirSync(rawDir, { recursive: true });
mkdirSync(path.join(root, 'reports'), { recursive: true });

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', ...opts });
  if (r.status !== 0) {
    console.error(`[record-demo] ${cmd} ${args.join(' ')} failed (${String(r.status)})\n${r.stderr ?? ''}`);
    process.exit(1);
  }
  return r;
}
function probeDuration(file) {
  const r = run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file]);
  return parseFloat(r.stdout.trim());
}

// 1. Synthesise every narration line up front (deterministic given voice + rate + text).
const lines = [];
shots.forEach((s, i) => {
  if (s.type !== 'narrate') return;
  if (s.type === 'caption' || s.type === 'viewport') throw new Error(`shot ${String(i)}: "${s.type}" is no longer supported (narration only, single viewport)`);
  const aiff = path.join(rawDir, `line-${String(i).padStart(3, '0')}.aiff`);
  const wav = path.join(rawDir, `line-${String(i).padStart(3, '0')}.wav`);
  run('say', ['-v', VOICE, '-r', RATE, '-o', aiff, s.text]);
  run('ffmpeg', ['-y', '-loglevel', 'error', '-i', aiff, '-ar', '48000', '-ac', '1', '-c:a', 'pcm_s16le', wav]);
  lines.push({ shot: i, text: s.text, wav, seconds: probeDuration(wav) });
});
for (const s of shots) if (s.type === 'caption' || s.type === 'viewport') throw new Error(`"${s.type}" shots are no longer supported`);
const lineByShot = new Map(lines.map((l) => [l.shot, l]));
console.log(`[record-demo] ${String(lines.length)} narration lines, ${lines.reduce((a, l) => a + l.seconds, 0).toFixed(1)} s of speech (${VOICE} @ ${RATE} wpm)`);

// 2. Record the real app; note when each line starts relative to the video.
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEWPORT, recordVideo: { dir: rawDir, size: VIEWPORT }, reducedMotion: 'no-preference', deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.error('[pageerror]', e.message));
const videoPath = page.video().path();
const videoStart = Date.now();
const cues = [];
let narrationEnd = 0; // ms since videoStart when the latest line stops
const now = () => Date.now() - videoStart;
for (let i = 0; i < shots.length; i++) {
  const s = shots[i];
  if (s.type === 'goto') await page.goto(base + (s.url ?? '/'), { waitUntil: 'networkidle' });
  else if (s.type === 'click') await page.locator(s.selector).first().click({ timeout: s.timeout ?? 10_000 });
  else if (s.type === 'press') await page.keyboard.press(s.key);
  else if (s.type === 'wait') await page.waitForTimeout(s.ms ?? 1000);
  else if (s.type === 'narrate') {
    const line = lineByShot.get(i);
    // never overlap two lines: a new line starts after the previous one has finished
    const gap = narrationEnd - now();
    if (gap > 0) await page.waitForTimeout(gap + 120);
    const at = now();
    cues.push({ shot: i, at, seconds: line.seconds, wav: line.wav, text: line.text });
    narrationEnd = at + Math.round(line.seconds * 1000);
    if (s.block !== false) await page.waitForTimeout(Math.round(line.seconds * 1000) + NARRATION_PAD);
  } else if (s.type === 'narrate-wait') {
    const left = narrationEnd - now();
    if (left > 0) await page.waitForTimeout(left + NARRATION_PAD);
  } else throw new Error(`unknown shot type ${String(s.type)}`);
}
// let the last line breathe
const tail = narrationEnd - now();
if (tail > 0) await page.waitForTimeout(tail + 800);
const videoEnd = now();
await ctx.close();
await browser.close();

// 3. Encode the screen capture, then mix the narration at the recorded cue times.
const webm = await videoPath;
const silent = path.join(rawDir, 'video.mp4');
run('ffmpeg', ['-y', '-loglevel', 'error', '-i', webm, '-vf', `scale=${String(VIEWPORT.width)}:${String(VIEWPORT.height)}:force_original_aspect_ratio=decrease,pad=${String(VIEWPORT.width)}:${String(VIEWPORT.height)}:(ow-iw)/2:(oh-ih)/2:color=0xfff6e9,fps=30`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-an', silent]);
const videoSeconds = probeDuration(silent);
// Silent copy (no audio track) for narration added elsewhere (e.g. Google Vids); the cue list in the report says where each line starts.
const silentOut = path.join(root, 'submission/DEMO_SILENT.mp4');
run('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-c', 'copy', '-movflags', '+faststart', silentOut]);
// Playwright starts the capture slightly before `videoStart`; shift every cue by that lead so speech lines up with the picture.
const lead = Math.max(0, Math.round(videoSeconds * 1000 - videoEnd));
const out = path.join(root, 'submission/DEMO.mp4');
if (cues.length === 0) {
  run('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-c', 'copy', out]);
} else {
  const inputs = [];
  const filters = [];
  cues.forEach((c, k) => {
    inputs.push('-i', c.wav);
    const delay = String(c.at + lead);
    filters.push(`[${String(k + 1)}:a]adelay=${delay}|${delay}[a${String(k)}]`);
  });
  const mixed = cues.length === 1 ? '[a0]' : `${cues.map((_, k) => `[a${String(k)}]`).join('')}amix=inputs=${String(cues.length)}:normalize=0:dropout_transition=0[mix]`;
  const graph = cues.length === 1 ? `${filters.join(';')};[a0]apad[aout]` : `${filters.join(';')};${mixed};[mix]apad[aout]`;
  run('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, ...inputs, '-filter_complex', graph, '-map', '0:v', '-map', '[aout]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', out]);
}
const duration = probeDuration(out);
const streams = run('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type', '-of', 'csv=p=0', out]).stdout.trim().split('\n');
const sha256 = createHash('sha256').update(readFileSync(out)).digest('hex');
const report = {
  recordedAt: new Date().toISOString(),
  base,
  shots: shots.length,
  narration: { voice: VOICE, rate: Number(RATE), lines: cues.length, speechSeconds: Math.round(cues.reduce((a, c) => a + c.seconds, 0) * 10) / 10, captions: false, leadMs: lead, cues: cues.map((c) => ({ atSeconds: Math.round((c.at + lead) / 100) / 10, seconds: Math.round(c.seconds * 10) / 10, text: c.text })) },
  scriptedSeconds: Math.round(videoEnd / 1000),
  durationSeconds: Math.round(duration * 10) / 10,
  within120to180: duration >= 120 && duration <= 180,
  audioStream: streams.includes('audio'),
  bytes: statSync(out).size,
  sha256,
  output: 'submission/DEMO.mp4',
  silentOutput: 'submission/DEMO_SILENT.mp4',
  silentBytes: statSync(silentOut).size,
};
writeFileSync(path.join(root, 'reports/demo-recording.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`[record-demo] ${report.durationSeconds}s, audio=${String(report.audioStream)}, ${String(cues.length)} lines, sha256 ${sha256.slice(0, 8)}… → submission/DEMO.mp4`);
if (!report.within120to180) { console.error('[record-demo] duration outside 120–180 s'); process.exit(2); }
if (!existsSync(out)) process.exit(1);
