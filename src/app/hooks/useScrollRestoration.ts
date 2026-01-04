import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_POSITION_KEY = 'homepage-scroll-position';

/**
 * Hook to restore scroll position when navigating back to homepage
 * and save scroll position when leaving homepage
 */
export function useScrollRestoration() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const hasRestoredRef = useRef(false);
  const scrollListenerRef = useRef<(() => void) | null>(null);
  const previousPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    // Save scroll position when navigating away from homepage
    if (previousPathRef.current === '/' && !isHomePage) {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0) {
        sessionStorage.setItem(SCROLL_POSITION_KEY, currentScrollY.toString());
      }
      hasRestoredRef.current = false;
    }

    previousPathRef.current = location.pathname;

    if (isHomePage) {
      // Restore scroll position when returning to homepage
      const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
      if (savedPosition && !hasRestoredRef.current) {
        const scrollY = parseInt(savedPosition, 10);
        // Use multiple delays to ensure DOM is ready and React has rendered
        const restoreScroll = () => {
          // Prevent any other scrolls from interfering
          window.scrollTo({
            top: scrollY,
            behavior: 'instant'
          });
          hasRestoredRef.current = true;
        };
        
        // Try multiple times to ensure it works
        let attempts = 0;
        const maxAttempts = 10;
        const attemptRestore = () => {
          attempts++;
          if (document.readyState === 'complete' && document.body) {
            restoreScroll();
            // Also restore after a short delay to override any other scrolls
            setTimeout(() => {
              window.scrollTo({
                top: scrollY,
                behavior: 'instant'
              });
            }, 100);
          } else if (attempts < maxAttempts) {
            setTimeout(attemptRestore, 20);
          }
        };
        
        // Start restoration attempts
        setTimeout(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              attemptRestore();
            });
          });
        }, 0);
      } else if (!savedPosition) {
        // If no saved position, ensure we're at top
        hasRestoredRef.current = true;
      }

      // Save scroll position when scrolling on homepage
      const handleScroll = () => {
        sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
      };

      scrollListenerRef.current = handleScroll;
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        if (scrollListenerRef.current) {
          window.removeEventListener('scroll', scrollListenerRef.current);
        }
      };
    }
  }, [isHomePage, location.pathname]);
}

