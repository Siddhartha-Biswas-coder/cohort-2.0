import React from "react";
import { useNavigate } from "react-router";

const CartBreadcrumb = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center gap-2 mb-10 select-none animate-reveal" style={{ animationDelay: "50ms" }}>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="font-display text-[9px] uppercase tracking-[0.2em] text-charcoal-500 hover:text-gold-400 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
      >
        Home
      </button>
      <span className="text-gold-400/40 text-[10px] select-none">›</span>
      <span className="font-display text-[9px] uppercase tracking-[0.2em] text-charcoal-400">
        Shopping Cart
      </span>
    </nav>
  );
};

export default CartBreadcrumb;
