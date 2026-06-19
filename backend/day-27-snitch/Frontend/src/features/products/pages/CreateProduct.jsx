import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useProduct } from "../hooks/useProduct.js";
import { useProductForm } from "../hooks/useProductForm.js";
import ThemeToggle from "../../../app/components/ThemeToggle.jsx";

// Components
import DashboardHeader from "../components/DashboardHeader.jsx";
import ProductDetailsForm from "../components/ProductDetailsForm.jsx";
import ProductImageUploader from "../components/ProductImageUploader.jsx";
import ProductPricingSection from "../components/ProductPricingSection.jsx";
import ProductPreviewCard from "../components/ProductPreviewCard.jsx";
import SubmitActions from "../components/SubmitActions.jsx";

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
    // Front-end only draft simulation
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

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col md:flex-row text-charcoal-400 select-none antialiased">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-charcoal-900 border border-gold-400 text-gold-50 shadow-gold-glow flex items-center gap-3 animate-error-fade-in-up">
          <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <div className="flex flex-col">
            <span className="font-display text-[10px] font-bold uppercase tracking-widest text-gold-400">Success</span>
            <span className="text-xs font-sans text-charcoal-300 font-light mt-0.5">{successToast}</span>
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
                className="w-full flex items-center px-6 py-3 text-[10px] font-display font-semibold uppercase tracking-widest text-charcoal-500 hover:text-gold-400 hover:bg-charcoal-950/40 transition-all cursor-pointer"
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
                className="w-full flex items-center px-6 py-3 text-[10px] font-display font-semibold uppercase tracking-widest text-gold-400 border-r-2 border-gold-400 bg-charcoal-950/30 transition-all cursor-pointer"
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
          {/* Dashboard Title & Description */}
          <DashboardHeader />

          {/* Form and Preview Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form Details & Upload */}
            <div className="lg:col-span-8 space-y-10">
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
            <div className="lg:col-span-4 space-y-10">
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
          <div className="mt-12 pt-8 border-t border-charcoal-900/60 pb-16">
            <SubmitActions
              isSubmitting={isSubmitting}
              submitError={submitError}
              onPublish={handlePublish}
              onSaveDraft={handleSaveDraft}
              onDiscard={handleDiscard}
            />
          </div>
        </div>

        {/* Sticky Mobile Navigation (Hidden on desktop) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-charcoal-950 border-t border-charcoal-850 px-6 py-4 flex gap-4">
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
            className="flex-1 py-3 bg-gold-400 text-charcoal-950 font-display font-bold uppercase tracking-widest text-center"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>

        {/* Footer */}
        <footer className="w-full py-8 border-t border-charcoal-900 bg-charcoal-950 flex flex-col md:flex-row justify-between items-center px-8 md:px-16 gap-4 mt-auto">
          <span className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest uppercase">
            © 2026 LUMIÈRE MAISON. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6">
            <span className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest hover:text-gold-400 transition-colors uppercase cursor-pointer">
              Terms of Service
            </span>
            <span className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest hover:text-gold-400 transition-colors uppercase cursor-pointer">
              Privacy Policy
            </span>
            <span className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest hover:text-gold-400 transition-colors uppercase cursor-pointer">
              Seller Guidelines
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CreateProduct;
