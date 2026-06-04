import React from "react";
import { Search, Brain } from "lucide-react";

const HeaderModes = () => {
  return (
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-all">
        <Search size={16} /> Search
      </button>

      <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/2 px-4 py-2 text-sm font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white">
        <Brain size={16} />
        Research
      </button>
    </div>
  );
};

export default HeaderModes;
