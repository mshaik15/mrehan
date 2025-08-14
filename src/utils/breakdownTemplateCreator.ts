import type { TemplateBreakdown, ContentBlock, TemplateSection, TextContent, BoldText } from '../types/breakdown';

// Helper function to create bold text
export const Bold = (content: string): BoldText => ({
  type: 'bold',
  content
});

// Helper function to create links
export const Link = (url: string) => (name: string) => ({
  type: 'link' as const,
  url,
  name
});

// Helper function to parse text content with bold elements and links
const parseTextContent = (content: TextContent): string => {
  if (typeof content === 'string') {
    return content;
  }
  
  if (typeof content === 'object' && content !== null && 'type' in content) {
    if (content.type === 'bold') {
      return `**${content.content}**`; // Use markdown-style bold
    }
    if (content.type === 'link' && 'name' in content && 'url' in content) {
      return `[${content.name}](${content.url})`; // Use markdown-style link
    }
  }
  
  if (Array.isArray(content)) {
    return content.map(item => {
      if (typeof item === 'string') {
        return item;
      } else if (item.type === 'bold') {
        return `**${item.content}**`;
      } else if (item.type === 'link' && 'name' in item && 'url' in item) {
        return `[${item.name}](${item.url})`;
      }
      return '';
    }).join('');
  }
  
  return '';
};

// Helper functions to create content blocks easily
export const createText = (content: TextContent, indent?: number): ContentBlock => ({
  type: 'text',
  content: parseTextContent(content),
  indent
});

export const createMath = (content: string, inline = false, indent?: number): ContentBlock => ({
  type: 'math',
  content,
  inline,
  indent
});

export const createCode = (content: string, language?: string, filename?: string, indent?: number): ContentBlock => ({
  type: 'code',
  content,
  language,
  filename,
  indent
});

export const createImage = (src: string, alt: string, caption?: string, width?: string, height?: string, indent?: number): ContentBlock => ({
  type: 'image',
  src,
  alt,
  caption,
  width,
  height,
  indent
});

export const createList = (items: string[], ordered = false, indent?: number): ContentBlock => ({
  type: 'list',
  items,
  ordered,
  indent
});

export const createQuote = (content: string, author?: string, indent?: number): ContentBlock => ({
  type: 'quote',
  content,
  author,
  indent
});

export const createMetrics = (
  metrics: Array<{
    label: string;
    value: string;
    description?: string;
  }>,
  title?: string,
  indent?: number
): ContentBlock => ({
  type: 'metrics',
  metrics,
  title,
  indent
});

export const createCustom = (component: React.ReactNode, indent?: number): ContentBlock => ({
  type: 'custom',
  component,
  indent
});

export const createWorkflow = (src: string, alt: string, caption?: string, title?: string, indent?: number): ContentBlock => ({
  type: 'workflow',
  src,
  alt,
  caption,
  title,
  indent
});

// Helper function to indent blocks
export const indent = (blocks: ContentBlock[] | ContentBlock, level: number = 1): ContentBlock[] => {
  const blocksArray = Array.isArray(blocks) ? blocks : [blocks];
  return blocksArray.map(block => ({
    ...block,
    indent: (block.indent || 0) + level
  }));
};

// Helper to create sections
export const createSection = (id: string, title: string, blocks: ContentBlock[]): TemplateSection => ({
  id,
  title,
  blocks
});

// Template builder class for more complex breakdowns
export class BreakdownBuilder {
  private breakdown: Partial<TemplateBreakdown> = {
    sections: []
  };

  setMetadata(metadata: TemplateBreakdown['metadata']) {
    this.breakdown.metadata = metadata;
    return this;
  }

  addSection(id: string, title: string, blocks: ContentBlock[]) {
    if (!this.breakdown.sections) {
      this.breakdown.sections = [];
    }
    this.breakdown.sections.push(createSection(id, title, blocks));
    return this;
  }

  // Convenience method for common section patterns
  addOverviewSection(description: string[], additionalBlocks: ContentBlock[] = []) {
    const blocks = [
      ...description.map(text => createText(text)),
      ...additionalBlocks
    ];
    return this.addSection('overview', 'Overview', blocks);
  }

  addTechnicalSection(title: string, description: string, codeExample?: {
    content: string;
    language?: string;
    filename?: string;
  }, additionalBlocks: ContentBlock[] = []) {
    const blocks = [
      createText(description),
      ...(codeExample ? [createCode(codeExample.content, codeExample.language, codeExample.filename)] : []),
      ...additionalBlocks
    ];
    return this.addSection(title.toLowerCase().replace(/\s+/g, '-'), title, blocks);
  }

  addResultsSection(description: string, metrics?: Parameters<typeof createMetrics>[0], additionalBlocks: ContentBlock[] = []) {
    const blocks = [
      createText(description),
      ...(metrics ? [createMetrics(metrics, 'Performance Metrics')] : []),
      ...additionalBlocks
    ];
    return this.addSection('results', 'Results', blocks);
  }

  build(): TemplateBreakdown {
    if (!this.breakdown.metadata) {
      throw new Error('Metadata is required');
    }
    if (!this.breakdown.sections?.length) {
      throw new Error('At least one section is required');
    }
    return this.breakdown as TemplateBreakdown;
  }
}

// Example usage:
export const createSimpleBreakdown = (
  metadata: TemplateBreakdown['metadata'],
  sections: { id: string; title: string; blocks: ContentBlock[] }[]
): TemplateBreakdown => ({
  metadata,
  sections
});

// Quick templates for common breakdown patterns
export const createResearchBreakdown = (
  metadata: TemplateBreakdown['metadata'],
  overview: string[],
  problem: string[],
  solution: {
    description: string;
    codeExample?: { content: string; language?: string; filename?: string };
  },
  results: {
    description: string;
    metrics?: Parameters<typeof createMetrics>[0];
  },
  additionalSections: TemplateSection[] = []
) => {
  let builder = new BreakdownBuilder()
    .setMetadata(metadata)
    .addOverviewSection(overview)
    .addSection('problem', 'Problem & Motivation', problem.map(createText))
    .addTechnicalSection('solution', solution.description, solution.codeExample)
    .addResultsSection(results.description, results.metrics);

  // Add any additional sections if provided
  additionalSections.forEach(section =>
    builder.addSection(section.id, section.title, section.blocks)
  );

  return builder.build();
};