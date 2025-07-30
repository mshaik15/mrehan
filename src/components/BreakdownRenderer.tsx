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
      return <p className="mt-1">{team}</p>;
    }

    // Array of team members
    return (
      <div className="mt-1 space-y-1">
        {team.map((member, index) => (
          <div key={index}>
            {member.linkedinUrl ? (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                {member.name}
              </a>
            ) : (
              <span className="text-blue-400">{member.name}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-400">Loading project breakdown...</p>
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
    <div className="max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      
      <section className="pt-16 pb-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <div className="space-y-2">
            {/* <span className="text-blue-400 font-medium">Project Showcase</span> */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
              {metadata.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
              {metadata.subtitle}
            </p>
            <div className="pt-2">
              <span className="text-gray-400 font-medium">
                {metadata.projectType} · {metadata.year}
              </span>
            </div>
          </div>
          
          <div className="mt-8 lg:mt-0">
            <div className="border border-gray-700/50 rounded-lg overflow-hidden bg-gray-800/50">
              {metadata.previewImage ? (
                <img 
                  src={metadata.previewImage} 
                  alt={`${metadata.title} preview`}
                  className="w-full h-[400px] object-cover"
                />
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center p-6">
                    <p className="text-gray-400 mb-3">Project Preview</p>
                    <p className="text-sm text-gray-500">
                      Add previewImage to metadata for visual preview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12 lg:mt-16">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-gray-700/50 pt-8">
          <div className="flex gap-4">
            <div className="mt-1">
              <Clock size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">Timeline</h3>
              <p className="mt-1">{metadata.timeline}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <Github size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">Repository</h3>
              {metadata.githubUrl ? (
                <a 
                  href={metadata.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  View on GitHub
                  <ExternalLink size={14} />
                </a>
              ) : (
                <p className="mt-1 text-gray-500">Private Repository</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <div className="w-5 h-5 bg-blue-400 rounded" />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">Tools & Technologies</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {metadata.tools.map((tool, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {metadata.team && (Array.isArray(metadata.team) ? metadata.team.length > 0 : true) && (
            <div className="flex gap-4">
              <div className="mt-1">
                <Users size={20} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">Team</h3>
                {renderTeam(metadata.team)}
              </div>
            </div>
          )}

          {metadata.role && (
            <div className="flex gap-4">
              <div className="mt-1">
                <Brain size={20} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">My Role</h3>
                <p className="mt-1">{metadata.role}</p>
              </div>
            </div>
          )}

          {metadata.status && (
            <div className="flex gap-4">
              <div className="mt-1">
                <Target size={20} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">Status</h3>
                <p className="mt-1">{metadata.status}</p>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-4 lg:gap-8">
        
        {/* Table of Contents */}
        {!isMobile && (
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <nav className="pr-8">
                <h2 className="text-sm uppercase tracking-wider text-gray-400 font-medium mb-4">
                  Table of Contents
                </h2>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left w-full py-1 border-l-2 pl-3 transition-colors ${
                          activeSection === section.id
                            ? 'border-blue-400 text-blue-400'
                            : 'border-gray-700/50 text-gray-400 hover:text-gray-300 hover:border-gray-600'
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
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600 rounded-md transition-colors"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
                {metadata.caseStudyUrl && (
                  <a 
                    href={metadata.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600 rounded-md transition-colors"
                  >
                    <div className="w-[18px] h-[18px]" />
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