import React from "react";
import { useNavigate } from "react-router";

const STUDIO_NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: "media",
    label: "Media Gallery",
    icon: (
      <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "variants",
    label: "Variants",
    icon: (
      <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: (
      <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const StudioSidebar = ({ activeSection = "overview", onSectionClick }) => {
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-charcoal-900 border-r border-charcoal-800 py-8 z-50 select-none">
      {/* Brand Header with drill-down Back button */}
      <div className="px-8 mb-8 flex flex-col gap-5">
        <button
          type="button"
          onClick={() => navigate("/seller/dashboard")}
          className="flex items-center text-[9px] font-display font-semibold uppercase tracking-[0.2em] text-charcoal-500 hover:text-gold-400 transition-colors cursor-pointer w-fit"
        >
          <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Inventory
        </button>

        {/* Studio Group Name */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <svg
            className="w-5 h-5 text-gold-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c0-2.2 1.8-3.5 3-3.5s2 1 2 2c0 1.5-1.5 2-3 3"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.5L2.5 16.5c-.6.4-.3 1.2.4 1.2h18.2c.7 0 1-.8.4-1.2L12 9.5z"
            />
          </svg>
          <span className="font-display text-[10px] font-bold tracking-[0.25em] text-gold-400 leading-none">
            LUMIÈRE
          </span>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="grow px-2">
        <div className="px-6 mb-3 text-[9px] font-display font-bold uppercase tracking-[0.25em] text-charcoal-500">
          LISTING STUDIO
        </div>
        <ul className="space-y-1">
          {STUDIO_NAV_ITEMS.map((item) => {
            const isActive = item.id === activeSection;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSectionClick?.(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-[10px] font-display font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                    isActive
                      ? "text-gold-400 border-r-2 border-gold-400 bg-charcoal-950/30"
                      : "text-charcoal-500 hover:text-gold-400 hover:bg-charcoal-950/40"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer controls */}
      <div className="px-6 py-6 border-t border-charcoal-800/80">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full flex items-center px-2 py-2 text-[10px] font-display font-semibold uppercase tracking-widest text-charcoal-500 hover:text-red-400 transition-colors cursor-pointer"
        >
          <svg
            className="w-4 h-4 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default StudioSidebar;
