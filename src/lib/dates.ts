/**
 * Date helpers. Content stores dates as ISO `YYYY-MM-DD` strings (or `YYYY-MM` when
 * only the month is known). Everything is formatted with `Intl` in en-IN.
 */

const ISO_RE = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/;

/** True when the string is `YYYY-MM-DD` or `YYYY-MM` with a real calendar date. */
export function isIsoDate(value: string): boolean {
  const m = ISO_RE.exec(value);
  if (!m) return false;
  const [, y, mo, d] = m;
  const date = new Date(Date.UTC(Number(y), Number(mo) - 1, d ? Number(d) : 1));
  return (
    date.getUTCFullYear() === Number(y) &&
    date.getUTCMonth() === Number(mo) - 1 &&
    (!d || date.getUTCDate() === Number(d))
  );
}

/** Parse an ISO date (or month) as a UTC midnight `Date`. Throws on bad input. */
export function parseIsoDate(value: string): Date {
  const m = ISO_RE.exec(value);
  if (!m || !isIsoDate(value)) throw new Error(`Invalid ISO date: "${value}"`);
  const [, y, mo, d] = m;
  return new Date(Date.UTC(Number(y), Number(mo) - 1, d ? Number(d) : 1));
}

/** True when the ISO string carries a day (`YYYY-MM-DD`), not just a month. */
export function hasDay(value: string): boolean {
  return value.length === 10;
}

export interface FormatDateOptions {
  /** Month style. Default "short" ("Sep"). */
  month?: "short" | "long" | "numeric";
  /** Show the day. Default: only when the ISO string has one. */
  day?: boolean;
  /** Show the year. Default true. */
  year?: boolean;
}

/**
 * Format an ISO date for display, e.g. `formatDate("2026-09-10")` → "10 Sept 2026",
 * `formatDate("2025-03")` → "Mar 2025".
 */
export function formatDate(iso: string, opts: FormatDateOptions = {}): string {
  const { month = "short", year = true } = opts;
  const day = opts.day ?? hasDay(iso);
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "UTC",
    day: day ? "numeric" : undefined,
    month,
    year: year ? "numeric" : undefined,
  }).format(parseIsoDate(iso));
}

/**
 * Format a date range compactly:
 * - `formatRange("2026-09-10", "2026-09-14")` → "10–14 Sep 2026"
 * - `formatRange("2025-09", "2025-12")` → "Sep – Dec 2025"
 * - `formatRange("2025-03")` → "Mar 2025 – present" when `openEnded`, else "Mar 2025".
 */
export function formatRange(
  startIso: string,
  endIso?: string,
  opts: { month?: "short" | "long"; openEnded?: boolean } = {},
): string {
  const { month = "short", openEnded = false } = opts;
  if (!endIso || endIso === startIso) {
    const single = formatDate(startIso, { month });
    return !endIso && openEnded ? `${single} – present` : single;
  }
  const a = parseIsoDate(startIso);
  const b = parseIsoDate(endIso);
  const withDay = hasDay(startIso) && hasDay(endIso);
  const sameYear = a.getUTCFullYear() === b.getUTCFullYear();
  const sameMonth = sameYear && a.getUTCMonth() === b.getUTCMonth();
  if (withDay && sameMonth) {
    return `${a.getUTCDate()}–${formatDate(endIso, { month })}`;
  }
  if (sameYear) {
    return `${formatDate(startIso, { month, year: false, day: withDay })} – ${formatDate(endIso, { month, day: withDay })}`;
  }
  return `${formatDate(startIso, { month, day: withDay })} – ${formatDate(endIso, { month, day: withDay })}`;
}

/** Whole years elapsed since `fromYear` (e.g. founding year) as of `now`. */
export function yearsSince(fromYear: number, now: Date = new Date()): number {
  return now.getFullYear() - fromYear;
}
