import React from "react";

const WorkspaceInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  prefix = null,
  isTextarea = false,
  rows = 4,
  min,
  step,
  className = "",
}) => {
  const inputBaseClass = `w-full bg-transparent border-b py-3 text-gold-50 placeholder-charcoal-600 transition-all duration-300 focus:outline-none ${
    isTextarea ? "resize-none leading-relaxed text-sm" : "text-lg"
  } ${prefix ? "pl-6" : ""} ${
    error
      ? "border-red-500/50 focus:border-red-500 focus:ring-0"
      : "border-charcoal-800 focus:border-gold-400 focus:shadow-[0_1px_0_0_rgba(197,160,89,0.25)]"
  }`;

  return (
    <div className={`flex flex-col gap-3.5 group ${className}`}>
      <label className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500 group-focus-within:text-gold-400 transition-colors">
        {label}
      </label>
      
      <div className="relative w-full">
        {prefix && (
          <span className="absolute left-0 top-3 text-lg font-light text-charcoal-500 select-none">
            {prefix}
          </span>
        )}

        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={inputBaseClass}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            step={step}
            className={inputBaseClass}
          />
        )}
      </div>

      {error && (
        <span className="text-[10px] text-red-500 font-sans tracking-wide mt-1 animate-error-fade-in-up">
          {error}
        </span>
      )}
    </div>
  );
};

export default WorkspaceInput;
