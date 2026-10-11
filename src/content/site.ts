import type { AboutPoint, CollegeEra, ContactChannel, NavItem, Photo, Social } from "./schemas";

/** Core identity. `foundedYear` drives every "since 2009" / years-count string. */
export const site = {
  name: "Robogyan",
  tagline: "Experience Engineering",
  foundedYear: 2009,
  url: "https://www.robogyan.tech",
  description:
    "Robogyan is the oldest technical society of ADGIPS, Delhi: a student-run robotics, embedded and automation lab in Block 5, building since 2009.",
  /** One-line motto used by the console egg. */
  motto: "Experience Engineering, since 2009.",
} as const;

/**
 * The college has been renamed twice; the lab stayed in Block 5.
 * Year boundaries are best-known and NOT confirmed (approximate: true):
 * NIEC → ADGITM around 2018, ADGITM → ADGIPS around 2024. Verify with the client.
 */
export const collegeEras: CollegeEra[] = [
  {
    short: "NIEC",
    name: "Northern India Engineering College",
    from: 2009,
    to: 2018,
    approximate: true,
  },
  {
    short: "ADGITM",
    name: "Dr. Akhilesh Das Gupta Institute of Technology & Management",
    from: 2018,
    to: 2024,
    approximate: true,
  },
  {
    short: "ADGIPS",
    name: "Dr. Akhilesh Das Gupta Institute of Professional Studies",
    from: 2024,
    approximate: true,
  },
];

/** "2009–2018" / "2024–present" */
export function eraYears(era: CollegeEra): string {
  return `${era.from}–${era.to ?? "present"}`;
}

export const lab = {
  name: "Robogyan Lab",
  block: "Block 5",
  /** Single-line address. */
  address: "Robogyan Lab, Block 5, ADGIPS, FC-26, Shastri Park, New Delhi 110053",
  addressLines: [
    "Robogyan Lab, Basement, Block 5",
    "ADGIPS, FC-26, Shastri Park",
    "New Delhi 110053",
  ],
  mapsUrl:
    "https://www.google.com/maps/place/Robogyan/@28.6778227,77.2606192,20z/data=!4m6!3m5!1s0x390cfd4c405859e3:0x49d11941d9dcf968!8m2!3d28.6779389!4d77.2606176!16s%2Fg%2F11fkth91dr",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109.33549765419648!2d77.26041925!3d28.6778227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4c405859e3%3A0x49d11941d9dcf968!2sRobogyan!5e1!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin",
} as const;

export const emails = {
  contact: "robogyan.contact@gmail.com",
} as const;

export const links = {
  /** WhatsApp community (general). */
  whatsappCommunity: "https://chat.whatsapp.com/GP8hZUbEV8G2b3jb0uIBWY?mode=r_c",
  /** WhatsApp group for the SIH teammate finder. */
  whatsappSihTeammates: "https://chat.whatsapp.com/Cvly36rbNvM1ZgtCgRBp2R",
  /**
   * [PLACEHOLDER] The current site has no membership form. "Join" CTAs should send
   * people to /contact (or the WhatsApp community) until the client supplies one.
   */
  joinFormUrl: null as string | null,
  /** Alumni "share your journey" form (from the old alumni page). */
  alumniFormUrl: "https://forms.gle/YuEKqtCMMVYvHHmXA",
} as const;

export const socials: Social[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@robogyan",
    href: "https://www.instagram.com/robogyan",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Robogyan",
    href: "https://www.linkedin.com/company/robogyan/",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@robogyan_official",
    href: "https://www.youtube.com/@robogyan_official",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "robogyan-adgitm",
    href: "https://github.com/robogyan-adgitm",
  },
  {
    id: "email",
    label: "Email",
    handle: "robogyan.contact@gmail.com",
    href: "mailto:robogyan.contact@gmail.com",
  },
];

/** Primary navigation (Contact is rendered separately as the CTA button). */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "SIH 2026", href: "/sih" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "Alumni", href: "/alumni" },
  { label: "Life at RG", href: "/life-at-rg" },
];

export const contactNavItem: NavItem = { label: "Contact", href: "/contact" };

/** Every route, for the footer "Explore" column and the sitemap test. */
export const exploreLinks: NavItem[] = [...navItems, contactNavItem];

/** Channels on the contact page. */
export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: "robogyan.contact@gmail.com",
    href: "mailto:robogyan.contact@gmail.com",
  },
  {
    id: "whatsapp",
    label: "WhatsApp community",
    value: "Join our community chat",
    href: "https://chat.whatsapp.com/GP8hZUbEV8G2b3jb0uIBWY?mode=r_c",
  },
  {
    id: "address",
    label: "Address",
    value:
      "Basement, Block 5, Dr. Akhilesh Das Gupta Institute of Professional Studies, Shastri Park, Delhi 110053",
  },
];

/** Home page "About" block. */
export const about = {
  mission:
    "Robogyan is all about the sheer joy of learning. You don't just learn through workshops; you learn by experimenting and doing things you never thought you could.",
  heroLine:
    "Engineering comes alive at Robogyan. Dive into hands-on innovation, master your skills, and build what's next.",
  points: [
    { id: "projects", title: "Innovation-driven projects", icon: "Rocket" },
    { id: "community", title: "Collaborative community", icon: "Users" },
    { id: "hands-on", title: "Hands-on learning", icon: "Cog" },
    { id: "competitions", title: "Compete in competitions", icon: "Trophy" },
  ] satisfies AboutPoint[],
  photos: [
    { src: "/images/ourMission/2.jpg", alt: "Robogyan members working at IIIT Delhi" },
    { src: "/images/ourMission/1.jpg", alt: "The Robogyan lab with the RC plane" },
    { src: "/images/ourMission/3.jpg", alt: "Inside the Robogyan lab" },
    { src: "/images/ourMission/4.jpg", alt: "The lab before Techkriti" },
  ] satisfies Photo[],
};

/** Hero video used on Home and Life at RG. */
export const heroVideo = {
  src: "/images/heroVideo.mp4",
  poster: "/images/rglab2.jpg",
} as const;
