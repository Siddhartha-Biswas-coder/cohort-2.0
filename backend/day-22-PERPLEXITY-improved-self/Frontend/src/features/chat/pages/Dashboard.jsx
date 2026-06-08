/**
 * Dashboard page for the AI assistant application
 * Contains the chat interface with sidebar, messages, and input components
 */

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

import Sidebar from "../components/sidebar/Sidebar";
import ChatMessages from "../components/messages/ChatMessages";
import ChatInput from "../components/input/ChatInput";
import ChatHeader from "../components/header/ChatHeader";
ChatHeader;
import { setCurrentChatId } from "../chat.slice";
import ShareModal from "../components/messages/ShareModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareTargetChatId, setShareTargetChatId] = useState(null);

  const chats = useSelector((state) => state.chat.chats);
  const mode = useSelector((state) => state.chat.mode);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  const handleRenameChat = async (chatId, title) => {
    if (!chatId) return;

    await chat.handleRenameChat(chatId, title);
  };

  const handleDeleteChat = async (chatId) => {
    await chat.handleDeleteChat(chatId);
  };

  const handleNewChat = () => {
    localStorage.removeItem("currentChatId");

    dispatch(setCurrentChatId(null));
    setChatInput("");
  };

  useEffect(() => {
    chat.intitalizeSocketConnection();
    chat.handleGetChats();
    chat.intitalizeStreamingListeners();
  }, []);

  useEffect(() => {
    if (currentChatId && chats[currentChatId]) {
      chat.handleOpenChat(currentChatId, chats);
    }
  }, [currentChatId]);

  const handleRegenerateResponse = async () => {
    await chat.handleRegenerateResponse(currentChatId, mode);
  };

  const handleStopGenerating = () => {
    chat.handleStopGenerating(currentChatId);
  };

  const handlePinChat = async (chatId) => {
    await chat.handleTogglePinChat(chatId);
  };

  const handleOpenShareModal = (chatId) => {
    setShareTargetChatId(chatId);
    setIsShareModalOpen(true);
  };

  const handleSubmitMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = chatInput.trim();

    if (!trimmedMessage) {
      return;
    }

    chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId,
      mode,
    });
    setChatInput("");
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };

  const currentChat = chats[currentChatId];

  return (
    <main className="h-screen w-full flex bg-[#07090f] p-3 text-white md:p-5">
      <section className="mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1 border-none">
        <Sidebar
          chats={chats}
          openChat={openChat}
          handleNewChat={handleNewChat}
          currentChatId={currentChatId}
          onRename={handleRenameChat}
          onDelete={handleDeleteChat}
          onPin={handlePinChat}
          onShare={handleOpenShareModal}
        />

        <section className="relative mx-auto flex h-full max-w-4xl min-w-0 flex-1 flex-col gap-4">
          <ChatHeader
            currentChat={currentChat}
            onShare={() => handleOpenShareModal(currentChatId)}
          />

          <ChatMessages
            chats={chats}
            currentChatId={currentChatId}
            onSuggestionClick={(text) => setChatInput(text)}
            onRegenerateResponse={handleRegenerateResponse}
          />

          <ChatInput
            chatInput={chatInput}
            setChatInput={setChatInput}
            handleSubmitMessage={handleSubmitMessage}
            onStopGenerating={handleStopGenerating}
          />
        </section>
      </section>

      <ShareModal
        chatId={shareTargetChatId}
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setShareTargetChatId(null);
        }}
      />
    </main>
  );
};

export default Dashboard;
