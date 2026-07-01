import React, { useState } from "react";
import { useTheme } from "../../../../app/hooks/useTheme";

const SocialAuthSection = ({ parentLoading }) => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");
    setTimeout(() => {
      window.location.href = `${backendUrl}/api/auth/google`;
    }, 600);
  };

  const isButtonDisabled = googleLoading || parentLoading;

  const buttonBgClass = isLight
    ? "bg-[#FFFFFF] hover:bg-[#F8F9FA] border-[#747775] hover:border-[#747775]"
    : "bg-[#131314] hover:bg-[#202124] border-[#747775] hover:border-[#747775]";

  const textClass = isLight
    ? "text-[#1f1f1f] group-hover:text-[#111111]"
    : "text-[#e3e3e3] group-hover:text-white";

  return (
    <>
      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-charcoal-800/40"></div>
        <span className="text-charcoal-500 font-display text-[9px] tracking-[0.25em] uppercase whitespace-nowrap">
          Or Connect With
        </span>
        <div className="flex-1 border-t border-charcoal-800/40"></div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isButtonDisabled}
        className={`w-full h-11 border rounded-lg flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold-500/30 relative px-4 ${buttonBgClass} ${
          googleLoading ? "opacity-90 cursor-wait border-gold-400/30" : ""
        }`}
      >
        {googleLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-3.5 w-3.5 text-gold-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="font-display text-[10px] tracking-[0.2em] uppercase text-gold-400 font-medium animate-pulse">
              Connecting to Google...
            </span>
          </span>
        ) : (
          <>
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className={`font-sans text-xs font-semibold tracking-wide transition-colors duration-300 ${textClass}`}>
              Continue with Google
            </span>
          </>
        )}
      </button>
    </>
  );
};

export default SocialAuthSection;
