import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all interfaces and accept the *.csb.app preview host, so the
    // dev server also works inside a CodeSandbox Devbox container.
    host: true,
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
});
