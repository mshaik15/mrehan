interface TechTagProps {
  tech: string
}

export default function TechTag({ tech }: TechTagProps) {
  return (
    <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-xs lg:text-sm font-medium bg-theme-accent-primary/30 text-theme-accent-primary hover:bg-theme-accent-primary/40 transition-colors whitespace-nowrap">
      {tech}
    </span>
  )
}