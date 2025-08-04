import { Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className="w-full bg-theme-bg-primary/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5 lg:py-6">
          <Link 
            to="/" 
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-theme-text-primary hover:text-theme-text-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 flex items-center gap-3"
          >
            Mohammed Rehan
          </Link>
        </div>
      </div>
    </header>
  )
}