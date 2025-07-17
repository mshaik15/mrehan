// src/pages/VideoPage.tsx
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Volume2, VolumeX } from 'lucide-react'

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true
          setIsMuted(true)
          videoRef.current.play().catch(error => {
            console.log('Autoplay failed completely:', error)
          })
        }
      })
    }
  }, [])

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (videoRef.current && videoRef.current.muted) {
      videoRef.current.muted = false
      setIsMuted(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <Link 
        to="/" 
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </Link>

      <button
        onClick={toggleMute}
        className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Video container */}
      <div className="w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          className="max-w-full max-h-full object-contain cursor-pointer"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          controls={false}
          onClick={handleVideoClick}
        >
          <source src="/ScreenRecording_07-17-2025 17-06-33_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <Link 
        to="/" 
        className="absolute inset-0 z-0"
        aria-label="Close video"
        style={{ zIndex: -1 }}
      />
    </div>
  )
}