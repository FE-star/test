module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ['clover', 'html', 'text-summary'],
  // coverageDirectory: 'coverage-report',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', '!**/node_modules/**'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  modulePaths: ['<rootDir>'],
  testRegex: '(/__tests__/.*)\\.test.(ts|tsx)$',
  setupFiles: [],
  transformIgnorePatterns: ['node_modules/sinon']
};
