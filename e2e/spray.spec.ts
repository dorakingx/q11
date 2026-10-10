/// <reference lib="dom" />
import { expect, expectNoHorizontalOverflow, openChallenge, openCity, readSave, seedSave, serialisedHouses, sprayAndSkip, stepSprayToEnd, test } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedSave(page, { freeRoam: true });
});

test('result 1 — blind dispatch X on house 4: restored (fires out, houses restored, alarms quiet)', async ({ page }) => {
  await openCity(page);
  await openChallenge(page, 4);
  await page.getByTestId('block-4').click();
  await page.getByTestId('confirm').click();
  // The showpiece: trucks, the crew runs to house 4, the stream, then the house state changes to restored.
  // The frames are transient (≈2.5 s in all); an occluded page under parallel load can skip past one before the
  // poll sees it, so each check accepts the finished overlay as well. The reduced-motion test pins every frame.
  const orDone = (selector: string) => page.locator(`${selector}, [data-testid="result-overlay"]`).first();
  await expect(orDone('.truck')).toBeVisible();
  await expect(orDone('.firefighter[data-crew-q="4"][data-crew="X"]')).toBeVisible();
  await expect(orDone('.stream[data-stream-q="4"]')).toBeVisible({ timeout: 4000 });
  await expect(page.getByTestId('result-overlay')).toBeVisible({ timeout: 8000 });
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await expect(page.locator('[data-house="4"][data-house-state="restored"]')).toHaveCount(1);
  await expect(page.locator('[data-house][data-house-state="fog"]')).toHaveCount(0);
  await expect(page.locator('.detector[data-ringing="true"]')).toHaveCount(0);
  await expect(page.locator('.memory-tower')).toHaveCount(0);
  await expect(page.getByTestId('result-stars')).toHaveAttribute('aria-label', '3 of 3 stars');
  await page.getByTestId('result-details').locator('summary').click();
  await expect(page.getByTestId('residual')).toHaveText('IIIIIIIII');
  await expect(page.getByTestId('decision')).toContainText('Optimal call');
  await expect(page.getByTestId('cloud-panel')).toContainText('Recorded crews: IIIIXIIII');
  await expect(page.getByTestId('cloud-card').first()).toContainText(/Local \(Aer\)|Cached cloud result|Live cloud result/);
});

test('result 3 — blind dispatch X on house 0: still burning (new red fire, true fire revealed, alarms ring)', async ({ page }) => {
  await openCity(page);
  await openChallenge(page, 4);
  await page.getByTestId('block-0').click();
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'still-burning');
  await expect(page.locator('[data-house="0"][data-house-state="residual"]')).toHaveCount(1);
  await expect(page.locator('[data-house="4"][data-house-state="residual"]')).toHaveCount(1);
  // XIIIXIIII: Z0 sees both X fires (even → quiet); Z1 sees house 4 alone → rings.
  await expect(page.locator('.detector[data-ringing="true"]')).toHaveCount(1);
  await expect(page.locator('.detector[data-detector="Z1"]')).toHaveAttribute('data-ringing', 'true');
  await expect(page.locator('.detector[data-detector="Z0"]')).toHaveAttribute('data-ringing', 'false');
  await expect(page.getByTestId('result-stars')).toHaveAttribute('aria-label', '0 of 3 stars');
  await page.getByTestId('result-details').locator('summary').click();
  await expect(page.getByTestId('residual')).toHaveText('XIIIXIIII');
  await expect(page.getByTestId('cloud-empty')).toContainText('No cloud result recorded for this dispatch (recorded dispatches: IIIIXIIII).');
});

test('result 2 — two kinds X1 + Z6: safe pattern (ghost houses, "Logical qubit safe" badge, raw residual in Details)', async ({ page }) => {
  await openCity(page);
  await openChallenge(page, 5);
  await expect(page.locator('[data-check][data-ringing="1"]')).toHaveCount(3);
  await page.getByTestId('palette-X').click();
  await page.getByTestId('block-1').click();
  await page.getByTestId('palette-Z').click();
  await page.getByTestId('block-6').click();
  await expect(page.getByTestId('budget')).toContainText('Crews: 2 / 2');
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'safe-pattern');
  await expect(page.locator('[data-house][data-house-state="ghost"]')).toHaveCount(2);
  await expect(page.locator('[data-house="6"][data-house-state="ghost"]')).toHaveCount(1);
  await expect(page.locator('[data-house="7"][data-house-state="ghost"]')).toHaveCount(1);
  await expect(page.getByTestId('badge-safe')).toHaveText('Logical qubit safe');
  await expect(page.locator('.detector[data-ringing="true"]')).toHaveCount(0);
  await expect(page.getByTestId('result-reaction')).toContainText('same fix');
  await page.getByTestId('result-details').locator('summary').click();
  await expect(page.getByTestId('result-details')).toContainText('Raw residual: IIIIIIZZI');
  await expect(page.getByTestId('result-stars')).toHaveAttribute('aria-label', '3 of 3 stars');
});

test('result 4 — silent failure X on house 0: alarms quiet, the memory beacon shows the logical X flip and the chain 0-1-2', async ({ page }) => {
  await openCity(page);
  await openChallenge(page, 6);
  await expect(page.locator('[data-check][data-ringing="1"]')).toHaveCount(1);
  await expect(page.locator('.memory-tower')).toHaveCount(0); // the beacon appears only at result time
  await page.getByTestId('block-0').click();
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'logical-failure');
  await expect(page.locator('.detector[data-ringing="true"]')).toHaveCount(0);
  await expect(page.locator('.memory-tower')).toHaveAttribute('data-anomaly', 'X');
  await expect(page.locator('.logical-chain')).toHaveAttribute('data-chain', '0,1,2');
  await expect(page.locator('[data-house][data-house-state="fire"]')).toHaveCount(3);
  await expect(page.getByTestId('result-beacon')).toContainText('Memory beacon: logical X flip');
  await expect(page.getByTestId('result-beacon')).toContainText('XXXIIIIII');
  await expect(page.getByTestId('result-reaction')).toContainText('Investigation complete');
  await expect(page.getByTestId('result-stars')).toHaveAttribute('aria-label', '1 of 1 star');
  await page.getByTestId('result-details').locator('summary').click();
  await expect(page.getByTestId('decision')).toContainText('Optimal call, unlucky outcome');
  await expect(page.getByTestId('cloud-card').first()).toContainText('Recorded crews: XIIIIIIII');
  // Why? compares with the true-fire crews, explains that alarms alone cannot decide, no blame.
  await page.getByTestId('result-why').click();
  await expect(page.getByTestId('why-compare')).toBeVisible();
  await expect(page.getByTestId('why-alt')).toContainText('Crews on the true fires');
  await page.getByTestId('why-skip').click();
  await expect(page.getByTestId('why-explanation')).toContainText('Alarms alone cannot decide.');
  await expect(page.locator('.why-noblame')).toContainText('Nobody could have known');
  await expect(page.getByTestId('why-mine')).toContainText('Silent failure');
  await expect(page.getByTestId('why-alt')).toContainText('Logical qubit safe');
  // Step by step (Details fold) keeps the engine replay: the residual step shows XXXIIIIII.
  await page.getByTestId('step-details').locator('summary').click();
  await page.getByRole('button', { name: 'Step 4: Residual' }).click();
  await expect(page.getByTestId('replay-caption')).toContainText('XXXIIIIII');
  await page.getByTestId('to-result').click();
  await expect(page.getByTestId('result')).toContainText('Right call, cruel luck');
  await expect(page.getByTestId('result')).toContainText('Optimal call, unlucky outcome');
  await expectNoHorizontalOverflow(page);
});

test('secrecy: in Challenge every house button is identical (index stripped) and nothing names the fire before Spray!', async ({ page }) => {
  await openCity(page);
  await openChallenge(page, 6);
  const houses = await serialisedHouses(page);
  expect(houses).toHaveLength(9);
  for (const h of houses) expect(h).toBe(houses[0]);
  const scene = page.locator('[data-scene]');
  const html = await scene.innerHTML();
  expect(html).not.toMatch(/fire/i);
  expect(html).not.toContain('IXXIIIIII');
  expect(html).not.toContain('XXXIIIIII');
  await expect(scene.locator('[data-house-state]:not([data-house-state="fog"])')).toHaveCount(0);
  await expect(scene.locator('.house-fire, .firefighter, .memory-tower')).toHaveCount(0);
  const labels = await page.locator('button.block').evaluateAll((els) => els.map((e) => e.getAttribute('aria-label') ?? ''));
  for (const l of labels) expect(l).not.toMatch(/fire|watched/);
  const main = await page.locator('main').innerHTML();
  expect(main).not.toContain('IXXIIIIII');
});

test('rapid taps: triple Spray!, double Skip, Try again mid-spray — attempts increase by exactly one each time', async ({ page }) => {
  await openCity(page);
  await openChallenge(page, 4);
  await page.getByTestId('block-4').click();
  await page.getByTestId('confirm').click({ clickCount: 3 });
  await expect(page.getByTestId('spray-player')).toBeVisible();
  expect((await readSave(page)).progress['blind-dispatch']?.attempts).toBe(1);
  await page.getByTestId('spray-skip').dblclick();
  await expect(page.getByTestId('result-overlay')).toBeVisible();
  expect((await readSave(page)).progress['blind-dispatch']?.attempts).toBe(1);
  await page.getByTestId('result-details').locator('summary').click();
  await expect(page.getByTestId('attempts')).toHaveText('1');
  // Try again during the spray: the second dispatch counts once, leaving mid-spray adds nothing.
  await page.getByTestId('result-retry').click();
  await expect(page.getByTestId('budget')).toContainText('Crews: 0 / 1');
  await page.getByTestId('block-4').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('spray-player')).toBeVisible();
  expect((await readSave(page)).progress['blind-dispatch']?.attempts).toBe(2);
  await page.getByTestId('topbar-city').click();
  await expect(page.getByTestId('city-map')).toBeVisible();
  expect((await readSave(page)).progress['blind-dispatch']?.attempts).toBe(2);
  await expect(page.getByTestId('mission-4')).toHaveAttribute('data-status', 'solved');
});

test('reduced motion: the spray is a stepper with static frames; Why? steps both boards together', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('settings').click();
  await page.getByTestId('switch-motion').click();
  await page.getByTestId('back').click();
  await page.getByTestId('play').click();
  await openChallenge(page, 4);
  await page.getByTestId('block-4').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('spray-player')).toHaveAttribute('data-reduced-motion', 'true');
  await expect(page.getByTestId('spray-step')).toContainText('Frame 1 of');
  await expect(page.locator('[data-house="4"]')).toHaveAttribute('data-house-state', 'fog');
  await page.getByTestId('spray-next').click(); // crew runs
  await page.getByTestId('spray-next').click(); // water on
  await expect(page.locator('.firefighter[data-crew-q="4"]')).toHaveAttribute('data-pose', 'spray');
  await expect(page.locator('[data-house="4"]')).toHaveAttribute('data-house-state', 'fog');
  await page.getByTestId('spray-next').click(); // impact: the engine's after-state
  await expect(page.locator('[data-house="4"]')).toHaveAttribute('data-house-state', 'restored');
  await page.getByTestId('spray-prev').click();
  await expect(page.locator('[data-house="4"]')).toHaveAttribute('data-house-state', 'fog');
  await stepSprayToEnd(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await page.getByTestId('result-why').click();
  await expect(page.getByTestId('why-next')).toBeVisible();
  await page.getByTestId('why-next').click();
  await expect(page.locator('.why-compare .spray-step-label')).toContainText('Frame 2 of');
});

test('stand down with no crews asks first; confirming shows the fire still burning (0 stars)', async ({ page }, info) => {
  await openCity(page);
  await openChallenge(page, 1);
  await page.getByTestId('confirm').click();
  await expect(page.getByRole('alertdialog')).toContainText('Stand down with no crews?');
  await expect(page.getByRole('button', { name: 'Keep dispatching' })).toBeFocused();
  await expect(page.locator('[data-inert-root]')).toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('alertdialog')).toHaveCount(0);
  // Focus returns to the opener (WebKit on macOS does not focus a button on click, so the opener there is the body).
  if (info.project.name !== 'desktop-webkit') await expect(page.getByTestId('confirm')).toBeFocused();
  await page.getByTestId('confirm').click();
  await page.getByRole('button', { name: 'Stand down' }).click();
  await expect(page.getByTestId('spray-player')).toBeVisible();
  await page.getByTestId('spray-skip').click();
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'still-burning');
  await expect(page.getByTestId('result-stars')).toHaveAttribute('aria-label', '0 of 3 stars');
  await page.getByTestId('result-details').locator('summary').click();
  await page.getByTestId('to-result').click();
  await expect(page.getByTestId('result')).toContainText('Stood down');
  await expect(page.getByTestId('result')).toContainText('0 crews used');
});
