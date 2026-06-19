import React from "react";

const ListingActions = ({ onView, onEdit, onDelete }) => {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-charcoal-950/70 border-t border-charcoal-900/60 py-3.5 px-4 backdrop-blur-xs flex items-center justify-center gap-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 pointer-events-auto">
      {/* View Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onView();
        }}
        className="text-charcoal-400 hover:text-gold-400 transition-colors duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none"
        title="View details"
      >
        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span className="font-display text-[9px] uppercase tracking-wider font-semibold">View</span>
      </button>

      <div className="w-px h-3.5 bg-charcoal-800"></div>

      {/* Edit Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="text-charcoal-400 hover:text-gold-400 transition-colors duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none"
        title="Edit product"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span className="font-display text-[9px] uppercase tracking-wider font-semibold">Edit</span>
      </button>

      <div className="w-px h-3.5 bg-charcoal-800"></div>

      {/* Delete Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-charcoal-400 hover:text-red-400 transition-colors duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none"
        title="Delete product"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span className="font-display text-[9px] uppercase tracking-wider font-semibold">Delete</span>
      </button>
    </div>
  );
};

export default ListingActions;
