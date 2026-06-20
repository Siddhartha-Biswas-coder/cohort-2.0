import React from "react";
import CustomDropdown from "./CustomDropdown.jsx";

const ListingFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCurrency,
  setSelectedCurrency,
  sortBy,
  setSortBy,
  currencies = [],
  placeholder = "SEARCH COLLECTIONS BY TITLE...",
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-8 border-b border-charcoal-900/60 select-none">
      {/* Search Field */}
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-10 pl-11 pr-4 bg-charcoal-950/20 border border-charcoal-800 rounded-lg text-charcoal-200 placeholder:text-charcoal-600/80 font-sans text-xs tracking-wider focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-500/20 transition-all"
        />
      </div>

      {/* Select Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Currency Filter */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-display uppercase tracking-wider text-charcoal-500">
            Currency
          </label>
          <CustomDropdown
            label="Currency"
            options={[{ value: "All", label: "All Currencies" }, ...currencies.map((c) => ({ value: c, label: c }))]}
            selected={selectedCurrency}
            onChange={setSelectedCurrency}
            className="min-w-44"
          />
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-display uppercase tracking-widest text-charcoal-500">
            Sort
          </label>
          <CustomDropdown
            options={[
              { value: "newest", label: "Newest First" },
              { value: "oldest", label: "Oldest First" },
              { value: "priceLowHigh", label: "Price: Low to High" },
              { value: "priceHighLow", label: "Price: High to Low" },
            ]}
            selected={sortBy}
            onChange={setSortBy}
            className="min-w-48"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingFilters;
