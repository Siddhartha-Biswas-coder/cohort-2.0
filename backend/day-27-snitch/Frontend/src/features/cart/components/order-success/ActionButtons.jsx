import React from "react";
import { useNavigate } from "react-router";

const ActionButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-8 animate-reveal" style={{ animationDelay: "350ms" }}>
      {/* Continue Shopping button - Primary (Adaptive Solid background) */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="w-full sm:w-auto px-10 py-4 bg-charcoal-200 text-charcoal-950 hover:bg-gold-400 hover:text-charcoal-950 font-sans text-[10px] uppercase font-bold tracking-[0.25em] transition-all duration-300 cursor-pointer rounded-none border border-transparent active:scale-[0.98]"
      >
        Continue Shopping
      </button>

      {/* View Orders button - Secondary (Adaptive Border and Text) */}
      <button
        type="button"
        onClick={() => alert("Orders feature coming soon.")}
        className="w-full sm:w-auto px-10 py-4 bg-transparent text-charcoal-200 border border-charcoal-800 hover:border-gold-400 hover:text-gold-400 font-sans text-[10px] uppercase font-bold tracking-[0.25em] transition-all duration-300 cursor-pointer rounded-none active:scale-[0.98]"
      >
        View Orders
      </button>

      {/* Download Invoice (UI only, minimal style) */}
      <button
        type="button"
        onClick={() => alert("Invoice download coming soon.")}
        className="w-full sm:w-auto px-6 py-4 bg-transparent text-charcoal-400 hover:text-gold-400 font-sans text-[9px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer rounded-none active:scale-[0.98]"
      >
        Download Invoice
      </button>
    </div>
  );
};

export default ActionButtons;
