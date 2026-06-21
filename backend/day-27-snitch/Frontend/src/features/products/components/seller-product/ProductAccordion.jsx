import React, { useState } from "react";

const ProductAccordion = () => {
  const [activeSection, setActiveSection] = useState("info");

  const toggleSection = (sectionName) => {
    setActiveSection((prev) => (prev === sectionName ? null : sectionName));
  };

  return (
    <div className="bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 md:p-8 space-y-4 select-none animate-reveal" style={{ animationDelay: "220ms" }}>
      <div className="space-y-1 pb-4 border-b border-charcoal-800/60">
        <h3 className="font-display text-sm font-light text-charcoal-200 tracking-wider uppercase">
          Listing Technical Guidelines
        </h3>
        <p className="font-sans text-[11px] text-charcoal-500 font-light">
          Review specifications, media assets formats, variant rules, base pricing, and storefront settings.
        </p>
      </div>

      <div className="divide-y divide-charcoal-800/60">
        {/* Section 1: Product Information */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("info")}
            className="w-full flex justify-between items-center group cursor-pointer"
          >
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
              Product Information
            </span>
            <span className={`text-charcoal-500 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-all duration-300 transform ${
              activeSection === "info" ? "rotate-180" : ""
            }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${
            activeSection === "info" ? "max-h-60 mt-4 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <ul className="list-disc pl-4 space-y-2 text-charcoal-400 font-sans font-light text-xs leading-relaxed">
              <li>Listing titles must represent the original name and release year of the luxury piece.</li>
              <li>Descriptions should clearly articulate item condition grading, material blends, and dimensions.</li>
              <li>Editing core product properties triggers automated catalog verification checks.</li>
            </ul>
          </div>
        </div>

        {/* Section 2: Media Gallery */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("media")}
            className="w-full flex justify-between items-center group cursor-pointer"
          >
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
              Media Gallery
            </span>
            <span className={`text-charcoal-500 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-all duration-300 transform ${
              activeSection === "media" ? "rotate-180" : ""
            }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${
            activeSection === "media" ? "max-h-60 mt-4 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <ul className="list-disc pl-4 space-y-2 text-charcoal-400 font-sans font-light text-xs leading-relaxed">
              <li>All uploaded visual assets must align to the premium 3:4 portrait ratio formats.</li>
              <li>The first asset position is designated as the active storefront listing cover image.</li>
              <li>Close-ups of stitchings, serial tags, and branding stamps are recommended for verification.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Variants */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("variants")}
            className="w-full flex justify-between items-center group cursor-pointer"
          >
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
              Variants
            </span>
            <span className={`text-charcoal-500 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-all duration-300 transform ${
              activeSection === "variants" ? "rotate-180" : ""
            }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${
            activeSection === "variants" ? "max-h-60 mt-4 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <ul className="list-disc pl-4 space-y-2 text-charcoal-400 font-sans font-light text-xs leading-relaxed">
              <li>Variant profiles represent individual sizes, color combinations, or special fabrics.</li>
              <li>Each variant SKU maintains independent inventory allocation limits.</li>
              <li>Empty stock allocations (0 units) automatically hide purchase buttons on storefront.</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Pricing */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("pricing")}
            className="w-full flex justify-between items-center group cursor-pointer"
          >
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
              Pricing
            </span>
            <span className={`text-charcoal-500 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-all duration-300 transform ${
              activeSection === "pricing" ? "rotate-180" : ""
            }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${
            activeSection === "pricing" ? "max-h-60 mt-4 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <ul className="list-disc pl-4 space-y-2 text-charcoal-400 font-sans font-light text-xs leading-relaxed">
              <li>Valuations can be established in major currencies (INR, USD, EUR, GBP, JPY).</li>
              <li>Price overrides set on variant cards apply dynamically in place of the base valuation.</li>
              <li>All transactional taxes and platform fees are calculated at checkout.</li>
            </ul>
          </div>
        </div>

        {/* Section 5: Listing Settings */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("settings")}
            className="w-full flex justify-between items-center group cursor-pointer"
          >
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
              Listing Settings
            </span>
            <span className={`text-charcoal-500 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-all duration-300 transform ${
              activeSection === "settings" ? "rotate-180" : ""
            }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${
            activeSection === "settings" ? "max-h-60 mt-4 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <ul className="list-disc pl-4 space-y-2 text-charcoal-400 font-sans font-light text-xs leading-relaxed">
              <li>Live listing settings publish items immediately onto the luxury archives marketplace.</li>
              <li>Draft settings keep changes private for staging updates and visual adjustments.</li>
              <li>Archived settings hide listings, retaining historical inventory configurations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAccordion;
