import { alumniBatches } from "@/data/alumni-data";
import { projects } from "@/data/projects-data";
import { teamMembers } from "@/data/team-data";
import { sihSelectedTeams } from "@/data/sih-results-data";

/**
 * Numbers computed from the site's own data. Loaded on demand by FooterYearEgg so
 * the alumni/team/project data does not ship with the footer.
 */
export function footerStats(): string[] {
  const alumni = new Set(alumniBatches.flatMap((b) => b.members.map((m) => m.name)));
  return [
    "14 years of excellence",
    `${alumniBatches.length} alumni batches on record`,
    `${alumni.size} alumni`,
    `${teamMembers.length} on the current team`,
    `${projects.length} projects on this site`,
    `${sihSelectedTeams.length} teams nominated for SIH 2026`,
  ];
}
