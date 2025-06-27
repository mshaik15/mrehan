import type { ProjectBreakdown } from '../types/breakdown';
import { BlockMath_ } from '../components/Math';

const aiTutorBreakdown = (): ProjectBreakdown => ({
  metadata: {
    title: 'AI Tutor',
    subtitle: 'Personalized learning assistant with adaptive questioning and progress tracking',
    projectType: 'Academic Project',
    year: '2024',
    timeline: '4 months · Sep-Dec 2024',
    tools: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL'],
    team: 'Team of 3',
    role: 'ML Engineer & Backend Developer',
    status: 'Completed',
    githubUrl: 'https://github.com/yourusername/ai-tutor',
    liveUrl: 'https://ai-tutor-demo.vercel.app',
    previewImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'
  },
  
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            AI Tutor is an intelligent learning platform that adapts to each student's learning pace and style. 
            Using machine learning algorithms, it provides personalized question sequences and tracks learning progress.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The system analyzes student responses to optimize the difficulty curve and identify knowledge gaps, 
            creating a truly personalized learning experience.
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
            Traditional learning platforms use a one-size-fits-all approach that doesn't account for individual 
            learning differences. Students often get stuck on concepts or move too quickly through material they haven't mastered.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Our goal was to create an adaptive system that could identify knowledge gaps and adjust content difficulty in real-time.
          </p>
          <BlockMath_>
            {`\\text{Learning Efficiency} = \\frac{\\text{Knowledge Gained}}{\\text{Time Spent} \\times \\text{Cognitive Load}}`}
          </BlockMath_>
        </div>
      )
    },
    
    {
      id: 'technical',
      title: 'Technical Implementation',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The core of the system is a recommendation engine built with TensorFlow that analyzes student performance patterns 
            and predicts optimal next questions. The backend uses FastAPI for real-time data processing.
          </p>
          
          <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto relative">
            <div className="absolute top-0 right-0 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded-bl">
              Python
            </div>
            <pre className="text-sm text-gray-100">
              <code>{`class AdaptiveLearningEngine:
    def __init__(self, student_model, question_bank):
        self.student_model = student_model
        self.question_bank = question_bank
        
    def recommend_next_question(self, student_id, performance_history):
        # Predict student's current knowledge state
        knowledge_state = self.student_model.predict_knowledge(
            student_id, performance_history
        )
        
        # Find optimal difficulty level
        optimal_difficulty = self.calculate_zone_of_proximal_development(
            knowledge_state
        )
        
        # Select question with appropriate difficulty
        return self.question_bank.get_question_by_difficulty(
            optimal_difficulty, knowledge_state.weak_areas
        )`}</code>
            </pre>
          </div>
          
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The difficulty adjustment follows Vygotsky's Zone of Proximal Development theory:
          </p>
          <BlockMath_>
            {`\\text{Optimal Difficulty} = \\text{Current Ability} + \\epsilon \\cdot \\text{Learning Rate}`}
          </BlockMath_>
        </div>
      )
    },
    
    {
      id: 'architecture',
      title: 'System Architecture',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The system uses a microservices architecture with separate services for user management, 
            content delivery, ML inference, and analytics. Real-time updates are handled through WebSocket connections.
          </p>
          
          <div className="border border-gray-700/50 rounded-lg p-6 bg-gray-800/30">
            <div className="text-center space-y-4">
              <p className="text-gray-400 text-sm">System Architecture</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div className="border border-gray-600/50 p-3 rounded">
                  <strong>Frontend</strong><br/>
                  React, WebSocket
                </div>
                <div className="border border-gray-600/50 p-3 rounded">
                  <strong>API Layer</strong><br/>
                  FastAPI, Authentication
                </div>
                <div className="border border-gray-600/50 p-3 rounded">
                  <strong>ML Service</strong><br/>
                  TensorFlow, Inference
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    {
      id: 'challenges',
      title: 'Challenges & Solutions',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Challenge 1: Cold Start Problem</h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              New users have no performance history, making personalization difficult. We solved this by implementing 
              a brief assessment quiz and using collaborative filtering to match new users with similar learning patterns.
            </p>
            
            <h3 className="text-xl font-semibold text-white">Challenge 2: Real-time ML Inference</h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Running ML models for each question recommendation was too slow. We implemented model caching and 
              pre-computed recommendations for common learning paths.
            </p>
            
            <BlockMath_>
              {`\\text{Response Time} = \\text{Model Inference} + \\text{Database Query} + \\text{Network Latency}`}
            </BlockMath_>
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
            This project deepened my understanding of both machine learning in production and educational technology. 
            I learned how to balance model complexity with real-time performance requirements.
          </p>
          
          <ul className="space-y-2 text-gray-300 text-base sm:text-lg">
            <li>• Production ML pipeline design and optimization</li>
            <li>• Educational psychology principles in software design</li>
            <li>• Real-time system architecture and WebSocket implementation</li>
            <li>• A/B testing for ML model performance</li>
            <li>• Data privacy considerations in educational applications</li>
          </ul>
        </div>
      )
    },
    
    {
      id: 'conclusion',
      title: 'Results & Impact',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The AI Tutor showed significant improvements in learning outcomes. Students using the adaptive system 
            completed lessons 23% faster while maintaining higher comprehension scores compared to traditional methods.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The project won first place in our university's AI competition and is being considered for 
            implementation in the computer science curriculum.
          </p>
          <BlockMath_>
            {`\\text{Learning Improvement} = \\frac{\\text{Adaptive Score} - \\text{Traditional Score}}{\\text{Traditional Score}} = 23\\%`}
          </BlockMath_>
        </div>
      )
    }
  ]
});

export default aiTutorBreakdown;