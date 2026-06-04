import React, { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import ChatMenu from "./ChatMenu";

const ChatItem = ({ chat, currentChatId, openChat, onRename, onDelete }) => {
  const menuRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  useEffect(() => {
    setTitle(chat.title);
  }, [chat.title]);

  useEffect(() => {
    const handleClickOutiside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutiside);

    return () => {
      document.removeEventListener("click", handleClickOutiside);
    };
  }, []);

  const isActive = currentChatId === chat.id;

  return (
    <div
      onClick={() => openChat(chat.id)}
      className={`w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm font-medium transition
    ${
      isActive
        ? "border border-white bg-white/10 text-white"
        : "border border-white/10 text-white/80 hover:border-white/20 hover:bg-white/5 hover:text-white"
    }`}
    >
      <div className="group relative flex items-center justify-between">
        {isEditing ? (
          <input
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={async (event) => {
              if (event.key === "Enter") {
                const trimmedTitle = title.trim();

                if (!trimmedTitle) return;

                await onRename(chat.id, trimmedTitle);

                setIsEditing(false);
              }

              if (event.key === "Escape") {
                setTitle(chat.title);
                setIsEditing(false);
              }
            }}
            className="w-full bg-transparent outline-none"
          />
        ) : (
          <p className="min-w-0 flex-1 truncate">{chat.title}</p>
        )}

        <button
          className={`ml-2 shrink-0 opacity-0 cursor-pointer transition-opacity group-hover:opacity-100 ${showMenu && !isEditing ? "opacity-100" :""}`}
          onClick={(event) => {
            event.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
        >
          <MoreHorizontal size={16} />
        </button>

        <div ref={menuRef}>
          {showMenu && !isEditing && (
            <ChatMenu
              onRenameClick={() => {
                setIsEditing(true);
                setShowMenu(false);
              }}
              onDeleteClick={() => {
                setShowMenu(false);

                const confirmed = window.confirm("Delete this chat?");

                if (confirmed) {
                  onDelete(chat.id);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
