import localazy from '@localazy/eslint-config';

export default localazy({
  ignoreDefinitions: ['.gitignore'],
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
});
