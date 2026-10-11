import { sihAnchors } from "@/content/sih";

export interface SihSection {
  id: string;
  label: string;
}

/** In-page sections in document order; the sticky strip and the anchor ids come from here. */
export const sihSections: SihSection[] = [
  { id: sihAnchors.results, label: "Results" },
  { id: sihAnchors.judges, label: "Judges" },
  { id: "legacy", label: "Hall of fame" },
  { id: "timeline", label: "Timeline" },
  { id: "tracks", label: "Tracks and themes" },
  { id: "problem-statements", label: "Problem statements" },
  { id: sihAnchors.pptGuide, label: "PPT guide" },
  { id: "faq", label: "FAQ" },
  { id: sihAnchors.teammateFinder, label: "Teammate finder" },
];
