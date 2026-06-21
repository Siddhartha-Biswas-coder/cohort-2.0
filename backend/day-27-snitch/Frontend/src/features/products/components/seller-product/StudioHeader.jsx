import React from "react";

const StudioHeader = ({
  title,
  isEditing,
  onStartEditing,
  onDiscardChanges,
  onSaveChanges,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 border-b border-charcoal-900/60 mb-10 gap-6">
      <div className="space-y-1">
        <span className="text-[9px] font-display font-semibold uppercase tracking-[0.25em] text-gold-400">
          Seller Workspace
        </span>
        <h1 className="text-3xl md:text-4xl font-display font-light uppercase tracking-widest text-charcoal-200 mt-1">
          {title}
        </h1>
        <p className="text-xs text-charcoal-500 font-sans font-light mt-1 max-w-xl">
          Configure listing information, manage visual media, edit variant dimensions, and update settings.
        </p>
      </div>

      {/* Desktop Controls */}
      <div className="hidden md:flex gap-4">
        {!isEditing ? (
          <button
            type="button"
            onClick={onStartEditing}
            className="h-11 px-6 bg-charcoal-900 border border-charcoal-700 dark:border-charcoal-800 text-gold-600 dark:text-gold-400 font-display text-[10px] font-bold uppercase tracking-widest hover:bg-gold-400 hover:text-charcoal-200 dark:hover:text-charcoal-950 hover:border-gold-400 transition-all duration-300 cursor-pointer w-auto"
          >
            Edit Product
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onDiscardChanges}
              className="h-11 px-6 border border-charcoal-700 dark:border-charcoal-800 hover:border-charcoal-500 dark:hover:border-charcoal-600 text-charcoal-400 hover:text-charcoal-300 dark:hover:text-charcoal-200 font-display text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSaveChanges}
              className="h-11 px-6 bg-gold-400 text-charcoal-200 dark:text-charcoal-950 font-display text-[10px] font-bold uppercase tracking-widest hover:bg-gold-500 hover:shadow-gold-glow transition-all duration-300 cursor-pointer w-auto"
            >
              Save Variant
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudioHeader;
