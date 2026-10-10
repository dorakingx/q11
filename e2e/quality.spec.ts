/// <reference lib="dom" />
import { expect, expectNoHorizontalOverflow, openChallenge, openMissions, test } from './helpers';

test('no horizontal overflow and no console errors across every screen', async ({ page }) => {
  await page.goto('/');
  await expectNoHorizontalOverflow(page);
  await page.getByRole('button', { name: 'How it works' }).click();
  await expect(page.getByRole('heading', { name: 'How it works' })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await page.getByTestId('play').click();
  await expectNoHorizontalOverflow(page);
  for (const index of [1, 2, 3, 4, 5, 6]) {
    await page.getByTestId(`mission-${String(index)}`).click();
    await expectNoHorizontalOverflow(page);
    await page.getByTestId('start-mission').click();
    if ((await page.getByTestId('start-challenge').count()) > 0) {
      await expectNoHorizontalOverflow(page); // training
      await page.getByTestId('start-challenge').click();
    }
    await expect(page.getByTestId('confirm')).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await page.getByTestId('block-0').click();
    await page.getByTestId('confirm').click();
    await expect(page.getByTestId('verdict')).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await page.getByTestId('to-result').click();
    await expect(page.getByTestId('result')).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await page.getByRole('button', { name: 'Missions' }).first().click();
  }
});

test('progress persists across reload; corrupt save is reset with a visible notice', async ({ page }) => {
  await openMissions(page);
  await openChallenge(page, 1);
  await page.getByTestId('block-1').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe');
  await page.reload();
  await expect(page.getByText(/Progress: 3 of 18 stars/)).toBeVisible();
  const raw = await page.evaluate(() => localStorage.getItem('q11.save.v1'));
  expect(raw).not.toBeNull();
  expect(JSON.parse(raw ?? '{}')).toMatchObject({ version: 1, progress: { 'first-alarm': { stars: 3, attempts: 1, completed: true } } });

  await page.evaluate(() => localStorage.setItem('q11.save.v1', '{"version":1,"progress":"broken"'));
  await page.reload();
  await expect(page.getByTestId('notice')).toContainText('Saved progress was unreadable and has been reset.');
  await expect(page.getByText(/Progress: 3 of 18 stars/)).toHaveCount(0);
  await page.getByRole('button', { name: 'Dismiss notice' }).click();
  await expect(page.getByTestId('notice')).toHaveCount(0);
  const fresh = await page.evaluate(() => localStorage.getItem('q11.save.v1'));
  expect(JSON.parse(fresh ?? '{}')).toEqual({ version: 1, progress: {}, settings: { sound: false, reducedMotion: false } });
});

test('settings: sound off by default, toggles persist, reset clears progress after confirmation', async ({ page }) => {
  await openMissions(page);
  await openChallenge(page, 1);
  await page.getByTestId('block-1').click();
  await page.getByTestId('confirm').click();
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByTestId('switch-sound')).toHaveAttribute('aria-checked', 'false');
  await page.getByTestId('switch-sound').click();
  await page.getByTestId('switch-motion').click();
  await expect(page.getByTestId('switch-sound')).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('.app')).toHaveAttribute('data-reduced-motion', 'true');
  await page.reload();
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByTestId('switch-sound')).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByTestId('switch-motion')).toHaveAttribute('aria-checked', 'true');
  await page.getByTestId('reset-progress').click();
  await expect(page.getByRole('alertdialog')).toContainText('Reset all progress?');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByTestId('reset-progress').click();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByTestId('notice')).toContainText('Progress reset.');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByText(/of 18 stars/)).toHaveCount(0);
});

test('challenge never exposes the hidden fire in the DOM before confirm (mission 4)', async ({ page }) => {
  await openMissions(page);
  await openChallenge(page, 4);
  const html = await page.locator('main').innerHTML();
  expect(html).not.toContain('IIIIXIIII');
  expect(html).not.toContain('is-burning');
  expect(html).not.toContain('has-residual');
  await expect(page.locator('.glyph-flame')).toHaveCount(0);
});
