import { useEffect, useRef } from "react"

interface AnimatedPathsBackgroundProps {
  className?: string
  pathCount?: number
  speed?: number
  opacity?: number
}

export default function AnimatedPathsBackground({
  className,
  pathCount = 24,
  speed = 1,
  opacity = 0.04,
}: AnimatedPathsBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll('path')

    const animate = () => {
      timeRef.current += speed * 0.01 // Reduced speed

      paths.forEach((path, i) => {
        const pathLength = path.getTotalLength()
        const flowSpeed = 0.01 + i * 0.002 // Slower flow
        const offset = (timeRef.current * flowSpeed * pathLength) % pathLength
        path.style.strokeDashoffset = `${offset}`

        // Adjusted opacity for subtle visibility
        const baseOpacity = opacity + i * 0.004
        const wave = Math.sin(timeRef.current * 1.5 + i * 0.3) * 0.03
        const animatedOpacity = Math.max(0.02, Math.min(0.1, baseOpacity + wave))
        path.style.strokeOpacity = `${animatedOpacity}`

        const translateX = Math.sin(timeRef.current * flowSpeed + i) * 20
        path.setAttribute("transform", `translate(${translateX}, 0)`)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [speed, opacity])

  const generatePaths = () => {
    const paths = []

    for (let i = 0; i < pathCount; i++) {
      const baseX = 100 + i * 25
      const baseY = 50 + i * 8
      const controlX = 300 + i * 20
      const controlY = 150 + i * 12
      const endX = 500 + i * 25
      const endY = 100 + i * 10
      const finalX = 800 + i * 30
      const finalY = 200 + i * 15

      const d = `M${baseX} ${baseY}Q${controlX} ${controlY} ${endX} ${endY}T${finalX} ${finalY}`
      const strokeWidth = 0.8 + i * 0.03 // Slightly thicker
      const pathLength = 1000 + i * 50

      paths.push(
        <path
          key={`path-${i}`}
          d={d}
          stroke="url(#pathGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${pathLength * 0.3} ${pathLength * 0.7}`}
          style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
        />
      )
    }

    return paths
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.06" />  {/* Indigo-600 */}
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.08" /> {/* Indigo-500 */}
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.06" /> {/* Blue-500 */}
          </linearGradient>
        </defs>
        {generatePaths()}
      </svg>
    </div>
  )
}
