/// <reference lib="dom" />
import { expect, expectNoHorizontalOverflow, openChallenge, openMissions, screenshot, test } from './helpers';

test('mission 6: the protocol dispatch silences every alarm but flips the logical qubit (silent failure)', async ({ page }, info) => {
  const mobile = info.project.name.includes('mobile');
  await openMissions(page);
  await openChallenge(page, 6);
  // Only Z0 rings; the true fire is hidden.
  await expect(page.locator('[data-ringing="1"]')).toHaveCount(1);
  await expect(page.locator('[data-check="Z0"][data-ringing="1"]')).toBeVisible();
  await expect(page.locator('.block.is-burning')).toHaveCount(0);
  // Protocol: one red crew on block 0.
  await page.getByTestId('block-0').click();
  await page.getByTestId('confirm').click();

  await expect(page.getByTestId('verdict')).toContainText('Silent failure — logical qubit flipped');
  // Every station quiet at the verdict step, yet the residual is the logical X.
  await expect(page.locator('[data-ringing="1"]')).toHaveCount(0);
  await expect(page.getByTestId('residual')).toContainText('XXXIIIIII');
  await expect(page.getByTestId('narrative')).toContainText('That was the optimal call');
  await expect(page.getByTestId('narrative')).toContainText('distance 3');
  await expect(page.getByTestId('whatif')).toContainText('Crews matching the true fires: IXXIIIIII');
  await expect(page.getByTestId('whatif')).toContainText('no alarm pattern justified them');
  await expectNoHorizontalOverflow(page);
  if (!mobile) await screenshot(page, 'mission6-debrief');

  // Residual step shows the "R" outline on blocks 0, 1, 2.
  await page.getByRole('button', { name: 'Step 4: Residual' }).click();
  await expect(page.locator('.block.has-residual')).toHaveCount(3);

  await page.getByTestId('to-result').click();
  await expect(page.getByTestId('result')).toContainText('Optimal call, unlucky outcome');
  await expect(page.getByTestId('result')).toContainText('Silent failure');
  await expect(page.getByRole('img', { name: '1 of 3 stars' })).toBeVisible();
  await page.getByTestId('next-mission').click();
  await expect(page.getByTestId('summary')).toBeVisible();
  await expect(page.getByText(/1 of 18 stars/)).toBeVisible();
});

test('mission 6: the lucky guess (blocks 1 and 2) succeeds with 2 stars and an honest debrief', async ({ page }) => {
  await openMissions(page);
  await openChallenge(page, 6);
  await page.getByTestId('block-1').click();
  await page.getByTestId('block-2').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe');
  await expect(page.getByTestId('narrative')).toContainText('how did you know?');
  await page.getByTestId('to-result').click();
  await expect(page.getByTestId('result')).toContainText('Valid, but costly');
  await expect(page.getByRole('img', { name: '2 of 3 stars' })).toBeVisible();
});
