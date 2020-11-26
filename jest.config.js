module.exports = {
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!**/errors/**',
    '!**/config/**',
    '!**/start.js',
    '!**/protocols/**',
    '!<rootDir>/tests/**',
    '!**/index.js',
    '!**/*-config.js',
    '!./docs/**',
    '!**/swagger/**',
  ],
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
};
