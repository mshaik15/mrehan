import { Link } from 'react-router-dom'

export default function Header() {

  

  return (
    <header className="w-full bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5 lg:py-6">
          <Link 
            to="/" 
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-white hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
          >
            Mohammed Rehan
          </Link>

          <nav className="flex items-center gap-6 sm:gap-8">
            <Link 
              to="/work" 
              className="text-sm sm:text-base text-gray-400 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-all duration-300 font-medium"
            >
              Work | Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}