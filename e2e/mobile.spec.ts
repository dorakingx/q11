/// <reference lib="dom" />
import { allBlocksLargeEnough, expect, expectNoHorizontalOverflow, test } from './helpers';

/**
 * Tap flow. On the mobile project (hasTouch) every interaction is a real touch tap; on desktop the same
 * flow runs with clicks so the two projects exercise identical screens.
 */
test('mission 5 tap flow: palette → blocks → sticky confirm → debrief', async ({ page, hasTouch, isMobile }) => {
  if (isMobile) expect(hasTouch, 'mobile project must emulate touch').toBe(true);
  const tap = async (testId: string) => {
    const el = page.getByTestId(testId);
    if (hasTouch) await el.tap();
    else await el.click();
  };
  await page.goto('/');
  await tap('play');
  await tap('mission-5');
  await tap('start-mission');
  await expect(page.getByTestId('confirm')).toBeVisible();
  await allBlocksLargeEnough(page);
  await expectNoHorizontalOverflow(page);
  // Alarms: Z0, Z2 (red) and X1 (blue).
  await expect(page.locator('[data-ringing="1"]')).toHaveCount(3);
  await tap('palette-X');
  await tap('block-1');
  await tap('palette-Z');
  await tap('block-7');
  await expect(page.getByTestId('budget')).toContainText('Crews: 2 / 2');
  // Budget reached: a third tap does nothing.
  await tap('block-4');
  await expect(page.getByTestId('budget')).toContainText('Crews: 2 / 2');
  // Tap a placed block with the same colour → recall, then re-place.
  await tap('block-7');
  await expect(page.getByTestId('budget')).toContainText('Crews: 1 / 2');
  await tap('block-6');
  // The sticky confirm bar must be inside the viewport without scrolling.
  const confirm = page.getByTestId('confirm');
  const box = await confirm.boundingBox();
  const vh = await page.evaluate(() => window.innerHeight);
  expect(box).not.toBeNull();
  if (box !== null) expect(box.y + box.height).toBeLessThanOrEqual(vh + 0.5);
  await tap('confirm');
  await expect(page.getByTestId('verdict')).toContainText('Logical qubit safe');
  await expect(page.getByTestId('whatif')).toContainText(/stabilizer/);
  await expectNoHorizontalOverflow(page);
});
