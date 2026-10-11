import { alumniBatches, founders, presidentsOnRecord } from "@/content/alumni";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { teamMembers } from "@/content/team";
import { yearsSince } from "@/lib/dates";

/**
 * Numbers computed from content, e.g. "17 years", "6 presidents on record", "2 founders".
 * Loaded on demand by FooterYearEgg so the alumni/team/project content does not ship in
 * the main chunk on every page.
 */
export function footerStats(now: Date = new Date()): string[] {
  const alumni = new Set(alumniBatches.flatMap((b) => b.members.map((m) => m.id)));
  return [
    `${yearsSince(site.foundedYear, now)} years`,
    `${presidentsOnRecord().length} presidents on record`,
    `${founders.length} founders`,
    `${alumniBatches.length} alumni batches`,
    `${alumni.size} alumni`,
    `${teamMembers.length} on the current core`,
    `${projects.length} projects on this site`,
  ];
}
