import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct.js";
import { useCart } from "../../cart/hooks/useCart.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

// Layout & Global Components
import HomeNavbar from "../components/home/HomeNavbar.jsx";
import HomeFooter from "../components/home/HomeFooter.jsx";
import Toast from "../components/shared/Toast.jsx";

// Page Subcomponents
import ProductGallery from "../components/product/ProductGallery.jsx";
import ProductInfo from "../components/product/ProductInfo.jsx";
import PriceDisplay from "../components/product/PriceDisplay.jsx";
import StockBadge from "../components/product/StockBadge.jsx";
import VariantSelector from "../components/product/VariantSelector.jsx";
import PurchasePanel from "../components/product/PurchasePanel.jsx";
import ProductAccordion from "../components/product/ProductAccordion.jsx";
import RelatedProducts from "../components/product/RelatedProducts.jsx";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductDetailsById, handleGetAllProducts } = useProduct();
  const { handleAddItem } = useCart();
  const user = useSelector((state) => state.auth.user);

  // State
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});

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
    setSelectedAttributes({});
    fetchProductDetails();
    // Pre-load all products to populate the related products section
    handleGetAllProducts();
    // Scroll to top when loading new product details
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  // Resolve matching variants — returns first match when any attributes are selected.
  // A variant is "fully resolved" if selectedAttributes completely covers all of that
  // variant's attribute keys (exact-cover check), OR if exactly one variant matches.
  const { activeVariant, isVariantFullyResolved } = useMemo(() => {
    if (!productDetails?.variants || productDetails.variants.length === 0)
      return { activeVariant: null, isVariantFullyResolved: false };
    if (Object.keys(selectedAttributes).length === 0)
      return { activeVariant: null, isVariantFullyResolved: false };

    // Step 1: Find all variants where every selected attribute matches
    const matchingVariants = productDetails.variants.filter((variant) => {
      if (!variant.attributes) return false;
      return Object.entries(selectedAttributes).every(
        ([key, value]) => variant.attributes[key] === value,
      );
    });

    if (matchingVariants.length === 0)
      return { activeVariant: null, isVariantFullyResolved: false };

    // Step 2: Among matches, check if selectedAttributes fully covers any variant's
    // complete attribute set (i.e. no extra unselected keys remain on that variant).
    // Example: selectedAttributes={Color:"Black"} fully covers Variant={Color:"Black"}
    // but NOT Variant={Color:"Black", Edition:"Limited Edition"}.
    const exactCoverVariant = matchingVariants.find((variant) => {
      const variantKeys = Object.keys(variant.attributes || {});
      return variantKeys.every((k) => selectedAttributes[k] !== undefined);
    });

    if (exactCoverVariant) {
      // A uniquely purchasable variant is identified — enable purchase
      return { activeVariant: exactCoverVariant, isVariantFullyResolved: true };
    }

    // Step 3: Multiple matches, none fully covered by current selection — show first as preview
    return {
      activeVariant: matchingVariants[0],
      isVariantFullyResolved: false,
    };
  }, [selectedAttributes, productDetails?.variants]);

  // Gallery images list (switches to variant's images as soon as any variant matches)
  const galleryImages = useMemo(() => {
    if (
      activeVariant &&
      activeVariant.images &&
      activeVariant.images.length > 0
    ) {
      return activeVariant.images;
    }
    return productDetails?.images || [];
  }, [activeVariant, productDetails?.images]);

  // Price (shows variant's price as soon as any variant matches)
  const displayPrice = useMemo(() => {
    return (
      activeVariant?.price ||
      productDetails?.price || { amount: 0, currency: "INR" }
    );
  }, [activeVariant, productDetails?.price]);

  // Stock (shows variant stock when matched)
  const displayStock = useMemo(() => {
    return activeVariant ? activeVariant.stock : 0;
  }, [activeVariant]);

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

  const hasVariants =
    productDetails.variants && productDetails.variants.length > 0;

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
              images={galleryImages}
              title={productDetails.title}
            />
          </div>

          {/* Right Column: Sticky Product Info panel */}
          <div
            className="flex flex-col relative lg:sticky lg:top-28 h-fit pt-2 animate-reveal"
            style={{ animationDelay: "200ms" }}
          >
            {/* Info details (Title, label) */}
            <ProductInfo title={productDetails.title} />

            {/* Price & Stock status Row */}
            <div className="flex items-center justify-between gap-4 mt-2 mb-6 border-b border-charcoal-800/40 pb-5">
              <PriceDisplay price={displayPrice} />
              {hasVariants && <StockBadge stock={displayStock} />}
            </div>

            {/* Dynamic Variant Selector */}
            {hasVariants && (
              <VariantSelector
                variants={productDetails.variants}
                selectedAttributes={selectedAttributes}
                onChangeSelectedAttributes={setSelectedAttributes}
              />
            )}

            {/* Purchase panel actions */}
            <PurchasePanel
              onAddToCart={async () => {
                if (!user) {
                  navigate("/login");
                  return;
                }
                try {
                  await handleAddItem({
                    productId,
                    variantId: activeVariant._id,
                  });
                  const variantDesc = activeVariant
                    ? ` (${Object.entries(selectedAttributes)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ")})`
                    : "";
                  triggerToast(
                    "Shopping Bag",
                    `"${productDetails.title}"${variantDesc} has been added to your bag.`,
                  );
                } catch (err) {
                  triggerToast("Error", err || "Could not add item to bag.");
                }
              }}
              onBuyNow={() => {
                const variantDesc = activeVariant
                  ? ` (${Object.entries(selectedAttributes)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(", ")})`
                  : "";
                triggerToast(
                  "Immediate Checkout",
                  `Proceeding to checkout for "${productDetails.title}"${variantDesc}.`,
                );
              }}
              isOutOfStock={
                hasVariants && isVariantFullyResolved && displayStock === 0
              }
              disabled={hasVariants && !isVariantFullyResolved}
            />

            {/* Product Specifications & Care Accordions */}
            <ProductAccordion
              description={productDetails.description}
              activeVariant={activeVariant}
            />

            {/* Subtle Product ID Signifier */}
            <div className="mt-8 text-[9px] font-mono tracking-widest text-charcoal-600 uppercase">
              Listing ID: {productDetails.productId}
            </div>
          </div>
        </div>

        {/* Related Products Recommendation section */}
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

          <RelatedProducts
            products={recommendations}
            isRevealed={isRelatedRevealed}
          />
        </section>
      </main>

      <HomeFooter />
    </div>
  );
};

export default ProductDetails;
