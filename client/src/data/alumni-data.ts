export interface AlumniMember {
  id: string;
  name: string;
  position: string;
  currentCompany: string;
  currentRole: string;
  image: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface AlumniBatch {
  year: string;
  totalGraduates: number;
  coreTeamMembers: number;
  president: AlumniMember;
  vicePresident: AlumniMember;
  team: AlumniMember[];
  image: string;
}

export const alumniBatches: AlumniBatch[] = [
  {
    year: "2024",
    totalGraduates: 45,
    coreTeamMembers: 12,
    president: {
      id: "p2024",
      name: "Aarav Gupta",
      position: "President",
      currentCompany: "Google",
      currentRole: "Software Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      social: { linkedin: "#", github: "#" },
    },
    vicePresident: {
      id: "vp2024",
      name: "Ishita Sharma",
      position: "Vice President",
      currentCompany: "Microsoft",
      currentRole: "Product Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      social: { linkedin: "#", github: "#" },
    },
    team: [
      {
        id: "t2024-1",
        name: "Vikram Patel",
        position: "Technical Head",
        currentCompany: "Amazon",
        currentRole: "SDE II",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        social: { linkedin: "#", github: "#" },
      },
      {
        id: "t2024-2",
        name: "Priya Singh",
        position: "Design Head",
        currentCompany: "Adobe",
        currentRole: "UX Designer",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b5f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        social: { linkedin: "#" },
      },
      {
        id: "t2024-3",
        name: "Arjun Mehta",
        position: "Hardware Lead",
        currentCompany: "Tesla",
        currentRole: "Hardware Engineer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        social: { linkedin: "#", github: "#" },
      },
      {
        id: "t2024-4",
        name: "Sneha Reddy",
        position: "AI/ML Lead",
        currentCompany: "OpenAI",
        currentRole: "Research Scientist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        social: { linkedin: "#", github: "#" },
      },
    ],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
  {
    year: "2023",
    totalGraduates: 42,
    coreTeamMembers: 11,
    president: {
      id: "p2023",
      name: "Vikram Singh",
      position: "President",
      currentCompany: "Meta",
      currentRole: "Senior SWE",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      social: { linkedin: "#", github: "#" },
    },
    vicePresident: {
      id: "vp2023",
      name: "Ananya Reddy",
      position: "Vice President",
      currentCompany: "Netflix",
      currentRole: "Data Scientist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      social: { linkedin: "#", github: "#" },
    },
    team: [
      {
        id: "t2023-1",
        name: "Rahul Kumar",
        position: "Technical Head",
        currentCompany: "Stripe",
        currentRole: "Backend Engineer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        social: { linkedin: "#", github: "#" },
      },
      {
        id: "t2023-2",
        name: "Kavya Iyer",
        position: "Design Head",
        currentCompany: "Figma",
        currentRole: "Product Designer",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        social: { linkedin: "#" },
      },
    ],
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
  {
    year: "2022",
    totalGraduates: 38,
    coreTeamMembers: 10,
    president: {
      id: "p2022",
      name: "Rohan Mehta",
      position: "President",
      currentCompany: "SpaceX",
      currentRole: "Aerospace Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      social: { linkedin: "#", github: "#" },
    },
    vicePresident: {
      id: "vp2022",
      name: "Natasha Iyer",
      position: "Vice President",
      currentCompany: "Apple",
      currentRole: "iOS Developer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      social: { linkedin: "#", github: "#" },
    },
    team: [
      {
        id: "t2022-1",
        name: "Karan Singh",
        position: "Technical Head",
        currentCompany: "Uber",
        currentRole: "Senior SWE",
        image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        social: { linkedin: "#", github: "#" },
      },
    ],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
];
