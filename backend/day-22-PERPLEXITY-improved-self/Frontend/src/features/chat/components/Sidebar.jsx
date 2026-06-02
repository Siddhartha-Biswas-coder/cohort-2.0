import React from "react";

const sidebar = ({ chats, openChat }) => {
  return (
    <aside className="hidden h-full w-72 shrink-0 rounded-3xl border bg-[#080b12] p-4 md:flex md:flex-col">
      <h1 className="mb-5 text-3xl font-semibold tracking-tight">Perplexity</h1>

      <div className="space-y-2">
        {Object.values(chats).map((chat, index) => {
          return (
            <button
              onClick={() => {
                openChat(chat.id);
              }}
              key={index}
              type="button"
              className="w-full cursor-pointer rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white"
            >
              {chat.title}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default sidebar;
