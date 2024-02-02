import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/app/pass_checker";
const baseTestDir = "<rootDir>/src/test/pass_checker";

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
