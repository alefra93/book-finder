import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // CodeSandbox serves the dev server preview from *.csb.app.
    allowedHosts: ['.csb.app'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5.3 still relies on @import and legacy Sass functions:
        // silence those warnings coming from node_modules.
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
