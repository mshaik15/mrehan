import { Link } from "react-router-dom"
import { Github, Linkedin } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="text-center py-16 mb-16 border-b border-gray-800">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Mohammed Rehan
      </h1>
      <h2 className="text-xl md:text-2xl text-gray-400 mb-4 font-light">
        Mechatronics @ the University of Waterloo
      </h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
        Prev. Growth Eng @ Ramp. Building AI for engineers.
      </p>
      
      {/* Navigation section */}
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        <Link 
          to="/work" 
          className="text-gray-400 hover:text-white transition-colors underline decoration-dotted underline-offset-4"
        >
          Resume
        </Link>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}