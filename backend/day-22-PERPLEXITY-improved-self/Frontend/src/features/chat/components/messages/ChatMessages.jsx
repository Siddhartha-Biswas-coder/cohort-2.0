import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import EmptyState from "../EmptyState";
import { useSelector } from "react-redux";
import TypingIndicator from "./TypingIndicator";

const ChatMessages = ({ chats, currentChatId, onSuggestionClick }) => {
  const messages = chats[currentChatId]?.messages || [];

  const isLoading = useSelector((state) => state.chat.isLoading);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  if (!messages.length) {
    return <EmptyState onSuggestionClick={onSuggestionClick} />;
  }

  return (
    <div className="messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
