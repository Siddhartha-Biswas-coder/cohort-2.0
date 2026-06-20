import React from "react";
import ImageCarousel from "../shared/ImageCarousel.jsx";

const HomeProductCard = ({ product }) => {
  const { title, description, price, images = [] } = product;

  const displayPrice = price?.amount
    ? parseFloat(price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })
    : "0.00";

  return (
    <article className="bg-charcoal-900 border border-charcoal-800 rounded-lg overflow-hidden flex flex-col select-none group transition-all duration-500 hover:border-charcoal-700/60 hover:shadow-card-glow h-full">
      {/* Image Panel */}
      <ImageCarousel
        images={images}
        title={title}
        imageClassName="w-full h-full object-cover filter grayscale-20 brightness-95 group-hover:grayscale-0 group-hover:scale-[1.03] transition-[filter] duration-1000 ease-out"
        arrowHoverOnly={true}
      >
        {/* Top-bottom edge blending */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-charcoal-950/50 to-transparent pointer-events-none z-10" />

        {/* View Product hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal-950/0 group-hover:bg-charcoal-950/30 transition-all duration-500 z-5">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
            View Product
          </span>
        </div>
      </ImageCarousel>

      {/* Product Details */}
      <div className="p-5 flex flex-col grow gap-3">
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
        <p className="font-sans text-xs text-charcoal-500 font-light leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </article>
  );
};

export default HomeProductCard;
