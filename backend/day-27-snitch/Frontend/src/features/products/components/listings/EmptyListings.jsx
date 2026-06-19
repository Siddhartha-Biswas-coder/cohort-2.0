import React from "react";
import { useNavigate } from "react-router";

const EmptyListings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 border border-dashed border-charcoal-800/80 rounded-xl bg-charcoal-900/10 text-center select-none max-w-lg mx-auto animate-error-fade-in-up">
      {/* Handcrafted outlining luxury vector representation (Hanger) */}
      <div className="w-16 h-16 rounded-full border border-gold-400/10 flex items-center justify-center mb-6 text-gold-400/40">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2 1.8-3.5 3-3.5s2 1 2 2c0 1.5-1.5 2-3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5L2.5 16.5c-.6.4-.3 1.2.4 1.2h18.2c.7 0 1-.8.4-1.2L12 9.5z" />
        </svg>
      </div>

      <h3 className="font-display text-sm tracking-[0.25em] uppercase text-charcoal-300 font-bold mb-2">
        No Listings Yet
      </h3>
      <p className="text-xs text-charcoal-500 font-sans tracking-wide leading-relaxed mb-8 max-w-sm">
        Start building your luxury collection by creating your first listing.
      </p>

      <button
        type="button"
        onClick={() => navigate("/seller/create-listing")}
        className="px-8 py-3.5 bg-gold-400 hover:opacity-90 text-[#0a0a0a] font-display text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border border-transparent rounded-lg active:scale-[0.98] cursor-pointer"
      >
        Create Listing
      </button>
    </div>
  );
};

export default EmptyListings;
