import { useState } from 'react'
import { ChevronDown, Building2 } from 'lucide-react'

interface DropdownCardProps {
  title: string
  subtitle: string
  year: string
  icon: string
  children?: React.ReactNode
}

export default function DropdownCard({ title, subtitle, year, icon, children }: DropdownCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div className="mb-3 sm:mb-4 lg:mb-6 rounded-lg border border-gray-700/50 bg-gray-900/50 hover:border-gray-600/50 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 min-w-0">
          {imageError ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400" />
            </div>
          ) : (
            <img 
              src={icon} 
              alt="" 
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg object-cover flex-shrink-0"
              onError={() => setImageError(true)}
            />
          )}
          <div className="text-left min-w-0 flex-1">
            <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-gray-100 truncate group-hover:text-white transition-colors">
              {title}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-400 truncate">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
          <span className="text-xs sm:text-sm lg:text-base text-gray-400 hidden xs:block">
            {year}
          </span>
          <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Slide transition with improved mobile spacing */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5 border-t border-gray-700/50">
          {children}
        </div>
      </div>
    </div>
  )
}