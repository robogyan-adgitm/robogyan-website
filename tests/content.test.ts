import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { headlineStats, latestWins, stats } from "@/content/achievements";
import { alumniBatches, founders, getBatch, presidentsOnRecord } from "@/content/alumni";
import { pastEvents, upcomingEvents } from "@/content/events";
import { facts, randomFact, verifiedFacts } from "@/content/facts";
import { imageMeta } from "@/content/imageMeta";
import { activities, gallery, moments } from "@/content/lifeAtRg";
import { projects } from "@/content/projects";
import * as S from "@/content/schemas";
import {
  pptSlides,
  sampleProblemStatements,
  sihFaqs,
  sihThemes,
  sihTimeline,
  sihTracks,
  sihWinnerStories,
} from "@/content/sih";
import {
  sihJudgeImages,
  sihResults,
  sihSelectedTeams,
  sihWaitlistedTeams,
} from "@/content/sihResults";
import {
  about,
  collegeEras,
  contactChannels,
  exploreLinks,
  navItems,
  socials,
} from "@/content/site";
import { teamMembers } from "@/content/team";

const publicDir = resolve(__dirname, "../public");

function parseAll<T extends { id: string }>(schema: z.ZodType<T>, items: T[]): T[] {
  const parsed = z.array(schema).parse(items);
  const ids = parsed.map((i) => i.id);
  expect(new Set(ids).size, `duplicate ids: ${ids.join(", ")}`).toBe(ids.length);
  return parsed;
}

function assetExists(src: string): boolean {
  return existsSync(resolve(publicDir, "." + src));
}

describe("content schemas", () => {
  it("site", () => {
    z.array(S.SocialSchema).parse(socials);
    z.array(S.CollegeEraSchema).parse(collegeEras);
    z.array(S.NavItemSchema).parse(exploreLinks);
    parseAll(S.ContactChannelSchema, contactChannels);
    parseAll(S.AboutPointSchema, about.points);
    z.array(S.PhotoSchema).parse(about.photos);
    expect(navItems).toHaveLength(7);
    expect(socials.find((s) => s.id === "instagram")?.href).toBe(
      "https://www.instagram.com/robogyan",
    );
  });

  it("team: 8 core members", () => {
    expect(parseAll(S.TeamMemberSchema, teamMembers)).toHaveLength(8);
    expect(teamMembers.filter((m) => m.featured)).toHaveLength(4);
    expect(teamMembers.find((m) => m.id === "sneha-mukherjee")?.email).toBe("");
  });

  it("alumni: 2 founders + 6 batches", () => {
    expect(parseAll(S.AlumniMemberSchema, founders)).toHaveLength(2);
    expect(parseAll(S.AlumniBatchSchema, alumniBatches)).toHaveLength(6);
    for (const b of alumniBatches) parseAll(S.AlumniMemberSchema, b.members);
    expect(getBatch("2024-25")?.members[0]?.name).toBe("Vidhi Gupta");
    expect(presidentsOnRecord()).toHaveLength(6);
  });

  it("projects: 5", () => {
    expect(parseAll(S.ProjectSchema, projects)).toHaveLength(5);
    expect(projects.map((p) => p.name)).toContain("Hovercrafts");
  });

  it("events: 6 past, end never before start", () => {
    parseAll(S.EventSchema, upcomingEvents);
    expect(parseAll(S.EventSchema, pastEvents)).toHaveLength(6);
    for (const e of pastEvents) if (e.end) expect(e.end >= e.start, e.id).toBe(true);
  });

  it("achievements", () => {
    parseAll(S.StatSchema, stats);
    parseAll(S.WinSchema, latestWins);
    expect(headlineStats(new Date("2026-10-11"))[0]?.value).toBe(17);
  });

  it("sih", () => {
    expect(parseAll(S.SihWinnerStorySchema, sihWinnerStories)).toHaveLength(5);
    expect(sihWinnerStories.filter((s) => s.winner).length).toBeGreaterThanOrEqual(2);
    expect(parseAll(S.SihPhaseSchema, sihTimeline)).toHaveLength(6);
    expect(sihTimeline.map((p) => p.number)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(z.array(S.SihTrackSchema).parse(sihTracks)).toHaveLength(2);
    expect(parseAll(S.SihThemeSchema, sihThemes)).toHaveLength(12);
    expect(parseAll(S.ProblemStatementSchema, sampleProblemStatements)).toHaveLength(6);
    expect(parseAll(S.PptSlideSchema, pptSlides)).toHaveLength(6);
    expect(parseAll(S.FaqSchema, sihFaqs)).toHaveLength(9);
  });

  it("sih results: 45 selected + 5 waitlisted, 12 judges", () => {
    expect(parseAll(S.SihTeamResultSchema, sihSelectedTeams)).toHaveLength(45);
    expect(parseAll(S.SihTeamResultSchema, sihWaitlistedTeams)).toHaveLength(5);
    expect(sihSelectedTeams.every((t) => t.status === "Selected")).toBe(true);
    expect(sihWaitlistedTeams.every((t) => t.status === "Waitlisted")).toBe(true);
    parseAll(S.SihTeamResultSchema, sihResults);
    expect(parseAll(S.SihJudgeImageSchema, sihJudgeImages)).toHaveLength(12);
  });

  it("life at RG: 6 moments, 6 activities, 23 gallery photos", () => {
    expect(parseAll(S.MomentSchema, moments)).toHaveLength(6);
    expect(parseAll(S.ActivitySchema, activities)).toHaveLength(6);
    expect(parseAll(S.GalleryImageSchema, gallery)).toHaveLength(23);
  });

  it("facts", () => {
    expect(parseAll(S.FactSchema, facts).length).toBeGreaterThanOrEqual(20);
    expect(verifiedFacts().length).toBeGreaterThan(0);
    for (const f of facts)
      if (f.source === "placeholder") expect(f.text).toMatch(/^\[PLACEHOLDER: /);
    const first = randomFact({ random: () => 0 });
    expect(randomFact({ random: () => 0, exclude: first.id }).id).not.toBe(first.id);
  });
});

describe("assets referenced by content exist on disk", () => {
  const images = [
    ...teamMembers.map((m) => m.image),
    ...founders.map((m) => m.image),
    ...alumniBatches.flatMap((b) => [b.image, ...b.members.map((m) => m.image)]),
    ...projects.map((p) => p.image),
    ...pastEvents.map((e) => e.image),
    ...latestWins.map((w) => w.image),
    ...sihWinnerStories.map((s) => s.image),
    ...sihJudgeImages.map((j) => j.src),
    ...moments.map((m) => m.image),
    ...activities.map((a) => a.src),
    ...gallery.map((g) => g.src),
    ...about.photos.map((p) => p.src),
  ].filter((s): s is string => s !== null);

  it.each([...new Set(images)])("%s", (src) => {
    expect(assetExists(src)).toBe(true);
    expect(imageMeta[src], `missing imageMeta for ${src}`).toBeDefined();
  });

  it("12 judge images and 23 gallery images are distinct files", () => {
    expect(new Set(sihJudgeImages.map((j) => j.src)).size).toBe(12);
    expect(new Set(gallery.map((g) => g.src)).size).toBe(23);
  });

  it("public essentials", () => {
    for (const f of [
      "CNAME",
      "404.html",
      "robots.txt",
      "sitemap.xml",
      "favicon.svg",
      "og.png",
      "logo.png",
    ]) {
      expect(existsSync(resolve(publicDir, f)), f).toBe(true);
    }
  });
});
