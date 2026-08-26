export interface ProblemStatement {
  id: string;
  psNumber: string;
  title: string;
  organization: string;
  category: "Software" | "Hardware";
  domain: string;
  theme: string;
  description: string;
  techStack: string[];
}

export interface SIHTheme {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  category: "Both" | "Software" | "Hardware";
}

export interface TimelinePhase {
  phase: string;
  title: string;
  date: string;
  status: "Upcoming" | "Live" | "Completed";
  description: string;
  details: string[];
}

export interface PPTSlideGuide {
  slideNumber: number;
  title: string;
  subtitle: string;
  keyPoints: string[];
  proTip: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "Eligibility" | "Registration" | "PPT & Submission" | "Internal Hackathon";
}

export const sihOverview = {
  edition: "Smart India Hackathon 2026",
  shortTitle: "SIH 2026 Internal Round",
  college: "Dr. Akhilesh Das Gupta Institute of Professional Studies (ADGIPS)",
  organizer: "ROBOGYAN - The Official Robotics & Technical Society",
  registrationStatus: "Registrations Open",
  registrationUrl: "https://forms.gle/kEmSCYoau2PUdWf18",
  officialPortalUrl: "https://www.sih.gov.in",
  officialPSUrl: "https://www.sih.gov.in/sih2026PS",
  pptTemplateUrl: "https://www.sih.gov.in/letters/SIH2026-IDEA-Presentation-Format.pptx",
  nominationQuota: "45 Selected Teams + 5 Waitlisted Teams",
  nationalPrize: "₹1,00,000 – ₹1,50,000 per Problem Statement",
  legacy: {
    nationalWins: 2,
    nationalFinalists: 4,
    pastParticipants: "1200+",
  },
};

export interface SIHWinnerStory {
  id: string;
  teamName: string;
  edition: string;
  standing: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  award: string;
  image: string;
  gradient: string;
  highlights: string[];
  imageFit?: "cover" | "contain";
  imagePosition?: string;
}

export const sihWinnerStories: SIHWinnerStory[] = [
  {
    id: "thinktronics-2025",
    teamName: "The Thinktronics",
    edition: "SIH 2025",
    standing: "National Grand Finale Winners",
    badge: "1st Prize National Champion",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    title: "Smart India Hackathon 2025 Champions",
    description: "Robogyan's team took 1st place at the National Grand Finale, engineering a smart AI & IoT-based solution for smart irrigation & farming, and winning top honors from the jury.",
    award: "National Grand Finale Winners",
    image: "/images/sih/sihWinnersRG25.JPG",
    gradient: "from-emerald-400 to-cyan-500",
    highlights: ["1st Prize Winner", "AI & IoT Smart System", "Ministry Accolades"],
    imageFit: "cover",
  },
  {
    id: "skylink-2025",
    teamName: "Team Skylink",
    edition: "SIH 2025",
    standing: "National Grand Finale Winners",
    badge: "1st Prize National Champion",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
    title: "Smart India Hackathon 2025 Champions",
    description: "Demonstrated exceptional technical mastery and system integration, overcoming fierce pan-India competition at the national nodal center to claim the prestigious national championship.",
    award: "National Grand Finale Winners",
    image: "/images/sih/sihWinner25.jpeg",
    gradient: "from-yellow-400 to-amber-500",
    highlights: ["1st Prize Winner", "Advanced Tech Integration", "National Trophy"],
    imageFit: "cover",
    imagePosition: "object-top",
  },
  {
    id: "robogyan-2024-finalists",
    teamName: "Robogyan Finalists",
    edition: "SIH 2024",
    standing: "National Grand Finale Finalists",
    badge: "National Finalist Team",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-400/40",
    title: "Smart India Hackathon 2024 Finalists",
    description: "Represented ADGIPS on the national platform, persevering through rounds and showcasing working hardware-software prototypes before jury panels.",
    award: "National Grand Finalist",
    image: "/images/sih/sih2024Finalists.JPG",
    gradient: "from-purple-400 to-indigo-500",
    highlights: ["National Finalists", "Hardware-Software Prototypes", "National Recognition"],
    imageFit: "cover",
    imagePosition: "object-top",
  },
  {
    id: "robogyan-2023-finalists",
    teamName: "Robogyan Finalists",
    edition: "SIH 2023",
    standing: "National Grand Finale Finalists",
    badge: "National Finalist Team",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-400/40",
    title: "Smart India Hackathon 2023 Finalists",
    description: "Demonstrated remarkable technical ingenuity at the Grand Finale nodal center, building an end-to-end working prototype during an intense hackathon and earning high praise from national evaluators.",
    award: "National Grand Finalist",
    image: "/images/sih/sih2023Finalists.jpeg",
    gradient: "from-rose-400 to-amber-500",
    highlights: ["Grand Finale Finalist", "Rapid Prototyping", "Jury Commendation"],
    imageFit: "contain",
  },
  {
    id: "robogyan-2019-winners",
    teamName: "Robogyan",
    edition: "SIH 2019",
    standing: "National Grand Finale Winners",
    badge: "1st Prize National Champion",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
    title: "Smart India Hackathon 2019 Champions",
    description: "Clinched 1st place at the National Grand Finale of SIH 2019, designing an impactful hardware solution and establishing Robogyan's legacy of excellence on the national stage.",
    award: "National Grand Finale Winners",
    image: "/images/sih/sihWinnersRg19.jpeg",
    gradient: "from-cyan-400 to-blue-500",
    highlights: ["1st Prize Winner", "Hardware Innovation", "National Recognition"],
    imageFit: "cover",
  },
];

export const sihTimeline: TimelinePhase[] = [
  {
    phase: "Phase 1",
    title: "Event Announcement & Problem Statement Release",
    date: "August 2026",
    status: "Completed",
    description: "SIH Internal Hackathon announced in college! Explore official SIH themes and problem statements to be released on the national portal.",
    details: [
      "Official announcement from college.",
      "Browse official Problem Statements from SIH Website.",
      "Choose between Software or Hardware track.",
    ],
  },
  {
    phase: "Phase 2",
    title: "Internal Registration & Idea PPT Submission",
    date: "August - September 2026",
    status: "Live",
    description: "Submit your team registration form and upload your idea presentation using the official SIH PPT template.",
    details: [
      "Download the official SIH Idea Presentation format.",
      "Draft concise slides covering problem analysis, solution, tech stack, and feasibility.",
      "Submit the registration form with team details and PPT before the internal deadline.",
    ],
  },
  {
    phase: "Phase 3",
    title: "ADGIPS Internal Hackathon",
    date: "11th & 12th September 2026",
    status: "Upcoming",
    description: "Live pitch and demonstration before an expert jury of industry professionals and experts.",
    details: [
      "Pitch presentation before domain expert jury panels.",
      "Present architecture, working prototype / wireframes, and answer jury questions.",
      "Software teams demonstrate working code/mockups; Hardware teams showcase circuit schematics/prototypes.",
    ],
  },
  {
    phase: "Phase 4",
    title: "Nomination of Top 45 + 5 Teams",
    date: "Late September 2026",
    status: "Upcoming",
    description: "Announcement of the shortlisted 45 nominated teams + 5 waitlisted teams submitted by the College SPOC to the official SIH portal.",
    details: [
      "Top 45 teams officially nominated across Software and Hardware tracks.",
      "5 buffer/waitlisted teams also uploaded as per AICTE/MIC SIH guidelines.",
      "Team Leaders complete account registration on the official SIH national portal.",
    ],
  },
  {
    phase: "Phase 5",
    title: "Announcement of National Finalists",
    date: "To be Announced",
    status: "Upcoming",
    description: "National Finalists get to represent the college at the national stage and can receive hands-on technical guidance by Robogyan's past SIH national winners.",
    details: [
      "Refining solution architecture based on jury feedback.",
      "Assistance in hardware resources and software deployment.",
    ],
  },
  {
    phase: "Phase 6",
    title: "SIH 2026 Grand Finale",
    date: "December 2026",
    status: "Upcoming",
    description: "5 teams per statement (selected by govt) compete in a thrilling Grand Finale hosted by various IITs, NITs and other universities across India.",
    details: [
      "The best teams across the country are selected to present their innovative ideas in front of Government dignitaries and industry leaders.",
      "A 5 Day hackathon conducted for Hardware Tracks hosted by various universities and colleges.",
      "A similar 3 Day hackathon conducted for Software Tracks.",
    ],
  },
];

export const sihThemes: SIHTheme[] = [
  {
    id: "smart-automation",
    name: "Smart Automation",
    description: "Intelligent resource utilization combining AI/ML, computer vision, and workflow automation to boost industrial and daily productivity.",
    iconName: "Cpu",
    color: "from-blue-500 to-indigo-600",
    category: "Both",
  },
  {
    id: "robotics-drones",
    name: "Robotics & Drones",
    description: "Unmanned aerial vehicles, autonomous mobile robots, robotic arms, search & rescue systems, and precision automation.",
    iconName: "Bot",
    color: "from-purple-500 to-pink-600",
    category: "Hardware",
  },
  {
    id: "agriculture-foodtech",
    name: "Agriculture & Rural Development",
    description: "Smart irrigation, AI crop disease detection, soil nutrient sensing, cold chain tracking, and supply chain logistics for farmers.",
    iconName: "Sprout",
    color: "from-emerald-500 to-teal-600",
    category: "Both",
  },
  {
    id: "medtech-healthtech",
    name: "MedTech & HealthTech",
    description: "Affordable diagnostic devices, telemedicine platforms, AI pathology assistance, smart health monitoring wearables, and patient record systems.",
    iconName: "HeartPulse",
    color: "from-rose-500 to-red-600",
    category: "Both",
  },
  {
    id: "clean-green-tech",
    name: "Clean & Green Technology",
    description: "Waste segregation robots, air/water quality monitoring, plastic recycling tracking, carbon footprint reduction, and eco-friendly systems.",
    iconName: "Leaf",
    color: "from-green-500 to-lime-600",
    category: "Both",
  },
  {
    id: "blockchain-cybersecurity",
    name: "Blockchain & Cybersecurity",
    description: "Decentralized tamper-proof registries, credential verification, zero-trust network defense, fraud detection, and privacy-preserving protocols.",
    iconName: "ShieldCheck",
    color: "from-amber-500 to-orange-600",
    category: "Software",
  },
  {
    id: "smart-vehicles",
    name: "Smart Vehicles & EV Mobility",
    description: "EV battery health monitoring, smart fleet management, ADAS algorithms, connected vehicle telematics, and charging infrastructure optimization.",
    iconName: "Car",
    color: "from-cyan-500 to-blue-600",
    category: "Both",
  },
  {
    id: "disaster-management",
    name: "Disaster Management",
    description: "Early warning sensors for floods/landslides, GIS rescue mapping, offline mesh communication networks, and rapid disaster relief coordination.",
    iconName: "Flame",
    color: "from-red-500 to-amber-600",
    category: "Both",
  },
  {
    id: "smart-education",
    name: "Smart Education",
    description: "Adaptive personalized learning platforms, gamified STEM tools, accessible tech for differently-abled students, and automated grading systems.",
    iconName: "GraduationCap",
    color: "from-violet-500 to-purple-600",
    category: "Software",
  },
  {
    id: "fintech",
    name: "FinTech & Secure Banking",
    description: "Rural micro-finance solutions, automated fraud prevention, algorithmic credit scoring, accessible financial literacy tools, and UPI innovations.",
    iconName: "Coins",
    color: "from-yellow-500 to-amber-600",
    category: "Software",
  },
  {
    id: "heritage-culture",
    name: "Heritage & Tourism",
    description: "AR/VR immersive heritage walkthroughs, digital preservation of indigenous arts, tourist crowd management, and smart cultural archives.",
    iconName: "Landmark",
    color: "from-orange-500 to-rose-600",
    category: "Software",
  },
  {
    id: "space-tech",
    name: "Space Technology",
    description: "Satellite imagery processing for urban planning, orbital debris tracking, cubesat communication subsystems, and space weather analysis.",
    iconName: "Rocket",
    color: "from-indigo-500 to-cyan-600",
    category: "Both",
  },
];

export const sampleProblemStatements: ProblemStatement[] = [
  {
    id: "ps-1",
    psNumber: "SIH-2026-AG01",
    title: "AI-Powered Multimodal Crop Disease Detection & Soil Moisture Optimization",
    organization: "Ministry of Agriculture & Farmers Welfare",
    category: "Hardware",
    domain: "Agriculture & Rural Development",
    theme: "Agriculture, FoodTech & Rural Development",
    description: "Develop an IoT-enabled field sensor node combined with edge AI computer vision to identify leaf diseases early and automate drip irrigation to conserve water.",
    techStack: ["ESP32 / Raspberry Pi", "Edge Impulse", "TensorFlow Lite", "LoRaWAN", "React Native", "FastAPI"],
  },
  {
    id: "ps-2",
    psNumber: "SIH-2026-CS02",
    title: "Zero-Trust Real-time Phishing & Dark Web Threat Intelligence Feed",
    organization: "Ministry of Electronics and Information Technology (MeitY)",
    category: "Software",
    domain: "Cybersecurity & Blockchain",
    theme: "Blockchain & Cybersecurity",
    description: "An automated browser extension & backend analyzer that inspects obfuscated URLs, typosquatting domains, and anomalous SSL certificates in real-time.",
    techStack: ["Python", "FastAPI", "Transformer / NLP", "Chromium Extension API", "Elasticsearch", "Docker"],
  },
  {
    id: "ps-3",
    psNumber: "SIH-2026-RO03",
    title: "Autonomous Indoor Disinfection & Thermal Surveillance Rover",
    organization: "Department of Health & Family Welfare",
    category: "Hardware",
    domain: "Robotics & Healthcare",
    theme: "Robotics and Drones",
    description: "Build a compact autonomous ground robot equipped with LiDAR SLAM navigation, UV-C sterilizing arrays, and non-contact infrared thermal screening.",
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
    description: "A tamper-proof credential issuance and instant one-click verification platform for universities and employers with zero gas fee overhead for students.",
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
    description: "Design an intelligent BMS piggyback device with CAN bus telemetry that predicts lithium-ion battery cell degradation and abnormal heat patterns.",
    techStack: ["CAN Bus / OBD-II", "STM32 Microcontroller", "MQTT", "Time-Series ML", "Grafana", "Node.js"],
  },
  {
    id: "ps-6",
    psNumber: "SIH-2026-DM06",
    title: "Offline Mesh Network Emergency SOS & Disaster Evacuation Pathfinder",
    organization: "National Disaster Management Authority (NDMA)",
    category: "Software",
    domain: "Disaster Management",
    theme: "Disaster Management",
    description: "A peer-to-peer mobile application utilizing Bluetooth Low Energy (BLE) and Wi-Fi Direct mesh networking to locate trapped individuals during cellular outages.",
    techStack: ["React Native", "BLE Mesh Protocol", "Offline GIS / OpenStreetMap", "SQLite", "WebRTC"],
  },
];

export const pptSlideGuides: PPTSlideGuide[] = [
  {
    slideNumber: 1,
    title: "Title & Team Information",
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
    slideNumber: 2,
    title: "Problem Statement & Proposed Solution",
    subtitle: "Clearly define the 'What' and the 'Why'",
    keyPoints: [
      "State the core challenge and why current existing solutions fail or are inadequate.",
      "Explain your proposed innovative solution in 3–4 concise bullet points.",
      "Highlight your Unique Selling Proposition (USP) — what makes your idea standout.",
    ],
    proTip: "Avoid walls of text. Use bullet points and a punchy 1-sentence value proposition summary.",
  },
  {
    slideNumber: 3,
    title: "Technical Approach & Architecture",
    subtitle: "The technical backbone of your project",
    keyPoints: [
      "Include a neat block diagram, system workflow, or circuit schematic.",
      "List out the entire technology stack (Frontend, Backend, Database, AI/ML models, IoT Hardware, Protocols).",
      "Show how data flows from input to processing to the final output/action.",
    ],
    proTip: "Judges love clear architectural block diagrams. Avoid generic clipart; draw a real data pipeline.",
  },
  {
    slideNumber: 4,
    title: "Feasibility, Viability & Potential Challenges",
    subtitle: "Proving your idea can actually work in reality",
    keyPoints: [
      "Technical Feasibility: How easy/practical is it to build and deploy this solution?",
      "Economic Viability: What is the cost estimate? Is it cost-effective compared to existing solutions?",
      "Key Risks & Mitigation: Identify 2–3 bottlenecks (e.g., latency, sensor noise, server cost) and your mitigation plan.",
    ],
    proTip: "Acknowledging real-world constraints and presenting your solutions shows engineering maturity.",
  },
  {
    slideNumber: 5,
    title: "Impact, Benefits & Commercial Potential",
    subtitle: "Showcase the real-world value to society / industry",
    keyPoints: [
      "Target Beneficiaries (e.g., farmers, hospitals, municipal bodies, students).",
      "Quantifiable Impact (e.g., '30% reduction in water usage', '90% faster verification time').",
      "Scalability: How can this expand from a college prototype to a statewide/nationwide deployment?",
    ],
    proTip: "Use numbers and tangible metrics rather than vague statements like 'it will improve society'.",
  },
  {
    slideNumber: 6,
    title: "Prototype Progress, Roadmap & Conclusion",
    subtitle: "What is built right now and next steps",
    keyPoints: [
      "Current state of prototype: Wireframes, MVP repository, component testing, or circuit breadboard photos.",
      "Timeline & Milestone Roadmap for the next stages of development.",
      "Brief conclusion and ready for Q&A.",
    ],
    proTip: "If you have a live GitHub link, Figma prototype, or working breadboard photo, display it proudly here.",
  },
];

export const sihFAQs: FAQItem[] = [
  {
    category: "Eligibility",
    question: "What is the mandatory team composition rule for SIH?",
    answer: "Every team must have exactly 6 members. All members must belong to the same institute (ADGIPS). Most importantly, having AT LEAST ONE FEMALE MEMBER is strictly mandatory as per official SIH rules.",
  },
  {
    category: "Eligibility",
    question: "Can students from different departments or academic years form a team together?",
    answer: "Yes! Inter-departmental and inter-year teams (e.g., CSE + IT + ECE + AIML + 1st/2nd/3rd/4th years) are completely allowed and strongly encouraged. Diverse teams with hardware and software skills often perform best.",
  },
  {
    category: "Eligibility",
    question: "Can 1st-year students participate in the SIH Internal Hackathon?",
    answer: "Absolutely! SIH is open to all undergraduate and postgraduate students of ADGIPS. First-year students can team up with seniors or form their own teams.",
  },
  {
    category: "Registration",
    question: "How many teams will be selected from the College Internal Hackathon?",
    answer: "A total of top 45 shortlisted teams + 5 waitlisted teams will be officially nominated by our College SPOC on the national SIH portal across the Software and Hardware editions.",
  },
  {
    category: "Registration",
    question: "Is there any registration fee for the SIH Internal Hackathon at ADGIPS?",
    answer: "No, participation in the college internal hackathon organized by Robogyan is completely free of cost.",
  },
  {
    category: "PPT & Submission",
    question: "Can we modify the official PPT template format?",
    answer: "You should adhere strictly to the 6-slide structure provided in the official SIH template format (Title, Problem & Solution, Architecture, Feasibility, Impact, and Progress). You may enhance the visual design, fonts, and colors to make it look professional.",
  },
  {
    category: "PPT & Submission",
    question: "Can we submit our own innovation idea if we don't pick an official SIH Problem Statement?",
    answer: "Yes! As per SIH institute guidelines, teams can submit innovative ideas under the 'Student Innovation' / open theme category if it solves a genuine societal or technological challenge.",
  },
  {
    category: "Internal Hackathon",
    question: "What happens after our team is nominated in the top 45+5 list?",
    answer: "The College SPOC officially registers and recommends your team on the Central SIH portal. Robogyan mentors will assist you with fine-tuning your code, architecture, and prototype for the national evaluation round.",
  },
  {
    category: "Internal Hackathon",
    question: "What is the national Grand Finale prize for winning teams?",
    answer: "At the National Grand Finale, winning teams for each problem statement receive a cash prize between ₹1,00,000 to ₹1,50,000, along with national certificates from the Ministry of Education & AICTE, direct ministry interaction, and incubation/grant opportunities.",
  },
];
