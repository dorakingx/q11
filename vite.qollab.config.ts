import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Builds the game as ONE self-contained ES module for the Qollab JS/Qiskit project.
 * Output: dist-qollab/q11-game.js (+ q11-game.css, which scripts/build-qollab.mjs merges into qollab/main.css).
 * Qollab loads only index.html, main.js and main.css; main.js imports ./game/q11-game.js.
 */
export default defineConfig({
  plugins: [react()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    target: 'es2022',
    outDir: 'dist-qollab',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: false,
    lib: {
      entry: 'src/qollab-entry.tsx',
      formats: ['es'],
      fileName: () => 'q11-game.js',
      cssFileName: 'q11-game',
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
