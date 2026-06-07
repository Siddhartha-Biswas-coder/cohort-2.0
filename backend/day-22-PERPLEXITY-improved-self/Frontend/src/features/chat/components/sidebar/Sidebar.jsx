import React, { useState } from "react";
import ChatList from "./ChatList.jsx";
import ChatSearch from "./ChatSearch.jsx";
import SidebarLogo from "./SidebarLogo.jsx";
import NewChatButton from "./NewChatButton.jsx";
import SidebarFooter from "./SidebarFooter.jsx";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const Sidebar = ({
  chats,
  openChat,
  handleNewChat,
  currentChatId,
  onRename,
  onDelete,
  onPin,
}) => {
  const [searchItem, setSearchItem] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 100 : 288 }}
      transition={{ duration: 0.25 }}
      className="hidden h-full shrink-0 rounded-3xl border border-white/10 bg-[#0b0f17] shadow-2xl p-5 md:flex md:flex-col"
    >
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      <SidebarLogo collapsed={collapsed} />

      <NewChatButton onClick={handleNewChat} collapsed={collapsed} />

      {!collapsed && (
        <ChatSearch searchItem={searchItem} setSearchItem={setSearchItem} />
      )}

      {!collapsed && (
        <div className="flex-1 overflow-y-auto">
          <ChatList
            chats={chats}
            currentChatId={currentChatId}
            openChat={openChat}
            searchTerm={searchItem}
            onRename={onRename}
            onDelete={onDelete}
            onPin={onPin}
          />
        </div>
      )}

      <SidebarFooter collapsed={collapsed} />
    </motion.aside>
  );
};

export default Sidebar;
