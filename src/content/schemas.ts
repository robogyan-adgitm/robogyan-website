/**
 * Zod schemas for every content collection. Content modules import only the inferred
 * TYPES from here (`import type`), so zod never ships in the client bundle; the schemas
 * are enforced by `tests/content.test.ts` (part of `npm run check`).
 */
import { z } from "zod";
import { isIsoDate } from "@/lib/dates";

// ---------- primitives ----------

/** `YYYY-MM-DD`, or `YYYY-MM` when only the month is known. */
export const isoDate = z
  .string()
  .refine(isIsoDate, { message: "Expected ISO date YYYY-MM-DD or YYYY-MM" });
/** Root-relative public asset path, e.g. "/images/projects/agrosmart.png". */
export const assetPath = z.string().regex(/^\/[^\s#]+$/, "Expected a root-relative asset path");
/** Absolute http(s) URL (rejects "#", "#https://…" and other junk). */
export const httpUrl = z.url({ protocol: /^https?$/ });
/** Lowercase kebab-case id, unique within its collection. */
export const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Expected kebab-case id");
const text = z.string().min(1);
/** Email address, or "" when unknown (never guess). */
const optionalEmail = z.union([z.email(), z.literal("")]);
const linkHref = z.string().regex(/^(https:\/\/|mailto:)/, "Expected https:// or mailto: link");

// ---------- site ----------

export const SocialSchema = z.object({
  id: z.enum(["instagram", "linkedin", "youtube", "github", "email"]),
  label: text,
  handle: text,
  href: linkHref,
});
export type Social = z.infer<typeof SocialSchema>;

export const CollegeEraSchema = z.object({
  short: z.enum(["NIEC", "ADGITM", "ADGIPS"]),
  name: text,
  from: z.number().int(),
  /** Omitted for the current name. */
  to: z.number().int().optional(),
  /** True when the year boundaries are best-known, not confirmed. */
  approximate: z.boolean(),
});
export type CollegeEra = z.infer<typeof CollegeEraSchema>;

export const NavItemSchema = z.object({ label: text, href: z.string().startsWith("/") });
export type NavItem = z.infer<typeof NavItemSchema>;

export const ContactChannelSchema = z.object({
  id: slug,
  label: text,
  value: text,
  href: linkHref.optional(),
});
export type ContactChannel = z.infer<typeof ContactChannelSchema>;

export const AboutPointSchema = z.object({
  id: slug,
  title: text,
  /** lucide-react icon export name. */
  icon: text,
});
export type AboutPoint = z.infer<typeof AboutPointSchema>;

export const PhotoSchema = z.object({ src: assetPath, alt: text });
export type Photo = z.infer<typeof PhotoSchema>;

// ---------- team ----------

export const TeamMemberSchema = z.object({
  id: slug,
  name: text,
  role: text,
  /** Academic year of the term, e.g. "2025–26". */
  term: text,
  /** Short specialisation line used on the home page card. */
  tagline: text,
  bio: text,
  techStack: z.array(text).min(1),
  email: optionalEmail,
  linkedin: httpUrl.optional(),
  github: httpUrl.optional(),
  image: assetPath,
  /** Shown in the home page "Core team" strip. */
  featured: z.boolean(),
});
export type TeamMember = z.infer<typeof TeamMemberSchema>;

// ---------- alumni ----------

export const AlumniMemberSchema = z.object({
  /** Person slug; the same person keeps the same id across batches. */
  id: slug,
  name: text,
  /** Position held in Robogyan that year. */
  position: text,
  /** Where they are now. */
  company: text,
  currentRole: text,
  image: assetPath,
  linkedin: httpUrl.optional(),
});
export type AlumniMember = z.infer<typeof AlumniMemberSchema>;

export const AlumniBatchSchema = z.object({
  /** URL segment and display label, e.g. "2024-25" → /alumni/2024-25. */
  id: z.string().regex(/^\d{4}-\d{2}$/),
  title: text,
  description: text,
  /** Batch photo; null when the batch has none yet. */
  image: assetPath.nullable(),
  achievements: z.array(text),
  members: z.array(AlumniMemberSchema).min(1),
});
export type AlumniBatch = z.infer<typeof AlumniBatchSchema>;

// ---------- projects ----------

export const ProjectSchema = z.object({
  id: slug,
  name: text,
  summary: text,
  status: z.enum(["Active", "Completed", "Development", "Research", "Beta"]),
  start: isoDate,
  /** Omitted while the project is ongoing. */
  end: isoDate.optional(),
  techStack: z.array(text).min(1),
  category: z.enum(["Hardware", "Software", "Mixed", "AI/ML", "Robotics", "IoT"]),
  image: assetPath,
  docsUrl: httpUrl.optional(),
  /** Shown on the home page. */
  featured: z.boolean(),
});
export type Project = z.infer<typeof ProjectSchema>;

// ---------- events ----------

export const EventSchema = z.object({
  id: slug,
  name: text,
  type: z.enum(["Workshop", "Hackathon", "Competition", "Interviews", "Event"]),
  status: z.enum(["Open", "Live", "Ended", "Upcoming"]),
  description: text,
  start: isoDate,
  end: isoDate.optional(),
  /** Free-text time line, e.g. "12 noon – 3 pm" or "2-day event". */
  time: text,
  venue: text,
  image: assetPath,
  /** Internal path ("/sih") or external https URL. */
  registrationUrl: z
    .string()
    .regex(/^(\/|https:\/\/)/)
    .optional(),
  prizePool: text.optional(),
});
export type RgEvent = z.infer<typeof EventSchema>;

// ---------- achievements ----------

export const StatSchema = z.object({
  id: slug,
  value: z.number(),
  /** Appended to the number, e.g. "+". */
  suffix: z.string(),
  label: text,
});
export type Stat = z.infer<typeof StatSchema>;

export const WinSchema = z.object({
  id: slug,
  title: text,
  result: text,
  description: text,
  date: isoDate,
  image: assetPath,
});
export type Win = z.infer<typeof WinSchema>;

// ---------- SIH ----------

export const SihWinnerStorySchema = z.object({
  id: slug,
  teamName: text,
  edition: text,
  year: z.number().int(),
  standing: text,
  badge: text,
  /** True for national winners (used by the SIH confetti egg). */
  winner: z.boolean(),
  title: text,
  description: text,
  award: text,
  image: assetPath,
  highlights: z.array(text),
  imageFit: z.enum(["cover", "contain"]),
  /** CSS object-position, e.g. "center" or "top". */
  imagePosition: text,
});
export type SihWinnerStory = z.infer<typeof SihWinnerStorySchema>;

export const SihPhaseSchema = z.object({
  id: slug,
  number: z.number().int().min(1),
  title: text,
  /** Human label; SIH dates are often fuzzy ("Late September 2026"). */
  when: text,
  start: isoDate.optional(),
  end: isoDate.optional(),
  status: z.enum(["Upcoming", "Live", "Completed"]),
  description: text,
  details: z.array(text),
});
export type SihPhase = z.infer<typeof SihPhaseSchema>;

export const SihThemeSchema = z.object({
  id: slug,
  name: text,
  description: text,
  /** lucide-react icon export name, e.g. "Cpu". */
  icon: text,
  category: z.enum(["Both", "Software", "Hardware"]),
});
export type SihTheme = z.infer<typeof SihThemeSchema>;

export const SihTrackSchema = z.object({
  id: z.enum(["software", "hardware"]),
  name: text,
  title: text,
  psCount: text,
  description: text,
  domains: z.array(text),
  deliverable: text,
  /** lucide-react icon export name. */
  icon: text,
  portalLabel: text,
});
export type SihTrack = z.infer<typeof SihTrackSchema>;

export const ProblemStatementSchema = z.object({
  id: slug,
  psNumber: text,
  title: text,
  organization: text,
  category: z.enum(["Software", "Hardware"]),
  domain: text,
  theme: text,
  description: text,
  techStack: z.array(text),
});
export type ProblemStatement = z.infer<typeof ProblemStatementSchema>;

export const PptSlideSchema = z.object({
  id: slug,
  number: z.number().int().min(1),
  title: text,
  subtitle: text,
  keyPoints: z.array(text),
  proTip: text,
});
export type PptSlide = z.infer<typeof PptSlideSchema>;

export const FaqSchema = z.object({
  id: slug,
  category: z.enum(["Eligibility", "Registration", "PPT & Submission", "Internal Hackathon"]),
  question: text,
  answer: text,
});
export type Faq = z.infer<typeof FaqSchema>;

export const SihTeamResultSchema = z.object({
  id: slug,
  sNo: z.number().int().min(1),
  teamName: text,
  leaderName: text,
  status: z.enum(["Selected", "Waitlisted"]),
});
export type SihTeamResult = z.infer<typeof SihTeamResultSchema>;

export const SihJudgeImageSchema = z.object({ id: slug, src: assetPath, alt: text });
export type SihJudgeImage = z.infer<typeof SihJudgeImageSchema>;

// ---------- life at RG ----------

export const MomentSchema = z.object({
  id: slug,
  title: text,
  year: z.number().int(),
  location: text,
  category: text,
  attendees: text.optional(),
  description: text,
  image: assetPath,
  badges: z.array(text),
});
export type Moment = z.infer<typeof MomentSchema>;

export const ActivitySchema = z.object({ id: slug, title: text, src: assetPath, alt: text });
export type Activity = z.infer<typeof ActivitySchema>;

export const GalleryImageSchema = z.object({ id: slug, src: assetPath, alt: text });
export type GalleryImage = z.infer<typeof GalleryImageSchema>;

// ---------- facts ----------

export const FactSchema = z.object({
  id: slug,
  text: text,
  source: z.enum(["instagram", "linkedin", "facebook", "youtube", "web", "site", "placeholder"]),
  verified: z.boolean(),
  year: z.number().int().optional(),
  /** Optional longer version of the fact, shown in the fact card. */
  detail: text.optional(),
  /** Optional link to the post / page the fact came from. */
  url: httpUrl.optional(),
});
export type Fact = z.infer<typeof FactSchema>;
