// src/components/DropdownCard/DropdownCard.tsx
import { useState } from 'react'
import { ChevronDown, Building2, ExternalLink, Github, Eye } from 'lucide-react'

interface DropdownCardProps {
  title: string
  subtitle: string
  icon: string
  children?: React.ReactNode
  type?: 'project' | 'work'
  companyUrl?: string
  
  // Project-specific props
  hasBreakdown?: boolean
  slug?: string
  githubUrl?: string
  liveUrl?: string
}

export default function DropdownCard({ 
  title, 
  subtitle, 
  icon, 
  children, 
  type = 'project', 
  companyUrl,
  hasBreakdown = false,
  slug,
  githubUrl,
  liveUrl
}: DropdownCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  // ALL projects have dropdown content (to show skills/tech)
  // Only work items don't have dropdowns
  const hasDropdownContent = type === 'project' && children

  const handleBreakdownClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasBreakdown && slug) {
      window.location.href = `/project/${slug}`
    }
  }

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation()
    window.open(url, '_blank')
  }

  const handleWorkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (companyUrl) {
      window.open(companyUrl, '_blank')
    } else {
      const companyName = title.toLowerCase().replace(/[^a-z0-9]+/g, '')
      window.open(`https://${companyName}.com`, '_blank')
    }
  }

  // For projects: determine primary external link
  const getPrimaryExternalLink = () => {
    if (hasBreakdown && slug) {
      return `/project/${slug}`
    }
    if (liveUrl) {
      return liveUrl
    }
    if (githubUrl) {
      return githubUrl
    }
    return null
  }

  const handlePrimaryExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const primaryLink = getPrimaryExternalLink()
    if (primaryLink) {
      if (primaryLink.startsWith('/')) {
        // Internal link (breakdown page)
        window.location.href = primaryLink
      } else {
        // External link
        window.open(primaryLink, '_blank')
      }
    }
  }

  return (
    <div className="mb-3 sm:mb-4 lg:mb-6 rounded-lg border border-gray-700/50 bg-gray-900/50 hover:border-gray-600/50 transition-all">
      <button
        onClick={(e) => hasDropdownContent ? setIsOpen(!isOpen) : handleWorkClick(e)}
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
          {type === 'work' ? (
            // Work items - show external link
            <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 min-w-0" style={{ width: '120px' }}>
              <span className="text-xs sm:text-sm lg:text-base text-gray-400 hidden xs:block">
                Visit
              </span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 hover:text-white transition-colors flex-shrink-0" />
            </div>
          ) : hasDropdownContent ? (
            // Projects - show chevron when closed, external link when open
            <>
              <span className="text-xs sm:text-sm lg:text-base text-gray-400 hidden xs:block">
                {isOpen ? "View" : ""}
              </span>
              {isOpen && getPrimaryExternalLink() ? (
                <button
                  onClick={handlePrimaryExternalClick}
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <ExternalLink className="w-full h-full" />
                </button>
              ) : (
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              )}
            </>
          ) : null}
        </div>
      </button>
      
      {/* Dropdown content - ALL projects have this */}
      {hasDropdownContent && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5 border-t border-gray-700/50">
            {/* Project description and tech tags */}
            {children}
            
            {/* Action buttons - appear in dropdown for ALL projects */}
            <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-700/30">
              {/* Breakdown button - only for projects with full breakdowns */}
              {hasBreakdown && slug && (
                <button
                  onClick={handleBreakdownClick}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/50 hover:border-blue-600 rounded transition-colors text-blue-300"
                >
                  <ExternalLink size={14} />
                  Technical Breakdown
                </button>
              )}
              
              {/* Demo button - only show if there's no breakdown (so it's not redundant with primary external link) */}
              {liveUrl && !hasBreakdown && (
                <button
                  onClick={(e) => handleLinkClick(e, liveUrl)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600 rounded transition-colors"
                >
                  <Eye size={14} />
                  Live Demo
                </button>
              )}
              
              {/* GitHub button */}
              {githubUrl && (
                <button
                  onClick={(e) => handleLinkClick(e, githubUrl)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600 rounded transition-colors"
                >
                  <Github size={14} />
                  View Code
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}