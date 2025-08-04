import HeroSection from "../components/Hero"
import ProjectsSection from "../components/Projects"

export default function Home() {
  return (
    <div className="min-h-screen bg-theme-bg-primary text-theme-text-primary relative">
      <div className="relative z-10 max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <HeroSection />
        <ProjectsSection />
      </div>
    </div>
  )
}