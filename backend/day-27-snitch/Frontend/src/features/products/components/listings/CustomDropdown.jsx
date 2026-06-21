import React, { useState, useEffect, useRef } from "react";

/**
 * CustomDropdown – premium styled dropdown component
 * Props:
 *   label: string – optional label displayed beside the control
 *   options: Array<{ value: string, label: string }>
 *   selected: string – currently selected value
 *   onChange: (value: string) => void
 *   className?: string – additional Tailwind classes for the outer wrapper
 */
const CustomDropdown = ({ label, options = [], selected, onChange, className = "" }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSelect = (value) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* {label && (
        <label className="text-[9px] font-display uppercase tracking-widest text-charcoal-500 mr-2">
          {label}
        </label>
      )} */}
      <button
        type="button"
        onClick={toggleOpen}
        className="appearance-none flex items-center w-full h-10 px-3 bg-charcoal-950/20 border border-gold-400/30 rounded-lg text-charcoal-300 font-sans text-xs tracking-wider focus:outline-none focus:border-gold-400 transition-all duration-200 cursor-pointer"
      >
        <span className="flex-1 text-left truncate">
          {options.find((o) => o.value === selected)?.label || "Select"}
        </span>
        {/* Chevron */}
        <svg
          className={`w-3 h-3 ml-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute left-0 mt-1 w-full bg-charcoal-900 border border-charcoal-800 rounded-md shadow-lg bg-opacity-95 backdrop-blur-sm z-30 animate-fade-in scale-95 origin-top transition-transform duration-200"
        >
          <ul className="py-1">
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-3 py-2 text-xs text-charcoal-200 hover:bg-charcoal-800 hover:text-gold-400 transition-colors ${opt.value === selected ? "bg-charcoal-800 text-gold-400" : ""}`}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
