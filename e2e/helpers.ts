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

/** The app's primary red (tokens.css --primary) and the computed font of a primary button. */
export const PRIMARY_RGB = 'rgb(201, 58, 34)';

export async function expectPrimaryButton(page: Page, testId: string): Promise<void> {
  const style = await page.getByTestId(testId).evaluate((el) => {
    const cs = getComputedStyle(el);
    return { bg: cs.backgroundColor, color: cs.color, weight: cs.fontWeight };
  });
  expect(style.bg, `${testId} background`).toBe(PRIMARY_RGB);
  expect(style.color, `${testId} colour`).toBe('rgb(255, 255, 255)');
  expect(Number(style.weight), `${testId} weight`).toBeGreaterThanOrEqual(700);
}

/**
 * After "Next district": the city map is back with the just-solved district celebrating (badge toast under the HUD,
 * never over it) and the next district pre-selected (panel open, district pressed); focus is on the city heading.
 */
export async function expectCityArrival(page: Page, opts: { readonly badge?: string; readonly selected: number; readonly selectedName: string }): Promise<void> {
  await expect(page.getByTestId('city-map')).toBeVisible();
  await expect(page.locator('main h1')).toHaveText('Quantum City');
  await expect(page.locator('main h1')).toBeFocused();
  if (opts.badge !== undefined) {
    const toast = page.getByTestId('toast-badge');
    await expect(toast).toContainText(`${opts.badge} earned!`);
    // The toast auto-hides after a few seconds; measure it only while it is still there (its placement is
    // asserted deterministically in city.spec).
    const hud = await page.locator('.city-hud').boundingBox();
    const box = await toast.boundingBox({ timeout: 1500 }).catch(() => null);
    expect(hud).not.toBeNull();
    if (hud !== null && box !== null) expect(box.y, 'the badge toast sits below the HUD').toBeGreaterThanOrEqual(hud.y + hud.height - 1);
  }
  await expect(page.getByTestId('city-panel')).toBeVisible();
  await expect(page.getByTestId('city-panel')).toContainText(opts.selectedName);
  await expect(page.getByTestId(`mission-${String(opts.selected)}`)).toHaveAttribute('aria-pressed', 'true');
}

/** The result overlay of a failed dispatch: Try again is the primary button, the city a ghost one. */
export async function expectFailedResultActions(page: Page): Promise<void> {
  await expectPrimaryButton(page, 'result-retry');
  await expect(page.getByTestId('result-next')).toHaveText('Back to the city');
  const ghost = await page.getByTestId('result-next').evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(ghost).toBe('rgba(0, 0, 0, 0)');
}

/** The three tutorial callouts read 1 → 2 → 3 from top to bottom (and in DOM order on compact layouts). */
export async function expectTutorialOrder(page: Page): Promise<void> {
  const tops = await page.evaluate(() => [1, 2, 3].map((n) => document.querySelector(`[data-testid="tutorial-callout-${String(n)}"]`)?.getBoundingClientRect().top ?? NaN));
  expect(tops[0]).toBeLessThan(tops[1] ?? NaN);
  expect(tops[1]).toBeLessThan(tops[2] ?? NaN);
  const domOrder = await page.evaluate(() => {
    const els = [1, 2, 3].map((n) => document.querySelector(`[data-testid="tutorial-callout-${String(n)}"]`));
    if (els.some((e) => e === null)) return false;
    return (els[0]!.compareDocumentPosition(els[1]!) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0 && (els[1]!.compareDocumentPosition(els[2]!) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
  });
  expect(domOrder, 'callouts 1, 2, 3 follow each other in the DOM').toBe(true);
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

/**
 * Pause the page's clock (Playwright fake timers; the test must have called `page.clock.install()` before its first
 * navigation) just ahead of its current reading. From here `performance.now()`, requestAnimationFrame and timers only
 * move through `page.clock.runFor()` / `page.clock.resume()`, so a replay mounted after this call sits at t = 0 until
 * the test advances it — every transient frame can then be asserted at a known timeline instant, whatever the load.
 */
export async function freezeClock(page: Page): Promise<void> {
  const now = await page.evaluate(() => Date.now());
  await page.clock.pauseAt(now + 1000);
}

/** Spray! → skip the showpiece → result overlay. */
export async function sprayAndSkip(page: Page): Promise<void> {
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('spray-player')).toBeVisible();
  const skip = page.getByTestId('spray-skip');
  if (await skip.isEnabled({ timeout: 300 }).catch(() => false)) await skip.click({ timeout: 2000 }).catch(() => undefined);
  await expect(page.getByTestId('result-overlay')).toBeVisible({ timeout: 10_000 });
}

/**
 * Reduced motion: press "Next frame" until the result overlay appears (tolerates the disabled final-state button).
 * Lane boards add the propagation prelude (fires start → one frame per gate → fires arrive): up to 16 frames on
 * Conversion Lab with two crews, so the walk allows 24 presses.
 */
export async function stepSprayToEnd(page: Page, viaKeyboard = false): Promise<void> {
  await expect(page.getByTestId('spray-player')).toHaveAttribute('data-reduced-motion', 'true');
  for (let i = 0; i < 24; i++) {
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
