import type { RgEvent } from "./schemas";

/** Upcoming events. Empty for now: the events page shows an empty state. */
export const upcomingEvents: RgEvent[] = [];

/** Past events, newest first. Dates are ISO; two-day SIH rounds list start and end day. */
export const pastEvents: RgEvent[] = [
  {
    id: "sih-internal-2026",
    name: "SIH Internal Hackathon 2026",
    type: "Hackathon",
    status: "Ended",
    description:
      "A record-breaking internal round of SIH 2026 at ADGIPS, with 240+ competing teams and nearly 1,500 participants.",
    start: "2026-09-10",
    end: "2026-09-14",
    time: "2-day event",
    venue: "Auditorium and IT Labs",
    image: "/images/events/sih2026internal.jpg",
    registrationUrl: "/sih",
  },
  {
    id: "utkarsh-2026-subway-surfers",
    name: "Utkarsh 2026: Subway Surfers",
    type: "Event",
    status: "Ended",
    description:
      "A game where you are the controller: just your reflexes and a camera tracking your every move. Built by Robogyan.",
    start: "2026-02-19",
    time: "12 noon – 3 pm",
    venue: "Canteen area",
    image: "/images/events/subwayUtkarsh26.jpg",
  },
  {
    id: "sih-internal-2025",
    name: "SIH Internal Hackathon 2025",
    type: "Hackathon",
    status: "Ended",
    description: "The internal round of SIH 2025 at ADGIPS, with 1,200+ participants.",
    start: "2025-09-12",
    // Old data said "2024-09-13" (wrong year).
    end: "2025-09-13",
    time: "2-day event",
    venue: "Auditorium and IT Labs",
    image: "/images/events/sih25.jpg",
  },
  {
    id: "utkarsh-2025-subway-surfers",
    name: "Utkarsh 2025: Subway Surfers",
    type: "Event",
    status: "Ended",
    description:
      "A two-player Subway Surfers game built by Robogyan, on show at Utkarsh, the ADGIPS annual fest.",
    start: "2025-02-19",
    time: "10 am – 3 pm",
    venue: "Canteen area",
    image: "/images/events/subwayutkarsh25.jpeg",
  },
  {
    id: "drone-workshop-2024",
    name: "Drone Workshop",
    type: "Workshop",
    status: "Ended",
    description: "A workshop on drones and their tech, with the startup DTown Robotics.",
    start: "2024-10-09",
    time: "11 am – 12 noon",
    venue: "Smart Room, Block 5",
    image: "/images/events/drone24.jpg",
  },
  {
    id: "sih-internal-2024",
    name: "SIH Internal Hackathon 2024",
    type: "Hackathon",
    status: "Ended",
    description: "The internal round of SIH 2024 at ADGIPS, with 200+ participants.",
    // Two non-consecutive days, like 2026 (10th & 14th).
    start: "2024-09-07",
    end: "2024-09-17",
    time: "2-day event",
    venue: "Auditorium and IT Labs",
    image: "/images/events/sih24.jpg",
  },
];
