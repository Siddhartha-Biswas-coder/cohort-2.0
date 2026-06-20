import React from "react";
import { useTheme } from "../../../../app/hooks/useTheme.js";

const ProductActions = ({ onAddToCart, onBuyNow }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-3 w-full mb-8 select-none">
      {/* Buy Now Button - Prominent Solid Gold Surface */}
      <button
        type="button"
        onClick={onBuyNow}
        className="w-full h-12.5 flex items-center justify-center bg-gold-400 text-charcoal-950 font-display text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:bg-gold-500 hover:shadow-gold-glow-strong active:scale-[0.99] cursor-pointer rounded-none"
      >
        Buy Now
      </button>

      {/* Add to Cart Button - Outline, Gold in Dark Theme, Neutral in Light Theme */}
      <button
        type="button"
        onClick={onAddToCart}
        className={`w-full h-12.5 flex items-center justify-center font-display text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 active:scale-[0.99] cursor-pointer rounded-none border hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-px ${
          isDark
            ? "border-gold-400/80 text-gold-400 hover:border-gold-400 hover:bg-gold-400/5"
            : "border-charcoal-800 text-charcoal-500 hover:border-charcoal-600 hover:text-charcoal-600"
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductActions;
