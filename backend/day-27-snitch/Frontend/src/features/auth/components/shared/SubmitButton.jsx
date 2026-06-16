import React from "react";

const SubmitButton = ({ loading, disabled, children }) => {
  const isButtonDisabled = disabled || loading;

  return (
    <button
      type="submit"
      disabled={isButtonDisabled}
      className={`w-full py-4 mt-4 font-display text-xs uppercase tracking-[0.15em] transition-all duration-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 cursor-pointer rounded-lg relative overflow-hidden group ${
        isButtonDisabled
          ? "bg-charcoal-800 text-charcoal-500 cursor-not-allowed border border-transparent"
          : "bg-charcoal-950/45 text-charcoal-200 border border-gold-400/20 hover:border-gold-400/50 hover:bg-charcoal-900/60 hover:shadow-[0_0_15px_rgba(212,175,55,0.06)] hover:scale-[1.002] active:scale-[0.99]"
      }`}
    >
      {/* Subtle sliding gold overlay background effect (only when active) */}
      {!isButtonDisabled && (
        <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-gold-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      )}

      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </span>
      ) : (
        <span className="font-semibold text-charcoal-200 group-hover:text-gold-400 transition-colors duration-300">
          {children}
        </span>
      )}
    </button>
  );
};

export default SubmitButton;
