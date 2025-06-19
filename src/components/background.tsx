import React, { useEffect, useState } from "react"

export default function NebulaBackground() {
  const [stars, setStars] = useState<JSX.Element[]>([])

  // Generate some faint, slow "shooting stars"
  useEffect(() => {
    const count = 3
    const newStars: JSX.Element[] = []

    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 30
      const duration = 5 + Math.random() * 5
      const top = Math.random() * 80
      const left = Math.random() * 100

      newStars.push(
        <div
          key={i}
          className="absolute w-[2px] h-[80px] bg-white opacity-10 blur-sm"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animation: `shoot ${duration}s linear ${delay}s infinite`,
            transform: "rotate(45deg)",
          }}
        />
      )
    }

    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden bg-black">
      <svg className="w-full h-full absolute" preserveAspectRatio="none">
        <defs>
          <radialGradient id="glow1" cx="30%" cy="40%" r="80%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="glow2" cx="70%" cy="60%" r="90%">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="glow3" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.03" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#glow1)" />
        <rect width="100%" height="100%" fill="url(#glow2)" />
        <rect width="100%" height="100%" fill="url(#glow3)" />
      </svg>

      {/* Slow drifting shooting stars */}
      {stars}
    </div>
  )
}
