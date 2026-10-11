import type { Activity, GalleryImage, Moment } from "./schemas";

export const lifeAtRgIntro = {
  title: "Life at Robogyan",
  description:
    "Where ideas meet late nights in the lab. Robotics, friendship and a lot of solder, since 2009.",
} as const;

/** Six highlighted moments, newest first. */
export const moments: Moment[] = [
  {
    id: "techkriti-2026",
    title: "Techkriti 2026 at IIT Kanpur",
    year: 2026,
    location: "IIT Kanpur",
    category: "Competition",
    // The old home page called this a Tech Innovation "win"; this record says 2nd. Confirm with the client.
    description:
      "Robogyan kept its Techkriti streak alive at IIT Kanpur, taking 2nd position in Tech Innovation.",
    image: "/images/lifeatrg/18.jpg",
    badges: ["2nd position"],
  },
  {
    id: "sih-2025-win",
    title: "Smart India Hackathon 2025",
    year: 2025,
    location: "Manipal University Jaipur",
    category: "SIH 2025",
    attendees: "National hackathon",
    description:
      "A Robogyan team won Smart India Hackathon 2025, Hardware Edition, at MUJ, Jaipur.",
    image: "/images/lifeatrg/sihWin.JPG",
    badges: ["National winners"],
  },
  {
    id: "sih-2024-internal",
    title: "Smart India Hackathon 2024",
    year: 2024,
    location: "ADGIPS",
    category: "SIH 2024",
    attendees: "300+",
    description: "Robogyan ran the SIH 2024 internal round with over 300 participants.",
    image: "/images/lifeatrg/sih24.jpg",
    badges: [],
  },
  {
    id: "hackbmu-6",
    title: "HackBMU 6.0",
    year: 2024,
    location: "BML Munjal University, Haryana",
    category: "Hackathon",
    attendees: "500+",
    description: "Took 2nd position at HackBMU 6.0, along with a cash prize.",
    image: "/images/lifeatrg/HackBMU.png",
    // Old badge said "2nd Runner Up", which contradicts "2nd position" in the description.
    badges: ["2nd position"],
  },
  {
    id: "farewell-2025",
    title: "Farewell for the 2025 batch",
    year: 2025,
    location: "Robogyan Lab, Block 5",
    category: "Lab event",
    description: "The lab said farewell to the 2025 batch, with some of our alumni in the room.",
    image: "/images/lifeatrg/Farewell2025.jpg",
    badges: [],
  },
  {
    id: "techkriti-2025",
    title: "Techkriti 2025 at IIT Kanpur",
    year: 2025,
    location: "IIT Kanpur",
    category: "Competition",
    description:
      "Robogyan won 1st and 2nd at Galactic Dodger and 2nd at Capture the Flag at Techkriti, IIT Kanpur.",
    image: "/images/lifeatrg/Techkriti.jpg",
    badges: ["Multiple positions"],
  },
];

/**
 * Six regular activities. `description` is page copy (the old page had titles only);
 * the zod schema ignores the extra key.
 */
export const activities: (Activity & { description: string })[] = [
  {
    id: "workshops",
    title: "Workshops",
    src: "/images/lifeatrg/workshops.jpg",
    alt: "Students at a hands-on workshop",
    description:
      "Hands-on sessions on soldering, microcontrollers, motor drivers and whatever the next project needs.",
  },
  {
    id: "tech-talks",
    title: "Tech talks",
    src: "/images/lifeatrg/techtalks.jpg",
    alt: "A tech talk with an industry speaker",
    description:
      "People from industry and alumni come back to the lab to talk about what they build and how.",
  },
  {
    id: "hackathons",
    title: "Hackathons",
    src: "/images/lifeatrg/hackathons.jpg",
    alt: "Teams working through a hackathon",
    description:
      "From the SIH internal round to HackBMU: teams form in the lab and ship something in 36 hours.",
  },
  {
    id: "competitions",
    title: "Competitions",
    src: "/images/lifeatrg/competition.jpg",
    alt: "Participants presenting at a competition",
    description:
      "Techkriti at IIT Kanpur, e-Yantra at IIT Bombay and more. The lab packs the bots and travels.",
  },
  {
    id: "project-demos",
    title: "Project demos",
    src: "/images/lifeatrg/demos.jpg",
    alt: "A project demonstration",
    description:
      "Finished builds go on show at Utkarsh and in the lab, where anyone can walk up and try them.",
  },
  {
    id: "team-building",
    title: "Team building",
    src: "/images/lifeatrg/teambuilding.jpg",
    alt: "A team-building activity",
    description: "Farewells, lab nights and the odd trip. The people are the point.",
  },
];

const galleryOrder = [
  "18.jpg",
  "19.webp",
  "5.webp",
  "13.webp",
  "14.webp",
  "22.webp",
  "15.webp",
  "16.webp",
  "17.webp",
  "9.webp",
  "10.webp",
  "23.jpg",
  "21.webp",
  "20.webp",
  "11.webp",
  "12.webp",
  "6.webp",
  "7.webp",
  "8.webp",
  "1.webp",
  "2.webp",
  "3.webp",
  "4.webp",
];

/**
 * 23 gallery photos in display order. Alt text is generic: the photos have no captions
 * yet. [PLACEHOLDER: per-photo captions from the client]
 */
export const gallery: GalleryImage[] = galleryOrder.map((file, i) => ({
  id: `photo-${file.split(".")[0]}`,
  src: `/images/lifeatrg/${file}`,
  alt: `Life at Robogyan, photo ${i + 1} of ${galleryOrder.length}`,
}));

/** "Why join" points from the bottom of the old page. */
export const joinReasons = [
  {
    id: "skills",
    title: "Build skills",
    body: "Develop cutting-edge technical skills with hands-on projects.",
  },
  {
    id: "network",
    title: "Meet people",
    body: "Connect with industry professionals and like-minded peers.",
  },
  {
    id: "compete",
    title: "Win things",
    body: "Win competitions and build a portfolio worth showing.",
  },
] as const;
