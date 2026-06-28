import React from "react";
import { useNavigate } from "react-router";
import heroImage from "../../../auth/assets/premium_fashion_editorial.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToCollection = () => {
    const el = document.getElementById("collection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Lumière Fashion Editorial"
          className="w-full h-full object-cover object-center animate-image-reveal"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-charcoal-950/70" />
        {/* Bottom gradient fade into page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-charcoal-950 to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,10,10,0.5)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-3xl mx-auto">
        {/* Label */}
        <span 
          className="font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-400 block mb-6 animate-reveal"
          style={{ animationDelay: "0ms" }}
        >
          Lumière Collection
        </span>

        {/* Gold divider */}
        <div 
          className="w-12 h-px bg-gold-400 mx-auto mb-8 animate-reveal"
          style={{ animationDelay: "80ms" }}
        />

        {/* Heading */}
        <h1 
          className="font-display text-xl md:text-3xl lg:text-4xl font-light text-charcoal-200 tracking-wider uppercase leading-tight mb-6 animate-reveal"
          style={{ animationDelay: "160ms" }}
        >
          Curated Fashion
          <br />
          <span className="text-gold-400 font-normal">For Modern Living</span>
        </h1>

        {/* Supporting text */}
        <p 
          className="font-sans text-sm md:text-base text-charcoal-400 font-light leading-relaxed max-w-lg mx-auto mb-12 tracking-wide animate-reveal"
          style={{ animationDelay: "240ms" }}
        >
          Discover timeless pieces from independent fashion creators and premium sellers.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal"
          style={{ animationDelay: "320ms" }}
        >
          <button
            type="button"
            onClick={scrollToCollection}
            className="px-10 py-4 bg-gold-400 text-[#0a0a0a] font-display text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90 active:scale-[0.98] cursor-pointer rounded-sm"
          >
            Explore Collection
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="px-10 py-4 border border-charcoal-600 text-charcoal-300 font-display text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:border-gold-400 hover:text-gold-400 active:scale-[0.98] cursor-pointer rounded-sm"
          >
            Become a Seller
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
