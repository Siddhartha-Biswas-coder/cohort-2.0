import React, { useState } from "react";

const ImageCarousel = ({
  images = [],
  title,
  containerClassName = "",
  imageClassName = "",
  arrowHoverOnly = true,
  children,
}) => {
  const imageCount = images.length;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");

  if (imageCount === 0) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal-950">
        <div className="w-10 h-10 rounded-full border border-gold-400/10 flex items-center justify-center mb-2 text-gold-400/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="font-display text-[8px] tracking-[0.3em] text-charcoal-600 font-bold uppercase">
          No Media
        </span>
      </div>
    );
  }

  const goNext = (e) => {
    e.stopPropagation();
    setSlideDirection("right");
    setCurrentImageIndex((prev) => (prev + 1) % imageCount);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setSlideDirection("left");
    setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  const arrowOpacityClass = arrowHoverOnly ? "opacity-0 group-hover:opacity-100" : "opacity-100";

  return (
    <div className={`aspect-3/4 w-full bg-charcoal-950 relative overflow-hidden ${containerClassName}`}>
      {/* Slide animation keyframes */}
      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(8%); opacity: 0; }
          to   { transform: translateX(0);  opacity: 1; }
        }
        @keyframes slideInFromLeft {
          from { transform: translateX(-8%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>
      <img
        key={currentImageIndex}
        src={images[currentImageIndex].url}
        alt={title}
        className={`${imageClassName} animate-image-reveal`}
        style={{
          animation: imageCount > 1
            ? `${slideDirection === "right" ? "slideInFromRight" : "slideInFromLeft"} 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`
            : undefined,
        }}
      />
      
      {/* Navigation arrows */}
      {imageCount > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1.5 cursor-pointer hover:bg-black/60 hover:scale-110 hover:border hover:border-white/20 transition-all duration-200 z-20 ${arrowOpacityClass}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1.5 cursor-pointer hover:bg-black/60 hover:scale-110 hover:border hover:border-white/20 transition-all duration-200 z-20 ${arrowOpacityClass}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Image count badge */}
      {imageCount > 0 && (
        <div className="absolute top-4 right-4 bg-charcoal-950/80 border border-charcoal-800/80 backdrop-blur-xs px-2 py-1 rounded-sm z-25 flex flex-col items-center gap-0.5">
          <span className="text-[8px] text-charcoal-400 font-display tracking-widest font-semibold uppercase select-none">
            {imageCount} {imageCount === 1 ? "Photo" : "Photos"}
          </span>
          {imageCount > 1 && (
            <div className="flex gap-1.5 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {Array.from({ length: imageCount }).map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-200 ${
                    i === currentImageIndex ? "w-3 bg-gold-400" : "w-2 bg-charcoal-700"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom children (e.g. actions/overlays) */}
      {children}
    </div>
  );
};

export default ImageCarousel;
