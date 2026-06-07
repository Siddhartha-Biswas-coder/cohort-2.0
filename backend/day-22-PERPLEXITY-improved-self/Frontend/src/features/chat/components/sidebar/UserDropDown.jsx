import React, { useEffect, useRef, useState } from "react";
import UserMenu from "./UserMenu.jsx";

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

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl p-2 transition-all hover:bg-white/5
            ${
              isOpen ? "border-cyan-500/30 bg-cyan-500/5" : "border-transparent"
            }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-semibold">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {!collapsed && (
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium">
                {user?.username || "User"}
              </p>

              <p className="truncate text-xs text-white/40">{user?.email}</p>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default UserDropDown;
