import React from "react";
import VariantChip from "./VariantChip.jsx";

const VariantGroup = ({
  label,
  options = [],
  selectedValue,
  onSelect,
  isOptionDisabled,
}) => {
  return (
    <div className="flex flex-col gap-2.5 select-none">
      <h4 className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500">
        {label}
      </h4>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => (
          <VariantChip
            key={opt}
            value={opt}
            isSelected={selectedValue === opt}
            isDisabled={isOptionDisabled ? isOptionDisabled(label, opt) : false}
            onClick={() => onSelect(label, opt)}
            attributeKey={label}
          />
        ))}
      </div>
    </div>
  );
};

export default VariantGroup;
