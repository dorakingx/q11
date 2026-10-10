/// <reference lib="dom" />
import { allBlocksLargeEnough, expect, expectNoHorizontalOverflow, openChallenge, openMissions, screenshot, test } from './helpers';

test('smoke: title → play → mission 1 briefing → training → challenge → place crew → confirm → debrief → next', async ({ page }, info) => {
  const mobile = info.project.name.includes('mobile');
  await page.goto('/');
  await expect(page).toHaveTitle(/Q11/);
  await expect(page.getByRole('heading', { name: /Quantum Emergency Response/ })).toBeVisible();
  await expect(page.getByTestId('play')).toBeVisible();
  await screenshot(page, mobile ? 'mobile-title' : 'title');
  await expectNoHorizontalOverflow(page);

  await page.getByTestId('play').click();
  await expect(page.getByRole('heading', { name: 'Missions' })).toBeVisible();
  await expect(page.getByTestId('mission-6')).toBeVisible();

  await page.getByTestId('mission-1').click();
  await expect(page.getByText('Briefing')).toBeVisible();
  await expect(page.getByText(/Welcome to dispatch/)).toBeVisible();
  await page.getByTestId('start-mission').click();

  // Training: the true fire is visible (block 0 burning) and Z0 rings.
  await expect(page.getByText(/Training · lesson 1 of 1/)).toBeVisible();
  await expect(page.locator('[data-check="Z0"][data-ringing="1"]')).toBeVisible();
  await expect(page.locator('[data-check="Z1"][data-ringing="0"]')).toBeVisible();
  await expect(page.locator('.block.is-burning[data-q="0"]')).toBeVisible();
  await page.getByTestId('training-next').click();

  // Challenge: both stations ring, no fire visible, nothing reveals the answer.
  await expect(page.getByTestId('confirm')).toBeVisible();
  await expect(page.locator('[data-check="Z0"][data-ringing="1"]')).toBeVisible();
  await expect(page.locator('[data-check="Z1"][data-ringing="1"]')).toBeVisible();
  await expect(page.locator('.block.is-burning')).toHaveCount(0);
  await expect(page.getByTestId('budget')).toContainText('Crews: 0 / 1');
  await allBlocksLargeEnough(page);
  await expectNoHorizontalOverflow(page);
  if (!mobile) await screenshot(page, 'mission1-challenge');

  // Place a crew on block 1 via click; budget enforced (block 2 click ignored).
  await page.getByTestId('block-1').click();
  await expect(page.getByTestId('budget')).toContainText('Crews: 1 / 1');
  await page.getByTestId('block-2').click();
  await expect(page.getByTestId('budget')).toContainText('Crews: 1 / 1');
  await expect(page.getByTestId('block-1')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('block-2')).toHaveAttribute('aria-pressed', 'false');

  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe');
  await expect(page.getByText('Debrief · everything revealed')).toBeVisible();
  await expect(page.getByTestId('narrative')).toContainText(/two red flames cancel/);
  await expect(page.getByTestId('cloud-panel')).toContainText('No cloud result recorded yet');
  await expectNoHorizontalOverflow(page);

  // Replay: go to the first step, step forward, auto-play reaches the verdict.
  await page.getByTestId('replay-prev').click();
  await expect(page.getByTestId('replay-caption')).toContainText(/Residual/);
  await page.getByRole('button', { name: 'Step 1: Fires placed' }).click();
  await expect(page.getByTestId('replay-caption')).toContainText('Noise lit a red fire (X) on block 1');
  await page.getByTestId('replay-next').click();
  await expect(page.getByTestId('replay-caption')).toContainText(/Alarms: Z0, Z1 ring/);
  await page.getByTestId('replay-auto').click();
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe', { timeout: 15_000 });

  // Result → next mission briefing.
  await page.getByTestId('to-result').click();
  await expect(page.getByTestId('result')).toContainText('Optimal call');
  await expect(page.getByTestId('result')).toContainText('1 crew used · minimum 1');
  await page.getByTestId('next-mission').click();
  await expect(page.getByText(/Mission 2 · Red Forward/)).toBeVisible();
  await expect(page.getByText('Briefing')).toBeVisible();
});

test('mission 4 challenge renders the full surface-code board (screenshot)', async ({ page }, info) => {
  const mobile = info.project.name.includes('mobile');
  await openMissions(page);
  await openChallenge(page, 4, { through: 'training' });
  await expect(page.locator('button.block')).toHaveCount(9);
  await expect(page.locator('[data-check="Z0"][data-ringing="1"]')).toBeVisible();
  await expect(page.locator('[data-check="Z1"][data-ringing="1"]')).toBeVisible();
  await expect(page.locator('[data-ringing="1"]')).toHaveCount(2);
  await allBlocksLargeEnough(page);
  await page.getByTestId('block-4').click();
  await expectNoHorizontalOverflow(page);
  await screenshot(page, mobile ? 'mobile-mission4' : 'mission4-challenge');
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe');
});

test('propagation missions 2 and 3: predict the end state, wrong colour fails, try again works', async ({ page }) => {
  await openMissions(page);
  await openChallenge(page, 2, { through: 'training' });
  // Challenge of mission 2: XZ through CNOT → YY. Send Y to both output blocks.
  await page.getByTestId('palette-Y').click();
  await page.getByTestId('block-0').click();
  await page.getByTestId('block-1').click();
  await expect(page.getByTestId('budget')).toContainText('Crews: 2 / 2');
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe');
  await expect(page.getByTestId('replay-caption')).toContainText(/every fire is out/);
  // Replay the gate step and check the propagation caption.
  await page.getByRole('button', { name: 'Step 2: Gate' }).click();
  await expect(page.getByTestId('replay-caption')).toContainText('CNOT from block 0 to block 1: XZ becomes YY');
  await page.getByTestId('debrief-next').click();
  await expect(page.getByText(/Mission 3 · Color Switch/)).toBeVisible();
  await page.getByTestId('start-mission').click();
  await page.getByTestId('start-challenge').click();
  // Wrong: send X X (true end state is XZ).
  await page.getByTestId('palette-X').click();
  await page.getByTestId('block-0').click();
  await page.getByTestId('block-1').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Silent failure');
  await page.getByTestId('try-again').click();
  await expect(page.getByTestId('budget')).toContainText('Crews: 0 / 2');
  await page.getByTestId('palette-X').click();
  await page.getByTestId('block-0').click();
  await page.getByTestId('palette-Z').click();
  await page.getByTestId('block-1').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe');
});

test('standing down with no crews asks for confirmation, then shows fires still burning', async ({ page }) => {
  await openMissions(page);
  await openChallenge(page, 1);
  await page.getByTestId('confirm').click();
  await expect(page.getByRole('alertdialog')).toContainText('Stand down with no crews?');
  await page.getByRole('button', { name: 'Keep dispatching' }).click();
  await expect(page.getByRole('alertdialog')).toHaveCount(0);
  await page.getByTestId('confirm').click();
  await page.getByRole('button', { name: 'Stand down' }).click();
  await expect(page.getByTestId('verdict')).toContainText('Fires still burning');
});
