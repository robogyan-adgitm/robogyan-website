import { describe, expect, it } from "vitest";
import { formatDate, formatRange, isIsoDate, parseIsoDate, yearsSince } from "@/lib/dates";

describe("dates", () => {
  it("validates ISO dates", () => {
    expect(isIsoDate("2026-09-10")).toBe(true);
    expect(isIsoDate("2025-03")).toBe(true);
    expect(isIsoDate("12-09-2025")).toBe(false);
    expect(isIsoDate("2025-02-30")).toBe(false);
    expect(() => parseIsoDate("nope")).toThrow();
  });

  it("formats single dates", () => {
    expect(formatDate("2025-03")).toBe("Mar 2025");
    expect(formatDate("2026-02-19")).toBe("19 Feb 2026");
    expect(formatDate("2026-02-19", { month: "long" })).toBe("19 February 2026");
  });

  it("formats ranges", () => {
    expect(formatRange("2026-02-10", "2026-02-14")).toBe("10–14 Feb 2026");
    expect(formatRange("2025-02", "2025-03")).toBe("Feb – Mar 2025");
    expect(formatRange("2024-12", "2025-01")).toBe("Dec 2024 – Jan 2025");
    expect(formatRange("2025-03")).toBe("Mar 2025");
    expect(formatRange("2025-03", undefined, { openEnded: true })).toBe("Mar 2025 – present");
  });

  it("counts years since founding", () => {
    expect(yearsSince(2009, new Date("2026-10-11"))).toBe(17);
  });
});
