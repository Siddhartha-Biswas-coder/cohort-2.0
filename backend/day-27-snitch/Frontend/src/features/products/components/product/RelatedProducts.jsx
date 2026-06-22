import React from "react";
import HomeProductCard from "../home/HomeProductCard.jsx";

const RelatedProducts = ({ products = [], isRevealed = true }) => {
  // If we have actual products, render them
  if (products && products.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <HomeProductCard
            key={product.productId || product._id || index}
            product={product}
            index={index}
            isParentRevealed={isRevealed}
          />
        ))}
      </div>
    );
  }

  // Fallback: 3 Luxury Shimmering Skeleton Cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 select-none">
      {[1, 2, 3].map((item, index) => (
        <article
          key={item}
          className="bg-charcoal-900 border border-charcoal-800/40 rounded-lg overflow-hidden flex flex-col premium-card-hover h-full opacity-0 animate-reveal"
          style={{ animationDelay: `${300 + index * 100}ms` }}
        >
          {/* Skeleton Gallery Aspect Box */}
          <div className="aspect-3/4 w-full bg-charcoal-950/60 relative overflow-hidden flex items-center justify-center border-b border-charcoal-850/50">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-charcoal-800/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            <svg className="w-8 h-8 text-charcoal-700 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Skeleton Details */}
          <div className="p-5 flex flex-col grow gap-3 bg-charcoal-900">
            <div className="flex justify-between items-start gap-4">
              {/* Title shape */}
              <div className="h-4 bg-charcoal-800/80 rounded-xs w-3/5 animate-pulse" />
              {/* Price shape */}
              <div className="h-4 bg-charcoal-800/60 rounded-xs w-1/4 animate-pulse" />
            </div>
            {/* Description shape */}
            <div className="space-y-1.5 mt-1">
              <div className="h-3 bg-charcoal-800/40 rounded-xs w-full animate-pulse" />
              <div className="h-3 bg-charcoal-800/40 rounded-xs w-4/5 animate-pulse" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default RelatedProducts;
