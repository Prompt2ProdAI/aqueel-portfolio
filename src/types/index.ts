/**
 * Core TypeScript interfaces for Mohammed Aqueel's AI/ML Portfolio
 */

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  projects: {
    name: string;
    highlight?: string;
    bullets: string[];
  }[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ProfileInfo {
  name: string;
  tagline: string;
  heroIntroduction: string;
  summary: string;
  location: string;
  email: string;
  phones: {
    uae: string;
    india: string;
  };
  visaStatus?: string;
  education: {
    degree: string;
    institution: string;
    period: string;
    cgpa: string;
  };
  socialLinks: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    behance?: string;
  };
  multilingualNames?: {
    arabic: string;
    hindi: string;
    malayalam: string;
    telugu: string;
  };
  portraitImage: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: 'voice-ai' | 'chatbot' | 'ml-pipeline' | 'consultation' | 'other';
  message: string;
  timestamp: Date;
}

export type ProjectCategory = 'voice-ai' | 'agents' | 'rag' | 'computer-vision' | 'nlp' | 'mlops';

export interface ProjectLink {
  type: 'github' | 'demo' | 'paper' | 'article';
  url: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  technologies: string[];
  impact?: string; // e.g., "Reduced latency by 40%"
  challenges?: string[];
  links: ProjectLink[];
  featured?: boolean;
  coverImage?: string; // Optional illustration/diagram
  date?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown supported
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

// Legacy type alias for compatibility during refactor
export type PhotographerInfo = ProfileInfo;
