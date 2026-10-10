/// <reference lib="dom" />
import { expect, expectNoHorizontalOverflow, goToDistrict, screenshot, seedSave, sprayAndSkip, startChallenge, test } from './helpers';

/**
 * Viewport matrix (R6, R14): the same walk at 1440×900, 768×1024, 390×844 and 375×812 — no horizontal overflow on
 * any screen, ≥48 px house buttons, the phone action bar inside the viewport without covering the scene — and the
 * "after" screenshots in reports/screenshots/after/{screen}-{w}x{h}.png. Runs once (desktop-chromium project).
 */
const SIZES: readonly (readonly [number, number])[] = [
  [1440, 900],
  [768, 1024],
  [390, 844],
  [375, 812],
];

for (const [w, h] of SIZES) {
  test(`viewport ${String(w)}×${String(h)}: every screen fits, screenshots written`, async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop-chromium', 'the matrix sets its own viewport; one engine is enough');
    test.setTimeout(240_000);
    await page.setViewportSize({ width: w, height: h });
    const tag = `${String(w)}x${String(h)}`;
    const check = async (name: string) => {
      await expectNoHorizontalOverflow(page);
      await screenshot(page, `${name}-${tag}`);
    };
    await seedSave(page, { freeRoam: true });
    await page.goto('/');
    await check('title');
    await page.getByTestId('settings').click();
    await check('settings');
    await page.getByTestId('back').click();
    await page.getByTestId('how').click();
    await check('how');
    await page.getByTestId('back').click();
    await page.getByTestId('play').click();
    await expect(page.getByTestId('city-map')).toBeVisible();
    await check('city');

    // Briefing + training (Harbor Bridge) with the prediction prompt.
    await goToDistrict(page, 2);
    await check('briefing');
    await page.getByTestId('start-mission').click();
    await expect(page.getByTestId('predict-prompt')).toBeVisible();
    await check('training');
    await page.getByTestId('topbar-city').click();

    // Challenge (Market Square) with a detector highlighted and one plan marker; mobile bar inside the viewport.
    await goToDistrict(page, 5);
    await startChallenge(page);
    await page.getByTestId('detector-Z0').click();
    await page.getByTestId('block-1').click();
    const blocks = await page.locator('button.block').evaluateAll((els) => els.map((e) => e.getBoundingClientRect()).map((r) => ({ w: r.width, h: r.height })));
    for (const b of blocks) {
      expect(b.w).toBeGreaterThanOrEqual(48);
      expect(b.h).toBeGreaterThanOrEqual(48);
    }
    if (w <= 480) {
      const bar = await page.getByTestId('confirm').boundingBox();
      const vh = await page.evaluate(() => window.innerHeight);
      expect(bar).not.toBeNull();
      if (bar !== null) expect(bar.y + bar.height).toBeLessThanOrEqual(vh + 0.5);
      // Scrolling to the bottom never hides the scene under the bar: the page reserves room for it.
      const reserved = await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('main.screen-challenge') as HTMLElement).paddingBottom));
      expect(reserved).toBeGreaterThanOrEqual(96);
    }
    await check('challenge');
    await page.getByTestId('palette-Z').click();
    await page.getByTestId('block-6').click();
    await page.getByTestId('confirm').click();
    await expect(page.locator('.firefighter')).toHaveCount(2, { timeout: 4000 });
    await expectNoHorizontalOverflow(page);
    await screenshot(page, `spray-mid-${tag}`);
    await page.getByTestId('spray-skip').click();
    await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'safe-pattern');
    await check('result-safe-pattern');
    await page.getByTestId('result-why').click();
    await expect(page.getByTestId('why-compare')).toBeVisible();
    await check('why');
    await page.getByTestId('topbar-city').click();

    // The other results (restored → Try again → still burning; silent failure → result screen → summary).
    await goToDistrict(page, 4);
    await startChallenge(page);
    await page.getByTestId('block-4').click();
    await sprayAndSkip(page);
    await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
    await check('result-restored');
    await page.getByTestId('result-retry').click();
    await page.getByTestId('block-0').click();
    await sprayAndSkip(page);
    await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'still-burning');
    await check('result-still-burning');
    await page.getByTestId('topbar-city').click();
    await goToDistrict(page, 6);
    await startChallenge(page);
    await page.getByTestId('block-0').click();
    await sprayAndSkip(page);
    await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'logical-failure');
    await check('result-logical');
    await page.getByTestId('result-details').locator('summary').click();
    await page.getByTestId('to-result').click();
    await expect(page.getByTestId('result')).toBeVisible();
    await check('result-screen');
    await page.getByTestId('next-mission').click();
    await expect(page.getByTestId('summary')).toBeVisible();
    await check('summary');
  });
}
