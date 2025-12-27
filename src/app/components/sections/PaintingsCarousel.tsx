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
  centerPadding: '80px',
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerPadding: '40px',
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
        .paintings-carousel .slick-dots {
          display: flex !important;
          gap: 8px;
          justify-content: center;
          list-style: none;
          padding: 0;
          margin-top: 40px;
          position: relative;
          bottom: 0;
        }
        .paintings-carousel .slick-dots li {
          margin: 0;
          padding: 0;
          width: auto;
          height: auto;
        }
        .paintings-carousel .slick-dots li button {
          background-color: #6b7280;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          padding: 0;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0;
          line-height: 0;
          color: transparent;
        }
        .paintings-carousel .slick-dots li button:hover {
          background-color: #9ca3af;
        }
        .paintings-carousel .slick-dots li.slick-active button {
          background-color: #ffffff;
          width: 8px;
          height: 8px;
        }
      `}</style>
      <div className="paintings-carousel">
        <Suspense fallback={<div className="flex justify-center items-center h-[480px]"><div className="text-white">Loading carousel...</div></div>}>
          <Slider {...carouselSettings}>
            {paintings.map((painting, index) => (
              <div key={index}>
                <div className="flex justify-center" style={{ margin: '0 8px' }}>
                  <img 
                    src={painting} 
                    alt={`Digital painting ${index + 1}`}
                    className="w-[480px] h-[480px] object-cover rounded-2xl shadow-2xl border-2 border-white/30"
                    loading="lazy"
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

