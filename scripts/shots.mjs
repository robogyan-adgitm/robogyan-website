import { chromium } from "@playwright/test";
const [, , base, out, ...paths] = process.argv;
const browser = await chromium.launch();
for (const vp of [
  { w: 1440, h: 900, tag: "desktop" },
  { w: 390, h: 844, tag: "mobile" },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    // Grow the viewport to the full page height so lazy images and in-view animations
    // all fire, force images eager, wait for them, then capture.
    const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: vp.w, height: Math.min(fullHeight, 16000) });
    await page.evaluate(async () => {
      for (const img of document.images) img.loading = "eager";
      await Promise.all(
        [...document.images]
          .filter((i) => !i.complete)
          .map(
            (i) =>
              new Promise((r) => {
                i.onload = i.onerror = r;
              }),
          ),
      );
    });
    await page.waitForTimeout(1800);
    const name = p === "/" ? "home" : p.replace(/^\//, "").replace(/[\/#?]/g, "_");
    await page.screenshot({ path: `${out}/${name}-${vp.tag}.png`, fullPage: true });
    await page.setViewportSize({ width: vp.w, height: vp.h });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    console.log(
      vp.tag,
      p,
      overflow ? "H-OVERFLOW" : "ok",
      errors.length ? "errors: " + errors.join(" | ").slice(0, 300) : "",
    );
    errors.length = 0;
  }
  await ctx.close();
}
await browser.close();
