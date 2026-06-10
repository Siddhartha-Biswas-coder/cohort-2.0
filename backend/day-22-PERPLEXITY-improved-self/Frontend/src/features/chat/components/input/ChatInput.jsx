import React, { useRef, useState } from "react";
import { Square, ArrowUp } from "lucide-react";
import InputModes from "./InputModes";
import { useDispatch, useSelector } from "react-redux";

const ChatInput = ({
  chatInput,
  setChatInput,
  handleSubmitMessage,
  onStopGenerating,
}) => {
  const dispatch = useDispatch();
  const isThinking = useSelector((state) => state.chat.isThinking);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const chats = useSelector((state) => state.chat.chats);

  const activeChat = chats[currentChatId];
  const isStreaming =
    activeChat?.messages?.some((message) => message.isStreaming) || false;
  const hasMessages = activeChat?.messages?.length > 0;

  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

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
    <footer className="absolute bottom-3 w-full px-1">
      <form
        onSubmit={handleSubmitMessage}
        className={`overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
          isFocused
            ? "border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.08)] ring-1 ring-indigo-500/10 bg-white dark:bg-[#070709]/98"
            : "border-zinc-200 dark:border-white/5 bg-zinc-100/80 dark:bg-[#121215]/90 shadow-md dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        }`}
      >
        {/* Input Area */}
        <div className="px-6 pt-5">
          <textarea
            ref={textareaRef}
            value={chatInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={1}
            placeholder={
              hasMessages
                ? "Ask a follow-up..."
                : "Ask anything, research a topic or explore an idea..."
            }
            className="w-full resize-none bg-transparent text-base leading-7 text-zinc-800 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-white/30 scrollbar-none"
          />
        </div>

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-white/5 px-5 py-3.5">
          <InputModes />

          {isThinking || isStreaming ? (
            <button
              type="button"
              onClick={() => onStopGenerating()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all cursor-pointer"
            >
              <Square size={14} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-indigo-500 to-violet-500 text-white transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </form>
    </footer>
  );
};

export default ChatInput;
