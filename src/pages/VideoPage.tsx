import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay failed:', error)
        // Autoplay might be blocked by browser, user will need to click
      })
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Close button */}
      <Link 
        to="/" 
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </Link>

      {/* Video container */}
      <div className="w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          className="max-w-full max-h-full object-contain"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        >
          <source src="/ScreenRecording_07-17-2025 17-06-33_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <Link 
        to="/" 
        className="absolute inset-0 z-0"
        aria-label="Close video"
      />
    </div>
  )
}