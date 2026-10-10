/// <reference lib="dom" />
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { expect, openChallenge, openCity, seedSave, test } from './helpers';

/**
 * Input latency (R13): time from a house tap to the DOM update (aria-pressed flips), measured inside the page with
 * performance.now() around a programmatic click + MutationObserver. Samples are attached to the report and written
 * to reports/perf/<project>.json (merged into reports/perf.json by the global teardown).
 */
test('a house tap updates the DOM in under 100 ms', async ({ page }, info) => {
  await seedSave(page, { freeRoam: true, reducedMotion: true });
  await openCity(page);
  await openChallenge(page, 5);
  const samples: number[] = [];
  for (const q of [1, 7, 1, 7, 4, 4]) {
    const ms = await page.evaluate(async (qubit) => {
      const btn = document.querySelector<HTMLButtonElement>(`[data-testid="block-${String(qubit)}"]`);
      if (btn === null) throw new Error('no house button');
      const before = btn.getAttribute('aria-pressed');
      const t0 = performance.now();
      const done = new Promise<number>((resolve, reject) => {
        const mo = new MutationObserver(() => {
          if (btn.getAttribute('aria-pressed') !== before) {
            mo.disconnect();
            resolve(performance.now() - t0);
          }
        });
        mo.observe(btn, { attributes: true, attributeFilter: ['aria-pressed'] });
        setTimeout(() => reject(new Error('no DOM update within 1 s')), 1000);
      });
      btn.click();
      return done;
    }, q);
    samples.push(ms);
  }
  const max = Math.max(...samples);
  const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
  const record = { project: info.project.name, viewport: page.viewportSize(), samplesMs: samples.map((s) => Math.round(s * 100) / 100), maxMs: Math.round(max * 100) / 100, meanMs: Math.round(mean * 100) / 100, measuredAt: new Date().toISOString() };
  await info.attach('input-latency', { body: JSON.stringify(record, null, 2), contentType: 'application/json' });
  const dir = path.resolve(process.cwd(), 'reports/perf');
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, `${info.project.name}.json`), `${JSON.stringify(record, null, 2)}\n`);
  expect(max, `max tap → DOM latency ${String(max)} ms`).toBeLessThan(100);
});
