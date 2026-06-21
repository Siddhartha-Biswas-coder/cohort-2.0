import React from "react";

const PRESET_KEYS = ["Color", "Size", "Material", "Edition"];

const VariantAttributes = ({
  attributesList = [],
  onChange,
}) => {

  const addAttributeRow = () => {
    onChange([...attributesList, { key: "Color", value: "", isCustom: false, customKey: "" }]);
  };

  const removeAttributeRow = (idx) => {
    const updated = attributesList.filter((_, i) => i !== idx);
    onChange(updated);
  };

  const handleRowChange = (idx, field, value) => {
    const updated = attributesList.map((row, i) => {
      if (i !== idx) return row;
      const updatedRow = { ...row, [field]: value };
      
      // If type key changes, reset custom configurations
      if (field === "key") {
        if (value === "Custom") {
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
          className="text-[9px] font-display font-semibold uppercase tracking-widest text-gold-400 hover:text-gold-500 transition-colors flex items-center gap-1 cursor-pointer"
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
            <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start bg-charcoal-950/40 border border-charcoal-800/40 p-4 rounded-md relative group/row">
              
              {/* Key selection dropdown */}
              <div className="flex-1 w-full flex flex-col gap-2">
                <label className="text-[8px] font-display font-bold uppercase tracking-widest text-charcoal-500">
                  Dimension Key
                </label>
                <div className="relative">
                  <select
                    value={row.isCustom ? "Custom" : row.key}
                    onChange={(e) => handleRowChange(idx, "key", e.target.value)}
                    className="w-full bg-transparent border-b border-charcoal-800 py-2 pr-8 text-xs text-gold-50 appearance-none focus:outline-none focus:border-gold-400 transition-all cursor-pointer"
                  >
                    {PRESET_KEYS.map((k) => (
                      <option key={k} value={k} className="bg-charcoal-900 text-gold-50">{k}</option>
                    ))}
                    <option value="Custom" className="bg-charcoal-900 text-gold-50">Custom...</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-charcoal-600">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
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
                    className="w-full bg-transparent border-b border-charcoal-800 py-1.5 text-xs text-gold-50 placeholder-charcoal-600 focus:outline-none focus:border-gold-400 transition-all"
                  />
                </div>
              )}

              {/* Value Input */}
              <div className="flex-1 w-full flex flex-col gap-2">
                <label className="text-[8px] font-display font-bold uppercase tracking-widest text-charcoal-500">
                  Attribute Value
                </label>
                <input
                  type="text"
                  value={row.value || ""}
                  onChange={(e) => handleRowChange(idx, "value", e.target.value)}
                  placeholder="e.g. Matte Black"
                  className="w-full bg-transparent border-b border-charcoal-800 py-1.5 text-xs text-gold-50 placeholder-charcoal-600 focus:outline-none focus:border-gold-400 transition-all"
                />
              </div>

              {/* Remove Row Button */}
              <button
                type="button"
                onClick={() => removeAttributeRow(idx)}
                className="absolute top-2 right-2 sm:static sm:self-end sm:mb-1.5 p-1 rounded-sm text-charcoal-600 hover:text-red-400 transition-colors cursor-pointer"
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
