/// <reference lib="dom" />
import { expect, expectFailedResultActions, expectNoHorizontalOverflow, expectPrimaryButton, freezeClock, openChallenge, openCity, readSave, seedSave, serialisedHouses, sprayAndSkip, stepSprayToEnd, test } from './helpers';

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
  await expect(page.getByTestId('result-next')).toHaveText('Next district');
  await expectPrimaryButton(page, 'result-next');
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
  // A failed dispatch keeps Try again as the primary action; the city is a ghost button.
  await expectFailedResultActions(page);
  await page.getByTestId('result-details').locator('summary').click();
  await expect(page.getByTestId('residual')).toHaveText('XIIIXIIII');
  await expect(page.getByTestId('cloud-empty')).toContainText('No cloud result recorded for this dispatch (recorded dispatches: IIIIXIIII).');
});

test('prediction miss — Harbor Bridge, red crew on house 0 only: no alarms, no beacon, Try again is the primary action', async ({ page }) => {
  await openCity(page);
  await openChallenge(page, 2);
  await expect(page.locator('.detector')).toHaveCount(0);
  await page.getByTestId('palette-X').click();
  await page.getByTestId('block-0').click();
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'prediction-miss');
  await expect(page.getByTestId('result-title')).toHaveText('Prediction missed');
  await expect(page.locator('.memory-tower')).toHaveCount(0);
  await expect(page.locator('.detector')).toHaveCount(0);
  await expect(page.getByTestId('result-beacon')).toHaveCount(0);
  await expectFailedResultActions(page);
  await page.getByTestId('result-details').locator('summary').click();
  await expect(page.getByTestId('verdict-label')).toHaveText('Prediction missed — fires left on the wires');
  await expect(page.getByTestId('residual')).toHaveText('ZY');
  await page.getByTestId('result-next').click();
  await expect(page.getByTestId('city-map')).toBeVisible();
  await expect(page.getByTestId('toast-badge')).toHaveCount(0);
  await expect(page.getByTestId('city-panel')).toContainText('Conversion Lab'); // free roam: the next district is open, so it is pre-selected
});

test('propagation prelude — Harbor Bridge: the start fires travel through the coupler before the trucks; the houses light only when the fires arrive; the narration follows the picture; Skip during the prelude jumps to the final frame', async ({ page }) => {
  // The prelude frames are transient (≈2.2 s), so this test drives Playwright's fake clock: it is frozen right before
  // Spray! and advanced by hand (`runFor`), which pins every snapshot to a known timeline instant whatever the machine
  // load. Timeline (src/game/effects.ts EFFECT_TIMING): fires-start 0–450 · gate 450–1200 (tokens switch at
  // 450 + 0.55 × 750 ≈ 862) · fires-arrive 1200–1650 (houses light at 1650) · hold · trucks from 2150.
  await page.clock.install();
  await openCity(page);
  await openChallenge(page, 2);
  // Planning: no prelude, no travelling tokens, nothing reveals the propagated fires.
  await expect(page.locator('[data-testid="lane-token"]')).toHaveCount(0);
  await expect(page.locator('[data-house][data-house-state="fire"]')).toHaveCount(0);
  await page.getByTestId('palette-Y').click();
  await page.getByTestId('block-0').click();
  await page.getByTestId('block-1').click();
  await freezeClock(page);
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('spray-player')).toBeVisible();
  const caption = page.getByTestId('spray-caption');
  const announcer = page.getByTestId('spray-announcer');
  const token = (q: number) => page.locator(`[data-testid="lane-token"][data-lane-q="${String(q)}"]`);
  const house = (q: number) => page.locator(`[data-house="${String(q)}"]`);
  // t = 0: the tokens XZ sit at the input (red on house 0, blue on house 1), houses plain, the time cursor drawn, no truck.
  await expect(token(0)).toHaveAttribute('data-letter', 'X');
  await expect(token(1)).toHaveAttribute('data-letter', 'Z');
  const snapshot = await page.locator('[data-scene]').evaluate((root) => ({
    tokens: Array.from(root.querySelectorAll('[data-testid="lane-token"]')).map((k) => `${k.getAttribute('data-lane-q') ?? ''}:${k.getAttribute('data-letter') ?? ''}`),
    houses: Array.from(root.querySelectorAll('[data-house]')).map((h) => h.getAttribute('data-house-state')),
    cursor: root.querySelectorAll('.time-cursor').length,
    trucks: root.querySelectorAll('.truck').length,
  }));
  expect(snapshot.tokens).toEqual(['0:X', '1:Z']);
  expect(snapshot.houses, 'the lane-end houses are not on fire while the tokens travel').toEqual(['normal', 'normal']);
  expect(snapshot.cursor).toBe(1);
  expect(snapshot.trucks).toBe(0);
  await expect(caption).toHaveText('The fire starts here: red (X) fire on house 0 and blue (Z) fire on house 1.');
  await expect(announcer).toBeEmpty();
  // t ≈ 950: inside the coupler, past the pattern switch — YY on the active gate, houses still plain, the caption names both directions.
  await page.clock.runFor(950);
  await expect(token(0)).toHaveAttribute('data-letter', 'Y');
  await expect(token(1)).toHaveAttribute('data-letter', 'Y');
  await expect(page.locator('.gate.is-active')).toHaveCount(1);
  await expect(house(0)).toHaveAttribute('data-house-state', 'normal');
  await expect(house(1)).toHaveAttribute('data-house-state', 'normal');
  await expect(caption).toHaveText('Through the coupler: the red (X) fire copies forward onto house 1 and the blue (Z) fire copies backward onto house 0.');
  await expect(announcer).toBeEmpty();
  // t ≈ 1400: travelling to the houses — the coupler is done, the houses are still plain, the caption still names the coupler rule.
  await page.clock.runFor(450);
  await expect(page.locator('.gate.is-done')).toHaveCount(1);
  await expect(token(0)).toHaveAttribute('data-letter', 'Y');
  await expect(house(0)).toHaveAttribute('data-house-state', 'normal');
  await expect(house(1)).toHaveAttribute('data-house-state', 'normal');
  await expect(caption).toContainText('Through the coupler');
  await expect(announcer).toBeEmpty();
  await expect(page.locator('.truck')).toHaveCount(0);
  // t ≈ 1700: arrived — tokens and cursor gone, both houses carry the Y fire, caption and live region say so, no truck yet (the arrival holds).
  await page.clock.runFor(300);
  await expect(page.locator('[data-testid="lane-token"]')).toHaveCount(0);
  await expect(page.locator('.time-cursor')).toHaveCount(0);
  await expect(house(0)).toHaveAttribute('data-house-state', 'fire');
  await expect(house(1)).toHaveAttribute('data-house-state', 'fire');
  await expect(caption).toHaveText('The fires reach the houses: red-and-blue (Y) fire on house 0 and red-and-blue (Y) fire on house 1.');
  await expect(announcer).toHaveText('The fires reach the houses: red-and-blue (Y) fire on house 0 and red-and-blue (Y) fire on house 1.');
  await expect(page.locator('.truck')).toHaveCount(0);
  // t ≈ 2300: the trucks (arrival + hold) — the existing sequence from here on, back on real time.
  await page.clock.runFor(600);
  await expect(page.locator('.truck')).toHaveCount(1);
  await expect(caption).toHaveText('The trucks arrive at Harbor Bridge.');
  await page.clock.resume();
  await expect(page.getByTestId('result-overlay')).toBeVisible({ timeout: 10_000 });
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await expect(page.locator('[data-testid="lane-token"]')).toHaveCount(0);
  await expect(page.locator('[data-house="0"][data-house-state="restored"]')).toHaveCount(1);
  await expect(page.locator('[data-house="1"][data-house-state="restored"]')).toHaveCount(1);
  await expect(page.locator('.lane-start[data-faded="true"]')).toHaveCount(2);
  // Try again, then Skip during the prelude (the clock is frozen again, so the replay sits at t = 0 when Skip is pressed):
  // straight to the final frame (no tokens, no cursor, houses in their end state).
  await page.getByTestId('result-retry').click();
  await page.getByTestId('palette-X').click();
  await page.getByTestId('block-0').click();
  await freezeClock(page);
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('spray-player')).toBeVisible();
  await expect(page.locator('[data-testid="lane-token"]')).toHaveCount(2);
  await expect(page.locator('[data-house="0"]')).toHaveAttribute('data-house-state', 'normal');
  await page.getByTestId('spray-skip').click();
  await expect(page.getByTestId('result-overlay')).toBeVisible();
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'prediction-miss');
  await expect(page.locator('[data-testid="lane-token"]')).toHaveCount(0);
  await expect(page.locator('.time-cursor')).toHaveCount(0);
  await expect(page.locator('[data-house="0"][data-house-state="fire"]')).toHaveCount(1); // Y ⊕ X = Z left on house 0
  await expect(page.locator('[data-house="1"][data-house-state="fire"]')).toHaveCount(1); // Y never sprayed
  await page.clock.resume();
  await page.getByTestId('result-details').locator('summary').click();
  await expect(page.getByTestId('residual')).toHaveText('ZY');
});

test('propagation prelude under reduced motion — Harbor Bridge: the stepper gains the start / gate / arrive frames before the trucks', async ({ page }) => {
  // The save is seeded once by beforeEach (free roam); reduced motion is switched on through Settings like a player would.
  await page.goto('/');
  await page.getByTestId('settings').click();
  await page.getByTestId('switch-motion').click();
  await page.getByTestId('back').click();
  await page.getByTestId('play').click();
  await expect(page.getByTestId('city-map')).toBeVisible();
  await openChallenge(page, 2);
  await page.getByTestId('palette-Y').click();
  await page.getByTestId('block-0').click();
  await page.getByTestId('block-1').click();
  await page.getByTestId('confirm').click();
  await expect(page.getByTestId('spray-player')).toHaveAttribute('data-reduced-motion', 'true');
  // 3 prelude frames + trucks + 2 × (run, spray, impact) + reveal, alarms, outcome, done = 14 (11 without the prelude).
  await expect(page.getByTestId('spray-step')).toHaveText('Frame 1 of 14');
  await expect(page.getByTestId('spray-caption')).toHaveText('The fire starts here: red (X) fire on house 0 and blue (Z) fire on house 1.');
  await expect(page.locator('[data-testid="lane-token"]')).toHaveCount(2);
  await expect(page.locator('[data-testid="lane-token"][data-lane-q="0"]')).toHaveAttribute('data-letter', 'X');
  await expect(page.locator('[data-testid="lane-token"][data-lane-q="1"]')).toHaveAttribute('data-letter', 'Z');
  await expect(page.locator('[data-house="0"]')).toHaveAttribute('data-house-state', 'normal');
  await expect(page.locator('[data-house="1"]')).toHaveAttribute('data-house-state', 'normal');
  await expect(page.locator('.truck')).toHaveCount(0);
  await page.getByTestId('spray-next').click(); // the coupler: XZ → YY
  await expect(page.getByTestId('spray-caption')).toHaveText('Through the coupler: the red (X) fire copies forward onto house 1 and the blue (Z) fire copies backward onto house 0.');
  await expect(page.locator('.gate.is-active')).toHaveCount(1);
  await expect(page.locator('[data-testid="lane-token"][data-lane-q="0"]')).toHaveAttribute('data-letter', 'Y');
  await expect(page.locator('[data-testid="lane-token"][data-lane-q="1"]')).toHaveAttribute('data-letter', 'Y');
  await expect(page.locator('[data-house="0"]')).toHaveAttribute('data-house-state', 'normal');
  await page.getByTestId('spray-next').click(); // the fires reach the houses
  await expect(page.getByTestId('spray-caption')).toHaveText('The fires reach the houses: red-and-blue (Y) fire on house 0 and red-and-blue (Y) fire on house 1.');
  await expect(page.locator('[data-testid="lane-token"]')).toHaveCount(0);
  await expect(page.locator('[data-house="0"]')).toHaveAttribute('data-house-state', 'fire');
  await expect(page.locator('[data-house="1"]')).toHaveAttribute('data-house-state', 'fire');
  await expect(page.locator('.truck')).toHaveCount(0);
  await page.getByTestId('spray-next').click(); // the trucks arrive (the existing sequence from here on)
  await expect(page.getByTestId('spray-caption')).toHaveText('The trucks arrive at Harbor Bridge.');
  await expect(page.locator('.truck')).toHaveCount(1);
  await page.getByTestId('spray-prev').click();
  await expect(page.locator('.truck')).toHaveCount(0);
  await expect(page.locator('[data-house="0"]')).toHaveAttribute('data-house-state', 'fire');
  await stepSprayToEnd(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await expect(page.locator('[data-house="0"][data-house-state="restored"]')).toHaveCount(1);
  // Why? compares the sprays only: no prelude frames there (11 frames for both boards).
  await page.getByTestId('result-why').click();
  await expect(page.getByTestId('why-compare')).toBeVisible();
  await expect(page.locator('.why-compare .spray-step-label')).toContainText('Frame 1 of 11');
  await expect(page.locator('.why-compare [data-testid="lane-token"]')).toHaveCount(0);
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
  await expect(page.getByTestId('why-replay')).toBeFocused();
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
  // The alarms the plan was made against stay visible while the crews spray.
  await expect(page.getByTestId('dispatch-alarms')).toBeVisible();
  await expect(page.getByTestId('dispatch-alarms').locator('[data-check][data-ringing="1"]')).toHaveCount(2);
  await expect(page.locator('[data-house="4"]')).toHaveAttribute('data-house-state', 'fog');
  await page.getByTestId('spray-next').click(); // crew runs
  await page.getByTestId('spray-next').click(); // water on: the fog lifts and the TRUE fire is seen under the water
  await expect(page.locator('.firefighter[data-crew-q="4"]')).toHaveAttribute('data-pose', 'spray');
  await expect(page.locator('[data-house="4"]')).toHaveAttribute('data-house-state', 'fire');
  await page.getByTestId('spray-next').click(); // impact: the engine's after-state
  await expect(page.locator('[data-house="4"]')).toHaveAttribute('data-house-state', 'restored');
  await page.getByTestId('spray-prev').click();
  await expect(page.locator('[data-house="4"]')).toHaveAttribute('data-house-state', 'fire');
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
