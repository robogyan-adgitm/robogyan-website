// ============================================================================
// SIH 2026 INTERNAL ROUND - RESULTS & JUDGES DATA
// NOTE: Replace placeholder names with actual team details and judge graphics
// once provided. Columns strictly: S.No., Team Name, Team Leader, Status.
// ============================================================================

export interface SIHTeamResult {
  sNo: number;
  teamName: string;
  leaderName: string;
  status: "Selected" | "Waitlisted";
}

export interface SIHJudge {
  id: string;
  name: string;
  designation: string;
  affiliation: string;
  image?: string; // Path to judge graphic when provided
  role?: string;
  quote?: string;
}

// ----------------------------------------------------------------------------
// 45 SELECTED TEAMS (Nominated for SIH 2026 National Portal)
// ----------------------------------------------------------------------------
export const sihSelectedTeams: SIHTeamResult[] = [
  { sNo: 1, teamName: "DAVIDPUTRA 1000cc", leaderName: "Anmol", status: "Selected" },
  { sNo: 2, teamName: "Flood Force", leaderName: "Shreya Sinha", status: "Selected" },
  { sNo: 3, teamName: "Hackbyte", leaderName: "Ojash Tyagi", status: "Selected" },
  { sNo: 4, teamName: "Iteration One", leaderName: "Khyati Jain", status: "Selected" },
  { sNo: 5, teamName: "Melody", leaderName: "Riddhi Bansal", status: "Selected" },
  { sNo: 6, teamName: "Mind Alchemist", leaderName: "Ayush Aman", status: "Selected" },
  { sNo: 7, teamName: "Neeraksh", leaderName: "Manish Dubey", status: "Selected" },
  { sNo: 8, teamName: "NIDAAN X", leaderName: "Dishti Kaushik", status: "Selected" },
  { sNo: 9, teamName: "Paneer tikka", leaderName: "Naman Saini", status: "Selected" },
  { sNo: 10, teamName: "Pawtech", leaderName: "Atharva Shukla", status: "Selected" },
  { sNo: 11, teamName: "Pirates", leaderName: "Atharv Tiwari", status: "Selected" },
  { sNo: 12, teamName: "Suraksha Sonic", leaderName: "Naman Tiwari", status: "Selected" },
  { sNo: 13, teamName: "Team Spectrum", leaderName: "Nikhil Garg", status: "Selected" },
  { sNo: 14, teamName: "Team SYNATEN", leaderName: "Anshul Saxena", status: "Selected" },
  { sNo: 15, teamName: "The Thinktronics", leaderName: "Abhishek Singh Chauhan", status: "Selected" },
  { sNo: 16, teamName: "Zebrewww", leaderName: "Adarsh Raj Singh", status: "Selected" },
  { sNo: 17, teamName: "Citadel", leaderName: "Tushar Kaushik", status: "Selected" },
  { sNo: 18, teamName: "Robogyan", leaderName: "Aditya Agarwal", status: "Selected" },
  { sNo: 19, teamName: "Unsupervised Adults", leaderName: "Prithvi Singh", status: "Selected" },
  { sNo: 20, teamName: "INNOVIX", leaderName: "Dhairya Gupta", status: "Selected" },
  { sNo: 21, teamName: "Peaky Grinders", leaderName: "Aryan Shrivastava", status: "Selected" },
  { sNo: 22, teamName: "Arogya Smriti", leaderName: "Tanuj Bhardwaj", status: "Selected" },
  { sNo: 23, teamName: "Pipepye", leaderName: "Satyansh Gaur", status: "Selected" },
  { sNo: 24, teamName: "Convergence", leaderName: "ANJALI JHA", status: "Selected" },
  { sNo: 25, teamName: "NeuroForge", leaderName: "Samyak Kumar Shrivastava", status: "Selected" },
  { sNo: 26, teamName: "ZOD", leaderName: "Gautam Saini", status: "Selected" },
  { sNo: 27, teamName: "Hacktivators", leaderName: "Aaryaman", status: "Selected" },
  { sNo: 28, teamName: "PointBreak", leaderName: "Syed Altamash", status: "Selected" },
  { sNo: 29, teamName: "CivicLens", leaderName: "Divyanshu Dhar Dwivedi", status: "Selected" },
  { sNo: 30, teamName: "Horizon Nexus", leaderName: "Shubhi Sharma", status: "Selected" },
  { sNo: 31, teamName: "HydroNexus", leaderName: "Shaunak Shandilya", status: "Selected" },
  { sNo: 32, teamName: "NoName", leaderName: "Pranav Bisht", status: "Selected" },
  { sNo: 33, teamName: "Anomaly", leaderName: "Siddhant", status: "Selected" },
  { sNo: 34, teamName: "EmergeX", leaderName: "Vipul Kumar Chaubey", status: "Selected" },
  { sNo: 35, teamName: "AAPTIRAKSHAK", leaderName: "Rishabh kumar Ray", status: "Selected" },
  { sNo: 36, teamName: "CATCODE", leaderName: "Anushka", status: "Selected" },
  { sNo: 37, teamName: "Freight-Ops", leaderName: "Raghav Bhardwaj", status: "Selected" },
  { sNo: 38, teamName: "Team Vetronix", leaderName: "Shakshi Gangwar", status: "Selected" },
  { sNo: 39, teamName: "Vector 42", leaderName: "Ishita Sharma", status: "Selected" },
  { sNo: 40, teamName: "Bityug", leaderName: "Deepesh JAIN", status: "Selected" },
  { sNo: 41, teamName: "InnoVortex", leaderName: "Sambhav Yadav", status: "Selected" },
  { sNo: 42, teamName: "NextGen", leaderName: "Pranav Joshi", status: "Selected" },
  { sNo: 43, teamName: "Roboforge", leaderName: "UTSAV GARG", status: "Selected" },
  { sNo: 44, teamName: "The Codeheads", leaderName: "Aaryan Bansal", status: "Selected" },
  { sNo: 45, teamName: "Xknot", leaderName: "Granth Chawla", status: "Selected" },
];

// ----------------------------------------------------------------------------
// 5 WAITLISTED TEAMS
// ----------------------------------------------------------------------------
export const sihWaitlistedTeams: SIHTeamResult[] = [
  { sNo: 1, teamName: "Async Thinkers", leaderName: "Vineet Pandey", status: "Waitlisted" },
  { sNo: 2, teamName: "Hexa Nova", leaderName: "Janshu Mishra", status: "Waitlisted" },
  { sNo: 3, teamName: "6DIAMONDS", leaderName: "Prisha Gupta", status: "Waitlisted" },
  { sNo: 4, teamName: "Nexora", leaderName: "Shubham Kumar", status: "Waitlisted" },
  { sNo: 5, teamName: "ImagineAlgo", leaderName: "Arpit Sharma", status: "Waitlisted" },
];

// ----------------------------------------------------------------------------
// 12 ESTEEMED JUDGES
// Single-slide carousel format (Instagram 1:1 post aesthetic)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 12 ESTEEMED JUDGES IMAGES (Direct graphics from /images/SIH26Judges)
// ----------------------------------------------------------------------------
export const sihJudgeImages: string[] = [
  "/images/SIH26Judges/7.png",
  "/images/SIH26Judges/8.png",
  "/images/SIH26Judges/9.png",
  "/images/SIH26Judges/10.png",
  "/images/SIH26Judges/11.png",
  "/images/SIH26Judges/12.png",
  "/images/SIH26Judges/13.png",
  "/images/SIH26Judges/14.png",
  "/images/SIH26Judges/15.png",
  "/images/SIH26Judges/16.png",
  "/images/SIH26Judges/17.png",
  "/images/SIH26Judges/18.png",
];

export const sihJudgesData: SIHJudge[] = sihJudgeImages.map((img, idx) => ({
  id: `judge-${idx + 1}`,
  name: `Judge ${idx + 1}`,
  designation: "Jury Evaluator",
  affiliation: "SIH 2026 Evaluation Panel",
  image: img,
}));
