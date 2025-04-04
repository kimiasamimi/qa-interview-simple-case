import { defineConfig, devices } from '@playwright/test'

export const setupDir = 'playwright/.setup'
export const setupFile = `${setupDir}/user.json`

export default defineConfig({
  workers: 4,
  fullyParallel: true,
  retries: 1,
  timeout: 30000,
  reporter: 'html',

  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
    timeout: 5000,
  },

  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    // Setup project
    { name: 'setup', testDir: './test-setup/', testMatch: '*' },
    {
      name: 'chromium',
      testDir: './tests/',
      use: {
        ...devices['Desktop Chrome'],
        // Use "database" with existing accounts
        storageState: setupFile,
        // Visual testing configuration
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
      dependencies: ['setup'],
    },
  ],
})
