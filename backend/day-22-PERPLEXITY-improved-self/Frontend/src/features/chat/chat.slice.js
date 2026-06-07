/**
 * Contains the Redux state slices that handle streaming updates:
  createStreamingMessage: Pushes a blank AI response object onto the active chat's message list.
  appendToLastMessage: Appends new text chunks to that AI response object.
 */

import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    mode: "search",
    currentChatId: null,
    isLoading: false,
    isThinking: false,
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
    setThinking: (state, action) => {
      state.isThinking = action.payload;
    },
    appendToLastMessage: (state, action) => {
      const { chatId, chunk } = action.payload;
      const chat = state.chats[chatId];

      if (!chat) return;

      if (!chat.messages.length) return;

      const lastMessage = chat.messages[chat.messages.length - 1];

      if (!lastMessage) return;

      if (lastMessage.role !== "ai") {
        return;
      }

      lastMessage.content += chunk;
    },
    createStreamingMessage: (state, action) => {
      const chatId = action.payload;

      if (!state.chats[chatId]) return;

      state.chats[chatId].messages.push({
        role: "ai",
        content: "",
        sources: [],
        isStreaming: true,
      });
    },
    finishStreamingMessage: (state, action) => {
      const { chatId, sources = [] } =
        typeof action.payload === "string"
          ? { chatId: action.payload }
          : action.payload;

      const chat = state.chats[chatId];

      if (!chat) return;

      const lastMessage = chat.messages[chat.messages.length - 1];

      if (!lastMessage || lastMessage.role !== "ai") return;

      lastMessage.isStreaming = false;
      lastMessage.sources = sources;
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  setMode,
  setThinking,
  createNewChat,
  addNewMessage,
  addMessages,
  updateChatTitle,
  deleteChat,
  appendToLastMessage,
  createStreamingMessage,
  finishStreamingMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
