import { Link } from "react-router-dom"
import { Github, Linkedin } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="text-center py-8 sm:py-12 lg:py-16 xl:py-20 -mb-8">
      <Link to="/video" className="inline-block group w-full">
        <h1 className="lugrasimo-regular text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300 cursor-pointer tracking-wide px-4">
          Mohammed Rehan
        </h1>
      </Link>
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 mb-4 sm:mb-6 lg:mb-8 font-medium px-4 leading-relaxed">
        Mechatronics Engineering @ the University of Waterloo
      </h2>
      <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-400 max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 px-4 leading-relaxed font-light">
        Backend & LLM Eng @ Skrimp. Building AI for budgeting.
      </p>
      
      {/* Nav */}
      <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4">
        {/* Large screens: Resume on left, icons on right */}
        <div className="hidden sm:flex justify-between items-center">
          <Link 
            to="/work" 
            className="text-base sm:text-lg lg:text-xl text-gray-400 hover:text-white transition-colors"
          >
            Resume
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href="https://github.com/mshaik15" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2"
              aria-label="GitHub Profile"
            >
              <Github className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mrs15/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </a>
          </div>
        </div>

        {/* Small screens: All buttons side by side */}
        <div className="flex sm:hidden items-center justify-center gap-4">
          <Link 
            to="/work" 
            className="text-gray-400 hover:text-white transition-colors p-2 text-base"
            aria-label="Resume"
          >
            Resume
          </Link>
          <a 
            href="https://github.com/mshaik15" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="GitHub Profile"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/mrs15/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  )
}