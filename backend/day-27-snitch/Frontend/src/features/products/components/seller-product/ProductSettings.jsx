import React from "react";
import ProductAccordion from "./ProductAccordion.jsx";

const ProductSettings = ({
  product = {},
  status = "active",
  onStatusChange,
}) => {
  const { productId, createdAt, updatedAt, images = [], variants = [] } = product;
  const activeVariants = variants;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Listing Status and Details Card */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 md:p-8 space-y-6 animate-reveal" style={{ animationDelay: "150ms" }}>
        <div className="border-b border-charcoal-800/60 pb-4 space-y-1">
          <span className="text-[8px] font-display font-semibold uppercase tracking-[0.25em] text-gold-400">
            Storefront Settings
          </span>
          <h3 className="font-display text-sm font-light text-charcoal-200 tracking-wider uppercase">
            Listing Metadata & Settings
          </h3>
          <p className="font-sans text-[11px] text-charcoal-500 font-light">
            Configure storefront visibility status and inspect historical listing metadata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Status Configuration */}
          <div className="space-y-4">
            <div className="flex flex-col gap-3 group">
              <label className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500 group-focus-within:text-gold-400 transition-colors">
                Marketplace Visibility Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="w-full bg-transparent border-b border-charcoal-800 py-3 pr-10 text-sm text-gold-50 appearance-none focus:outline-none focus:border-gold-400 focus:shadow-[0_1px_0_0_rgba(197,160,89,0.25)] transition-all cursor-pointer"
                >
                  <option value="active" className="bg-charcoal-900 text-gold-50">Active / Live (Visible on Storefront)</option>
                  <option value="draft" className="bg-charcoal-900 text-gold-50">Draft (Hidden, Edit Mode)</option>
                  <option value="archived" className="bg-charcoal-900 text-gold-50">Archived (Unpublished Historical Record)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-charcoal-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="p-4 bg-charcoal-950/40 border border-charcoal-800/40 rounded-md">
              <span className="text-[9px] font-display font-bold uppercase tracking-widest text-charcoal-500 block mb-1">
                Storefront Warning
              </span>
              <p className="font-sans text-[11px] font-light text-charcoal-400 leading-relaxed">
                Transitioning to "Archived" hides this product from searches immediately. Ongoing orders or checkout sessions won't be disrupted.
              </p>
            </div>
          </div>

          {/* Right Side: Read-Only System Properties */}
          <div className="space-y-4 border-l border-charcoal-800/20 pl-0 md:pl-8">
            <div className="space-y-1">
              <span className="text-[8px] font-display font-semibold tracking-wider text-charcoal-500 uppercase">Product Reference ID</span>
              <p className="font-mono text-xs text-charcoal-300 select-all">{productId || "Pending Generation"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[8px] font-display font-semibold tracking-wider text-charcoal-500 uppercase">Created On</span>
                <p className="font-sans text-xs text-charcoal-350">{formatDate(createdAt)}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] font-display font-semibold tracking-wider text-charcoal-500 uppercase">Last Updated</span>
                <p className="font-sans text-xs text-charcoal-350">{formatDate(updatedAt)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <span className="text-[8px] font-display font-semibold tracking-wider text-charcoal-500 uppercase">Total Media Assets</span>
                <p className="font-sans text-xs text-charcoal-350">{images.length} assets</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] font-display font-semibold tracking-wider text-charcoal-500 uppercase">SKUs Configured</span>
                <p className="font-sans text-xs text-charcoal-350">{activeVariants.length} SKUs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Guidelines */}
      <ProductAccordion />
    </div>
  );
};

export default ProductSettings;
