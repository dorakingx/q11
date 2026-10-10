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
  // Pause the auto-play and jump to the verdict step: every station quiet, yet the residual is the logical X.
  await page.getByTestId('replay-auto').click();
  await page.getByRole('button', { name: 'Step 5: Verdict' }).click();
  await expect(page.locator('[data-ringing="1"]')).toHaveCount(0);
  await expect(page.getByTestId('residual')).toContainText('XXXIIIIII');
  await expect(page.getByTestId('narrative')).toContainText('That was the optimal call');
  await expect(page.getByTestId('narrative')).toContainText('X on blocks 0, 1, 2 or the equivalent chain through block 3');
  await expect(page.getByTestId('narrative')).toContainText('distance 3');
  await expect(page.getByTestId('whatif')).toContainText('Crews matching the true fires: IXXIIIIII');
  await expect(page.getByTestId('whatif')).toContainText('is XIIIIIIII, and that is what you sent');
  await expect(page.getByTestId('whatif')).toContainText('leave XXXIIIIII on blocks 0, 1 and 2');
  await expect(page.getByTestId('whatif')).toContainText('no alarm pattern justified them');
  // The recorded cloud run of this very dispatch (block 0) is shown with its crews and job id.
  await expect(page.getByTestId('cloud-card').first()).toContainText('Recorded crews: XIIIIIIII');
  await expect(page.getByTestId('cloud-card').first()).toContainText(/Job id: [0-9a-f-]{36}/);
  await expectNoHorizontalOverflow(page);
  if (!mobile) await screenshot(page, 'mission6-debrief');

  // Residual step shows the "R" outline on blocks 0, 1, 2.
  await page.getByRole('button', { name: 'Step 4: Residual' }).click();
  await expect(page.locator('.block.has-residual')).toHaveCount(3);

  await page.getByTestId('to-result').click();
  await expect(page.getByTestId('result')).toContainText('Optimal call, unlucky outcome');
  await expect(page.getByTestId('result')).toContainText('Silent failure');
  await expect(page.getByTestId('result')).toContainText('Right call, cruel luck');
  await expect(page.getByRole('img', { name: '1 of 1 stars' })).toBeVisible();
  await page.getByTestId('next-mission').click();
  await expect(page.getByTestId('summary')).toBeVisible();
  await expect(page.getByText(/1 of 16 stars/)).toBeVisible();
});

test('mission 6: the block-3 crew is the same call (stabilizer-equivalent) and the cloud card for block 0 still applies', async ({ page }) => {
  await openMissions(page);
  await openChallenge(page, 6);
  await page.getByTestId('block-3').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Silent failure — logical qubit flipped');
  await expect(page.getByTestId('whatif')).toContainText('is XIIIIIIII; your IIIXIIIII differs from it by a stabilizer, so it is the same call');
  await expect(page.getByTestId('whatif')).toContainText('leave IXXXIIIII on blocks 1, 2 and 3');
  await expect(page.getByTestId('cloud-card').first()).toContainText('Recorded crews: XIIIIIIII');
  await page.getByTestId('to-result').click();
  await expect(page.getByTestId('result')).toContainText('Optimal call, unlucky outcome');
  await expect(page.getByRole('img', { name: '1 of 1 stars' })).toBeVisible();
});

test('mission 6: the lucky guess (blocks 1 and 2) succeeds but is scored "lucky" — 1 star, no cloud card for that dispatch', async ({ page }) => {
  await openMissions(page);
  await openChallenge(page, 6);
  await page.getByTestId('block-1').click();
  await page.getByTestId('block-2').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe');
  await expect(page.getByTestId('narrative')).toContainText('how did you know?');
  await expect(page.getByTestId('narrative')).toContainText('one star at most');
  await expect(page.getByTestId('whatif')).not.toContainText('Crews matching the true fires');
  await expect(page.getByTestId('whatif')).toContainText('could not justify your IXXIIIIII');
  // Only a block-0 run is recorded for this mission; it does not verify this dispatch.
  await expect(page.getByTestId('cloud-card')).toHaveCount(0);
  await expect(page.getByTestId('cloud-empty')).toContainText('No cloud result recorded for this dispatch (recorded dispatches: XIIIIIIII).');
  await page.getByTestId('to-result').click();
  await expect(page.getByTestId('result')).toContainText('Lucky guess — the alarms did not justify it');
  await expect(page.getByTestId('result')).toContainText('1 of 1 star');
  await expect(page.getByRole('img', { name: '1 of 1 stars' })).toBeVisible();
  await page.getByRole('button', { name: 'Missions' }).first().click();
  await expect(page.getByText(/1 of 16 stars/)).toBeVisible();
});
