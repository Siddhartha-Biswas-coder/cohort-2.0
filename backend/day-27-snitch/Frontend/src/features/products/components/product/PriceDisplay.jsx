import React, { useState, useEffect } from "react";

const PriceDisplay = ({ price = {} }) => {
  const [displayPrice, setDisplayPrice] = useState(price);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (price.amount !== displayPrice.amount || price.currency !== displayPrice.currency) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayPrice(price);
        setIsTransitioning(false);
      }, 200); // Elegant, rapid fade out/in
      return () => clearTimeout(timer);
    }
  }, [price, displayPrice]);

  const formattedAmount = displayPrice.amount
    ? parseFloat(displayPrice.amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })
    : "0.00";

  return (
    <div
      className={`flex items-baseline gap-1.5 transition-all duration-300 ${
        isTransitioning
          ? "opacity-20 translate-y-0.5 filter blur-xs"
          : "opacity-100 translate-y-0 filter blur-none"
      }`}
    >
      <span className="font-sans text-xs font-semibold tracking-wider text-gold-400 uppercase">
        {displayPrice.currency || "INR"}
      </span>
      <span className="font-display text-2xl md:text-3xl text-gold-400 font-medium tracking-tight">
        {formattedAmount}
      </span>
    </div>
  );
};

export default PriceDisplay;
