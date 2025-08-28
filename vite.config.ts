import terser from '@rollup/plugin-terser';
import { resolve } from 'node:path';
import Replace from 'unplugin-replace/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import pkg from './package.json';

const banner: string = `/* ${pkg.name}@${pkg.version}
 * (c) ${new Date().getFullYear().toString()} ${pkg.author}
 * @license MIT */\n`;

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, '')}/src/`,
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
    },
    minify: false,
    sourcemap: true,
    rollupOptions: {
      output: [
        // Node ES Module
        {
          format: 'esm',
          entryFileNames: 'localazy-api-client.js',
          banner,
        },
        // Node CommonJS
        {
          format: 'cjs',
          dir: 'dist/node',
          entryFileNames: 'localazy-api-client.cjs',
          banner,
        },
        // Browser ES Module
        {
          format: 'esm',
          entryFileNames: 'localazy-api-client.min.js',
          banner,
          plugins: [terser()],
        },
        // Browser UMD + JS CDNs
        {
          format: 'umd',
          dir: 'dist/browser',
          entryFileNames: 'localazy-api-client.umd.min.js',
          banner,
          name: 'LocalazyCDN',
          esModule: false,
          plugins: [terser()],
        },
      ],

      external: [...Object.keys(pkg.devDependencies || {})],
    },
  },

  plugins: [
    dts({ rollupTypes: true }),

    Replace({
      values: {
        __CLIENT_VERSION__: pkg.version,
      },
    }),
  ],
});
