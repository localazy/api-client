import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@/': fileURLToPath(new URL('src/', import.meta.url)),
      '@tests/': fileURLToPath(new URL('tests/', import.meta.url)),
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
