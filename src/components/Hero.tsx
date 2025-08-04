// Replace Hero.tsx with no letter spacing:

import { Link } from "react-router-dom"
import { Github, Linkedin } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="text-center py-4 sm:py-6 lg:py-8 xl:py-10 mb-6 sm:mb-8 lg:mb-10">
      <Link to="/video" className="inline-block group w-full">
        <h1 className="fugaz-one-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 lg:mb-5 bg-gradient-to-r from-theme-text-primary to-theme-text-secondary bg-clip-text text-transparent leading-tight group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300 cursor-pointer tracking-wide px-4">
          Mohammed Rehan Ali
        </h1>
      </Link>
      
      {/* Combined subtitle line */}
      <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-theme-text-secondary mb-3 sm:mb-4 lg:mb-5 font-medium px-4 leading-relaxed">
        Mechatronics Engineering @ the University of Waterloo • Backend & LLM Eng @ Skrimp
      </h2>
      
      
      {/* Nav */}
      <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4">
        {/* Large screens: Resume on left, icons on right */}
        <div className="hidden sm:flex justify-between items-center">
          <Link 
            to="/work" 
            className="text-sm sm:text-base lg:text-lg text-theme-text-muted hover:text-theme-text-primary transition-colors"
          >
            Work
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href="https://github.com/mshaik15" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-theme-text-muted hover:text-theme-text-primary transition-colors p-2"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mrs15/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-theme-text-muted hover:text-theme-text-primary transition-colors p-2"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </a>
          </div>
        </div>

        {/* Small screens: All buttons side by side */}
        <div className="flex sm:hidden items-center justify-center gap-4">
          <Link 
            to="/work" 
            className="text-theme-text-muted hover:text-theme-text-primary transition-colors p-2 text-sm"
            aria-label="Resume"
          >
            Resume
          </Link>
          <a 
            href="https://github.com/mshaik15" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-theme-text-muted hover:text-theme-text-primary transition-colors p-2"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/mrs15/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-theme-text-muted hover:text-theme-text-primary transition-colors p-2"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}