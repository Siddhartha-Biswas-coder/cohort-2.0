import React from "react";
import { useTheme } from "../hooks/useTheme.js";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="text-charcoal-500 hover:text-gold-400 p-1.5 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        // Moon Icon (Show to change to Dark Mode)
        <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      ) : (
        // Sun Icon (Show to change to Light Mode)
        <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m12.38 12.38l1.59 1.59M3 12h2.25m13.5 0H21M6.03 17.97l-1.59 1.59m12.38-12.38l1.59-1.59M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
