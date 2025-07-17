// src/pages/VideoPage.tsx
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Volume2, VolumeX } from 'lucide-react'

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    // Try to auto-play with sound first
    if (videoRef.current) {
      // First try unmuted autoplay
      videoRef.current.muted = false
      videoRef.current.play().catch(() => {
        // If unmuted autoplay fails, fallback to muted autoplay
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
    // If video is muted, unmute it when clicked
    if (videoRef.current && videoRef.current.muted) {
      videoRef.current.muted = false
      setIsMuted(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Close button */}
      <Link 
        to="/" 
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </Link>

      {/* Sound toggle button */}
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

      {/* Click anywhere else to close */}
      <Link 
        to="/" 
        className="absolute inset-0 z-0"
        aria-label="Close video"
        style={{ zIndex: -1 }}
      />

      {/* Instructions text - shows if muted */}
      {isMuted && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <p className="text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full">
            Click video or sound icon to unmute
          </p>
        </div>
      )}
    </div>
  )
}