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
  // COMPLEX PROJECT WITH FULL BREAKDOWN
  {
    company: 'UW GO',
    role: 'Personal Project',
    year: '2025',
    location: 'Waterloo, Ontario',
    description: 'Real-time chat application with AI-powered responses. Features include voice messages, file sharing, and smart replies.',
    tech: ['React', 'Firebase', 'TailwindCSS', 'Typescript', 'Next.js'],
    icon: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=40&h=40&fit=crop',
    
    // This project HAS a breakdown - slug must match /breakdowns/uw-go.tsx
    hasBreakdown: false,
    githubUrl: 'https://github.com/SafwanS143/UW-GO-Frontend',
    liveUrl: 'https://uw-go-demo.vercel.app'
  },
  
  // SIMPLE PROJECT - NO BREAKDOWN
  {
    company: 'Eta',
    role: 'Research Project',
    year: '2025',
    location: 'Personal',
    description: 'Analytical Research of Using Neural Networks for Inverse Kinematics',
    tech: ['PyTorch', 'CUDA', 'Matplotlib', 'NumPy', 'Pandas', 'KNN', 'INN'],
    icon: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=40&h=40&fit=crop',
    hasBreakdown: true,
    slug: 'Eta',
    githubUrl: 'https://github.com/yourusername/todo-app'
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