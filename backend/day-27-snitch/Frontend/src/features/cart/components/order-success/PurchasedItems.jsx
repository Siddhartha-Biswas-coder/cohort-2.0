import React from "react";

const PurchasedItems = ({ items = [] }) => {
  return (
    <div className="w-full py-12 animate-reveal" style={{ animationDelay: "200ms" }}>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left column: Editorial subtitle */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start">
          <span className="font-sans text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold mb-2">
            Curation
          </span>
          <h3 className="font-display text-2xl font-light text-charcoal-200 tracking-wide">
            Your Selection
          </h3>
          <p className="font-sans text-xs text-charcoal-400 font-light mt-4 max-w-xs leading-relaxed">
            A carefully selected ensemble of premium craftsmanship, prepared exclusively for you.
          </p>
        </div>

        {/* Right column: Items List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {items.map((item, idx) => {
            const matchedVariant = Array.isArray(item.product?.variants)
              ? item.product.variants.find((v) => v._id === item.variant)
              : item.product?.variants;

            const displayPrice = matchedVariant?.price?.amount || item.product?.price?.amount || 0;
            const displayCurrency = matchedVariant?.price?.currency || item.product?.price?.currency || "INR";
            const displayImage = matchedVariant?.images?.[0] || item.product?.images?.[0];

            return (
              <div
                key={idx}
                className="flex items-start gap-6 pb-6 border-b border-charcoal-800/20 last:border-b-0 animate-reveal"
                style={{ animationDelay: `${250 + idx * 50}ms` }}
              >
                {/* Product Thumbnail (3:4 ratio, sharp corners, no rounded edges) */}
                <div className="w-20 h-28 bg-charcoal-900 border border-charcoal-800/40 shrink-0 overflow-hidden relative group">
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={item.product?.title || "Product"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-[9px] text-charcoal-600">
                      LUMIÈRE
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0 pt-1">
                  <h4 className="font-display text-base tracking-wide text-charcoal-200 mb-2 truncate">
                    {item.product?.title || "Premium Apparel"}
                  </h4>

                  {/* Variant specifications (Size, Color, Material) */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {matchedVariant?.attributes &&
                      Object.entries(matchedVariant.attributes).map(([key, value]) => (
                        <span
                          key={key}
                          className="font-sans text-[10px] text-charcoal-400 font-light flex items-center gap-1"
                        >
                          <span className="uppercase text-[8px] tracking-wider text-charcoal-500 font-medium">
                            {key}:
                          </span>
                          {value}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="text-center shrink-0 px-4 pt-1">
                  <span className="font-sans text-[8px] text-charcoal-500 block mb-1 uppercase tracking-widest">
                    Quantity
                  </span>
                  <span className="font-sans text-xs text-charcoal-200 font-medium">
                    {item.quantity}
                  </span>
                </div>

                {/* Price */}
                <div className="text-right shrink-0 min-w-24 pt-1">
                  <span className="font-sans text-[8px] text-charcoal-500 block mb-1 uppercase tracking-widest">
                    Price
                  </span>
                  <span className="font-sans text-xs text-gold-400 font-medium">
                    {displayCurrency} {Number(displayPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PurchasedItems;
