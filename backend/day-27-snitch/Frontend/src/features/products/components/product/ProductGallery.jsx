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

  if (images.length === 0) {
    return (
      <div className="aspect-3/4 w-full relative overflow-hidden">
        {fallbackPlaceholder}
      </div>
    );
  }

  const activeImage = images[activeImageIndex];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Primary Hero Image Viewport */}
      <div className="aspect-3/4 w-full bg-charcoal-900 overflow-hidden relative group border border-charcoal-800/20 select-none">
        <img
          src={activeImage?.url}
          alt={`${title} - View ${activeImageIndex + 1}`}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-102 ${
            isSwapping ? "opacity-40 blur-xs scale-98" : "opacity-100 blur-none scale-100"
          }`}
        />
        {/* Edge blending gradient */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-charcoal-950/40 to-transparent pointer-events-none z-10" />
      </div>

      {/* Thumbnail Selection Navigation */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <button
              key={img.id || index}
              onClick={() => handleThumbnailClick(index)}
              className={`aspect-3/4 w-full overflow-hidden bg-charcoal-900 transition-all duration-300 border focus:outline-none ${
                index === activeImageIndex
                  ? "border-gold-400/80 shadow-gold-glow"
                  : "border-charcoal-800/65 opacity-70 hover:opacity-100 hover:border-charcoal-600"
              }`}
            >
              <img
                src={img.url}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
