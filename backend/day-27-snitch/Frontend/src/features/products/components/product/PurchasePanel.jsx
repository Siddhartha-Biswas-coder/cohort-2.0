import React, { useState } from "react";
import { useTheme } from "../../../../app/hooks/useTheme.js";

const PurchasePanel = ({
  onAddToCart,
  onBuyNow,
  isOutOfStock = false,
  disabled = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const handleAddToCart = async () => {
    if (isAdding || disabled || isOutOfStock) return;
    setIsAdding(true);
    try {
      await onAddToCart();
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (isBuying || disabled || isOutOfStock) return;
    setIsBuying(true);
    try {
      await onBuyNow();
    } finally {
      setIsBuying(false);
    }
  };

  const isBtnDisabled = disabled || isOutOfStock;

  if (disabled && !isOutOfStock) {
    return (
      <div className="flex flex-col gap-3 w-full mb-8 select-none">
        <button
          type="button"
          disabled
          className="w-full h-12.5 flex items-center justify-center bg-charcoal-850 text-charcoal-500 border border-charcoal-800/40 cursor-not-allowed opacity-50 font-display text-[10px] font-bold uppercase tracking-[0.25em] rounded-none"
        >
          Complete Selection
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full mb-8 select-none">
      {/* Buy Now Button - Primary action */}
      <button
        type="button"
        onClick={handleBuyNow}
        disabled={isBtnDisabled || isBuying}
        className={`w-full h-12.5 flex items-center justify-center font-display text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 rounded-none cursor-pointer ${
          isBtnDisabled
            ? "bg-charcoal-800 text-charcoal-600 border border-charcoal-800/30 cursor-not-allowed opacity-50"
            : "bg-gold-400 text-charcoal-950 hover:bg-gold-500 hover:shadow-gold-glow-strong active:scale-[0.99]"
        }`}
      >
        {isBuying ? (
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : isOutOfStock ? (
          "Out of Stock"
        ) : (
          "Buy Now"
        )}
      </button>

      {/* Add to Cart Button - Secondary action */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isBtnDisabled || isAdding}
        className={`w-full h-12.5 flex items-center justify-center font-display text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 rounded-none border ${
          isBtnDisabled
            ? "border-charcoal-800/40 text-charcoal-600 cursor-not-allowed opacity-40"
            : isDark
            ? "border-gold-400/80 text-gold-400 hover:border-gold-400 hover:bg-gold-400/5 active:scale-[0.99] cursor-pointer"
            : "border-charcoal-800 text-charcoal-400 hover:border-charcoal-600 hover:text-charcoal-300 hover:bg-charcoal-800/5 active:scale-[0.99] cursor-pointer"
        }`}
      >
        {isAdding ? (
          <div className="flex items-center gap-2">
            <span className={`w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin ${isDark ? "border-gold-400" : "border-charcoal-400"}`} />
            <span>Adding...</span>
          </div>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
};

export default PurchasePanel;
