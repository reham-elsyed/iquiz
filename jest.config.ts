import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  preset: "ts-jest",
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Maps "@/..." to "src/..." as per tsconfig.json
  },
  moduleDirectories: ["node_modules", "./src"],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest", // For JavaScript files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!jose|@auth/prisma-adapter|next-auth| some-other-package-to-transform)/", // Add any other packages you need to transform
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'], // Ignore build and dependency folders
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Use your TypeScript config
    },
  },
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)