import React from "react";

const SectionCard = ({ title, stepNumber, children, className = "" }) => {
  return (
    <section className={`p-8 bg-charcoal-900/60 border border-charcoal-800 shadow-gold-glow/5 backdrop-blur-md transition-all duration-500 hover:border-charcoal-700/60 ${className}`}>
      {title && (
        <div className="border-b border-charcoal-800 pb-4 mb-6 flex items-center justify-between">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 select-none">
            {stepNumber && <span className="mr-2 text-charcoal-600">{stepNumber}.</span>}
            {title}
          </h3>
        </div>
      )}
      <div>{children}</div>
    </section>
  );
};

export default SectionCard;
