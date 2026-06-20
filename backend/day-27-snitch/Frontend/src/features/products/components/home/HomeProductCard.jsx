import React from "react";
import ImageCarousel from "../shared/ImageCarousel.jsx";
import { useNavigate } from "react-router";

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
      className={`bg-charcoal-900 border border-charcoal-800 rounded-lg overflow-hidden flex flex-col select-none group premium-card-hover h-full ${
        isParentRevealed ? "animate-reveal" : "opacity-0"
      }`}
      style={{ animationDelay: `${300 + index * 50}ms` }}
    >
      {/* Image Panel */}
      <ImageCarousel
        images={images}
        title={title}
        imageClassName="w-full h-full object-cover filter grayscale-20 brightness-95 group-hover:grayscale-0 premium-image-zoom"
        arrowHoverOnly={true}
      >
        {/* Top-bottom edge blending */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-charcoal-950/50 to-transparent pointer-events-none z-10" />

        {/* View Product hover overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-charcoal-950/0 group-hover/image:bg-charcoal-950/30 transition-all duration-500 z-5 pointer-events-auto cursor-pointer"
          onClick={() => navigate(`/product/${product.productId}`)}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-charcoal-900/90 border border-gold-400/80 text-gold-400 shadow-gold-glow opacity-0 scale-95 group-hover/image:opacity-100 group-hover/image:scale-100 hover:bg-gold-400 hover:text-charcoal-950 hover:border-gold-400 hover:scale-105 hover:shadow-gold-glow-strong transition-all duration-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
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
