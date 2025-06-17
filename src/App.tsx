import HeroSection from "./components/Hero"
import WorkSection from "./components/Work"
import ProjectsSection from "./components/Projects"

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <HeroSection />
        <ProjectsSection />
        <WorkSection />
      </div>
    </div>
  )
}

export default App