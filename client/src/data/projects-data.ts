export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Completed" | "Development" | "Research" | "Beta";
  startDate: string;
  endDate?: string;
  techStack: string[];
  category: "Hardware" | "Software" | "Mixed" | "AI/ML" | "Robotics" | "IoT";
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Autonomous Rover",
    description: "AI-powered autonomous rover with advanced computer vision for terrain mapping and obstacle avoidance in challenging environments.",
    status: "Active",
    startDate: "2024-01",
    techStack: ["Python", "OpenCV", "ROS", "Arduino", "TensorFlow"],
    category: "Robotics",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    githubUrl: "#",
    docsUrl: "#",
  },
  {
    id: "2",
    name: "Smart Campus System",
    description: "Comprehensive IoT-based campus management with real-time monitoring, automated lighting, and resource optimization.",
    status: "Completed",
    startDate: "2023-09",
    endDate: "2023-12",
    techStack: ["Node.js", "React", "MongoDB", "IoT", "Arduino"],
    category: "IoT",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    githubUrl: "#",
    demoUrl: "#",
    docsUrl: "#",
  },
  {
    id: "3",
    name: "VR Learning Platform",
    description: "Immersive virtual reality platform for engineering education with interactive 3D simulations and collaborative learning.",
    status: "Development",
    startDate: "2024-11",
    endDate: "2025-03",
    techStack: ["Unity", "C#", "Oculus SDK", "Blender"],
    category: "Mixed",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    githubUrl: "#",
    docsUrl: "#",
  },
  {
    id: "4",
    name: "Weather Monitoring Station",
    description: "Automated weather monitoring system with real-time data collection and predictive analytics for campus climate control.",
    status: "Completed",
    startDate: "2024-02",
    endDate: "2024-05",
    techStack: ["Arduino", "LoRa", "Python", "Flask", "SQLite"],
    category: "IoT",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    githubUrl: "#",
    docsUrl: "#",
  },
  {
    id: "5",
    name: "Student Companion App",
    description: "All-in-one mobile application for students with attendance tracking, grade management, and social features.",
    status: "Beta",
    startDate: "2024-08",
    techStack: ["React Native", "Firebase", "Redux", "Node.js"],
    category: "Software",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    id: "6",
    name: "Blockchain Voting System",
    description: "Secure and transparent voting system using blockchain technology for student elections and organizational decisions.",
    status: "Research",
    startDate: "2024-10",
    endDate: "2025-02",
    techStack: ["Solidity", "Web3.js", "Ethereum", "React", "Truffle"],
    category: "Software",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    githubUrl: "#",
    docsUrl: "#",
  },
];
