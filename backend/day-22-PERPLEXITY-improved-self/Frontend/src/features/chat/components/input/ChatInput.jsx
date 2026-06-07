import React, { useRef } from "react";
import { Square } from "lucide-react";
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

  const isStreaming =
    chats[currentChatId]?.messages.some((message) => message.isStreaming) ||
    false;

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
        className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0f1522]/95 backdrop-blur-xl shadow-exl transition-all"
      >
        {/* Input Area */}

        <div className="px-6 pt-5">
          <textarea
            ref={textareaRef}
            value={chatInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask anything, research a topic or explore an idea..."
            className="w-full resize-none bg-transparent text-base leading-7 text-white outline-none placeholder:text-white/35"
          />
        </div>

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between border-t border-white/5 px-5 py-4">
          <InputModes />

          {isThinking || isStreaming ? (
            <button
              type="button"
              onClick={() => onStopGenerating()}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition-all"
            >
              <Square size={16} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black font-bold transition-all hover:scale-105 
            active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              →
            </button>
          )}
        </div>
      </form>
    </footer>
  );
};

export default ChatInput;
