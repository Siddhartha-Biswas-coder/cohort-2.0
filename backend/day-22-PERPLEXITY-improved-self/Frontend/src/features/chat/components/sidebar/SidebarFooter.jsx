import React from "react";
import { useSelector } from "react-redux";
import UserDropDown from "./UserDropDown";
import { ArrowUp } from "lucide-react";

const SidebarFooter = ({ collapsed }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="mt-auto pt-4 flex flex-col gap-3">
      <div className={`flex ${collapsed ? "justify-center" : "w-full"}`}>
        {collapsed ? (
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 dark:text-white/70 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-350 dark:border-white/40">
              <ArrowUp size={14} />
            </div>
          </button>
        ) : (
          <button className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-white/80 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all w-fit cursor-pointer">
            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-zinc-350 dark:border-white/60">
              <ArrowUp size={10} />
            </div>
            <span>Upgrade plan</span>
          </button>
        )}
      </div>
      <UserDropDown user={user} collapsed={collapsed} />
    </div>
  );
};

export default SidebarFooter;
