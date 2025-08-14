import type { ReactNode } from 'react';

// Content block types
export interface TextBlock {
  type: 'text';
  content: string;
  indent?: number; // Add indentation level (0 = no indent, 1 = first level, etc.)
}

export interface MathBlock {
  type: 'math';
  content: string;
  inline?: boolean; // false = block math, true = inline math
  indent?: number;
}

export interface CodeBlock {
  type: 'code';
  content: string;
  language?: string;
  filename?: string;
  indent?: number;
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  width?: string;
  height?: string;
  indent?: number;
}

export interface ListBlock {
  type: 'list';
  items: string[];
  ordered?: boolean; // false = bullet list, true = numbered list
  indent?: number;
}

export interface QuoteBlock {
  type: 'quote';
  content: string;
  author?: string;
  indent?: number;
}

export interface MetricsBlock {
  type: 'metrics';
  title?: string;
  metrics: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
  indent?: number;
}

export interface CustomBlock {
  type: 'custom';
  component: ReactNode;
  indent?: number;
}

export interface WorkflowBlock {
  type: 'workflow';
  src: string;
  alt: string;
  caption?: string;
  title?: string;
  indent?: number;
}

// Union type for all content blocks
export type ContentBlock = 
  | TextBlock 
  | MathBlock 
  | CodeBlock 
  | ImageBlock 
  | ListBlock 
  | QuoteBlock 
  | MetricsBlock 
  | CustomBlock
  | WorkflowBlock;

// Template-based section structure
export interface TemplateSection {
  id: string;
  title: string;
  blocks: ContentBlock[];
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

// Template-based breakdown structure
export interface TemplateBreakdown {
  metadata: BreakdownMetadata;
  sections: TemplateSection[];
}

// Legacy support - keep existing structure
export interface BreakdownSection {
  id: string;
  title: string;
  content: ReactNode;
}

export interface ProjectBreakdown {
  metadata: BreakdownMetadata;
  sections: BreakdownSection[];
}

export interface BreakdownComponent {
  default: () => ProjectBreakdown | TemplateBreakdown;
}

// Helper types for text formatting
export interface BoldText {
  type: 'bold';
  content: string;
}

export interface LinkText {
  type: 'link';
  url: string;
  name: string;
}

export type TextContent = string | BoldText | LinkText | (string | BoldText | LinkText)[];