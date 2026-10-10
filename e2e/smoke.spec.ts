/// <reference lib="dom" />
import { allBlocksLargeEnough, expect, expectNoHorizontalOverflow, expectTutorialOrder, readSave, screenshot, seedSave, serialisedHouses, stepSprayToEnd, test } from './helpers';

test('first run: Play → tutorial scene → three taps → spray → result → city with the chapter badge', async ({ page }, info) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Q11 Emergency — Quantum Emergency Response');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Q11 Emergency');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByTestId('title-kicker')).toHaveText('Quantum Emergency Response');
  await expect(page.getByTestId('title-kicker')).toBeVisible();
  // the kicker sits under the app name and is set smaller than it
  const h1Box = await page.getByRole('heading', { level: 1 }).boundingBox();
  const kickerBox = await page.getByTestId('title-kicker').boundingBox();
  expect(kickerBox?.y ?? 0).toBeGreaterThan(h1Box?.y ?? 0);
  const [h1Size, kickerSize] = await Promise.all([
    page.getByRole('heading', { level: 1 }).evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    page.getByTestId('title-kicker').evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ]);
  expect(kickerSize).toBeLessThan(h1Size);
  await expect(page.getByTestId('lang-toggle')).toBeVisible();
  await expectNoHorizontalOverflow(page);
  const play = page.getByTestId('play');
  const box = await play.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(52);
  await play.click();

  // Tutorial mode: straight into Rowhouse Lane's planning scene, three numbered callouts, fog on every house.
  await expect(page.getByTestId('tutorial-bar')).toBeVisible();
  await expect(page.getByTestId('confirm')).toHaveText('Spray!');
  await expect(page.getByTestId('tutorial-callout-1')).toHaveAttribute('data-active', 'true');
  await expect(page.locator('[data-check][data-ringing="1"]')).toHaveCount(2);
  await expect(page.locator('[data-house][data-house-state="fog"]')).toHaveCount(3);
  const houses = await serialisedHouses(page);
  expect(houses.length).toBe(3);
  for (const h of houses) expect(h).toBe(houses[0]);
  await allBlocksLargeEnough(page);
  await expectNoHorizontalOverflow(page);
  // The numbered callouts read 1 → 2 → 3 top to bottom at every width; ≤1023px they form one strip above the scene
  // and the crew palette comes right after the scene (before the alarms).
  await expectTutorialOrder(page);
  const compact = (page.viewportSize()?.width ?? 1280) <= 1023;
  await expect(page.getByTestId('tutorial-strip')).toHaveCount(compact ? 1 : 0);
  if (compact) {
    const order = await page.evaluate(() => {
      const scene = document.querySelector('[data-scene]');
      const palette = document.querySelector('[data-testid="palette-X"]');
      const alarms = document.querySelector('[data-check="Z0"]');
      if (scene === null || palette === null || alarms === null) return 'missing';
      const after = (a: Element, b: Element) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
      return after(scene, palette) && after(palette, alarms) ? 'scene-palette-alarms' : 'other';
    });
    expect(order).toBe('scene-palette-alarms');
  }
  if (info.project.name === 'desktop-chromium') await screenshot(page, 'tutorial-1280x800');

  await page.getByTestId('palette-X').click();
  await expect(page.getByTestId('tutorial-callout-2')).toHaveAttribute('data-active', 'true');
  await expect(page.getByTestId('tutorial-callout-1')).toHaveAttribute('data-done', 'true');
  await page.getByTestId('block-1').click();
  await expect(page.getByTestId('budget')).toContainText('Crews: 1 / 1');
  await expect(page.getByTestId('tutorial-callout-3')).toHaveAttribute('data-active', 'true');
  await expectTutorialOrder(page);
  await page.getByTestId('confirm').click();

  // Spray showpiece: header, crew runs, stream, then (on skip) the restored result.
  await expect(page.getByRole('heading', { name: 'Training replay: answer check' })).toBeVisible();
  await expect(page.locator('.firefighter[data-crew-q="1"]')).toBeVisible();
  await page.getByTestId('spray-skip').click();
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await expect(page.getByTestId('result-title')).toBeFocused();
  await expect(page.locator('[data-house="1"][data-house-state="restored"]')).toHaveCount(1);
  await expect(page.locator('.detector[data-ringing="true"]')).toHaveCount(0);
  await expect(page.getByTestId('result-next')).toHaveText('Back to the city');
  await expectNoHorizontalOverflow(page);
  await page.getByTestId('result-next').click();

  await expect(page.getByTestId('city-map')).toBeVisible();
  await expect(page.locator('main h1')).toBeFocused();
  await expect(page.getByTestId('toast-badge')).toContainText('Alarm Reader earned!');
  await expect(page.getByTestId('mission-1')).toHaveAttribute('data-status', 'solved');
  await expect(page.getByTestId('mission-2')).toHaveAttribute('data-status', 'available');
  await expect(page.getByTestId('mission-3')).toHaveAttribute('data-status', 'locked');
  await expect(page.getByTestId('city-stars')).toContainText('3 of 16 stars');
  const save = await readSave(page);
  expect(save).toMatchObject({ version: 2, tutorialDone: true, progress: { 'first-alarm': { stars: 3, attempts: 1, completed: true } } });
  await expectNoHorizontalOverflow(page);
});

test('skip tutorial lands on the city; Play afterwards goes to the city, not the tutorial', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('play').click();
  await page.getByTestId('tutorial-skip').click();
  await expect(page.getByTestId('city-map')).toBeVisible();
  await page.reload();
  await expect(page.getByTestId('play')).toHaveText('Play');
  await page.getByTestId('play').click();
  await expect(page.getByTestId('city-map')).toBeVisible();
  await expect(page.locator('main h1')).toBeFocused();
});

test('mission 1 can be played with the keyboard only', async ({ page }, info) => {
  test.skip(info.project.name === 'desktop-webkit', 'WebKit does not move focus with Tab unless the OS "full keyboard access" setting is on');
  await seedSave(page, { reducedMotion: true });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('play')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('city-map')).toBeVisible();
  // City: Tab to the first district, Enter opens the panel, Tab to Dispatch!, Enter (reduced motion: no drive).
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    if (await page.getByTestId('mission-1').evaluate((el) => el === document.activeElement)) break;
  }
  await expect(page.getByTestId('mission-1')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('dispatch-go')).toBeVisible();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    if (await page.getByTestId('dispatch-go').evaluate((el) => el === document.activeElement)) break;
  }
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('briefing')).toBeVisible();
  // Briefing: Tab to "Start training", Enter; Training: Tab to "Skip to dispatch", Enter.
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    if (await page.getByTestId('start-mission').evaluate((el) => el === document.activeElement)) break;
  }
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('training-next')).toBeVisible();
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab');
    if (await page.getByTestId('start-challenge').evaluate((el) => el === document.activeElement)) break;
  }
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('confirm')).toBeVisible();

  // Challenge: "1" selects the red crew, Tab to house 0, ArrowRight to house 1, Space places, "c" sprays.
  await page.keyboard.press('1');
  await expect(page.getByTestId('palette-X')).toHaveAttribute('aria-checked', 'true');
  const visited: string[] = [];
  for (let i = 0; i < 24; i++) {
    await page.keyboard.press('Tab');
    visited.push(await page.evaluate(() => (document.activeElement as HTMLElement | null)?.dataset['testid'] ?? ''));
    if (await page.getByTestId('block-0').evaluate((el) => el === document.activeElement)) break;
  }
  // Wide layout: alarms → palette → scene; compact (≤1023px): scene → palette → alarms, so the chip comes later.
  if ((page.viewportSize()?.width ?? 1280) >= 1024) {
    expect(visited.indexOf('palette-X')).toBeGreaterThanOrEqual(0);
    expect(visited.indexOf('palette-X')).toBeLessThan(visited.indexOf('block-0'));
  } else {
    expect(visited).not.toContain('palette-X');
  }
  expect(visited).not.toContain('confirm');
  await expect(page.getByTestId('block-0')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByTestId('block-1')).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByTestId('budget')).toContainText('Crews: 1 / 1');
  await expect(page.getByTestId('block-1')).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Backspace');
  await expect(page.getByTestId('budget')).toContainText('Crews: 0 / 1');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('budget')).toContainText('Crews: 1 / 1');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByTestId('block-2')).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByTestId('block-1')).toBeFocused();
  await page.keyboard.press('c');
  // Reduced motion: the spray is a stepper; Enter on "Next frame" walks to the end.
  await stepSprayToEnd(page, true);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await expect(page.getByTestId('result-title')).toBeFocused();
});

test('language toggle EN → JA changes the headings, document.title and <html lang>; the setting persists', async ({ page }) => {
  await seedSave(page, {});
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Q11 Emergency');
  await expect(page.getByTestId('title-kicker')).toHaveText('Quantum Emergency Response');
  await expect(page.getByTestId('lang-toggle')).toHaveAccessibleName('Language: EN / JA, switch to 日本語');
  await expect(page.getByTestId('lang-toggle')).toContainText('EN');
  await page.getByTestId('lang-toggle').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Q11 Emergency');
  await expect(page.getByTestId('title-kicker')).toHaveText('クアンタム・エマージェンシー・レスポンス');
  await expect(page).toHaveTitle('Q11 Emergency — クアンタム・エマージェンシー・レスポンス');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  await expect(page.getByTestId('play')).toHaveText('あそぶ');
  await page.getByTestId('play').click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('量子の街');
  await expect(page).toHaveTitle('Q11 Emergency — 街の地図');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  await page.getByTestId('settings').click();
  await expect(page.getByTestId('lang-ja')).toHaveAttribute('aria-pressed', 'true');
  await page.getByTestId('lang-en').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Settings');
});

test('document.title follows the screen and the live region announces each screen', async ({ page }) => {
  await seedSave(page, { reducedMotion: true, freeRoam: true });
  await page.goto('/');
  await expect(page).toHaveTitle('Q11 Emergency — Quantum Emergency Response');
  await expect(page.getByTestId('announcer')).toHaveText('Q11 Emergency title screen.');
  await page.getByTestId('play').click();
  await expect(page).toHaveTitle('Q11 Emergency — City map');
  await expect(page.getByTestId('announcer')).toHaveText('City map.');
  await page.getByTestId('mission-4').click();
  await page.getByTestId('dispatch-go').click();
  await expect(page).toHaveTitle('Q11 Emergency — Mission 4 · Blind Dispatch');
  await expect(page.locator('main h1')).toBeFocused();
  await page.getByTestId('briefing-skip').click();
  await expect(page.getByTestId('announcer')).toHaveText('Mission 4 dispatch. 2 of 8 stations ringing: Z0, Z1.');
  await expect(page.locator('main h1')).toBeFocused();
  // Alarm house lists stay in the accessibility tree even when visually hidden; fogged houses never name watchers.
  await expect(page.locator('[data-check="Z0"] .alarm-blocks')).toHaveText('houses 0, 1, 3, 4');
  await expect(page.getByTestId('block-4')).toHaveAccessibleName(/^House 4, hidden, press to send red \(X\) crew$/);
});
