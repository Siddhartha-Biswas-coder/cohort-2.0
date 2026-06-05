import React from "react";

import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";

const MessageActions = ({ copied, onCopy }) => {
  return (
    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100">
      <button
        onClick={onCopy}
        className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        {copied ? "✓" : <Copy size={15} />}
      </button>
      <button className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-green-400">
        <ThumbsUp size={15} />
      </button>
      <button className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-red-400">
        <ThumbsDown size={15} />
      </button>
      <button className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-cyan-400">
        <RotateCcw size={15} />
      </button>
    </div>
  );
};

export default MessageActions;
