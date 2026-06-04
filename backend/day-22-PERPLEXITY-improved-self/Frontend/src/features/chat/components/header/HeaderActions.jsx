import React from "react";
import { Share2, MoreHorizontal } from "lucide-react";

const HeaderActions = () => {
  return (
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-2 rounded-xl border border-whte/10 px-3 py-2 text-sm text-white/70 transition-all hover:bg-white/5 hover:text-white">
        <Share2 size={16} />
        Share
      </button>
      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/70 transition-all hover:bg-white/5 hover:text-white">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
};

export default HeaderActions;
