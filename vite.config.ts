import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults'],
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rolldownOptions: {
      input: {
        main: resolve(fileURLToPath(new URL('.', import.meta.url)), 'index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
        quietDeps: true,
      },
    },
  },
  publicDir: 'public',
});
