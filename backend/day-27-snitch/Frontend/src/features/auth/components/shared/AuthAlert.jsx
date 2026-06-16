import React from "react";

const AuthAlert = ({ type, message }) => {
  if (!message) return null;

  if (type === "success") {
    return (
      <div className="p-4 bg-gold-400/10 border border-gold-400 text-gold-400 text-xs tracking-wide uppercase rounded-none text-center">
        {message}
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#A45F5F]/5 border border-[#A45F5F]/25 text-[#C98B7A] font-sans text-xs tracking-wide rounded-lg text-center flex items-center justify-center gap-2 animate-error-fade-in-up">
      <svg className="w-3.5 h-3.5 shrink-0 text-[#C98B7A]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </div>
  );
};

export default AuthAlert;
