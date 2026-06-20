import React from "react";
import { useNavigate } from "react-router";

const HomeFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-charcoal-900 border-t border-charcoal-800">
      {/* Main Footer Grid */}
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand Column */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2 1.8-3.5 3-3.5s2 1 2 2c0 1.5-1.5 2-3 3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5L2.5 16.5c-.6.4-.3 1.2.4 1.2h18.2c.7 0 1-.8.4-1.2L12 9.5z" />
              </svg>
              <span className="font-display text-xs font-bold tracking-[0.25em] text-gold-400 leading-none">LUMIÈRE</span>
            </div>
            <p className="font-sans text-xs text-charcoal-500 leading-relaxed max-w-xs">
              A curated marketplace for premium fashion. Connecting discerning buyers with independent fashion creators worldwide.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-5">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal-400 block">
              Explore
            </span>
            <nav className="flex flex-col gap-3">
              <a href="#featured" className="font-sans text-xs text-charcoal-500 hover:text-gold-400 transition-colors duration-200">
                Featured Collection
              </a>
              <a href="#collection" className="font-sans text-xs text-charcoal-500 hover:text-gold-400 transition-colors duration-200">
                All Products
              </a>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-sans text-xs text-charcoal-500 hover:text-gold-400 transition-colors duration-200 text-left bg-transparent border-none cursor-pointer p-0"
              >
                Become a Seller
              </button>
            </nav>
          </div>

          {/* Account Column */}
          <div className="space-y-5">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal-400 block">
              Account
            </span>
            <nav className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-sans text-xs text-charcoal-500 hover:text-gold-400 transition-colors duration-200 text-left bg-transparent border-none cursor-pointer p-0"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-sans text-xs text-charcoal-500 hover:text-gold-400 transition-colors duration-200 text-left bg-transparent border-none cursor-pointer p-0"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => navigate("/seller/dashboard")}
                className="font-sans text-xs text-charcoal-500 hover:text-gold-400 transition-colors duration-200 text-left bg-transparent border-none cursor-pointer p-0"
              >
                Seller Dashboard
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800 px-8 md:px-16 py-6">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest uppercase">
            © 2026 Lumière Maison. All Rights Reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest hover:text-gold-400 transition-colors uppercase">
              Terms of Service
            </a>
            <a href="#" className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest hover:text-gold-400 transition-colors uppercase">
              Privacy Policy
            </a>
            <a href="#" className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest hover:text-gold-400 transition-colors uppercase">
              Seller Guidelines
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
