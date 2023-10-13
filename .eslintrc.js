module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  plugins: [
    'jest',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2022,
  },
  ignorePatterns: ['dist'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'import/prefer-default-export': 'off',
    'max-len': ['error', { code: 120 }],
    'import/extensions': 'off',
  },
};
