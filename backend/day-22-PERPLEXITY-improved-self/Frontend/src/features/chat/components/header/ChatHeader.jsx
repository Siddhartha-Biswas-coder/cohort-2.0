import React, { useEffect, useState } from "react";
import HeaderActions from "./HeaderActions";

const ChatHeader = ({ currentChat, onShare }) => {
  return (
    <header className="border-b border-white/10 pb-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            {currentChat?.title || "New Chat"}
          </h2>
        </div>

        <HeaderActions onShare={onShare} />
      </div>
    </header>
  );
};

export default ChatHeader;
