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
            type="work"
            companyUrl={work.companyUrl}
          ></DropdownCard>
        ))}
      </div>
    </section>
  )
}