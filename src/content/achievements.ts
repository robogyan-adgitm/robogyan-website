import { yearsSince } from "@/lib/dates";
import { site } from "./site";
import type { Stat, Win } from "./schemas";

/**
 * Headline stats for Dimension callouts. "Years" is computed from the founding year,
 * never hard-coded. Order: years, members, wins, projects.
 */
export function headlineStats(now: Date = new Date()): Stat[] {
  return [
    { id: "years", value: yearsSince(site.foundedYear, now), suffix: "", label: "years" },
    { id: "members", value: 130, suffix: "+", label: "active members" },
    { id: "wins", value: 100, suffix: "+", label: "competition wins" },
    { id: "projects", value: 50, suffix: "+", label: "projects" },
  ];
}

/** Static snapshot of the stats (years as of build time). */
export const stats: Stat[] = headlineStats();

/** Latest wins (home page rail), newest first. */
export const latestWins: Win[] = [
  {
    id: "techkriti-2026",
    title: "Techkriti, IIT Kanpur",
    result: "Tech Innovation winners",
    description:
      "Won the Tech Innovation challenge with a fully integrated device, clean execution and solid engineering.",
    date: "2026-03",
    image: "/images/events/Techkriti26.jpg",
  },
  {
    id: "robocraze-2026",
    title: "RoboCraze 2026",
    result: "7th position",
    description: "Placed 7th in the roborace event and won a cash prize.",
    date: "2026-02",
    image: "/images/events/robocraze26.jpeg",
  },
  {
    id: "sih-legacy",
    title: "Smart India Hackathon",
    result: "2× national winners, 4× finalists",
    description:
      "Robogyan teams have won the SIH Grand Finale twice and reached the national finals four times, with AI and IoT builds.",
    date: "2025-12",
    image: "/images/events/sihWin.JPG",
  },
];

/**
 * Competition record collected from the brief and alumni batches, for a longer wins rail.
 * Years are the batch year where the old data gives no exact date.
 */
export const trackRecord: { id: string; year: number; title: string }[] = [
  { id: "sih-2025", year: 2025, title: "Smart India Hackathon 2025: national winners" },
  { id: "sih-2019", year: 2019, title: "Smart India Hackathon 2019: national winners" },
  {
    id: "techkriti-2025",
    year: 2025,
    title: "Techkriti, IIT Kanpur: Galactic Dodger 1st & 2nd, Capture the Flag 2nd",
  },
  { id: "hackbmu-2024", year: 2024, title: "HackBMU 6.0: 2nd position" },
  { id: "xylem-2024", year: 2024, title: "Xylem: global winners" },
  { id: "eyantra-2022", year: 2022, title: "e-Yantra, IIT Bombay: winners" },
  { id: "tata-crucible-2021", year: 2021, title: "Tata Crucible: winners" },
];
