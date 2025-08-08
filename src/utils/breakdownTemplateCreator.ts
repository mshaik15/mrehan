import type { TemplateBreakdown, ContentBlock, TemplateSection } from '../types/breakdown';

// Helper functions to create content blocks easily
export const createText = (content: string): ContentBlock => ({
  type: 'text',
  content
});

export const createMath = (content: string, inline = false): ContentBlock => ({
  type: 'math',
  content,
  inline
});

export const createCode = (content: string, language?: string, filename?: string): ContentBlock => ({
  type: 'code',
  content,
  language,
  filename
});

export const createImage = (src: string, alt: string, caption?: string, width?: string, height?: string): ContentBlock => ({
  type: 'image',
  src,
  alt,
  caption,
  width,
  height
});

export const createList = (items: string[], ordered = false): ContentBlock => ({
  type: 'list',
  items,
  ordered
});

export const createQuote = (content: string, author?: string): ContentBlock => ({
  type: 'quote',
  content,
  author
});

export const createMetrics = (
  metrics: Array<{
    label: string;
    value: string;
    description?: string;
  }>,
  title?: string
): ContentBlock => ({
  type: 'metrics',
  metrics,
  title
});

export const createCustom = (component: React.ReactNode): ContentBlock => ({
  type: 'custom',
  component
});

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

export const createWorkflow = (src: string, alt: string, caption?: string, title?: string): ContentBlock => ({
  type: 'workflow',
  src,
  alt,
  caption,
  title
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