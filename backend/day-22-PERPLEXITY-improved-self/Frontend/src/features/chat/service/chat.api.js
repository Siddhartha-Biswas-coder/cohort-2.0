import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function sendMessage({ message, chatId, mode }) {
  const response = await api.post("/api/chats/message", {
    message,
    chat: chatId,
    mode,
  });
  return response.data;
}

export async function getChats() {
  const response = await api.get("/api/chats");
  return response.data;
}

export async function getMessages(chatId) {
  const response = await api.get(`/api/chats/${chatId}/messages`);
  return response.data;
}

export async function renameChat(chatId, title) {
  const response = await api.patch(`/api/chats/${chatId}`, { title });

  return response.data;
}

export async function deleteChat(chatId) {
  const response = await api.delete(`api/chats/delete/${chatId}`);
  return response.data;
}

export async function regenerateChat(chatId, mode) {
  const response = await api.post(`/api/chats/${chatId}/regenerate`, { mode });
  return response.data;
}

export async function pinChat(chatId) {
  const response = await api.patch(`/api/chats/${chatId}/pin`);

  return response.data;
}

export async function shareChat(chatId) {
  const response = await api.post(`/api/chats/${chatId}/share`);
  return response.data;
}

export async function getShareChat(token) {
  const response = await api.get(`/api/chats/share/${token}`);
  return response.data;
}
