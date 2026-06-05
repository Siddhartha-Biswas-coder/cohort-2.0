import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    mode: "search",
    currentChatId: null,
    isLoading: false,
    error: null,
  },

  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      state.chats[chatId] = {
        id: chatId,
        title,
        messages: [],
        lastUpdated: new Date().toISOString(),
      };
    },
    addNewMessage: (state, action) => {
      const { chatId, content, role, sources = [] } = action.payload;
      if (!state.chats[chatId]) return;
      state.chats[chatId].messages.push({ content, role, sources });
    },
    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      if (!state.chats[chatId]) return;
      state.chats[chatId].messages.push(...messages);
    },
    updateChatTitle: (state, action) => {
      const { chatId, title } = action.payload;

      if (state.chats[chatId]) {
        state.chats[chatId].title = title;
      }
    },
    deleteChat: (state, action) => {
      const chatId = action.payload;

      delete state.chats[chatId];

      if (state.currentChatId === chatId) {
        state.currentChatId = null;
        localStorage.removeItem("currentChatId");
      }
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    appendToLastMessage: (state, action) => {
      const currentChat = state.chats[state.currentChatId];

      if (!currentChat) return;

      const lastMessage = currentChat.messages[currentChat.messages.length - 1];

      if (!lastMessage) return;

      lastMessage.content += action.payload;
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  setMode,
  createNewChat,
  addNewMessage,
  addMessages,
  updateChatTitle,
  deleteChat,
  appendToLastMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
