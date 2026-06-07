/**
 * Binds socket events to Redux dispatchers (passing the payload containing the specific chatId and chunk).
 */

import {
  emitTestStream,
  getSocket,
  intitalizeSocketConnection,
  registerSocketEvents,
} from "../service/chat.socket.js";
import {
  sendMessage,
  getChats,
  getMessages,
  renameChat as renameChatApi,
  deleteChat as deleteChatApi,
  regenerateChat,
  pinChat,
  shareChat,
  getShareChat,
} from "../service/chat.api.js";
import {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  setMode,
  setThinking,
  createNewChat,
  addNewMessage,
  addMessages,
  updateChatTitle as renameChatReducer,
  deleteChat as deleteChatReducer,
  appendToLastMessage,
  createStreamingMessage,
  finishStreamingMessage,
  togglePinChatLocal,
  deleteLastAiMessage,
  stopStreaming,
} from "../chat.slice.js";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId, mode }) {
    try {
      dispatch(setLoading(true));
      dispatch(setThinking(true));

      const data = await sendMessage({ message, chatId, mode });

      const { chat } = data;

      const activeChatId = chatId || chat._id;

      if (!chatId) {
        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          }),
        );

        dispatch(setCurrentChatId(chat._id));

        localStorage.setItem("currentChatId", chat._id);
      }

      dispatch(
        addNewMessage({
          chatId: activeChatId,
          content: message,
          role: "user",
        }),
      );
    } catch (error) {
      dispatch(setThinking(false));
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetChats() {
    try {
      dispatch(setLoading(true));
      const data = await getChats();
      const { data: chats } = data;

      const formattedChats = chats.reduce((acc, chat) => {
        acc[chat._id] = {
          id: chat._id,
          title: chat.title,
          messages: [],
          lastUpdated: chat.updatedAt,
          isPinned: chat.isPinned || false,
          isShared : chat.isShared || false,
          shareToken : chat.shareToken || null
        };
        return acc;
      }, {});

      dispatch(setChats(formattedChats));
      const savedChatId = localStorage.getItem("currentChatId");

      if (savedChatId && formattedChats[savedChatId]) {
        dispatch(setCurrentChatId(savedChatId));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleOpenChat(chatId, chats) {
    try {
      dispatch(setLoading(true));

      if (chats[chatId]?.messages.length === 0) {
        const data = await getMessages(chatId);
        const { data: messages } = data;

        const formattedMessags = messages.map((msg) => ({
          id: msg._id,
          content: msg.content,
          role: msg.role,
          sources: msg.sources || [],
        }));

        dispatch(
          addMessages({
            chatId,
            messages: formattedMessags,
          }),
        );
      }

      dispatch(setCurrentChatId(chatId));

      localStorage.setItem("currentChatId", chatId);
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleRenameChat(chatId, title) {
    try {
      dispatch(setLoading(true));

      await renameChatApi(chatId, title);

      dispatch(
        renameChatReducer({
          chatId,
          title,
        }),
      );
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleDeleteChat(chatId) {
    try {
      dispatch(setLoading(true));

      await deleteChatApi(chatId);

      dispatch(deleteChatReducer(chatId));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleRegenerateResponse(chatId, mode) {
    try {
      dispatch(setThinking(true));
      dispatch(deleteLastAiMessage(chatId));

      await regenerateChat(chatId, mode);
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setThinking(false));
    }
  }

  function handleStopGenerating(chatId) {
    const socket = getSocket();
    if (socket) {
      socket.emit("ai-stream-abort");
      dispatch(stopStreaming(chatId));
    }
  }

  async function handleTogglePinChat(chatId) {
    try {
      await pinChat(chatId);
      dispatch(togglePinChatLocal(chatId));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }

  function intitalizeStreamingListeners() {
    registerSocketEvents({
      onStreamStart: (data) => {
        dispatch(setThinking(false));
        console.log("Stream Started:", data);
        const chatId = data?.chatId;
        if (chatId) {
          dispatch(createStreamingMessage(chatId));
        }
      },

      onStreamChunk: (data) => {
        const chatId = data?.chatId;
        const chunk = data?.chunk;
        if (chatId && chunk !== undefined) {
          dispatch(appendToLastMessage({ chatId, chunk }));
        }
      },

      onStreamEnd: (data) => {
        console.log("Stream Ended:", data);

        const chatId = data?.chatId;
        const sources = data?.sources;

        if (chatId) {
          dispatch(finishStreamingMessage({ chatId, sources }));
        }
      },
    });

    // emitTestStream();
  }

  return {
    intitalizeSocketConnection,
    intitalizeStreamingListeners,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleRenameChat,
    handleDeleteChat,
    emitTestStream,
    handleRegenerateResponse,
    handleStopGenerating,
    handleTogglePinChat,
  };
};
