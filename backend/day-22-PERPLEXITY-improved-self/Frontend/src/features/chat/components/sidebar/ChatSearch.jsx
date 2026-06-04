import React from "react";

const ChatSearch = ({ searchItem, setSearchItem }) => {
  return (
    <input
      type="text"
      value={searchItem}
      onChange={(event) => setSearchItem(event.target.value)}
      placeholder="Search chats...."
      className="mb-3 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/40"
    />
  );
};

export default ChatSearch;
