import React from "react";

const VariantCard = ({
  variant,
  index,
  onEdit,
  onDelete,
  fallbackImage,
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
    : null;

  // Extract images
  const variantImages = variant.images || [];
  const primaryImageUrl = variantImages[0]?.url || fallbackImage || "";

  return (
    <div className="bg-charcoal-900 border border-charcoal-800 rounded-md overflow-hidden flex flex-col justify-between premium-card-hover select-none relative group/vcard h-full">
      
      {/* Visual Header Block */}
      <div className="relative aspect-square w-full bg-charcoal-950 border-b border-charcoal-800/40 overflow-hidden">
        {primaryImageUrl ? (
          <img
            src={primaryImageUrl}
            alt={generatedTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/vcard:scale-102"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-charcoal-600">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[8px] font-display uppercase tracking-widest text-charcoal-500 mt-2">
              No Media
            </span>
          </div>
        )}

        {/* Image count badge */}
        {variantImages.length > 0 && (
          <div className="absolute top-3 right-3 bg-charcoal-950/80 border border-charcoal-800/80 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            <span className="text-[8px] text-charcoal-400 font-display tracking-widest font-semibold uppercase">
              {variantImages.length} {variantImages.length === 1 ? "Photo" : "Photos"}
            </span>
          </div>
        )}

        {/* Stock Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-0.5 rounded-xs text-[8px] font-display font-semibold uppercase tracking-wider ${
            variant.stock > 0
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}>
            {variant.stock > 0 ? `${variant.stock} units` : "Out of stock"}
          </span>
        </div>
      </div>

      {/* Attributes & Valuation Info */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start gap-4">
            <h4 className="font-display text-xs font-semibold text-charcoal-200 tracking-wider uppercase leading-snug line-clamp-1">
              {generatedTitle}
            </h4>
            {displayPrice && (
              <span className="font-display text-xs text-gold-400 font-medium tracking-tight shrink-0">
                {variant.price?.currency || "INR"} {displayPrice}
              </span>
            )}
          </div>

          {/* Dynamic Attribute Badges */}
          {attributeEntries.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {attributeEntries.map(([key, val]) => (
                <span
                  key={key}
                  className="bg-charcoal-950/60 text-charcoal-400 border border-charcoal-800/80 px-2 py-0.5 rounded-xs text-[9px] font-sans font-light tracking-wide"
                >
                  {key}: <span className="text-charcoal-350">{val}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex gap-3 pt-3 border-t border-charcoal-800/40">
          <button
            type="button"
            onClick={() => onEdit(variant, index)}
            className="flex-1 py-1.5 bg-charcoal-950 text-gold-400 hover:bg-gold-400 hover:text-charcoal-950 font-display text-[9px] font-bold uppercase tracking-widest text-center transition-all duration-200 border border-gold-400/20 cursor-pointer"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(index)}
            className="flex-1 py-1.5 bg-charcoal-950 text-red-400 hover:bg-red-500 hover:text-white font-display text-[9px] font-bold uppercase tracking-widest text-center transition-all duration-200 border border-red-500/20 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantCard;
