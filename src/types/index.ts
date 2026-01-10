/**
 * Core TypeScript interfaces for Mohammad Aqueel's AI/ML Portfolio
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
  visaStatus: string;
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
  portraitImage: string;
  // Legacy fields for compatibility
  biography?: string;
  availability?: string;
  phone?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: 'voice-ai' | 'chatbot' | 'ml-pipeline' | 'consultation';
  message: string;
  timestamp: Date;
}

// Keep legacy types for compatibility
export type ProjectCategory = 'voice-ai' | 'chatbot' | 'ml-pipeline' | 'api' | 'portraits' | 'landscapes' | 'editorial' | 'architecture' | 'documentary';

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: AspectRatio;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  coverImage: string;
  images: ProjectImage[];
  description: string;
  client?: string;
  camera?: string;
  tech?: string[];
  location?: string;
  slug: string;
}

// Legacy type alias
export type PhotographerInfo = ProfileInfo;
