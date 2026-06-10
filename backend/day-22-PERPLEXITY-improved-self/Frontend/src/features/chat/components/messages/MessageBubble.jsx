import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SourceCard from "./SourceCard";
import MessageActions from "./MessageActions";
import { RefreshCcw } from "lucide-react";

const MessageBubble = ({ message, onRegenerateResponse}) => {
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
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`group relative max-w-[90%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base transition-colors duration-200 ${
        message.role === "user"
          ? "ml-auto rounded-br-none bg-zinc-200 dark:bg-white/12 text-zinc-900 dark:text-white"
          : "mr-auto border-none text-zinc-800 dark:text-white/90"
      }`}
    >
      {message.role === "user" ? (
        <p>{message.content}</p>
      ) : (
        <>
          <MessageActions copied={copied} onCopy={handleCopy} />

          <div className="pr-12 md:pr-32 last-p-inline-cursor ">
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
                    <code className="rounded-md bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-1.5 py-0.5 font-mono text-indigo-600 dark:text-indigo-300 text-sm">
                      {children}
                    </code>
                  );
                },
              }}
              remarkPlugins={[remarkGfm]}
            >
              {message.content.replace(/\n+$/, "")}
            </ReactMarkdown>

            {message.isStreaming && (
              <span className="ml-1 animate-pulse text-indigo-550 dark:text-indigo-400 inline-block align-middle">
                ▌
              </span>
            )}
          </div>

          {message.role === "ai" &&
            !message.isStreaming &&
            onRegenerateResponse && (
              <button
                onClick={() => onRegenerateResponse()}
                className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-white/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
              >
                <RefreshCcw size={12} />
                Regenerate
              </button>
            )}

          {message.sources?.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-white/40">
                Sources
              </p>

              <div className="grid gap-3 md:grid-cols-2">
                {message.sources.map((source, index) => (
                  <SourceCard
                    key={`${source.url} - ${index}`}
                    source={source}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default MessageBubble;
