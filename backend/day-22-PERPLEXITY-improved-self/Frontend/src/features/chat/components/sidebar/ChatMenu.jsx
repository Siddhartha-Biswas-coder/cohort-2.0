import React from "react";

const ChatMenu = ({
  onRenameClick,
  onDeleteClick,
  onPinClick,
  isPinned,
  onShareClick, // <-- Unified casing
}) => {
  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-white/10 bg-[#11151d] p-1 shadow-xl">
      <button
        onClick={onPinClick}
        type="button"
        className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/5 cursor-pointer"
      >
        {isPinned ? "Unpin Chat" : "Pin Chat"}
      </button>
      <button
        onClick={onShareClick}
        type="button"
        className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/5 cursor-pointer" // <-- Fixed text-left spelling
      >
        Share Chat
      </button>
      <button
        onClick={onRenameClick}
        type="button"
        className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/5 cursor-pointer"
      >
        Rename
      </button>
      <button
        onClick={onDeleteClick}
        type="button"
        className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10 cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};

export default ChatMenu;
