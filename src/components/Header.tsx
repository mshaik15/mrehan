import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const isWorkPage = location.pathname === '/work'

  return (
    <header className="w-full bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5 lg:py-6">
          {/* Name/Logo - home button */}
          <Link 
            to="/" 
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-white hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
          >
            Mohammed Rehan
          </Link>

          {/* Nav buttons */}
          <nav className="flex items-center gap-6 sm:gap-8">
            {isWorkPage ? (
              <>
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-gray-400 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-all duration-300 font-medium"
                >
                  Resume
                </a>
                <a 
                  href="mailto:your.email@example.com"
                  className="text-sm sm:text-base text-gray-400 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-all duration-300 font-medium"
                >
                  Contact
                </a>
              </>
            ) : (
              <Link 
                to="/work" 
                className="text-sm sm:text-base text-gray-400 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-all duration-300 font-medium"
              >
                Work
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}