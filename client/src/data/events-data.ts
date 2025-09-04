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
  prizePool?: string;
}

export const upcomingEvents: Event[] = [
   {
     id: "1",
     name: "SIH Internal Hackathon",
     type: "Hackathon",
     status: "Live",
     description: "ROBOGYAN is organizing the Internal Hackathon for the much-anticipated SMART INDIA HACKATHON 2025. This is your chance to participate in a premier PAN-INDIA hackathon, organized by the Government of India in collaboration with the Ministry of Education’s Innovation Cell and All India Council for Technical Education (AICTE).",
     date: "12th September, 2025",
     endDate: "13th September, 2025",
     time: "10 am Onwards",
     venue: "Auditorium, ADGIPS",
     image: "/images/sih2025.png",
     registrationUrl: "https://forms.gle/dPrERb8Ju79s5pg6A",
   },
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
    image: "/images/events/subwayutkarsh25.jpeg",
  },
  {
    id: "2",
    name: "Drone Workshop",
    type: "Workshop",
    status: "Ended",
    description: "A workshop on drones and their tech, with industry leading startup DTown Robotics!",
    date: "09-10-2024",
    time: "11:00 AM - 12:00 PM",
    venue: "Smart Room, Block 5",
    image: "/images/events/drone24.jpg",
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
    image: "/images/events/sih24.jpg",
    prizePool: "",
  },
];
