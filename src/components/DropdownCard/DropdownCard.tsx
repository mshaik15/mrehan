import { useState } from 'react'
import { ChevronDown, Building2, ExternalLink } from 'lucide-react'

interface DropdownCardProps {
  title: string
  subtitle: string
  icon: string
  children?: React.ReactNode
  type?: 'project' | 'work' // Add type to distinguish between projects and work
  companyUrl?: string // Optional company URL for work items
}

export default function DropdownCard({ title, subtitle, icon, children, type = 'project', companyUrl }: DropdownCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Work items don't have dropdown content, so they don't open
  const hasDropdownContent = type === 'project' && children

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent dropdown from toggling
    
    if (type === 'work') {
      // For work experience, redirect to company website
      if (companyUrl) {
        window.open(companyUrl, '_blank') // Open in new tab
      } else {
        // Fallback: try to construct a basic company URL
        const companyName = title.toLowerCase().replace(/[^a-z0-9]+/g, '')
        window.open(`https://${companyName}.com`, '_blank')
      }
    } else {
      // For projects, go to technical breakdown page
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      window.location.href = `/project/${slug}`
    }
  }

  return (
    <div className="mb-3 sm:mb-4 lg:mb-6 rounded-lg border border-gray-700/50 bg-gray-900/50 hover:border-gray-600/50 transition-all">
      <button
        onClick={() => hasDropdownContent ? setIsOpen(!isOpen) : null}
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
          {isOpen && hasDropdownContent ? (
            <button
              onClick={handleShare}
              className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 min-w-0"
              style={{ width: '120px' }} // Approximate width of the closed state elements
            >
              <span className="text-xs sm:text-sm lg:text-base text-gray-400 hidden xs:block">
                {/* Empty span to maintain layout */}
              </span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 hover:text-white transition-colors flex-shrink-0" />
            </button>
          ) : type === 'work' ? (
            // For work items, show external link icon always (no dropdown)
            <button
              onClick={handleShare}
              className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 min-w-0"
              style={{ width: '120px' }}
            >
              <span className="text-xs sm:text-sm lg:text-base text-gray-400 hidden xs:block">
                {/* Empty span to maintain layout */}
              </span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 hover:text-white transition-colors flex-shrink-0" />
            </button>
          ) : hasDropdownContent ? (
            // For projects, show chevron when closed
            <>
              <span className="text-xs sm:text-sm lg:text-base text-gray-400 hidden xs:block">
                {/* Empty span to maintain layout */}
              </span>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 transition-transform" />
            </>
          ) : null}
        </div>
      </button>
      {hasDropdownContent && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5 border-t border-gray-700/50">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}