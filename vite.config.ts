import terser from '@rollup/plugin-terser';
import { fileURLToPath } from 'node:url';
import Replace from 'unplugin-replace/vite';
import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';
import pkg from './package.json' with { type: 'json' };

const banner: string = `/* ${pkg.name}@${pkg.version}
 * (c) ${new Date().getFullYear().toString()} ${pkg.author}
 * @license MIT */\n`;

export default defineConfig({
  resolve: {
    alias: {
      '@/': fileURLToPath(new URL('src/', import.meta.url)),
    },
  },

  build: {
    lib: {
      entry: fileURLToPath(new URL('src/main.ts', import.meta.url)),
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
          // https://github.com/localazy/api-client/issues/58
          generatedCode: { symbols: false },
        },
        // Browser ES Module
        {
          format: 'esm',
          entryFileNames: 'localazy-api-client.min.js',
          banner,
          // @ts-expect-error old plugin
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
          // https://github.com/localazy/api-client/issues/58
          generatedCode: { symbols: false },
          // @ts-expect-error old plugin
          plugins: [terser()],
        },
      ],

      external: Object.keys(pkg.devDependencies || {}),
    },
  },

  plugins: [
    dts({ tsconfigPath: 'tsconfig.lib.json', bundleTypes: true }),

    Replace({
      values: {
        __CLIENT_VERSION__: pkg.version,
      },
    }),
  ],
});
