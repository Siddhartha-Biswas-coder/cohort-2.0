import React, { useState } from "react";

const ProductAccordion = ({ description = "", activeVariant = null }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionId) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const sections = [
    {
      id: "description",
      title: "The Narrative",
      content: (
        <p className="text-charcoal-400/90 font-light text-xs leading-relaxed tracking-wide">
          {description || "No narrative description provided for this curated piece."}
        </p>
      ),
    },
    {
      id: "variant_info",
      title: "Variant Details",
      content: activeVariant && activeVariant.attributes && Object.keys(activeVariant.attributes).length > 0 ? (
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 border border-charcoal-800/40 p-3 bg-charcoal-900/10">
          {Object.entries(activeVariant.attributes).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-0.5">
              <span className="font-display text-[9px] font-bold text-charcoal-500 uppercase tracking-wider">
                {key}
              </span>
              <span className="font-sans text-xs text-charcoal-300">
                {value}
              </span>
            </div>
          ))}
          {activeVariant.price && (
            <div className="flex flex-col gap-0.5 col-span-2 pt-2.5 border-t border-charcoal-800/30">
              <span className="font-display text-[9px] font-bold text-charcoal-500 uppercase tracking-wider">
                Variant Price
              </span>
              <span className="font-sans text-xs text-gold-400 font-semibold">
                {activeVariant.price.currency} {parseFloat(activeVariant.price.amount).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-charcoal-500 font-light text-xs italic">
          No variant selected or configured.
        </p>
      ),
    },
    {
      id: "care",
      title: "Care Instructions",
      content: (
        <ul className="list-disc pl-4 space-y-2 text-charcoal-400/90 font-light text-xs leading-relaxed tracking-wide">
          <li>Dry clean only by specialists.</li>
          <li>Cool iron on reverse side with a clean press cloth.</li>
          <li>Store hung on broad hangers or folded flat in a breathable garment bag.</li>
          <li>Keep away from harsh dampness, fragrance sprays, and direct sunlight.</li>
        </ul>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      content: (
        <p className="text-charcoal-400/90 font-light text-xs leading-relaxed tracking-wide">
          All purchases include complimentary overnight insured courier delivery. Each archive piece is cleaned, inspected, and shipped in a signature Lumière storage container.
        </p>
      ),
    },
    {
      id: "returns",
      title: "Return Policy",
      content: (
        <p className="text-charcoal-400/90 font-light text-xs leading-relaxed tracking-wide">
          Returns are accepted within 14 days of delivery. The security authenticity seal must remain fully intact and untampered with.
        </p>
      ),
    },
  ];

  return (
    <div className="border-t border-charcoal-800/60 mt-6 pt-2 divide-y divide-charcoal-800/30 select-none">
      {sections.map((sec) => {
        const isOpen = openSection === sec.id;
        return (
          <div key={sec.id} className="py-4">
            <button
              onClick={() => toggleSection(sec.id)}
              className="w-full flex items-center justify-between text-left group focus:outline-none cursor-pointer"
            >
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal-200 group-hover:text-gold-400 transition-colors">
                {sec.title}
              </span>
              <span
                className={`text-charcoal-500 group-hover:text-gold-400 transition-all duration-300 transform ${
                  isOpen ? "rotate-180 text-gold-400" : "rotate-0"
                }`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {/* Collapsible Content wrapper */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-70 mt-4 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pb-2 font-sans tracking-wide">
                {sec.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductAccordion;
