import React from "react";
import ChatItem from "./ChatItem";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

const ChatGroup = ({
  title,
  chats,
  currentChatId,
  openChat,
  openMenuId,
  setOpenMenuId,
  collapsed,
  onRename,
  onDelete,
}) => {
  return (
    <div className="mb-4">
      <AnimatePresence>
        {!collapsed && (
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mb-2 px-2 text-xs font-medium uppercase text-white/40"
          >
            {title}
          </motion.h3>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            currentChatId={currentChatId}
            openChat={openChat}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
            collapsed={collapsed}
            onRename={onRename}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatGroup;
