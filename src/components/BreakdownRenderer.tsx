import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import type { ProjectBreakdown, TeamMember, TemplateBreakdown } from '../types/breakdown';
import { getBreakdown } from '../breakdowns';
import BreakdownContentRenderer from './BreakdownContentRenderer';

const BreakdownRenderer = () => {
  const { slug } = useParams<{ slug: string }>();
  const [breakdown, setBreakdown] = useState<ProjectBreakdown | TemplateBreakdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Helper function to check if breakdown uses template system
  const isTemplateBreakdown = (breakdown: ProjectBreakdown | TemplateBreakdown): breakdown is TemplateBreakdown => {
    return breakdown.sections.length > 0 && 'blocks' in breakdown.sections[0];
  };

  useEffect(() => {
    const loadBreakdown = async () => {
      if (!slug) {
        setError('No project slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const breakdownModule = await getBreakdown(slug);
        
        if (!breakdownModule) {
          setError(`No breakdown found for project: ${slug}`);
          return;
        }

        const breakdownData = breakdownModule.default();
        setBreakdown(breakdownData);
        setError(null);
      } catch (err) {
        console.error('Error loading breakdown:', err);
        setError('Failed to load project breakdown');
      } finally {
        setLoading(false);
      }
    };

    loadBreakdown();
  }, [slug]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!breakdown) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    // Observe header section
    const headerElement = document.getElementById('project-header');
    if (headerElement) observer.observe(headerElement);

    // Observe content sections
    breakdown.sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      // Clean up header observation
      if (headerElement) observer.unobserve(headerElement);
      
      // Clean up section observations
      breakdown.sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [breakdown]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Account for sticky header height when scrolling
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Helper function to render team members with LinkedIn links and underlines
  const renderTeam = (team: string | TeamMember[] | undefined) => {
    if (!team) return null;

    if (typeof team === 'string') {
      return <div className="text-sm text-theme-text-secondary">{team}</div>;
    }

    // Array of team members
    return (
      <div className="space-y-1">
        {team.map((member, index) => (
          <div key={index}>
            {member.linkedinUrl ? (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-theme-accent-primary hover:text-theme-accent-primary underline decoration-theme-accent-primary/50 hover:decoration-theme-accent-primary transition-colors"
              >
                {member.name}
              </a>
            ) : (
              <span className="text-sm text-theme-accent-primary">{member.name}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-accent-primary mx-auto"></div>
            <p className="text-theme-text-muted text-sm">Loading project breakdown...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !breakdown) {
    return <Navigate to="/" replace />;
  }

  const { metadata, sections } = breakdown;

  return (
    <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      
      {/* Add top padding to account for sticky header */}
      <section id="project-header" className="pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - Project Info */}
          <div className="space-y-6">
            {/* Title and Subtitle */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-theme-text-primary leading-tight">
                {metadata.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-theme-text-muted leading-relaxed">
                {metadata.subtitle}
              </p>
              <div className="flex items-center gap-2 text-sm text-theme-text-muted">
                <span>{metadata.projectType}</span>
                <span>•</span>
                <span>{metadata.year}</span>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Status */}
              {metadata.status && (
                <div className="flex flex-col gap-1">
                  <div className="text-xs uppercase tracking-wide text-theme-text-primary font-bold">STATUS</div>
                  <div className="text-sm text-theme-text-secondary font-medium">{metadata.status}</div>
                </div>
              )}

              {/* Timeline */}
              <div className="flex flex-col gap-1">
                <div className="text-xs uppercase tracking-wide text-theme-text-primary font-bold">TIMELINE</div>
                <div className="text-sm text-theme-text-secondary font-medium">{metadata.timeline}</div>
              </div>

              {/* Team */}
              {metadata.team && (Array.isArray(metadata.team) ? metadata.team.length > 0 : true) && (
                <div className="flex flex-col gap-1">
                  <div className="text-xs uppercase tracking-wide text-theme-text-primary font-bold">TEAM</div>
                  {renderTeam(metadata.team)}
                </div>
              )}

              {/* Role */}
              {metadata.role && (
                <div className="flex flex-col gap-1">
                  <div className="text-xs uppercase tracking-wide text-theme-text-primary font-bold">MY ROLE</div>
                  <div className="text-sm text-theme-text-secondary font-medium">{metadata.role}</div>
                </div>
              )}

              {/* Repository */}
              <div className="flex flex-col gap-1">
                <div className="text-xs uppercase tracking-wide text-theme-text-primary font-bold">REPOSITORY</div>
                {metadata.githubUrl ? (
                  <a 
                    href={metadata.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-theme-accent-primary hover:text-theme-accent-primary hover:underline transition-colors font-medium"
                  >
                    View on GitHub
                    <ExternalLink size={10} />
                  </a>
                ) : (
                  <div className="text-sm text-theme-text-muted font-medium">Private Repository</div>
                )}
              </div>
            </div>

            {/* Tools & Technologies */}
            <div>
              <h3 className="text-xs uppercase tracking-wide text-theme-text-muted font-medium mb-3">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {metadata.tools.map((tool, index) => (
                  <span key={index} className="px-3 py-1.5 bg-theme-bg-tertiary/50 border border-theme-border-primary/50 rounded-full text-xs text-theme-text-secondary">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Preview Image */}
          <div className="lg:sticky lg:top-32">
            <div className="border border-theme-border-primary/50 rounded-xl overflow-hidden bg-theme-bg-tertiary/50">
              {metadata.previewImage ? (
                <img 
                  src={metadata.previewImage} 
                  alt={`${metadata.title} preview`}
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                />
              ) : (
                <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center p-6">
                    <p className="text-theme-text-muted mb-3 text-sm">Project Preview</p>
                    <p className="text-xs text-theme-text-muted">
                      Add previewImage to metadata for visual preview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-4 lg:gap-8">
        
        {/* Table of Contents */}
        {!isMobile && (
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32">
              <nav className="pr-8">
                <h2 className="text-xs uppercase tracking-wider text-theme-text-muted font-medium mb-4">
                  Table of Contents
                </h2>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left w-full py-1 border-l-2 pl-3 transition-all duration-300 text-sm ${
                          activeSection === section.id
                            ? 'border-theme-accent-primary text-theme-accent-primary drop-shadow-[0_0_8px_rgba(107,207,246,0.6)]'
                            : 'border-theme-border-primary/50 text-theme-text-muted hover:text-theme-accent-primary hover:border-theme-accent-primary hover:drop-shadow-[0_0_6px_rgba(107,207,246,0.4)]'
                        }`}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="lg:col-span-3">
          <article className="prose prose-lg prose-invert max-w-none">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mt-12 first:mt-0 scroll-mt-32">
                <h2 
                  className="text-xl sm:text-2xl font-semibold mb-4"
                  style={{
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '1.15em'
                  }}
                >
                  {section.title}
                </h2>
                {isTemplateBreakdown(breakdown) && 'blocks' in section ? (
                  <BreakdownContentRenderer blocks={section.blocks} />
                ) : (
                  'content' in section ? section.content : null
                )}
              </section>
            ))}

            {/* Action Links - only show live URL and case study if provided */}
            {(metadata.liveUrl || metadata.caseStudyUrl) && (
              <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-theme-border-primary/50">
                {metadata.liveUrl && (
                  <a 
                    href={metadata.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-theme-bg-tertiary/50 hover:bg-theme-bg-hover/50 border border-theme-border-primary/50 hover:border-theme-border-secondary rounded-md transition-colors text-sm"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {metadata.caseStudyUrl && (
                  <a 
                    href={metadata.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-theme-bg-tertiary/50 hover:bg-theme-bg-hover/50 border border-theme-border-primary/50 hover:border-theme-border-secondary rounded-md transition-colors text-sm"
                  >
                    <div className="w-[16px] h-[16px]" />
                    Case Study
                  </a>
                )}
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default BreakdownRenderer;