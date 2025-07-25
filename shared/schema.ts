// Simple types for frontend-only data structures
// No database schemas needed since this is a static site

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

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  gradient: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  registrationUrl?: string;
  imageUrl?: string;
  category: string;
}
