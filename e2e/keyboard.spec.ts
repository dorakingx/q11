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
  await expect(page.getByText('Briefing')).toBeVisible();
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
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab');
    if (await page.getByTestId('block-0').evaluate((el) => el === document.activeElement)) break;
  }
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

test('Escape closes the stand-down dialog and the dialog traps initial focus', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('play').click();
  await page.getByTestId('mission-5').click();
  await page.getByTestId('start-mission').click();
  await page.keyboard.press('c');
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Keep dispatching' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('alertdialog')).toHaveCount(0);
  await expect(page.getByTestId('confirm')).toBeVisible();
});
