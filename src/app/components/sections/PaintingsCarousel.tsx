import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { paintings } from '../../data/paintings';
import useEmblaCarousel from 'embla-carousel-react';

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

// Mobile carousel component using embla-carousel
function SimpleMobileCarousel() {
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    dragFree: false,
    containScroll: 'trimSnaps',
    skipSnaps: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <div className="mobile-paintings-carousel pb-16">
      <style>{`
        .mobile-paintings-carousel .embla {
          overflow: hidden;
          width: 100%;
        }
        .mobile-paintings-carousel .embla__viewport {
          overflow: hidden;
          width: 100%;
        }
        .mobile-paintings-carousel .embla__container {
          display: flex;
          touch-action: pan-x;
        }
        .mobile-paintings-carousel .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
          display: flex;
          justify-content: center;
          align-items: center;
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
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {paintings.map((painting, index) => (
              <div key={index} className="embla__slide">
                <div className="flex justify-center w-full">
                  <div className="rounded-[24px] p-[2px] shadow-2xl w-[90%]" style={{
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
        </div>
      </div>
      <div className="mobile-paintings-carousel-dots">
        {paintings.map((_, index) => (
          <button
            key={index}
            className={`mobile-paintings-carousel-dot ${index === selectedIndex ? 'active' : ''}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function PaintingsCarousel() {
  
  const isMobile = useIsMobile();

  return (
    <div className="pb-16 overflow-visible">
      {isMobile ? (
        <SimpleMobileCarousel />
      ) : (
        <>
          <style>{`
            .paintings-carousel .slick-list {
              overflow: visible !important;
            }
            .paintings-carousel .slick-track {
              display: flex !important;
              align-items: center;
            }
            .paintings-carousel .slick-slide[aria-hidden="true"] * {
              pointer-events: none !important;
            }
            .paintings-carousel .slick-slide[aria-hidden="true"] *[tabindex] {
              tabindex: -1 !important;
            }
            .paintings-carousel .slick-slide[aria-hidden="true"] *:focus {
              outline: none !important;
            }
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
                margin: 0 48px !important;
              }
            }
            .paintings-carousel .slick-slide.slick-active {
              opacity: 1;
              transform: scale(1);
            }
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
            .paintings-carousel .slick-dots li button::before {
              display: none !important;
              content: none !important;
            }
            .paintings-carousel .slick-dots li button::after {
              display: none !important;
              content: none !important;
            }
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
        </>
      )}
    </div>
  );
}
