import { useEffect, useRef, useState } from "react"

interface AnimatedPathsBackgroundProps {
  className?: string
  pathCount?: number
  speed?: number
  opacity?: number
}

export default function AnimatedPathsBackground({
  className,
  pathCount = 32,
  speed = 1,
  opacity = 0.08,
}: AnimatedPathsBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef<number>(0)
  const [mounted, setMounted] = useState(false)

  // Trigger animation from right on mount
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

        const baseOpacity = opacity * (0.5 + i * 0.02)
        const wave = Math.sin(timeRef.current * 1.5 + i * 0.3) * (opacity * 0.3)
        const animatedOpacity = Math.max(opacity * 0.2, Math.min(opacity * 1.5, baseOpacity + wave))
        path.style.strokeOpacity = `${animatedOpacity}`

        // Keep the horizontal animation flowing
        const translateX = Math.sin(timeRef.current * flowSpeed + i) * 20
        path.setAttribute("transform", `translate(${translateX}, 0)`)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    setMounted(true)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [speed, opacity])

    const generatePaths = () => {
    const paths = []

    for (let i = 0; i < pathCount; i++) {
        // Spread out X and Y more to fill ~60% of screen width/height
        const xOffset = i * 50 // Increased from 25–35 range
        const yOffset = i * 18 // Increased from 10–12 range

        const baseX = 300 + xOffset
        const baseY = 150 + yOffset
        const controlX = 600 + xOffset
        const controlY = 300 + yOffset
        const endX = 900 + xOffset
        const endY = 250 + yOffset
        const finalX = 1300 + xOffset
        const finalY = 400 + yOffset

        const d = `M${baseX} ${baseY}Q${controlX} ${controlY} ${endX} ${endY}T${finalX} ${finalY}`
        const strokeWidth = 0.8 + i * 0.02
        const pathLength = 1000 + i * 50

        paths.push(
        <path
            key={`path-${i}`}
            d={d}
            stroke="url(#pathGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${pathLength * 0.3} ${pathLength * 0.7}`}
            className={`transition-all duration-[1500ms] ease-out ${
            mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            }`}
            style={{
            strokeLinecap: "round",
            strokeLinejoin: "round",
            }}
        />
        )
    }

    return paths
    }


  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 2000 1200"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.38" />
            <stop offset="50%" stopColor="#C7D2FE" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.38" />
          </linearGradient>
        </defs>
        {generatePaths()}
      </svg>
    </div>
  )
}
