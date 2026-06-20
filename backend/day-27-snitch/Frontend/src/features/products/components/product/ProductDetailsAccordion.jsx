import React, { useState } from "react";

const ProductDetailsAccordion = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const sections = [
    {
      id: "details",
      title: "Details & Care",
      content: (
        <ul className="list-disc pl-4 space-y-2 text-charcoal-400/90 font-light text-xs leading-relaxed">
          <li>100% heavy silk twill weave with high thread density.</li>
          <li>Hand-rolled, hand-stitched hem finish for artisanal heritage.</li>
          <li>Clean dry clean only. Dry flat and cool iron on reverse side.</li>
          <li>Store flat, away from direct sunlight and humidity.</li>
        </ul>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      content: (
        <p className="text-charcoal-400/90 font-light text-xs leading-relaxed">
          Complimentary insured standard shipping on all orders. Each item is packaged in a signature Lumière archival box. Returns are accepted within 14 days of receipt for store credit or refund, provided the safety security tag remains attached.
        </p>
      ),
    },
    {
      id: "authenticity",
      title: "Authenticity Guarantee",
      content: (
        <p className="text-charcoal-400/90 font-light text-xs leading-relaxed">
          Every piece listed on Lumière undergoes a multi-point verification process by our in-house luxury garment experts. We guarantee the authenticity of the materials, designer origin, and vintage period of all items.
        </p>
      ),
    },
  ];

  return (
    <div className="border-t border-charcoal-800/60 mt-6 pt-3 divide-y divide-charcoal-800/40 select-none">
      {sections.map((sec) => {
        const isOpen = openSection === sec.id;
        return (
          <div key={sec.id} className="py-4">
            <button
              onClick={() => toggleSection(sec.id)}
              className="w-full flex items-center justify-between text-left group focus:outline-none"
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

            {/* Collapsible Content */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-56 mt-3 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pb-2 text-xs font-sans tracking-wide">
                {sec.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductDetailsAccordion;
