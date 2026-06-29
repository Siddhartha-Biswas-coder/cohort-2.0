import React from "react";

const PRESET_KEYS = ["Color", "Size", "Material", "Edition"];

const PRESET_VALUES = {
  Color: ["Black", "White", "Blue", "Navy", "Red", "Gold", "Beige", "Ivory", "Silver", "Gray", "Green", "Emerald", "Brown", "Silk", "Champagne", "Pale Pink"],
  Size: ["S", "M", "L", "XL", "XXL"],
  Material: ["Cotton", "Silk", "Suede", "Leather", "Linen", "Wool", "Denim", "Satin"],
  Edition: ["Standard", "Limited Edition", "Archival"]
};

const getPlaceholder = (key) => {
  switch (key) {
    case "Color":
      return "e.g. Matte Black";
    case "Size":
      return "e.g. Large";
    case "Material":
      return "e.g. Suede Leather";
    case "Edition":
      return "e.g. Limited Edition";
    default:
      return "Enter value...";
  }
};

const CustomSelect = ({ value, options, onChange, placeholder = "Select option...", showCustomOption = true }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent border-b border-charcoal-800 py-2.5 text-xs text-left text-gold-50 flex items-center justify-between hover:border-gold-400 focus:outline-none focus:border-gold-400 transition-all duration-300 cursor-pointer"
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          className={`h-3.5 w-3.5 text-charcoal-600 transition-transform duration-300 shrink-0 ml-2 ${isOpen ? "rotate-180 text-gold-400" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-charcoal-900 border border-charcoal-850 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(197,160,89,0.1)] z-50 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-charcoal-800 scrollbar-track-transparent">
          <ul className="py-1 divide-y divide-charcoal-850/20">
            {showCustomOption && (
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect("__custom")}
                  className="w-full text-left px-4 py-2 text-xs text-gold-400 font-display font-bold uppercase tracking-widest hover:bg-gold-400/5 hover:text-gold-300 transition-all cursor-pointer"
                >
                  Custom...
                </button>
              </li>
            )}
            
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left px-4 py-2 text-xs transition-all cursor-pointer ${
                    value === opt 
                      ? "text-gold-400 bg-gold-400/5 font-semibold" 
                      : "text-charcoal-300 hover:bg-charcoal-800 hover:text-gold-400"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const VariantAttributes = ({
  attributesList = [],
  onChange,
}) => {

  const addAttributeRow = () => {
    const existingKeys = attributesList.map((r) => (r.isCustom ? "Custom" : r.key));
    const nextPreset = PRESET_KEYS.find((k) => !existingKeys.includes(k));

    if (nextPreset) {
      onChange([
        ...attributesList,
        { key: nextPreset, value: "", isCustom: false, customKey: "" },
      ]);
    } else {
      onChange([
        ...attributesList,
        { key: "Custom", value: "", isCustom: true, customKey: "" },
      ]);
    }
  };

  const removeAttributeRow = (idx) => {
    const updated = attributesList.filter((_, i) => i !== idx);
    onChange(updated);
  };

  const handleRowChange = (idx, field, value) => {
    const updated = attributesList.map((row, i) => {
      if (i !== idx) return row;
      let updatedRow;
      if (typeof field === "object") {
        updatedRow = { ...row, ...field };
      } else {
        updatedRow = { ...row, [field]: value };
      }
      
      const checkKey = typeof field === "object" ? field.key : (field === "key" ? value : undefined);
      if (checkKey !== undefined) {
        if (checkKey === "Custom") {
          updatedRow.isCustom = true;
        } else {
          updatedRow.isCustom = false;
          updatedRow.customKey = "";
        }
      }
      return updatedRow;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-4 select-none">
      <div className="flex justify-between items-center pb-2 border-b border-charcoal-800/40">
        <span className="font-display text-[10px] font-bold uppercase tracking-widest text-charcoal-500">
          Configuration Attributes
        </span>
        <button
          type="button"
          onClick={addAttributeRow}
          className="text-[9px] font-display font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Add Attribute
        </button>
      </div>

      {attributesList.length > 0 ? (
        <div className="space-y-4">
          {attributesList.map((row, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-4 items-end bg-charcoal-950/40 border border-charcoal-800/40 p-4 rounded-md relative group/row pb-5">
              
              {/* Key selection dropdown */}
              <div className="flex-1 w-full flex flex-col gap-2">
                <label className="text-[8px] font-display font-bold uppercase tracking-widest text-charcoal-500">
                  Dimension Key
                </label>
                <CustomSelect
                  value={row.isCustom ? "Custom" : row.key}
                  options={PRESET_KEYS.filter(
                    (k) => !attributesList.some((r, i) => i !== idx && !r.isCustom && r.key === k)
                  )}
                  onChange={(val) => {
                    if (val === "__custom") {
                      handleRowChange(idx, "key", "Custom");
                    } else {
                      handleRowChange(idx, "key", val);
                    }
                  }}
                  placeholder="Select Key"
                  showCustomOption={true}
                />
              </div>

              {/* Custom Key Name textfield */}
              {row.isCustom && (
                <div className="flex-1 w-full flex flex-col gap-2">
                  <label className="text-[8px] font-display font-bold uppercase tracking-widest text-charcoal-500">
                    Custom Key Label
                  </label>
                  <input
                    type="text"
                    value={row.customKey || ""}
                    onChange={(e) => handleRowChange(idx, "customKey", e.target.value)}
                    placeholder="e.g. Closure"
                    className="w-full bg-transparent border-b border-charcoal-800 py-2.5 text-xs text-gold-50 placeholder-charcoal-600 focus:outline-none focus:border-gold-400 transition-all"
                  />
                </div>
              )}

              {/* Value Input */}
              <div className="flex-1 w-full flex flex-col gap-2">
                <label className="text-[8px] font-display font-bold uppercase tracking-widest text-charcoal-500">
                  Attribute Value
                </label>
                
                {row.isCustom || row.showCustomInput || (row.value && !PRESET_VALUES[row.key]?.includes(row.value)) ? (
                  <div className="relative flex items-center gap-2">
                    <input
                      type="text"
                      value={row.value === "__custom" ? "" : (row.value || "")}
                      onChange={(e) => handleRowChange(idx, "value", e.target.value)}
                      placeholder={getPlaceholder(row.key)}
                      className="w-full bg-transparent border-b border-charcoal-800 py-2.5 text-xs text-gold-50 placeholder-charcoal-600 focus:outline-none focus:border-gold-400 transition-all pr-12"
                    />
                    {!row.isCustom && (
                      <button
                        type="button"
                        onClick={() => {
                          handleRowChange(idx, { showCustomInput: false, value: "" });
                        }}
                        className="absolute right-0 bottom-2.5 text-gold-600 hover:text-gold-400 transition-colors text-[9px] font-display font-semibold uppercase tracking-widest"
                        title="Back to dropdown"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                ) : (
                  <CustomSelect
                    value={row.value || ""}
                    options={PRESET_VALUES[row.key] || []}
                    onChange={(val) => {
                      if (val === "__custom") {
                        handleRowChange(idx, { showCustomInput: true, value: "" });
                      } else {
                        handleRowChange(idx, "value", val);
                      }
                    }}
                    placeholder="Select Value"
                    showCustomOption={true}
                  />
                )}
              </div>

              {/* Remove Row Button */}
              <button
                type="button"
                onClick={() => removeAttributeRow(idx)}
                className="absolute top-2 right-2 sm:static sm:self-end sm:mb-2.25 p-1 rounded-sm text-charcoal-600 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                title="Remove dimension"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 border border-dashed border-charcoal-800 rounded-md">
          <span className="text-[10px] text-charcoal-500 font-sans font-light select-none">
            No attributes defined. Click 'Add Attribute' to configure variant keys.
          </span>
        </div>
      )}
    </div>
  );
};

export default VariantAttributes;
