import React from "react";

const RoleToggle = ({ isSeller, onChange }) => {
  return (
    <div className="flex bg-charcoal-950 p-1 border border-charcoal-800 rounded-none mb-8">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`flex-1 py-3 text-xs font-display uppercase tracking-widest transition-all duration-300 cursor-pointer ${
          isSeller
            ? "bg-gold-400 text-charcoal-950 font-semibold shadow-gold-glow"
            : "text-charcoal-500 hover:text-charcoal-300"
        }`}
      >
        Seller
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex-1 py-3 text-xs font-display uppercase tracking-widest transition-all duration-300 cursor-pointer ${
          !isSeller
            ? "bg-gold-400 text-charcoal-950 font-semibold shadow-gold-glow"
            : "text-charcoal-500 hover:text-charcoal-300"
        }`}
      >
        Buyer
      </button>
    </div>
  );
};

export default RoleToggle;
