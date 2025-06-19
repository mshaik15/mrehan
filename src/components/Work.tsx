import DropdownCard from './DropdownCard/DropdownCard'
import workData from '../data/workData'

export default function WorkSection() {
  return (
    <section className="mb-8 sm:mb-12 lg:mb-16">
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {workData.map((work, index) => (
          <DropdownCard
            key={index}
            title={work.company}
            subtitle={`${work.role} | ${work.location} | ${work.year}`}
            icon={work.icon}
            type="work" // This will go to company websites
            companyUrl={
              work.company === 'Skrimp.ai' ? 'https://skrimp.ai' :
              work.company === 'TechCorp' ? 'https://techcorp.com' :
              work.company === 'StartupXYZ' ? 'https://startupxyz.com' :
              undefined // Will use fallback URL construction
            }
          >
            {/* No content - work experience cards don't open */}
          </DropdownCard>
        ))}
      </div>
    </section>
  )
}