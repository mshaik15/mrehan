export interface ProjectData {
  // Basic info (required for all projects)
  company: string
  type: string
  year: string
  location?: string
  description: string
  tech: string[]
  icon: string
  
  // For projects WITH detailed breakdowns
  slug?: string // Must match filename in /breakdowns/ folder
  hasBreakdown?: boolean // Explicit flag

  githubUrl?: string
  liveUrl?: string
}

const projectData: ProjectData[] = [
  {
    company: 'TsDev',
    type: 'Developer',
    year: '2025',
    location: 'Remote',
    description: 'Discovering Discrete Relationships through Time Series and Vectorized Data Analysis',
    tech: ['PyTorch', 'FAISS', 'NumPy', 'Matplotlib', 'Mathematical Modeling'],
    icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=40&h=40&fit=crop',
    hasBreakdown: true,
    slug: 'tsdev',
  },

  {
    company: 'Neural Networks for Inverse Kinematics',
    type: 'Research Project',
    year: '2025',
    location: 'Personal',
    description: 'Analytical research of using neural networks for Inverse Kinematics',
    tech: ['PyTorch', 'CUDA', 'Matplotlib', 'NumPy', 'Pandas', 'KNN', 'INN'],
    icon: './Logo.svg',
    hasBreakdown: true,
    slug: 'NNIK',
  },
  {
    company: 'Gary',
    type: 'Robotics Project',
    year: '2025',
    location: 'Personal',
    description: 'Open Source Computer Vision-Enabled Coaxial Swerve Drive Robot Inspired by Amazon Hercules',
    tech: ['Tensorflow', 'YOLOv8', 'C++', 'Solidworks', 'OnShape'],
    icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=40&h=40&fit=crop',
    
    hasBreakdown: true,
    slug: 'gary',
  },

  {
    company: 'UW GO',
    type: 'Personal Project',
    year: '2025',
    location: 'Waterloo, Ontario',
    description: 'Full stack application for University of Waterloo students to find and share rides.',
    tech: ['React', 'Firebase', 'TailwindCSS', 'TypeScript', 'Next.js'],
    icon: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=40&h=40&fit=crop',
    hasBreakdown: false,
    liveUrl: 'https://uw-go-demo.vercel.app'
  },
  {
    company: 'SIR Model',
    type: 'Personal Project',
    year: '2024',
    description: 'SIR Model for Simulating Disease Spread',
    tech: ['Python', 'SciPy', 'Matplotlib', 'NumPy', 'Pandas'],
    icon: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=40&h=40&fit=crop',
    hasBreakdown: false,
    githubUrl: 'https://github.com/mshaik15/SIR-Model',
  }
]

export default projectData