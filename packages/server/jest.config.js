const pack = require('./package.json');

module.exports = {
  displayName: pack.name,
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  coverageReporters: ['lcov', 'html'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
  moduleFileExtensions: ['ts', 'tsx', 'json', 'js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/src/test/setupEnv.js'],
};
