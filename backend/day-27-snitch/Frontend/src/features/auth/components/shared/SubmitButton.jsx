import React from "react";

const SubmitButton = ({ loading, disabled, children }) => {
  const isButtonDisabled = disabled || loading;

  return (
    <button
      type="submit"
      disabled={isButtonDisabled}
      className={`w-full py-4 mt-4 font-display text-[10px] uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gold-500/30 cursor-pointer rounded-lg relative overflow-hidden group ${
        isButtonDisabled
          ? "bg-charcoal-800 text-charcoal-500 cursor-not-allowed border border-transparent"
          : "bg-gold-400 text-[#0a0a0a] hover:opacity-90 active:scale-[0.99] border border-transparent"
      }`}
    >

      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </span>
      ) : (
        <span className="font-bold">
          {children}
        </span>
      )}
    </button>
  );
};

export default SubmitButton;
