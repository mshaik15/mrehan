import { Link } from "react-router-dom"
import { Github, Linkedin } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="text-center py-12 sm:py-16 lg:py-20 xl:py-24 -mb-12">
      <Link to="/video" className="inline-block group">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300 cursor-pointer">
          Mohammed Rehan
        </h1>
      </Link>
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-400 mb-3 sm:mb-4 lg:mb-6 font-light px-4">
        Mechatronics Engineering @ the University of Waterloo
      </h2>
      <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-4 leading-relaxed">
        Backend & LLM Eng @ Skrimp. Building AI for budgeting.
      </p>
      
      {/* Nav */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto gap-4 sm:gap-0 px-4">
        <Link 
          to="/work" 
          className="text-sm sm:text-base lg:text-lg text-gray-400 hover:text-white transition-colors order-2 sm:order-1"
        >
          Resume
        </Link>
        
        <div className="flex items-center gap-4 sm:gap-6 order-1 sm:order-2">
          <a 
            href="https://github.com/mshaik15" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          </a>
          <a 
            href="https://www.linkedin.com/in/mrs15/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          </a>
        </div>
      </div>
    </section>
  )
}