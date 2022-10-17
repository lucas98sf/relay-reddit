const pack = require('./package.json');

module.exports = {
  displayName: pack.name,
  modulePathIgnorePatterns: ['/node_modules/', '/dist/', '/fixtures/'],
  coverageReporters: ['lcov', 'html'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
  moduleFileExtensions: ['ts', 'tsx', 'json', 'js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/src/test/setupEnv.js'],
};
