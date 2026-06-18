import React from "react";

const DashboardHeader = ({ title = "Create New Listing", subtitle = "Showcase your fashion products with premium presentation." }) => {
  return (
    <div className="flex flex-col gap-2 border-b border-charcoal-800 pb-8 mb-12 select-none">
      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5 text-gold-400 animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.78-8.006-2.141m16.012 0a8.9 8.9 0 01-.22 5.181M3.994 8.359a8.9 8.9 0 00.22 5.181m0 0a8.997 8.997 0 007.543 4.466 8.997 8.997 0 007.543-4.466"
          />
        </svg>
        <span className="font-display text-[9px] font-semibold text-gold-400 tracking-[0.35em] uppercase leading-none">
          Maison Listing Manager
        </span>
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-light text-gold-50 tracking-tight leading-none mt-2">
        {title}
      </h1>
      <p className="font-sans text-xs md:text-sm text-charcoal-500 font-light tracking-wide mt-1">
        {subtitle}
      </p>
    </div>
  );
};

export default DashboardHeader;
