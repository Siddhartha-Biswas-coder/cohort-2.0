import React, { useEffect, useRef, useState } from "react";
import UserMenu from "./UserMenu.jsx";
import { Bell } from "lucide-react";

const UserDropDown = ({ user, collapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef} className="relative">
      {isOpen && <UserMenu collapsed={collapsed} />}

      <div
        className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} w-full`}
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-3 rounded-full transition-all hover:bg-zinc-100 dark:hover:bg-white/5 cursor-pointer
            ${collapsed ? "justify-center p-1" : "flex-1 text-left p-2"}`}
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 dark:bg-white/10 font-semibold text-sm text-zinc-800 dark:text-white select-none">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-indigo-400 ring-2 ring-white dark:ring-[#0c0c0e]" />
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-800 dark:text-white/90">
                {user?.username || "User"}
              </p>
            </div>
          )}
        </button>

        {!collapsed && (
          <button className="rounded-lg p-2 text-zinc-500 dark:text-white/60 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-850 dark:hover:text-white transition-all cursor-pointer">
            <Bell size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDropDown;
