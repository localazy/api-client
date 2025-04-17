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
      // eslint-disable-next-line @typescript-eslint/no-misused-spread
      reporter: [...(configDefaults.coverage.reporter || []), 'json-summary'],
      reportOnFailure: true,
      exclude: [...(configDefaults.coverage.exclude || []), 'typedoc/**', 'docs/**', 'examples'],
    },
  },
});
