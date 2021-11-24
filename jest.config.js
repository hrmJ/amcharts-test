/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./setUpJestDom.js", "./mockSvg.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  transformIgnorePatterns: ["node_modules/(?!(@amcharts/amcharts4))"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};

