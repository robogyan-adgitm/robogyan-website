export interface TeamMember {
  id: string;
  name: string;
  position: string;
  period: string;
  description: string;
  techStack: string[];
  email: string;
  phone?: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    position: "President",
    period: "2024-2025",
    description: "AI/ML specialist leading innovation in artificial intelligence and machine learning projects.",
    techStack: ["Python", "TensorFlow", "PyTorch", "React"],
    email: "arjun@robogyan.edu",
    phone: "+91 98765 43210",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "2",
    name: "Priya Patel",
    position: "Vice President",
    period: "2024-2025",
    description: "Robotics engineer specializing in hardware innovation and embedded systems.",
    techStack: ["Arduino", "Raspberry Pi", "C++", "CAD"],
    email: "priya@robogyan.edu",
    social: {
      linkedin: "#",
      github: "#",
    },
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "3",
    name: "Rahul Kumar",
    position: "Technical Head",
    period: "2024-2025",
    description: "Full-stack development expert with expertise in modern web technologies.",
    techStack: ["React", "Node.js", "MongoDB", "TypeScript"],
    email: "rahul@robogyan.edu",
    social: {
      linkedin: "#",
      github: "#",
    },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "4",
    name: "Sneha Singh",
    position: "Design Head",
    period: "2024-2025",
    description: "Creative design visionary specializing in UI/UX and 3D modeling.",
    techStack: ["Figma", "Adobe XD", "Blender", "After Effects"],
    email: "sneha@robogyan.edu",
    social: {
      linkedin: "#",
      instagram: "#",
    },
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "5",
    name: "Amit Verma",
    position: "Hardware Lead",
    period: "2024-2025",
    description: "Electronics and circuit design expert with focus on IoT solutions.",
    techStack: ["PCB Design", "IoT", "Sensors", "Embedded C"],
    email: "amit@robogyan.edu",
    social: {
      linkedin: "#",
      github: "#",
    },
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "6",
    name: "Kavya Joshi",
    position: "Software Lead",
    period: "2024-2025",
    description: "Backend architecture specialist with expertise in scalable systems.",
    techStack: ["Java", "Spring", "Microservices", "Docker"],
    email: "kavya@robogyan.edu",
    social: {
      linkedin: "#",
      github: "#",
    },
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "7",
    name: "Karan Mehta",
    position: "Robotics Lead",
    period: "2024-2025",
    description: "Robotics and computer vision specialist working on autonomous systems.",
    techStack: ["ROS", "OpenCV", "Python", "MATLAB"],
    email: "karan@robogyan.edu",
    social: {
      linkedin: "#",
      github: "#",
    },
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "8",
    name: "Ananya Gupta",
    position: "AI/ML Lead",
    period: "2024-2025",
    description: "Data science expert focusing on deep learning and neural networks.",
    techStack: ["TensorFlow", "PyTorch", "Scikit-learn", "Jupyter"],
    email: "ananya@robogyan.edu",
    social: {
      linkedin: "#",
      github: "#",
    },
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "9",
    name: "Rohan Singh",
    position: "Events Lead",
    period: "2024-2025",
    description: "Event management specialist organizing tech competitions and workshops.",
    techStack: ["Project Management", "Marketing", "Coordination"],
    email: "rohan@robogyan.edu",
    social: {
      linkedin: "#",
      instagram: "#",
    },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "10",
    name: "Isha Sharma",
    position: "Marketing Head",
    period: "2024-2025",
    description: "Digital marketing expert managing social media and community outreach.",
    techStack: ["Social Media", "Content Creation", "Analytics"],
    email: "isha@robogyan.edu",
    social: {
      linkedin: "#",
      instagram: "#",
      twitter: "#",
    },
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
];
