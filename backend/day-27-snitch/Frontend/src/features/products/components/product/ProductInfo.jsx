import React from "react";

const ProductInfo = ({ title }) => {
  return (
    <div className="flex flex-col select-none">
      {/* Category / Collection Label */}
      <span className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400 mb-2 block">
        Lumière Collection
      </span>

      {/* Title */}
      <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-light text-charcoal-200 tracking-wider uppercase leading-tight mb-3">
        {title}
      </h1>
    </div>
  );
};

export default ProductInfo;
