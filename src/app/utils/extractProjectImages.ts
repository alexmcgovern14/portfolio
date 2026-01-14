import type { Project } from '../types/project';

/**
 * Extracts all images from a project in the order they appear on the page
 * Includes: cover image + all images from content (deduplicated)
 */
export function extractProjectImages(project: Project, slug: string): string[] {
  const images: string[] = [];
  const seen = new Set<string>();

  // Helper to normalize image path (remove query strings from Vite)
  const normalizePath = (src: string): string => {
    try {
      const url = new URL(src, window.location.origin);
      // Use pathname without query string for comparison
      return url.pathname;
    } catch {
      // If not a valid URL, just remove query string
      return src.split('?')[0];
    }
  };

  // Helper to add image if not seen (using normalized path for deduplication)
  const addImage = (src: string | undefined) => {
    if (!src) return;
    const normalizedSrc = normalizePath(src);
    if (!seen.has(normalizedSrc)) {
      images.push(src);
      seen.add(normalizedSrc);
    }
  };

  // Add cover image first (if it exists)
  addImage(project.imageUrl);

  // Extract images from markdown content
  const extractFromMarkdown = (content: string | undefined) => {
    if (!content) return [];
    const found: string[] = [];
    
    // Match markdown image syntax: ![alt](src)
    const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
    let match;
    while ((match = markdownImageRegex.exec(content)) !== null) {
      const src = match[1];
      if (src) {
        const normalizedSrc = normalizePath(src);
        if (!seen.has(normalizedSrc)) {
          found.push(src);
          seen.add(normalizedSrc);
        }
      }
    }
    return found;
  };

  // Extract from overview (in order)
  const overviewImages = extractFromMarkdown(project.overview);
  images.push(...overviewImages);

  // Add project-specific images in order they appear on page
  if (slug === 'live-match-summary') {
    // productionImage appears in overview before Ownership section
    addImage(project.productionImage);
    // conceptImage appears after overview
    addImage(project.conceptImage);
  } else if (slug === 'spotify-recommendation-engine') {
    // playlistImage appears in overview
    addImage(project.playlistImage);
  } else if (slug === 'lineup-changes') {
    // productionImage appears at end of overview
    addImage(project.productionImage);
  } else if (slug === 'escape-the-rain') {
    // Mobile and desktop screenshots appear in Product Overview section
    addImage('/src/assets/Escape the rain mobile.png');
    addImage('/src/assets/Escape the rain desktop.png');
  }

  // Extract from PRD (for workflow images in rag-ai-system)
  if ((slug === 'rag-ai-system' || slug === 'portfolio-website') && project.prd) {
    const prdImages = extractFromMarkdown(project.prd);
    images.push(...prdImages);
  }

  // Add workflow images for rag-ai-system
  if (slug === 'rag-ai-system') {
    addImage(project.workflowImage1);
    addImage(project.workflowImage2);
  }

  // Extract from other text fields (these typically don't have images, but just in case)
  extractFromMarkdown(project.skills).forEach(addImage);
  extractFromMarkdown(project.keyInfo).forEach(addImage);
  extractFromMarkdown(project.challenge).forEach(addImage);
  extractFromMarkdown(project.constraints).forEach(addImage);
  extractFromMarkdown(project.evaluations).forEach(addImage);

  return images;
}