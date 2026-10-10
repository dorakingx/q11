/// <reference lib="dom" />
import type { Locator, Page } from '@playwright/test';
import { expect, expectNoHorizontalOverflow, goToDistrict, seedSave, startChallenge, test } from './helpers';

/**
 * Japanese fit pass (R6, R14 in JA): the longer Japanese copy and the "11Q Emergency" brand on the two phone sizes —
 * title, city map, briefing, challenge (planning bar), a result overlay and Why?. No horizontal overflow anywhere,
 * every primary button at least 48 px tall, the brand chip and the title inside the viewport. Runs once per size
 * (desktop-chromium project sets its own viewport).
 */
const SIZES: readonly (readonly [number, number])[] = [
  [375, 812],
  [390, 844],
];

async function expectTall(page: Page, testId: string, min = 48): Promise<void> {
  const box = await page.getByTestId(testId).boundingBox();
  expect(box, `${testId} is rendered`).not.toBeNull();
  if (box !== null) expect(box.height, `${testId} height ≥ ${String(min)}`).toBeGreaterThanOrEqual(min);
}

async function expectInsideViewport(page: Page, locator: Locator, what: string): Promise<void> {
  const box = await locator.boundingBox();
  const vw = await page.evaluate(() => window.innerWidth);
  expect(box, `${what} is rendered`).not.toBeNull();
  if (box !== null) {
    expect(box.x, `${what} left edge`).toBeGreaterThanOrEqual(-0.5);
    expect(box.x + box.width, `${what} right edge ≤ ${String(vw)}`).toBeLessThanOrEqual(vw + 0.5);
  }
}

for (const [w, h] of SIZES) {
  test(`日本語 ${String(w)}×${String(h)}: title, city, briefing, challenge, result and Why? fit; the brand reads 11Q`, async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop-chromium', 'the JA matrix sets its own viewport; one engine is enough');
    test.setTimeout(180_000);
    await page.setViewportSize({ width: w, height: h });
    await seedSave(page, { language: 'ja', freeRoam: true });
    await page.goto('/');

    // Title: brand, kicker, document title, truck lettering, buttons.
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('11Q Emergency');
    await expect(page.getByTestId('title-kicker')).toHaveText('量子エラー訂正の消防ゲーム');
    await expect(page).toHaveTitle('11Q Emergency — 量子エラー訂正の消防ゲーム');
    await expect(page.locator('.title-card svg[role="img"] text').filter({ hasText: '11Q' })).toHaveCount(1);
    await expect(page.locator('.title-card svg[role="img"] text').filter({ hasText: 'Q11' })).toHaveCount(0);
    await expect(page.getByTestId('play')).toHaveText('あそぶ');
    await expectTall(page, 'play');
    await expectTall(page, 'how');
    await expectInsideViewport(page, page.getByRole('heading', { level: 1 }), 'title h1');
    await expectInsideViewport(page, page.getByTestId('title-kicker'), 'title kicker');
    // The kicker stays on one line at phone width (no mid-word break of the Japanese phrase).
    const kickerLines = await page.getByTestId('title-kicker').evaluate((el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)));
    expect(kickerLines).toBeLessThanOrEqual(1);
    await expectNoHorizontalOverflow(page);

    // City map: HUD brand chip ("11Q" + hidden word), heading, districts with Japanese names.
    await page.getByTestId('play').click();
    await expect(page.getByTestId('city-map')).toBeVisible();
    await expect(page).toHaveTitle('11Q Emergency — 街の地図');
    await expect(page.locator('main h1')).toHaveText('量子の街');
    await expect(page.getByTestId('city-title')).toHaveAccessibleName('11Q Emergency — タイトルにもどる');
    await expect(page.getByTestId('city-title').locator('svg text').filter({ hasText: '11Q' })).toHaveCount(1);
    await expectInsideViewport(page, page.getByTestId('city-title'), 'city brand chip');
    await expectInsideViewport(page, page.locator('main h1'), 'city heading');
    await expect(page.getByTestId('mission-1')).toHaveAccessibleName(/^1 ながや通り — /);
    await expectNoHorizontalOverflow(page);
    await page.getByTestId('mission-2').click();
    await expect(page.getByTestId('city-panel')).toContainText('みなと橋');
    await expectTall(page, 'dispatch-go');
    // The fact-row label 「ベスト記録」 stays on one line (no break inside the compound 記録).
    const bestLabel = page.getByTestId('city-panel').locator('.city-fact-row dt').filter({ hasText: 'ベスト記録' });
    await expect(bestLabel).toHaveCount(1);
    const bestLines = await bestLabel.evaluate((el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)));
    expect(bestLines).toBeLessThanOrEqual(1);
    await expectNoHorizontalOverflow(page);

    // Briefing (みなと橋).
    await page.getByTestId('dispatch-go').click();
    const skip = page.getByTestId('travel-skip');
    try {
      await skip.click({ timeout: 800, force: true });
    } catch {
      /* the drive already finished */
    }
    await expect(page.getByTestId('briefing')).toBeVisible();
    await expect(page.locator('main')).toContainText('みなと橋');
    await expect(page.getByTestId('briefing')).toContainText('今回の通報');
    await expect(page).toHaveTitle(/^11Q Emergency — ミッション 2 · /);
    await expectTall(page, 'start-mission');
    // Phone-width top bars drop the brand chip by design (CSS .topbar .brand); the district title must still fit.
    await expect(page.locator('.topbar .brand')).toBeHidden();
    await expect(page.locator('.topbar-h')).toHaveText('みなと橋');
    await expectInsideViewport(page, page.locator('.topbar-h'), 'briefing top bar title');
    await expectNoHorizontalOverflow(page);
    await page.getByTestId('topbar-city').click();

    // Challenge (市場ひろば) with a station highlighted and one crew planned: the planning bar fits and is tall enough.
    await goToDistrict(page, 5);
    await startChallenge(page);
    await expect(page.getByTestId('confirm')).toHaveText('放水！');
    await page.getByTestId('detector-Z0').click();
    await expect(page.getByTestId('detector-watch')).toContainText('Z0 は家');
    await page.getByTestId('block-1').click();
    await expect(page.getByTestId('budget')).toContainText('隊：1 / 2');
    await expectTall(page, 'confirm');
    const bar = await page.getByTestId('confirm').boundingBox();
    const vh = await page.evaluate(() => window.innerHeight);
    expect(bar).not.toBeNull();
    if (bar !== null) expect(bar.y + bar.height).toBeLessThanOrEqual(vh + 0.5);
    await expect(page.getByTestId('block-4')).toHaveAccessibleName(/^家 4、かくれている、/);
    await expectNoHorizontalOverflow(page);

    // Result overlay (safe pattern) and Why?.
    await page.getByTestId('palette-Z').click();
    await page.getByTestId('block-6').click();
    await page.getByTestId('confirm').click();
    await expect(page.getByTestId('spray-player')).toBeVisible();
    await expectNoHorizontalOverflow(page);
    const sprySkip = page.getByTestId('spray-skip');
    if (await sprySkip.isEnabled({ timeout: 300 }).catch(() => false)) await sprySkip.click({ timeout: 2000 }).catch(() => undefined);
    await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'safe-pattern', { timeout: 10_000 });
    await expect(page.getByTestId('result-overlay')).toContainText('安全なパターン');
    await expect(page.getByTestId('result-next')).toHaveText('つぎの地区へ');
    await expectTall(page, 'result-next');
    await expectTall(page, 'result-why');
    await expectInsideViewport(page, page.getByTestId('result-overlay'), 'result overlay');
    await expectNoHorizontalOverflow(page);
    await page.getByTestId('result-why').click();
    await expect(page.getByTestId('why-compare')).toBeVisible();
    await expect(page.getByTestId('why-compare')).toContainText('あなたの放水');
    await expectInsideViewport(page, page.getByTestId('why-compare'), 'why panel');
    await expectNoHorizontalOverflow(page);
  });
}
