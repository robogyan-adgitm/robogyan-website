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
    name: "Amogh Saxena",
    position: "President",
    period: "2025-2026",
    description: "Android & ML specialist leading innovation in app development and machine learning projects.",
    techStack: ["Python", "Kotlin", "Java", "Jetpack"],
    email: "amoghsaxena@gmail.com",
    phone: "+91 9868868844",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/members//amogh.jpg",
  },
  {
    id: "2",
    name: "Macle (Aditya Goel)",
    position: "Vice President",
    period: "2025-2026",
    description: "Master of Embedded, specializing in hardware innovation and embedded systems.",
    techStack: ["Arduino", "ESP32", "React", "JS", "C++"],
    email: "adityagoel2462@gmail.com",
    phone: "+91 9205705887",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/members//macle.png",
  },
  {
    id: "3",
    name: "Nikunj Sharma",
    position: "Management Head",
    period: "2025-2026",
    description: "Young mind in the ML department with great management and leadership skills.",
    techStack: ["Frontend", "Design", "ML", "Hardware"],
    email: "nikunjsharmaa483@gmail.com",
    phone: "+91 8860262882",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/members//nikunj.jpg",
  },
  {
    id: "4",
    name: "Ayush Kumar Jha",
    position: "Firmware & Research Head",
    period: "2025-2026",
    description: "Creative design visionary specializing in UI/UX and 3D modeling.",
    techStack: ["Figma", "Adobe XD", "Blender", "After Effects"],
    email: "ayushjha207@gmail.com",
    phone: "+91 7827109679",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/members//ayush.jpg",
  },
  {
    id: "5",
    name: "Pranav Bisht",
    position: "Embedded Head",
    period: "2025-2026",
    description: "Electronics and circuit design expert with focus on IoT solutions.",
    techStack: ["PCB Design", "IoT", "Sensors", "Embedded C"],
    email: "pranav0bisht@gmail.com",
    phone: "+91 9311220260",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/members//pranav.jpg",
  },
  {
    id: "6",
    name: "Aditya Aggarwal",
    position: "Android Head",
    period: "2025-2026",
    description: "Backend architecture specialist with expertise in scalable systems.",
    techStack: ["Java", "Spring", "Microservices", "Docker"],
    email: "kavya@robogyan.edu",
    phone: "+91 7827109679",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "7",
    name: "?",
    position: "WebDev Head",
    period: "2025-2026",
    description: "Robotics and computer vision specialist working on autonomous systems.",
    techStack: ["ROS", "OpenCV", "Python", "MATLAB"],
    email: "karan@robogyan.edu",
    phone: "+91 7827109679",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "8",
    name: "Dev Chandra",
    position: "Robotics Head",
    period: "2025-2026",
    description: "Data science expert focusing on deep learning and neural networks.",
    techStack: ["TensorFlow", "PyTorch", "Scikit-learn", "Jupyter"],
    email: "devchandra2106@gmail.com",
    phone: "+91 9650487494",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/members//dev.jpg",
  },
  {
    id: "9",
    name: "Avanya",
    position: "Graphics Head",
    period: "2025-2026",
    description: "Event management specialist organizing tech competitions and workshops.",
    techStack: ["Project Management", "Marketing", "Coordination"],
    email: "rohan@robogyan.edu",
    phone: "+91 7827109679",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "10",
    name: "Nirmaan",
    position: "3D Design Head",
    period: "2025-2026",
    description: "Digital marketing expert managing social media and community outreach.",
    techStack: ["Social Media", "Content Creation", "Analytics"],
    email: "isha@robogyan.edu",
    phone: "+91 7827109679",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    id: "11",
    name: "?",
    position: "Women in Tech",
    period: "2025-2026",
    description: "Digital marketing expert managing social media and community outreach.",
    techStack: ["Social Media", "Content Creation", "Analytics"],
    email: "isha@robogyan.edu",
    phone: "+91 7827109679",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
];
