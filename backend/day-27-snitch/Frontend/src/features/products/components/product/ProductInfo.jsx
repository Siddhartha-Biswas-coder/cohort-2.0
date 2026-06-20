import React from "react";

const ProductInfo = ({ title, price = {} }) => {
  const displayPrice = price.amount
    ? parseFloat(price.amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })
    : "0.00";

  return (
    <div className="flex flex-col select-none">
      {/* Category / Collection Label */}
      <span className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400 mb-2 block">
        Lumière Collection
      </span>

      {/* Title */}
      <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-charcoal-200 tracking-wider uppercase leading-tight mb-4">
        {title}
      </h1>

      {/* Pricing display */}
      <div className="flex items-baseline gap-1 mt-1 mb-6">
        <span className="font-sans text-xs font-semibold tracking-wider text-gold-400 uppercase">
          {price.currency || "INR"}
        </span>
        <span className="font-display text-xl md:text-2xl text-gold-400 font-medium tracking-tight">
          {displayPrice}
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;
