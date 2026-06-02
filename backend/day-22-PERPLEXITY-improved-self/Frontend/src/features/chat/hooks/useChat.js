import { intitailizeSocketConnection } from "../service/chat.socket.js";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api.js";
import {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessages,
} from "../chat.slice.js";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true));
    const data = await sendMessage({ message, chatId });
    const { chat, aiMessage } = data;

    if (!chatId) {
      dispatch(
        createNewChat({
          chatId: chat._id,
          title: chat.title,
        }),
      );

      dispatch(setCurrentChatId(chat._id));
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
      }),
    );
    dispatch(setLoading(false));
  }

  async function handleGetChats() {
    dispatch(setLoading(true));
    const data = await getChats();
    const { chats } = data;
    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setLoading(false));
  }

  async function handleOpenChat(chatId, chats) {
    if (chats[chatId]?.messages.length === 0) {
      const data = await getMessages(chatId);
      const { messages } = data;

      const formattedMessags = messages.map((msg) => ({
        id: msg._id,
        content: msg.content,
        role: msg.role,
      }));

      dispatch(
        addMessages({
          chatId,
          messages: formattedMessags,
        }),
      );
    }

    dispatch(setCurrentChatId(chatId));
  }

  return {
    intitailizeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
  };
};
