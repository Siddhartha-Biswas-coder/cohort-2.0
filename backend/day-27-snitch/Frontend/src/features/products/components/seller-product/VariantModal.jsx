import React, { useState, useEffect } from "react";
import WorkspaceInput from "../shared/WorkspaceInput.jsx";
import VariantAttributes from "./VariantAttributes.jsx";
import VariantPriceEditor from "./VariantPriceEditor.jsx";
import VariantImageSelector from "./VariantImageSelector.jsx";

const VariantModal = ({
  isOpen,
  onClose,
  onSave,
  editingVariant,
  editingIndex,
  productImages = []
}) => {
  const [attributesList, setAttributesList] = useState([]);
  const [stock, setStock] = useState(10);
  const [priceAmount, setPriceAmount] = useState("");
  const [priceCurrency, setPriceCurrency] = useState("INR");
  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingVariant) {
      // Map attributes object to list format
      const rawAttributes = editingVariant.attributes 
        ? (editingVariant.attributes instanceof Map 
            ? Object.fromEntries(editingVariant.attributes) 
            : editingVariant.attributes) 
        : {};
      
      const mappedAttrs = Object.entries(rawAttributes).map(([key, value]) => {
        const isPreset = ["Color", "Size", "Material", "Edition"].includes(key);
        return {
          key: isPreset ? key : "Custom",
          value: value,
          isCustom: !isPreset,
          customKey: isPreset ? "" : key
        };
      });

      setAttributesList(mappedAttrs.length > 0 ? mappedAttrs : [{ key: "Color", value: "", isCustom: false, customKey: "" }]);
      setStock(editingVariant.stock ?? 10);
      setPriceAmount(editingVariant.price?.amount ?? "");
      setPriceCurrency(editingVariant.price?.currency ?? "INR");
      setSelectedImages(editingVariant.images || []);
    } else {
      // Set defaults for new variant
      setAttributesList([{ key: "Color", value: "", isCustom: false, customKey: "" }]);
      setStock(10);
      setPriceAmount("");
      setPriceCurrency("INR");
      setSelectedImages([]);
    }
    setErrors({});
  }, [editingVariant, isOpen]);

  if (!isOpen) return null;

  const handleAddImageFromLibrary = (imgObj) => {
    if (selectedImages.length >= 7) return;
    // Avoid duplicates
    if (selectedImages.some((x) => x.url === imgObj.url)) return;
    setSelectedImages([...selectedImages, imgObj]);
  };

  const handleUploadImage = (e) => {
    const file = e.target.files?.[0];
    if (file && selectedImages.length < 7) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedImages([...selectedImages, { url: objectUrl }]);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate attributes
    if (attributesList.length === 0) {
      newErrors.attributes = "At least one attributes row is required.";
    }

    const validAttributes = {};
    attributesList.forEach((row, i) => {
      const finalKey = row.isCustom ? row.customKey?.trim() : row.key;
      if (!finalKey) {
        newErrors.attributes = `Key is missing at row ${i + 1}`;
      }
      if (!row.value?.trim()) {
        newErrors.attributes = `Value is missing for attribute "${finalKey || 'Row ' + (i+1)}"`;
      }
      if (finalKey && row.value?.trim()) {
        validAttributes[finalKey] = row.value.trim();
      }
    });

    if (stock < 0) {
      newErrors.stock = "Stock units cannot be negative.";
    }

    if (priceAmount && isNaN(parseFloat(priceAmount))) {
      newErrors.price = "Invalid price override value.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const variantPayload = {
      attributes: validAttributes,
      stock: parseInt(stock, 10),
      price: priceAmount
        ? { amount: parseFloat(priceAmount), currency: priceCurrency }
        : null,
      images: selectedImages
    };

    onSave(variantPayload, editingIndex);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none animate-reveal">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Dialog Body */}
      <div className="relative w-full max-w-2xl bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 md:p-8 shadow-card-glow z-10 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal-500 hover:text-gold-400 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Title */}
        <div className="space-y-1 pb-4 border-b border-charcoal-800/60">
          <h3 className="font-display text-sm font-light text-charcoal-200 tracking-wider uppercase">
            {editingVariant ? "Modify SKU Profile" : "Configure New Listing SKU"}
          </h3>
          <p className="font-sans text-[11px] text-charcoal-500 font-light">
            Specify attributes, stock capacities, pricing overrides, and variant photography.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dynamic Attributes Section */}
          <VariantAttributes
            attributesList={attributesList}
            onChange={setAttributesList}
          />
          {errors.attributes && (
            <span className="text-[10px] text-red-500 font-sans tracking-wide">
              {errors.attributes}
            </span>
          )}

          {/* Pricing and Stock Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-charcoal-800/40">
            {/* Price Override */}
            <VariantPriceEditor
              priceAmount={priceAmount}
              priceCurrency={priceCurrency}
              onPriceAmountChange={setPriceAmount}
              onPriceCurrencyChange={setPriceCurrency}
              error={errors.price}
            />

            {/* Stock Allocation */}
            <div className="flex flex-col gap-3 group w-full">
              <label className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500 group-focus-within:text-gold-400 transition-colors h-8 flex items-end">
                Stock Capacity Allocation
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                min="0"
                className={`w-full bg-transparent border-b py-2 text-xs text-gold-50 placeholder-charcoal-600 transition-all duration-300 focus:outline-none ${
                  errors.stock
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-charcoal-800 focus:border-gold-400 focus:shadow-[0_1px_0_0_rgba(197,160,89,0.25)]"
                }`}
              />
              {errors.stock && (
                <span className="text-[10px] text-red-500 font-sans tracking-wide mt-1 animate-error-fade-in-up">
                  {errors.stock}
                </span>
              )}
            </div>
          </div>

          {/* Variant Visuals (up to 7 slots) */}
          <VariantImageSelector
            selectedImages={selectedImages}
            productImages={productImages}
            onAddImageFromLibrary={handleAddImageFromLibrary}
            onUploadImage={(url) => setSelectedImages([...selectedImages, { url }])}
            onRemoveImage={handleRemoveImage}
          />

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-charcoal-800/40">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-6 border border-charcoal-800 hover:border-charcoal-600 text-[10px] font-display font-semibold uppercase tracking-widest text-charcoal-500 hover:text-charcoal-350 transition-colors cursor-pointer w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 px-6 bg-gold-400 text-charcoal-950 font-display text-[10px] font-bold uppercase tracking-widest text-center hover:bg-gold-500 hover:shadow-gold-glow transition-all duration-300 cursor-pointer w-auto"
            >
              {editingVariant ? "Save Variant" : "Create Variant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VariantModal;
