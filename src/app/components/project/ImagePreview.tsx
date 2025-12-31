import React from 'react';

interface ImagePreviewProps {
  images: string[];
  onImageClick: (index: number) => void;
}

export function ImagePreview({ images, onImageClick }: ImagePreviewProps) {
  return (
    <>
      {/* Desktop: Sticky grid below contents */}
      <div className="hidden lg:block lg:mt-6">
        <div 
          className="rounded-[24px] p-[2px] shadow-xl"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
          }}
        >
          <div 
            className="rounded-[22px] p-4 shadow-xl"
            style={{
              background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
            }}
          >
            <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-lg text-white mb-4">
              Images
            </h3>
            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
              {images.map((src, index) => (
                <button
                  key={index}
                  onClick={() => onImageClick(index)}
                  className="relative aspect-video rounded-lg overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors group"
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
      </div>

      {/* Mobile: Horizontal carousel at bottom of contents */}
      <div className="lg:hidden mt-6">
        <div 
          className="rounded-[24px] p-[2px] shadow-xl"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
          }}
        >
          <div 
            className="rounded-[22px] p-4 shadow-xl"
            style={{
              background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
            }}
          >
            <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-sm text-white mb-3">
              Images
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
              {images.map((src, index) => (
                <button
                  key={index}
                  onClick={() => onImageClick(index)}
                  className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors"
                >
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
