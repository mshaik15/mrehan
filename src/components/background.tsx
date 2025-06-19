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
  opacity = 0.08, // Increased default opacity
}: AnimatedPathsBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll('path')

    const animate = () => {
      timeRef.current += speed * 0.01

      paths.forEach((path, i) => {
        const pathLength = path.getTotalLength()
        const flowSpeed = 0.01 + i * 0.002
        const offset = (timeRef.current * flowSpeed * pathLength) % pathLength
        path.style.strokeDashoffset = `${offset}`

        // Use the opacity prop more effectively
        const baseOpacity = opacity * (0.5 + i * 0.02) // Scale with the opacity prop
        const wave = Math.sin(timeRef.current * 1.5 + i * 0.3) * (opacity * 0.3)
        const animatedOpacity = Math.max(opacity * 0.2, Math.min(opacity * 1.5, baseOpacity + wave))
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
      const strokeWidth = 0.8 + i * 0.03
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
                <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.38" />  {/* Indigo-300 */}
                <stop offset="50%" stopColor="#C7D2FE" stopOpacity="0.42" /> {/* Indigo-200 */}
                <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.38" /> {/* Blue-300 */}
            </linearGradient>



        </defs>
        {generatePaths()}
      </svg>
    </div>
  )
}