import React from "react";

const EmptySearch = ({ searchTerm }) => {
  return (
    <div className="py-8 text-center">
      <p className="text-sm text-white/60">No chats found</p>

      <p className="mt-1 text-xs text-white/40">"{searchTerm}"</p>
    </div>
  );
};

export default EmptySearch;
