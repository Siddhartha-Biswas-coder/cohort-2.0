import React from "react";

const FashionCampaignPanel = ({ src, tagline, title }) => {
  return (
    <div className="w-full md:w-1/2 h-55 md:h-auto min-h-55 md:min-h-150 relative overflow-hidden border border-charcoal-800 group">
      <img
        src={src}
        alt="LUMIÈRE Editorial Campaign"
        className="w-full h-full object-cover filter grayscale hover:grayscale-0 contrast-115 brightness-95 transition-all duration-700 ease-in-out"
      />
      <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/70 via-transparent to-transparent opacity-80 pointer-events-none"></div>

      {/* Subtle branding layer */}
      <div className="absolute bottom-6 left-6 text-left max-w-xs pointer-events-none">
        <p className="text-[9px] font-display uppercase tracking-[0.3em] text-gold-400 mb-1.5">
          {tagline}
        </p>
        <h2 className="text-sm font-display uppercase tracking-[0.12em] text-charcoal-200 font-medium leading-tight">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default FashionCampaignPanel;
