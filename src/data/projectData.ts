// src/data/projectData.ts
export interface ProjectData {
  // Basic info (required for all projects)
  company: string
  role: string
  year: string
  location: string
  description: string
  tech: string[]
  icon: string
  
  // Optional: For projects WITH detailed breakdowns
  slug?: string // If missing, no breakdown page
  hasBreakdown?: boolean // Explicit flag
  
  // Optional: Links that work for simple projects too
  githubUrl?: string
  liveUrl?: string
  
  // Optional: Detailed breakdown data (only for complex projects)
  subtitle?: string
  status?: string
  timeline?: string
  team?: string
  myRole?: string
  caseStudyUrl?: string
  
  // Detailed content sections (optional)
  overview?: string
  problem?: string[]
  technicalDetails?: {
    description: string
    codeExample?: {
      language: string
      code: string
    }
  }
  architecture?: {
    description: string
    diagrams?: string[]
  }
  challenges?: Array<{
    title: string
    description: string
  }>
  learnings?: string[]
  conclusion?: {
    description: string
    impact?: string
  }
  
  // Visual content
  images?: Array<{
    url: string
    alt: string
    caption?: string
  }>
}

const projectData: ProjectData[] = [
  // COMPLEX PROJECT WITH FULL BREAKDOWN
  {
    company: 'UW GO',
    role: 'Personal Project',
    year: '2025',
    location: 'Waterloo, Ontario',
    description: 'Real-time chat application with AI-powered responses. Features include voice messages, file sharing, and smart replies.',
    tech: ['React', 'Firebase', 'TailwindCSS', 'Typescript', 'Next.js'],
    icon: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=40&h=40&fit=crop',
    
    // This project HAS a breakdown
    hasBreakdown: true,
    slug: 'uw-go',
    subtitle: 'Real-time chat application with AI-powered responses and seamless voice integration',
    status: 'In Development',
    timeline: '3 months · Jan-Mar 2025',
    team: 'Solo Project',
    myRole: 'Full-Stack Developer & Designer',
    githubUrl: 'https://github.com/yourusername/uw-go',
    liveUrl: 'https://uw-go-demo.vercel.app',
    
    // Full breakdown content...
    overview: `UW GO is a real-time chat application designed specifically for University of Waterloo students...`,
    problem: [`University students needed a more efficient way to communicate...`],
    // ... rest of detailed content
  },
  
  // SIMPLE PROJECT - NO BREAKDOWN
  {
    company: 'Todo List App',
    role: 'Learning Project',
    year: '2024',
    location: 'Personal',
    description: 'A clean, responsive todo list built with React. Features drag-and-drop, local storage, and dark mode.',
    tech: ['React', 'CSS3', 'LocalStorage'],
    icon: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=40&h=40&fit=crop',
    
    // This project does NOT have a breakdown
    hasBreakdown: false,
    githubUrl: 'https://github.com/yourusername/todo-app',
    liveUrl: 'https://my-todo-app.vercel.app'
    // No slug, no detailed breakdown content
  },
  
  // MEDIUM PROJECT - BREAKDOWN LATER
  {
    company: 'E-commerce Dashboard',
    role: 'Freelance Project',
    year: '2024',
    location: 'Remote',
    description: 'Analytics dashboard for online retailers with real-time sales tracking, inventory management, and customer insights.',
    tech: ['Next.js', 'Chart.js', 'Prisma', 'Stripe API', 'Tailwind CSS'],
    icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=40&h=40&fit=crop',
    
    // You can add breakdown later by adding hasBreakdown: true and slug
    hasBreakdown: false,
    githubUrl: 'https://github.com/yourusername/ecommerce-dashboard',
    liveUrl: 'https://dashboard-demo.vercel.app'
  },
  
  // SIMPLE PROJECT - JUST GITHUB
  {
    company: 'Weather Widget',
    role: 'Weekend Project',
    year: '2024',
    location: 'Personal',
    description: 'Simple weather widget for displaying current conditions. Built to practice API integration.',
    tech: ['HTML', 'JavaScript', 'Weather API', 'CSS'],
    icon: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=40&h=40&fit=crop',
    
    hasBreakdown: false,
    githubUrl: 'https://github.com/yourusername/weather-widget'
    // No live URL for this one
  }
]

export default projectData