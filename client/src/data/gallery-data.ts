/**
 * Life at RG (PocketBase `gallery`, one collection, told apart by `category`):
 *   "gallery"    photo grid: image, caption, sort
 *   "moments"    carousel cards: caption = title, description, image,
 *                meta = { year, location, category, attendees?, badges }
 *   "activities" tiles: caption = title, description = alt text, image
 * Bundled snapshot for first paint and offline.
 */
export interface GalleryImage {
  id: string;
  image: string;
  caption: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  { id: "g1", image: "/images/lifeatrg/18.jpg", caption: "", category: "gallery" },
  { id: "g2", image: "/images/lifeatrg/19.webp", caption: "", category: "gallery" },
  { id: "g3", image: "/images/lifeatrg/5.webp", caption: "", category: "gallery" },
  { id: "g4", image: "/images/lifeatrg/13.webp", caption: "", category: "gallery" },
  { id: "g5", image: "/images/lifeatrg/14.webp", caption: "", category: "gallery" },
  { id: "g6", image: "/images/lifeatrg/22.webp", caption: "", category: "gallery" },
  { id: "g7", image: "/images/lifeatrg/15.webp", caption: "", category: "gallery" },
  { id: "g8", image: "/images/lifeatrg/16.webp", caption: "", category: "gallery" },
  { id: "g9", image: "/images/lifeatrg/17.webp", caption: "", category: "gallery" },
  { id: "g10", image: "/images/lifeatrg/9.webp", caption: "", category: "gallery" },
  { id: "g11", image: "/images/lifeatrg/10.webp", caption: "", category: "gallery" },
  { id: "g12", image: "/images/lifeatrg/23.jpg", caption: "", category: "gallery" },
  { id: "g13", image: "/images/lifeatrg/21.webp", caption: "", category: "gallery" },
  { id: "g14", image: "/images/lifeatrg/20.webp", caption: "", category: "gallery" },
  { id: "g15", image: "/images/lifeatrg/11.webp", caption: "", category: "gallery" },
  { id: "g16", image: "/images/lifeatrg/12.webp", caption: "", category: "gallery" },
  { id: "g17", image: "/images/lifeatrg/6.webp", caption: "", category: "gallery" },
  { id: "g18", image: "/images/lifeatrg/7.webp", caption: "", category: "gallery" },
  { id: "g19", image: "/images/lifeatrg/8.webp", caption: "", category: "gallery" },
  { id: "g20", image: "/images/lifeatrg/1.webp", caption: "", category: "gallery" },
  { id: "g21", image: "/images/lifeatrg/2.webp", caption: "", category: "gallery" },
  { id: "g22", image: "/images/lifeatrg/3.webp", caption: "", category: "gallery" },
  { id: "g23", image: "/images/lifeatrg/4.webp", caption: "", category: "gallery" },
];

export interface Moment {
  id: string;
  title: string;
  year: string;
  location: string;
  category: string;
  attendees?: string;
  description: string;
  image: string;
  badges: string[];
}

export const moments: Moment[] = [
  {
    id: "1",
    title: "Techkriti 2026 at IIT Kanpur",
    year: "2026",
    location: "IIT Kanpur",
    category: "Competition",
    description: " Robogyan dominated once more at Techkriti @IITKanpur, keeping the legacy alive and continuing its winning streak with 2nd position in TechInnovation!",
    image: "/images/lifeatrg/18.jpg",
    badges: ["2nd Position"]
  },
  {
    id: "2",
    title: "Smart India Hackathon 2025",
    year: "2025",
    location: "Manipal University Jaipur",
    category: "SIH2025",
    attendees: "National Hackathon",
    description: "Team from Robogyan won the Smart India Hackathon 2025 - Hardware Edition, conducted at MUJ, Jaipur.",
    image: "/images/lifeatrg/sihWin.JPG",
    badges: []
  },
  {
    id: "3",
    title: "Smart India Hackathon 2024",
    year: "2024",
    location: "ADGIPS",
    category: "SIH2024",
    attendees: "300+",
    description: "Robogyan conducted the SIH2024 Internal round with over 300 participants.",
    image: "/images/lifeatrg/sih24.jpg",
    badges: []
  },
  {
    id: "4",
    title: "HackBMU 6.0 Hackathon",
    year: "2024",
    location: "BML Munjal University, Haryana",
    attendees: "500+",
    category: "Hackhathon",
    description: "Achieved 2nd position at HackBMU 6.0 along with a cash prize",
    image: "/images/lifeatrg/HackBMU.png",
    badges: ["2nd Runner Up"]
  },
  {
    id: "5",
    title: "RG Farewell 2025 Batch",
    year: "2025",
    location: "Robogyan Lab, Block 5",
    category: "Lab Event",
    description: "Robogyan conducted farewell for the 2025 Batch, in presence of some esteemed alumni.",
    image: "/images/lifeatrg/Farewell2025.jpg",
    badges: []
  },
  {
    id: "6",
    title: "Techkriti 2025 at IIT Kanpur",
    year: "2025",
    location: "IIT Kanpur",
    category: "Competition",
    description: " Robogyan dominated yet again at Techkriti @IITKanpur, winning 1st and 2nd positions at 'Galactic Dodger' and 2nd position at 'Capture the Flag'. ",
    image: "/images/lifeatrg/Techkriti.jpg",
    badges: ["Multiple Positions"]
  }
];

export interface Activity {
  src: string;
  alt: string;
  title: string;
}

export const activities: Activity[] = [
  {
    src: "/images/lifeatrg/workshops.jpg",
    alt: "Hands-on workshop session with students learning",
    title: "Workshop Sessions"
  },
  {
    src: "/images/lifeatrg/techtalks.jpg",
    alt: "Tech talk presentation with industry expert",
    title: "Tech Talks"
  },
  {
    src: "/images/lifeatrg/hackathons.jpg",
    alt: "Hackathon in progress with teams working intensively",
    title: "Hackathons"
  },
  {
    src: "/images/lifeatrg/competition.jpg",
    alt: "Competition day with participants presenting projects",
    title: "Competitions"
  },
  {
    src: "/images/lifeatrg/demos.jpg",
    alt: "Project demonstration and showcase event",
    title: "Project Demos"
  },
  {
    src: "/images/lifeatrg/teambuilding.jpg",
    alt: "Team building activity with collaborative challenges",
    title: "Team Building"
  }
];
