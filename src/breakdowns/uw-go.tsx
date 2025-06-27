import type { ProjectBreakdown } from '../types/breakdown';
import { BlockMath_ } from '../components/Math';

const uwGoBreakdown = (): ProjectBreakdown => ({
  metadata: {
    title: 'UW GO',
    subtitle: 'Real-time chat application with AI-powered responses and seamless voice integration',
    projectType: 'Personal Project',
    year: '2025',
    timeline: '3 months · Jan-Mar 2025',
    tools: ['React', 'Firebase', 'TailwindCSS', 'TypeScript', 'Next.js'],
    team: 'Solo Project',
    role: 'Full-Stack Developer & Designer',
    status: 'In Development',
    githubUrl: 'https://github.com/yourusername/uw-go',
    liveUrl: 'https://uw-go-demo.vercel.app',
    previewImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  },
  
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            UW GO is a real-time chat application designed specifically for University of Waterloo students. 
            The platform integrates AI-powered responses with seamless voice messaging, creating an intuitive 
            communication experience for campus life.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The application leverages modern web technologies to provide real-time communication with 
            intelligent features that understand university-specific context and terminology.
          </p>
        </div>
      )
    },
    
    {
      id: 'problem',
      title: 'Problem & Motivation',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            University students needed a more efficient way to communicate about campus events, study groups, 
            and academic resources. Existing platforms were either too generic or lacked the specific features 
            that would benefit university life.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            This project aims to bridge that gap by providing AI assistance for common university queries 
            while maintaining the social aspect of peer-to-peer communication.
          </p>
          <BlockMath_>
            {`\\text{User Satisfaction} = \\frac{\\text{Features Used} \\times \\text{Response Time}}{\\text{Learning Curve}}`}
          </BlockMath_>
        </div>
      )
    },
    
    {
      id: 'technical',
      title: 'Technical Details',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The application is built using React and Next.js for the frontend, with Firebase handling 
            real-time data synchronization and user authentication. TypeScript ensures type safety 
            throughout the codebase.
          </p>
          
          <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <div className="absolute top-0 right-0 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded-bl">
              TypeScript
            </div>
            <pre className="text-sm text-gray-100">
              <code>{`interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
  type: 'text' | 'voice' | 'ai_response';
}

const useRealTimeMessages = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Message));
      setMessages(newMessages);
    });
  }, [chatId]);
  
  return messages;
};`}</code>
            </pre>
          </div>
          
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The real-time performance follows the equation:
          </p>
          <BlockMath_>
            {`\\text{Latency} = \\text{Network Delay} + \\text{Processing Time} + \\text{Render Time}`}
          </BlockMath_>
        </div>
      )
    },
    
    {
      id: 'architecture',
      title: 'Architecture / Infrastructure',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The application follows a modern serverless architecture pattern. The frontend is deployed on Vercel, 
            while Firebase handles authentication, real-time database, and cloud functions for AI processing.
          </p>
          
          <div className="border border-gray-700/50 rounded-lg p-6 bg-gray-800/30">
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm">System Architecture</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
                <span>Frontend (Next.js)</span>
                <span>→</span>
                <span>Firebase (Auth, Firestore, Functions)</span>
                <span>→</span>
                <span>AI Services</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Cloud Functions handle AI response generation and voice message processing, ensuring scalability 
            and keeping sensitive API keys secure on the backend.
          </p>
        </div>
      )
    },
    
    {
      id: 'challenges',
      title: 'Challenges & Solutions',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Building a real-time chat application presented several technical challenges that required 
            creative solutions and careful architecture decisions.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Challenge 1: Real-time Performance</h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Managing real-time updates without overwhelming the client or Firebase quota. Solved by implementing 
              message pagination, connection pooling, and efficient listener management.
            </p>
            
            <h3 className="text-xl font-semibold text-white">Challenge 2: AI Response Integration</h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Seamlessly integrating AI responses without disrupting the natural flow of conversation. 
              Implemented contextual triggers and response caching for better user experience.
            </p>
          </div>
        </div>
      )
    },
    
    {
      id: 'learned',
      title: 'What I Learned',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            This project significantly expanded my understanding of real-time applications and AI integration. 
            Key learnings included optimizing Firebase queries, managing WebSocket connections, and designing 
            intuitive voice interfaces.
          </p>
          
          <ul className="space-y-2 text-gray-300 text-base sm:text-lg">
            <li>• Advanced Firebase real-time database optimization</li>
            <li>• Voice message recording and processing techniques</li>
            <li>• AI API integration and response caching strategies</li>
            <li>• Mobile-first responsive design principles</li>
            <li>• User experience design for chat interfaces</li>
          </ul>
        </div>
      )
    },
    
    {
      id: 'conclusion',
      title: 'Conclusion / Impact',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            UW GO successfully demonstrates the potential of AI-enhanced communication tools for university 
            environments. The project showcases modern web development practices while solving real user needs.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Currently in beta testing with a small group of UW students, with plans to expand features 
            based on user feedback and scale to other universities.
          </p>
          <BlockMath_>
            {`\\text{Success} = \\text{User Adoption} \\times \\text{Feature Utility} \\times \\text{Performance}`}
          </BlockMath_>
        </div>
      )
    }
  ]
});

export default uwGoBreakdown;