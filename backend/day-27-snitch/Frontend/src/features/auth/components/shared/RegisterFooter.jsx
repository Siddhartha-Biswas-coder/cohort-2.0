import React from "react";

const RegisterFooter = () => {
  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800 w-full px-8 md:px-16 py-12 flex flex-col items-center justify-between gap-6 mt-auto">
      <div className="font-display text-xs tracking-[0.3em] font-semibold text-gold-500">
        LUMIÈRE
      </div>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        <a
          href="#"
          className="text-[9px] font-display uppercase tracking-[0.15em] text-charcoal-500 hover:text-gold-400 transition-colors"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-[9px] font-display uppercase tracking-[0.15em] text-charcoal-500 hover:text-gold-400 transition-colors"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="text-[9px] font-display uppercase tracking-[0.15em] text-charcoal-500 hover:text-gold-400 transition-colors"
        >
          Sustainability
        </a>
        <a
          href="#"
          className="text-[9px] font-display uppercase tracking-[0.15em] text-charcoal-500 hover:text-gold-400 transition-colors"
        >
          Contact
        </a>
      </div>
      <div className="text-[9px] font-display uppercase tracking-[0.15em] text-charcoal-600 text-center">
        © 2026 LUMIÈRE PLATFORM. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default RegisterFooter;
