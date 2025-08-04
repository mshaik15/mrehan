interface TechTagProps {
  tech: string
}

export default function TechTag({ tech }: TechTagProps) {
  return (
    <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-xs lg:text-sm font-medium bg-theme-accent-primary/30 text-theme-accent-primary hover:bg-theme-accent-primary/40 hover:shadow-[0_0_8px_rgba(107,207,246,0.4)] transition-all duration-300 whitespace-nowrap shadow-[0_0_4px_rgba(107,207,246,0.2)]">
      {tech}
    </span>
  )
}