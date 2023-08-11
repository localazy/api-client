import { Config } from 'jest';

const config: Config = {
  maxWorkers: 1,
  verbose: true,
  slowTestThreshold: 60,
  testTimeout: 15000,
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/**/*.spec.ts',
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
  globalSetup: '<rootDir>/tests/jest-setup-before-all.ts',
  setupFilesAfterEnv: [
    '<rootDir>/tests/jest-setup-before-file.ts',
  ],
};

export default config;
