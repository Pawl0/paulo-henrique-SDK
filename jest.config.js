module.exports = {
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: [
    '<rootDir>/lib/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  roots: ['<rootDir>/tests'],
  testEnvironment: 'jest-environment-node',
  transform: {
    '.+\\.ts$': ['ts-jest', { isolatedModules: true }]
  },
}
