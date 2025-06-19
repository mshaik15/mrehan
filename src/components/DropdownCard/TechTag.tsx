interface TechTagProps {
  tech: string
}

export default function TechTag({ tech }: TechTagProps) {
  return (
    <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm lg:text-base font-medium bg-blue-900/30 text-blue-300 hover:bg-blue-900/40 transition-colors whitespace-nowrap">
      {tech}
    </span>
  )
}
