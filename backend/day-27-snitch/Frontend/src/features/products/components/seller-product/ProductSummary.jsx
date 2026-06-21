import React from "react";

const ProductSummary = ({ product, status = "active" }) => {
  const { productId, price, images = [], variants = [] } = product;
  const activeVariants = variants;

  const displayPrice = price?.amount
    ? parseFloat(price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })
    : "0.00";

  // Simple current date mock formatting
  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 space-y-6 sticky top-28 select-none">
      <div className="space-y-1.5">
        <span className="text-[8px] font-display font-semibold uppercase tracking-[0.25em] text-charcoal-500">
          Global Overview
        </span>
        <h4 className="font-display text-xs font-semibold text-charcoal-200 tracking-wider uppercase">
          Listing Summary
        </h4>
      </div>

      {/* Listing Status Badge */}
      <div className="flex justify-between items-center py-3 border-y border-charcoal-800/60">
        <span className="font-display text-[9px] font-bold uppercase tracking-widest text-charcoal-500">
          Listing Status:
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            status === "active" ? "bg-emerald-500" : status === "draft" ? "bg-gold-450" : "bg-red-500"
          }`} />
          <span className={`font-display text-[9px] font-bold uppercase tracking-wider ${
            status === "active" ? "text-emerald-400" : status === "draft" ? "text-gold-400" : "text-red-400"
          }`}>
            {status === "active" ? "Active / Live" : status === "draft" ? "Draft Mode" : "Archived"}
          </span>
        </span>
      </div>

      {/* Specification rows */}
      <div className="space-y-4 text-[10px]">
        {/* Product ID */}
        <div className="flex justify-between items-center">
          <span className="font-display font-semibold uppercase tracking-wider text-charcoal-500">
            Product ID
          </span>
          <span className="font-mono text-charcoal-300">
            {productId ? productId.substring(0, 10) + "..." : "Draft"}
          </span>
        </div>

        {/* Valuation */}
        <div className="flex justify-between items-center">
          <span className="font-display font-semibold uppercase tracking-wider text-charcoal-500">
            Base Valuation
          </span>
          <span className="font-display font-medium text-gold-400">
            {price?.currency || "INR"} {displayPrice}
          </span>
        </div>

        {/* Media Assets Count */}
        <div className="flex justify-between items-center">
          <span className="font-display font-semibold uppercase tracking-wider text-charcoal-500">
            Media Assets
          </span>
          <span className="font-sans font-light text-charcoal-300">
            {images.length} {images.length === 1 ? "file" : "files"}
          </span>
        </div>

        {/* Variant Profiles Count */}
        <div className="flex justify-between items-center">
          <span className="font-display font-semibold uppercase tracking-wider text-charcoal-500">
            Variant Combinations
          </span>
          <span className="font-sans font-light text-charcoal-300">
            {activeVariants.length} {activeVariants.length === 1 ? "profile" : "profiles"}
          </span>
        </div>

        {/* Last Updated */}
        <div className="flex justify-between items-center pt-2 border-t border-charcoal-800/40">
          <span className="font-display font-semibold uppercase tracking-wider text-charcoal-500">
            Last Updated
          </span>
          <span className="font-sans font-light text-charcoal-400">
            {today}
          </span>
        </div>
      </div>

      {/* Aesthetic sign-off text */}
      <div className="text-[8px] font-sans font-light leading-relaxed text-charcoal-600 border-t border-charcoal-800/40 pt-4 text-center">
        Lumière Seller Network Verification Protocol
      </div>
    </div>
  );
};

export default ProductSummary;
