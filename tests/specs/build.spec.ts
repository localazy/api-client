import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { describe, expect, test } from 'vitest';

const distDir: string = resolve(process.cwd(), 'dist');

const bundles = {
  cjsNode: resolve(distDir, 'node/localazy-api-client.cjs'),
  esmNode: resolve(distDir, 'localazy-api-client.js'),
  esmBrowser: resolve(distDir, 'localazy-api-client.min.js'),
  umdBrowser: resolve(distDir, 'browser/localazy-api-client.umd.min.js'),
  types: resolve(distDir, 'index.d.ts'),
};

const allPresent: boolean = Object.values(bundles).every((path: string): boolean =>
  existsSync(path),
);
const inCI: boolean = Boolean(process.env.CI);

const runNode = (source: string, asModule: boolean): string => {
  const args: string[] = asModule ? ['--input-type=module', '-e', source] : ['-e', source];
  return execFileSync(process.execPath, args, { encoding: 'utf8' });
};

describe.skipIf(!allPresent && !inCI)('Built artifacts', (): void => {
  test('all bundles are present', (): void => {
    expect(allPresent, 'Built artifacts missing. `pnpm build` must run before tests in CI.').toBe(
      true,
    );
  });

  test.skipIf(!allPresent)('Node CJS loads via require() and exposes ApiClient', (): void => {
    const output: string = runNode(
      `const mod = require(${JSON.stringify(bundles.cjsNode)}); process.stdout.write(Object.keys(mod).join(','));`,
      false,
    );

    expect(output.split(',')).toContain('ApiClient');
  });

  test.skipIf(!allPresent)('Node ESM loads via import() and exposes ApiClient', (): void => {
    const output: string = runNode(
      `const mod = await import(${JSON.stringify(bundles.esmNode)}); process.stdout.write(Object.keys(mod).join(','));`,
      true,
    );

    expect(output.split(',')).toContain('ApiClient');
  });

  test.skipIf(!allPresent)('Browser ESM loads via import() and exposes ApiClient', (): void => {
    const output: string = runNode(
      `const mod = await import(${JSON.stringify(bundles.esmBrowser)}); process.stdout.write(Object.keys(mod).join(','));`,
      true,
    );

    expect(output.split(',')).toContain('ApiClient');
  });

  test.skipIf(!allPresent)('UMD evaluates without throwing', (): void => {
    expect((): void => {
      runNode(`require(${JSON.stringify(bundles.umdBrowser)});`, false);
    }).not.toThrow();
  });

  test.skipIf(!allPresent)('TypeScript declarations include ApiClient', (): void => {
    const content: string = readFileSync(bundles.types, 'utf8');
    expect(content).toMatch(/\bApiClient\b/u);
  });
});
