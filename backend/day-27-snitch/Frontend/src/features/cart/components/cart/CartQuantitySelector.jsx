import React from "react";

const CartQuantitySelector = ({ quantity, onDecrease, onIncrease, max = Infinity }) => {
  const canDecrease = quantity > 1;
  const canIncrease = quantity < max;

  return (
    <div className="flex items-center gap-0 select-none">
      <button
        type="button"
        onClick={onDecrease}
        disabled={!canDecrease}
        className={`w-8 h-8 flex items-center justify-center border border-charcoal-800/70 font-sans text-sm transition-all duration-200
          ${canDecrease
            ? "text-charcoal-400 hover:text-charcoal-200 hover:border-charcoal-600 active:scale-95 cursor-pointer"
            : "text-charcoal-700 cursor-not-allowed opacity-40"
          }`}
        aria-label="Decrease quantity"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>

      <div className="w-10 h-8 flex items-center justify-center border-y border-charcoal-800/70 font-display text-sm text-charcoal-300 font-medium">
        {quantity}
      </div>

      <button
        type="button"
        onClick={onIncrease}
        disabled={!canIncrease}
        className={`w-8 h-8 flex items-center justify-center border border-charcoal-800/70 font-sans text-sm transition-all duration-200
          ${canIncrease
            ? "text-charcoal-400 hover:text-charcoal-200 hover:border-charcoal-600 active:scale-95 cursor-pointer"
            : "text-charcoal-700 cursor-not-allowed opacity-40"
          }`}
        aria-label="Increase quantity"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
};

export default CartQuantitySelector;
