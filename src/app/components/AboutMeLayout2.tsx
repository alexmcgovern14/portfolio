import { SkillCard } from './shared/SkillCard';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import speakingPhoto from '../../assets/cd4d8a7e0af8ec1d891cf525a50981ef1d4a3940.png';

interface AboutMeLayout2Props {
  skills: Array<{
    title: string;
    description: string;
  }>;
}

export function AboutMeLayout2({ skills }: AboutMeLayout2Props) {
  // Use first 4 skills for this layout
  const displaySkills = skills.slice(0, 4);
  
  // Refs to match image height to job card height
  const jobCardRef = useRef<HTMLDivElement>(null);
  const jobCardInnerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if we're on desktop (lg breakpoint = 1024px)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useLayoutEffect(() => {
    const updateImageHeight = () => {
      if (jobCardInnerRef.current) {
        // Measure the inner content div height plus the 2px padding on each side (4px total)
        const contentHeight = jobCardInnerRef.current.offsetHeight;
        const padding = 4; // 2px top + 2px bottom
        setImageHeight(contentHeight + padding);
      } else if (jobCardRef.current) {
        // Fallback to measuring the wrapper
        setImageHeight(jobCardRef.current.offsetHeight);
      }
    };

    // Initial measurement with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateImageHeight, 0);
    
    // Use ResizeObserver for more reliable updates
    const resizeObserver = new ResizeObserver(() => {
      updateImageHeight();
    });
    
    if (jobCardInnerRef.current) {
      resizeObserver.observe(jobCardInnerRef.current);
    }
    
    // Also listen to window resize
    window.addEventListener('resize', updateImageHeight);
    
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateImageHeight);
    };
  }, []);

  return (
    <section className="min-h-screen py-10 md:py-20 px-4 md:px-8 lg:px-32 bg-[#7a7573]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-4xl md:text-6xl text-white mb-[31px] px-3 md:px-0">
          AI product management
        </h2>
        <p className="text-[#D6D6D6] mb-8 md:mb-16 font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed px-3 md:px-0">
          Leading AI product development at LiveScore, from <strong className="text-white">concept to production.</strong>
        </p>
        
        {/* New Layout: Job overview card + Speaking photo (row 1) → 4 skill cards (row 2) */}
        <div className="space-y-8">
          {/* Row 1: Job Overview Card + Speaking Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Job Overview Card */}
            <div 
              ref={jobCardRef}
              className="rounded-[24px] shadow-xl relative flex flex-col hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-out"
              style={{
                background: 'linear-gradient(to bottom right, rgba(122, 202, 255, 1), rgba(103, 255, 194, 0))',
                padding: '2px',
                alignSelf: 'start',
                height: 'fit-content',
              }}
            >
              <div ref={jobCardInnerRef} className="bg-[#5a5452] rounded-[22px] p-8 relative z-10">
              <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl md:text-[40px] text-white mb-4">
                Senior product manager, LiveScore
              </h3>
              <p className="text-[#D6D6D6] mb-6" style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px' }}>
                London, UK
              </p>
              <div className="text-[#D6D6D6] text-base md:text-[16px] leading-relaxed space-y-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                <p>
                  Leading product strategy, delivery, and adoption of <strong className="text-white">Artificial Intelligence</strong> at LiveScore.
                </p>
                <p>
                  I focus on building <strong className="text-white">engaging user experiences</strong> and have led the development of some of LiveScore's <strong className="text-white">most innovative</strong> and <strong className="text-white">high-retention</strong> features.
                </p>
                <p>
                  Passionate about emerging technologies, industry trends and multidisciplinary design, with a belief in <strong className="text-white">continuous learning.</strong>
                </p>
              </div>
              </div>
            </div>

            {/* Speaking Photo */}
            <div 
              ref={imageContainerRef}
              className="rounded-[24px] shadow-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-out"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.3)',
                height: isDesktop && imageHeight ? `${imageHeight}px` : 'auto',
              }}
            >
              <img 
                src={speakingPhoto}
                alt="Speaking at an event"
                className="w-full h-auto lg:h-full object-contain lg:object-cover rounded-[22px]"
              />
            </div>
          </div>
          
          {/* Row 2: 4 Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displaySkills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}