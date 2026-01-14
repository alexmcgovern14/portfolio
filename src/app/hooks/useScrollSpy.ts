import { useState, useEffect, useRef } from 'react';

/**
 * Hook to track which section is currently in view (scroll spy)
 * @param sectionIds Array of section IDs to track
 * @param offsetTop Offset from top of viewport to consider section active (default: 150)
 * @returns Object with activeSection and isScrolled state
 */
export function useScrollSpy(
  sectionIds: string[],
  offsetTop: number = 150
): { activeSection: string; isScrolled: boolean } {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
  const [isScrolled, setIsScrolled] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Use requestAnimationFrame for smooth, throttled updates
      rafIdRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Header collapse logic with hysteresis to prevent jitter
        // Only update if scroll position meaningfully changed
        if (Math.abs(currentScrollY - lastScrollYRef.current) > 5) {
          setIsScrolled(currentScrollY > 20);
          lastScrollYRef.current = currentScrollY;
        }

        // Scroll spy logic
        // Improved scroll spy logic:
        // Find the section whose top edge is closest to (but still above) the offset point
        // This ensures we select the section that is most prominently in view
        let bestSection: string | null = null;
        let bestDistance = Infinity;

        for (const sectionId of sectionIds) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            
            // Section is visible if its top is above or at the offset point
            // and its bottom is below the offset point
            if (rect.top <= offsetTop && rect.bottom >= offsetTop) {
              // Calculate how close this section's top is to the offset
              const distance = offsetTop - rect.top;
              
              // Pick the section with the smallest distance (closest to offset)
              // This will be the section whose top just passed the offset line
              if (distance >= 0 && distance < bestDistance) {
                bestDistance = distance;
                bestSection = sectionId;
              }
            }
          }
        }

        // Update active section if we found one
        if (bestSection) {
          setActiveSection(bestSection);
        }
      });
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [sectionIds, offsetTop]);

  return { activeSection, isScrolled };
}
