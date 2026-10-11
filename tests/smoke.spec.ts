import { expect, test, type Page } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SHOTS = fileURLToPath(new URL("../.screenshots", import.meta.url));

const ROUTES = [
  { name: "home", path: "/" },
  { name: "sih", path: "/sih" },
  { name: "team", path: "/team" },
  { name: "projects", path: "/projects" },
  { name: "events", path: "/events" },
  { name: "alumni", path: "/alumni" },
  { name: "alumni-2025-26", path: "/alumni/2025-26" },
  { name: "alumni-2024-25", path: "/alumni/2024-25" },
  { name: "life-at-rg", path: "/life-at-rg" },
  { name: "contact", path: "/contact" },
  { name: "404", path: "/nope" },
];

/** Collect console errors, page errors and failed requests for the whole test. */
function watch(page: Page) {
  const problems: string[] = [];
  page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) => {
    // Navigating away aborts in-flight image loads; that is not a failure.
    if (r.failure()?.errorText === "net::ERR_ABORTED") return;
    problems.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`);
  });
  page.on("response", (r) => r.status() >= 400 && problems.push(`HTTP ${r.status()}: ${r.url()}`));
  return problems;
}

/**
 * The site routes on the path (/sih, /team; GitHub Pages serves 404.html, which
 * redirects to /?/sih). Hash URLs like /#/sih render the home page, live and here.
 */
async function open(page: Page, route: string) {
  await page.goto(route);
  await page.waitForLoadState("networkidle");
  // Let entrance animations finish.
  await page.waitForTimeout(1500);
}

const shot = (page: Page, name: string, project: string) =>
  page.screenshot({ path: path.join(SHOTS, `${project}-${name}.png`) });

/** The translate framer-motion writes on a pupil group. */
const pupilTransform = (page: Page, i = 0) =>
  page.getByTestId(`robo-pupil-${i}`).evaluate((el) => (el as SVGGElement).style.transform);

test("every route renders without errors", async ({ page }, info) => {
  const problems = watch(page);
  for (const r of ROUTES) {
    await open(page, r.path);
    await expect(page.locator("#root")).not.toBeEmpty();
    await expect(page.getByTestId("robo-buddy")).toBeVisible();
    if (r.name === "404") await expect(page.getByTestId("lost-bot")).toBeVisible();
    await shot(page, r.name, info.project.name);
  }
  expect(problems).toEqual([]);
});

test("desktop interactions: cursor, wordmark, card, robot, eggs", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "pointer effects are desktop-only");
  const problems = watch(page);
  await open(page, "/");

  // Park over the wordmark: ring + glow appear, letters lift.
  const word = page.getByTestId("hero-wordmark");
  const wb = (await word.boundingBox())!;
  await page.mouse.move(wb.x + wb.width * 0.3, wb.y + wb.height * 0.5, { steps: 12 });
  await page.waitForTimeout(700);
  await expect(page.getByTestId("cursor-companion")).toHaveCSS("opacity", "1");
  const lifted = await word
    .locator("span")
    .evaluateAll((els) => els.filter((e) => (e as HTMLElement).style.top !== "").length);
  expect(lifted).toBeGreaterThan(0);
  await shot(page, "home-hover-wordmark", info.project.name);

  // Pupils follow the pointer.
  await page.mouse.move(40, 120, { steps: 6 });
  await page.waitForTimeout(800);
  const before = await pupilTransform(page);
  await page.mouse.move(1400, 880, { steps: 6 });
  await page.waitForTimeout(800);
  const after = await pupilTransform(page);
  expect(after).not.toEqual(before);

  // Over a card: spotlight host attribute set.
  const card = page.locator(".card-hover").first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const cb = (await card.boundingBox())!;
  await page.mouse.move(cb.x + cb.width * 0.3, cb.y + cb.height * 0.4, { steps: 8 });
  await page.waitForTimeout(700);
  await expect(card).toHaveAttribute("data-rg-spot", "");
  await shot(page, "home-hover-card", info.project.name);

  // Over a link the eyes widen.
  await page.getByRole("link", { name: "Team" }).first().hover();
  await expect(page.getByTestId("robo-buddy")).toHaveAttribute("data-mood", "alert");

  // Hover the robot face itself: it blinks, the mouth LEDs light up.
  const face = page.getByTestId("robo-face");
  const fb = (await face.boundingBox())!;
  await page.mouse.move(fb.x + fb.width / 2, fb.y + fb.height / 2, { steps: 8 });
  await page.waitForTimeout(600);
  await expect(page.getByTestId("robo-buddy")).toHaveAttribute("data-mood", "track");
  await expect(page.getByTestId("robo-led-2")).not.toHaveAttribute("fill", "rgba(255, 255, 255, 0.12)");
  await shot(page, "home-hover-robot", info.project.name);

  // Click the robot: a fact bubble.
  await face.click();
  await expect(page.getByTestId("fact-card")).toBeVisible();
  await page.waitForTimeout(400);
  await shot(page, "home-robot-fact", info.project.name);
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("fact-card")).toBeHidden();

  // Keyboard: focus the robot, Enter shows a fact.
  await face.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fact-card")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("fact-card")).toBeHidden();
  await page.locator("body").click({ position: { x: 5, y: 400 } });

  // Konami: the line-follower drives, the robot is happy, then a fact toast.
  for (const k of ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]) {
    await page.keyboard.press(k);
  }
  await expect(page.getByTestId("konami-bot")).toBeVisible();
  await expect(page.getByTestId("robo-buddy")).toHaveAttribute("data-mood", "happy");
  await page.waitForTimeout(1800);
  await shot(page, "home-konami", info.project.name);
  await expect(page.getByText("Beep. A fact from the lab", { exact: true })).toBeVisible({ timeout: 8000 });
  await page.keyboard.press("Escape");

  // "gyaan": the name explained in a toast.
  await page.keyboard.type("gyaan", { delay: 60 });
  await expect(page.getByText("knowledge of robots. That's the name.").first()).toBeVisible();
  await page.waitForTimeout(400);
  await shot(page, "home-gyaan-toast", info.project.name);
  await page.keyboard.press("Escape");

  // Logo egg: 5 clicks on the nav wordmark. Focus moves to Close, stays inside on
  // Tab, and returns to the wordmark's link afterwards.
  const logo = page.getByTestId("nav-logo");
  for (let i = 0; i < 5; i++) await logo.click();
  await expect(page.getByTestId("logo-egg")).toBeVisible();
  const close = page.getByTestId("logo-egg").getByRole("button", { name: "Close" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.waitForTimeout(900);
  await shot(page, "home-logo-egg", info.project.name);
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("logo-egg")).toBeHidden();
  // The clicked wordmark link had focus before; it gets it back.
  await expect(page.getByRole("link", { name: "ROBOGYAN" }).first()).toBeFocused();

  // Footer year egg.
  const year = page.getByTestId("footer-year");
  await year.scrollIntoViewIfNeeded();
  await year.click();
  await expect(page.getByText("By the numbers", { exact: true })).toBeVisible();
  await page.waitForTimeout(400);
  await shot(page, "home-footer-year", info.project.name);
  await page.keyboard.press("Escape");

  // SIH confetti.
  await open(page, "/sih");
  await page.getByTestId("sih-confetti-chip").click();
  await page.waitForTimeout(450);
  await shot(page, "sih-confetti", info.project.name);

  // End of the line: reach the bottom, settle, then push on with a fresh wheel gesture.
  // Space on a focused button does not count.
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1300);
  await page.getByTestId("footer-year").focus();
  await page.keyboard.press(" ");
  await page.keyboard.press("Escape");
  await expect(page.getByText("End of the line", { exact: true })).toHaveCount(0);
  await page.mouse.move(700, 300);
  await page.mouse.wheel(0, 400);
  await expect(page.getByText("End of the line", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");

  // Gallery dialog on Life at RG: the robot must sit under the overlay.
  await open(page, "/life-at-rg");
  const tile = page.locator('img[alt="Robogyan Gallery moment 1"]');
  await tile.scrollIntoViewIfNeeded();
  await tile.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.waitForTimeout(400);
  const hit = await page.getByTestId("robo-face").evaluate((el) => {
    const r = el.getBoundingClientRect();
    const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !!top && el.contains(top);
  });
  expect(hit).toBe(false);
  await shot(page, "life-at-rg-dialog", info.project.name);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByTestId("fact-card")).toHaveCount(0);

  // 404: the robot looks lost.
  await open(page, "/nope");
  await expect(page.getByTestId("robo-buddy")).toHaveAttribute("data-mood", "lost");

  expect(problems).toEqual([]);
});

test("touch: tapping the robot shows a fact", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "touch-only check");
  const problems = watch(page);
  await open(page, "/");
  await expect(page.getByTestId("cursor-companion")).toHaveCount(0);
  const face = page.getByTestId("robo-face");
  // offsetWidth ignores the head's tilt (the bounding box grows when it turns).
  expect(await face.evaluate((el) => (el as HTMLElement).offsetWidth)).toBe(48);
  await face.tap();
  await expect(page.getByTestId("fact-card")).toBeVisible();
  await page.waitForTimeout(400);
  await shot(page, "home-robot-fact", info.project.name);
  expect(problems).toEqual([]);
});

test("reduced motion: everything still renders", async ({ browser }, info) => {
  test.skip(info.project.name !== "desktop", "one run is enough");
  const ctx = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 900 },
    baseURL: info.project.use.baseURL,
  });
  const page = await ctx.newPage();
  const problems = watch(page);
  await open(page, "/");
  await expect(page.getByTestId("cursor-companion")).toHaveCount(0);
  await page.mouse.move(100, 100);
  await page.waitForTimeout(200);
  const before = await pupilTransform(page);
  await page.mouse.move(1400, 880);
  await page.waitForTimeout(200);
  expect(await pupilTransform(page)).not.toEqual(before);
  // No look-around while idle: the pupils hold still.
  await page.waitForTimeout(7000);
  const idleA = await pupilTransform(page);
  await page.waitForTimeout(3500);
  expect(await pupilTransform(page)).toEqual(idleA);
  await shot(page, "home-reduced-motion", "desktop");
  expect(problems).toEqual([]);
  await ctx.close();
});
