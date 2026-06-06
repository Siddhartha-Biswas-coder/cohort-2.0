/**
 * Binds socket events to Redux dispatchers (passing the payload containing the specific chatId and chunk).
 */

import {
  emitTestStream,
  intitalizeSocketConnection,
  registerSocketEvents,
} from "../service/chat.socket.js";
import {
  sendMessage,
  getChats,
  getMessages,
  renameChat as renameChatApi,
  deleteChat as deleteChatApi,
} from "../service/chat.api.js";
import {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessages,
  appendToLastMessage,
  createStreamingMessage,
  updateChatTitle as renameChatReducer,
  deleteChat as deleteChatReducer,
} from "../chat.slice.js";
import { useDispatch, useSelector } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  const currentChatId = useSelector((state) => state.chat.currentChatId);

  async function handleSendMessage({ message, chatId, mode }) {
    try {
      dispatch(setLoading(true));

      const data = await sendMessage({ message, chatId, mode });

      const { chat, userMessage } = data;

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

  function intitalizeStreamingListeners() {
    registerSocketEvents({
      onStreamStart: (data) => {
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
  };
};
