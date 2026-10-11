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

test.describe("alive layer", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("DotField canvas is present and fills the viewport", async ({ page }) => {
    await page.goto("/");
    const canvas = page.locator("canvas#dot-field");
    await expect(canvas).toHaveCount(1);
    const size = await canvas.evaluate((c: HTMLCanvasElement) => ({
      w: c.clientWidth,
      h: c.clientHeight,
      bw: c.width,
      position: getComputedStyle(c).position,
      events: getComputedStyle(c).pointerEvents,
    }));
    expect(size.position).toBe("fixed");
    expect(size.events).toBe("none");
    expect(size.w).toBeGreaterThan(1000);
    expect(size.h).toBeGreaterThan(800);
    expect(size.bw).toBeGreaterThanOrEqual(size.w);
  });

  test("hero letters respond to hover individually", async ({ page }) => {
    await page.goto("/");
    const letter = page.locator("[data-letter='3']");
    await expect(letter).toBeVisible();
    await page.waitForTimeout(1000); // load-in rise
    await letter.hover();
    const glyph = letter.locator("[data-hovered]");
    await expect(glyph).toHaveCount(1);
    await expect(glyph).toHaveCSS("color", "rgb(255, 176, 0)");
    // Only the hovered letter turns kapton.
    await expect(page.locator("#hero-title [data-hovered]")).toHaveCount(1);
    await page.locator("[data-letter='6']").hover();
    await expect(page.locator("[data-letter='6'] [data-hovered]")).toHaveCount(1);
    await expect(page.locator("[data-letter='3'] [data-hovered]")).toHaveCount(0);
  });

  test("custom cursor appears on pointer move", async ({ page }) => {
    await page.goto("/");
    await page.mouse.move(400, 500);
    await page.mouse.move(420, 520);
    const cursor = page.locator("#rg-cursor");
    await expect(cursor).toHaveAttribute("data-visible", "true");
    await expect(page.locator("body")).toHaveClass(/has-custom-cursor/);
  });

  test("reduced motion: no custom cursor, static hero letters", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.mouse.move(400, 500);
    await page.mouse.move(420, 520);
    await expect(page.locator("#rg-cursor")).toHaveCount(0);
    await expect(page.locator("canvas#dot-field")).toHaveCount(1);
    const letter = page.locator("[data-letter='3']");
    await letter.hover();
    const glyph = letter.locator("[data-hovered]");
    await expect(glyph).toHaveCSS("color", "rgb(255, 176, 0)");
    // Colour only: no lift.
    expect(await glyph.evaluate((g) => g.getBoundingClientRect().top)).toBeCloseTo(
      await letter.evaluate((l) => l.getBoundingClientRect().top),
      0,
    );
  });
});
