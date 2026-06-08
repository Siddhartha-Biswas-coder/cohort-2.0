import React, { useEffect, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { shareChat } from "../../service/chat.api";

const ShareModal = ({ isOpen, onClose, chatId }) => {
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && chatId) {
      const getOrGenerateLink = async () => {
        setLoading(true);
        setError("");
        try {
          const res = await shareChat(chatId);
          if (res.success && res.data?.shareToken) {
            const link = `${window.location.origin}/share/${res.data?.shareToken}`;
            setShareLink(link);
          } else {
            setError("Failed to retrieve share token");
          }
        } catch (error) {
          setError(
            error.message || "Something went wrong generating share link",
          );
        } finally {
          setLoading(false);
        }
      };

      getOrGenerateLink();
    }
  }, [isOpen, chatId]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0c0f17] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/40 transition hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-white">Share Chat</h3>
        <p className="mb-4 text-xs text-white/50 leading-relaxed">
          Anyone with this link will be able to view this conversation in a
          read-only format. No account or login required.
        </p>

        {/* Content */}
        {loading ? (
          <div className="flex h-12 items-center justify-center text-sm text-cyan-400">
            Generating share Link...
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-500/10 p-3 text-xs text-red-400">
            {error}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2 border border-white/10">
            <input
              type="text"
              readOnly
              value={shareLink}
              className="min-w-0 flex-1 bg-transparent px-2 text-xs font-mono text-cyan-300 outline-none"
              onClick={(e) => e.target.select()}
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                copied
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-cyan-500 text-black hover:bg-cyan-400"
              }`}
            >
              {copied ? (
                <>
                  <Check size={12} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy Link
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
