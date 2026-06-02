import React, { useEffect, useState } from "react";

const ChatHeader = ({ currentChat, onRename, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(currentChat?.title || "");
  useEffect(() => {
    setTitle(currentChat?.title || "");
  }, [currentChat]);

  return (
    <header className="flex items-center justify-between border-b border-white/10 pb-4">
      <div>
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border px-3 py-2 bg-transparent"
          />
        ) : (
          <h2 className="text-xl font-semibold">
            {currentChat?.title || "New Chat"}
          </h2>
        )}

        <p className="text-xs text-white/40">
          {currentChat?.messages?.length || 0} messages
        </p>
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={async () => {
                if (!title.trim()) {
                  alert("Title cannot be empty");
                  return;
                }

                await onRename(title);
                setIsEditing(false);
              }}
              className="rounded-lg border border-green-500/30 px-3 py-2 text-sm text-green-400"
            >
              Save
            </button>

            <button
              onClick={() => {
                setTitle(currentChat?.title || "");
                setIsEditing(false);
              }}
              className="rounded-lg border border-white/20 px-3 py-2 text-sm "
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-white/20 px-3 py-2 text-sm"
            >
              Rename
            </button>

            <button
              onClick={() => {
                if (!currentChat) return;

                const confirmed =
                  window.confirm(
                    "Delete this chat?",
                  );

                if (confirmed) {
                  onDelete(currentChat.id);
                }
              }}
              className="rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-400"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default ChatHeader;
