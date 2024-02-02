import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/app/doubles";
const baseTestDir = "<rootDir>/src/test/doubles";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  // roots: ["<rootDir>/src"],
  // collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
  // testMatch: ["**/test/**/*.ts", "**/?(*.)+(spec|test).ts"],
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.ts`],
};

export default config;
