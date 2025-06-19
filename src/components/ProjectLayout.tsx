import { useEffect, useState } from 'react';
import { Clock, Users, Brain, Target, Github, ExternalLink } from 'lucide-react';

const ProjectLayout = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'problem', title: 'Problem & Motivation' },
    { id: 'technical', title: 'Technical Details' },
    { id: 'architecture', title: 'Architecture / Infra' },
    { id: 'challenges', title: 'Challenges & Solutions' },
    { id: 'learned', title: 'What I Learned' },
    { id: 'conclusion', title: 'Conclusion / Impact' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CodeBlock = ({ language, code }: { language: string; code: string }) => (
    <div className="relative">
      <div className="absolute top-0 right-0 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded-bl">
        {language}
      </div>
      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      
      {/* Hero Section */}
      <section className="pt-16 pb-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <div className="space-y-2">
            <span className="text-blue-400 font-medium">Project Showcase</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
              UW GO
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
              Real-time chat application with AI-powered responses and seamless voice integration
            </p>
            <div className="pt-2">
              <span className="text-gray-400 font-medium">Personal Project · 2025</span>
            </div>
          </div>
          
          <div className="mt-8 lg:mt-0">
            <div className="border border-gray-700/50 rounded-lg overflow-hidden bg-gray-800/50">
              <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="text-center p-6">
                  <p className="text-gray-400 mb-3">Project Preview</p>
                  <p className="text-sm text-gray-500">
                    Replace this with your project screenshot, demo, or code preview
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metadata Section */}
      <div className="mt-12 lg:mt-16">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-gray-700/50 pt-8">
          <div className="flex gap-4">
            <div className="mt-1">
              <Clock size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">Timeline</h3>
              <p className="mt-1">3 months · Jan-Mar 2025</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <div className="w-5 h-5 bg-blue-400 rounded" />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">Tools & Technologies</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded text-sm">React</span>
                <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded text-sm">Firebase</span>
                <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded text-sm">TailwindCSS</span>
                <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded text-sm">TypeScript</span>
                <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded text-sm">Next.js</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <Users size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">Team</h3>
              <div className="mt-1">
                <span className="text-blue-400">Solo Project</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <Brain size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">My Role</h3>
              <p className="mt-1">Full-Stack Developer & Designer</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <Target size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">Status</h3>
              <p className="mt-1">In Development</p>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content with TOC */}
      <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-4 lg:gap-8">
        
        {/* Table of Contents */}
        {!isMobile && (
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <nav className="pr-8">
                <h2 className="text-sm uppercase tracking-wider text-gray-400 font-medium mb-4">
                  Table of Contents
                </h2>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left w-full py-1 border-l-2 pl-3 transition-colors ${
                          activeSection === section.id
                            ? 'border-blue-400 text-blue-400'
                            : 'border-gray-700/50 text-gray-400 hover:text-gray-300 hover:border-gray-600'
                        }`}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="lg:col-span-3">
          <article className="prose prose-lg prose-invert max-w-none">
            
            <section id="overview">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Overview</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                UW GO is a real-time chat application designed specifically for University of Waterloo students. 
                The platform integrates AI-powered responses with seamless voice messaging, creating an intuitive 
                communication experience for campus life.
              </p>
            </section>

            <section id="problem" className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Problem & Motivation</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                University students needed a more efficient way to communicate about campus events, study groups, 
                and academic resources. Existing platforms were either too generic or lacked the specific features 
                that would benefit university life.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                This project aims to bridge that gap by providing AI assistance for common university queries 
                while maintaining the social aspect of peer-to-peer communication.
              </p>
            </section>

            <section id="technical" className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Technical Details</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                The application is built using React and Next.js for the frontend, with Firebase handling 
                real-time data synchronization and user authentication. TypeScript ensures type safety 
                throughout the codebase.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">Here's a sample of the real-time message handling:</p>
              <CodeBlock 
                language="typescript" 
                code={`interface Message {
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
};`} 
              />
            </section>

            <section id="architecture" className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Architecture / Infrastructure</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                The application follows a modern serverless architecture pattern. The frontend is deployed on Vercel, 
                while Firebase handles authentication, real-time database, and cloud functions for AI processing.
              </p>
              <div className="border border-gray-700/50 rounded-lg p-6 bg-gray-800/30 my-6">
                <p className="text-center text-gray-400">
                  [Architecture Diagram - Frontend (Next.js) → Firebase (Auth, Firestore, Functions) → AI Services]
                </p>
              </div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Cloud Functions handle AI response generation and voice message processing, ensuring scalability 
                and keeping sensitive API keys secure on the backend.
              </p>
            </section>

            <section id="challenges" className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Challenges & Solutions</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                Building a real-time chat application presented several technical challenges that required 
                creative solutions and careful architecture decisions.
              </p>
              <h3 className="text-xl font-semibold text-white mb-3">Challenge 1: Real-time Performance</h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                Managing real-time updates without overwhelming the client or Firebase quota. Solved by implementing 
                message pagination, connection pooling, and efficient listener management.
              </p>
              <h3 className="text-xl font-semibold text-white mb-3">Challenge 2: AI Response Integration</h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Seamlessly integrating AI responses without disrupting the natural flow of conversation. 
                Implemented contextual triggers and response caching for better user experience.
              </p>
            </section>

            <section id="learned" className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">What I Learned</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
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
            </section>

            <section id="conclusion" className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Conclusion / Impact</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                UW GO successfully demonstrates the potential of AI-enhanced communication tools for university 
                environments. The project showcases modern web development practices while solving real user needs.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                Currently in beta testing with a small group of UW students, with plans to expand features 
                based on user feedback and scale to other universities.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600 rounded-md transition-colors">
                  <Github size={18} />
                  GitHub Repository
                </a>
                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600 rounded-md transition-colors">
                  <ExternalLink size={18} />
                  Live Demo
                </a>
                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600 rounded-md transition-colors">
                  <div className="w-[18px] h-[18px]" />
                  Case Study
                </a>
              </div>
            </section>

          </article>
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;