import { BlockMath_, InlineMath_ } from './Math';
import type { ContentBlock } from './../types/breakdown';

interface BreakdownContentRendererProps {
  blocks: ContentBlock[];
}

const BreakdownContentRenderer = ({ blocks }: BreakdownContentRendererProps) => {
  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <p key={index} className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
            {block.content}
          </p>
        );

      case 'math':
        return block.inline ? (
          <div key={index} className="my-2">
            <InlineMath_>{block.content}</InlineMath_>
          </div>
        ) : (
          <div key={index} className="my-4">
            <BlockMath_>{block.content}</BlockMath_>
          </div>
        );

      case 'code':
        return (
          <div key={index} className="my-4">
            <div className="bg-theme-bg-tertiary p-3 rounded-lg overflow-x-auto relative">
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
          <div key={index} className="my-6">
            <div className="border border-theme-border-primary/50 rounded-lg overflow-hidden bg-theme-bg-tertiary/30">
              <img 
                src={block.src} 
                alt={block.alt}
                className={`w-full object-cover ${block.width ? `w-[${block.width}]` : ''} ${block.height ? `h-[${block.height}]` : 'h-[300px] sm:h-[400px]'}`}
              />
              {block.caption && (
                <div className="p-3 text-xs text-theme-text-muted text-center">
                  {block.caption}
                </div>
              )}
            </div>
          </div>
        );

      case 'list':
        const ListTag = block.ordered ? 'ol' : 'ul';
        return (
          <ListTag key={index} className={`space-y-1.5 text-theme-text-secondary text-sm sm:text-base my-3 ${block.ordered ? 'list-decimal list-inside' : 'space-y-1.5'}`}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className={block.ordered ? '' : '• ' + item}>
                {block.ordered ? item : item}
              </li>
            ))}
          </ListTag>
        );

      case 'quote':
        return (
          <blockquote key={index} className="my-4 border-l-4 border-theme-accent-primary/50 pl-4 italic text-theme-text-secondary">
            <p className="text-sm sm:text-base leading-relaxed">"{block.content}"</p>
            {block.author && (
              <cite className="text-xs text-theme-text-muted mt-2 block not-italic">
                — {block.author}
              </cite>
            )}
          </blockquote>
        );

      case 'metrics':
        return (
          <div key={index} className="my-6">
            {block.title && (
              <h4 className="text-sm font-medium text-theme-text-primary mb-3">{block.title}</h4>
            )}
            <div className="border border-theme-border-primary/50 rounded-lg p-4 bg-theme-bg-tertiary/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {block.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="text-center">
                    <div className="text-lg font-semibold text-theme-accent-primary">
                      {metric.value}
                    </div>
                    <div className="text-xs text-theme-text-muted">
                      {metric.label}
                    </div>
                    {metric.description && (
                      <div className="text-xs text-theme-text-secondary mt-1">
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
          <div key={index} className="my-4">
            {block.component}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default BreakdownContentRenderer;