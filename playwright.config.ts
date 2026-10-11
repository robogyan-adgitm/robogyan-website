import { defineConfig } from "@playwright/test";

const PORT = 4173;

/**
 * Smoke tests against the production build: `npm run test:e2e` builds, serves dist
 * with `vite preview`, and runs tests/smoke.spec.ts at a desktop and a phone size.
 * Screenshots land in .screenshots/ (git-ignored).
 */
export default defineConfig({
  testDir: "tests",
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    browserName: "chromium",
  },
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [
    {
      name: "desktop",
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
    },
  ],
});
