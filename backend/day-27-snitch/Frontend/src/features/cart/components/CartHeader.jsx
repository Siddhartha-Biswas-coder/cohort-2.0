import React from "react";

const CartHeader = ({ itemCount = 0 }) => {
  return (
    <div
      className="mb-12 pb-8 border-b border-charcoal-800/40 animate-reveal"
      style={{ animationDelay: "100ms" }}
    >
      <div className="flex items-baseline gap-4">
        <h1 className="font-display text-4xl md:text-5xl font-light text-charcoal-200 uppercase tracking-[0.08em]">
          Shopping Cart
        </h1>
        {itemCount > 0 && (
          <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500 border border-charcoal-800/60 px-2.5 py-1 rounded-full">
            {itemCount} {itemCount === 1 ? "Piece" : "Pieces"}
          </span>
        )}
      </div>
      <p className="font-sans text-sm text-charcoal-500 font-light mt-2 tracking-wide">
        Review your selected pieces before checkout.
      </p>
    </div>
  );
};

export default CartHeader;
