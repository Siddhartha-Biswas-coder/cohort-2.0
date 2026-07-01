import React from "react";

const ThankYouSection = () => {
  return (
    <div className="w-full py-16 text-center animate-reveal" style={{ animationDelay: "300ms" }}>
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-gold-400 font-semibold mb-4">
          The Lumière Philosophy
        </span>
        <h4 className="font-serif text-xl md:text-2xl font-light text-charcoal-200 tracking-wide leading-relaxed italic">
          "Every Lumière purchase supports carefully curated craftsmanship and independent creators."
        </h4>
        <div className="w-12 h-px bg-gold-400/30 my-6" />
        <p className="font-sans text-xs text-charcoal-400 leading-relaxed font-light max-w-md">
          We curate with purpose, creating a digital sanctuary for timeless aesthetic expression. Thank you for being a part of this journey.
        </p>
      </div>
    </div>
  );
};

export default ThankYouSection;
