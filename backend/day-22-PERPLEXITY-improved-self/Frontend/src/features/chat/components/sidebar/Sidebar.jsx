import React, { useState } from "react";
import ChatList from "./ChatList.jsx";
import ChatSearch from "./ChatSearch.jsx";
import SidebarLogo from "./SidebarLogo.jsx";
import NewChatButton from "./NewChatButton.jsx";
import SidebarFooter from "./SidebarFooter.jsx";
import { motion } from "framer-motion";
import { Folders, Hexagon, Layout, Monitor, History as HistoryIcon } from "lucide-react";

const Sidebar = ({
  chats,
  openChat,
  handleNewChat,
  currentChatId,
  onRename,
  onDelete,
  onPin,
  onShare,
}) => {
  const [searchItem, setSearchItem] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: Monitor, label: "Computer" },
    { icon: Folders, label: "Spaces" },
    { icon: Layout, label: "Artifacts" },
    { icon: Hexagon, label: "Customize" },
    { icon: HistoryIcon, label: "History" },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="hidden h-full shrink-0 border border-zinc-200/80 dark:border-white/5 bg-white dark:bg-[#0c0c0e] shadow-lg dark:shadow-[0_0_50px_rgba(0,0,0,0.3)] p-4 md:flex md:flex-col rounded-3xl transition-colors duration-200"
    >
      <SidebarLogo
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />
      <NewChatButton onClick={handleNewChat} collapsed={collapsed} />
      <div className="flex flex-col gap-1 mb-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`flex items-center gap-3 rounded-full text-zinc-500 dark:text-white/60 hover:bg-indigo-500/5 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all cursor-pointer ${
                collapsed ? "justify-center h-10 w-10 mx-auto" : "px-3 py-2 w-full"
              }`}
            >
              <Icon size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
      {!collapsed && (
        <div className="flex-1 flex flex-col min-h-0">
          <ChatSearch searchItem={searchItem} setSearchItem={setSearchItem} />
          <div className="flex-1 overflow-y-auto">
            <ChatList
              chats={chats}
              currentChatId={currentChatId}
              openChat={openChat}
              searchTerm={searchItem}
              onRename={onRename}
              onDelete={onDelete}
              onPin={onPin}
              onShare={onShare}
            />
          </div>
        </div>
      )}

      <SidebarFooter collapsed={collapsed} />
    </motion.aside>
  );
};

export default Sidebar;
