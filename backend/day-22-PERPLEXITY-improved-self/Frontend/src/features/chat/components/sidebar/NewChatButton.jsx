import React from "react";
import { Plus} from "lucide-react";

const NewChatButton = ({ onClick, collapsed }) => {
  return (
    <div className={`mb-4 flex ${collapsed ? "justify-center" : "w-full"}`}>
      <button
        onClick={onClick}
        className={`flex items-center border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 font-semibold transition-all hover:bg-zinc-100 dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/20 text-zinc-800 dark:text-white cursor-pointer ${collapsed ? "h-11 w-11 justify-center rounded-full" : "w-full rounded-full px-4 py-2.5 text-sm justify-start gap-2"}`}
      >
        <Plus size={18} className="shrink-0" />
        {!collapsed && <span className="text-sm font-medium">New</span>}
      </button>
    </div>
  );
};

export default NewChatButton;
