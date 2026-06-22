import React from "react";

const StockBadge = ({ stock = 0 }) => {
  let text = "";
  let badgeClasses = "";

  if (stock === 0) {
    text = "Out of Stock";
    badgeClasses = "border-charcoal-700/50 text-charcoal-500 bg-charcoal-800/10";
  } else if (stock <= 5) {
    text = `Only ${stock} Left`;
    badgeClasses = "border-gold-500/35 text-gold-500/90 bg-gold-400/5";
  } else if (stock <= 10) {
    text = "Low Inventory";
    badgeClasses = "border-gold-500/25 text-gold-500/80 bg-gold-400/3";
  } else {
    text = "In Stock";
    badgeClasses = "border-charcoal-800 text-charcoal-400 bg-charcoal-900/30";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 border rounded-xs font-display text-[9px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${badgeClasses}`}>
      {text}
    </span>
  );
};

export default StockBadge;
