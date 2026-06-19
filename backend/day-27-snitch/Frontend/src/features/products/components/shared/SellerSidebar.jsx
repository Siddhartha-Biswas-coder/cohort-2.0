import React from "react";
import { useNavigate } from "react-router";

/**
 * SellerSidebar — luxury desktop side drawer navigation
 * Props:
 *   activePage: "dashboard" | "create-listing" – highlights the active nav item
 */

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/seller/dashboard",
    icon: (
      <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
      </svg>
    ),
  },
  {
    id: "create-listing",
    label: "Create Listing",
    path: "/seller/create-listing",
    icon: (
      <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Sales & Analytics",
    path: null, // No route yet
    icon: (
      <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9-7h2a2 2 0 012 2v5a2 2 0 01-2 2h-2a2 2 0 01-2-2v-5a2 2 0 012-2z" />
      </svg>
    ),
  },
];

const SellerSidebar = ({ activePage }) => {
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-charcoal-900 border-r border-charcoal-800 py-8 z-50">
      {/* Logo */}
      <div className="px-8 mb-10 flex items-center gap-2.5">
        <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2 1.8-3.5 3-3.5s2 1 2 2c0 1.5-1.5 2-3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5L2.5 16.5c-.6.4-.3 1.2.4 1.2h18.2c.7 0 1-.8.4-1.2L12 9.5z" />
        </svg>
        <div className="flex flex-col">
          <span className="font-display text-xs font-bold tracking-[0.25em] text-gold-400 leading-none">LUMIÈRE</span>
          <span className="text-[7px] font-sans text-charcoal-500 uppercase tracking-widest mt-1">Verified Seller</span>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="grow px-2">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activePage;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => item.path && navigate(item.path)}
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
          <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default SellerSidebar;
