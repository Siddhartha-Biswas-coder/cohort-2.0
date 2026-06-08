import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import MessageBubble from "../components/messages/MessageBubble.jsx";
import { getShareChat } from "../service/chat.api";

const SharedChatView = () => {
  const { token } = useParams();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedChat = async () => {
      try {
        setloading(true);
        const res = await getShareChat(token);
        if (res.success && res.data) {
          setChat(res.data.chat);
          setMessages(res.data.messages);
        } else {
          setError("This shared chat could not be retrieved");
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Shared chat not found or link has expired.",
        );
      } finally {
        setloading(false);
      }
    };
    if (token) {
      fetchSharedChat();
    }
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-[#07090f] text-white flex flex-col">
      <header className="border-b border-white/10 bg-[#07090f]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg tracking-tight bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Perplexity Clone
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-medium text-white/50">
              Shared Thread
            </span>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-semibold text-black hover:bg-cyan-400 transition cursor-pointer"
          >
            Start your own thread
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 flex flex-col">
        {loading ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            <p className="text-sm text-white/50">
              Loading shared conversation...
            </p>
          </div>
        ) : error ? (
          <div>
            <p className="text-red-400 font-medium">{error}</p>
            <Link to="/" className="text-xs text-cyan-400 hover:underline">
              Go to Home Page
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Title Display */}
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 border-b border-white/5 pb-4">
              {chat?.title}
            </h1>

            {/* Messages Feed */}
            <div className="space-y-6">
              {messages.map((message, index) => (
                <MessageBubble key={message._id || index} message={message} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SharedChatView;
