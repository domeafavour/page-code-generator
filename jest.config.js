/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '<rootDir>/bower_components/',
    '<rootDir>/node_modules/',
  ],
};
