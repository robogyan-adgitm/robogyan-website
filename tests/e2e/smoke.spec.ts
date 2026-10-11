import { expect, test, type Page } from "@playwright/test";

const routes = [
  "/",
  "/sih",
  "/projects",
  "/events",
  "/team",
  "/alumni",
  "/alumni/2024-25",
  "/life-at-rg",
  "/contact",
];

/** Collect console errors and uncaught page errors for the lifetime of the page. */
function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

for (const route of routes) {
  test(`renders ${route}`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(route);
    await expect(page.locator("main#main h1").first()).toBeVisible();
    await expect(page).toHaveTitle(/Robogyan/);
    if (route.startsWith("/alumni/")) {
      // Batch pages are standalone: no navbar, footer kept.
      await expect(page.getByRole("navigation", { name: "Primary" })).toHaveCount(0);
    } else {
      await expect(
        page.locator("header").getByRole("link", { name: "Robogyan, home" }),
      ).toBeVisible();
    }
    await expect(page.locator("footer")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("unknown route shows the 404 page", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/nope");
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  await expect(page).toHaveTitle(/Page not found · Robogyan/);
  expect(errors).toEqual([]);
});

test("legacy hash URL /#/sih redirects to /sih", async ({ page }) => {
  await page.goto("/#/sih");
  await expect(page).toHaveURL(/\/sih$/);
  await expect(page).toHaveTitle(/SIH 2026 · Robogyan/);
});

test("legacy hash URL keeps the section anchor", async ({ page }) => {
  await page.goto("/#/sih#results");
  await expect(page).toHaveURL(/\/sih#results$/);
});

test("desktop nav marks the active page", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await nav.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(nav.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
  await expect(page).toHaveTitle(/Projects · Robogyan/);
});

test("mobile menu opens, traps focus in a dialog and closes on navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: "Team" }).click();
  await expect(page).toHaveURL(/\/team$/);
  await expect(dialog).toBeHidden();
});

test("gyaan easter egg shows a toast", async ({ page }) => {
  await page.goto("/");
  await page.locator("body").click({ position: { x: 5, y: 300 } });
  await page.keyboard.type("gyaan");
  await expect(page.getByText(/knowledge of robots/)).toBeVisible();
});
