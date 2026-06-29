import React from "react";

const StockBadge = ({ stock = 0 }) => {
  let text = "";
  let badgeClasses = "";

  if (stock === 0) {
    text = "Out of Stock";
    badgeClasses = "border-charcoal-800 text-charcoal-500 bg-charcoal-950/10";
  } else if (stock <= 5) {
    text = `Only ${stock} Left`;
    badgeClasses = "border-red-900/35 text-red-400 bg-red-950/20 shadow-[0_0_12px_rgba(239,68,68,0.05)]";
  } else if (stock <= 20) {
    text = `Low Inventory (${stock} Left)`;
    badgeClasses = "border-amber-900/30 text-amber-400 bg-amber-950/15 shadow-[0_0_12px_rgba(245,158,11,0.03)]";
  } else {
    text = `In Stock (${stock} Available)`;
    badgeClasses = "border-emerald-900/30 text-emerald-400 bg-emerald-950/15 shadow-[0_0_12px_rgba(16,185,129,0.03)]";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 border rounded-xs font-display text-[9px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${badgeClasses}`}>
      {text}
    </span>
  );
};

export default StockBadge;
