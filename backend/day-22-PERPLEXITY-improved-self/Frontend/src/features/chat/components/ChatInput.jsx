import React, { useRef } from "react";
import { Search } from "lucide-react";

const ChatInput = ({ chatInput, setChatInput, handleSubmitMessage }) => {
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;

    setChatInput(value);

    const textarea = textareaRef.current;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (!chatInput.trim()) return;

      handleSubmitMessage(event);
    }
  };

  return (
    <footer className="absolute bottom-3 w-full">
      <form
        onSubmit={handleSubmitMessage}
        className="overflow-hidden rounded-3xl border border-white/10 bg-[#10131a]/95 backdrop-blur-xl"
      >
        {/* Input Area */}

        <div className="px-5 pt-4">
          <textarea
            ref={textareaRef}
            value={chatInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask anything..."
            className="w-full resize-none bg-transparent text-base text-white outline-none placeholder:text-white/35"
          />
        </div>

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
          <button
            type="button"
            className="
              flex items-center gap-2
              rounded-full 
              border border-white/10 
              px-4 py-2 
              text-sm text-white/80 
              transition 
              hover:border-white/20 
              hover:bg-white/5"
          >
            <Search size={15} />
            <span>Search</span>
          </button>

          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black font-bold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          >
            →
          </button>
        </div>
      </form>
    </footer>
  );
};

export default ChatInput;
