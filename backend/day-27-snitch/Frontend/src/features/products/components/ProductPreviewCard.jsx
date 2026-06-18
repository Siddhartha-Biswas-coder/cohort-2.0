import React from "react";
import { CURRENCIES } from "../constants/currencies.js";

const ProductPreviewCard = ({ title, description, priceAmount, priceCurrency, images }) => {
  const currentCurrency = CURRENCIES.find((c) => c.code === priceCurrency) || { symbol: "$", code: "USD" };
  const displayTitle = title.trim() || "Draft Product Title";
  const displayPrice = priceAmount ? parseFloat(priceAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00";
  const displayDescription = description.trim() || "Awaiting campaign details, materials, and product description...";

  const mainImageUrl = images.length > 0 ? images[0].previewUrl : null;

  return (
    <section className="bg-charcoal-900 border border-charcoal-800 p-8 shadow-card-glow flex flex-col gap-6 sticky top-24 select-none">
      <div className="border-b border-charcoal-800 pb-4">
        <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">
          Listing Preview
        </h3>
      </div>

      {/* Main Luxury Product Image Card */}
      <div className="aspect-[3/4] w-full bg-charcoal-950 relative overflow-hidden border border-charcoal-800/80 group">
        {mainImageUrl ? (
          <>
            <img
              src={mainImageUrl}
              alt="Listing Preview Campaign"
              className="w-full h-full object-cover filter grayscale contrast-[1.05] brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
            />
            {/* Ambient vignette and overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,10,10,0.4)_100%)] pointer-events-none"></div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-charcoal-950">
            {/* Refined placeholder pattern */}
            <div className="w-12 h-12 rounded-full border border-gold-400/10 flex items-center justify-center mb-3 text-gold-400/30 animate-pulse">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-display text-[9px] tracking-[0.4em] text-charcoal-600 font-bold uppercase text-center block">
              Awaiting Campaign Media
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-charcoal-900/90 border border-charcoal-800 px-2.5 py-1 text-[8px] text-gold-400 font-display font-semibold tracking-widest uppercase shadow-md">
          Preview Model
        </div>
      </div>

      {/* Copy Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-4">
          <h4 className="font-display text-md font-light text-gold-50 tracking-tight leading-snug line-clamp-2 uppercase">
            {displayTitle}
          </h4>
          <div className="text-right flex-shrink-0">
            <span className="font-sans text-[11px] text-gold-400 tracking-wider font-semibold">
              {currentCurrency.symbol}
            </span>
            <span className="font-display text-md text-gold-400 font-medium tracking-tight ml-0.5">
              {displayPrice}
            </span>
            <span className="text-[8px] text-charcoal-500 font-sans tracking-wide block uppercase">
              {currentCurrency.code}
            </span>
          </div>
        </div>

        <p className="font-sans text-xs text-charcoal-500 font-light leading-relaxed line-clamp-3 select-none">
          {displayDescription}
        </p>
      </div>

      {/* Luxury Detail Highlights */}
      <div className="border-t border-charcoal-800/60 pt-4 flex items-center justify-between text-[8px] font-display font-semibold tracking-widest text-charcoal-600 uppercase">
        <span>Heritage Authenticated</span>
        <span>Maison de Luxe</span>
      </div>
    </section>
  );
};

export default ProductPreviewCard;
