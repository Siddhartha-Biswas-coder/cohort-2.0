import React from "react";
import ChatItem from "./ChatItem";

const ChatGroup = ({
  title,
  chats,
  currentChatId,
  openChat,
  openMenuId,
  setOpenMenuId,
  onRename,
  onDelete,
}) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2 px-2 text-xs font-medium uppercase text-white/40">
        {title}
      </h3>

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
          />
        ))}
      </div>
    </div>
  );
};

export default ChatGroup;
