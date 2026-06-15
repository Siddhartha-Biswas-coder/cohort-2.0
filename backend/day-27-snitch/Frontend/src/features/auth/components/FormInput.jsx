import React, { useState } from "react";

const FormInput = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  autoComplete,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  const hasError = touched && error;

  return (
    <div className="relative group">
      <div className="flex justify-between items-center mb-1">
        <label
          htmlFor={id}
          className={`block text-[10px] font-display uppercase tracking-[0.15em] transition-colors duration-200 ${
            hasError
              ? "text-rose-500"
              : isFocused
              ? "text-gold-400"
              : "text-charcoal-500"
          }`}
        >
          {label}
        </label>
        
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-[10px] font-display uppercase tracking-widest text-charcoal-500 hover:text-gold-400 transition-colors cursor-pointer focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      <input
        type={inputType}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full bg-transparent border-t-0 border-x-0 border-b py-2 px-0 text-charcoal-200 focus:outline-none focus:ring-0 placeholder:text-charcoal-700 transition-all font-sans text-sm ${
          hasError
            ? "border-rose-900 focus:border-rose-600"
            : "border-charcoal-800 focus:border-gold-400"
        }`}
      />

      {hasError && (
        <p className="mt-1.5 text-xs text-rose-500 transition-all duration-300">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
