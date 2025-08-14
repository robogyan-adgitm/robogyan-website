export interface TeamMember {
  id: string;
  name: string;
  position: string;
  period: string;
  description: string;
  techStack: string[];
  email: string;
  social: {
    linkedin?: string;
    github?: string;
  };
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Amogh Saxena",
    position: "President",
    period: "2025-2026",
    description: "Android specialist leading innovation in app development and software development projects.",
    techStack: ["Python", "Kotlin", "Java", "Jetpack"],
    email: "amogh.saxena028@adgitmdelhi.ac.in",
    
    social: {
      linkedin: "https://www.linkedin.com/in/amogh-saxena-aa497a289/",
      github: "https://github.com/SaxenaAmogh",
    },
    image: "/src/data/images/coreTeam/amogh.jpg",
  },
  {
    id: "2",
    name: "Aditya Goel",
    position: "Vice President",
    period: "2025-2026",
    description: "Master of Embedded, specializing in hardware innovation and embedded systems.",
    techStack: ["Embedded", "Firmware", "Full Stack Dev"],
    email: "adityagoel2462@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/macle57/",
      github: "https://github.com/Macle57",
    },
    image: "/src/data/images/coreTeam/macle.jpg",
  },
  {
    id: "3",
    name: "Ayush Kumar Jha",
    position: "Firmware & Research Lead",
    period: "2025-2026",
    description: "Driving cutting-edge embedded solutions and visionary problem-solving.",
    techStack: ["Python", "C++", "Hardware"],
    email: "ayushjha207@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/ayush-kumar-jha-a16107279/",
      github: "https://github.com/Zalverine",
    },
    image: "/src/data/images/coreTeam/ayush.jpg",
  },
  {
    id: "4",
    name: "Pranav Bisht",
    position: "Embedded Lead",
    period: "2025-2026",
    description: "Pioneering embedded systems leader, crafting intelligent hardware-software integrations.",
    techStack: ["PCB Design", "IoT", "Sensors", "Embedded C"],
    email: "pranav0bisht@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/pranav-bisht-00b76b35b",
      github: "https://github.com/keyboard-warrior-og",
    },
    image: "/src/data/images/coreTeam/pranav.jpg",
  },
  {
    id: "5",
    name: "Aditya Aggarwal",
    position: "Android Lead",
    period: "2025-2026",
    description: "Shaping mobile experiences through innovative design, robust architecture, and cutting-edge technology.",
    techStack: ["Java", "Kotlin", "JS"],
    email: "adityaagarwal1807@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/aditya-agarwal-289972275/",
      github: "https://github.com/CyberPolymath",
    },
    image: "/src/data/images/coreTeam/aditya.jpg",
  },
  {
    id: "6",
    name: "Dev Chandra",
    position: "Robotics Lead",
    period: "2025-2026",
    description: "Robotics leader blending mechanical ingenuity with AI innovation to build intelligent & adaptive systems.",
    techStack: ["Python", "Hardware", "Scikit-learn", "Jupyter"],
    email: "devchandra2106@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/dev-chandra-1594a4335/",
      github: "https://github.com/Boss95684",
    },
    image: "/src/data/images/coreTeam/dev.jpg",
  },
  {
    id: "7",
    name: "Krish Gupta",
    position: "WebDev Lead",
    period: "2025-2026",
    description: "Full-stack developer building modern, AI-integrated web apps with clean design and robust backend.",
    techStack: ["Next.js", "React", "Node.js", "Prisma", "PostgreSQL"],
    email: "krishg053@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/krishgupta24/",
      github: "https://github.com/Krish-Gupta24",
    },
    image: "/src/data/images/coreTeam/krish.jpg",
  },
  {
    id: "8",
    name: "Nikunj Sharma",
    position: "Management Lead",
    period: "2025-2026",
    description: "Interested in software, hardware, and machine learning; building intelligent IOT systems.",
    techStack: ["Frontend", "Design", "Python", "JavaScript"],
    email: "nikunjsharmaa483@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/nikunj-sharma-4aa823286/",
      github: "https://github.com/Nicksharmaaa",
    },
    image: "/src/data/images/coreTeam/nikunj.jpg",
  },
  {
    id: "9",
    name: "Nandani Singh",
    position: "Social Media Lead",
    period: "2025-2026",
    description:"Turning complex tech into scroll-stopping stories — where design, strategy, and creativity meet for maximum impact.",
    techStack: ["Frontend","Figma","Content Creation & Strategy","React.js","Javascript",],
    email: "nandanisingh2k01@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/nandani0106/",
      github: "https://github.com/nandanisingh-1",
    },
    image: "/src/data/images/coreTeam/nandini.jpg",
  },
  {
    id: "10",
    name: "Achintya Bhardwaj",
    position: "Women in Tech",
    period: "2025-2026",
    description: "Representing women in tech fields - driven by innovation, curiosity, and a passion for creating impact.",
    techStack: ["MongoDB","Express","React","Node", "Tailwind","Java"],
    email: "achi.bhardwaj@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/achintya23/",
      github: "https://github.com/Achintyabhardwaj",
    },
    image: "/src/data/images/coreTeam/achintya.jpg",
  },
  {
    id: "11",
    name: "Avanya",
    position: "Graphics Lead",
    period: "2025-2026",
    description: "Graphics visionary blending bold design and front-end finesse with creative precision.",
    techStack: ["Canva", "React", "JAVASCRIPT"],
    email: "avanyasharma299@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/avanya-sharma-21794b310/",
      github: "https://github.com/avanya06",
    },
    image: "/src/data/images/coreTeam/avanya.png",
  },
  {
    id: "12",
    name: "Nirmaan",
    position: "3D Design Lead",
    period: "2025-2026",
    description: "Merging immersive 3D visuals with intuitive UI—design that feels and flows.",
    techStack: ["Fusion 360", "Blender", "Figma"],
    email: "nirthehydrobeast50@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/nirmaan-vashisht-a2552a343/",
      github: "https://github.com/Nir2575",
    },
    image: "/src/data/images/coreTeam/nirmaan.jpg",
  },
  {
    id: "13",
    name: "Aman Kumar",
    position: "Content Lead",
    period: "2025-2026",
    description: "Leading with clarity, writing with purpose-driving content that makes tech talk human.",
    techStack: ["Social Media", "Content Creation", "Analytics"],
    email: "amankumar11076@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/amankumar-social/",
      github: "https://github.com/aman-social",
    },
    image: "/src/data/images/coreTeam/aman.jpg",
  },
];
