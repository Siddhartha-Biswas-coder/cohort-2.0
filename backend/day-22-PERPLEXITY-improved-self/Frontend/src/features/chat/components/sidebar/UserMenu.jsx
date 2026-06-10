import { LogOut, Palette, Settings, User } from "lucide-react";
import React from "react";
import { useAuth } from "../../../auth/hooks/useAuth.js";

const UserMenu = ({ collapsed }) => {
  const auth = useAuth();
  
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const menuItems = [
    {
      icon: User,
      label: "Profile",
    },
    {
      icon: Settings,
      label: "Settings",
    },
    {
      icon: Palette,
      label: "Theme",
      onClick: toggleTheme,
    },
    {
      icon: LogOut,
      label: "Logout",
      danger: true,
      onClick: () => auth.handleLogOut(),
    },
  ];
  return (
    <div
      className={`absolute rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121215] p-2 shadow-2xl transition-all ${
        collapsed
          ? "bottom-0 left-full ml-2 w-48"
          : "bottom-full left-0 mb-5 w-full"
      }`}
    >
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all cursor-pointer ${
              item.danger
                ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                : "text-zinc-700 dark:text-white/80 hover:bg-zinc-100 dark:hover:bg-white/5"
            }`}
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default UserMenu;
