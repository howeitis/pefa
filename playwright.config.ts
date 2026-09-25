import { defineConfig, devices } from '@playwright/test';

// Runs against the prerendered build, served statically — the same files
// Vercel will serve. `npm run build` first.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4174' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 } },
    },
  ],
  // A fresh static server per run, on its own port: the long-lived preview
  // server on :4173 can exhaust file handles under a full parallel run.
  webServer: {
    command: 'npx serve build/client --no-clipboard -l 4174',
    url: 'http://localhost:4174',
    reuseExistingServer: false,
  },
});
