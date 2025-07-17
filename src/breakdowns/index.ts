import type { BreakdownComponent } from '../types/breakdown';

export const breakdowns: Record<string, () => Promise<BreakdownComponent>> = {
  'NNIK': () => import('./NNIK'),
  // Add more breakdowns here as you create them
  // 'ai-tutor': () => import('./ai-tutor'),
  // 'blockchain-explorer': () => import('./blockchain-explorer'),
};

export const getBreakdown = async (slug: string): Promise<BreakdownComponent | null> => {
  try {
    const breakdownLoader = breakdowns[slug];
    if (!breakdownLoader) {
      console.warn(`No breakdown found for slug: ${slug}`);
      return null;
    }
    return await breakdownLoader();
  } catch (error) {
    console.error(`Error loading breakdown for ${slug}:`, error);
    return null;
  }
};