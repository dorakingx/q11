import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    environmentMatchGlobs: [['src/ui/**', 'jsdom']],
    coverage: { provider: 'v8', reporter: ['text', 'json-summary'], reportsDirectory: 'reports/coverage' },
  },
});
