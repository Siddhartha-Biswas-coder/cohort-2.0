import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct.js";

// Layout
import SellerLayout from "../components/shared/SellerLayout.jsx";

// Page-specific components
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
      result.reverse();
    } else if (sortBy === "oldest") {
    } else if (sortBy === "priceLowHigh") {
      result.sort((a, b) => (parseFloat(a.price?.amount) || 0) - (parseFloat(b.price?.amount) || 0));
    } else if (sortBy === "priceHighLow") {
      result.sort((a, b) => (parseFloat(b.price?.amount) || 0) - (parseFloat(a.price?.amount) || 0));
    }

    return result;
  }, [localProducts, searchQuery, selectedCurrency, sortBy]);

  // Mobile bottom bar buttons
  const mobileActions = (
    <>
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
    </>
  );

  return (
    <SellerLayout
      activePage="dashboard"
      toast={toast}
      mobileActions={mobileActions}
      footerLinks={[
        { label: "Support", href: "#" },
        { label: "Maison Policies", href: "#" },
        { label: "Seller Guide", href: "#" },
      ]}
    >
      {/* Header Title Block */}
      <ListingHeader />

      {/* Filters Control Block */}
      {localProducts.length > 0 && (
        <div className="animate-reveal" style={{ animationDelay: "320ms" }}>
          <ListingFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            sortBy={sortBy}
            setSortBy={setSortBy}
            currencies={currencies}
          />
        </div>
      )}

      {/* Listings Grid layout or empty state fallback */}
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
    </SellerLayout>
  );
};

export default SellerDashBoard;
