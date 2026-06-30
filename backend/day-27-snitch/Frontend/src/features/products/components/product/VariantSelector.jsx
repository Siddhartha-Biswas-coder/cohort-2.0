import React, { useMemo } from "react";
import VariantGroup from "./VariantGroup.jsx";

const VariantSelector = ({
  variants = [],
  selectedAttributes = {},
  onChangeSelectedAttributes,
}) => {
  // Extract all unique attribute names across all variants
  const attributeKeys = useMemo(() => {
    if (!variants || variants.length === 0) return [];
    const keys = [];
    variants.forEach((variant) => {
      if (variant.attributes) {
        Object.keys(variant.attributes).forEach((key) => {
          if (!keys.includes(key)) {
            keys.push(key);
          }
        });
      }
    });
    return keys;
  }, [variants]);

  // Extract all unique values for each attribute name (global — always shown)
  const attributeValues = useMemo(() => {
    if (!variants || variants.length === 0) return {};
    const map = {};
    attributeKeys.forEach((key) => {
      map[key] = ["Original"];
      variants.forEach((variant) => {
        if (variant.attributes && variant.attributes[key]) {
          const val = variant.attributes[key];
          if (!map[key].includes(val)) {
            map[key].push(val);
          }
        }
      });
    });
    return map;
  }, [attributeKeys, variants]);

  // Determine variants that are reachable given current selections (excluding the key being tested)
  // An option is "available" if at least one variant exists that:
  //   - has [key]: [value]
  //   - has all currently selected attributes (for OTHER keys)
  const isOptionAvailable = (key, value) => {
    if (value === "Original") return true;
    if (!variants || variants.length === 0) return false;

    // Build test selections: keep all selections except for this key, add this value
    const otherSelections = {};
    Object.entries(selectedAttributes).forEach(([k, v]) => {
      if (k !== key) otherSelections[k] = v;
    });

    return variants.some((variant) => {
      if (!variant.attributes) return false;
      // Must match the test value for this key
      if (variant.attributes[key] !== value) return false;
      // Must also match all other currently selected attributes
      return Object.entries(otherSelections).every(
        ([k, v]) => variant.attributes[k] === v
      );
    });
  };

  // Handle attribute chip click — always callable, even for unavailable options
  const handleSelectAttribute = (key, value) => {
    if (!variants || variants.length === 0) return;

    if (value === "Original") {
      const nextSelections = { ...selectedAttributes };
      delete nextSelections[key];
      onChangeSelectedAttributes(nextSelections);
      return;
    }

    // Toggle: if already selected, deselect it and find best remaining match
    if (selectedAttributes[key] === value) {
      const nextSelections = { ...selectedAttributes };
      delete nextSelections[key];

      const matchingVariants = variants.filter((variant) => {
        if (!variant.attributes) return false;
        return Object.entries(nextSelections).every(
          ([k, v]) => variant.attributes[k] === v
        );
      });

      if (matchingVariants.length === 1) {
        onChangeSelectedAttributes(matchingVariants[0].attributes || {});
      } else {
        onChangeSelectedAttributes(nextSelections);
      }
      return;
    }

    const nextSelections = { ...selectedAttributes, [key]: value };

    // Check if the new combination has any matching variants
    const directMatches = variants.filter((variant) => {
      if (!variant.attributes) return false;
      return Object.entries(nextSelections).every(
        ([k, v]) => variant.attributes[k] === v
      );
    });

    if (directMatches.length === 1) {
      // Exact variant resolved
      onChangeSelectedAttributes(directMatches[0].attributes || {});
      return;
    }

    if (directMatches.length > 1) {
      // Multiple still match — keep current selection state
      onChangeSelectedAttributes(nextSelections);
      return;
    }

    // No direct match — conflict resolution:
    // Keep the newly clicked value, drop incompatible attributes from other keys,
    // then auto-select any remaining single-match variant.
    const resolvedSelections = { [key]: value };
    Object.entries(selectedAttributes).forEach(([k, v]) => {
      if (k === key) return;
      const combinationValid = variants.some(
        (variant) =>
          variant.attributes?.[key] === value && variant.attributes?.[k] === v
      );
      if (combinationValid) {
        resolvedSelections[k] = v;
      }
    });

    const resolvedMatches = variants.filter((variant) => {
      if (!variant.attributes) return false;
      return Object.entries(resolvedSelections).every(
        ([k, v]) => variant.attributes[k] === v
      );
    });

    if (resolvedMatches.length === 1) {
      onChangeSelectedAttributes(resolvedMatches[0].attributes || {});
    } else {
      onChangeSelectedAttributes(resolvedSelections);
    }
  };

  if (attributeKeys.length === 0) return null;

  const hasSelections = Object.keys(selectedAttributes).length > 0;

  return (
    <div className="flex flex-col gap-6 mb-8 select-none">
      {/* Selector Groups — always visible, unavailable options are greyed out */}
      <div className="flex flex-col gap-5">
        {attributeKeys.map((key) => (
          <VariantGroup
            key={key}
            label={key}
            options={attributeValues[key]}
            selectedValue={selectedAttributes[key] || "Original"}
            onSelect={handleSelectAttribute}
            isOptionDisabled={(k, v) => !isOptionAvailable(k, v)}
          />
        ))}
      </div>

      {/* Selected Configuration Summary */}
      {hasSelections && (
        <div className="pt-4 border-t border-charcoal-800/40">
          <span className="font-display text-[9px] font-semibold uppercase tracking-widest text-charcoal-500 block mb-1">
            Selected Configuration
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-charcoal-300">
            {Object.entries(selectedAttributes).map(([k, v], idx) => (
              <React.Fragment key={k}>
                {idx > 0 && (
                  <span className="text-charcoal-700 select-none">•</span>
                )}
                <span>
                  <strong className="text-charcoal-500 font-light mr-1">{k}:</strong>{" "}
                  {v}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
