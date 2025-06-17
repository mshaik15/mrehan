import DropdownCard from './DropdownCard/DropdownCard'
import TechTag from './DropdownCard/TechTag'
import { MapPin } from 'lucide-react'
import projectData from '../data/projectData'

export default function ProjectsSection() {
  return (
    <section className="mb-12">
      <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-0">
        Projects
      </h2>
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {projectData.map((project, index) => (
          <DropdownCard
            key={index}
            title={project.company}
            subtitle={project.role}
            year={project.year}
            icon={project.icon}
          >
            <div className="pt-3 sm:pt-4 lg:pt-5 space-y-3 sm:space-y-4">
              {/* Mobile: Show year if hidden in header */}
              <div className="xs:hidden">
                <span className="text-xs text-gray-500">{project.year}</span>
              </div>
              
              <p className="text-xs sm:text-sm lg:text-base text-gray-400 flex items-start sm:items-center gap-1.5 sm:gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 sm:mt-0 flex-shrink-0" />
                <span className="leading-relaxed">{project.location}</span>
              </p>
              
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-300 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                {project.tech.map((tech, i) => (
                  <TechTag key={i} tech={tech} />
                ))}
              </div>
            </div>
          </DropdownCard>
        ))}
      </div>
    </section>
  )
}