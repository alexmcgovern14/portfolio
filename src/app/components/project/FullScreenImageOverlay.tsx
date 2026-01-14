import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface FullScreenImageOverlayProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function FullScreenImageOverlay({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: FullScreenImageOverlayProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // useRef for double-tap detection
  const lastTapRef = useRef(0);

  // Reset zoom/pan when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        onNavigate(prevIndex);
      } else if (e.key === 'ArrowRight') {
        const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        onNavigate(nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      // Prevent wheel events globally
      const preventScroll = (e: WheelEvent) => {
        e.preventDefault();
      };
      
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      
      return () => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
      };
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  // Mouse drag handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && scale > 1) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    // Always return a cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, scale]);

  if (!isOpen || images.length === 0) return null;

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle zoom on click (desktop)
    if (scale === 1) {
      setScale(2);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Handle double tap to zoom on mobile
  const handleImageTouchEnd = (e: React.TouchEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      e.preventDefault();
      if (scale === 1) {
        setScale(2);
        setPosition({ x: 0, y: 0 });
      } else {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    }
    lastTapRef.current = now;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-sm overflow-hidden"
      onClick={onClose}
      onTouchMove={(e) => e.preventDefault()}
      style={{ touchAction: 'none', overscrollBehavior: 'none' }}
    >
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {images.length > 1 && (
        <div className="absolute inset-0 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
              onNavigate(prevIndex);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors z-10 pointer-events-auto"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
              onNavigate(nextIndex);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors z-10 pointer-events-auto"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <div
        className="relative"
        onWheel={handleWheel}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-[90vw] max-h-[90vh] object-contain select-none rounded-2xl"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            transition: isDragging ? 'none' : 'transform 0.2s',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleImageClick(e);
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={(e) => {
            handleTouchEnd();
            handleImageTouchEnd(e);
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
