import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Globe } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
      className={`group relative max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
        message.role === "user"
          ? "ml-auto rounded-br-none bg-white/12 text-white"
          : "mr-auto border-none text-white/90"
      }`}
    >
      {message.role === "user" ? (
        <p>{message.content}</p>
      ) : (
        <>
          <button
            className="absolute top-2 right-2 text-xs rounded-md px-2 py-1 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 "
            onClick={handleCopy}
          >
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>

          <div className="pr-16">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
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
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="rounded bg-white/10 px-1 py-0.5">
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
            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="mb-2 text-xs font-semibold text-white/50">
                Sources
              </p>

              <div className="grid gap-3 md:grid-cols-2">
                {message.sources.map((source) => {
                  const domain = new URL(source.url).hostname.replace(
                    "www.",
                    "",
                  );
                  return (
                    <a
                      href={source.url}
                      key={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-xl border border-white/10 bg-white/2 p-3 transition-all duration-200 hover:border-white/20 hover:bg-white/4"
                    >
                      <div className="flex items-start gap-3">
                        <Globe size={16} className="mt-1 text-white/60" />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {source.title}
                          </p>
                          <p className="mt-1 text-xs text-shite/50">{domain}</p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageBubble;
