import chatModel from "../models/chat.model.js";

export async function findChatById(chatId, userId) {
  return await chatModel.findOne({ _id: chatId, user: userId });
}

export async function findChatByShareToken(token) {
  return await chatModel.findOne({ shareToken: token, isShared: true });
}

export async function findChatsByUserId(userId) {
  return await chatModel.find({ user: userId });
}

export async function createChat({ user, title }) {
  return await chatModel.create({ user, title });
}

export async function deleteChatById(chatId, userId) {
  return await chatModel.findOneAndDelete({ _id: chatId, user: userId });
}
