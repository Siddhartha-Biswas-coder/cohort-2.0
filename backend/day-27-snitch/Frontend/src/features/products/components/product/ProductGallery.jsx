import React, { useState } from "react";

const ProductGallery = ({ images = [], title = "" }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);

  const fallbackPlaceholder = (
    <div className="w-full h-full flex items-center justify-center bg-charcoal-900 border border-charcoal-800">
      <svg
        className="w-12 h-12 text-charcoal-600 animate-pulse"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );

  const handleThumbnailClick = (index) => {
    if (index === activeImageIndex) return;
    setIsSwapping(true);
    setTimeout(() => {
      setActiveImageIndex(index);
      setIsSwapping(false);
    }, 250); // Soft fade out/in transition duration
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setIsSwapping(true);
    setTimeout(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
      setIsSwapping(false);
    }, 250);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setIsSwapping(true);
    setTimeout(() => {
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsSwapping(false);
    }, 250);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-3/4 w-full relative overflow-hidden">
        {fallbackPlaceholder}
      </div>
    );
  }

  const activeImage = images[activeImageIndex];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* Thumbnail Selection Navigation (Left Stack on Desktop, Row on Mobile) */}
      {images.length > 1 && (
        <div className="flex flex-row md:flex-col gap-3 shrink-0 w-full md:w-20 lg:w-24 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
          {images.map((img, index) => {
            const isSelected = index === activeImageIndex;
            return (
              <button
                key={img.id || index}
                onClick={() => handleThumbnailClick(index)}
                className={`aspect-3/4 w-16 md:w-full shrink-0 overflow-hidden bg-charcoal-900 transition-all duration-500 border focus:outline-none cursor-pointer ${
                  isSelected
                    ? "border-gold-400/80 shadow-gold-glow grayscale-0 opacity-100 contrast-[1.02] brightness-105"
                    : "border-charcoal-800/65 grayscale opacity-60 hover:grayscale-0 hover:opacity-90 hover:border-charcoal-600"
                }`}
              >
                <img
                  src={img.url}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Primary Hero Image Viewport */}
      <div className="grow aspect-3/4 bg-charcoal-900 overflow-hidden relative group border border-charcoal-800/20 select-none">
        <img
          src={activeImage?.url}
          alt={`${title} - View ${activeImageIndex + 1}`}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-102 ${
            isSwapping
              ? "opacity-40 blur-xs scale-98"
              : "opacity-100 blur-none scale-100"
          }`}
        />

        {/* Swipe Control Overlay Buttons (Only show when multiple images exist) */}
        {images.length > 1 && (
          <>
            {/* Left Button */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-charcoal-950/40 hover:bg-gold-400 hover:text-charcoal-950 text-white border border-white/10 flex items-center justify-center backdrop-blur-xs transition-all duration-300 opacity-0 group-hover:opacity-100 active:scale-90 cursor-pointer"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Button */}
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-charcoal-950/40 hover:bg-gold-400 hover:text-charcoal-950 text-white border border-white/10 flex items-center justify-center backdrop-blur-xs transition-all duration-300 opacity-0 group-hover:opacity-100 active:scale-90 cursor-pointer"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Edge blending gradient */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-charcoal-950/40 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};

export default ProductGallery;
