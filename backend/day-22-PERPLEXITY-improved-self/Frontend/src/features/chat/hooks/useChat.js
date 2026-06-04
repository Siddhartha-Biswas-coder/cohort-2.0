import { intitailizeSocketConnection } from "../service/chat.socket.js";
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
  updateChatTitle as renameChatReducer,
  deleteChat as deleteChatReducer,
} from "../chat.slice.js";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    try {
      dispatch(setLoading(true));

      const data = await sendMessage({ message, chatId });

      const { chat, aiMessage, sources } = data;

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
          chatId: chatId || chat._id,
          content: message,
          role: "user",
        }),
      );

      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          content: aiMessage.content,
          role: aiMessage.role,
          sources: aiMessage.sources || [],
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

  return {
    intitailizeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleRenameChat,
    handleDeleteChat,
  };
};
