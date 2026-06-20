import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct.js";

// Home page components
import HomeNavbar from "../components/home/HomeNavbar.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import FeaturedCollection from "../components/home/FeaturedCollection.jsx";
import ListingFilters from "../components/listings/ListingFilters.jsx";
import HomeProductCard from "../components/home/HomeProductCard.jsx";
import HomeEmptyState from "../components/home/HomeEmptyState.jsx";
import HomeFooter from "../components/home/HomeFooter.jsx";

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const products = useSelector((state) => state.product.allProducts);

  // Filter & sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  // Extract unique currencies from products
  const currencies = useMemo(() => {
    if (!products || products.length === 0) return [];
    const currSet = new Set(
      products.map((p) => p.price?.currency).filter(Boolean)
    );
    return Array.from(currSet);
  }, [products]);

  // Filtered + sorted products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    // Search
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

    // Sort
    if (sortBy === "newest") {
      result.reverse();
    } else if (sortBy === "oldest") {
      // default insertion order
    } else if (sortBy === "priceLowHigh") {
      result.sort(
        (a, b) =>
          (parseFloat(a.price?.amount) || 0) -
          (parseFloat(b.price?.amount) || 0)
      );
    } else if (sortBy === "priceHighLow") {
      result.sort(
        (a, b) =>
          (parseFloat(b.price?.amount) || 0) -
          (parseFloat(a.price?.amount) || 0)
      );
    }

    return result;
  }, [products, searchQuery, selectedCurrency, sortBy]);

  const hasProducts = products && products.length > 0;

  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-400 antialiased">
      {/* Navigation */}
      <HomeNavbar />

      {/* Hero */}
      <HeroSection />

      {/* Featured Collection */}
      {hasProducts && <FeaturedCollection products={products} />}

      {/* Product Discovery Section */}
      <section id="collection" className="px-8 md:px-16 py-16 md:py-24 max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-400 block mb-4">
            Marketplace
          </span>
          <div className="w-8 h-px bg-gold-400 mx-auto mb-6" />
          <h2 className="font-display text-2xl md:text-3xl font-light text-charcoal-200 tracking-wider uppercase mb-3">
            Explore The Collection
          </h2>
          <p className="font-sans text-xs text-charcoal-500 tracking-wide max-w-md mx-auto">
            Browse pieces curated from premium sellers.
          </p>
        </div>

        {/* Filters */}
        {hasProducts && (
          <ListingFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            sortBy={sortBy}
            setSortBy={setSortBy}
            currencies={currencies}
            placeholder="SEARCH BY TITLE..."
          />
        )}

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <HomeProductCard key={product.productId} product={product} />
            ))}
          </div>
        ) : (
          <HomeEmptyState />
        )}
      </section>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default Home;
