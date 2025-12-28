import { useState, useEffect } from 'react';

/**
 * Hook to track scroll progress as a percentage (0-100)
 * @returns Scroll progress percentage
 */
export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress =
        documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}


