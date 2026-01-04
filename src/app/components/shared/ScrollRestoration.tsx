import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_POSITION_KEY = 'homepage-scroll-position';

/**
 * Component that handles scroll restoration for the homepage
 * This runs after React Router's default behavior
 */
export function ScrollRestoration() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
      if (savedPosition) {
        const scrollY = parseInt(savedPosition, 10);
        
        // Restore after a delay to ensure it happens after any default scrolls
        const restoreScroll = () => {
          window.scrollTo({
            top: scrollY,
            behavior: 'instant'
          });
        };

        // Try multiple times to override any default scroll behavior
        setTimeout(restoreScroll, 0);
        setTimeout(restoreScroll, 50);
        setTimeout(restoreScroll, 100);
        setTimeout(restoreScroll, 200);
      }
    }
  }, [isHomePage, location.pathname]);

  return null;
}

