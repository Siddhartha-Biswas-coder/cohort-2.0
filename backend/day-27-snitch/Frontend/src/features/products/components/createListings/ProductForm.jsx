import React from "react";
import ProductDetailsForm from "./ProductDetailsForm.jsx";
import ProductImageUploader from "./ProductImageUploader.jsx";
import ProductPricingSection from "./ProductPricingSection.jsx";

const ProductForm = ({ formData, errors, onInputChange, onAddImages, onRemoveImage }) => {
  return (
    <div className="space-y-8">
      {/* 01. Product Details */}
      <ProductDetailsForm
        title={formData.title}
        description={formData.description}
        errors={errors}
        onChange={onInputChange}
      />

      {/* 02. Media Assets */}
      <ProductImageUploader
        images={formData.images}
        onAddImages={onAddImages}
        onRemoveImage={onRemoveImage}
        errors={errors}
      />

      {/* 03. Pricing & Currency */}
      <ProductPricingSection
        priceAmount={formData.priceAmount}
        priceCurrency={formData.priceCurrency}
        errors={errors}
        onChange={onInputChange}
      />
    </div>
  );
};

export default ProductForm;
