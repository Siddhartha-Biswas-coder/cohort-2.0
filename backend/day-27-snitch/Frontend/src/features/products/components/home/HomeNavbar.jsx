import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import ThemeToggle from "../../../../app/components/ThemeToggle.jsx";

const HomeNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.length;
  const isCartActive = location.pathname === "/cart";

  // Badge pop animation on count change
  const [badgeAnim, setBadgeAnim] = useState(false);
  const prevCount = useRef(itemCount);
  useEffect(() => {
    if (itemCount !== prevCount.current) {
      setBadgeAnim(true);
      const t = setTimeout(() => setBadgeAnim(false), 400);
      prevCount.current = itemCount;
      return () => clearTimeout(t);
    }
  }, [itemCount]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Badge pop keyframe injected once */}
      <style>{`
        @keyframes badgePop {
          0% { transform: scale(1); }
          40% { transform: scale(1.45); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .badge-pop { animation: badgePop 380ms cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <nav className="bg-charcoal-900/80 backdrop-blur-md border-b border-charcoal-800 flex justify-between items-center w-full px-8 md:px-16 py-5 fixed top-0 left-0 z-50">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-95 transition-opacity select-none"
          onClick={() => navigate("/")}
        >
          <svg className="w-7 h-7 text-gold-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2 1.8-3.5 3-3.5s2 1 2 2c0 1.5-1.5 2-3 3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5L2.5 16.5c-.6.4-.3 1.2.4 1.2h18.2c.7 0 1-.8.4-1.2L12 9.5z" />
          </svg>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-[0.25em] text-gold-400 leading-none">LUMIÈRE</span>
            <span className="text-[7px] font-sans text-charcoal-500 uppercase tracking-widest mt-1">Premium Fashion, Made for You</span>
          </div>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex gap-10 items-center">
          <button
            type="button"
            onClick={() => scrollToSection("featured")}
            className="font-display text-[10px] uppercase tracking-[0.2em] text-charcoal-500 hover:text-gold-400 transition-colors duration-300 cursor-pointer bg-transparent border-none"
          >
            Featured
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("collection")}
            className="font-display text-[10px] uppercase tracking-[0.2em] text-charcoal-500 hover:text-gold-400 transition-colors duration-300 cursor-pointer bg-transparent border-none"
          >
            Collection
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-display text-[10px] uppercase tracking-[0.2em] text-charcoal-500 hover:text-gold-400 transition-colors duration-300 cursor-pointer bg-transparent border-none"
          >
            Become a Seller
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <ThemeToggle />

          {/* Sign In — desktop only */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-display text-[10px] uppercase tracking-[0.2em] text-charcoal-500 hover:text-gold-400 transition-colors duration-300 cursor-pointer bg-transparent border-none hidden sm:block"
          >
            Sign In
          </button>

          {/* Cart Icon */}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            aria-label={`Shopping cart (${itemCount} items)`}
            className={`relative flex items-center justify-center w-9 h-9 transition-all duration-300 cursor-pointer bg-transparent border-none group
              ${isCartActive ? "text-gold-400" : "text-charcoal-500 hover:text-gold-400"}`}
            style={{
              filter: isCartActive ? "drop-shadow(0 0 6px rgba(197,160,89,0.35))" : undefined,
            }}
            onMouseEnter={(e) => {
              if (!isCartActive) e.currentTarget.style.filter = "drop-shadow(0 0 5px rgba(197,160,89,0.2))";
            }}
            onMouseLeave={(e) => {
              if (!isCartActive) e.currentTarget.style.filter = "";
            }}
          >
            {/* Shopping bag icon */}
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>

            {/* Badge */}
            {itemCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 min-w-4 h-4 px-1 flex items-center justify-center
                  bg-gold-400 text-charcoal-950 font-display text-[9px] font-bold rounded-full
                  ${badgeAnim ? "badge-pop" : ""}`}
              >
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          {/* Mobile user icon */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="sm:hidden text-charcoal-500 hover:text-gold-400 transition-colors cursor-pointer bg-transparent border-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default HomeNavbar;

