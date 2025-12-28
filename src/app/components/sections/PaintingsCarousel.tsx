import { lazy, Suspense } from 'react';
import { paintings } from '../../data/paintings';

// Lazy load react-slick only when carousel is needed
const Slider = lazy(() => import('react-slick').then(m => ({ default: m.default })));

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '240px', // Reduced padding to bring images closer together
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerPadding: '60px',
      }
    }
  ],
  beforeChange: (current: number, next: number) => {},
};

export function PaintingsCarousel() {
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
        .paintings-carousel .slick-slide {
          opacity: 0.5;
          transition: opacity 0.3s ease, transform 0.3s ease;
          transform: scale(0.85);
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
          margin: 40px 0 0 0 !important;
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
          background-color: #6b7280 !important;
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
          background-color: #9ca3af !important;
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
          <Slider {...carouselSettings} aria-label="Paintings carousel">
            {paintings.map((painting, index) => (
              <div key={index}>
                <div className="flex justify-center">
                  <img 
                    src={painting} 
                    alt={`Digital painting ${index + 1}`}
                    className="w-[520px] h-[520px] object-cover rounded-2xl shadow-2xl border-2 border-white/30"
                    loading="lazy"
                    width="520"
                    height="520"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </Suspense>
      </div>
    </div>
  );
}

