import React, { useState } from 'react';

const InputBar = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage(''); // clear after sending
    }
  };

  return (
    <div className="fixed bottom-0 w-full bg-white dark:bg-[#030712] border-t border-gray-200 dark:border-gray-800 py-4 px-4 z-50 transition-colors">
      <div className="max-w-200 mx-auto">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2 focus-within:border-gray-400 dark:focus-within:border-gray-500 focus-within:bg-white dark:focus-within:bg-gray-800 transition-colors shadow-sm"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your coding challenge..."
            disabled={isLoading}
            className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-0 text-base px-3"
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="ml-2 flex items-center justify-center w-10 h-10 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {isLoading ? (
              <span className="material-symbols-outlined text-sm animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined text-sm">send</span>
            )}
          </button>
        </form>
        <div className="text-center mt-2">
          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">AI MAY PRODUCE INACCURATE INFORMATION</span>
        </div>
      </div>
    </div>
  );
};

export default InputBar;
