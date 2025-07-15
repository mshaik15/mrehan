// Add this interface at the top of your workData.ts file
interface WorkData {
  company: string
  role: string
  year: string
  location: string
  description: string
  tech: string[]
  icon: string
  companyUrl?: string // Optional company URL
}

const workData: WorkData[] = [
  {
    company: 'Skrimp.ai',
    role: 'Engineering, API & AI Agents',
    year: 'Present',
    location: 'Waterloo, ON',
    description: 'Productizing real-time multimodal intelligence. Launched ink-whisper platform for seamless voice and text integration.',
    tech: ['Next.js', 'Python', 'LangGraph', 'MongoDB', 'LLMs'],
    icon: './SmartCart_White.png',
    companyUrl: 'https://skrimp.ai'
  },
  {
    company: 'ACE Robotics',
    role: 'Team Lead',
    year: '2022 - 2024',
    location: 'New York, NY',
    description: 'Led development of enterprise-scale web applications using modern React ecosystem. Improved performance by 40%.',
    tech: ['React', 'TypeScript', 'GraphQL', 'AWS', 'Docker'],
    icon: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop',
    companyUrl: 'https://techcorp.com'
  },
  {
    company: 'Dilast Tool & Die',
    role: 'CNC Machinist',
    year: '2023',
    location: 'Cambridge, Ontario',
    description: 'Built MVP from scratch, handling both frontend and backend development. Scaled to 10k+ active users.',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL', 'Redis', 'Kubernetes'],
    icon: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=40&h=40&fit=crop',
    companyUrl: 'https://startupxyz.com'
  }
]

export default workData