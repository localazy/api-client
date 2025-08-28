import { localazy } from '@localazy/eslint-config';

/** @type {import('@localazy/eslint-config').LocalazyOptions} */
const config = {
  ignoreDefinitions: ['.gitignore'],
  features: {
    forcePathAliases: true,
    forceJsExtensions: true,
  },
  userConfigs: [
    {
      ignores: ['examples'],
    },
    {
      rules: {
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'off',
      },
    },
  ],
};

export default localazy(config);
