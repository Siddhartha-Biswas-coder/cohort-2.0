import React from "react";
import ThemeToggle from "../../../../app/components/ThemeToggle.jsx";

/**
 * SellerTopBar — sticky top navigation bar
 * Props:
 *   title: string – page title displayed in the bar (defaults to "PRODUCT LISTING WORKSPACE")
 */
const SellerTopBar = ({ title = "PRODUCT LISTING WORKSPACE" }) => {
  return (
    <header className="w-full h-16 flex justify-between items-center px-8 md:px-16 bg-charcoal-950 border-b border-charcoal-900 sticky top-0 z-40">
      <span className="font-display text-[10px] font-bold tracking-[0.3em] text-gold-400 select-none uppercase">
        {title}
      </span>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <button className="text-charcoal-500 hover:text-gold-400 transition-colors cursor-pointer flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="w-7 h-7 bg-charcoal-900 border border-charcoal-800 rounded-full flex items-center justify-center overflow-hidden">
          <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default SellerTopBar;
