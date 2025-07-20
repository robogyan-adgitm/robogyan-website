export interface Event {
  id: string;
  name: string;
  type: "Workshop" | "Hackathon" | "Competition" | "Seminar" | "Conference";
  status: "Open" | "Live" | "Ended" | "Upcoming";
  description: string;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  image: string;
  registrationUrl?: string;
  maxParticipants?: number;
  prizePool?: string;
}

export const upcomingEvents: Event[] = [
  {
    id: "1",
    name: "AI/ML Bootcamp",
    type: "Workshop",
    status: "Open",
    description: "Intensive 3-day workshop covering machine learning fundamentals, neural networks, and practical AI applications.",
    date: "2024-12-15",
    endDate: "2024-12-17",
    time: "9:00 AM - 5:00 PM",
    venue: "Tech Lab, Building A",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    registrationUrl: "#",
    maxParticipants: 50,
  },
  {
    id: "2",
    name: "RoboHack 2024",
    type: "Hackathon",
    status: "Live",
    description: "48-hour hackathon focused on robotics and automation solutions for smart cities and sustainable living.",
    date: "2024-12-20",
    endDate: "2024-12-22",
    time: "6:00 PM Friday - 6:00 PM Sunday",
    venue: "Innovation Center",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    registrationUrl: "#",
    prizePool: "₹50,000",
  },
  {
    id: "3",
    name: "Code Combat Championship",
    type: "Competition",
    status: "Open",
    description: "Inter-college programming competition with algorithmic challenges and problem-solving contests.",
    date: "2025-01-10",
    time: "10:00 AM - 4:00 PM",
    venue: "Computer Lab Complex",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    registrationUrl: "#",
    prizePool: "₹30,000",
  },
  {
    id: "4",
    name: "Industry Tech Talk",
    type: "Seminar",
    status: "Open",
    description: "Guest speakers from leading tech companies sharing insights on emerging technologies and career opportunities.",
    date: "2025-01-25",
    time: "2:00 PM - 5:00 PM",
    venue: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    registrationUrl: "#",
  },
];

export const pastEvents: Event[] = [
  {
    id: "5",
    name: "IoT Fundamentals",
    type: "Workshop",
    status: "Ended",
    description: "Introduction to Internet of Things with hands-on projects using Arduino and sensors.",
    date: "2024-11-15",
    time: "9:00 AM - 5:00 PM",
    venue: "Electronics Lab",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
  },
  {
    id: "6",
    name: "RoboWars 2024",
    type: "Competition",
    status: "Ended",
    description: "Robot combat competition featuring custom-built fighting robots.",
    date: "2024-10-20",
    time: "9:00 AM - 6:00 PM",
    venue: "Main Ground",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    prizePool: "₹25,000",
  },
  {
    id: "7",
    name: "Green Tech Hack",
    type: "Hackathon",
    status: "Ended",
    description: "Environmental technology solutions hackathon for sustainable development.",
    date: "2024-09-15",
    endDate: "2024-09-17",
    time: "48 Hours",
    venue: "Innovation Hub",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    prizePool: "₹40,000",
  },
];
