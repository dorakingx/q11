/// <reference lib="dom" />
import { expect, expectNoHorizontalOverflow, expectPrimaryButton, openCity, readSave, SAVE_KEY, screenshot, seedSave, stepSprayToEnd, test } from './helpers';

test('city: locked districts toast, Dispatch! drives the truck (skippable), free roam opens every district', async ({ page }, info) => {
  await seedSave(page, { progress: { 'first-alarm': { stars: 3, attempts: 1, completed: true } } });
  await openCity(page);
  // Focus lands on the city heading (outside the brand button, whose name starts with its visible text).
  await expect(page.locator('main h1')).toHaveText('Quantum City');
  await expect(page.locator('main h1')).toBeFocused();
  await expect(page.getByTestId('city-title')).toHaveAccessibleName('Q11 Quantum City — back to title');
  await expect(page.getByTestId('mission-1')).toHaveAccessibleName('1 Rowhouse Lane — Safe, 3 of 3 stars');
  await expect(page.getByTestId('mission-1')).toHaveAttribute('data-status', 'solved');
  await expect(page.getByTestId('mission-2')).toHaveAttribute('data-status', 'available');
  await expect(page.getByTestId('mission-4')).toHaveAttribute('data-status', 'locked');
  // Locked: a toast naming the next open district (below the HUD), no navigation.
  await page.getByTestId('mission-4').click();
  await expect(page.getByTestId('toast-locked')).toContainText('Districts open in order — Harbor Bridge is next.');
  const hud = await page.locator('.city-hud').boundingBox();
  const toast = await page.getByTestId('toast-locked').boundingBox();
  expect(toast?.y ?? 0).toBeGreaterThanOrEqual((hud?.y ?? 0) + (hud?.height ?? 0) - 1);
  await expect(page.getByTestId('city-panel')).toBeHidden();
  // Available: panel with the kid goal; Dispatch! is the white-on-red primary; → truck travel overlay → Skip → briefing.
  await page.getByTestId('mission-2').click();
  await expect(page.getByTestId('city-panel')).toBeVisible();
  await expect(page.getByTestId('city-panel')).toContainText('Watch the fire cross the bridge gate');
  await expectPrimaryButton(page, 'dispatch-go');
  const goFont = await page.getByTestId('dispatch-go').evaluate((el) => getComputedStyle(el).fontSize);
  expect(parseFloat(goFont)).toBeCloseTo(18.4, 0);
  if ((page.viewportSize()?.width ?? 1280) < 1024) {
    // Phone / tablet bottom sheet: the page reserves the sheet's real height so the map is never covered.
    const sheet = await page.getByTestId('city-panel').boundingBox();
    const reserved = await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('main.screen-city') as HTMLElement).paddingBottom));
    expect(reserved).toBeGreaterThanOrEqual((sheet?.height ?? 0) - 1);
  }
  if (info.project.name === 'desktop-chromium') await screenshot(page, 'city-panel-1280x800');
  await page.getByTestId('dispatch-go').click();
  await expect(page.getByTestId('travel-overlay')).toBeVisible();
  await expect(page.getByTestId('travel-truck')).toBeVisible();
  // force: the drive runs on requestAnimationFrame, which parallel (occluded) Chromium pages throttle; the
  // stability check would otherwise wait on the same frames the truck is waiting for.
  // WebKit can finish the 1.5 s drive before this click runs; skipping is optional, arriving is what matters.
  const skip = page.getByTestId('travel-skip');
  if (await skip.isVisible().catch(() => false)) await skip.click({ force: true }).catch(() => undefined);
  await expect(page.getByTestId('briefing')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Harbor Bridge');
  await expectNoHorizontalOverflow(page);
  // Free roam from Settings opens the old town directly.
  await page.getByTestId('topbar-settings').click();
  await page.getByTestId('switch-free-roam').click();
  await expect(page.getByTestId('switch-free-roam')).toHaveAttribute('aria-checked', 'true');
  await page.getByTestId('back').click();
  await page.getByTestId('topbar-city').click();
  await expect(page.getByTestId('free-roam')).toBeVisible();
  await expect(page.getByTestId('mission-6')).toHaveAttribute('data-status', 'available');
  await page.getByTestId('mission-6').click();
  await expect(page.getByTestId('city-panel')).toContainText('Old Town');
});

test('the truck drive finishes on its own (≈1.5 s) and dispatches exactly once', async ({ page }) => {
  await seedSave(page, {});
  await openCity(page);
  await page.getByTestId('mission-1').click();
  await page.getByTestId('dispatch-go').click();
  await expect(page.getByTestId('travel-overlay')).toBeVisible();
  await expect(page.getByTestId('briefing')).toBeVisible({ timeout: 10_000 });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Rowhouse Lane');
});

test('persistence: a v1 save migrates to v2 with progress and settings kept and no reset notice; corrupt data resets with a notice', async ({ page }) => {
  await page.addInitScript(
    ({ key }) => {
      if (localStorage.getItem('__q11_seeded__') === null) {
        localStorage.setItem(key, JSON.stringify({ version: 1, progress: { 'first-alarm': { stars: 3, attempts: 2, completed: true }, 'red-forward-blue-backward': { stars: 2, attempts: 1, completed: true } }, settings: { sound: true, reducedMotion: false } }));
        localStorage.setItem('__q11_seeded__', '1');
      }
    },
    { key: SAVE_KEY },
  );
  await page.goto('/');
  await expect(page.getByTestId('notice')).toHaveCount(0);
  await expect(page.getByTestId('title-progress')).toHaveText('Progress: 5 of 16 stars.');
  const save = await readSave(page);
  expect(save).toMatchObject({ version: 2, tutorialDone: true, settings: { sound: true, reducedMotion: false, language: 'en', freeRoam: false } });
  expect(save.progress['first-alarm']).toEqual({ stars: 3, attempts: 2, completed: true });
  await page.getByTestId('play').click();
  await expect(page.getByTestId('mission-2')).toHaveAttribute('data-status', 'solved');
  await expect(page.getByTestId('mission-3')).toHaveAttribute('data-status', 'available');
  await expect(page.getByTestId('city-badges')).toContainText('Gate Tracker');

  await page.evaluate((key) => localStorage.setItem(key, '{"version":1,"progress":"broken"'), SAVE_KEY);
  await page.reload();
  await expect(page.getByTestId('notice')).toContainText('Saved progress was unreadable and has been reset.');
  await expect(page.getByTestId('title-progress')).toHaveCount(0);
  await page.getByRole('button', { name: 'Dismiss notice' }).click();
  await expect(page.getByTestId('notice')).toHaveCount(0);
  const fresh = await readSave(page);
  expect(fresh).toEqual({ version: 2, progress: {}, settings: { sound: false, reducedMotion: false, language: 'en', freeRoam: false }, tutorialDone: false });
});

test('settings: toggles persist across reload; reset clears progress after confirmation', async ({ page }) => {
  await seedSave(page, { progress: { 'first-alarm': { stars: 3, attempts: 1, completed: true } } });
  await page.goto('/');
  await page.getByTestId('settings').click();
  await expect(page.getByTestId('switch-sound')).toHaveAttribute('aria-checked', 'false');
  await page.getByTestId('switch-sound').click();
  await page.getByTestId('switch-motion').click();
  await expect(page.locator('.app')).toHaveAttribute('data-reduced-motion', 'true');
  await expect(page.getByTestId('settings-storage')).toContainText('localStorage');
  await page.reload();
  await page.getByTestId('settings').click();
  await expect(page.getByTestId('switch-sound')).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByTestId('switch-motion')).toHaveAttribute('aria-checked', 'true');
  await page.getByTestId('reset-progress').click();
  await expect(page.getByRole('alertdialog')).toContainText('Reset all progress?');
  await expect(page.locator('[data-inert-root]')).toHaveAttribute('inert', '');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByTestId('reset-progress').click();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByTestId('notice')).toContainText('Progress reset.');
  await page.getByTestId('back').click();
  await expect(page.getByTestId('notice')).toHaveCount(0);
  await expect(page.getByTestId('title-progress')).toHaveCount(0);
});

test('summary after the old town: badges, stars and the free-roam hint', async ({ page }) => {
  const done = { stars: 3, attempts: 1, completed: true } as const;
  await seedSave(page, { reducedMotion: true, progress: { 'first-alarm': done, 'red-forward-blue-backward': done, 'color-switch': done, 'blind-dispatch': done, 'two-kinds-of-trouble': done } });
  await openCity(page);
  await page.getByTestId('mission-6').click();
  await page.getByTestId('dispatch-go').click();
  await page.getByTestId('start-mission').click();
  await page.getByTestId('block-0').click();
  await page.getByTestId('confirm').click();
  await stepSprayToEnd(page);
  await expect(page.getByTestId('result-next')).toHaveText('Summary');
  await page.getByTestId('result-next').click();
  await expect(page.getByTestId('summary')).toBeVisible();
  await expect(page.getByTestId('summary')).toContainText('Investigator');
  await expect(page.locator('.badge-item[data-earned="true"]')).toHaveCount(6);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Shift complete');
  await expect(page.getByTestId('summary')).toContainText('Turn on Free roam in Settings');
  await expect(page.locator('.topbar-sub')).toContainText('16 of 16 stars');
  await expectNoHorizontalOverflow(page);
});
