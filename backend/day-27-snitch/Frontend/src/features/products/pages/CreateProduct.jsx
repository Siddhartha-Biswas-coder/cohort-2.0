import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useProduct } from "../hooks/useProduct.js";
import { useProductForm } from "../hooks/useProductForm.js";

// Layout
import SellerLayout from "../components/shared/SellerLayout.jsx";

// Page-specific components
import DashboardHeader from "../components/createListings/DashboardHeader.jsx";
import ProductDetailsForm from "../components/createListings/ProductDetailsForm.jsx";
import ProductImageUploader from "../components/createListings/ProductImageUploader.jsx";
import ProductPricingSection from "../components/createListings/ProductPricingSection.jsx";
import ProductPreviewCard from "../components/createListings/ProductPreviewCard.jsx";
import SubmitActions from "../components/createListings/SubmitActions.jsx";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { handleCreateProduct } = useProduct();

  const [successToast, setSuccessToast] = useState(null);

  const onSubmitSuccess = (product) => {
    setSuccessToast(`Product "${product.title}" published successfully!`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 5000);
  };

  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleInputChange,
    handleAddImages,
    handleRemoveImage,
    submitForm,
  } = useProductForm(onSubmitSuccess);

  const handlePublish = () => {
    submitForm(handleCreateProduct);
  };

  const handleSaveDraft = () => {
    setSuccessToast("Listing draft saved successfully (Simulated)");
    setTimeout(() => {
      setSuccessToast(null);
    }, 3000);
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard this listing? All unsaved changes will be lost.")) {
      navigate("/seller-dashboard");
      window.location.reload();
    }
  };

  // Toast data object for SellerLayout
  const toastData = successToast
    ? {
        title: "Success",
        message: successToast,
        icon: (
          <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ),
      }
    : null;

  // Mobile bottom bar buttons
  const mobileActions = (
    <>
      <button
        type="button"
        onClick={handleDiscard}
        className="flex-1 py-3 border border-charcoal-800 text-[10px] font-display font-semibold uppercase tracking-widest text-charcoal-400"
      >
        Discard
      </button>
      <button
        type="button"
        onClick={handlePublish}
        disabled={isSubmitting}
        className="flex-1 py-3 bg-gold-400 text-[#0a0a0a] font-display font-bold uppercase tracking-widest text-center hover:opacity-90 transition-opacity duration-300 cursor-pointer"
      >
        {isSubmitting ? "Publishing..." : "Publish"}
      </button>
    </>
  );

  return (
    <SellerLayout
      activePage="create-listing"
      toast={toastData}
      mobileActions={mobileActions}
      footerLinks={[
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Seller Guidelines", href: "#" },
      ]}
    >
      {/* Dashboard Title & Description */}
      <DashboardHeader />

      {/* Form and Preview Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form Details & Upload */}
        <div className="lg:col-span-8 space-y-10 animate-reveal" style={{ animationDelay: "240ms" }}>
          <ProductDetailsForm
            title={formData.title}
            description={formData.description}
            errors={errors}
            onChange={handleInputChange}
          />
          <ProductImageUploader
            images={formData.images}
            onAddImages={handleAddImages}
            onRemoveImage={handleRemoveImage}
            errors={errors}
          />
        </div>

        {/* Right Column: Pricing & Live Preview */}
        <div className="lg:col-span-4 space-y-10 animate-reveal" style={{ animationDelay: "320ms" }}>
          <ProductPricingSection
            priceAmount={formData.priceAmount}
            priceCurrency={formData.priceCurrency}
            errors={errors}
            onChange={handleInputChange}
          />
          <ProductPreviewCard
            title={formData.title}
            description={formData.description}
            priceAmount={formData.priceAmount}
            priceCurrency={formData.priceCurrency}
            images={formData.images}
          />
        </div>
      </div>

      {/* Footer Submit Bar */}
      <div className="mt-12 pt-8 border-t border-charcoal-900/60 pb-16 animate-reveal" style={{ animationDelay: "400ms" }}>
        <SubmitActions
          isSubmitting={isSubmitting}
          submitError={submitError}
          onPublish={handlePublish}
          onSaveDraft={handleSaveDraft}
          onDiscard={handleDiscard}
        />
      </div>
    </SellerLayout>
  );
};

export default CreateProduct;
