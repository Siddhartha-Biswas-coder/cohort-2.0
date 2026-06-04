import React, { useEffect, useState } from "react";

const ChatHeader = ({ currentChat }) => {
  return (
    <header className="flex items-center justify-between border-b border-white/10 pb-4">
      <h2 className="text-xl font-semibold">
        {currentChat?.title || "New Chat"}
      </h2>

      <p className="text-xs text-white/40">
        {currentChat?.messages?.length || 0} messages
      </p>
    </header>
  );
};

export default ChatHeader;
