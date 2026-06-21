import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

// Layout & Global Components
import HomeNavbar from "../components/home/HomeNavbar.jsx";
import HomeFooter from "../components/home/HomeFooter.jsx";
import HomeProductCard from "../components/home/HomeProductCard.jsx";
import Toast from "../components/shared/Toast.jsx";

// Page Subcomponents
import ProductGallery from "../components/product/ProductGallery.jsx";
import ProductInfo from "../components/product/ProductInfo.jsx";
import ProductDescription from "../components/product/ProductDescription.jsx";
import ProductActions from "../components/product/ProductActions.jsx";
import ProductDetailsAccordion from "../components/product/ProductDetailsAccordion.jsx";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductDetailsById, handleGetAllProducts } = useProduct();

  // State
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(null);

  // Redux state for related recommendations
  const allProducts = useSelector((state) => state.product.allProducts);
  const [relatedRevealRef, isRelatedRevealed] = useScrollReveal();

  // Fetch product data and load recommendations catalog
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await handleGetProductDetailsById(productId);
      if (data) {
        setProductDetails(data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    // Pre-load all products to populate the related products section
    handleGetAllProducts();
    // Scroll to top when loading new product details
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  // Toast trigger helper
  const triggerToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Filter recommendations (exclude current product and slice to first 3 items)
  const recommendations = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    return allProducts.filter((p) => p.productId !== productId).slice(0, 3);
  }, [allProducts, productId]);

  // Loading State Renderer
  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-950 text-charcoal-400 flex flex-col justify-between">
        <HomeNavbar />
        <div className="flex flex-col items-center justify-center py-40 grow select-none">
          <div className="w-8 h-8 border border-t-gold-400 border-charcoal-800 rounded-full animate-spin mb-4" />
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
            Loading Catalog Details...
          </span>
        </div>
        <HomeFooter />
      </div>
    );
  }

  // Error/Product Not Found Renderer
  if (error || !productDetails) {
    return (
      <div className="min-h-screen bg-charcoal-950 text-charcoal-400 flex flex-col justify-between">
        <HomeNavbar />
        <div className="flex flex-col items-center justify-center text-center px-6 py-40 grow select-none">
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-400 mb-6">
            Maison Lumière
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-light text-charcoal-200 uppercase tracking-widest mb-6">
            Listing Not Found
          </h1>
          <p className="font-sans text-sm text-charcoal-400 font-light max-w-sm mb-10 leading-relaxed">
            The exclusive vintage piece you are looking for has been archived,
            sold, or does not exist.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-10 py-4 bg-gold-400 text-charcoal-950 font-display text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-gold-500 rounded-none cursor-pointer"
          >
            Return to Marketplace
          </button>
        </div>
        <HomeFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-400 flex flex-col justify-between">
      {/* Toast Alert */}
      {toast && <Toast title={toast.title} message={toast.message} />}

      <HomeNavbar />

      {/* Main Luxury Canvas layout */}
      <main className="pt-24 md:pt-28 pb-16 max-w-275 mx-auto px-6 md:px-12 w-full grow">
        <div className="grid grid-cols-1 lg:grid-cols-[53%_1fr] gap-12 lg:gap-20">
          {/* Left Column: Media Gallery */}
          <div className="animate-reveal" style={{ animationDelay: "100ms" }}>
            <ProductGallery
              images={productDetails.images}
              title={productDetails.title}
            />
          </div>

          {/* Right Column: Sticky Product Info panel */}
          <div
            className="flex flex-col relative lg:sticky lg:top-28 h-fit pt-2 animate-reveal"
            style={{ animationDelay: "200ms" }}
          >
            {/* Info details (Title, label, price) */}
            <ProductInfo
              title={productDetails.title}
              price={productDetails.price}
            />

            {/* Narrative story block */}
            <ProductDescription description={productDetails.description} />

            {/* Buy / Cart Action Row */}
            <ProductActions
              onAddToCart={() =>
                triggerToast(
                  "Shopping Bag",
                  `"${productDetails.title}" has been added to your bag.`,
                )
              }
              onBuyNow={() =>
                triggerToast(
                  "Immediate Checkout",
                  `Proceeding to checkout for "${productDetails.title}".`,
                )
              }
            />

            {/* Product Specifications & Care Accordions */}
            <ProductDetailsAccordion />

            {/* Subtle Product ID Signifier */}
            <div className="mt-8 text-[9px] font-mono tracking-widest text-charcoal-600 uppercase">
              Listing ID: {productDetails.productId}
            </div>
          </div>
        </div>

        {/* Related Products Recommendation section */}
        {recommendations.length > 0 && (
          <section
            ref={relatedRevealRef}
            className={`mt-24 md:mt-32 pt-16 border-t border-charcoal-800/40 scroll-reveal ${
              isRelatedRevealed ? "scroll-reveal-active" : ""
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
              <h2 className="font-display text-2xl font-light text-charcoal-200 tracking-wider uppercase">
                You May Also Like
              </h2>
              <button
                onClick={() => navigate("/")}
                className="font-display text-[10px] font-bold uppercase tracking-widest text-gold-400 hover:text-gold-500 border-b border-gold-400 hover:border-gold-500 pb-1 transition-all cursor-pointer"
              >
                Browse All Archives
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map((product, index) => (
                <HomeProductCard
                  key={product.productId}
                  product={product}
                  index={index}
                  isParentRevealed={isRelatedRevealed}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <HomeFooter />
    </div>
  );
};

export default ProductDetails;
