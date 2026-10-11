import type {
  Faq,
  PptSlide,
  ProblemStatement,
  SihPhase,
  SihTheme,
  SihTrack,
  SihWinnerStory,
} from "./schemas";

/**
 * SIH 2026 portal content. Anchor ids used by links from the home page and Instagram:
 * #results, #judges, #ppt-guide, #teammate-finder (see `sihAnchors`).
 */
export const sihAnchors = {
  results: "results",
  judges: "judges",
  pptGuide: "ppt-guide",
  teammateFinder: "teammate-finder",
} as const;

export const sihOverview = {
  edition: "Smart India Hackathon 2026",
  shortTitle: "SIH 2026 Internal Round",
  year: 2026,
  college: "Dr. Akhilesh Das Gupta Institute of Professional Studies (ADGIPS)",
  organizer: "Robogyan, the official robotics & technical society",
  /** The internal round is over and results are published. */
  resultsOut: true,
  registrationOpen: false,
  intro:
    "The internal round for SIH 2026 at ADGIPS, organised by Robogyan, has concluded. Congratulations to the 45 nominated teams and 5 waitlisted teams.",
  registrationUrl: "https://forms.gle/kEmSCYoau2PUdWf18",
  officialPortalUrl: "https://www.sih.gov.in",
  officialPSUrl: "https://www.sih.gov.in/sih2026PS",
  pptTemplateUrl: "https://www.sih.gov.in/letters/SIH2026-IDEA-Presentation-Format.pptx",
  nominationQuota: "45 Selected Teams + 5 Waitlisted Teams",
  nationalPrize: "₹1,00,000 – ₹1,50,000 per Problem Statement",
  /** Internal round 2026 headline numbers. */
  internalRound: { teams: 240, participants: 1500, selected: 45, waitlisted: 5, judges: 12 },
  legacy: { nationalWins: 2, nationalFinalists: 4, pastParticipants: "1,200+" },
} as const;

/** Five legacy stories, newest first. `winner: true` marks national winners. */
export const sihWinnerStories: SihWinnerStory[] = [
  {
    id: "thinktronics-2025",
    teamName: "The Thinktronics",
    edition: "SIH 2025",
    year: 2025,
    standing: "National Grand Finale Winners",
    badge: "1st prize, national champions",
    winner: true,
    title: "Smart India Hackathon 2025 Champions",
    description:
      "Robogyan's team took 1st place at the National Grand Finale, engineering a smart AI & IoT-based solution for smart irrigation & farming, and winning top honors from the jury.",
    award: "National Grand Finale Winners",
    image: "/images/sih/sihWinnersRG25.JPG",
    highlights: ["1st prize winner", "AI and IoT smart system", "Ministry accolades"],
    imageFit: "cover",
    imagePosition: "center",
  },
  {
    id: "skylink-2025",
    teamName: "Team Skylink",
    edition: "SIH 2025",
    year: 2025,
    standing: "National Grand Finale Winners",
    badge: "1st prize, national champions",
    winner: true,
    title: "Smart India Hackathon 2025 Champions",
    description:
      "Demonstrated exceptional technical mastery and system integration, overcoming fierce pan-India competition at the national nodal center to claim the prestigious national championship.",
    award: "National Grand Finale Winners",
    image: "/images/sih/sihWinner25.jpeg",
    highlights: ["1st prize winner", "Advanced tech integration", "National trophy"],
    imageFit: "cover",
    imagePosition: "top",
  },
  {
    id: "robogyan-2024-finalists",
    teamName: "Robogyan Finalists",
    edition: "SIH 2024",
    year: 2024,
    standing: "National Grand Finale Finalists",
    badge: "National finalist team",
    winner: false,
    title: "Smart India Hackathon 2024 Finalists",
    description:
      "Represented ADGIPS on the national platform, persevering through rounds and showcasing working hardware-software prototypes before jury panels.",
    award: "National Grand Finalist",
    image: "/images/sih/sih2024Finalists.JPG",
    highlights: ["National finalists", "Hardware-software prototypes", "National recognition"],
    imageFit: "cover",
    imagePosition: "top",
  },
  {
    id: "robogyan-2023-finalists",
    teamName: "Robogyan Finalists",
    edition: "SIH 2023",
    year: 2023,
    standing: "National Grand Finale Finalists",
    badge: "National finalist team",
    winner: false,
    title: "Smart India Hackathon 2023 Finalists",
    description:
      "Demonstrated remarkable technical ingenuity at the Grand Finale nodal center, building an end-to-end working prototype during an intense hackathon and earning high praise from national evaluators.",
    award: "National Grand Finalist",
    image: "/images/sih/sih2023Finalists.jpeg",
    highlights: ["Grand Finale finalist", "Rapid prototyping", "Jury commendation"],
    imageFit: "contain",
    imagePosition: "center",
  },
  {
    id: "robogyan-2019-winners",
    teamName: "Robogyan",
    edition: "SIH 2019",
    year: 2019,
    standing: "National Grand Finale Winners",
    badge: "1st prize, national champions",
    winner: true,
    title: "Smart India Hackathon 2019 Champions",
    description:
      "Clinched 1st place at the National Grand Finale of SIH 2019, designing an impactful hardware solution and establishing Robogyan's legacy of excellence on the national stage.",
    award: "National Grand Finale Winners",
    image: "/images/sih/sihWinnersRg19.jpeg",
    highlights: ["1st prize winner", "Hardware innovation", "National recognition"],
    imageFit: "cover",
    imagePosition: "center",
  },
];

/** Six phases (a real sequence: numbered markers are allowed here). */
export const sihTimeline: SihPhase[] = [
  {
    id: "event-announcement-problem-statement",
    number: 1,
    title: "Event announcement and problem statement release",
    when: "August 2026",
    status: "Completed",
    description:
      "SIH Internal Hackathon announced in college! Explore official SIH themes and problem statements to be released on the national portal.",
    details: [
      "Official announcement from college.",
      "Browse official Problem Statements from SIH Website.",
      "Choose between Software or Hardware track.",
    ],
  },
  {
    id: "internal-registration-idea-ppt",
    number: 2,
    title: "Internal registration and idea PPT submission",
    when: "August – September 2026",
    status: "Completed",
    description:
      "Submit your team registration form and upload your idea presentation using the official SIH PPT template.",
    details: [
      "Download the official SIH Idea Presentation format.",
      "Draft concise slides covering problem analysis, solution, tech stack, and feasibility.",
      "Submit the registration form with team details and PPT before the internal deadline.",
    ],
  },
  {
    id: "adgips-internal-hackathon",
    number: 3,
    title: "ADGIPS internal hackathon",
    when: "10 & 14 September 2026",
    start: "2026-09-10",
    end: "2026-09-14",
    status: "Completed",
    description:
      "Live pitch and demonstration before an expert jury of industry professionals and experts.",
    details: [
      "Pitch presentation before domain expert jury panels.",
      "Present architecture, working prototype / wireframes, and answer jury questions.",
      "Software teams demonstrate working code/mockups; Hardware teams showcase circuit schematics/prototypes.",
    ],
  },
  {
    id: "nomination-of-top-45",
    number: 4,
    title: "Nomination of the top 45 + 5 teams",
    when: "Late September 2026",
    status: "Completed",
    description:
      "Announcement of the shortlisted 45 nominated teams + 5 waitlisted teams submitted by the College SPOC to the official SIH portal.",
    details: [
      "Top 45 teams officially nominated across Software and Hardware tracks.",
      "5 buffer/waitlisted teams also uploaded as per AICTE/MIC SIH guidelines.",
      "Team Leaders complete account registration on the official SIH national portal.",
    ],
  },
  {
    id: "announcement-of-national-finalists",
    number: 5,
    title: "Announcement of national finalists",
    when: "To be announced",
    status: "Upcoming",
    description:
      "National Finalists get to represent the college at the national stage and can receive hands-on technical guidance by Robogyan's past SIH national winners.",
    details: [
      "Refining solution architecture based on jury feedback.",
      "Assistance in hardware resources and software deployment.",
    ],
  },
  {
    id: "sih-2026-grand-finale",
    number: 6,
    title: "SIH 2026 Grand Finale",
    when: "December 2026",
    start: "2026-12",
    status: "Upcoming",
    description:
      "5 teams per statement (selected by govt) compete in a thrilling Grand Finale hosted by various IITs, NITs and other universities across India.",
    details: [
      "The best teams across the country are selected to present their innovative ideas in front of Government dignitaries and industry leaders.",
      "A 5 Day hackathon conducted for Hardware Tracks hosted by various universities and colleges.",
      "A similar 3 Day hackathon conducted for Software Tracks.",
    ],
  },
];

export const sihTracks: SihTrack[] = [
  {
    id: "software",
    name: "Software innovation track",
    title: "AI, cloud & digital platforms",
    psCount: "170+ software PS",
    description:
      "Develop full-stack web/mobile platforms, predictive machine learning models, GIS geospatial systems, blockchain ledgers and intelligent APIs solving challenges from ministries like Indian Railways, AYUSH, Earth Sciences and Coal India.",
    domains: [
      "AI / ML & NLP",
      "Full-stack web / apps",
      "GIS & geospatial mapping",
      "Predictive analytics",
      "Blockchain & traceability",
      "Cloud & microservices",
    ],
    deliverable: "Working UI/code demo & system flow",
    icon: "Laptop",
    portalLabel: "Explore the 170+ software problem statements on the official portal",
  },
  {
    id: "hardware",
    name: "Hardware innovation track",
    title: "IoT, embedded & autonomous robotics",
    psCount: "50+ hardware PS",
    description:
      "Engineer physical prototypes, embedded electronics, robotics & UAV payloads, telemetry sensors and harsh-environment devices solving mission-critical challenges from DRDO, the Ministry of Defence, Indian Railways and MSME.",
    domains: [
      "Robotics & UAVs",
      "Microcontrollers (ESP32/STM32)",
      "Edge AI & computer vision",
      "IoT sensors & telemetry",
      "3D CAD & mechanics",
      "Solar & clean-tech circuits",
    ],
    deliverable: "Circuit schematics, CAD & breadboard POC",
    icon: "Cpu",
    portalLabel: "Explore the 50+ hardware problem statements on the official portal",
  },
];

/** Twelve themes. `icon` is a lucide-react export name. */
export const sihThemes: SihTheme[] = [
  {
    id: "smart-automation",
    name: "Smart Automation",
    description:
      "Intelligent resource utilization combining AI/ML, computer vision, and workflow automation to boost industrial and daily productivity.",
    icon: "Cpu",
    category: "Both",
  },
  {
    id: "robotics-drones",
    name: "Robotics & Drones",
    description:
      "Unmanned aerial vehicles, autonomous mobile robots, robotic arms, search & rescue systems, and precision automation.",
    icon: "Bot",
    category: "Hardware",
  },
  {
    id: "agriculture-foodtech",
    name: "Agriculture & Rural Development",
    description:
      "Smart irrigation, AI crop disease detection, soil nutrient sensing, cold chain tracking, and supply chain logistics for farmers.",
    icon: "Sprout",
    category: "Both",
  },
  {
    id: "medtech-healthtech",
    name: "MedTech & HealthTech",
    description:
      "Affordable diagnostic devices, telemedicine platforms, AI pathology assistance, smart health monitoring wearables, and patient record systems.",
    icon: "HeartPulse",
    category: "Both",
  },
  {
    id: "clean-green-tech",
    name: "Clean & Green Technology",
    description:
      "Waste segregation robots, air/water quality monitoring, plastic recycling tracking, carbon footprint reduction, and eco-friendly systems.",
    icon: "Leaf",
    category: "Both",
  },
  {
    id: "blockchain-cybersecurity",
    name: "Blockchain & Cybersecurity",
    description:
      "Decentralized tamper-proof registries, credential verification, zero-trust network defense, fraud detection, and privacy-preserving protocols.",
    icon: "ShieldCheck",
    category: "Software",
  },
  {
    id: "smart-vehicles",
    name: "Smart Vehicles & EV Mobility",
    description:
      "EV battery health monitoring, smart fleet management, ADAS algorithms, connected vehicle telematics, and charging infrastructure optimization.",
    icon: "Car",
    category: "Both",
  },
  {
    id: "disaster-management",
    name: "Disaster Management",
    description:
      "Early warning sensors for floods/landslides, GIS rescue mapping, offline mesh communication networks, and rapid disaster relief coordination.",
    icon: "Flame",
    category: "Both",
  },
  {
    id: "smart-education",
    name: "Smart Education",
    description:
      "Adaptive personalized learning platforms, gamified STEM tools, accessible tech for differently-abled students, and automated grading systems.",
    icon: "GraduationCap",
    category: "Software",
  },
  {
    id: "fintech",
    name: "FinTech & Secure Banking",
    description:
      "Rural micro-finance solutions, automated fraud prevention, algorithmic credit scoring, accessible financial literacy tools, and UPI innovations.",
    icon: "Coins",
    category: "Software",
  },
  {
    id: "heritage-culture",
    name: "Heritage & Tourism",
    description:
      "AR/VR immersive heritage walkthroughs, digital preservation of indigenous arts, tourist crowd management, and smart cultural archives.",
    icon: "Landmark",
    category: "Software",
  },
  {
    id: "space-tech",
    name: "Space Technology",
    description:
      "Satellite imagery processing for urban planning, orbital debris tracking, cubesat communication subsystems, and space weather analysis.",
    icon: "Rocket",
    category: "Both",
  },
];

/** Six sample problem statements (illustrative, not official PS). */
export const sampleProblemStatements: ProblemStatement[] = [
  {
    id: "ps-1",
    psNumber: "SIH-2026-AG01",
    title: "AI-Powered Multimodal Crop Disease Detection & Soil Moisture Optimization",
    organization: "Ministry of Agriculture & Farmers Welfare",
    category: "Hardware",
    domain: "Agriculture & Rural Development",
    theme: "Agriculture, FoodTech & Rural Development",
    description:
      "Develop an IoT-enabled field sensor node combined with edge AI computer vision to identify leaf diseases early and automate drip irrigation to conserve water.",
    techStack: [
      "ESP32 / Raspberry Pi",
      "Edge Impulse",
      "TensorFlow Lite",
      "LoRaWAN",
      "React Native",
      "FastAPI",
    ],
  },
  {
    id: "ps-2",
    psNumber: "SIH-2026-CS02",
    title: "Zero-Trust Real-time Phishing & Dark Web Threat Intelligence Feed",
    organization: "Ministry of Electronics and Information Technology (MeitY)",
    category: "Software",
    domain: "Cybersecurity & Blockchain",
    theme: "Blockchain & Cybersecurity",
    description:
      "An automated browser extension & backend analyzer that inspects obfuscated URLs, typosquatting domains, and anomalous SSL certificates in real-time.",
    techStack: [
      "Python",
      "FastAPI",
      "Transformer / NLP",
      "Chromium Extension API",
      "Elasticsearch",
      "Docker",
    ],
  },
  {
    id: "ps-3",
    psNumber: "SIH-2026-RO03",
    title: "Autonomous Indoor Disinfection & Thermal Surveillance Rover",
    organization: "Department of Health & Family Welfare",
    category: "Hardware",
    domain: "Robotics & Healthcare",
    theme: "Robotics and Drones",
    description:
      "Build a compact autonomous ground robot equipped with LiDAR SLAM navigation, UV-C sterilizing arrays, and non-contact infrared thermal screening.",
    techStack: ["ROS 2", "RP-LiDAR", "Arduino / STM32", "OpenCV", "Python", "Motor Drivers"],
  },
  {
    id: "ps-4",
    psNumber: "SIH-2026-SM04",
    title: "Decentralized Academic Credential Verification System on L2 Blockchain",
    organization: "All India Council for Technical Education (AICTE)",
    category: "Software",
    domain: "Education & Web3",
    theme: "Smart Education",
    description:
      "A tamper-proof credential issuance and instant one-click verification platform for universities and employers with zero gas fee overhead for students.",
    techStack: ["Solidity / Polygon L2", "Ethers.js", "IPFS", "Next.js", "Node.js", "Tailwind CSS"],
  },
  {
    id: "ps-5",
    psNumber: "SIH-2026-EV05",
    title: "Smart Battery Health Telemetry & Predictive Thermal Runaway Detection",
    organization: "Ministry of Heavy Industries",
    category: "Hardware",
    domain: "Smart Vehicles",
    theme: "Smart Vehicles",
    description:
      "Design an intelligent BMS piggyback device with CAN bus telemetry that predicts lithium-ion battery cell degradation and abnormal heat patterns.",
    techStack: [
      "CAN Bus / OBD-II",
      "STM32 Microcontroller",
      "MQTT",
      "Time-Series ML",
      "Grafana",
      "Node.js",
    ],
  },
  {
    id: "ps-6",
    psNumber: "SIH-2026-DM06",
    title: "Offline Mesh Network Emergency SOS & Disaster Evacuation Pathfinder",
    organization: "National Disaster Management Authority (NDMA)",
    category: "Software",
    domain: "Disaster Management",
    theme: "Disaster Management",
    description:
      "A peer-to-peer mobile application utilizing Bluetooth Low Energy (BLE) and Wi-Fi Direct mesh networking to locate trapped individuals during cellular outages.",
    techStack: [
      "React Native",
      "BLE Mesh Protocol",
      "Offline GIS / OpenStreetMap",
      "SQLite",
      "WebRTC",
    ],
  },
];

/** The six-slide idea PPT guide (a real sequence). */
export const pptSlides: PptSlide[] = [
  {
    id: "slide-1",
    number: 1,
    title: "Title and team information",
    subtitle: "First impressions matter",
    keyPoints: [
      "Include Official Problem Statement ID (e.g., SIH-1420) & PS Title exactly as listed.",
      "Team Name and Theme Category (Software / Hardware).",
      "Full names of all 6 team members, branch, year, and team leader contact details.",
      "College Name: Dr. Akhilesh Das Gupta Institute of Professional Studies (ADGIPS).",
    ],
    proTip: "Keep branding clean and ensure all 6 member names with branches are clearly visible.",
  },
  {
    id: "slide-2",
    number: 2,
    title: "Problem statement and proposed solution",
    subtitle: "Clearly define the what and the why",
    keyPoints: [
      "State the core challenge and why current existing solutions fail or are inadequate.",
      "Explain your proposed innovative solution in 3–4 concise bullet points.",
      "Highlight your Unique Selling Proposition (USP) — what makes your idea standout.",
    ],
    proTip:
      "Avoid walls of text. Use bullet points and a punchy 1-sentence value proposition summary.",
  },
  {
    id: "slide-3",
    number: 3,
    title: "Technical approach and architecture",
    subtitle: "The technical backbone of your project",
    keyPoints: [
      "Include a neat block diagram, system workflow, or circuit schematic.",
      "List out the entire technology stack (Frontend, Backend, Database, AI/ML models, IoT Hardware, Protocols).",
      "Show how data flows from input to processing to the final output/action.",
    ],
    proTip:
      "Judges love clear architectural block diagrams. Avoid generic clipart; draw a real data pipeline.",
  },
  {
    id: "slide-4",
    number: 4,
    title: "Feasibility, viability and potential challenges",
    subtitle: "Proving your idea can actually work in reality",
    keyPoints: [
      "Technical Feasibility: How easy/practical is it to build and deploy this solution?",
      "Economic Viability: What is the cost estimate? Is it cost-effective compared to existing solutions?",
      "Key Risks & Mitigation: Identify 2–3 bottlenecks (e.g., latency, sensor noise, server cost) and your mitigation plan.",
    ],
    proTip:
      "Acknowledging real-world constraints and presenting your solutions shows engineering maturity.",
  },
  {
    id: "slide-5",
    number: 5,
    title: "Impact, benefits and commercial potential",
    subtitle: "Showcase the real-world value to society / industry",
    keyPoints: [
      "Target Beneficiaries (e.g., farmers, hospitals, municipal bodies, students).",
      "Quantifiable Impact (e.g., '30% reduction in water usage', '90% faster verification time').",
      "Scalability: How can this expand from a college prototype to a statewide/nationwide deployment?",
    ],
    proTip:
      "Use numbers and tangible metrics rather than vague statements like 'it will improve society'.",
  },
  {
    id: "slide-6",
    number: 6,
    title: "Prototype progress, roadmap and conclusion",
    subtitle: "What is built right now and next steps",
    keyPoints: [
      "Current state of prototype: Wireframes, MVP repository, component testing, or circuit breadboard photos.",
      "Timeline & Milestone Roadmap for the next stages of development.",
      "Brief conclusion and ready for Q&A.",
    ],
    proTip:
      "If you have a live GitHub link, Figma prototype, or working breadboard photo, display it proudly here.",
  },
];

export const sihFaqs: Faq[] = [
  {
    id: "what-is-the-mandatory-team-composition",
    category: "Eligibility",
    question: "What is the mandatory team composition rule for SIH?",
    answer:
      "Every team must have exactly 6 members. All members must belong to the same institute (ADGIPS). Most importantly, having at least one female member is strictly mandatory as per official SIH rules.",
  },
  {
    id: "can-students-from-different-departments-or",
    category: "Eligibility",
    question: "Can students from different departments or academic years form a team together?",
    answer:
      "Yes! Inter-departmental and inter-year teams (e.g., CSE + IT + ECE + AIML + 1st/2nd/3rd/4th years) are completely allowed and strongly encouraged. Diverse teams with hardware and software skills often perform best.",
  },
  {
    id: "can-1st-year-students-participate-in",
    category: "Eligibility",
    question: "Can 1st-year students participate in the SIH Internal Hackathon?",
    answer:
      "Absolutely! SIH is open to all undergraduate and postgraduate students of ADGIPS. First-year students can team up with seniors or form their own teams.",
  },
  {
    id: "how-many-teams-will-be-selected",
    category: "Registration",
    question: "How many teams will be selected from the College Internal Hackathon?",
    answer:
      "A total of top 45 shortlisted teams + 5 waitlisted teams will be officially nominated by our College SPOC on the national SIH portal across the Software and Hardware editions.",
  },
  {
    id: "is-there-any-registration-fee-for",
    category: "Registration",
    question: "Is there any registration fee for the SIH Internal Hackathon at ADGIPS?",
    answer:
      "No, participation in the college internal hackathon organized by Robogyan is completely free of cost.",
  },
  {
    id: "can-we-modify-the-official-ppt",
    category: "PPT & Submission",
    question: "Can we modify the official PPT template format?",
    answer:
      "You should adhere strictly to the 6-slide structure provided in the official SIH template format (Title, Problem & Solution, Architecture, Feasibility, Impact, and Progress). You may enhance the visual design, fonts, and colors to make it look professional.",
  },
  {
    id: "can-we-submit-our-own-innovation",
    category: "PPT & Submission",
    question:
      "Can we submit our own innovation idea if we don't pick an official SIH Problem Statement?",
    answer:
      "Yes! As per SIH institute guidelines, teams can submit innovative ideas under the 'Student Innovation' / open theme category if it solves a genuine societal or technological challenge.",
  },
  {
    id: "what-happens-after-our-team-is",
    category: "Internal Hackathon",
    question: "What happens after our team is nominated in the top 45+5 list?",
    answer:
      "The College SPOC officially registers and recommends your team on the Central SIH portal. Robogyan mentors will assist you with fine-tuning your code, architecture, and prototype for the national evaluation round.",
  },
  {
    id: "what-is-the-national-grand-finale",
    category: "Internal Hackathon",
    question: "What is the national Grand Finale prize for winning teams?",
    answer:
      "At the National Grand Finale, winning teams for each problem statement receive a cash prize between ₹1,00,000 to ₹1,50,000, along with national certificates from the Ministry of Education & AICTE, direct ministry interaction, and incubation/grant opportunities.",
  },
];

/**
 * Page copy carried over from the 2025 portal (tightened to sentence case). Kept here so
 * next year's edition only needs content edits.
 */
export const sihCopy = {
  head: {
    status:
      "The internal round at ADGIPS is over and the results are out: 45 teams nominated to the national portal, 5 waitlisted.",
  },
  results: {
    title: "Internal round shortlisted teams",
    intro: "Official nominations for the Smart India Hackathon 2026 central portal.",
    note: "Note for selected teams: the college SPOC is processing team nominations on the national portal. Team leaders complete their account registration there once the nomination goes through.",
  },
  judges: {
    title: "Thank you, judges",
    intro:
      "Robogyan and ADGIPS extend our heartfelt appreciation to our panel of 12 distinguished judges. Thank you for your tireless dedication, technical scrutiny and invaluable feedback across the two-day internal hackathon presentations.",
  },
  legacy: {
    title: "SIH hall of fame",
    intro:
      "Since SIH began in 2017, Robogyan has built a legacy at the Smart India Hackathon: a first national championship in 2019 (the third SIH edition), Grand Finale appearances in 2023 and 2024, and national champions again in 2025.",
  },
  timeline: {
    title: "Internal hackathon roadmap",
    intro:
      "From college registration to the SPOC's official nomination of the top 45 shortlisted and 5 waitlisted teams on the national portal.",
  },
  tracks: {
    title: "Tracks and themes",
    intro:
      "Smart India Hackathon features 220+ problem statements from central ministries and state departments, split into two technical tracks and twelve themes.",
    deliverableLabel: "Internal round deliverable",
  },
  problemStatements: {
    title: "Sample problem statements",
    intro:
      "Six illustrative challenges in the shape of official problem statements. The complete live list released by ministries and PSUs is on the national portal.",
    portalPrompt: "Looking for all official problem statements?",
    portalNote: "Explore the complete live database released by ministries and PSUs on the national portal.",
  },
  ppt: {
    title: "Idea PPT structure and pitch kit",
    intro:
      "Every team presents its solution in the mandated six-slide official SIH format. Here is the exact slide breakdown and pitching tips from past winners.",
    tipLabel: "Robogyan winner's pitch tip",
  },
  faq: {
    title: "Frequently asked questions",
    intro: "Clear answers on rules, team formation and the internal round.",
  },
  finder: {
    title: "Looking for team members or a female co-participant?",
    intro:
      "Don't worry if you don't have a complete 6-member team yet. Join the dedicated Robogyan SIH community to find skilled coders, hardware builders, designers and female teammates from ADGIPS.",
    mentoring:
      "Nominated teams get hands-on technical guidance from Robogyan's past SIH national winners: solution architecture, hardware resources and software deployment.",
    committee: "ADGIPS SIH organising committee",
    location: "Robogyan Lab, Basement, Block 5, ADGIPS",
  },
  closing: {
    title: "Congratulations to all 45 nominated teams",
    intro:
      "The internal round evaluation is complete. Nominated teams should refine their pitch decks and stay connected on the Robogyan community for official SPOC submission updates.",
  },
} as const;
