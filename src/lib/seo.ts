/** Canonical origin of the deployed site (GitHub Pages custom domain). */
export const SITE_ORIGIN = "https://www.robogyan.tech";

/** Absolute URL for a site path: `absoluteUrl("/sih")` → "https://www.robogyan.tech/sih". */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_ORIGIN).toString();
}

/** Page title in the site format: "SIH 2026 · Robogyan". Omitting gives the home title. */
export function pageTitle(title?: string): string {
  return title ? `${title} · Robogyan` : "Robogyan · Experience Engineering";
}
