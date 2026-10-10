/// <reference lib="dom" />
import { expect, expectCityArrival, expectFailedResultActions, expectNoHorizontalOverflow, expectPrimaryButton, goToDistrict, openCity, seedSave, sprayAndSkip, startChallenge, test } from './helpers';

/** Every district end to end in order (sequential unlock, no free roam), through training where it exists. */
test('all six districts are playable end to end in order, with tap-to-predict in the propagation lessons', async ({ page }) => {
  await seedSave(page, {});
  await openCity(page);

  // 1 · Rowhouse Lane (rep3): X on house 1.
  await goToDistrict(page, 1);
  await startChallenge(page, { through: 'training' });
  await page.getByTestId('block-1').click();
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await expect(page.getByTestId('result-next')).toHaveText('Next district');
  await expectPrimaryButton(page, 'result-next');
  await page.getByTestId('result-next').click();
  // Next district → the city celebrates Rowhouse Lane and pre-selects Harbor Bridge; Dispatch! from there.
  await expectCityArrival(page, { badge: 'Alarm Reader', selected: 2, selectedName: 'Harbor Bridge' });
  await expect(page.getByTestId('mission-1')).toHaveAttribute('data-status', 'solved');
  await goToDistrict(page, 2);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Harbor Bridge');

  // 2 · Harbor Bridge (CNOT): training asks for a prediction before each gate step; challenge XZ → YY.
  await page.getByTestId('start-mission').click();
  await expect(page.getByTestId('predict-prompt')).toBeVisible();
  await expect(page.getByTestId('training-next')).toBeDisabled();
  await page.getByTestId('block-1').click();
  await expect(page.getByTestId('predict-reaction')).toContainText('Yes! House 1 burns after this gate.');
  await expect(page.getByTestId('predict-reaction')).toBeFocused();
  await expect(page.getByTestId('training-caption')).toContainText('After gate 1 of 1: XX');
  await page.getByTestId('training-next').click(); // lesson 2 (IZ → ZZ)
  await expect(page.getByTestId('predict-prompt')).toBeVisible();
  await page.getByTestId('block-0').click();
  await expect(page.getByTestId('predict-reaction')).toContainText('Yes! House 0 burns after this gate.');
  await page.getByTestId('training-next').click(); // start dispatch
  await expect(page.getByTestId('confirm')).toBeVisible();
  await page.getByTestId('palette-Y').click();
  await page.getByTestId('block-0').click();
  await page.getByTestId('block-1').click();
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await expect(page.locator('[data-house="0"][data-house-state="restored"]')).toHaveCount(1);
  await expect(page.locator('[data-house="1"][data-house-state="restored"]')).toHaveCount(1);
  await page.getByTestId('result-next').click();
  await expectCityArrival(page, { badge: 'Gate Tracker', selected: 3, selectedName: 'Conversion Lab' });
  await goToDistrict(page, 3);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Conversion Lab');

  // 3 · Conversion Lab (H, CNOT, H): a miss on bare wires is a missed prediction, never a silent failure; retry works.
  await page.getByTestId('start-mission').click();
  await expect(page.getByTestId('predict-prompt')).toBeVisible();
  await page.getByTestId('block-0').click(); // XI → H → ZI: house 0 still burns (blue now)
  await expect(page.getByTestId('predict-reaction')).toContainText('House 0 burns');
  await page.getByTestId('training-next').click(); // lesson 2 (ZI → H → XI → CNOT → XX)
  await page.getByTestId('block-1').click(); // after H: XI — house 1 is still safe
  await expect(page.getByTestId('predict-reaction')).toContainText('Not this time: house 1 stays safe.');
  await page.getByTestId('block-1').click(); // after CNOT: XX
  await expect(page.getByTestId('predict-reaction')).toContainText('Yes! House 1 burns');
  await page.getByTestId('training-next').click();
  await expect(page.getByTestId('confirm')).toBeVisible();
  await page.getByTestId('palette-X').click();
  await page.getByTestId('block-0').click();
  await page.getByTestId('block-1').click();
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'prediction-miss');
  await expect(page.getByTestId('result-title')).toHaveText('Prediction missed');
  await expect(page.locator('.memory-tower')).toHaveCount(0); // bare wires: no beacon, no "silent failure" wording
  await expectFailedResultActions(page);
  await page.getByTestId('result-details').locator('summary').click();
  await expect(page.getByTestId('verdict-label')).toHaveText('Prediction missed — fires left on the wires');
  await expect(page.getByTestId('residual')).toHaveText('IY');
  await page.getByTestId('result-retry').click();
  await expect(page.getByTestId('budget')).toContainText('Crews: 0 / 2');
  await page.getByTestId('palette-X').click();
  await page.getByTestId('block-0').click();
  await page.getByTestId('palette-Z').click();
  await page.getByTestId('block-1').click();
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await page.getByTestId('result-next').click();
  await expectCityArrival(page, { badge: 'Colour Switcher', selected: 4, selectedName: 'Central District' });
  await goToDistrict(page, 4);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Central District');

  // 4 · Central District: detector highlight, then X on house 4.
  await startChallenge(page, { through: 'training' });
  await page.getByTestId('detector-Z0').click();
  await expect(page.locator('.watch-tint')).toHaveCount(4);
  await page.getByTestId('detector-Z1').click();
  await expect(page.locator('.watch-tint')).toHaveCount(4);
  await expect(page.locator('[data-watch-q="4"]')).toHaveCount(1);
  await page.getByTestId('detector-Z1').click();
  await expect(page.locator('.watch-tint')).toHaveCount(0);
  await page.getByTestId('block-4').click();
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await page.getByTestId('result-next').click();
  await expectCityArrival(page, { badge: 'Blind Dispatcher', selected: 5, selectedName: 'Market Square' });
  await goToDistrict(page, 5);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Market Square');

  // 5 · Market Square: red on 1, blue on 7 → restored.
  await startChallenge(page);
  await page.getByTestId('palette-X').click();
  await page.getByTestId('block-1').click();
  await page.getByTestId('palette-Z').click();
  await page.getByTestId('block-7').click();
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await page.getByTestId('result-next').click();
  await expectCityArrival(page, { badge: 'Two-Colour Chief', selected: 6, selectedName: 'Old Town' });
  await goToDistrict(page, 6);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Old Town');

  // 6 · Old Town: the protocol call → silent failure, still counts as the chapter badge; next → summary.
  await startChallenge(page);
  await page.getByTestId('block-3').click(); // stabilizer-equivalent to house 0
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'logical-failure');
  await expect(page.locator('.logical-chain')).toHaveAttribute('data-chain', '1,2,3');
  await expect(page.getByTestId('result-next')).toHaveText('Summary');
  await page.getByTestId('result-next').click();
  await expect(page.getByTestId('summary')).toBeVisible();
  await expect(page.locator('.badge-item[data-earned="true"]')).toHaveCount(6);
  await expect(page.locator('.topbar-sub')).toContainText('16 of 16 stars');
  await expectNoHorizontalOverflow(page);
});

test('mission 6 lucky guess (houses 1 and 2): success scored lucky, 1 star, no cloud card for that dispatch', async ({ page }) => {
  await seedSave(page, { freeRoam: true });
  await openCity(page);
  await goToDistrict(page, 6);
  await startChallenge(page);
  await page.getByTestId('block-1').click();
  await page.getByTestId('block-2').click();
  await sprayAndSkip(page);
  await expect(page.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
  await expect(page.getByTestId('result-reaction')).toContainText('lucky guess');
  await page.getByTestId('result-details').locator('summary').click();
  await expect(page.getByTestId('decision')).toContainText('Lucky guess — the alarms did not justify it');
  await expect(page.getByTestId('cloud-card')).toHaveCount(0);
  await expect(page.getByTestId('cloud-empty')).toContainText('No cloud result recorded for this dispatch (recorded dispatches: XIIIIIIII).');
  await page.getByTestId('to-result').click();
  await expect(page.getByTestId('result')).toContainText('Lucky guess');
  await expect(page.getByRole('img', { name: '1 of 1 stars' })).toBeVisible();
});

test('How it works: kid copy with the art legend and the jargon under Details; Japanese switch', async ({ page }) => {
  await seedSave(page, {});
  await page.goto('/');
  await page.getByTestId('how').click();
  await expect(page.getByRole('heading', { name: 'How it works' })).toBeVisible();
  await expect(page.locator('.how-list .icon-flame')).toHaveCount(4);
  await expect(page.locator('.how-list .icon-helmet')).toHaveCount(3);
  await expect(page.getByTestId('how-details')).toContainText('the residual R = crews ⊕ fires is judged');
  await expect(page.getByTestId('how-details').locator('summary')).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.getByTestId('back').click();
  await page.getByTestId('lang-toggle').click();
  await page.getByTestId('how').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('あそび方');
  await expectNoHorizontalOverflow(page);
});
