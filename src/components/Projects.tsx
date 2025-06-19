// src/components/Projects.tsx
import DropdownCard from './DropdownCard/DropdownCard'
import TechTag from './DropdownCard/TechTag'
import projectData from '../data/projectData'

export default function ProjectsSection() {
  return (
    <section className="mb-12">
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {projectData.map((project, index) => (
          <DropdownCard
            key={index}
            title={project.company}
            subtitle={`${project.role} | ${project.year}`}
            icon={project.icon}
            type="project"
            hasBreakdown={project.hasBreakdown}
            slug={project.slug}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
          >
            {/* ALL projects show this dropdown content */}
            <div className="pt-3 sm:pt-4 lg:pt-5 space-y-3 sm:space-y-4">
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