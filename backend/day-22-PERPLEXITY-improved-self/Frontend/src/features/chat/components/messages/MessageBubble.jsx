import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Globe } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SourceCard from "./SourceCard";
import MessageActions from "./MessageActions";

const MessageBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text", error);
    }
  };

  return (
    <div
      className={`group relative max-w-[90%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
        message.role === "user"
          ? "ml-auto rounded-br-none bg-white/12 text-white"
          : "mr-auto border-none text-white/90"
      }`}
    >
      {message.role === "user" ? (
        <p>{message.content}</p>
      ) : (
        <>
          <MessageActions copied={copied} onCopy={handleCopy} />

          <div className="pr-32">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-4 leading-7 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-2 list-disc pl-5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-2 list-decimal pl-5">{children}</ol>
                ),
                code: ({ className, children }) => {
                  const match = /language-(\w+)/.exec(className || "");

                  return match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        borderRadius: "16px",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="rounded-2xl overflow-hidden bg-white/10 px-1 py-0.5">
                      {children}
                    </code>
                  );
                },
              }}
              remarkPlugins={[remarkGfm]}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {message.sources?.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                Sources
              </p>

              <div className="grid gap-3 md:grid-cols-2">
                {message.sources.map((source) => (
                  <SourceCard key={source.url} source={source} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageBubble;
