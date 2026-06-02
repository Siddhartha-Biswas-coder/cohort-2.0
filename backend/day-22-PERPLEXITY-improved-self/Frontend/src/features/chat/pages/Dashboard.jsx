import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import remarkGfm from "remark-gfm";
import Sidebar from "../components/Sidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

const Dashboard = () => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  useEffect(() => {
    chat.intitailizeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmitMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = chatInput.trim();

    if (!trimmedMessage) {
      return;
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
    setChatInput("");
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };

  return (
    <main className="h-screen w-full flex bg-[#07090f] p-3 text-white md:p-5">
      <section className="mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1 border-none">
        <Sidebar chats={chats} openChat={openChat} />

        <section className="relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4">
        
          <ChatMessages chats={chats} currentChatId={currentChatId} />

          <ChatInput
            chatInput={chatInput}
            setChatInput={setChatInput}
            handleSubmitMessage={handleSubmitMessage}
          />
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
