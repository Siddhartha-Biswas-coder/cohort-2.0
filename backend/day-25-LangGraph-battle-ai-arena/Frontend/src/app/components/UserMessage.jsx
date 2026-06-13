import React from 'react';

const UserMessage = ({ content }) => {
  return (
    <div className="flex justify-end w-full mb-8 pt-4">
      <div className="max-w-[85%] bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-sm transition-colors">
        <p className="text-gray-900 dark:text-gray-100 text-[15px] leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
};

export default UserMessage;
