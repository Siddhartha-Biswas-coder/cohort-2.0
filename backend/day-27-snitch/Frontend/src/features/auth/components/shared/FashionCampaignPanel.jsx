import React from "react";

const FashionCampaignPanel = ({ src, tagline, title }) => {
  return (
    <div className="w-full md:w-1/2 h-72 md:h-auto min-h-72 md:min-h-150 relative overflow-hidden group">
      {/* Main Campaign Image */}
      <img
        src={src}
        alt="LUMIÈRE Editorial Campaign"
        className="w-full h-full object-cover filter grayscale-100 brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1400 ease-in-out transform scale-100 group-hover:scale-[1.02]"
      />

      {/* Soft dark gradient transition visual bridge */}
      <div className="absolute inset-0 pointer-events-none z-15" style={{ background: "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.35), rgba(0,0,0,0.65))" }}></div>

      {/* Seamless edge blending overlays */}
      {/* Left side fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-36 bg-linear-to-r from-charcoal-950 to-transparent pointer-events-none z-10"></div>
      {/* Right side fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-36 bg-linear-to-l from-charcoal-950 to-transparent pointer-events-none z-10"></div>
      {/* Top side fade */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-36 bg-linear-to-b from-charcoal-950 to-transparent pointer-events-none z-10"></div>
      {/* Bottom side fade */}
      <div className="absolute bottom-0 left-0 right-0 h-36 md:h-48 bg-linear-to-t from-charcoal-950 to-transparent pointer-events-none z-10"></div>

      {/* Ambient radial vignette for luxury depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(10,10,10,0.92)_100%)] pointer-events-none z-10"></div>

      {/* Campaign Copy Overlay */}
      <div className="absolute bottom-10 left-8 right-8 text-left max-w-sm pointer-events-none z-20 select-none">
        <h2 className="font-display text-2xl md:text-3xl font-light text-charcoal-200 tracking-wider uppercase leading-[1.2] mb-3">
          Bespoke <span className="text-gold-400 font-normal">Craftsmanship.</span>
          <br />
          Timeless <span className="text-gold-400 font-normal">Aesthetics.</span>
        </h2>
        <p className="text-[10px] md:text-xs text-charcoal-400 font-sans tracking-widest uppercase leading-relaxed">
          {title}
        </p>
      </div>
    </div>
  );
};

export default FashionCampaignPanel;
