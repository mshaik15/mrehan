import DropdownCard from './DropdownCard/DropdownCard'
import TechTag from './DropdownCard/TechTag'
import { MapPin } from 'lucide-react'
import projectData from '../data/projectData'

export default function ProjectsSection() {
  return (
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
  )
}