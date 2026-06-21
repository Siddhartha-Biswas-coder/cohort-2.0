import React from "react";
import ImageCarousel from "../shared/ImageCarousel.jsx";

const VariantCard = ({
  variant,
  index,
  onEdit,
  onDelete,
  fallbackImage,
  parentPrice,
}) => {
  // Extract attributes
  const attributes = variant.attributes 
    ? (variant.attributes instanceof Map 
        ? Object.fromEntries(variant.attributes) 
        : variant.attributes) 
    : {};

  const attributeEntries = Object.entries(attributes);

  // Generate title from attributes, e.g., "BLACK / LARGE"
  const generatedTitle = attributeEntries.length > 0
    ? attributeEntries.map(([_, val]) => val.toString().toUpperCase()).join(" / ")
    : `SKU COMBINATION #${index + 1}`;

  // Extract pricing info
  const displayPrice = variant.price?.amount
    ? parseFloat(variant.price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })
    : (parentPrice?.amount
        ? parseFloat(parentPrice.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })
        : null);

  const displayCurrency = variant.price?.amount
    ? (variant.price.currency || "INR")
    : (parentPrice?.currency || "INR");

  // Extract images
  const variantImages = (variant.images && variant.images.length > 0)
    ? variant.images
    : (fallbackImage ? [{ url: fallbackImage }] : []);

  return (
    <div className="bg-charcoal-900 border border-charcoal-800 rounded-md overflow-hidden flex flex-col sm:flex-row premium-card-hover select-none relative group/vcard w-full">
      {/* Left side: Image carousel */}
      <div className="w-full sm:w-40 md:w-48 aspect-square sm:aspect-auto sm:h-auto shrink-0 border-b sm:border-b-0 sm:border-r border-charcoal-800/40 overflow-hidden relative">
        <ImageCarousel
          images={variantImages}
          title={generatedTitle}
          containerClassName="w-full h-full"
          imageClassName="w-full h-full object-cover transition-transform duration-700 group-hover/vcard:scale-102"
          arrowHoverOnly={true}
        />
      </div>

      {/* Right side: Detailed configurations */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-6">
        {/* Top: Attributes & Price Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Attributes List */}
          <div className="space-y-2">
            <span className="font-display text-[9px] font-semibold text-gold-400 uppercase tracking-widest block border-b border-charcoal-800/20 pb-1">
              SKU Dimensions
            </span>
            {attributeEntries.length > 0 ? (
              <div className="space-y-1.5 pt-1">
                {attributeEntries.map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center text-xs gap-4">
                    <span className="font-display text-charcoal-500 font-semibold uppercase tracking-wider">{key}</span>
                    <span className="font-display text-charcoal-200 font-bold uppercase tracking-wide text-right">{val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="font-display text-[10px] text-charcoal-550 tracking-wider uppercase italic pt-1">
                Standard Combination
              </div>
            )}
          </div>

          {/* Pricing & Stock Details */}
          <div className="space-y-4">
            {/* Price Offset */}
            <div className="space-y-2">
              <span className="font-display text-[9px] font-semibold text-charcoal-500 uppercase tracking-widest block border-b border-charcoal-800/20 pb-1">
                Pricing Offset
              </span>
              <div className="flex justify-between items-center pt-1">
                <span className="font-display text-[10px] text-charcoal-400 uppercase tracking-wider">Offset Value</span>
                {displayPrice ? (
                  <span className="font-display text-sm text-gold-400 font-bold tracking-tight">
                    {displayCurrency} {displayPrice}
                  </span>
                ) : (
                  <span className="font-display text-xs text-charcoal-500 font-light italic">
                    Inherited from parent
                  </span>
                )}
              </div>
            </div>

            {/* Current Stock */}
            <div className="space-y-2">
              <span className="font-display text-[9px] font-semibold text-charcoal-500 uppercase tracking-widest block border-b border-charcoal-800/20 pb-1">
                Inventory Status
              </span>
              <div className="flex justify-between items-center pt-1 text-[10px] uppercase font-display tracking-widest">
                <span className="text-charcoal-400 font-semibold">Available Units</span>
                <span className={`font-bold text-sm ${variant.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                  {variant.stock}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Action Controls */}
        <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-800/40">
          <button
            type="button"
            onClick={() => onEdit(variant, index)}
            className="px-6 py-2 bg-charcoal-950 dark:bg-charcoal-950 text-gold-500 dark:text-gold-400 hover:bg-gold-400 hover:text-charcoal-950 dark:hover:text-charcoal-950 font-display text-[9px] font-bold uppercase tracking-widest text-center transition-all duration-200 border border-gold-450/40 dark:border-gold-400/20 cursor-pointer"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(index)}
            className="px-6 py-2 bg-charcoal-950 dark:bg-charcoal-950 text-red-500 dark:text-red-400 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white dark:hover:text-white font-display text-[9px] font-bold uppercase tracking-widest text-center transition-all duration-200 border border-red-500/30 dark:border-red-500/20 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantCard;
