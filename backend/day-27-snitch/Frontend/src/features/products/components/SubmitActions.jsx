import React from "react";

const SubmitActions = ({ isSubmitting, submitError, onPublish, onSaveDraft, onDiscard }) => {
  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Submission error feedback */}
      {submitError && (
        <div className="p-4 bg-red-950/20 border border-red-900/40 text-red-400 text-xs font-sans tracking-wide leading-relaxed animate-error-fade-in-up">
          <span className="font-bold uppercase tracking-wider block mb-1">Maison System Error</span>
          {submitError}
        </div>
      )}

      {/* Button controls */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
        {onDiscard && (
          <button
            type="button"
            onClick={onDiscard}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 border border-charcoal-800 text-charcoal-400 hover:text-gold-400 hover:border-gold-400/30 font-display text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gold-500/25 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            Discard
          </button>
        )}

        {onSaveDraft && (
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 bg-charcoal-900 border border-charcoal-800 text-charcoal-300 hover:text-gold-500 hover:border-charcoal-700 font-display text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gold-500/25 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            Save Draft
          </button>
        )}

        <button
          type="button"
          onClick={onPublish}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-10 py-3.5 bg-gold-400 hover:opacity-90 text-[#0a0a0a] font-display text-[10px] font-bold uppercase tracking-[0.2em] border border-transparent active:scale-[0.99] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gold-600 disabled:opacity-50 disabled:pointer-events-none cursor-pointer relative"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-3 w-3 text-[#0a0a0a]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Publishing...
            </span>
          ) : (
            "Publish Product"
          )}
        </button>
      </div>
    </div>
  );
};

export default SubmitActions;
