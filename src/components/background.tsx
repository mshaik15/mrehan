// src/components/background.tsx
import { useEffect, useRef, useCallback, useMemo } from "react"

// Fast pattern-based noise functions
function createPatternNoise(pattern: string) {
  // Pre-compute pattern values for performance
  const patternValues = useMemo(() => {
    switch (pattern) {
      case 'ordered':
        return Array.from({ length: 256 }, (_, i) => i / 255)
      case 'reversed':
        return Array.from({ length: 256 }, (_, i) => (255 - i) / 255)
      case 'fibonacci': {
        const fib = [1, 1]
        while (fib.length < 256) {
          fib.push((fib[fib.length - 1] + fib[fib.length - 2]) % 256)
        }
        return fib.map(f => f / 255)
      }
      case 'random':
        return Array.from({ length: 256 }, () => Math.random())
      default:
        return null
    }
  }, [pattern])

  return function(x: number, y: number, time: number): number {
    if (patternValues) {
      // Pattern-based noise
      const index = Math.floor((x * 17 + y * 31 + time * 0.5) % 256)
      const baseValue = patternValues[index]
      // Add slight variation to make it more organic
      const variation = Math.sin(x * 0.1 + time * 0.001) * 0.1
      return baseValue + variation
    } else {
      // Default fast noise
      const seed1 = Math.sin(x * 12.9898 + y * 78.233 + time * 0.001) * 43758.5453
      const seed2 = Math.sin(x * 93.9898 + y * 47.233 + time * 0.0007) * 28364.5128
      return (seed1 - Math.floor(seed1) + seed2 - Math.floor(seed2)) * 0.5
    }
  }
}

interface Particle {
  x: number
  y: number
  size: number
  velocity: { x: number; y: number }
  life: number
  maxLife: number
  opacity: number
}

interface NoiseBackgroundProps {
  particleCount?: number
  noiseIntensity?: number
  particleSize?: { min: number; max: number }
  backgroundColor?: string
  particleColor?: string
  particleOpacity?: number
  speed?: number
  pattern?: 'default' | 'ordered' | 'reversed' | 'fibonacci' | 'random'
  className?: string
}

export default function NoiseBackground({
  particleCount = 400, // Reduced from 800
  noiseIntensity = 0.002,
  particleSize = { min: 0.5, max: 1.0 },
  backgroundColor = "rgb(3, 7, 18)",
  particleColor = "rgb(156, 163, 175)",
  particleOpacity = 0.06, // Reduced opacity
  speed = 0.8, // Slightly slower
  pattern = 'default',
  className,
}: NoiseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const lastTimeRef = useRef<number>(0)
  const isResizingRef = useRef<boolean>(false)

  // Parse RGB values once and create noise function
  const particleRGB = particleColor.match(/\d+/g)?.map(Number) || [156, 163, 175]
  const noiseFunction = useMemo(() => createPatternNoise(pattern), [pattern])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const container = canvas.parentElement
    if (!container) return

    const { clientWidth, clientHeight } = container
    
    // Only resize if dimensions actually changed
    if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
      canvas.width = clientWidth
      canvas.height = clientHeight
      
      // Reinitialize particles when canvas resizes
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
        size: Math.random() * (particleSize.max - particleSize.min) + particleSize.min,
        velocity: { x: 0, y: 0 },
        life: Math.random() * 100,
        maxLife: 80 + Math.random() * 40, // Slightly shorter lives
        opacity: 0,
      }))
    }
  }, [particleCount, particleSize.min, particleSize.max])

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d", { alpha: false }) // Disable alpha for performance
    if (!canvas || !ctx) return

    // Throttle to ~60fps max, skip frames if running too fast
    if (currentTime - lastTimeRef.current < 16) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }
    lastTimeRef.current = currentTime

    // Use solid background fill - much faster than gradients
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current
    const time = currentTime * 0.001 // Convert to seconds

    // Batch particle updates
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      
      particle.life += speed
      if (particle.life > particle.maxLife) {
        particle.life = 0
        particle.x = Math.random() * canvas.width
        particle.y = Math.random() * canvas.height
      }

      // Simpler opacity calculation
      const lifeCycle = particle.life / particle.maxLife
      particle.opacity = Math.sin(lifeCycle * Math.PI) * particleOpacity

      // Simplified noise calculation using pattern
      const noise = noiseFunction(
        particle.x * noiseIntensity,
        particle.y * noiseIntensity,
        time
      )

      const angle = noise * Math.PI * 2
      particle.velocity.x = Math.cos(angle) * speed
      particle.velocity.y = Math.sin(angle) * speed

      particle.x += particle.velocity.x
      particle.y += particle.velocity.y

      // Boundary wrapping
      if (particle.x < 0) particle.x = canvas.width
      else if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      else if (particle.y > canvas.height) particle.y = 0
    }

    // Batch rendering - set fill style once then draw all particles
    ctx.fillStyle = `rgba(${particleRGB[0]}, ${particleRGB[1]}, ${particleRGB[2]}, ${particleOpacity})`
    
    // Use a single path for all particles when possible
    ctx.beginPath()
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      if (particle.opacity > 0.01) { // Skip nearly invisible particles
        ctx.moveTo(particle.x + particle.size, particle.y)
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      }
    }
    ctx.fill()

    animationRef.current = requestAnimationFrame(animate)
  }, [backgroundColor, particleRGB, particleOpacity, speed, noiseIntensity])

  useEffect(() => {
    resizeCanvas()
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Throttled resize handler
    let resizeTimeout: number
    const handleResize = () => {
      if (isResizingRef.current) return
      
      isResizingRef.current = true
      clearTimeout(resizeTimeout)
      
      resizeTimeout = setTimeout(() => {
        resizeCanvas()
        isResizingRef.current = false
      }, 100)
    }

    window.addEventListener("resize", handleResize, { passive: true })
    
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(resizeTimeout)
    }
  }, [resizeCanvas, animate, noiseFunction])

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ 
        zIndex: 0,
        willChange: 'auto', // Remove will-change to reduce GPU memory
      }}
    />
  )
}