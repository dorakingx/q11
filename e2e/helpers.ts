/// <reference lib="dom" />
import { test as base, expect, type Page } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

export const SHOTS_DIR = path.resolve(process.cwd(), 'reports/screenshots');

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

/** Title → Play → mission list. */
export async function openMissions(page: Page): Promise<void> {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Q11/ })).toBeVisible();
  await page.getByTestId('play').click();
  await expect(page.getByRole('heading', { name: 'Missions' })).toBeVisible();
}

/** Mission list → briefing → (training) → challenge. */
export async function openChallenge(page: Page, index: number, opts: { through?: 'training' | 'skip' } = {}): Promise<void> {
  await page.getByTestId(`mission-${String(index)}`).click();
  await expect(page.getByText('Briefing', { exact: true })).toBeVisible();
  const start = page.getByTestId('start-mission');
  await start.click();
  if ((await page.getByTestId('start-challenge').count()) > 0) {
    if (opts.through === 'training') {
      // Walk every lesson step with Next until the challenge appears.
      for (let i = 0; i < 20; i++) {
        if ((await page.getByTestId('confirm').count()) > 0) break;
        await page.getByTestId('training-next').click();
      }
    } else {
      await page.getByTestId('start-challenge').click();
    }
  }
  await expect(page.getByTestId('confirm')).toBeVisible();
}

export async function allBlocksLargeEnough(page: Page): Promise<void> {
  const boxes = await page.locator('button.block').evaluateAll((els) => els.map((e) => e.getBoundingClientRect()).map((r) => ({ w: r.width, h: r.height })));
  expect(boxes.length).toBeGreaterThan(0);
  for (const b of boxes) {
    expect(b.w, 'block width ≥ 44').toBeGreaterThanOrEqual(44);
    expect(b.h, 'block height ≥ 44').toBeGreaterThanOrEqual(44);
  }
}
