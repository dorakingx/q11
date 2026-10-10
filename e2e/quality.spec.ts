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
  await expect(page.getByText(/Progress: 3 of 16 stars/)).toBeVisible();
  const raw = await page.evaluate(() => localStorage.getItem('q11.save.v1'));
  expect(raw).not.toBeNull();
  expect(JSON.parse(raw ?? '{}')).toMatchObject({ version: 1, progress: { 'first-alarm': { stars: 3, attempts: 1, completed: true } } });

  await page.evaluate(() => localStorage.setItem('q11.save.v1', '{"version":1,"progress":"broken"'));
  await page.reload();
  await expect(page.getByTestId('notice')).toContainText('Saved progress was unreadable and has been reset.');
  await expect(page.getByText(/Progress: 3 of 16 stars/)).toHaveCount(0);
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
  // The transient notice is gone after the screen change.
  await expect(page.getByTestId('notice')).toHaveCount(0);
  await expect(page.getByText(/of 16 stars/)).toHaveCount(0);
});

test('cloud panel: mission 4 shows the recorded block-4 run only for that dispatch', async ({ page }) => {
  await openMissions(page);
  await openChallenge(page, 4);
  // Dispatch that was never run: no card, but the recorded dispatches are listed.
  await page.getByTestId('block-0').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Fires still burning');
  await expect(page.getByTestId('cloud-card')).toHaveCount(0);
  await expect(page.getByTestId('cloud-empty')).toContainText('No cloud result recorded for this dispatch (recorded dispatches: IIIIXIIII).');
  await page.getByTestId('try-again').click();
  await page.getByTestId('block-4').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe');
  const cards = page.getByTestId('cloud-card');
  await expect(cards.first()).toBeVisible();
  for (const card of await cards.all()) {
    await expect(card).toContainText('Recorded crews: IIIIXIIII');
    await expect(card).toContainText(/Job id: /);
  }
  await expect(page.getByTestId('cloud-empty')).toHaveCount(0);
});

test('document.title follows the screen and the live region announces each screen', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Q11 — Quantum Emergency Response');
  await expect(page.getByTestId('announcer')).toHaveText('Q11 title screen.');
  await page.getByTestId('play').click();
  await expect(page).toHaveTitle('Q11 — Missions');
  await expect(page.getByTestId('announcer')).toHaveText('Mission list.');
  await page.getByTestId('mission-4').click();
  await expect(page).toHaveTitle('Q11 — Mission 4 · Blind Dispatch');
  await page.getByTestId('start-mission').click();
  await page.getByTestId('start-challenge').click();
  await expect(page.getByTestId('announcer')).toHaveText('Mission 4 dispatch. 2 of 8 stations ringing: Z0, Z1.');
  await expect(page.locator('main h1')).toBeFocused();
  // Alarm block lists stay in the accessibility tree even when visually hidden; block labels name their watchers.
  await expect(page.locator('[data-check="Z0"] .alarm-blocks')).toHaveText('blocks 0, 1, 3, 4');
  await expect(page.getByTestId('block-4')).toHaveAccessibleName(/^Block 4, watched by Z0, Z1, X0, X1,/);
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
