import React from "react";

const ChatHeader = ({ currentChat }) => {
  return (
    <header className="flex items-center justify-between border-b border-white/10 pb-4">
      <div>
        <h2 className="text-xl font-semibold">
          {currentChat?.title || "New Chat"}
        </h2>

        <p className="text-sm text-white/50">
          {currentChat?.messages?.length || 0} messages
        </p>
      </div>

      <div className="flex gap-2">
        <button className="rounded-lg border border-white/20 px-3 py-2 text-sm">
          Rename
        </button>

        <button className="rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-400">
          Delete
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
