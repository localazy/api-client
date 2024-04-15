/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, '')}/src/`,
      '@tests/': `${resolve(__dirname, '')}/tests/`,
    },
  },

  test: {
    coverage: {
      reporter: [...(configDefaults.coverage.reporter || []), 'json-summary'],
      reportOnFailure: true,
      exclude: [...(configDefaults.coverage.exclude || []), 'typedoc/**', 'docs/**', 'examples'],
    },
  },
});
