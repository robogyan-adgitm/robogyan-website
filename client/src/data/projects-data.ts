export interface Project {
  id: string;
  name: string;
  status: "Active" | "Completed" | "Development" | "Research" | "Beta";
  startDate: string;
  endDate?: string;
  techStack: string[];
  category: "Hardware" | "Software" | "Mixed" | "AI/ML" | "Robotics" | "IoT";
  image: string;
  docsUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "RC Plane",
    status: "Active",
    startDate: "Mar 2025",
    techStack: ["Embedded", "Aerodynamics", "C++", "Servo Motors"],
    category: "Robotics",
    image: "/src/data/images/projects/rcplane.jpg",
    docsUrl: "#",
  },
  {
    id: "2",
    name: "Maneuvre Bot",
    status: "Completed",
    startDate: "Feb 2025",
    endDate: "Mar 2025",
    techStack: ["12V Motors", "Motor Driver", "Arduino Nano"],
    category: "Robotics",
    image: "/src/data/images/projects/maneuvre.jpg",
    docsUrl: "#",
  },
  {
    id: "3",
    name: "Deafiator - Device for simple comms.",
    status: "Completed",
    startDate: "Aug 2024",
    endDate: "Sep 2024",
    techStack: ["Esp32", "Vibration Motor", "Buzzer", "Battery"],
    category: "IoT",
    image: "/src/data/images/projects/deafiator.jpg",
    docsUrl: "#",
  },
  {
    id: "4",
    name: "Hovecrafts",
    status: "Completed",
    startDate: "Oct 2024",
    endDate: "Nov 2024",
    techStack: ["LiPo Batteries", "2200kV Motors", "ESCs"],
    category: "Robotics",
    image: "/src/data/images/projects/hovercraft.jpg",
    docsUrl: "#",
  },
];
