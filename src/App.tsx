import { DropdownCard, TechTag } from './components/DropdownCard'
import { MapPin } from 'lucide-react'
import workData from './data/workData'
import projectData from './data/projectData'

// Then use exactly like before:
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
