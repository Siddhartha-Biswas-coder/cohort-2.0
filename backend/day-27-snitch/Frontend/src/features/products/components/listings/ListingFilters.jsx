import React from "react";

const ListingFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCurrency,
  setSelectedCurrency,
  sortBy,
  setSortBy,
  currencies = [],
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
          placeholder="SEARCH COLLECTIONS BY TITLE..."
          className="w-full h-10 pl-11 pr-4 bg-charcoal-950/20 border border-charcoal-800 rounded-lg text-charcoal-200 placeholder:text-charcoal-600/80 font-sans text-xs tracking-wider focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-500/20 transition-all"
        />
      </div>

      {/* Select Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Currency Filter */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-display uppercase tracking-widest text-charcoal-500">
            Currency
          </label>
          <div className="relative min-w-32">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="appearance-none h-10 pl-3 pr-8 bg-charcoal-950/20 border border-charcoal-800 rounded-lg text-charcoal-300 font-sans text-xs tracking-wider focus:outline-none focus:border-gold-400 cursor-pointer w-full"
            >
              <option value="All">All Currencies</option>
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-charcoal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-display uppercase tracking-widest text-charcoal-500">
            Sort
          </label>
          <div className="relative min-w-44">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none h-10 pl-3 pr-8 bg-charcoal-950/20 border border-charcoal-800 rounded-lg text-charcoal-300 font-sans text-xs tracking-wider focus:outline-none focus:border-gold-400 cursor-pointer w-full"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
            <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-charcoal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingFilters;
