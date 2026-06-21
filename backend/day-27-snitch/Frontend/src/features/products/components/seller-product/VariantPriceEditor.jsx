import React from "react";
import { CURRENCIES } from "../../constants/currencies.js";

const VariantPriceEditor = ({
  priceAmount,
  priceCurrency = "INR",
  onPriceAmountChange,
  onPriceCurrencyChange,
  error,
  parentPrice
}) => {
  const currentSymbol = CURRENCIES.find(c => c.code === priceCurrency)?.symbol || "₹";

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start w-full">
      {/* Price Override Input */}
      <div className="flex-1 flex flex-col gap-3 group w-full">
        <label className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500 group-focus-within:text-gold-400 transition-colors h-8 flex items-end">
          Price Override (Optional)
        </label>
        <div className="relative w-full">
          <span className="absolute left-0 top-2 text-xs font-light text-charcoal-500 select-none">
            {currentSymbol}
          </span>
          <input
            type="number"
            value={priceAmount || ""}
            onChange={(e) => onPriceAmountChange(e.target.value)}
            placeholder={parentPrice?.amount ? `${parentPrice.amount} (Parent Product Price)` : "Valuation override"}
            step="0.01"
            min="0"
            className={`w-full bg-transparent border-b pl-5 py-2 text-xs text-gold-50 placeholder-charcoal-600 transition-all duration-300 focus:outline-none ${
              error
                ? "border-red-500/50 focus:border-red-500"
                : "border-charcoal-800 focus:border-gold-400 focus:shadow-[0_1px_0_0_rgba(197,160,89,0.25)]"
            }`}
          />
        </div>
        {error && (
          <span className="text-[10px] text-red-500 font-sans tracking-wide mt-1">
            {error}
          </span>
        )}
      </div>

      {/* Currency Selector */}
      <div className="w-full sm:w-28 flex flex-col gap-3 group">
        <label className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500 group-focus-within:text-gold-400 transition-colors h-8 flex items-end">
          Currency
        </label>
        <div className="relative">
          <select
            value={priceCurrency}
            onChange={(e) => onPriceCurrencyChange(e.target.value)}
            className="w-full bg-transparent border-b border-charcoal-800 py-2 pr-8 text-xs text-gold-50 appearance-none focus:outline-none focus:border-gold-400 focus:shadow-[0_1px_0_0_rgba(197,160,89,0.25)] transition-all cursor-pointer"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code} className="bg-charcoal-900 text-gold-50">
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-charcoal-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantPriceEditor;
