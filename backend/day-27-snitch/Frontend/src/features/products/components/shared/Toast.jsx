import React from "react";

/**
 * Toast — premium notification banner
 * Props:
 *   title:   string – bold heading (e.g. "Success", "Maison Catalog")
 *   message: string – descriptive body text
 *   icon:    ReactNode (optional) – custom SVG icon; defaults to info circle
 */
const Toast = ({ title, message, icon }) => {
  return (
    <div className="fixed top-24 right-6 z-9999 p-4 bg-charcoal-900 border border-gold-400 text-gold-50 shadow-gold-glow flex items-center gap-3 animate-error-fade-in-up">
      {icon || (
        <svg className="w-5 h-5 text-gold-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      <div className="flex flex-col">
        <span className="font-display text-[10px] font-bold uppercase tracking-widest text-gold-400">
          {title}
        </span>
        <span className="text-xs font-sans text-charcoal-300 font-light mt-0.5">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;
