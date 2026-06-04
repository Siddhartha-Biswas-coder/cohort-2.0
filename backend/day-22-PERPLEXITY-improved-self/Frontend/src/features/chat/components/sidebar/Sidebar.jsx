import React, { useState } from "react";
import ChatList from "./ChatList.jsx";
import ChatSearch from "./ChatSearch.jsx";
import SidebarLogo from "./SidebarLogo.jsx";
import NewChatButton from "./NewChatButton.jsx";
import SidebarFooter from "./SidebarFooter.jsx";

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
    <aside className="hidden h-full w-72 shrink-0 rounded-3xl border border-white/10 bg-[#0b0f17] shadow-2xl p-5 md:flex md:flex-col">
      <SidebarLogo />

      <NewChatButton onClick={handleNewChat} />

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

      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
