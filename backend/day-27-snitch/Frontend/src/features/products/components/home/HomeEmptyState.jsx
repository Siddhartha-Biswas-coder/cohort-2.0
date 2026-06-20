import React from "react";
import { useNavigate } from "react-router";

const HomeEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-24 px-8 text-center select-none animate-error-fade-in-up">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full border border-charcoal-800 flex items-center justify-center mb-8 text-gold-400/30">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="0.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2 1.8-3.5 3-3.5s2 1 2 2c0 1.5-1.5 2-3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5L2.5 16.5c-.6.4-.3 1.2.4 1.2h18.2c.7 0 1-.8.4-1.2L12 9.5z" />
        </svg>
      </div>

      {/* Heading */}
      <h3 className="font-display text-lg tracking-[0.2em] uppercase text-charcoal-300 font-light mb-3">
        No Products Available
      </h3>

      {/* Divider */}
      <div className="w-8 h-px bg-gold-400/40 mx-auto mb-4" />

      {/* Subtext */}
      <p className="text-xs text-charcoal-500 font-sans tracking-wide leading-relaxed max-w-sm mb-10">
        Check back soon for new arrivals from our curated sellers.
      </p>

      {/* CTA */}
      <button
        type="button"
        onClick={() => navigate("/register")}
        className="px-8 py-3.5 border border-charcoal-700 text-charcoal-300 font-display text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:border-gold-400 hover:text-gold-400 active:scale-[0.98] cursor-pointer rounded-sm"
      >
        Become a Seller
      </button>
    </div>
  );
};

export default HomeEmptyState;
