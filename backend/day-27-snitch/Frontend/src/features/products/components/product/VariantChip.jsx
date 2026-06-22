import React from "react";

const colorMap = {
  black: "#111111",
  white: "#FFFFFF",
  blue: "#1E293B",
  navy: "#0F172A",
  red: "#991B1B",
  gold: "#C5A059",
  beige: "#F5F5DC",
  ivory: "#FFFFF0",
  silver: "#C0C0C0",
  gray: "#4B5563",
  grey: "#4B5563",
  green: "#064E3B",
  emerald: "#047857",
  brown: "#78350F",
  silk: "#FFF8DC",
  champagne: "#F7E7CE",
};

const VariantChip = ({
  value,
  isSelected,
  isDisabled,
  onClick,
  attributeKey = "",
}) => {
  const isColorAttribute = attributeKey.toLowerCase() === "color";

  // Resolve background color if it is a color attribute
  const swatchColor = isColorAttribute
    ? colorMap[value.toLowerCase()] || value
    : null;

  let chipClasses = "";
  if (isSelected) {
    chipClasses =
      "border-gold-400 text-gold-400 bg-gold-400/5 shadow-gold-glow font-medium cursor-pointer";
  } else if (isDisabled) {
    // Always clickable — greyed out with a visual indicator but not blocked
    chipClasses =
      "border-charcoal-800/30 text-charcoal-600 opacity-50 cursor-pointer hover:opacity-70 hover:border-charcoal-600 transition-opacity";
  } else {
    chipClasses =
      "border-charcoal-800/80 hover:border-charcoal-500 hover:text-charcoal-200 text-charcoal-400 bg-charcoal-900/10 cursor-pointer";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 border rounded-xs font-sans text-xs tracking-wider transition-all duration-300 flex items-center gap-2 select-none relative overflow-hidden ${chipClasses}`}
    >
      {isColorAttribute && swatchColor && (
        <span
          className="w-3.5 h-3.5 rounded-full border border-charcoal-800/20 shrink-0 inline-block shadow-xs"
          style={{ backgroundColor: swatchColor }}
        />
      )}
      <span>{value}</span>

      {/* Diagonal strike-through for unavailable options */}
      {isDisabled && !isSelected && (
        <span
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line
              x1="4"
              y1="96"
              x2="96"
              y2="4"
              stroke="#9CA3AF"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity="0.75"
            />
          </svg>
        </span>
      )}
    </button>
  );
};

export default VariantChip;
