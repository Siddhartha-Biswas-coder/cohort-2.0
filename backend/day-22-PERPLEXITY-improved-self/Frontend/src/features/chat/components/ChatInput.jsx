import React from "react";

const ChatInput = ({ chatInput, setChatInput, handleSubmitMessage }) => {
  return (
    <footer className="rounded-3xl w-full absolute bottom-2 border border-white/60 bg-[#080b12] p-4 md:p-5">
      <form
        onSubmit={handleSubmitMessage}
        className="flex flex-col gap-3 md:flex-row"
      >
        <input
          type="text"
          value={chatInput}
          onChange={(event) => setChatInput(event.target.value)}
          placeholder="Type your message..."
          className="w-full rounded-2xl border border-white/50 bg-transparent px-4 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90"
        />
        <button
          type="submit"
          disabled={!chatInput.trim()}
          className="rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </footer>
  );
};

export default ChatInput;
