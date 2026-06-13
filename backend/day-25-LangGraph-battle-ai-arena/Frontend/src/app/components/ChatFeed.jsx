import React, { useEffect, useRef } from 'react';
import UserMessage from './UserMessage';
import AIResponse from './AIResponse';

const ChatFeed = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col w-full">
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center mt-32 text-gray-400 dark:text-gray-500 transition-colors">
          <span className="material-symbols-outlined text-4xl mb-4 opacity-50">forum</span>
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">AetherChat Arena</h2>
          <p className="text-sm mt-2 text-center max-w-md">
            Enter a coding challenge below to see two AI models compete.
          </p>
        </div>
      )}

      {messages.map((msg, index) => {
        if (msg.role === 'user') {
          return <UserMessage key={index} content={msg.content} />;
        }
        return <AIResponse key={index} message={msg} />;
      })}

      {isLoading && (
        <div className="flex justify-start w-full mb-8 pt-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full shadow-sm transition-colors">
            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
            <span className="text-[13px] font-medium">Models are deliberating...</span>
          </div>
        </div>
      )}
      
      <div ref={endOfMessagesRef} className="h-4" />
    </div>
  );
};

export default ChatFeed;
