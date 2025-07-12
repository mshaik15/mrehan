export interface ProjectData {
  // Basic info (required for all projects)
  company: string
  role: string
  year: string
  location: string
  description: string
  tech: string[]
  icon: string
  
  // For projects WITH detailed breakdowns
  slug?: string // Must match filename in /breakdowns/ folder
  hasBreakdown?: boolean // Explicit flag
  
  // Optional: Links that work for simple projects too
  githubUrl?: string
  liveUrl?: string
}

const projectData: ProjectData[] = [
  {
    company: 'Neural Networks for Inverse Kinematics',
    role: 'Research Project',
    year: '2025',
    location: 'Personal',
    description: 'Analytical research of using neural networks for Inverse Kinematics',
    tech: ['PyTorch', 'CUDA', 'Matplotlib', 'NumPy', 'Pandas', 'KNN', 'INN'],
    icon: './Logo.svg',
    hasBreakdown: true,
    slug: 'NNIK',
    githubUrl: 'https://github.com/yourusername/todo-app'
  },

  {
    company: 'Delstra',
    role: 'Developer',
    year: '2025',
    location: 'Remote',
    description: 'Python library for transforming time-series data into geometric embeddings using derivatives and curvature for vector analysis.',
    tech: ['NumPy', 'Pinecone', 'Prisma', 'Stripe API', 'Tailwind CSS'],
    icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=40&h=40&fit=crop',
    
    // You can add breakdown later by adding hasBreakdown: true and slug
    hasBreakdown: false,
    githubUrl: 'https://github.com/yourusername/ecommerce-dashboard',
    liveUrl: 'https://dashboard-demo.vercel.app'
  },

  {
    company: 'UW GO',
    role: 'Personal Project',
    year: '2025',
    location: 'Waterloo, Ontario',
    description: 'Full stack application for University of Waterloo students to find and share rides.',
    tech: ['React', 'Firebase', 'TailwindCSS', 'Typescript', 'Next.js'],
    icon: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=40&h=40&fit=crop',
    
    // This project HAS a breakdown - slug must match /breakdowns/uw-go.tsx
    hasBreakdown: false,
    githubUrl: 'https://github.com/SafwanS143/UW-GO-Frontend',
    liveUrl: 'https://uw-go-demo.vercel.app'
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