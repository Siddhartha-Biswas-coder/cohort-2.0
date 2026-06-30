import React from "react";
import { useNavigate } from "react-router";

const ActionButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-8 animate-reveal" style={{ animationDelay: "350ms" }}>
      {/* Continue Shopping button - Primary (Solid white background with black text) */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="w-full sm:w-auto px-10 py-4 bg-white text-black hover:bg-gold-400 hover:text-black font-sans text-[10px] uppercase font-semibold tracking-[0.25em] transition-colors duration-500 cursor-pointer rounded-none border border-transparent"
      >
        Continue Shopping
      </button>

      {/* View Orders button - Secondary (Transparent background with a 1px white border) */}
      <button
        type="button"
        onClick={() => alert("Orders feature coming soon.")}
        className="w-full sm:w-auto px-10 py-4 bg-transparent text-white border border-white/20 hover:border-gold-400/50 hover:text-gold-400 font-sans text-[10px] uppercase font-semibold tracking-[0.25em] transition-colors duration-500 cursor-pointer rounded-none"
      >
        View Orders
      </button>

      {/* Download Invoice (UI only, minimal style) */}
      <button
        type="button"
        onClick={() => alert("Invoice download coming soon.")}
        className="w-full sm:w-auto px-6 py-4 bg-transparent text-charcoal-400 hover:text-white font-sans text-[9px] uppercase tracking-[0.2em] transition-colors duration-500 cursor-pointer rounded-none"
      >
        Download Invoice
      </button>
    </div>
  );
};

export default ActionButtons;
