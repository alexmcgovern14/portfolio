// Shared styling constants for project detail sections
// Mobile-first: px-4 (16px) on mobile, px-8 (32px) on desktop
export const SECTION_PADDING = {
  // Inner padding for section content containers (full padding all sides)
  content: 'px-4 md:px-8 py-4 md:py-8',
  // Header padding (for PRD header section)
  header: 'px-4 md:px-8 py-4 md:py-6',
  // Navigation padding (with special bottom padding)
  nav: 'p-4 md:p-8 pb-4 md:pb-6 lg:pb-8',
} as const;

// Shared container classes
export const SECTION_CONTAINER = {
  // Outer gradient border container
  outer: 'rounded-[24px] p-[2px] shadow-xl',
  // Inner content container with padding
  inner: `rounded-[22px] shadow-xl ${SECTION_PADDING.content}`,
} as const;
