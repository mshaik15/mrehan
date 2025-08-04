import { useState } from 'react'
import { ChevronDown, Building2, ExternalLink, Github, Eye } from 'lucide-react'

interface DropdownCardProps {
  title: string
  subtitle: string
  icon: string
  children?: React.ReactNode
  type?: 'project' | 'work'
  companyUrl?: string
  
  // Only choose 1
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

  // ALL projects have dropdown content
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

  // Count available actions for projects
  const getAvailableActions = () => {
    const actions = []
    if (hasBreakdown && slug) actions.push({ type: 'breakdown', url: `/project/${slug}`, label: 'Technical Breakdown' })
    if (liveUrl) actions.push({ type: 'demo', url: liveUrl, label: 'Live Demo' })
    if (githubUrl) actions.push({ type: 'github', url: githubUrl, label: 'View Code' })
    return actions
  }

  const availableActions = type === 'project' ? getAvailableActions() : []
  const hasAnyActions = availableActions.length > 0

  // For projects: determine primary external link priority when there's exactly 1 action
  const getSingleActionUrl = () => {
    if (availableActions.length === 1) {
      return availableActions[0].url
    }
    return null
  }

  const handleSingleActionClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const singleActionUrl = getSingleActionUrl()
    if (singleActionUrl) {
      if (singleActionUrl.startsWith('/')) {
        // Internal link (breakdown page)
        window.location.href = singleActionUrl
      } else {
        // External link
        window.open(singleActionUrl, '_blank')
      }
    }
  }

  const parseWorkSubtitle = (subtitle: string) => {
    // Role | Location | Date
    const parts = subtitle.split(' | ')
    if (parts.length >= 3) {
      return {
        role: parts[0],
        location: parts[1], 
        date: parts[2]
      }
    }
    // Fallback if format doesn't match
    return { role: subtitle, location: '', date: '' }
  }

  const workInfo = type === 'work' ? parseWorkSubtitle(subtitle) : null

  return (
    <div className={`mb-3 sm:mb-4 lg:mb-6 rounded-lg bg-theme-bg-secondary/50 hover:shadow-[0_0_20px_rgba(107,207,246,0.1)] transition-all duration-300 ${
      isOpen ? 'shadow-[0_0_15px_rgba(107,207,246,0.08)]' : 'shadow-[0_0_8px_rgba(0,0,0,0.3)]'
    }`}>
      <button
        onClick={(e) => hasDropdownContent ? setIsOpen(!isOpen) : handleWorkClick(e)}
        className="w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 min-w-0">
          {imageError ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-theme-bg-hover flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-theme-text-muted" />
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
            {type === 'work' && workInfo ? (
              // Work layout: Title -- Date on first line, Role | Location on second line
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium text-theme-text-primary group-hover:text-theme-text-primary transition-colors">
                    {title}
                  </h3>
                  <span className="text-xs sm:text-xs lg:text-sm text-theme-text-muted">
                    – {workInfo.date}
                  </span>
                </div>
                <div className="text-xs sm:text-xs lg:text-sm text-theme-text-muted">
                  {workInfo.role} | {workInfo.location}
                </div>
              </div>
            ) : (
              // Project layout: Title – Subtitle
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium text-theme-text-primary group-hover:text-theme-text-primary transition-colors">
                  {title}
                </h3>
                <span className="text-xs sm:text-xs lg:text-sm text-theme-text-muted">
                  – {subtitle}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
          {type === 'work' ? (
            // Work items - show external link
            <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 min-w-0" style={{ width: '120px' }}>
              <span className="text-xs sm:text-xs lg:text-sm text-theme-text-muted hidden xs:block">
                Visit
              </span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-theme-text-muted hover:text-theme-text-primary transition-colors flex-shrink-0" />
            </div>
          ) : hasDropdownContent ? (
            // Projects with dropdown content
            <>
              {availableActions.length === 1 ? (
                // Single action - show as external link icon
                <>
                  <span className="text-xs sm:text-xs lg:text-sm text-theme-text-muted hidden xs:block">
                    {isOpen ? availableActions[0].label.split(' ')[0] : ""}
                  </span>
                  {isOpen ? (
                    <button
                      onClick={handleSingleActionClick}
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-theme-text-muted hover:text-theme-text-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-300 flex-shrink-0"
                    >
                      <ExternalLink className="w-full h-full drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
                    </button>
                  ) : (
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-theme-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  )}
                </>
              ) : availableActions.length > 1 ? (
                <>
                  <span className="text-xs sm:text-xs lg:text-sm text-theme-text-muted hidden xs:block">
                    {isOpen ? "View" : ""}
                  </span>
                  <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-theme-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </>
              ) : (
                <>
                  <span className="text-xs sm:text-xs lg:text-sm text-theme-text-muted hidden xs:block">
                    {isOpen ? "" : ""}
                  </span>
                  <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-theme-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </>
              )}
            </>
          ) : null}
        </div>
      </button>
      
      {/* Dropdown content */}
      {hasDropdownContent && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
            {/* Project description and tech stack */}
            {children}
            
            {/* Action buttons */}
            {hasAnyActions && availableActions.length > 1 && (
              <div className="flex flex-wrap gap-3 mt-4 pt-3 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-theme-accent-primary/20 before:to-transparent">
                {/* Breakdown button */}
                {hasBreakdown && (
                  <button
                    onClick={handleBreakdownClick}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-theme-accent-primary/30 hover:bg-theme-accent-primary/50 border border-theme-accent-primary/50 hover:border-theme-accent-hover rounded transition-colors text-theme-accent-primary"
                  >
                    <ExternalLink size={12} />
                    Technical Breakdown
                  </button>
                )}
                
                {/* Demo button */}
                {liveUrl && (
                  <button
                    onClick={(e) => handleLinkClick(e, liveUrl)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-theme-bg-tertiary/50 hover:bg-theme-bg-hover/50 border border-theme-border-primary/50 hover:border-theme-border-secondary rounded transition-colors"
                  >
                    <Eye size={12} />
                    Live Demo
                  </button>
                )}
                
                {/* GitHub button */}
                {githubUrl && (
                  <button
                    onClick={(e) => handleLinkClick(e, githubUrl)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-theme-bg-tertiary/50 hover:bg-theme-bg-hover/50 border border-theme-border-primary/50 hover:border-theme-border-secondary rounded transition-colors"
                  >
                    <Github size={12} />
                    View Code
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}