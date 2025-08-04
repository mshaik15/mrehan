import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Clock, Users, Brain, Target, Github, ExternalLink } from 'lucide-react';
import type { ProjectBreakdown, TeamMember } from '../types/breakdown';
import { getBreakdown } from '../breakdowns';

const BreakdownRenderer = () => {
  const { slug } = useParams<{ slug: string }>();
  const [breakdown, setBreakdown] = useState<ProjectBreakdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);

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

    breakdown.sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      breakdown.sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [breakdown]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper function to render team members with LinkedIn links
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
                className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                {member.name}
              </a>
            ) : (
              <span className="text-sm text-blue-400">{member.name}</span>
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-400 text-sm">Loading project breakdown...</p>
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
      
      <section className="pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - Project Info */}
          <div className="space-y-6">
            {/* Title and Subtitle */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-theme-text-primary leading-tight">
                {metadata.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed">
                {metadata.subtitle}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{metadata.projectType}</span>
                <span>•</span>
                <span>{metadata.year}</span>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Status */}
              {metadata.status && (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <Target size={12} className="text-theme-text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 font-medium">Status</div>
                    <div className="text-sm text-theme-text-secondary">{metadata.status}</div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Clock size={12} className="text-theme-text-primary" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 font-medium">Timeline</div>
                  <div className="text-sm text-theme-text-secondary">{metadata.timeline}</div>
                </div>
              </div>

              {/* Team */}
              {metadata.team && (Array.isArray(metadata.team) ? metadata.team.length > 0 : true) && (
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                    <Users size={12} className="text-theme-text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 font-medium">Team</div>
                    {renderTeam(metadata.team)}
                  </div>
                </div>
              )}

              {/* Role */}
              {metadata.role && (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <Brain size={12} className="text-theme-text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 font-medium">My Role</div>
                    <div className="text-sm text-theme-text-secondary">{metadata.role}</div>
                  </div>
                </div>
              )}

              {/* Repository */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Github size={12} className="text-theme-text-primary" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 font-medium">Repository</div>
                  {metadata.githubUrl ? (
                    <a 
                      href={metadata.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                    >
                      View on GitHub
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <div className="text-sm text-gray-500">Private Repository</div>
                  )}
                </div>
              </div>
            </div>

            {/* Tools & Technologies */}
            <div>
              <h3 className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-3">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {metadata.tools.map((tool, index) => (
                  <span key={index} className="px-3 py-1.5 bg-theme-bg-tertiary/50 border border-gray-700/50 rounded-full text-xs text-theme-text-secondary">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Preview Image */}
          <div className="lg:sticky lg:top-24">
            <div className="border border-gray-700/50 rounded-xl overflow-hidden bg-theme-bg-tertiary/50">
              {metadata.previewImage ? (
                <img 
                  src={metadata.previewImage} 
                  alt={`${metadata.title} preview`}
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                />
              ) : (
                <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center p-6">
                    <p className="text-gray-400 mb-3 text-sm">Project Preview</p>
                    <p className="text-xs text-gray-500">
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
            <div className="sticky top-8">
              <nav className="pr-8">
                <h2 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-4">
                  Table of Contents
                </h2>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left w-full py-1 border-l-2 pl-3 transition-colors text-sm ${
                          activeSection === section.id
                            ? 'border-blue-400 text-blue-400'
                            : 'border-gray-700/50 text-gray-400 hover:text-theme-text-secondary hover:border-gray-600'
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
              <section key={section.id} id={section.id} className="mt-12 first:mt-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-theme-text-primary mb-4">
                  {section.title}
                </h2>
                {section.content}
              </section>
            ))}

            {/* Action Links - only show live URL and case study if provided */}
            {(metadata.liveUrl || metadata.caseStudyUrl) && (
              <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-700/50">
                {metadata.liveUrl && (
                  <a 
                    href={metadata.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-theme-bg-tertiary/50 hover:bg-theme-bg-hover/50 border border-gray-700/50 hover:border-gray-600 rounded-md transition-colors text-sm"
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-theme-bg-tertiary/50 hover:bg-theme-bg-hover/50 border border-gray-700/50 hover:border-gray-600 rounded-md transition-colors text-sm"
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