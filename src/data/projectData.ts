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
  },

  {
    company: 'TsDev',
    role: 'Developer',
    year: '2025',
    location: 'Remote',
    description: 'Python library for transforming time-series data into geometric embeddings using derivatives and curvature for vector analysis.',
    tech: ['Python', 'NumPy', 'SciPy', 'Matplotlib', 'Mathematical Modeling'],
    icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=40&h=40&fit=crop',
    hasBreakdown: true,
    slug: 'tsdev',
    // Removed unrelated tech like Pinecone, Prisma, Stripe API, Tailwind CSS
    // Added more relevant tech for a mathematical/geometric Python library
  },

  {
    company: 'UW GO',
    role: 'Personal Project',
    year: '2025',
    location: 'Waterloo, Ontario',
    description: 'Full stack application for University of Waterloo students to find and share rides.',
    tech: ['React', 'Firebase', 'TailwindCSS', 'TypeScript', 'Next.js'],
    icon: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=40&h=40&fit=crop',
    
    // FIXED: This project has a breakdown file, so it should be enabled
    hasBreakdown: false,
    liveUrl: 'https://uw-go-demo.vercel.app'
  },
  
  {
    company: 'E-commerce Dashboard',
    role: 'Freelance Project',
    year: '2024',
    location: 'Remote',
    description: 'Analytics dashboard for online retailers with real-time sales tracking, inventory management, and customer insights.',
    tech: ['Next.js', 'Chart.js', 'Prisma', 'Stripe API', 'Tailwind CSS'],
    icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=40&h=40&fit=crop',
    
    hasBreakdown: false,
    githubUrl: 'https://github.com/yourusername/ecommerce-dashboard',
    liveUrl: 'https://dashboard-demo.vercel.app'
  },
  
  {
    company: 'Weather Widget',
    role: 'Weekend Project',
    year: '2024',
    location: 'Personal',
    description: 'Simple weather widget for displaying current conditions. Built to practice API integration.',
    tech: ['HTML', 'JavaScript', 'Weather API', 'CSS'],
    icon: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=40&h=40&fit=crop',
    hasBreakdown: false,
  }
]

export default projectData