import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { paintings } from '../../data/paintings';

// Lazy load react-slick only when carousel is needed
const Slider = lazy(() => import('react-slick').then(m => ({ default: m.default })));

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true, // Enabled by default for desktop
  centerPadding: '192px', // Desktop padding (reduced by 20%)
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerMode: true,
        centerPadding: '48px',
      }
    },
    {
      breakpoint: 640,
      settings: {
        centerMode: false,
        centerPadding: '0px',
        infinite: false, // Disable infinite on mobile to prevent cloned slide issues
      }
    }
  ],
  beforeChange: (current: number, next: number) => {},
};

// Hook to detect mobile screen size
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    // Check on mount
    checkMobile();
    
    // Check on resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}

// Simple CSS-only carousel for mobile
function SimpleMobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const slideWidth = container.clientWidth;
    const newIndex = Math.round(scrollLeft / slideWidth);
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const slideWidth = container.clientWidth;
    container.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="mobile-paintings-carousel pb-16">
      <style>{`
        .mobile-paintings-carousel-scroll {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          gap: 0;
          padding: 0;
        }
        .mobile-paintings-carousel-scroll::-webkit-scrollbar {
          display: none;
        }
        .mobile-paintings-carousel-slide {
          flex: 0 0 90%;
          scroll-snap-align: center;
          scroll-snap-stop: always;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 5%;
        }
        .mobile-paintings-carousel-slide > div {
          width: 100%;
          max-width: 100%;
        }
        .mobile-paintings-carousel-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 20px;
        }
        .mobile-paintings-carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background-color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: background-color 0.3s ease;
          padding: 0;
        }
        .mobile-paintings-carousel-dot.active {
          background-color: #ffffff;
        }
      `}</style>
      <div
        ref={scrollContainerRef}
        className="mobile-paintings-carousel-scroll"
        onScroll={handleScroll}
      >
        {paintings.map((painting, index) => (
          <div key={index} className="mobile-paintings-carousel-slide">
            <div className="flex justify-center w-full">
              <div className="rounded-[24px] p-[2px] shadow-2xl w-full" style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
              }}>
                <div className="rounded-[22px] overflow-hidden w-full">
                  <img
                    src={painting}
                    alt={`Digital painting ${index + 1}`}
                    className="w-full h-auto aspect-[530/585] object-cover rounded-[22px] shadow-2xl"
                    loading="lazy"
                    width="530"
                    height="585"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mobile-paintings-carousel-dots">
        {paintings.map((_, index) => (
          <button
            key={index}
            className={`mobile-paintings-carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function PaintingsCarousel() {
  const isMobile = useIsMobile();

  // Render simple CSS carousel on mobile, react-slick on desktop
  if (isMobile) {
    return <SimpleMobileCarousel />;
  }

  return (
    <div className="pb-16 overflow-visible">
      <style>{`
        .paintings-carousel .slick-list {
          overflow: visible !important;
        }
        .paintings-carousel .slick-track {
          display: flex !important;
          align-items: center;
        }
        /* Fix aria-hidden and focus issues - handle ALL hidden slides */
        /* Make all elements in hidden slides non-interactive */
        .paintings-carousel .slick-slide[aria-hidden="true"] * {
          pointer-events: none !important;
        }
        /* Remove any tabindex from elements in hidden slides */
        .paintings-carousel .slick-slide[aria-hidden="true"] *[tabindex] {
          tabindex: -1 !important;
        }
        /* Prevent focus on any element in hidden slides */
        .paintings-carousel .slick-slide[aria-hidden="true"] *:focus {
          outline: none !important;
        }
        /* Make the slide container itself non-interactive */
        .paintings-carousel .slick-slide[aria-hidden="true"] {
          pointer-events: none !important;
        }
        .paintings-carousel .slick-slide {
          opacity: 0.5;
          transition: opacity 0.3s ease, transform 0.3s ease;
          transform: scale(0.85);
        }
        @media (min-width: 1280px) {
          .paintings-carousel .slick-slide:not(.slick-active) {
            margin: 0 48px !important; /* 96px total gap between slides */
          }
        }
        .paintings-carousel .slick-slide.slick-active {
          opacity: 1;
          transform: scale(1);
        }
        /* Hide all default slick dots styling */
        .paintings-carousel .slick-dots,
        .paintings-carousel ul.slick-dots {
          display: flex !important;
          gap: 8px;
          justify-content: center;
          list-style: none !important;
          padding: 0 !important;
          margin: 20px 0 0 0 !important;
          position: relative !important;
          bottom: 0 !important;
          width: 100% !important;
        }
        .paintings-carousel .slick-dots li,
        .paintings-carousel ul.slick-dots li {
          margin: 0 !important;
          padding: 0 !important;
          width: auto !important;
          height: auto !important;
          position: relative !important;
        }
        .paintings-carousel .slick-dots li button,
        .paintings-carousel ul.slick-dots li button {
          background-color: rgba(255, 255, 255, 0.3) !important;
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          padding: 0 !important;
          border: none !important;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0 !important;
          line-height: 0 !important;
          color: transparent !important;
          text-indent: -9999px !important;
          overflow: hidden !important;
        }
        .paintings-carousel .slick-dots li button:hover,
        .paintings-carousel ul.slick-dots li button:hover {
          background-color: rgba(255, 255, 255, 0.5) !important;
        }
        .paintings-carousel .slick-dots li.slick-active button,
        .paintings-carousel ul.slick-dots li.slick-active button {
          background-color: #ffffff !important;
          width: 8px !important;
          height: 8px !important;
        }
        /* Hide any duplicate dots from theme */
        .paintings-carousel .slick-dots li button::before {
          display: none !important;
          content: none !important;
        }
        /* Ensure only one set of dots */
        .paintings-carousel .slick-dots li button::after {
          display: none !important;
          content: none !important;
        }
        /* Override slick-theme.css completely */
        .paintings-carousel .slick-dots li button:before {
          display: none !important;
          opacity: 0 !important;
        }
      `}</style>
      <div className="paintings-carousel" role="region" aria-label="Digital paintings carousel">
        <Suspense fallback={<div className="flex justify-center items-center h-[480px]"><div className="text-white">Loading carousel...</div></div>}>
          <Slider key="paintings-carousel-desktop" {...carouselSettings} aria-label="Paintings carousel">
            {paintings.map((painting, index) => (
              <div key={index}>
                <div className="flex justify-center w-full md:w-auto">
                  <div className="rounded-[24px] p-[2px] shadow-2xl w-[90%] md:w-auto md:inline-block" style={{
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
                  }}
                  >
                    <div className="rounded-[22px] overflow-hidden w-full">
                      <img
                        src={painting}
                        alt={`Digital painting ${index + 1}`}
                        className="w-full h-auto aspect-[530/585] md:w-[520px] md:h-[562px] md:aspect-auto object-cover rounded-[22px] shadow-2xl"
                        loading="lazy"
                        width="530"
                        height="585"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </Suspense>
      </div>
    </div>
  );
}

