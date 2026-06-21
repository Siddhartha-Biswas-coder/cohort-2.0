import React from "react";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Variant SKU",
  message = "Are you sure you want to remove this variant? This action cannot be undone."
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none animate-reveal">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Dialog Body */}
      <div className="relative w-full max-w-sm bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 md:p-8 shadow-card-glow z-10">
        {/* Warning Icon & Headings */}
        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          <div className="p-3 bg-red-950/30 border border-red-500/20 rounded-full text-red-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-xs font-semibold text-charcoal-200 uppercase tracking-wider">
              {title}
            </h3>
            <p className="font-sans text-[11px] text-charcoal-400 font-light leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 border border-charcoal-700 dark:border-charcoal-800 hover:border-charcoal-500 dark:hover:border-charcoal-600 text-[10px] font-display font-semibold uppercase tracking-widest text-charcoal-400 hover:text-charcoal-300 dark:hover:text-charcoal-200 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 h-11 bg-red-600 hover:bg-red-500 text-white font-display text-[10px] font-bold uppercase tracking-widest text-center hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] transition-all cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
