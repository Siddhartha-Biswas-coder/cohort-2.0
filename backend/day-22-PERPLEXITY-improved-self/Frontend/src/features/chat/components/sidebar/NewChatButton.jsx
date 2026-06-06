import React from "react";
import { Plus } from "lucide-react";

const NewChatButton = ({ onClick, collapsed }) => {
  return (
    <button
      onClick={onClick}
      className="flex text-center justify-center mb-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition-all hover:bg-white/10 hover:border-white/20"
    >
      {collapsed ? <Plus size={18} /> : "+ New Thread"}
    </button>
  );
};

export default NewChatButton;
