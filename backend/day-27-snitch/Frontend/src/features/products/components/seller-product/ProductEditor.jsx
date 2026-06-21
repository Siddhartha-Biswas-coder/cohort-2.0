import React from "react";
import WorkspaceInput from "../shared/WorkspaceInput.jsx";
import { CURRENCIES } from "../../constants/currencies.js";

const ProductEditor = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <div className="bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 md:p-8 space-y-8 animate-reveal" style={{ animationDelay: "100ms" }}>
      {/* Editorial Title Header */}
      <div className="border-b border-charcoal-800/60 pb-4 space-y-1">
        <span className="text-[8px] font-display font-semibold uppercase tracking-[0.25em] text-gold-400">
          Studio Canvas Edit
        </span>
        <h3 className="font-display text-sm font-light text-charcoal-200 tracking-wider uppercase">
          Listing Core details
        </h3>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <WorkspaceInput
          label="Product Title"
          name="title"
          value={formData.title || ""}
          onChange={onChange}
          placeholder="e.g. Iron Man"
          error={errors?.title}
        />

        {/* Description */}
        <WorkspaceInput
          label="Product narrative / Story"
          name="description"
          value={formData.description || ""}
          onChange={onChange}
          placeholder="Narrate the heritage and detailing of this exclusive piece..."
          isTextarea={true}
          rows={5}
          error={errors?.description}
        />

        {/* Price Amount and Currency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Currency Selection */}
          <div className="flex flex-col gap-3.5 group md:col-span-1">
            <label className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500 group-focus-within:text-gold-400 transition-colors">
              Currency
            </label>
            <div className="relative">
              <select
                name="priceCurrency"
                value={formData.priceCurrency || "INR"}
                onChange={onChange}
                className="w-full bg-transparent border-b border-charcoal-800 py-3 pr-10 text-sm text-gold-50 appearance-none focus:outline-none focus:border-gold-400 focus:shadow-[0_1px_0_0_rgba(197,160,89,0.25)] transition-all cursor-pointer"
              >
                {CURRENCIES.map((cur) => (
                  <option key={cur.code} value={cur.code} className="bg-charcoal-900 text-gold-50">
                    {cur.code}
                  </option>
                ))}
              </select>
              {/* Custom Chevron Indicator */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-charcoal-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Base Price Amount */}
          <div className="flex flex-col gap-3.5 group md:col-span-2">
            <label className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500 group-focus-within:text-gold-400 transition-colors">
              Base Price Amount
            </label>
            <div className="relative">
              {/* Currency Symbol Prefix */}
              <span className="absolute left-0 top-3 text-lg font-light text-charcoal-500 select-none">
                {CURRENCIES.find((c) => c.code === formData.priceCurrency)?.symbol || "₹"}
              </span>
              <input
                type="number"
                name="priceAmount"
                value={formData.priceAmount || ""}
                onChange={onChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full bg-transparent border-b pl-6 py-3 text-lg text-gold-50 placeholder-charcoal-600 transition-all duration-300 focus:outline-none ${
                  errors?.priceAmount
                    ? "border-red-500/50 focus:border-red-500 focus:ring-0"
                    : "border-charcoal-800 focus:border-gold-400 focus:shadow-[0_1px_0_0_rgba(197,160,89,0.25)]"
                }`}
              />
            </div>
            {errors?.priceAmount && (
              <span className="text-[10px] text-red-500 font-sans tracking-wide mt-1 animate-error-fade-in-up">
                {errors.priceAmount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;
