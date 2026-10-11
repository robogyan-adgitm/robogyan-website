import type { AlumniBatch, AlumniMember } from "./schemas";

/**
 * Where each alumnus is now. One record per person, so a person who served in several
 * batches shows the same current role everywhere (the old data had stale copies).
 */
interface Person {
  name: string;
  company: string;
  currentRole: string;
  image: string;
  linkedin?: string;
}

const people = {
  "vidhi-gupta": {
    name: "Vidhi Gupta",
    company: "Emonics",
    currentRole: "Data Analyst",
    image: "/images/alumni/vidhi.png",
    linkedin: "https://www.linkedin.com/in/vidhi2410/",
  },
  "jayam-shrivastav": {
    name: "Jayam Shrivastav",
    company: "Finkeda",
    currentRole: "Technology Trainee",
    image: "/images/alumni/jayam.jpg",
    linkedin: "https://www.linkedin.com/in/jayamshrivastav-dev/",
  },
  "amogh-saxena": {
    name: "Amogh Saxena",
    company: "ADGIPS",
    currentRole: "B.Tech CSE, final year",
    image: "/images/alumni/amogh.jpg",
    linkedin: "https://www.linkedin.com/in/amogh-saxena-aa497a289/",
  },
  "aditya-goel": {
    name: "Macle (Aditya Goel)",
    company: "ADGIPS",
    currentRole: "B.Tech CSE, final year",
    image: "/images/alumni/macle.png",
    linkedin: "https://www.linkedin.com/in/macle57/",
  },
  ashish: {
    name: "Ashish",
    company: "GreyOrange",
    currentRole: "Software Engineer",
    image: "/images/alumni/ashish.jpg",
    linkedin: "https://www.linkedin.com/in/ashishhhh/",
  },
  sushant: {
    name: "Sushant",
    company: "NSUT",
    currentRole: "M.Tech, final year",
    image: "/images/alumni/sushant.png",
    linkedin: "https://www.linkedin.com/in/sushant-kumar-11a242225/",
  },
  "sumit-kumar": {
    name: "Sumit Kumar",
    company: "Nippon Audiotronix",
    currentRole: "Embedded Software Developer",
    image: "/images/alumni/sumit.png",
    linkedin: "https://www.linkedin.com/in/sumit-kumar-1b3511241/",
  },
  "ramakant-kumar": {
    name: "Ramakant Kumar",
    company: "TechLanz",
    currentRole: "Engineer Trainee",
    image: "/images/alumni/ramakant.jpeg",
    linkedin: "https://www.linkedin.com/in/rama-kant-kumar/",
  },
  "faizan-khan": {
    name: "Faizan Khan",
    company: "Higher studies",
    currentRole: "MS Computer Science",
    image: "/images/alumni/faizan.jpg",
    linkedin: "https://www.linkedin.com/in/faizan-khan-ai/",
  },
  "vanshika-goel": {
    name: "Vanshika Goel",
    company: "JK Paper Ltd.",
    currentRole: "Graphic Designer",
    image: "/images/alumni/vanshika.png",
    linkedin: "https://www.linkedin.com/in/vanshika-goel-692328226/",
  },
  "vaibhav-khanna": {
    name: "Vaibhav Khanna",
    company: "Zaptics Research",
    currentRole: "Hardware Engineer",
    image: "/images/alumni/vaibhav.jpg",
    linkedin: "https://www.linkedin.com/in/vaibhav-khanna-198017195/",
  },
  "safal-singh": {
    name: "Safal Singh",
    company: "Cadence",
    currentRole: "Design Engineer",
    image: "/images/alumni/safal.jpeg",
    linkedin: "https://www.linkedin.com/in/safal-singh-0724101b8/",
  },
  simran: {
    name: "Simran",
    company: "HRS Navigation",
    currentRole: "Software Developer",
    image: "/images/alumni/simran.jpg",
    linkedin: "https://www.linkedin.com/in/simran-s-3964b6131/",
  },
  "jai-garg": {
    name: "Jai Garg",
    company: "Massive Mobility",
    currentRole: "Product Manager",
    image: "/images/alumni/jai.jpg",
    linkedin: "https://www.linkedin.com/in/jai-garg/",
  },
  "bhavya-sharma": {
    name: "Bhavya Sharma",
    company: "Pentair",
    currentRole: "Lead Electronics Engineer",
    image: "/images/alumni/bhavya.png",
    linkedin: "https://www.linkedin.com/in/bhavya-sharma-969662180/",
  },
  "mohit-gupta": {
    name: "Mohit Gupta",
    company: "Mercedes-Benz",
    currentRole: "AI Engineer",
    image: "/images/alumni/mohit.jpg",
    linkedin: "https://www.linkedin.com/in/mohit-gupta-114711178/",
  },
  "nitesh-garg": {
    name: "Nitesh Garg",
    company: "Google",
    currentRole: "Technical Solutions Engineer II",
    image: "/images/alumni/Nitesh.png",
    linkedin: "https://www.linkedin.com/in/nitesh-garg-/",
  },
  "nikunj-aggarwal": {
    name: "Nikunj Aggarwal",
    company: "BharatPe",
    currentRole: "SDE-2",
    image: "/images/alumni/Nikunj.png",
    linkedin: "https://www.linkedin.com/in/nikunjagg/",
  },
  "vansh-gupta": {
    name: "Vansh Gupta",
    company: "Google",
    currentRole: "ML Software Engineer III",
    image: "/images/alumni/Vansh.jpeg",
    linkedin: "https://www.linkedin.com/in/imvansh25/",
  },
  "hardik-gossain": {
    name: "Hardik Gossain",
    company: "Evertz",
    currentRole: "Test & Validation Specialist",
    image: "/images/alumni/hardik.png",
    linkedin: "https://www.linkedin.com/in/hardikgossain/",
  },
  "aditya-agrawal": {
    name: "Aditya Agrawal",
    company: "Amazon",
    currentRole: "SDE-2",
    image: "/images/alumni/aditya.png",
    linkedin: "https://www.linkedin.com/in/adityaagrawaldelhi/",
  },
  "nikhil-singhal": {
    name: "Nikhil Singhal",
    company: "Intel Labs",
    currentRole: "Master's Thesis Student",
    image: "/images/alumni/nikhilSinghal.jpeg",
    linkedin: "https://www.linkedin.com/in/nikhil-singhal-0612/",
  },
  "hasan-ashraf": {
    name: "Hasan Ashraf",
    company: "Urban Science Interiors",
    currentRole: "Brand Manager",
    image: "/images/alumni/hasan.jpeg",
    linkedin: "https://www.linkedin.com/in/hasan-ashraf-028b161ab/",
  },
  "maninder-bir-singh": {
    name: "Maninder Bir Singh G.",
    company: "McGill University, Canada",
    currentRole: "Teaching Assistant",
    image: "/images/alumni/maninder.jpeg",
    linkedin: "https://www.linkedin.com/in/maninder-bir-singh-gulshan/",
  },
  "mohd-shayan-khan": {
    name: "Mohd Shayan Khan",
    company: "FluxTech Trading",
    currentRole: "Senior Electronics Engineer",
    image: "/images/alumni/shayan.jpeg",
    linkedin: "https://www.linkedin.com/in/mohdshayankhan/",
  },
  "nikhil-mishra": {
    name: "Nikhil Mishra",
    company: "Magpie AI",
    currentRole: "Founder",
    image: "/images/alumni/NikhilMishra.jpeg",
    linkedin: "https://www.linkedin.com/in/nikhil-zeeq/",
  },
  "jatin-sharma": {
    name: "Jatin Sharma",
    company: "Jetsons Robotics",
    currentRole: "CEO & Founder",
    image: "/images/alumni/jatin.jpeg",
    linkedin: "https://www.linkedin.com/in/jatin-s-b017692a/",
  },
} satisfies Record<string, Person>;

export type AlumniPersonId = keyof typeof people;

function member(id: AlumniPersonId, position: string): AlumniMember {
  const p: Person = people[id];
  return { id, position, ...p };
}

/**
 * Founders. The old alumni page said "Est. 2011" for this section while the rest of the
 * site (and LinkedIn) say 2009; `foundedYear` in site.ts (2009) is the source of truth.
 */
export const founders: AlumniMember[] = [
  member("nikhil-mishra", "Founder"),
  member("jatin-sharma", "Founder"),
];

export const foundersCopy = {
  title: "The founding legacy",
  body: "Where it all began. The visionaries who dared to dream and laid the foundation of Robogyan.",
  quote: "Every great innovation starts with a bold vision. This is where the future began.",
} as const;

/** Six alumni batches, newest first. `id` is the URL segment for /alumni/:year. */
export const alumniBatches: AlumniBatch[] = [
  {
    id: "2024-25",
    title: "Core of 2024–25",
    description: "Meet the team members who made their mark this year.",
    image: "/images/alumni/rg202425.png",
    achievements: [
      "SIH 2024 Grand Finalists",
      "Winners at IIT Kanpur Techkriti",
      "Xylem International Winners",
    ],
    members: [
      member("vidhi-gupta", "President"),
      member("jayam-shrivastav", "Vice President"),
      member("amogh-saxena", "Software Lead"),
      member("aditya-goel", "Hardware Lead"),
    ],
  },
  {
    id: "2023-24",
    title: "Core of 2023–24",
    description:
      "To the 2023–24 team: your legacy lives on in every wire, every line of code and every milestone we reach.",
    image: "/images/alumni/2023-24.jpg",
    achievements: [
      "Xylem Global Winners",
      "Techkriti IIT Kanpur Winners",
      "SIH 2023 Semi-finalists",
      "e-Yantra IIT Bombay Semi-finalists",
    ],
    members: [
      member("ashish", "President"),
      member("sushant", "Vice President"),
      member("vidhi-gupta", "Women in Tech"),
      member("sumit-kumar", "Embedded Lead"),
      member("ramakant-kumar", "Fabrication Lead"),
      member("faizan-khan", "ML Lead"),
      member("jayam-shrivastav", "Android Lead"),
      member("vanshika-goel", "UI/UX Lead"),
    ],
  },
  {
    id: "2022-23",
    title: "Core of 2022–23",
    description:
      "The 2022–23 team wasn't just a part of Robogyan; they were its driving force. Their leadership, innovation and teamwork still echo in everything we do.",
    image: "/images/alumni/2022-23.jpg",
    achievements: [
      "IIT Kanpur Techkriti Winners",
      "Considition ML Hackathon Finalists",
      "SIH Finalists",
    ],
    members: [
      member("vaibhav-khanna", "President"),
      member("ashish", "Vice President"),
      member("safal-singh", "VLSI Lead"),
      member("simran", "Web Dev Lead"),
      member("sushant", "Hardware Lead"),
      member("sumit-kumar", "Embedded Lead"),
      member("ramakant-kumar", "Fabrication Lead"),
      member("faizan-khan", "ML Lead"),
      member("vidhi-gupta", "Junior ML Lead"),
    ],
  },
  {
    id: "2021-22",
    title: "Core of 2021–22",
    description:
      "Let's turn back the clock to 2021 and recognise the dedicated members whose passion powered our progress.",
    image: "/images/alumni/2021-22.jpg",
    achievements: ["SIH Winners", "e-Yantra Winners"],
    members: [
      member("jai-garg", "President"),
      member("bhavya-sharma", "Vice President"),
      member("mohit-gupta", "Software Lead"),
      member("nitesh-garg", "Embedded Lead"),
      member("nikunj-aggarwal", "Android Lead"),
      member("vansh-gupta", "Data Science Lead"),
    ],
  },
  {
    id: "2020-21",
    title: "Core of 2020–21",
    description:
      "Their legacy is our inspiration. Meet the remarkable team from 2020 who left an indelible mark on Robogyan.",
    image: "/images/alumni/2021.jpg",
    achievements: [
      "SIH Winners",
      "Tata Crucible Winners",
      "Aero Modelling: Boeing, IIT Bombay",
      "National E-Kart Racing, Noida: 2nd pole position",
      "LPU E-Kart: Runner-up, Business",
    ],
    members: [
      member("hardik-gossain", "President"),
      member("aditya-agrawal", "Vice President"),
      member("nikhil-singhal", "Robotics Lead"),
      // "Formura Founder" kept verbatim from the old data; may be a team name or a typo of "Formula".
      member("hasan-ashraf", "Formura Founder"),
      member("jai-garg", "Fabrication & Product Design Lead"),
      member("bhavya-sharma", "IoT, Drone & Research Lead"),
      member("mohit-gupta", "Web Dev Lead"),
      member("nitesh-garg", "Embedded Lead"),
      member("nikunj-aggarwal", "Android Lead"),
    ],
  },
  {
    id: "2019-20",
    title: "Core of 2019–20",
    description:
      "Their dedication continues to inspire us. Meet the team from 2019 whose contributions shaped Robogyan's legacy.",
    image: null,
    // Old data said "Updating soon..."; pages should render a "being updated" note when empty.
    achievements: [],
    members: [
      member("maninder-bir-singh", "President"),
      member("mohd-shayan-khan", "Vice President"),
    ],
  },
];

/** Look up a batch by its URL segment ("2024-25"). */
export function getBatch(id: string): AlumniBatch | undefined {
  return alumniBatches.find((b) => b.id === id);
}

/** Distinct people who held the President position across alumni batches. */
export function presidentsOnRecord(): string[] {
  const names = new Set<string>();
  for (const b of alumniBatches) {
    for (const m of b.members) if (m.position === "President") names.add(m.id);
  }
  return [...names];
}
