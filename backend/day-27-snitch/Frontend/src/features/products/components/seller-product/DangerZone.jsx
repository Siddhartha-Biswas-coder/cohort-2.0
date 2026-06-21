import React from "react";

const DangerZone = ({ status, onStatusChange }) => {
  return (
    <div className="bg-charcoal-900 border border-red-950/40 rounded-lg p-6 md:p-8 space-y-6 animate-reveal" style={{ animationDelay: "250ms" }}>
      <div className="space-y-1 pb-4 border-b border-red-950/40">
        <h3 className="font-display text-sm font-light text-red-400 tracking-wider uppercase">
          Danger Zone
        </h3>
        <p className="font-sans text-[11px] text-charcoal-500 font-light">
          Destructive or irreversible management controls for this listing.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-red-500/5 border border-red-500/10 p-5 rounded-md">
        <div className="space-y-1">
          <span className="font-display text-[10px] font-bold text-red-400 uppercase tracking-wider">
            Deactivate or Archive
          </span>
          <p className="text-[10px] text-charcoal-500 font-sans font-light max-w-md leading-relaxed">
            Temporarily withdraw this item from searches. This will preserve SKU data and visual libraries for later activation.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onStatusChange("archived")}
          disabled={status === "archived"}
          className={`h-11 px-6 border font-display text-[10px] font-bold uppercase tracking-widest transition-all duration-200 w-auto ${
            status === "archived"
              ? "border-charcoal-800 text-charcoal-600 cursor-not-allowed bg-transparent"
              : "bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.05)] dark:hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] cursor-pointer"
          }`}
        >
          Archive Listing
        </button>
      </div>
    </div>
  );
};

export default DangerZone;
