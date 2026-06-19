import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct.js";
import ThemeToggle from "../../../app/components/ThemeToggle.jsx";

// Import listings components
import ListingHeader from "../components/listings/ListingHeader.jsx";
import ListingFilters from "../components/listings/ListingFilters.jsx";
import ListingGrid from "../components/listings/ListingGrid.jsx";
import EmptyListings from "../components/listings/EmptyListings.jsx";

const SellerDashBoard = () => {
  const navigate = useNavigate();
  const { handleGetSellerProducts } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);

  // Local state for local listings manipulation (e.g. deletion) & filtering
  const [localProducts, setLocalProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  
  // Custom toast notification feedback
  const [toast, setToast] = useState(null);

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  useEffect(() => {
    if (sellerProducts) {
      setLocalProducts(sellerProducts);
    }
  }, [sellerProducts]);

  // Extract unique currencies dynamically
  const currencies = useMemo(() => {
    if (!sellerProducts) return [];
    const currSet = new Set(
      sellerProducts.map((p) => p.price?.currency).filter(Boolean)
    );
    return Array.from(currSet);
  }, [sellerProducts]);

  // Handle client-side mock actions
  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleView = (product) => {
    showToast(
      "Maison Catalog",
      `Viewing details for item "${product.title}" (ID: ${product.productId.substring(0, 8)}).`
    );
  };

  const handleEdit = (product) => {
    showToast(
      "Maison Designer",
      `Edit panel initialized for item "${product.title}".`
    );
  };

  const handleDelete = (product) => {
    // Delete locally
    setLocalProducts((prev) =>
      prev.filter((p) => p.productId !== product.productId)
    );
    showToast(
      "Maison Inventory",
      `Listing "${product.title}" has been archived and removed from your gallery.`
    );
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    let result = [...localProducts];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Currency filter
    if (selectedCurrency !== "All") {
      result = result.filter((p) => p.price?.currency === selectedCurrency);
    }

    // Sort order
    if (sortBy === "newest") {
      result.reverse(); // Reverse standard insertion order
    } else if (sortBy === "oldest") {
      // Keep standard insertion order
    } else if (sortBy === "priceLowHigh") {
      result.sort((a, b) => (parseFloat(a.price?.amount) || 0) - (parseFloat(b.price?.amount) || 0));
    } else if (sortBy === "priceHighLow") {
      result.sort((a, b) => (parseFloat(b.price?.amount) || 0) - (parseFloat(a.price?.amount) || 0));
    }

    return result;
  }, [localProducts, searchQuery, selectedCurrency, sortBy]);

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col md:flex-row text-charcoal-400 select-none antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-charcoal-900 border border-gold-400 text-gold-50 shadow-gold-glow flex items-center gap-3 animate-error-fade-in-up">
          <svg className="w-5 h-5 text-gold-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex flex-col">
            <span className="font-display text-[10px] font-bold uppercase tracking-widest text-gold-400">{toast.title}</span>
            <span className="text-xs font-sans text-charcoal-300 font-light mt-0.5">{toast.message}</span>
          </div>
        </div>
      )}

      {/* SideNavBar - Luxury Desktop Side Drawer */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-charcoal-900 border-r border-charcoal-800 py-8 z-50">
        <div className="px-8 mb-10 flex items-center gap-2.5">
          <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2 1.8-3.5 3-3.5s2 1 2 2c0 1.5-1.5 2-3 3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5L2.5 16.5c-.6.4-.3 1.2.4 1.2h18.2c.7 0 1-.8.4-1.2L12 9.5z" />
          </svg>
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold tracking-[0.25em] text-gold-400 leading-none">LUMIÈRE</span>
            <span className="text-[7px] font-sans text-charcoal-500 uppercase tracking-widest mt-1">Verified Seller</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="grow px-2">
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                className="w-full flex items-center px-6 py-3 text-[10px] font-display font-semibold uppercase tracking-widest text-gold-400 border-r-2 border-gold-400 bg-charcoal-950/30 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
                Dashboard
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigate("/seller/create-listing")}
                className="w-full flex items-center px-6 py-3 text-[10px] font-display font-semibold uppercase tracking-widest text-charcoal-500 hover:text-gold-400 hover:bg-charcoal-950/40 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Create Listing
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full flex items-center px-6 py-3 text-[10px] font-display font-semibold uppercase tracking-widest text-charcoal-500 hover:text-gold-400 hover:bg-charcoal-950/40 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9-7h2a2 2 0 012 2v5a2 2 0 01-2 2h-2a2 2 0 01-2-2v-5a2 2 0 012-2z" />
                </svg>
                Sales & Analytics
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer controls */}
        <div className="px-6 py-6 border-t border-charcoal-800/80">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full flex items-center px-2 py-2 text-[10px] font-display font-semibold uppercase tracking-widest text-charcoal-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="grow md:pl-64 min-h-screen flex flex-col justify-between">
        {/* TopNavBar */}
        <header className="w-full h-16 flex justify-between items-center px-8 md:px-16 bg-charcoal-950 border-b border-charcoal-900 sticky top-0 z-40">
          <span className="font-display text-[10px] font-bold tracking-[0.3em] text-gold-400 select-none uppercase">
            PRODUCT LISTING WORKSPACE
          </span>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <button className="text-charcoal-500 hover:text-gold-400 transition-colors cursor-pointer flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-7 h-7 bg-charcoal-900 border border-charcoal-800 rounded-full flex items-center justify-center overflow-hidden">
              <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
              </svg>
            </div>
          </div>
        </header>

        {/* Workspace Container */}
        <div className="grow px-8 md:px-16 py-12 max-w-300 w-full mx-auto">
          {/* Header Title Block */}
          <ListingHeader />

          {/* Filters Control Block */}
          {localProducts.length > 0 && (
            <ListingFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
              sortBy={sortBy}
              setSortBy={setSortBy}
              currencies={currencies}
            />
          )}

          {/* listings Grid layout or empty state fallback */}
          {filteredProducts.length > 0 ? (
            <ListingGrid
              products={filteredProducts}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <EmptyListings />
          )}
        </div>

        {/* Sticky Mobile Navigation (Hidden on desktop) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-charcoal-950 border-t border-charcoal-850 px-6 py-4 flex gap-4">
          <button
            type="button"
            className="flex-1 py-3 bg-gold-400 text-[#0a0a0a] font-display font-bold uppercase tracking-widest text-center cursor-pointer"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => navigate("/seller/create-listing")}
            className="flex-1 py-3 border border-charcoal-800 text-[10px] font-display font-semibold uppercase tracking-widest text-charcoal-400 cursor-pointer"
          >
            Create Listing
          </button>
        </div>

        {/* Footer */}
        <footer className="w-full py-8 border-t border-charcoal-900 bg-charcoal-950 flex flex-col md:flex-row justify-between items-center px-8 md:px-16 gap-4 mt-auto">
          <span className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest uppercase">
            © 2026 LUMIÈRE MAISON. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-8 text-[9px] font-display font-semibold tracking-widest text-charcoal-500 uppercase">
            <a href="#" className="hover:text-gold-400 transition-colors">Support</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Maison Policies</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Seller Guide</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default SellerDashBoard;
