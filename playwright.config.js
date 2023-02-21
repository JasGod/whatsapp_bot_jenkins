// playwright.config.js
// @ts-check

const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file
  testDir: "tests",

  // Each test is given 30 seconds
  timeout: 30000,

  // Forbid test.only on CI
  forbidOnly: !!process.env.CI,

  // one retry for each test
  retries: 1,

  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 2 : undefined,

  reporter: [["line"], ["html"]],

  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    headless: false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    screenshot: "only-on-failure",
    launchOptions: {
      slowMo: 1000,
    },

    /* Configure projects for major browsers */
    projects: [
      {
        name: "chromium",
        use: {
          ...devices["Desktop Chrome"],
        },
      },
    ],
  },
});
