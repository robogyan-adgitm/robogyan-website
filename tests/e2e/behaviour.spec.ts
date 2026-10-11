import { expect, test } from "@playwright/test";

/** Top of the sticky chrome on /sih: navbar (64px) + section strip (44px). */
const SIH_CHROME = 112;

test.describe("SIH anchors", () => {
  for (const hash of ["#results", "#judges", "#ppt-guide", "#teammate-finder"]) {
    test(`cold load of /sih${hash} lands on the section`, async ({ page }) => {
      await page.goto(`/sih${hash}`);
      const target = page.locator(hash);
      await expect(target).toBeVisible();
      await expect
        .poll(async () => (await target.boundingBox())?.y ?? Infinity, { timeout: 5000 })
        .toBeLessThanOrEqual(SIH_CHROME + 2);
      await expect(page.locator("nav[aria-label='On this page'] a[aria-current]")).toHaveAttribute(
        "href",
        hash,
      );
    });
  }

  test("the 2025 portal's #results-section still lands on results", async ({ page }) => {
    await page.goto("/sih#results-section");
    await expect
      .poll(async () => (await page.locator("#results").boundingBox())?.y ?? Infinity)
      .toBeLessThanOrEqual(SIH_CHROME + 2);
  });

  test("home CTA reaches the results from another page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /See the 45 selected teams/ }).click();
    await expect(page).toHaveURL(/\/sih#results$/);
    await expect
      .poll(async () => (await page.locator("#results").boundingBox())?.y ?? Infinity)
      .toBeLessThanOrEqual(SIH_CHROME + 2);
  });
});

test("lightbox: arrows move, Esc closes and focus returns to the thumbnail", async ({ page }) => {
  await page.goto("/life-at-rg");
  const thumb = page.getByRole("button", { name: "Open photo 1 of 23" });
  await thumb.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Gallery viewer" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("1 / 23")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText("2 / 23")).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByText("23 / 23")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(thumb).toBeFocused();
});

test("reduced motion: dimension counters show their final values at once", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/sih");
  await expect(page.getByText("1,500 participants").first()).toBeVisible();
  await expect(page.getByText("240+ teams").first()).toBeVisible();
  // The ticker is a static strip, not a marquee.
  await page.goto("/");
  await expect(page.locator(".animate-marquee")).toHaveCount(0);
});

test.describe("custom cursor", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("hands back to the native cursor while a dialog is open", async ({ page }) => {
    await page.goto("/");
    await page.mouse.move(600, 400);
    await page.mouse.move(620, 420);
    await expect(page.locator("body")).toHaveClass(/has-custom-cursor/);
    // Open the fact card from the ticker with the keyboard (no pointer move involved).
    const fact = page.locator("section[aria-label='Robogyan facts'] button").first();
    await fact.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Robogyan fact" })).toBeVisible();
    await expect(page.locator("body")).not.toHaveClass(/has-custom-cursor/);
    await page.keyboard.press("Escape");
    await page.mouse.move(640, 440);
    await expect(page.locator("body")).toHaveClass(/has-custom-cursor/);
  });

  test("hides over text fields so the native I-beam shows", async ({ page }) => {
    await page.goto("/sih#results");
    const input = page.getByRole("searchbox").first();
    await input.scrollIntoViewIfNeeded();
    const box = (await input.boundingBox())!;
    await page.mouse.move(box.x + 40, box.y + box.height / 2);
    await page.mouse.move(box.x + 60, box.y + box.height / 2);
    await expect(page.locator("#rg-cursor")).toHaveAttribute("data-mode", "text");
    expect(await input.evaluate((el) => getComputedStyle(el).cursor)).toBe("text");
  });
});
