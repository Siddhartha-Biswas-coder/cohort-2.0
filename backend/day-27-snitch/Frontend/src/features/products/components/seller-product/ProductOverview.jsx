import React from "react";
import ImageCarousel from "../shared/ImageCarousel.jsx";

const ProductOverview = ({ product }) => {
  const { title, description, price, images = [], productId, variants = [], varients = [] } = product;
  const activeVariants = variants.length > 0 ? variants : varients;

  const displayPrice = price?.amount
    ? parseFloat(price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })
    : "0.00";

  return (
    <div className="bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 md:p-8 space-y-8 animate-reveal" style={{ animationDelay: "100ms" }}>
      {/* Editorial Title Header */}
      <div className="border-b border-charcoal-800/60 pb-4 space-y-1">
        <span className="text-[8px] font-display font-semibold uppercase tracking-[0.25em] text-gold-400">
          Studio Canvas View
        </span>
        <h3 className="font-display text-sm font-light text-charcoal-200 tracking-wider uppercase">
          Listing Overview
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Media Column */}
        <div className="md:col-span-5 w-full">
          <div className="border border-charcoal-800/80 rounded-md overflow-hidden bg-charcoal-950 shadow-card-glow relative group/image">
            <ImageCarousel
              images={images}
              title={title}
              imageClassName="w-full h-full object-cover premium-image-zoom filter brightness-95"
              arrowHoverOnly={true}
            />
          </div>
        </div>

        {/* Right: Core Information Column */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-[9px] font-display font-bold uppercase tracking-widest text-charcoal-500">
              Listing Title
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-light text-charcoal-200 uppercase tracking-widest leading-tight">
              {title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 border-y border-charcoal-800/40 py-5">
            <div>
              <span className="text-[9px] font-display font-bold uppercase tracking-widest text-charcoal-500 block mb-1">
                Valuation Price
              </span>
              <span className="text-lg font-display text-gold-400 font-medium tracking-tight">
                {price?.currency || "INR"} {displayPrice}
              </span>
            </div>
            <div>
              <span className="text-[9px] font-display font-bold uppercase tracking-widest text-charcoal-500 block mb-1">
                Identifier ID
              </span>
              <span className="font-mono text-xs text-charcoal-300">
                {productId ? productId.substring(0, 15) + "..." : "Draft"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[9px] font-display font-bold uppercase tracking-widest text-charcoal-500">
              Product narrative / Story
            </span>
            <p className="text-xs font-sans font-light text-charcoal-400 leading-relaxed max-w-xl">
              {description || "No description provided for this exclusive listing."}
            </p>
          </div>

          {/* Catalog stats blocks */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-charcoal-950/40 border border-charcoal-800/40 p-4 rounded-md flex flex-col justify-center">
              <span className="text-[8px] font-display font-bold uppercase tracking-widest text-charcoal-500 mb-1">
                Visual Assets
              </span>
              <span className="text-base font-display font-light text-charcoal-350">
                {images.length} {images.length === 1 ? "Image" : "Images"}
              </span>
            </div>
            <div className="bg-charcoal-950/40 border border-charcoal-800/40 p-4 rounded-md flex flex-col justify-center">
              <span className="text-[8px] font-display font-bold uppercase tracking-widest text-charcoal-500 mb-1">
                SKU Configurations
              </span>
              <span className="text-base font-display font-light text-charcoal-350">
                {activeVariants.length} {activeVariants.length === 1 ? "Variant" : "Variants"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
