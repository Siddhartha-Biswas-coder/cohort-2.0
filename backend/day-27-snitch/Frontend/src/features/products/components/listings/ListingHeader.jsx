import React from "react";
import { useNavigate } from "react-router";

const ListingHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 select-none">
      <div className="space-y-2">
        <span className="text-[10px] font-display font-semibold uppercase tracking-[0.3em] text-gold-400">
          My Collection
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-light text-charcoal-200 tracking-wider uppercase leading-none">
          Your Listings
        </h2>
        <p className="text-xs text-charcoal-500 font-sans tracking-wide">
          Manage, review and curate your marketplace inventory.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/seller/create-listing")}
        className="px-6 py-3 bg-gold-400 hover:opacity-90 text-[#0a0a0a] font-display text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border border-transparent rounded-lg active:scale-[0.98] cursor-pointer"
      >
        Create Listing
      </button>
    </div>
  );
};

export default ListingHeader;
