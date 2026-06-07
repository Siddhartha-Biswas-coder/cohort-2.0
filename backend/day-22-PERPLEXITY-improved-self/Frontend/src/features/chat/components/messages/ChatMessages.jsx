import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import EmptyState from "../EmptyState";
import { useSelector } from "react-redux";
import TypingIndicator from "./TypingIndicator";

const ChatMessages = ({
  chats,
  currentChatId,
  onSuggestionClick,
  onRegenerateResponse,
}) => {
  const messages = chats[currentChatId]?.messages || [];

  const isThinking = useSelector((state) => state.chat.isThinking);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  if (!messages.length && !isThinking) {
    return <EmptyState onSuggestionClick={onSuggestionClick} />;
  }

  return (
    <div className="messages flex-1 space-y-3 overflow-y-auto pr-1 pb-44">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id || `${message.role}-${index}`}
          message={message}
          onRegenerateResponse={onRegenerateResponse}
        />
      ))}

      {isThinking && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
