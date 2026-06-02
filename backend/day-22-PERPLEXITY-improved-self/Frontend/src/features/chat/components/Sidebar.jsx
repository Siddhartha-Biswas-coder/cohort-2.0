import React from "react";

const Sidebar = ({ chats, openChat, handleNewChat, currentChatId }) => {
  return (
    <aside className="hidden h-full w-64 shrink-0 rounded-3xl border bg-[#080b12] p-4 md:flex md:flex-col">
      <h1 className="mb-5 text-3xl font-semibold tracking-tight">Perplexity</h1>

      <button
        onClick={handleNewChat}
        className="mb-4 rounded-xl border border-white/20 px-4 py-3"
      >
        + New Chat
      </button>

      <div className="space-y-2">
        {Object.values(chats).map((chat, index) => {
          return (
            <button
              onClick={() => {
                openChat(chat.id);
              }}
              key={chat.id}
              type="button"
              className={`w-full cursor-pointer rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white
                ${
                  currentChatId === chat.id 
                  ? "border-white bg-white/10 text-white" 
                  : "border-white/20 text-white/90 hover:border-white hover:text-white"
                }
                `}
            >
              {chat.title}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
