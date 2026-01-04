import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const handleScroll = () => {
      // Header collapse logic - collapse when user scrolls down even slightly
      setIsScrolled(window.scrollY > 20);

      // Scroll spy logic
      const currentSection = sectionIds.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= offsetTop && rect.bottom >= offsetTop;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offsetTop]);

  return { activeSection, isScrolled };
}




