import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/app/server_app";
const baseTestDir = "<rootDir>/src/test/server_app3";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  // roots: ["<rootDir>/src"],
  // collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
  // testMatch: ["**/test/**/*.ts", "**/?(*.)+(spec|test).ts"],
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*test.ts`],
};

export default config;
