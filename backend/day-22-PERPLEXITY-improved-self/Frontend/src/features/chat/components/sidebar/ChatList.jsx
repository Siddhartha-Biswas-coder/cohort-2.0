import React, { useState } from "react";
import ChatItem from "./ChatItem";
import EmptySearch from "./EmptySearch";
import ChatGroup from "./ChatGroup";

const ChatList = ({
  chats,
  currentChatId,
  openChat,
  searchTerm,
  onRename,
  onDelete,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredChats = Object.values(chats).filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!filteredChats.length) {
    return <EmptySearch searchTerm={searchTerm} />;
  }

  const groupChats = filteredChats.reduce(
    (groups, chat) => {
      const chatDate = new Date(chat.lastUpdated);

      const today = new Date();

      const diffInDays = Math.floor((today - chatDate) / (1000 * 60 * 60 * 24));

      if (diffInDays === 0) {
        groups.today.push(chat);
      } else if (diffInDays === 1) {
        groups.yesterday.push(chat);
      } else if (diffInDays <= 7) {
        groups.previous7days.push(chat);
      } else {
        groups.older.push(chat);
      }

      return groups;
    },
    {
      today: [],
      yesterday: [],
      previous7days: [],
      older: [],
    },
  );

  return (
    <div>
      {groupChats.today.length > 0 && (
        <ChatGroup
          title="today"
          chats={groupChats.today}
          currentChatId={currentChatId}
          openChat={openChat}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          onRename={onRename}
          onDelete={onDelete}
        />
      )}
      {groupChats.yesterday.length > 0 && (
        <ChatGroup
          title="yesterday"
          chats={groupChats.yesterday}
          currentChatId={currentChatId}
          openChat={openChat}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          onRename={onRename}
          onDelete={onDelete}
        />
      )}
      {groupChats.previous7days.length > 0 && (
        <ChatGroup
          title="previous7days"
          chats={groupChats.previous7days}
          currentChatId={currentChatId}
          openChat={openChat}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          onRename={onRename}
          onDelete={onDelete}
        />
      )}
      {groupChats.older.length > 0 && (
        <ChatGroup
          title="older"
          chats={groupChats.older}
          currentChatId={currentChatId}
          openChat={openChat}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          onRename={onRename}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default ChatList;
