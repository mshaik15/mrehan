import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import WorkSection from "../components/Work"
import AnimatedPathsBackground from "../components/background"

export default function Work() {
  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      {/* Animated Paths Background */}
      <AnimatedPathsBackground
        pathCount={16}
        speed={3}
        opacity={0.3}
      />

      {/* Content */}
      <div className="relative z-10 max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8 lg:mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 lg:mb-10 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold">
            Work Experience
          </h2>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors border border-gray-700 text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap"
          >
            Resume
          </a>
        </div>

        <WorkSection />
      </div>
    </div>
  )
}
