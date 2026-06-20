import React from "react";
import ListingActions from "./ListingActions.jsx";
import ImageCarousel from "../shared/ImageCarousel.jsx";

const ListingCard = ({ product, index = 0, onView, onEdit, onDelete }) => {
  const { productId, title, description, price, images = [] } = product;
  const displayPrice = price?.amount
    ? parseFloat(price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })
    : "0.00";

  return (
    <article 
      className="bg-charcoal-900 border border-charcoal-800 p-5 flex flex-col gap-5 select-none relative group premium-card-hover h-full animate-reveal"
      style={{ animationDelay: `${400 + index * 50}ms` }}
    >
      {/* Campaign Image Panel */}
      <ImageCarousel
        images={images}
        title={title}
        containerClassName="border border-charcoal-800/60 rounded-md"
        imageClassName="w-full h-full object-cover filter grayscale brightness-95 group-hover:grayscale-0 premium-image-zoom"
        arrowHoverOnly={false}
      >
        {/* Ambient top-bottom edge blending overlays */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-charcoal-950/60 to-transparent pointer-events-none z-10 opacity-60"></div>
        <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-charcoal-950/40 to-transparent pointer-events-none z-10 opacity-40"></div>

        {/* Subtle Hover Action Controls Overlay */}
        <ListingActions onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </ImageCarousel>

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
