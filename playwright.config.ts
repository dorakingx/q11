import { defineConfig, devices } from '@playwright/test';

/** Preview port; override with Q11_E2E_PORT when 4173 is taken by another local server. */
const PORT = process.env.Q11_E2E_PORT ?? '4173';

/** WebKit runs the cross-engine subset: smoke, city and spray (the SVG-heavy screens). */
const WEBKIT_SPECS = /(smoke|city|spray)\.spec\.ts$/;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 120_000, // every-mission walks and the viewport matrix take ~40 s unloaded; parallel load doubles that
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  globalTeardown: './e2e/perf-teardown.ts',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
    { name: 'tablet-chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'desktop-webkit', use: { ...devices['Desktop Safari'], viewport: { width: 1280, height: 800 } }, testMatch: WEBKIT_SPECS },
  ],
});
