/// <reference lib="dom" />
import { test as base, expect, type Page } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

export const SHOTS_DIR = path.resolve(process.cwd(), 'reports/screenshots/after');
export const SAVE_KEY = 'q11.save.v1';

/**
 * Every test fails on any console.error or uncaught page error. Collected per page.
 */
export const test = base.extend<{ errors: string[] }>({
  errors: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
    });
    page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
    await use(errors);
    expect(errors, 'no console errors or page errors').toEqual([]);
  },
});

export { expect };

export async function screenshot(page: Page, name: string): Promise<void> {
  mkdirSync(SHOTS_DIR, { recursive: true });
  await page.screenshot({ path: path.join(SHOTS_DIR, `${name}.png`), fullPage: false });
}

export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const m = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(m.scrollWidth, `document.scrollWidth ${String(m.scrollWidth)} <= viewport ${String(m.innerWidth)}`).toBeLessThanOrEqual(m.innerWidth);
  expect(m.bodyScrollWidth).toBeLessThanOrEqual(m.innerWidth);
}

export interface SeedOptions {
  readonly progress?: Record<string, { stars: number; attempts: number; completed: boolean }>;
  readonly freeRoam?: boolean;
  readonly reducedMotion?: boolean;
  readonly sound?: boolean;
  readonly language?: 'en' | 'ja';
  readonly tutorialDone?: boolean;
}

/** Seed a v2 save before the first load (a returning player). Call before page.goto. */
export async function seedSave(page: Page, opts: SeedOptions = {}): Promise<void> {
  const save = {
    version: 2,
    progress: opts.progress ?? {},
    settings: { sound: opts.sound ?? false, reducedMotion: opts.reducedMotion ?? false, language: opts.language ?? 'en', freeRoam: opts.freeRoam ?? false },
    tutorialDone: opts.tutorialDone ?? true,
  };
  await page.addInitScript(
    ({ key, value }) => {
      if (localStorage.getItem('__q11_seeded__') === null) {
        localStorage.setItem(key, value);
        localStorage.setItem('__q11_seeded__', '1');
      }
    },
    { key: SAVE_KEY, value: JSON.stringify(save) },
  );
}

export async function readSave(page: Page): Promise<{ version: number; progress: Record<string, { stars: number; attempts: number; completed: boolean }>; settings: Record<string, unknown>; tutorialDone: boolean }> {
  const raw = await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY);
  return JSON.parse(raw ?? '{}') as never;
}

/** Title → Play → city map (expects a returning player, i.e. a seeded save). */
export async function openCity(page: Page): Promise<void> {
  await page.goto('/');
  await expect(page.getByTestId('play')).toBeVisible();
  await page.getByTestId('play').click();
  await expect(page.getByTestId('city-map')).toBeVisible();
}

/** City → district panel → Dispatch! → (skip the truck) → briefing. */
export async function goToDistrict(page: Page, index: number): Promise<void> {
  await page.getByTestId(`mission-${String(index)}`).click();
  await expect(page.getByTestId('dispatch-go')).toBeVisible();
  await page.getByTestId('dispatch-go').click();
  const skip = page.getByTestId('travel-skip');
  try {
    await skip.click({ timeout: 800, force: true });
  } catch {
    /* the drive already finished or motion is reduced */
  }
  await expect(page.getByTestId('briefing')).toBeVisible();
}

/** Briefing → (training) → challenge. `through: 'training'` walks every lesson (tapping a house when asked to predict). */
export async function startChallenge(page: Page, opts: { through?: 'training' | 'skip' } = {}): Promise<void> {
  const skipBtn = page.getByTestId('briefing-skip');
  if ((await skipBtn.count()) > 0 && opts.through !== 'training') {
    await skipBtn.click();
  } else {
    await page.getByTestId('start-mission').click();
    for (let i = 0; i < 24; i++) {
      if ((await page.getByTestId('confirm').count()) > 0) break;
      if ((await page.getByTestId('predict-prompt').count()) > 0) {
        await page.getByTestId('block-1').click();
        await expect(page.getByTestId('predict-reaction')).toBeVisible();
      } else {
        await page.getByTestId('training-next').click();
      }
    }
  }
  await expect(page.getByTestId('confirm')).toBeVisible();
}

export async function openChallenge(page: Page, index: number, opts: { through?: 'training' | 'skip' } = {}): Promise<void> {
  await goToDistrict(page, index);
  await startChallenge(page, opts);
}

/** Spray! → skip the showpiece → result overlay. */
export async function sprayAndSkip(page: Page): Promise<void> {
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('spray-player')).toBeVisible();
  const skip = page.getByTestId('spray-skip');
  if (await skip.isEnabled({ timeout: 300 }).catch(() => false)) await skip.click({ timeout: 2000 }).catch(() => undefined);
  await expect(page.getByTestId('result-overlay')).toBeVisible({ timeout: 10_000 });
}

/** Reduced motion: press "Next frame" until the result overlay appears (tolerates the disabled final-state button). */
export async function stepSprayToEnd(page: Page, viaKeyboard = false): Promise<void> {
  await expect(page.getByTestId('spray-player')).toHaveAttribute('data-reduced-motion', 'true');
  for (let i = 0; i < 16; i++) {
    if ((await page.getByTestId('result-overlay').count()) > 0) break;
    const next = page.getByTestId('spray-next');
    // isEnabled would wait for a detached locator forever once the player unmounts: bound it.
    const enabled = await next.isEnabled({ timeout: 300 }).catch(() => false);
    if (!enabled) {
      await page.waitForTimeout(100);
      continue;
    }
    if (viaKeyboard) {
      await next.focus();
      await page.keyboard.press('Enter');
    } else {
      await next.click({ timeout: 2000 }).catch(() => undefined);
    }
  }
  await expect(page.getByTestId('result-overlay')).toBeVisible();
}

export async function allBlocksLargeEnough(page: Page, min = 48): Promise<void> {
  const boxes = await page.locator('button.block').evaluateAll((els) => els.map((e) => e.getBoundingClientRect()).map((r) => ({ w: r.width, h: r.height })));
  expect(boxes.length).toBeGreaterThan(0);
  for (const b of boxes) {
    expect(b.w, `block width ≥ ${String(min)}`).toBeGreaterThanOrEqual(min);
    expect(b.h, `block height ≥ ${String(min)}`).toBeGreaterThanOrEqual(min);
  }
}

/** Returns every element's accessible name for the fogged houses with the index stripped (secrecy check). */
export async function serialisedHouses(page: Page): Promise<string[]> {
  return page.locator('button.block').evaluateAll((els) =>
    els.map((e, q) => {
      const html = e.outerHTML;
      return html.replaceAll(`block-${String(q)}`, 'block-N').replaceAll(`data-q="${String(q)}"`, 'data-q="N"').replaceAll(`House ${String(q)},`, 'House N,').replaceAll(`家 ${String(q)}、`, '家 N、');
    }),
  );
}
