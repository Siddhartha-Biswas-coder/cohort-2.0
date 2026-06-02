import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const MessageBubble = ({ message }) => {
  return (
    <div
      className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
        message.role === "user"
          ? "ml-auto rounded-br-none bg-white/12 text-white"
          : "mr-auto border-none text-white/90"
      }`}
    >
      {message.role === "user" ? (
        <p>{message.content}</p>
      ) : (
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => (
              <ul className="mb-2 list-disc pl-5">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-2 list-decimal pl-5">{children}</ol>
            ),
            code: ({ children }) => (
              <code className="rounded bg-white/10 px-1 py-0.5">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">
                {children}
              </pre>
            ),
          }}
          remarkPlugins={[remarkGfm]}
        >
          {message.content}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default MessageBubble;
