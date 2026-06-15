import React from "react";

const RoleToggle = ({ isSeller, onChange }) => {
  return (
    <div className="space-y-2.5 mb-6">
      <label className="block text-[10px] font-display uppercase tracking-[0.15em] text-charcoal-500">
        I want to join as
      </label>
      <div className="grid grid-cols-2 gap-4">
        {/* Seller Card */}
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex flex-col items-start p-4 border text-left transition-all duration-300 rounded-lg cursor-pointer focus:outline-none ${
            isSeller
              ? "border-gold-400 bg-gold-400/5 shadow-gold-glow"
              : "border-charcoal-800 bg-charcoal-900 hover:border-charcoal-700"
          }`}
        >
          <div className="flex items-center gap-2.5 mb-1.5 w-full">
            <div
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isSeller ? "border-gold-400 bg-gold-400/10" : "border-charcoal-700"
              }`}
            >
              {isSeller && <div className="w-1.5 h-1.5 rounded-full bg-gold-400"></div>}
            </div>
            <span
              className={`text-xs font-display font-semibold tracking-wider uppercase ${
                isSeller ? "text-gold-400" : "text-charcoal-300"
              }`}
            >
              Seller
            </span>
          </div>
          <p className="text-[10px] text-charcoal-500 leading-relaxed font-sans">
            Start your business and sell online
          </p>
        </button>

        {/* Buyer Card */}
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex flex-col items-start p-4 border text-left transition-all duration-300 rounded-lg cursor-pointer focus:outline-none ${
            !isSeller
              ? "border-gold-400 bg-gold-400/5 shadow-gold-glow"
              : "border-charcoal-800 bg-charcoal-900 hover:border-charcoal-700"
          }`}
        >
          <div className="flex items-center gap-2.5 mb-1.5 w-full">
            <div
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                !isSeller ? "border-gold-400 bg-gold-400/10" : "border-charcoal-700"
              }`}
            >
              {!isSeller && <div className="w-1.5 h-1.5 rounded-full bg-gold-400"></div>}
            </div>
            <span
              className={`text-xs font-display font-semibold tracking-wider uppercase ${
                !isSeller ? "text-gold-400" : "text-charcoal-300"
              }`}
            >
              Buyer
            </span>
          </div>
          <p className="text-[10px] text-charcoal-500 leading-relaxed font-sans">
            Shop the latest trends
          </p>
        </button>
      </div>
    </div>
  );
};

export default RoleToggle;
