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

  const pathDataRef = useRef<Array<{
    path: SVGPathElement | null
    yBase: number
    waveLength: number
    horizontalStart: number
    segments: number
    waveHeight: number
  }>>([])

  useEffect(() => {
    const animate = () => {
      timeRef.current += speed * 0.02
      const t = timeRef.current

      if (pathDataRef.current) {
        for (let i = 0; i < pathDataRef.current.length; i++) {
          const {
            path,
            yBase,
            waveLength,
            horizontalStart,
            segments,
            waveHeight,
          } = pathDataRef.current[i]
          if (!path) continue

          let d = `M${horizontalStart} ${yBase}`
          for (let j = 0; j < segments; j++) {
            const x1 = j * waveLength
            const x2 = x1 + waveLength / 2
            const x3 = x1 + waveLength

            const wavePhase = t * 1.5 + i * 0.3 + j * 0.5
            const yControl = yBase + Math.sin(wavePhase) * waveHeight

            d += ` Q${x2 + horizontalStart} ${yControl} ${x3 + horizontalStart} ${yBase}`
          }

          path.setAttribute("d", d)

          const baseOpacity = opacity * (0.5 + i * 0.02)
          const waveOpacity = Math.sin(t * 1.5 + i * 0.3) * (opacity * 0.3)
          const animatedOpacity = Math.max(
            opacity * 0.2,
            Math.min(opacity * 1.5, baseOpacity + waveOpacity)
          )
          path.style.strokeOpacity = `${animatedOpacity}`
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    setMounted(true)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [speed, opacity])

  const generatePaths = () => {
    const paths: JSX.Element[] = []
    const newPathData: typeof pathDataRef.current = []

    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 2000
    const buffer = 800
    const totalWidth = screenWidth + buffer * 2

    for (let i = 0; i < pathCount; i++) {
      const waveHeight = 20 + i * 1.5
      const waveLength = 140 + (i % 3) * 10
      const segments = Math.ceil(totalWidth / waveLength)
      const verticalSpread = 1000
      const yBase = 100 + (i / pathCount) * verticalSpread
      const horizontalStart = -buffer + (i % 5) * 80

      const strokeWidth = 1.2 + i * 0.04
      const pathLength = 800 + i * 40

      newPathData.push({
        path: null,
        yBase,
        waveLength,
        horizontalStart,
        segments,
        waveHeight,
      })

      paths.push(
        <path
          key={`wave-path-${i}`}
          d="M0 0 Q1 1 2 2"
          stroke="url(#pathGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${pathLength * 0.4} ${pathLength * 0.6}`}
          className={`transition-all duration-[1500ms] ease-out ${
            mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
          style={{
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          ref={(el) => {
            if (el) newPathData[i].path = el
          }}
        />
      )
    }

    pathDataRef.current = newPathData
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
