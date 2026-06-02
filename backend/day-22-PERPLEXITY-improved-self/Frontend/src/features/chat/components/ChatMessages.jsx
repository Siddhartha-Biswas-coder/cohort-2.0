import React from "react";
import MessageBubble from "./MessageBubble";
import EmptyState from "./EmptyState";

const ChatMessages = ({ chats, currentChatId, onSuggestionClick }) => {
  const messages = chats[currentChatId]?.messages || [];

  if (!messages.length) {
    return <EmptyState onSuggestionClick={ onSuggestionClick } />;
  }

  return (
    <div className="messages flex-1 apce-y-3 overflow-y-auto pr-1 pb-30">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;
