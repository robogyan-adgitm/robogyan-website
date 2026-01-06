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
    techStack: ["Python", "Kotlin", "Java", "JS"],
    email: "amogh.saxena028@adgitmdelhi.ac.in",
    
    social: {
      linkedin: "https://www.linkedin.com/in/amogh-saxena-aa497a289/",
      github: "https://github.com/SaxenaAmogh",
    },
    image: "/images/coreTeam/amoghsaxena.jpg",
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
    image: "/images/coreTeam/macle.jpg",
  },
  {
    id: "3",
    name: "Abhishek Singh Chauhan",
    position: "IoT Lead",
    period: "2025-2026",
    description: "IoT innovator and research enthusiast capturing the world through tech and lens, building connected intelligent systems.",
    techStack: ["Python", "C++", "Auteur", "IoT"],
    email: "chauhanabhishek0806@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/abhishek-singh-chauhan-15620038b/",
      github: "",
    },
    image: "/images/coreTeam/abhishek.jpeg",
  },
  {
    id: "4",
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
    image: "/images/coreTeam/ayush.jpg",
  },
  {
    id: "5",
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
    image: "/images/coreTeam/dev.jpg",
  },
  {
    id: "6",
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
    image: "/images/coreTeam/pranav.jpg",
  },
  {
    id: "7",
    name: "Aditya Aggarwal",
    position: "3D Design Lead",
    period: "2025-2026",
    description: "Designing high-precision 3D models through creative engineering, advanced CAD workflows, and production-ready mechanical detailing.",
    techStack: ["FreeCAD", "SolidWorks", "Matrix"],
    email: "adityaagarwal1807@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/aditya-agarwal-289972275/",
      github: "https://github.com/CyberPolymath",
    },
    image: "/images/coreTeam/aditya.jpg",
  },
];
