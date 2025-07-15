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
    tech: ['Next.js', 'Python', 'LangGraph', 'Firebase', 'LLMs'],
    icon: './SmartCart_White.png',
    companyUrl: 'https://skrimp.ai'
  },
  {
    company: 'ACE Robotics',
    role: 'Team Lead',
    year: '2022 - 2024',
    location: 'New York, NY',
    description: 'Led development of enterprise-scale web applications using modern React ecosystem. Improved performance by 40%.',
    tech: [],
    icon: './Ace Robotics Logo.svg',
    companyUrl: 'https://stbenedict.wcdsb.ca/student-life/clubs/ace-robotics-team/'
  },
  {
    company: 'Dilast Tool & Die',
    role: 'CNC Machinist',
    year: '2023',
    location: 'Cambridge, Ontario',
    description: 'Built MVP from scratch, handling both frontend and backend development. Scaled to 10k+ active users.',
    tech: [],
    icon: './Dilast logo.png',
    companyUrl: 'https://www.dilast.com/'
  }
]

export default workData