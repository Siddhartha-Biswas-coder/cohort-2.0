import React from "react";
import ChatItem from "./ChatItem";
import { AnimatePresence, motion } from "framer-motion";

const ChatGroup = ({
  title,
  chats,
  currentChatId,
  openChat,
  openMenuId,
  setOpenMenuId,
  onRename,
  onDelete,
  onPin,
  onShare,
}) => {
  return (
    <div className="mb-4">
      <AnimatePresence>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="mb-2 px-2 text-xs font-medium uppercase text-white/40"
        >
          {title}
          {title === "pinned" && (
            <span className="ml-1 text-xs text-cyan-400">📌</span>
          )}
        </motion.h3>
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
            onRename={onRename}
            onDelete={onDelete}
            onPin={onPin}
            onShare={onShare}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatGroup;
