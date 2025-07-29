export interface Event {
  id: string;
  name: string;
  type: "Workshop" | "Hackathon" | "Competition" | "Interviews" | "Event";
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
  // {
  //   id: "1",
  //   name: "AI/ML Bootcamp",
  //   type: "Workshop",
  //   status: "Open",
  //   description: "Intensive 3-day workshop covering machine learning fundamentals, neural networks, and practical AI applications.",
  //   date: "2024-12-15",
  //   endDate: "2024-12-17",
  //   time: "9:00 AM - 5:00 PM",
  //   venue: "Tech Lab, Building A",
  //   image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
  //   registrationUrl: "#",
  //   maxParticipants: 50,
  // },
];

export const pastEvents: Event[] = [
  {
    id: "1",
    name: "Utkarsh 2025: Subway Surfers",
    type: "Event",
    status: "Ended",
    description: "A two-player Subway Surfers game developed by Robogyan, on display in annual fest of ADGIPS.",
    date: "19-02-2025",
    time: "10:00 AM - 3:00 PM",
    venue: "Canteen Area",
    image: "/src/data/images/events/subwayutkarsh25.jpeg",
  },
  {
    id: "2",
    name: "Drone Event",
    type: "Workshop",
    status: "Ended",
    description: "A workshop on drones and their tech, with industry leading startup DTown Robotics!",
    date: "09-10-2024",
    time: "11:00 AM - 12:00 PM",
    venue: "Smart Room, Block 5",
    image: "/src/data/images/events/drone24.jpg",
    prizePool: "",
  },
  {
    id: "3",
    name: "SIH Internal Hackathon 2024",
    type: "Hackathon",
    status: "Ended",
    description: "The internal round of SIH 2024, conducted in ADGIPS with 200+ participants!",
    date: "07-09-2024",
    endDate: "2024-09-17",
    time: "2 Days Event",
    venue: "Auditorium and IT Labs",
    image: "/src/data/images/events/sih24.jpg",
    prizePool: "",
  },
];
