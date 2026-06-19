import React from "react";
import SectionCard from "./SectionCard.jsx";

const ProductDetailsForm = ({ title, description, errors, onChange }) => {
  return (
    <SectionCard title="Product Details" stepNumber="01" className="space-y-10">
      {/* Title Input */}
      <div className="flex flex-col gap-3.5 group">
        <label className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500 group-focus-within:text-gold-400 transition-colors">
          Product Title
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="e.g. 1970s Vintage Silk Scarf"
          className={`w-full bg-transparent border-b py-3 text-lg text-gold-50 placeholder-charcoal-600 transition-all duration-300 focus:outline-none ${
            errors?.title
              ? "border-red-500/50 focus:border-red-500 focus:ring-0"
              : "border-charcoal-800 focus:border-gold-400 focus:shadow-[0_1px_0_0_rgba(197,160,89,0.25)]"
          }`}
        />
        {errors?.title && (
          <span className="text-[10px] text-red-500 font-sans tracking-wide mt-1 animate-error-fade-in-up">
            {errors.title}
          </span>
        )}
      </div>

      {/* Description Input */}
      <div className="flex flex-col gap-3.5 group pt-2">
        <label className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500 group-focus-within:text-gold-400 transition-colors">
          Description
        </label>
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          rows={6}
          placeholder="Describe the heritage, materials, craftsmanship, and condition of this exclusive piece..."
          className={`w-full bg-transparent border-b py-3 text-sm text-gold-50 placeholder-charcoal-600 resize-none transition-all duration-300 focus:outline-none leading-relaxed ${
            errors?.description
              ? "border-red-500/50 focus:border-red-500 focus:ring-0"
              : "border-charcoal-800 focus:border-gold-400 focus:shadow-[0_1px_0_0_rgba(197,160,89,0.25)]"
          }`}
        />
        {errors?.description && (
          <span className="text-[10px] text-red-500 font-sans tracking-wide mt-1 animate-error-fade-in-up">
            {errors.description}
          </span>
        )}
      </div>
    </SectionCard>
  );
};

export default ProductDetailsForm;
