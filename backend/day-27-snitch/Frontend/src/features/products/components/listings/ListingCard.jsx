import React, { useState } from "react";
import ListingActions from "./ListingActions.jsx";

const ListingCard = ({ product, onView, onEdit, onDelete }) => {
  const { productId, title, description, price, images = [] } = product;
  const imageCount = images.length;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");
  const currentImageUrl = imageCount > 0 ? images[currentImageIndex].url : null;
  // const mainImageUrl = imageCount > 0 ? images[0].url : null; // Removed unused variable
  const displayPrice = price?.amount
    ? parseFloat(price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })
    : "0.00";

  const goNext = () => {
    setSlideDirection("right");
    setCurrentImageIndex((prev) => (prev + 1) % imageCount);
  };

  const goPrev = () => {
    setSlideDirection("left");
    setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  return (
    <article className="bg-charcoal-900 border border-charcoal-800 p-5 flex flex-col gap-5 select-none relative group transition-all duration-500 rounded-lg hover:border-charcoal-700/60 h-full">
      {/* Campaign Image Panel */}
        <div className="aspect-3/4 w-full bg-charcoal-950 relative overflow-hidden border border-charcoal-800/60 rounded-md">
          {imageCount > 0 ? (
            <>
              {/* Slide animation keyframes — injected once per card */}
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
                className="w-full h-full object-cover filter grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-[1.015] transition-[filter] duration-1200 ease-in-out"
                style={{
                  animation: imageCount > 1
                    ? `${slideDirection === "right" ? "slideInFromRight" : "slideInFromLeft"} 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`
                    : undefined,
                }}
              />
              {imageCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1.5 cursor-pointer hover:bg-black/60 hover:scale-110 hover:border hover:border-white/20 transition-all duration-200 z-20"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1.5 cursor-pointer hover:bg-black/60 hover:scale-110 hover:border hover:border-white/20 transition-all duration-200 z-20"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-charcoal-950">
              <div className="w-10 h-10 rounded-full border border-gold-400/10 flex items-center justify-center mb-2 text-gold-400/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-display text-[8px] tracking-[0.3em] text-charcoal-600 font-bold uppercase">
                No Media
              </span>
            </div>
          )}

        {/* Ambient top-bottom edge blending overlays */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-charcoal-950/60 to-transparent pointer-events-none z-10 opacity-60"></div>
        <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-charcoal-950/40 to-transparent pointer-events-none z-10 opacity-40"></div>

        {/* Dynamic Image Count Badge & Horizontal Dash Indicator */}
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

        {/* Subtle Hover Action Controls Overlay */}
        <ListingActions onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </div>

      {/* Copy Details */}
      <div className="flex flex-col grow justify-between gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-display text-sm font-light text-charcoal-200 tracking-wide uppercase line-clamp-1 leading-snug">
              {title}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-sans text-[10px] text-gold-400 tracking-wider font-semibold">
                {price?.currency || "INR"}
              </span>
              <span className="font-display text-sm text-gold-400 font-medium tracking-tight ml-0.5">
                {displayPrice}
              </span>
            </div>
          </div>
          <p className="font-sans text-xs text-charcoal-500 font-light leading-relaxed line-clamp-2 select-none">
            {description}
          </p>
        </div>

        {/* Footer listing id metadata */}
        <div className="border-t border-charcoal-800/40 pt-3 flex justify-between items-center text-[8px] font-display font-semibold tracking-widest text-charcoal-600 uppercase">
          <span>Listing ID:</span>
          <span className="font-sans font-normal lowercase tracking-normal">
            {productId ? productId.substring(0, 10) + "..." : "draft"}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ListingCard;
