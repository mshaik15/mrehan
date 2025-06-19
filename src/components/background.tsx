import { useEffect, useState } from "react"

interface AnimatedPathsBackgroundProps {
  pathCount?: number
  speed?: number
  opacity?: number
}

interface Path {
  id: number
  x: number
  y: number
  angle: number
  speed: number
  length: number
  color: string
}

export default function AnimatedPathsBackground({ 
  pathCount = 15, 
  speed = 3, 
  opacity = 0.3 
}: AnimatedPathsBackgroundProps) {
  const [paths, setPaths] = useState<Path[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Update dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Initialize paths
  useEffect(() => {
    if (dimensions.width === 0) return

    const colors = [
      'rgba(125, 211, 252, 0.15)',
      'rgba(165, 180, 252, 0.12)',
      'rgba(196, 181, 253, 0.10)',
      'rgba(75, 85, 99, 0.20)',
      'rgba(107, 114, 128, 0.15)',
    ]

    const newPaths: Path[] = Array.from({ length: pathCount }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() * 0.3 + 0.2) * speed,
      length: Math.random() * 80 + 40,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))

    setPaths(newPaths)
  }, [pathCount, speed, dimensions])

  // Animate paths
  useEffect(() => {
    if (paths.length === 0) return

    const animationFrame = () => {
      setPaths(prevPaths => 
        prevPaths.map(path => {
          let newX = path.x + Math.cos(path.angle) * path.speed
          let newY = path.y + Math.sin(path.angle) * path.speed
          let newAngle = path.angle

          // Bounce off edges
          if (newX <= 0 || newX >= dimensions.width) {
            newAngle = Math.PI - path.angle
            newX = Math.max(0, Math.min(dimensions.width, newX))
          }
          if (newY <= 0 || newY >= dimensions.height) {
            newAngle = -path.angle
            newY = Math.max(0, Math.min(dimensions.height, newY))
          }

          return {
            ...path,
            x: newX,
            y: newY,
            angle: newAngle
          }
        })
      )
    }

    const interval = setInterval(animationFrame, 16)
    return () => clearInterval(interval)
  }, [paths.length, dimensions])

  if (dimensions.width === 0) return null

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* CSS Animation */}
      <style>{`
        @keyframes shoot {
          0% {
            transform: translateX(-100px) translateY(-100px) rotate(35deg);
            opacity: 0;
          }
          10% {
            opacity: 0.08;
          }
          90% {
            opacity: 0.08;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(calc(100vh + 100px)) rotate(35deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900" />
      
      {/* Animated paths */}
      <svg 
        className="w-full h-full absolute" 
        style={{ opacity }}
        preserveAspectRatio="none"
      >
        <defs>
          {paths.map(path => (
            <linearGradient key={`grad-${path.id}`} id={`gradient-${path.id}`}>
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor={path.color} />
              <stop offset="70%" stopColor={path.color} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          ))}
        </defs>
        
        {paths.map(path => {
          const endX = path.x + Math.cos(path.angle) * path.length
          const endY = path.y + Math.sin(path.angle) * path.length
          
          return (
            <line
              key={path.id}
              x1={path.x}
              y1={path.y}
              x2={endX}
              y2={endY}
              stroke={`url(#gradient-${path.id})`}
              strokeWidth="1"
              strokeLinecap="round"
            />
          )
        })}
      </svg>

      {/* Shooting stars */}
      <div 
        className="absolute w-[1px] h-[60px] bg-white opacity-[0.08] blur-[0.5px]"
        style={{
          top: '20%',
          left: '10%',
          animation: 'shoot 8s linear infinite',
          transform: 'rotate(35deg)',
        }}
      />
      <div 
        className="absolute w-[1px] h-[60px] bg-white opacity-[0.08] blur-[0.5px]"
        style={{
          top: '60%',
          left: '70%',
          animation: 'shoot 10s linear 3s infinite',
          transform: 'rotate(35deg)',
        }}
      />
    </div>
  )
}