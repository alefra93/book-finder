import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// Kept apart from vite.config.ts so the dev server never needs vitest installed.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      css: false,
    },
  }),
);
