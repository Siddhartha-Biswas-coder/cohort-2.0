import React from "react";

const RegisterNavbar = () => {
  return (
    <nav className="bg-charcoal-900 border-b border-charcoal-800 flex justify-between items-center w-full px-8 md:px-16 py-6 fixed top-0 left-0 z-50">
      <div className="flex items-center gap-3 cursor-pointer hover:opacity-95 transition-opacity select-none">
        <svg className="w-7 h-7 text-gold-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2 1.8-3.5 3-3.5s2 1 2 2c0 1.5-1.5 2-3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5L2.5 16.5c-.6.4-.3 1.2.4 1.2h18.2c.7 0 1-.8.4-1.2L12 9.5z" />
        </svg>
        <div className="flex flex-col">
          <span className="font-display text-sm font-bold tracking-[0.25em] text-gold-400 leading-none">LUMIÈRE</span>
          <span className="text-[7px] font-sans text-charcoal-500 uppercase tracking-widest mt-1">Premium Fashion, Made for You</span>
        </div>
      </div>
      <div className="hidden md:flex gap-10 items-center">
        <a
          href="#"
          className="font-display text-[10px] uppercase tracking-[0.2em] text-charcoal-500 hover:text-gold-400 transition-colors duration-300"
        >
          Collections
        </a>
        <a
          href="#"
          className="font-display text-[10px] uppercase tracking-[0.2em] text-charcoal-500 hover:text-gold-400 transition-colors duration-300"
        >
          New Arrivals
        </a>
        <a
          href="#"
          className="font-display text-[10px] uppercase tracking-[0.2em] text-charcoal-500 hover:text-gold-400 transition-colors duration-300"
        >
          Bespoke
        </a>
      </div>
      <div className="flex items-center gap-6 text-gold-400">
        <button className="focus:outline-none focus:ring-1 focus:ring-gold-500 p-1 cursor-pointer">
          <svg
            className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </button>
        <button className="focus:outline-none focus:ring-1 focus:ring-gold-500 p-1 cursor-pointer">
          <svg
            className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default RegisterNavbar;
