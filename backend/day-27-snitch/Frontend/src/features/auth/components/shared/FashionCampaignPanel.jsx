import React from "react";

const FashionCampaignPanel = ({ src, tagline, title }) => {
  return (
    <div className="w-full md:w-1/2 h-72 md:h-auto min-h-72 md:min-h-150 relative overflow-hidden group">
      {/* Main Campaign Image */}
      <img
        src={src}
        alt="LUMIÈRE Editorial Campaign"
        className="w-full h-full object-cover filter grayscale hover:grayscale-0 contrast-110 brightness-95 transition-all duration-1000 ease-in-out transform scale-100 group-hover:scale-[1.015]"
      />

      {/* Seamless edge blending overlays */}
      {/* Left side fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-linear-to-r from-charcoal-950 to-transparent pointer-events-none z-10"></div>
      {/* Right side fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-linear-to-l from-charcoal-950 to-transparent pointer-events-none z-10"></div>
      {/* Top side fade */}
      <div className="absolute top-0 left-0 right-0 h-16 md:h-28 bg-linear-to-b from-charcoal-950 to-transparent pointer-events-none z-10"></div>
      {/* Bottom side fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 md:h-40 bg-linear-to-t from-charcoal-950 to-transparent pointer-events-none z-10"></div>

      {/* Ambient radial vignette for luxury depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(10,10,10,0.85)_100%)] pointer-events-none z-10"></div>

      {/* Campaign Copy Overlay */}
      <div className="absolute bottom-10 left-8 right-8 text-left max-w-sm pointer-events-none z-20 select-none">
        <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-200 tracking-tight leading-[1.15] mb-3">
          Dress <span className="text-gold-400 font-normal">Better.</span>
          <br />
          Live <span className="text-gold-400 font-normal">Better.</span>
        </h2>
        <p className="text-[10px] md:text-xs text-charcoal-400 font-sans tracking-widest uppercase leading-relaxed">
          {title}
        </p>
      </div>
    </div>
  );
};

export default FashionCampaignPanel;
