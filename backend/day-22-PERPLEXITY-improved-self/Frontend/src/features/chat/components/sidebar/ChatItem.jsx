import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ChatMenu from "./ChatMenu.jsx";

const ChatItem = ({
  chat,
  currentChatId,
  openChat,
  onRename,
  onDelete,
  openMenuId,
  setOpenMenuId,
  onPin,
}) => {
  const menuRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  const showMenu = openMenuId === chat.id;
  const isActive = currentChatId === chat.id;

  useEffect(() => {
    setTitle(chat.title);
  }, [chat.title]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);

        if (isEditing) {
          setTitle(chat.title);
          setIsEditing(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditing, chat.title, setOpenMenuId]);

  const handleSaveRename = async () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitle(chat.title);
      setIsEditing(false);
      return;
    }

    await onRename(chat.id, trimmedTitle);

    setIsEditing(false);
  };

  return (
    <div
      ref={menuRef}
      onClick={() => {
        if (isEditing) return;
        openChat(chat.id);
      }}
      className={`w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
        isActive
          ? "border border-white bg-white/10 text-white"
          : "border border-white/10 text-white/80 hover:border-white/20 hover:bg-white/5"
      }`}
    >
      <div className="group relative flex items-center justify-between">
        {isEditing ? (
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onBlur={handleSaveRename}
            onKeyDown={async (event) => {
              if (event.key === "Enter") {
                await handleSaveRename();
              }

              if (event.key === "Escape") {
                setTitle(chat.title);
                setIsEditing(false);
              }
            }}
            className="min-w-0 flex-1 bg-transparent outline-none"
          />
        ) : (
          <p className="min-w-0 flex-1 truncate">{chat.title}</p>
        )}

        {!isEditing && (
          <button
            className={`ml-2 shrink-0 cursor-pointer transition-opacity ${
              showMenu || isActive
                ? "opacity-100 "
                : "opacity-0 group-hover:opacity-100"
            }`}
            onClick={(event) => {
              event.stopPropagation();

              if (showMenu) {
                setOpenMenuId(null);
              } else {
                setOpenMenuId(chat.id);
              }
            }}
          >
            <MoreHorizontal size={16} />
          </button>
        )}

        {showMenu && !isEditing && (
          <ChatMenu
            isPinned={chat.isPinned}
            onPinClick={() => {
              setOpenMenuId(null);
              onPin(chat.id);
            }}
            onRenameClick={() => {
              setOpenMenuId(null);

              setTimeout(() => {
                setIsEditing(true);
              }, 0);
            }}
            onDeleteClick={() => {
              setOpenMenuId(null);

              const confirmed = window.confirm("Delete this chat?");

              if (confirmed) {
                onDelete(chat.id);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ChatItem;
