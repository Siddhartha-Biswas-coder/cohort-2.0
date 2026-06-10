import { Search } from "lucide-react";
import React from "react";

const ChatSearch = ({ searchItem, setSearchItem }) => {
  return (
    <div className="relative mb-3 w-full">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 dark:text-white/40" />
      <input
        type="text"
        value={searchItem}
        onChange={(event) => setSearchItem(event.target.value)}
        placeholder="Search chats...."
        className="w-full rounded-full border border-zinc-200 dark:border-white/10 bg-transparent pl-9 pr-4 py-2 text-sm text-zinc-800 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-white/40 focus:border-zinc-300 dark:focus:border-white/20 transition-all"
      />
    </div>
  );
};

export default ChatSearch;
