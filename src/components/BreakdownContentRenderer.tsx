// src/components/BreakdownContentRenderer.tsx
import { BlockMath_, InlineMath_ } from './Math';
import type { ContentBlock } from './../types/breakdown';

interface BreakdownContentRendererProps {
  blocks: ContentBlock[];
}

const BreakdownContentRenderer = ({ blocks }: BreakdownContentRendererProps) => {
  // Helper function to get indent classes
  const getIndentClasses = (indent?: number) => {
    if (!indent || indent <= 0) return '';
    
    // Each level adds more left margin without borders
    const indentLevels = {
      1: 'ml-6',
      2: 'ml-12', 
      3: 'ml-18',
      4: 'ml-24'
    };
    
    return indentLevels[Math.min(indent, 4) as keyof typeof indentLevels] || indentLevels[4];
  };

  // Updated function to render text with smaller, refined bold styling
  const renderTextWithBold = (text: string) => {
    // Split by markdown bold syntax **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the ** markers and render with refined bold styling
        const boldText = part.slice(2, -2);
        return (
          <strong 
            key={index} 
            className="font-bold text-theme-text-emphasis"
            style={{
              fontWeight: '700' // Reduced from 800
            }}
          >
            {boldText}
          </strong>
        );
      }
      return part;
    });
  };

  const renderBlock = (block: ContentBlock, index: number) => {
    const indentClass = getIndentClasses(block.indent);
    const baseClass = indentClass ? `${indentClass}` : '';

    switch (block.type) {
      case 'text':
        return (
          <div key={index} className={baseClass}>
            <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
              {renderTextWithBold(block.content)}
            </p>
          </div>
        );

      case 'math':
        return block.inline ? (
          <div key={index} className={`my-2 ${baseClass}`}>
            <InlineMath_>{block.content}</InlineMath_>
          </div>
        ) : (
          <div key={index} className={`my-4 ${baseClass}`}>
            <BlockMath_>{block.content}</BlockMath_>
          </div>
        );

      case 'code':
        return (
          <div key={index} className={`my-4 max-w-[90%] mx-auto ${baseClass}`}>
            <div className="bg-theme-bg-tertiary p-3 rounded-lg overflow-x-auto relative shadow-[0_0_8px_rgba(107,207,246,0.1)]">
              {(block.language || block.filename) && (
                <div className="absolute top-0 right-0 px-2 py-1 text-xs text-theme-text-muted bg-theme-bg-tertiary rounded-bl">
                  {block.filename || block.language || 'Code'}
                </div>
              )}
              <pre className="text-xs text-theme-text-primary">
                <code>{block.content}</code>
              </pre>
            </div>
          </div>
        );

      case 'image':
        return (
          <div key={index} className={`my-8 ${baseClass}`}>
            <div className="rounded-xl bg-theme-bg-tertiary/20 p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <div className="w-full flex justify-center">
                <img 
                  src={block.src} 
                  alt={block.alt}
                  className="rounded-lg max-w-full h-auto"
                  style={{
                    maxHeight: block.height || '85vh',
                    width: block.width || 'auto',
                    imageRendering: 'crisp-edges',
                    filter: 'contrast(1.1) brightness(1.05)',
                    objectFit: 'contain'
                  }}
                  onLoad={(e) => {
                    console.log('Image loaded successfully:', block.src);
                    console.log('Image dimensions:', e.currentTarget.naturalWidth, 'x', e.currentTarget.naturalHeight);
                  }}
                  onError={(e) => {
                    console.error('Failed to load image:', block.src);
                    const target = e.currentTarget;
                    target.style.minHeight = '200px';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.style.backgroundColor = '#1a1a1a';
                    target.style.borderRadius = '8px';
                    target.innerHTML = '<div style="color: #999; text-align: center; padding: 20px;">Image failed to load<br><small>' + block.src + '</small></div>';
                  }}
                />
              </div>
              {block.caption && (
                <div className="pt-4 text-sm text-theme-text-muted text-center border-t border-theme-border-primary/20 mt-4">
                  {block.caption}
                </div>
              )}
            </div>
          </div>
        );

      case 'list':
        const ListTag = block.ordered ? 'ol' : 'ul';
        return (
          <div key={index} className={baseClass}>
            <ListTag className={`space-y-2 text-theme-text-secondary text-sm sm:text-base my-4 ${block.ordered ? 'list-decimal list-inside pl-4' : 'space-y-2'}`}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className={block.ordered ? '' : 'flex items-start gap-2'}>
                  {!block.ordered && <span className="text-theme-accent-primary mt-1.5 text-xs">●</span>}
                  <span className="flex-1">{renderTextWithBold(item)}</span>
                </li>
              ))}
            </ListTag>
          </div>
        );

      case 'quote':
        return (
          <div key={index} className={baseClass}>
            <blockquote className="my-6 border-l-4 border-theme-accent-primary/60 pl-6 py-2 bg-theme-bg-tertiary/20 rounded-r-lg">
              <p className="text-sm sm:text-base leading-relaxed text-theme-text-secondary italic">
                "{renderTextWithBold(block.content)}"
              </p>
              {block.author && (
                <cite className="text-xs text-theme-text-muted mt-3 block not-italic font-medium">
                  — {block.author}
                </cite>
              )}
            </blockquote>
          </div>
        );

      case 'metrics':
        return (
          <div key={index} className={`my-8 ${baseClass}`}>
            {block.title && (
              <h4 className="text-base font-semibold text-theme-text-emphasis mb-4 text-center">
                {block.title}
              </h4>
            )}
            <div className="rounded-xl p-6 bg-gradient-to-br from-theme-bg-tertiary/20 to-theme-bg-tertiary/40 shadow-[0_0_20px_rgba(107,207,246,0.1)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {block.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="text-center group">
                    <div className="text-2xl font-bold text-theme-accent-primary group-hover:text-theme-accent-hover transition-colors duration-300 drop-shadow-[0_0_8px_rgba(107,207,246,0.4)]">
                      {metric.value}
                    </div>
                    <div className="text-xs font-medium text-theme-text-emphasis mt-1">
                      {metric.label}
                    </div>
                    {metric.description && (
                      <div className="text-xs text-theme-text-muted mt-2 leading-relaxed">
                        {metric.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'custom':
        return (
          <div key={index} className={`my-6 ${baseClass}`}>
            {block.component}
          </div>
        );

      case 'workflow':
        return (
          <div key={index} className={`my-10 ${baseClass}`}>
            {block.title && (
              <h4 className="text-lg font-semibold text-theme-text-emphasis mb-6 text-center">
                {block.title}
              </h4>
            )}
            <div className="rounded-2xl bg-gradient-to-br from-theme-bg-tertiary/10 to-theme-bg-tertiary/30 p-8 shadow-[0_0_30px_rgba(107,207,246,0.15)]">
              <div className="w-full flex justify-center">
                <object
                  data={block.src}
                  type="application/pdf"
                  className="w-full rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                  style={{
                    height: '70vh',
                    minHeight: '500px',
                    maxHeight: '800px'
                  }}
                >
                  {/* Fallback for browsers that don't support PDF embedding */}
                  <div className="w-full h-96 bg-theme-bg-tertiary/50 rounded-lg flex flex-col items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-theme-text-muted text-lg mb-4">📄</div>
                      <p className="text-theme-text-secondary">
                        PDF workflow diagram
                      </p>
                      <a 
                        href={block.src} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-theme-accent-primary/20 hover:bg-theme-accent-primary/30 rounded-lg text-theme-accent-primary transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Workflow PDF
                      </a>
                    </div>
                  </div>
                </object>
              </div>
              {block.caption && (
                <div className="pt-6 text-sm text-theme-text-muted text-center border-t border-theme-border-primary/20 mt-6">
                  {block.caption}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default BreakdownContentRenderer;