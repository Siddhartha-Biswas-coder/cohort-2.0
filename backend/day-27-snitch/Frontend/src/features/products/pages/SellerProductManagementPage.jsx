import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../hooks/useProduct.js";

// Layout Wrapper
import SellerLayout from "../components/shared/SellerLayout.jsx";

// Studio Components
import ProductOverview from "../components/seller-product/ProductOverview.jsx";
import ProductEditor from "../components/seller-product/ProductEditor.jsx";
import ProductGallery from "../components/seller-product/ProductGallery.jsx";
import VariantManager from "../components/seller-product/VariantManager.jsx";
import ProductSummary from "../components/seller-product/ProductSummary.jsx";
import ProductSettings from "../components/seller-product/ProductSettings.jsx";
import StudioHeader from "../components/seller-product/StudioHeader.jsx";
import ProductPricingCard from "../components/seller-product/ProductPricingCard.jsx";
import DangerZone from "../components/seller-product/DangerZone.jsx";

const SellerProductManagementPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductDetailsById, handleAddProductVariant } = useProduct();

  // Primary States
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("active");
  const [toast, setToast] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");

  // Core Editor Forms State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch product specifications
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await handleGetProductDetailsById(productId);
      if (data) {
        setProductDetails(data);
        setStatus(data.status || "active");
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error retrieving product record:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  // Scroll Spy Handler
  useEffect(() => {
    const sections = ["overview", "media", "variants", "pricing", "settings"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section Click Anchor Navigation
  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Toast System
  const triggerToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Toggle Edit details mode
  const startEditing = () => {
    if (!productDetails) return;
    setFormData({
      title: productDetails.title || "",
      description: productDetails.description || "",
      priceAmount: productDetails.price?.amount || "",
      priceCurrency: productDetails.price?.currency || "INR",
    });
    setFormErrors({});
    setIsEditing(true);
    handleSectionClick("overview");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const saveProductDetails = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Listing title is required.";
    if (!formData.description.trim())
      errors.description = "Listing narrative is required.";
    if (!formData.priceAmount || parseFloat(formData.priceAmount) <= 0) {
      errors.priceAmount = "Valuation amount must be greater than zero.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      triggerToast(
        "Validation Alert",
        "Please check and complete required inputs.",
      );
      return;
    }

    setProductDetails((prev) => ({
      ...prev,
      title: formData.title,
      description: formData.description,
      price: {
        amount: parseFloat(formData.priceAmount),
        currency: formData.priceCurrency,
      },
    }));

    setIsEditing(false);
    triggerToast(
      "Listing Saved",
      "Core product specifications have been updated.",
    );
  };

  const discardProductDetails = () => {
    setIsEditing(false);
    triggerToast("Changes Reverted", "Reverted fields to last saved state.");
  };

  // Status/Visibility Handler
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setProductDetails((prev) => ({
      ...prev,
      status: newStatus,
    }));
    triggerToast(
      "Status Transitioned",
      `Visibility state has been set to ${newStatus.toUpperCase()}.`,
    );
  };

  // Variant Actions
  const handleAddVariant = async (newVariant) => {
    try {
      const addedVariant = await handleAddProductVariant(productId, newVariant);

      const currentVariants =
        productDetails.variants || [];

      console.log(currentVariants);

      // Check if hook returned the full list of variants (array) or a single variant object
      const updated = Array.isArray(addedVariant)
        ? addedVariant
        : [...currentVariants, addedVariant || newVariant];

      setProductDetails((prev) => ({
        ...prev,
        variants: updated,
      }));

      console.log(updated);
      triggerToast("SKU Added", "New variant profile has been registered.");
    } catch (err) {
      console.error("Error registering variant profile:", err);
      triggerToast("SKU Add Failed", "Could not register variant profile.");
    }
  };

  const handleEditVariant = (updatedVariant, index) => {
    const currentVariants =
      productDetails.variants || [];
    const updated = [...currentVariants];
    updated[index] = updatedVariant;
    setProductDetails((prev) => ({
      ...prev,
      variants: updated,
    }));
    triggerToast(
      "SKU Updated",
      "Variant configuration details updated successfully.",
    );
  };

  const handleDeleteVariant = (index) => {
    const currentVariants =
      productDetails.variants || [];
    const updated = currentVariants.filter((_, idx) => idx !== index);
    setProductDetails((prev) => ({
      ...prev,
      variants: updated,
    }));
    triggerToast("SKU Removed", "Deleted variant SKU combination.");
  };

  // Gallery Visual Asset Actions
  const handleAddImage = (url) => {
    const currentImages = productDetails.images || [];
    const updated = [...currentImages, { url }];
    setProductDetails((prev) => ({
      ...prev,
      images: updated,
    }));
    triggerToast("Asset Added", "Visual asset library expanded.");
  };

  const handleRemoveImage = (index) => {
    const currentImages = productDetails.images || [];
    const updated = currentImages.filter((_, idx) => idx !== index);
    setProductDetails((prev) => ({
      ...prev,
      images: updated,
    }));
    triggerToast("Asset Removed", "Visual asset removed from library.");
  };

  const handleReplaceImage = (index, url) => {
    const currentImages = productDetails.images || [];
    const updated = [...currentImages];
    updated[index] = { url };
    setProductDetails((prev) => ({
      ...prev,
      images: updated,
    }));
    triggerToast("Asset Replaced", "Visual asset mapping updated.");
  };

  if (loading) {
    return (
      <SellerLayout activePage="dashboard" headerTitle="Listing Studio">
        <div className="flex flex-col items-center justify-center py-40 select-none">
          <div className="w-8 h-8 border border-t-gold-400 border-charcoal-800 rounded-full animate-spin mb-4" />
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400 animate-pulse">
            Loading Workspace Canvas...
          </span>
        </div>
      </SellerLayout>
    );
  }

  if (error || !productDetails) {
    return (
      <SellerLayout activePage="dashboard" headerTitle="Listing Studio">
        <div className="flex flex-col items-center justify-center text-center px-6 py-40 select-none animate-reveal">
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-400 mb-6">
            Maison Lumière Workspace
          </span>
          <h1 className="font-display text-2xl font-light text-charcoal-200 uppercase tracking-widest mb-6">
            Studio Listing Not Found
          </h1>
          <p className="font-sans text-xs text-charcoal-400 font-light max-w-sm mb-10 leading-relaxed">
            We couldn't load the requested listing. Verify that the product ID
            is correct.
          </p>
          <button
            type="button"
            onClick={() => navigate("/seller/dashboard")}
            className="px-8 py-3 bg-gold-400 text-charcoal-950 font-display text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-gold-500 rounded-none cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </SellerLayout>
    );
  }

  // Price overrides selector helper
  const activeVariants =
    productDetails.variants || [];
  const pricingOverrides = activeVariants.filter(
    (v) => v.price && v.price.amount,
  );

  // Mobile Bottom Tray Actions
  const mobileActions = isEditing ? (
    <>
      <button
        type="button"
        onClick={discardProductDetails}
        className="flex-1 h-11 border border-charcoal-800 text-[10px] font-display font-semibold uppercase tracking-widest text-charcoal-500 cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={saveProductDetails}
        className="flex-1 h-11 bg-gold-400 text-[#0a0a0a] font-display font-bold uppercase tracking-widest text-center cursor-pointer"
      >
        Save Changes
      </button>
    </>
  ) : (
    <button
      type="button"
      onClick={startEditing}
      className="w-full h-11 bg-charcoal-900 border border-charcoal-800 text-gold-400 font-display font-bold uppercase tracking-widest text-center cursor-pointer"
    >
      Edit Product
    </button>
  );

  return (
    <SellerLayout
      sidebarType="studio"
      activeSection={activeSection}
      onSectionClick={handleSectionClick}
      headerTitle="Listing Studio"
      toast={toast}
      mobileActions={mobileActions}
      footerLinks={[
        { label: "Studio Rules", href: "#" },
        { label: "Listing Terms", href: "#" },
        { label: "Platform Rates", href: "#" },
      ]}
    >
      {/* Studio Header block */}
      <StudioHeader
        title={productDetails.title}
        isEditing={isEditing}
        onStartEditing={startEditing}
        onDiscardChanges={discardProductDetails}
        onSaveChanges={saveProductDetails}
      />

      {/* Main Splits Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form Sheets & Component Panels */}
        <div className="lg:col-span-8 space-y-10">
          {/* Section 1: Overview */}
          <div id="overview" className="scroll-mt-28">
            {isEditing ? (
              <ProductEditor
                formData={formData}
                errors={formErrors}
                onChange={handleInputChange}
              />
            ) : (
              <ProductOverview product={productDetails} />
            )}
          </div>

          {/* Section 2: Media Gallery */}
          <div id="media" className="scroll-mt-28">
            <ProductGallery
              images={productDetails.images || []}
              onAddImage={handleAddImage}
              onRemoveImage={handleRemoveImage}
              onReplaceImage={handleReplaceImage}
            />
          </div>

          {/* Section 3: Variants */}
          <div id="variants" className="scroll-mt-28">
            <VariantManager
              variants={activeVariants}
              productImages={productDetails.images || []}
              onAddVariant={handleAddVariant}
              onEditVariant={handleEditVariant}
              onDeleteVariant={handleDeleteVariant}
              parentPrice={productDetails.price}
            />
          </div>

          {/* Section 4: Pricing */}
          <ProductPricingCard
            price={productDetails.price}
            pricingOverrides={pricingOverrides}
          />

          {/* Section 5: Settings */}
          <div id="settings" className="space-y-10 scroll-mt-28">
            <ProductSettings
              product={productDetails}
              status={status}
              onStatusChange={handleStatusChange}
            />

            {/* Danger Zone */}
            <DangerZone status={status} onStatusChange={handleStatusChange} />
          </div>
        </div>

        {/* Right Column: Sticky Summary Panel */}
        <div className="lg:col-span-4">
          <ProductSummary product={productDetails} status={status} />
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerProductManagementPage;
