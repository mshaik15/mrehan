import HeroSection from "../components/Hero"
import ProjectsSection from "../components/Projects"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <HeroSection />
        <ProjectsSection />
      </div>
    </div>
  )
}