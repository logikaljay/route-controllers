module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/lib",
    "<rootDir>/src/__tests__/controllers"
  ]
};