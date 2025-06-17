import DropdownCard from './components/DropdownCard/DropdownCard'
import TechTag from './components/DropdownCard/TechTag'
import { MapPin } from 'lucide-react'
import workData from './data/workData'
import projectData from './data/projectData'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
          <p className="text-gray-400">Welcome to my professional portfolio</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Work Experience</h2>
          {workData.map((work, index) => (
            <DropdownCard
              key={index}
              title={work.company}
              subtitle={work.role}
              year={work.year}
              icon={work.icon}
            >
              <div className="pt-4">
                <p className="text-sm text-gray-400 mb-3 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {work.location}
                </p>
                <p className="text-sm text-gray-300 mb-4">{work.description}</p>
                <div className="flex flex-wrap gap-2">
                  {work.tech.map((tech, i) => (
                    <TechTag key={i} tech={tech} />
                  ))}
                </div>
              </div>
            </DropdownCard>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>
          {projectData.map((project, index) => (
            <DropdownCard
              key={index}
              title={project.company}
              subtitle={project.role}
              year={project.year}
              icon={project.icon}
            >
              <div className="pt-4">
                <p className="text-sm text-gray-400 mb-3 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </p>
                <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <TechTag key={i} tech={tech} />
                  ))}
                </div>
              </div>
            </DropdownCard>
          ))}
        </section>
      </div>
    </div>
  )
}

export default App