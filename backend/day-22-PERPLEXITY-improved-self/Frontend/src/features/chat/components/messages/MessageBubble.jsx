import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

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
                    <code className="rounded-md bg-white/5 border border-white/10 px-1.5 py-0.5 font-mono text-cyan-300 text-sm">
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
              <span className="ml-1 animate-pulse text-cyan-400 inline-block align-middle">
                ▌
              </span>
            )}
          </div>

          {message.sources?.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
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
