import React from "react";
import ImageCarousel from "../shared/ImageCarousel.jsx";
import { useNavigate, Link } from "react-router";

const HomeProductCard = ({ product, index = 0, isParentRevealed = true }) => {
  const navigate = useNavigate();
  const { title, description, price, images = [] } = product;

  const displayPrice = price?.amount
    ? parseFloat(price.amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })
    : "0.00";

  return (
    <article
      className={`bg-charcoal-900 border border-charcoal-800 rounded-lg overflow-hidden flex flex-col select-none group premium-card-hover h-full relative ${
        isParentRevealed ? "animate-reveal" : "opacity-0"
      }`}
      style={{ animationDelay: `${300 + index * 50}ms` }}
    >
      {/* Invisible Link Overlay for native navigation, SEO, and mobile accessibility */}
      <Link
        to={`/product/${product.productId}`}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`View details for ${title}`}
      />
      {/* Image Panel */}
      <ImageCarousel
        images={images}
        title={title}
        imageClassName="w-full h-full object-cover filter grayscale-20 brightness-95 group-hover:grayscale-0 premium-image-zoom"
        arrowHoverOnly={true}
      >
        {/* Top-bottom edge blending */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-charcoal-950/50 to-transparent pointer-events-none z-10" />

        {/* View Details hover overlay button at the bottom of the image */}
        <div 
          className="absolute inset-x-0 bottom-0 bg-charcoal-950/85 backdrop-blur-xs border-t border-charcoal-800/60 py-2.5 text-center transition-all duration-300 z-20 cursor-pointer translate-y-0 opacity-100 lg:translate-y-full lg:opacity-0 lg:group-hover/image:translate-y-0 lg:group-hover/image:opacity-100 hover:bg-gold-400 hover:border-gold-400 group/btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.productId}`);
          }}
        >
          <span className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-gold-400 lg:group-hover/image:text-gold-100 group-hover/btn:text-charcoal-950 transition-colors duration-200">
            View Details
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
