import React from "react";

const ProductDescription = ({ description }) => {
  return (
    <div className="flex flex-col gap-2.5 mb-6 select-none">
      <h3 className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500">
        The Story
      </h3>
      <p className="font-sans text-sm md:text-base text-charcoal-400 font-light leading-relaxed max-w-lg tracking-wide">
        {description || "No narrative description provided for this curated piece."}
      </p>
    </div>
  );
};

export default ProductDescription;
