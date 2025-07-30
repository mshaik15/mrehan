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
      
      {/* Navigation and Social Links */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12 px-4">
        {/* Resume Link */}
        <Link 
          to="/work" 
          className="group relative"
        >
          <div className="absolute -inset-3 bg-white/10 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative px-6 py-3 bg-gray-900/80 border border-gray-600/50 rounded-xl leading-none flex items-center drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-300 backdrop-blur-sm">
            <span className="text-base sm:text-lg lg:text-xl text-gray-100 group-hover:text-white transition-colors duration-300 font-medium">
              Resume & Experience
            </span>
          </div>
        </Link>
        
        {/* Social Media Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a 
            href="https://github.com/mshaik15" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative text-gray-400 hover:text-white transition-all duration-300 p-3"
            aria-label="GitHub Profile"
          >
            <div className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <Github className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300" />
          </a>
          <a 
            href="https://www.linkedin.com/in/mrs15/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative text-gray-400 hover:text-white transition-all duration-300 p-3"
            aria-label="LinkedIn Profile"
          >
            <div className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <Linkedin className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  )
}