import { cachedStats } from "@/pb/content";

/**
 * Numbers computed from the site's data: whatever live data is cached, else the bundled
 * snapshot. Loaded on demand by FooterYearEgg.
 */
export function footerStats(): string[] {
  const { alumni: alumniBatches, projects, team, selected } = cachedStats();
  const alumni = new Set(alumniBatches.flatMap((b) => b.members.map((m) => m.name)));
  return [
    "14 years of excellence",
    `${alumniBatches.length} alumni batches on record`,
    `${alumni.size} alumni`,
    `${team.length} on the current team`,
    `${projects.length} projects on this site`,
    `${selected.length} teams nominated for SIH 2026`,
  ];
}
