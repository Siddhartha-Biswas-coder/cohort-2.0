import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 px-2 py-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-white/60"></span>
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-white/60"
        style={{ animationDelay: "150ms" }}
      ></span>
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-white/60"
        style={{ animationDelay: "300ms" }}
      ></span>
    </div>
  );
};

export default TypingIndicator;
