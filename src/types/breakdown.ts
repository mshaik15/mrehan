import type { ReactNode } from 'react';

export interface BreakdownSection {
  id: string;
  title: string;
  content: ReactNode;
}

export interface TeamMember {
  name: string;
  linkedinUrl?: string;
}

export interface BreakdownMetadata {
  title: string;
  subtitle: string;
  projectType: string;
  year: string;
  timeline: string;
  tools: string[];
  
  // Optional fields
  team?: string | TeamMember[];
  role?: string;
  status?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  previewImage?: string;
}

export interface ProjectBreakdown {
  metadata: BreakdownMetadata;
  sections: BreakdownSection[];
}

export interface BreakdownComponent {
  default: () => ProjectBreakdown;
}