import { LogOut, Palette, Settings, User } from "lucide-react";
import React from "react";

const UserMenu = ({ collapsed }) => {
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
    },
    {
      icon: LogOut,
      label: "Logout",
      danger: true,
    },
  ];
  return (
    <div
      className={`absolute rounded-2xl border border-white/10 bg-[#0f1522] p-2 shadow-2xl transition-all ${
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
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-white/5 
          ${item.danger ? "text-red-400" : "text-white/80"}`}
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
