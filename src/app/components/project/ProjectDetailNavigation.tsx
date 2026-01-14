import { useEffect, useRef } from 'react';
import type { Project } from '../../types/project';
import { SECTION_CONTAINER, SECTION_PADDING } from './sectionStyles';



interface ProjectDetailNavigationProps {
 project: Project;
 slug: string;
 activeSection: string;
 scrollToSection: (sectionId: string) => void;
 images: string[];
 onImageClick: (index: number) => void;
}

export function ProjectDetailNavigation({ 
 project, 
 slug, 
 activeSection, 
 scrollToSection,
 images,
 onImageClick
}: ProjectDetailNavigationProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'skills', label: 'Skills used', show: slug === 'escape-the-rain' || slug === 'rag-ai-system' },
    { id: 'user-needs', label: 'User need', show: slug === 'live-match-summary' },
    { id: 'challenges', label: 'Challenges', show: slug === 'live-match-summary' },
    { id: 'constraints', label: 'Constraints', show: slug === 'live-match-summary' },
    { id: 'evaluations', label: 'Evaluations', show: slug === 'live-match-summary' },
    { id: 'challenge', label: 'Challenge', show: slug === 'lineup-insights' },
    { id: 'key-info', label: 'Key info', show: slug === 'lineup-insights' },
    { id: 'workflow', label: 'Workflow', show: slug === 'portfolio-website' },
    { id: 'workflows', label: 'System workflows', show: slug === 'rag-ai-system' },
    { id: 'prd', label: 'PRD', show: slug === 'escape-the-rain' || slug === 'rag-ai-system' || slug === 'spotify-recommendation-engine' },
  ].filter(item => item.show);

  const contentsRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = contentsRef.current;
    const placeholder = placeholderRef.current;
    if (!element || !placeholder || window.innerWidth < 1024) return;

    const STICKY_TOP = 48;
    let rafId: number;
    let originalWidth = 0;
    let originalOffsetTop = 0;

    const calculateDimensions = () => {
      if (!element) return;
      // Get the width from the parent container when in normal position
      element.style.position = 'relative';
      element.style.width = '';
      originalWidth = element.offsetWidth;
      const rect = element.getBoundingClientRect();
      originalOffsetTop = rect.top + window.pageYOffset;
    };

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        if (!element || !placeholder) {
          rafId = 0;
          return;
        }

        const scrollTop = window.pageYOffset;

        if (scrollTop >= originalOffsetTop - STICKY_TOP) {
          element.style.position = 'fixed';
          element.style.top = `${STICKY_TOP}px`;
          element.style.width = `${originalWidth}px`;
          placeholder.style.display = 'block';
          placeholder.style.height = `${element.offsetHeight}px`;
        } else {
          element.style.position = 'relative';
          element.style.top = '0';
          element.style.width = '';
          placeholder.style.display = 'none';
        }
        
        rafId = 0;
      });
    };

    const handleResize = () => {
      calculateDimensions();
      handleScroll();
    };

    // Initial calculations
    calculateDimensions();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

 return (
   <>
   <div ref={placeholderRef} style={{ display: 'none' }} />
   <div ref={contentsRef} className="pt-2 lg:pt-0" style={{ zIndex: 10 }}>
    <div 
     className={`${SECTION_CONTAINER.outer}`}
     style={{
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
     }}
    >
     <div className={`rounded-[22px] shadow-xl ${SECTION_PADDING.nav}`}
      style={{
       background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
      }}
     >
      {/* Contents Section */}
      <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white mb-4">
       Contents
      </h3>
      <nav className="space-y-2 mb-4 lg:mb-6" role="navigation" aria-label="Project sections">
       {navItems.map((item) => (
        <button
         key={item.id}
         onClick={() => scrollToSection(item.id)}
         className={`w-full text-left px-3 py-1 md:py-2 rounded-lg transition-colors ${
          activeSection === item.id
           ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
           : 'text-[#D6D6D6] font-normal hover:bg-gray-800/50 hover:text-gray-200'
         }`}
         aria-current={activeSection === item.id ? 'page' : undefined}
        >
         {item.label}
        </button>
       ))}
      </nav>

      {/* Images Section */}
      {images.length > 0 && (
        <div>
        <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white mb-4 mt-6 hidden lg:block">
         Images
        </h3>
        <div className="relative">
         <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-2 lg:max-h-[300px] lg:overflow-y-auto lg:overflow-x-hidden">
         {images.map((src, index) => (
          <button
           key={index}
           onClick={() => onImageClick(index)}
           className="relative rounded-lg overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors group w-[calc((50vw-24px)*9/16)] h-[calc((50vw-24px)*9/16)] lg:aspect-video lg:w-full lg:h-auto flex-shrink-0 snap-start lg:snap-none"
          >
           <img
            src={src}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            loading="lazy"
           />
          </button>
         ))}
         </div>
        </div>
        </div>
      )}
     </div>
    </div>
   </div>
   </>
 );
}
