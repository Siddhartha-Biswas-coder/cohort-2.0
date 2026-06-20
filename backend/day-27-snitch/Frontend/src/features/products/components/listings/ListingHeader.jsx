import React from "react";
import { useNavigate } from "react-router";

const ListingHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 select-none">
      <div className="space-y-2">
        <span 
          className="text-[10px] font-display font-semibold uppercase tracking-[0.3em] text-gold-400 block animate-reveal"
          style={{ animationDelay: "0ms" }}
        >
          My Collection
        </span>
        <h2 
          className="font-display text-2xl md:text-3xl font-light text-charcoal-200 tracking-wider uppercase leading-none animate-reveal"
          style={{ animationDelay: "80ms" }}
        >
          Your Listings
        </h2>
        <p 
          className="text-xs text-charcoal-500 font-sans tracking-wide animate-reveal"
          style={{ animationDelay: "160ms" }}
        >
          Manage, review and curate your marketplace inventory.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/seller/create-listing")}
        className="px-6 py-3 bg-gold-400 hover:opacity-90 text-[#0a0a0a] font-display text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border border-transparent rounded-lg active:scale-[0.98] cursor-pointer animate-reveal"
        style={{ animationDelay: "240ms" }}
      >
        Create Listing
      </button>
    </div>
  );
};

export default ListingHeader;
