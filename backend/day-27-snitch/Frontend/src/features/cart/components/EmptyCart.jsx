import React from "react";
import { useNavigate } from "react-router";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center animate-reveal">
      {/* Illustration */}
      <div className="mb-10 opacity-30">
        <svg
          className="w-24 h-24 text-charcoal-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>

      {/* Label */}
      <span className="font-display text-[9px] font-semibold uppercase tracking-[0.3em] text-gold-400 mb-5 block">
        Maison Lumière
      </span>

      {/* Heading */}
      <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-200 uppercase tracking-widest mb-5">
        Your collection is waiting.
      </h2>

      {/* Subtext */}
      <p className="font-sans text-sm text-charcoal-500 font-light max-w-sm leading-relaxed mb-12">
        Discover handcrafted luxury pieces curated exclusively for Lumière.
        Each piece is selected for its exceptional quality and artistry.
      </p>

      {/* CTA */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="px-12 py-4 bg-gold-400 text-charcoal-950 font-display text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-gold-500 active:scale-[0.99] transition-all duration-300 cursor-pointer"
      >
        Explore Collection
      </button>
    </div>
  );
};

export default EmptyCart;
