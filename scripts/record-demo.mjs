#!/usr/bin/env node
/**
 * record-demo — drives the REAL built app with Playwright and records the screen to submission/DEMO.mp4.
 * The shot list (scripts/demo-shots.json) is a sequence of actions:
 *   { "type": "goto", "url": "/" }                       navigate (relative to base)
 *   { "type": "click", "selector": "button:has-text('Play')" }
 *   { "type": "press", "key": "Enter" }
 *   { "type": "caption", "text": "…", "ms": 3000 }        burn a caption bar into the page for ms
 *   { "type": "wait", "ms": 1200 }
 *   { "type": "viewport", "width": 390, "height": 844 }    (mobile insert; opens a second context)
 * Requires: `npm run build && npm run preview` running on http://localhost:4173 (or BASE_URL), ffmpeg on PATH.
 * Output: submission/DEMO.mp4 (git-ignored) + reports/demo-recording.json (duration, sha256). Never uploads anything.
 */
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const base = process.env.BASE_URL ?? 'http://localhost:4173';
const shots = JSON.parse(readFileSync(path.join(root, process.argv[2] ?? 'scripts/demo-shots.json'), 'utf8'));
const videoDir = path.join(root, 'submission/raw');
mkdirSync(videoDir, { recursive: true });
mkdirSync(path.join(root, 'reports'), { recursive: true });

const CAPTION_CSS = `#q11-demo-caption{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);max-width:88vw;background:rgba(5,12,28,.92);color:#fff;font:600 22px/1.3 system-ui,sans-serif;padding:12px 20px;border-radius:12px;z-index:99999;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.4)}`;
async function caption(page, text) {
  await page.evaluate(({ text, css }) => {
    if (!document.getElementById('q11-demo-caption-style')) { const s = document.createElement('style'); s.id = 'q11-demo-caption-style'; s.textContent = css; document.head.appendChild(s); }
    let el = document.getElementById('q11-demo-caption');
    if (!el) { el = document.createElement('div'); el.id = 'q11-demo-caption'; document.body.appendChild(el); }
    el.textContent = text; el.style.display = text ? 'block' : 'none';
  }, { text, css: CAPTION_CSS });
}

const browser = await chromium.launch();
const segments = [];
let ctx = null, page = null, viewport = { width: 1280, height: 800 };
async function openContext() {
  if (ctx) { await ctx.close(); }
  ctx = await browser.newContext({ viewport, recordVideo: { dir: videoDir, size: viewport }, reducedMotion: 'no-preference', deviceScaleFactor: 1 });
  page = await ctx.newPage();
  page.on('pageerror', (e) => console.error('[pageerror]', e.message));
  segments.push({ viewport: { ...viewport }, pagePromise: page.video().path() });
}
await openContext();
const started = Date.now();
for (const s of shots) {
  if (s.type === 'goto') await page.goto(base + (s.url ?? '/'), { waitUntil: 'networkidle' });
  else if (s.type === 'click') await page.locator(s.selector).first().click({ timeout: s.timeout ?? 10_000 });
  else if (s.type === 'press') await page.keyboard.press(s.key);
  else if (s.type === 'wait') await page.waitForTimeout(s.ms ?? 1000);
  else if (s.type === 'caption') { await caption(page, s.text ?? ''); if (s.ms) await page.waitForTimeout(s.ms); }
  else if (s.type === 'clear-caption') await caption(page, '');
  else if (s.type === 'viewport') { viewport = { width: s.width, height: s.height }; await openContext(); }
  else throw new Error('unknown shot type ' + s.type);
}
const elapsed = (Date.now() - started) / 1000;
await ctx.close(); await browser.close();

// Assemble: convert every webm segment to mp4 (scaled/padded to 1280x800) then concat.
const list = [];
let i = 0;
for (const seg of segments) {
  const webm = await seg.pagePromise;
  const mp4 = path.join(videoDir, `segment-${i++}.mp4`);
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', webm, '-vf', 'scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2:color=0x0b1a33,fps=30', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-an', mp4], { stdio: 'inherit' });
  if (r.status !== 0) process.exit(1);
  list.push(`file '${mp4}'`);
}
writeFileSync(path.join(videoDir, 'concat.txt'), list.join('\n') + '\n');
const out = path.join(root, 'submission/DEMO.mp4');
const c = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(videoDir, 'concat.txt'), '-c', 'copy', out], { stdio: 'inherit' });
if (c.status !== 0) process.exit(1);
const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', out], { encoding: 'utf8' });
const duration = parseFloat(probe.stdout.trim());
const sha256 = createHash('sha256').update(readFileSync(out)).digest('hex');
const report = { recordedAt: new Date().toISOString(), base, shots: shots.length, scriptedSeconds: Math.round(elapsed), durationSeconds: Math.round(duration * 10) / 10, within120to180: duration >= 120 && duration <= 180, bytes: statSync(out).size, sha256, output: 'submission/DEMO.mp4' };
writeFileSync(path.join(root, 'reports/demo-recording.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
process.exit(report.within120to180 ? 0 : 3);
