interface TechTagProps {
  tech: string
}

export default function TechTag({ tech }: TechTagProps) {
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300">
      {tech}
    </span>
  )
}
