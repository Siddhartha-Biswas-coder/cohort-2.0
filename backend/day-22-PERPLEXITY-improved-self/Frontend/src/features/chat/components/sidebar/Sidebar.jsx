import React, { useState } from "react";
import ChatList from "./ChatList.jsx";
import ChatSearch from "./ChatSearch.jsx";

const Sidebar = ({
  chats,
  openChat,
  handleNewChat,
  currentChatId,
  onRename,
  onDelete,
}) => {
  const [searchItem, setSearchItem] = useState("");

  return (
    <aside className="hidden h-full w-64 shrink-0 rounded-3xl border bg-[#080b12] p-4 md:flex md:flex-col">
      <h1 className="mb-5 text-3xl font-semibold tracking-tight">Perplexity</h1>

      <button
        onClick={handleNewChat}
        className="mb-4 rounded-xl border border-white/20 px-4 py-3"
      >
        + New Chat
      </button>

      <ChatSearch searchItem={searchItem} setSearchItem={setSearchItem} />

      <div className="flex-1 overflow-y-auto">
        <ChatList
          chats={chats}
          currentChatId={currentChatId}
          openChat={openChat}
          searchTerm={searchItem}
          onRename={onRename}
          onDelete={onDelete}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
