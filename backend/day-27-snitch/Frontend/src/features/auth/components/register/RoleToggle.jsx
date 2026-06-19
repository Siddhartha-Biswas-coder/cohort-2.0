import React from "react";

const RoleToggle = ({ isSeller, onChange }) => {
  return (
    <div className="space-y-2.5 mb-6">
      <label className="block text-[10px] font-display uppercase tracking-[0.18em] text-charcoal-500 font-medium">
        I want to join as
      </label>
      <div className="grid grid-cols-2 gap-4">
        {/* Seller Card */}
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex flex-col items-start p-4.5 border text-left transition-all duration-300 rounded-lg cursor-pointer focus:outline-none relative ${
            isSeller
              ? "border-gold-400 bg-bg-selected"
              : "border-charcoal-800/80 bg-charcoal-950/20 hover:border-charcoal-700/60 hover:bg-charcoal-900/40"
          }`}
        >
          {/* Subtle Top Right Role Icon */}
          <div className="absolute top-4 right-4">
            <svg
              className={`w-4 h-4 transition-colors duration-300 ${
                isSeller ? "text-gold-400" : "text-charcoal-500"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.5 1.5 0 002.122 0l4.318-4.318a1.5 1.5 0 000-2.122L11.16 3.659A1.5 1.5 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
            </svg>
          </div>

          <div className="flex items-center gap-2.5 mb-2 w-full">
            <div
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isSeller ? "border-gold-500 bg-gold-500/10" : "border-charcoal-700"
              }`}
            >
              {isSeller && <div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div>}
            </div>
            <span
              className={`text-xs font-display font-semibold tracking-widest uppercase ${
                isSeller ? "text-gold-400" : "text-charcoal-300"
              }`}
            >
              Seller
            </span>
          </div>
          <p className="text-[10px] text-charcoal-500 leading-relaxed font-sans pr-4">
            Start selling premium fashion.
          </p>
        </button>

        {/* Buyer Card */}
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex flex-col items-start p-4.5 border text-left transition-all duration-300 rounded-lg cursor-pointer focus:outline-none relative ${
            !isSeller
              ? "border-gold-400 bg-bg-selected"
              : "border-charcoal-800/80 bg-charcoal-950/20 hover:border-charcoal-700/60 hover:bg-charcoal-900/40"
          }`}
        >
          {/* Subtle Top Right Role Icon */}
          <div className="absolute top-4 right-4">
            <svg
              className={`w-4 h-4 transition-colors duration-300 ${
                !isSeller ? "text-gold-400" : "text-charcoal-500"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-2.5 mb-2 w-full">
            <div
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                !isSeller ? "border-gold-500 bg-gold-500/10" : "border-charcoal-700"
              }`}
            >
              {!isSeller && <div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div>}
            </div>
            <span
              className={`text-xs font-display font-semibold tracking-widest uppercase ${
                !isSeller ? "text-gold-400" : "text-charcoal-300"
              }`}
            >
              Buyer
            </span>
          </div>
          <p className="text-[10px] text-charcoal-500 leading-relaxed font-sans pr-4">
            Discover curated collections.
          </p>
        </button>
      </div>
    </div>
  );
};

export default RoleToggle;
