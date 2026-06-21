import React from "react";

const ProductPricingCard = ({ price = {}, pricingOverrides = [] }) => {
  return (
    <div id="pricing" className="bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 md:p-8 space-y-6 scroll-mt-28 animate-reveal" style={{ animationDelay: "200ms" }}>
      <div className="space-y-1 pb-4 border-b border-charcoal-800/60">
        <h3 className="font-display text-sm font-light text-charcoal-200 tracking-wider uppercase">
          Pricing & Valuation Model
        </h3>
        <p className="font-sans text-[11px] text-charcoal-500 font-light">
          Inspect general catalog listings prices, discounts, and SKU pricing overrides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-charcoal-950/40 border border-charcoal-800/40 p-5 rounded-md space-y-2">
          <span className="text-[9px] font-display font-bold uppercase tracking-wider text-charcoal-500">
            Global Listing Valuation
          </span>
          <div className="text-xl font-display text-gold-400 font-semibold tracking-tight">
            {price?.currency || "INR"} {parseFloat(price?.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] text-charcoal-500 font-sans font-light leading-relaxed">
            This base price will apply globally unless a specific variant valuation override is defined.
          </p>
        </div>

        <div className="bg-charcoal-950/40 border border-charcoal-800/40 p-5 rounded-md space-y-2">
          <span className="text-[9px] font-display font-bold uppercase tracking-wider text-charcoal-500">
            Tax Guidelines
          </span>
          <div className="text-xs font-display text-charcoal-350 font-medium">
            VAT & Sales Taxes Calculated at Checkout
          </div>
          <p className="text-[10px] text-charcoal-500 font-sans font-light leading-relaxed">
            Authentication fees and buyer security deposits are dynamically added based on shipment zones.
          </p>
        </div>
      </div>

      {/* Price overrides list display */}
      {pricingOverrides.length > 0 && (
        <div className="bg-charcoal-950/30 border border-charcoal-800/60 p-5 rounded-md space-y-3">
          <span className="text-[9px] font-display font-bold uppercase tracking-widest text-charcoal-500 block">
            Active SKU Price Overrides
          </span>
          <div className="divide-y divide-charcoal-800/40 space-y-2.5">
            {pricingOverrides.map((v, i) => {
              const attrs = v.attributes 
                ? (v.attributes instanceof Map 
                    ? Object.fromEntries(v.attributes) 
                    : v.attributes) 
                : {};
              const title = Object.entries(attrs).map(([_, val]) => val.toString().toUpperCase()).join(" / ");
              return (
                <div key={i} className="flex justify-between items-center text-xs pt-2.5 first:pt-0 font-sans font-light">
                  <span className="text-charcoal-400 font-medium tracking-wide">
                    {title || `Variant SKU #${i + 1}`}
                  </span>
                  <span className="font-display font-semibold text-gold-400">
                    {v.price.currency || "INR"} {parseFloat(v.price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPricingCard;
