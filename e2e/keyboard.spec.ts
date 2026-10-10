/// <reference lib="dom" />
import { expect, test } from './helpers';

test('mission 1 can be played with the keyboard only', async ({ page }) => {
  await page.goto('/');
  // Title: Tab to Play, Enter.
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('play')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Missions' })).toBeVisible();
  // Missions: Tab until mission 1 has focus, Enter.
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    if (await page.getByTestId('mission-1').evaluate((el) => el === document.activeElement)) break;
  }
  await expect(page.getByTestId('mission-1')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Briefing', { exact: true })).toBeVisible();
  // Briefing: Tab to "Start training", Enter; Training: Tab to "Skip to dispatch", Enter.
  for (let i = 0; i < 10; i++) {
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

  // Challenge: "1" selects the red crew, Tab to block 0, ArrowRight to block 1, Space places, "c" confirms.
  await page.keyboard.press('1');
  await expect(page.getByTestId('palette-X')).toHaveAttribute('aria-checked', 'true');
  // Tab order: palette (one stop) → blocks → actions.
  const visited: string[] = [];
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab');
    visited.push(await page.evaluate(() => (document.activeElement as HTMLElement | null)?.dataset['testid'] ?? ''));
    if (await page.getByTestId('block-0').evaluate((el) => el === document.activeElement)) break;
  }
  expect(visited.indexOf('palette-X')).toBeGreaterThanOrEqual(0);
  expect(visited.indexOf('palette-X')).toBeLessThan(visited.indexOf('block-0'));
  expect(visited).not.toContain('confirm');
  await expect(page.getByTestId('block-0')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByTestId('block-1')).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByTestId('budget')).toContainText('Crews: 1 / 1');
  await expect(page.getByTestId('block-1')).toHaveAttribute('aria-pressed', 'true');
  // Backspace clears, Enter re-places, ArrowLeft/Right move focus.
  await page.keyboard.press('Backspace');
  await expect(page.getByTestId('budget')).toContainText('Crews: 0 / 1');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('budget')).toContainText('Crews: 1 / 1');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByTestId('block-2')).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByTestId('block-1')).toBeFocused();
  await page.keyboard.press('c');
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe');
});

test('the stand-down dialog is modal: inert app, Tab trapped, Escape closes, focus returns to the opener', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('play').click();
  await page.getByTestId('mission-5').click();
  await page.getByTestId('start-mission').click();
  // Focus lands on the screen heading, so the "c" shortcut is live.
  await expect(page.locator('main h1')).toBeFocused();
  await page.keyboard.press('c');
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Keep dispatching' })).toBeFocused();
  await expect(page.locator('[data-inert-root]')).toHaveAttribute('inert', '');
  // Tab cycles inside the dialog only.
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Stand down' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Keep dispatching' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Stand down' })).toBeFocused();
  // Shortcuts do not reach the dispatch screen while the dialog is open.
  await page.keyboard.press('1');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('alertdialog')).toHaveCount(0);
  await expect(page.locator('[data-inert-root]')).not.toHaveAttribute('inert', '');
  await expect(page.locator('main h1')).toBeFocused(); // the opener (focus was on the heading when "c" was pressed)
  await expect(page.getByTestId('confirm')).toBeVisible();

  // Opened from the Confirm button, focus returns to that button.
  await page.getByTestId('confirm').click();
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('confirm')).toBeFocused();

  // Shortcuts are inert while focus is outside the dispatch screen (body).
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.keyboard.press('2');
  await expect(page.getByTestId('palette-Z')).toHaveAttribute('aria-checked', 'false');
  await page.getByTestId('palette-X').focus();
  await page.keyboard.press('2');
  await expect(page.getByTestId('palette-Z')).toHaveAttribute('aria-checked', 'true');
});
