import DropdownCard from './DropdownCard/DropdownCard'
import TechTag from './DropdownCard/TechTag'
import { MapPin } from 'lucide-react'
import workData from '../data/workData'

export default function WorkSection() {
  return (
    <section className="mb-8 sm:mb-12 lg:mb-16">
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {workData.map((work, index) => (
          <DropdownCard
            key={index}
            title={work.company}
            subtitle={work.role}
            year={work.year}
            icon={work.icon}
          >
            <div className="pt-3 sm:pt-4 lg:pt-5 space-y-3 sm:space-y-4">
              {/* Mobile Screens */}
              <div className="xs:hidden">
                <span className="text-xs text-gray-500">{work.year}</span>
              </div>
              
              <p className="text-xs sm:text-sm lg:text-base text-gray-400 flex items-start sm:items-center gap-1.5 sm:gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 sm:mt-0 flex-shrink-0" />
                <span className="leading-relaxed">{work.location}</span>
              </p>
              
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-300 leading-relaxed">
                {work.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                {work.tech.map((tech, i) => (
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