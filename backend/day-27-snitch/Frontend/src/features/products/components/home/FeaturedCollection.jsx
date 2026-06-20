import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";

const FeaturedCollection = ({ products = [] }) => {
  if (products.length === 0) return null;

  const [revealRef, isRevealed] = useScrollReveal();
  const featured = products.slice(0, 3);

  return (
    <section 
      ref={revealRef}
      id="featured" 
      className={`px-8 md:px-16 py-20 md:py-28 max-w-[1600px] mx-auto scroll-reveal ${
        isRevealed ? "scroll-reveal-active" : ""
      }`}
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-400 block mb-4">
          Featured Pieces
        </span>
        <div className="w-8 h-px bg-gold-400 mx-auto mb-6" />
        <h2 className="font-display text-2xl md:text-3xl font-light text-charcoal-200 tracking-wider uppercase">
          The Current Edit
        </h2>
        <p className="font-sans text-xs text-charcoal-500 tracking-wide mt-3 max-w-md mx-auto">
          Handpicked selections from our most distinguished sellers.
        </p>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {featured.map((product, index) => {
          const imageUrl = product.images?.[0]?.url;
          const displayPrice = product.price?.amount
            ? parseFloat(product.price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })
            : "0.00";

          return (
            <article
              key={product.productId}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${
                isRevealed ? "animate-reveal" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Image */}
              <div className="aspect-3/4 w-full bg-charcoal-900 relative overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover filter grayscale-30 brightness-95 group-hover:grayscale-0 premium-image-zoom animate-image-reveal"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-charcoal-950">
                    <svg className="w-8 h-8 text-charcoal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-charcoal-950/90 via-charcoal-950/40 to-transparent pointer-events-none z-10" />

                {/* Product info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="font-display text-sm font-light text-charcoal-200 tracking-wider uppercase line-clamp-1 mb-1">
                    {product.title}
                  </h3>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-sans text-[10px] text-gold-400 tracking-wider font-semibold">
                      {product.price?.currency || "INR"}
                    </span>
                    <span className="font-display text-sm text-gold-400 font-medium tracking-tight">
                      {displayPrice}
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/20 transition-colors duration-500 z-5" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCollection;
