/**
 * Site content from PocketBase, with the bundled `@/data/*` snapshot as first paint and
 * fallback. Each hook returns the bundled data until the live records arrive; if
 * PocketBase is not configured, unreachable, errors, or returns no records, the bundled
 * data stays, so the site looks exactly as it does without a backend.
 */
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { fileUrl, pb } from "./client";
import type { TypedPocketBase } from "./types.generated";
import { teamMembers, type TeamMember } from "@/data/team-data";
import { projects, type Project } from "@/data/projects-data";
import { pastEvents, upcomingEvents, type Event } from "@/data/events-data";
import { alumniBatches, type AlumniBatch, type AlumniMember } from "@/data/alumni-data";
import {
  pptSlideGuides,
  sampleProblemStatements,
  sihFAQs,
  sihThemes,
  sihTimeline,
  type FAQItem,
  type PPTSlideGuide,
  type ProblemStatement,
  type SIHTheme,
  type TimelinePhase,
} from "@/data/sih-data";
import {
  sihJudgesData,
  sihSelectedTeams,
  sihWaitlistedTeams,
  type SIHJudge,
  type SIHTeamResult,
} from "@/data/sih-results-data";
import {
  activities,
  galleryImages,
  moments,
  type Activity,
  type GalleryImage,
  type Moment,
} from "@/data/gallery-data";
import { facts, type Fact } from "@/data/facts";
import { siteSettings, type SiteSettings } from "@/data/site-data";

const PLACEHOLDER = "/images/coreTeam/placeholder.svg";

/** How one piece of content is loaded. `load` returns null to keep the bundled data. */
interface Content<T> {
  key: string;
  fallback: T;
  load: (client: TypedPocketBase) => Promise<T | null>;
}

const queryKey = (key: string) => ["pb", key] as const;

const queryOptions = <T,>(c: Content<T>) => ({
  queryKey: queryKey(c.key),
  queryFn: () => c.load(pb!),
  enabled: pb !== null,
  // Content changes rarely; refresh at most every 5 minutes.
  staleTime: 5 * 60_000,
  retry: false,
});

/** `data` is live once loaded, the bundled snapshot until then (and forever offline). */
function useContent<T>(c: Content<T>): { data: T; live: boolean } {
  const q = useQuery(queryOptions(c));
  return { data: q.data ?? c.fallback, live: q.data != null };
}

/** Whatever is cached right now, else the bundle. For non-React callers (eggs, console). */
function cached<T>(c: Content<T>): T {
  return (queryClient.getQueryData(queryKey(c.key)) as T | null | undefined) ?? c.fallback;
}

// ---------------------------------------------------------------------------- helpers

/** JSON fields arrive as arrays (or, defensively, JSON text). */
function strings(v: unknown): string[] {
  let x = v;
  if (typeof x === "string") {
    try {
      x = JSON.parse(x);
    } catch {
      return x ? [x as string] : [];
    }
  }
  return Array.isArray(x) ? x.filter((s): s is string => typeof s === "string") : [];
}

const opt = (s: string | null | undefined) => (s ? s : undefined);
const nonEmpty = <T,>(list: T[]): T[] | null => (list.length ? list : null);
/** Select values from the generated enums, compared as plain strings. */
const str = (v: unknown) => (v == null ? "" : String(v));

// ---------------------------------------------------------------------------- team

export type Ring = "cyan" | "violet" | "indigo" | "mint" | "none";
export type TeamCard = TeamMember & { section?: string; ring?: Ring };

const team: Content<TeamCard[]> = {
  key: "team_members",
  fallback: teamMembers,
  load: async (c) => {
    const rows = await c.collection("team_members").getFullList({ filter: "active = true", sort: "sort" });
    return nonEmpty(
      rows.map((r): TeamCard => {
        const bundled = teamMembers.find((m) => m.name === r.name);
        return {
          id: r.id,
          name: r.name,
          position: r.position,
          period: r.period,
          description: r.bio,
          techStack: strings(r.tech_stack),
          email: r.email,
          social: { linkedin: opt(r.linkedin), github: opt(r.github) },
          image: fileUrl(r, r.image, bundled?.image ?? PLACEHOLDER),
          section: opt(str(r.section)),
          ring: (opt(str(r.ring)) as Ring | undefined) ?? "none",
        };
      }),
    );
  },
};

export const useTeam = () => useContent(team);
export const isPresident = (m: TeamCard) => m.section === "president" || (!m.section && m.position === "President");
export const isVicePresident = (m: TeamCard) =>
  m.section === "vice_president" || (!m.section && m.position === "Vice President");

// ---------------------------------------------------------------------------- projects

const projectsContent: Content<Project[]> = {
  key: "projects",
  fallback: projects,
  load: async (c) => {
    const rows = await c.collection("projects").getFullList({ sort: "sort" });
    return nonEmpty(
      rows.map((r): Project => {
        const bundled = projects.find((p) => p.name === r.name);
        const category = str(r.category);
        return {
          id: r.id,
          name: r.name,
          status: str(r.status) as Project["status"],
          startDate: r.start_date,
          endDate: opt(r.end_date),
          techStack: strings(r.tech_stack),
          category: (category === "AI-ML" ? "AI/ML" : category) as Project["category"],
          image: fileUrl(r, r.image, bundled?.image ?? PLACEHOLDER),
          docsUrl: opt(r.docs_url),
        };
      }),
    );
  },
};

export const useProjects = () => useContent(projectsContent);

// ---------------------------------------------------------------------------- events

export interface EventLists {
  upcoming: Event[];
  past: Event[];
}

const bundledEvents = [...upcomingEvents, ...pastEvents];

const eventsContent: Content<EventLists> = {
  key: "events",
  fallback: { upcoming: upcomingEvents, past: pastEvents },
  load: async (c) => {
    const rows = await c.collection("events").getFullList({ sort: "sort" });
    if (!rows.length) return null;
    const all = rows.map((r) => {
      const bundled = bundledEvents.find((e) => e.name === r.name);
      const event: Event = {
        id: r.id,
        name: r.name,
        type: str(r.type) as Event["type"],
        status: str(r.status) as Event["status"],
        description: r.description,
        date: r.date,
        endDate: opt(r.end_date),
        time: r.time,
        venue: r.venue,
        image: fileUrl(r, r.image, bundled?.image ?? ""),
        registrationUrl: opt(r.registration_url),
        prizePool: r.prize_pool,
      };
      return { event, upcoming: r.upcoming };
    });
    return {
      upcoming: all.filter((e) => e.upcoming).map((e) => e.event),
      past: all.filter((e) => !e.upcoming).map((e) => e.event),
    };
  },
};

export const useEvents = () => useContent(eventsContent);

// ---------------------------------------------------------------------------- alumni

const alumniContent: Content<AlumniBatch[]> = {
  key: "alumni",
  fallback: alumniBatches,
  load: async (c) => {
    const [batches, people] = await Promise.all([
      c.collection("alumni_batches").getFullList({ sort: "sort" }),
      c.collection("alumni").getFullList({ sort: "sort" }),
    ]);
    return nonEmpty(
      batches.map((b): AlumniBatch => {
        const bundled = alumniBatches.find((x) => x.year === b.year);
        return {
          year: b.year,
          subtitle: b.subtitle,
          description: b.description,
          image: fileUrl(b, b.image, bundled?.image ?? ""),
          achievements: strings(b.achievements),
          members: people
            .filter((p) => p.batch === b.id)
            .map((p): AlumniMember => {
              const was = bundled?.members.find((m) => m.name === p.name);
              return {
                id: p.id,
                name: p.name,
                position: p.position,
                currentCompany: p.current_company,
                currentRole: p.current_role,
                image: fileUrl(p, p.image, was?.image ?? PLACEHOLDER),
                linkedin: opt(p.linkedin),
                github: opt(p.github),
                twitter: opt(p.twitter),
              };
            }),
        };
      }),
    );
  },
};

export const useAlumni = () => useContent(alumniContent);

// ---------------------------------------------------------------------------- SIH

export interface SihContent {
  problemStatements: ProblemStatement[];
  themes: SIHTheme[];
  timeline: TimelinePhase[];
  pptGuides: PPTSlideGuide[];
  faqs: FAQItem[];
  selected: SIHTeamResult[];
  waitlisted: SIHTeamResult[];
  judges: SIHJudge[];
}

const sihFallback: SihContent = {
  problemStatements: sampleProblemStatements,
  themes: sihThemes,
  timeline: sihTimeline,
  pptGuides: pptSlideGuides,
  faqs: sihFAQs,
  selected: sihSelectedTeams,
  waitlisted: sihWaitlistedTeams,
  judges: sihJudgesData,
};

/** Each SIH collection loads on its own; a failed or empty one keeps its bundled part. */
const sihContent: Content<SihContent> = {
  key: "sih",
  fallback: sihFallback,
  load: async (c) => {
    const part = async <T,>(fallback: T[], get: () => Promise<T[]>) => {
      try {
        return nonEmpty(await get()) ?? fallback;
      } catch {
        return fallback;
      }
    };
    const [problemStatements, themes, timeline, pptGuides, faqs, results, judges] = await Promise.all([
      part(sampleProblemStatements, async () =>
        (await c.collection("sih_problem_statements").getFullList({ sort: "ps_number" })).map(
          (r): ProblemStatement => ({
            id: r.id,
            psNumber: r.ps_number,
            title: r.title,
            organization: r.organization,
            category: str(r.category) as ProblemStatement["category"],
            domain: r.domain,
            theme: r.theme,
            description: r.description,
            techStack: strings(r.tech_stack),
          }),
        ),
      ),
      part(sihThemes, async () =>
        (await c.collection("sih_themes").getFullList({ sort: "created" })).map(
          (r): SIHTheme => ({
            id: r.id,
            name: r.name,
            description: r.description,
            iconName: r.icon_name,
            color: r.color,
            category: str(r.category) as SIHTheme["category"],
          }),
        ),
      ),
      part(sihTimeline, async () =>
        (await c.collection("sih_timeline").getFullList({ sort: "sort" })).map(
          (r): TimelinePhase => ({
            phase: r.phase,
            title: r.title,
            date: r.date,
            status: str(r.status) as TimelinePhase["status"],
            description: r.description,
            details: strings(r.details),
          }),
        ),
      ),
      part(pptSlideGuides, async () =>
        (await c.collection("sih_ppt_guide").getFullList({ sort: "slide_number" })).map(
          (r): PPTSlideGuide => ({
            slideNumber: r.slide_number,
            title: r.title,
            subtitle: r.subtitle,
            keyPoints: strings(r.key_points),
            proTip: r.pro_tip,
          }),
        ),
      ),
      part(sihFAQs, async () =>
        (await c.collection("sih_faq").getFullList({ sort: "sort" })).map((r): FAQItem => {
          const category =
            r.category || sihFAQs.find((f) => f.question === r.question)?.category || "Internal Hackathon";
          return { question: r.question, answer: r.answer, category: category as FAQItem["category"] };
        }),
      ),
      part<SIHTeamResult>([...sihSelectedTeams, ...sihWaitlistedTeams], async () =>
        (await c.collection("sih_results").getFullList({ sort: "s_no" })).map((r) => ({
          sNo: r.s_no,
          teamName: r.team_name,
          leaderName: r.leader_name,
          status: str(r.status) as SIHTeamResult["status"],
        })),
      ),
      part(sihJudgesData, async () =>
        (await c.collection("sih_judges").getFullList({ sort: "sort" })).map((r, i): SIHJudge => {
          const bundled = sihJudgesData.find((j) => j.name === r.name) ?? sihJudgesData[i];
          return {
            id: r.id,
            name: r.name,
            designation: r.designation,
            affiliation: r.affiliation,
            image: fileUrl(r, r.image, bundled?.image ?? PLACEHOLDER),
            role: opt(r.role),
            quote: opt(r.quote),
          };
        }),
      ),
    ]);
    return {
      problemStatements,
      themes,
      timeline,
      pptGuides,
      faqs,
      selected: results.filter((r) => r.status === "Selected"),
      waitlisted: results.filter((r) => r.status === "Waitlisted"),
      judges,
    };
  },
};

export const useSih = () => useContent(sihContent);

// ---------------------------------------------------------------------------- gallery

export interface LifeAtRg {
  gallery: GalleryImage[];
  moments: Moment[];
  activities: Activity[];
}

const galleryContent: Content<LifeAtRg> = {
  key: "gallery",
  fallback: { gallery: galleryImages, moments, activities },
  load: async (c) => {
    const rows = await c.collection("gallery").getFullList({ sort: "sort" });
    const of = (category: string) => rows.filter((r) => (r.category || "gallery") === category);
    const gallery = of("gallery").map(
      (r, i): GalleryImage => ({
        id: r.id,
        image: fileUrl(r, r.image, galleryImages[i]?.image ?? PLACEHOLDER),
        caption: r.caption,
        category: "gallery",
      }),
    );
    const liveMoments = of("moments").map((r): Moment => {
      const meta = (r.meta && typeof r.meta === "object" ? r.meta : {}) as Record<string, unknown>;
      const bundled = moments.find((m) => m.title === r.caption);
      return {
        id: r.id,
        title: r.caption,
        year: str(meta.year),
        location: str(meta.location),
        category: str(meta.category),
        attendees: opt(str(meta.attendees)),
        description: r.description,
        image: fileUrl(r, r.image, bundled?.image ?? PLACEHOLDER),
        badges: strings(meta.badges),
      };
    });
    const liveActivities = of("activities").map((r): Activity => {
      const bundled = activities.find((a) => a.title === r.caption);
      return {
        src: fileUrl(r, r.image, bundled?.src ?? PLACEHOLDER),
        alt: r.description || r.caption,
        title: r.caption,
      };
    });
    if (!rows.length) return null;
    // Each part falls back on its own, so a half-imported gallery still looks complete.
    return {
      gallery: nonEmpty(gallery) ?? galleryImages,
      moments: nonEmpty(liveMoments) ?? moments,
      activities: nonEmpty(liveActivities) ?? activities,
    };
  },
};

export const useGallery = () => useContent(galleryContent);

// ---------------------------------------------------------------------------- facts

const factsContent: Content<Fact[]> = {
  key: "facts",
  fallback: facts,
  load: async (c) => {
    const rows = await c.collection("facts").getFullList({ sort: "sort" });
    return nonEmpty(
      rows.map((r) => ({
        // `key` is the bundled fact's id, so "don't repeat the last fact" keeps working.
        id: r.key || r.id,
        text: r.text,
        source: (str(r.source) || "site") as Fact["source"],
        year: r.year || undefined,
        url: opt(r.url),
      })),
    );
  },
};

/** Loads the facts into the cache; the eggs read them through `currentFacts()`. */
export const useFacts = () => useContent(factsContent);
export const currentFacts = () => cached(factsContent);

// ---------------------------------------------------------------------------- settings

const SETTINGS_ID = "sitesettings0001";

const settingsContent: Content<SiteSettings> = {
  key: "site_settings",
  fallback: siteSettings,
  load: async (c) => {
    const r = await c.collection("site_settings").getOne(SETTINGS_ID);
    // The record exists from the first migration but stays blank until the import runs;
    // a blank record means "not set up", so keep the bundled settings (results flag included).
    if (!r.tagline && !r.contact_email && !r.address) return null;
    // Blank fields keep the bundled value; the results flag is taken as is.
    const or = (v: string | undefined, d: string) => v || d;
    return {
      tagline: or(r.tagline, siteSettings.tagline),
      contactEmail: or(r.contact_email, siteSettings.contactEmail),
      address: or(r.address, siteSettings.address),
      instagram: or(r.instagram, siteSettings.instagram),
      linkedin: or(r.linkedin, siteSettings.linkedin),
      github: or(r.github, siteSettings.github),
      youtube: or(r.youtube, siteSettings.youtube),
      joinUrl: or(r.join_url, siteSettings.joinUrl),
      sihResultsOut: !!r.sih_results_out,
    };
  },
};

export const useSiteSettings = () => useContent(settingsContent);

// ---------------------------------------------------------------------------- footer egg

/** Cached (or bundled) data for the footer-year egg's numbers; never waits on the network. */
export function cachedStats() {
  const sih = cached(sihContent);
  return {
    alumni: cached(alumniContent),
    projects: cached(projectsContent),
    team: cached(team),
    selected: sih.selected,
  };
}
