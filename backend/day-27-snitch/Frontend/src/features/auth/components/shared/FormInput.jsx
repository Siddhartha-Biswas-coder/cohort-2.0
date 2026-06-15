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

  // Render left icon based on input name
  const renderLeftIcon = () => {
    const iconClass = `w-4 h-4 transition-colors duration-300 ${
      hasError
        ? "text-rose-500"
        : isFocused
        ? "text-gold-400"
        : "text-charcoal-500 group-hover:text-charcoal-400"
    }`;

    switch (name) {
      case "fullname":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        );
      case "email":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        );
      case "contact":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.557-5.145-3.878-6.702-6.702l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        );
      case "password":
      case "confirmPassword":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative group flex flex-col items-stretch">
      <div className="flex justify-between items-center mb-1.5">
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
      </div>

      <div className="relative flex items-center w-full">
        {/* Left Icon */}
        <div className="absolute left-3.5 pointer-events-none flex items-center justify-center">
          {renderLeftIcon()}
        </div>

        {/* Input Field */}
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
          className={`w-full bg-charcoal-950/20 border rounded-lg py-3 pl-10 pr-10 text-charcoal-200 placeholder:text-charcoal-700 transition-all duration-300 font-sans text-sm focus:outline-none focus:ring-1 ${
            hasError
              ? "border-rose-900 focus:border-rose-500 focus:ring-rose-500/20"
              : isFocused
              ? "border-gold-400 focus:border-gold-400 focus:ring-gold-400/25 shadow-gold-glow"
              : "border-charcoal-800 hover:border-charcoal-700"
          }`}
        />

        {/* Right Toggle Password Visibility Icon */}
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 p-1 text-charcoal-500 hover:text-gold-400 transition-colors focus:outline-none cursor-pointer"
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {hasError && (
        <p className="mt-1.5 text-xs text-rose-500 transition-all duration-300">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
