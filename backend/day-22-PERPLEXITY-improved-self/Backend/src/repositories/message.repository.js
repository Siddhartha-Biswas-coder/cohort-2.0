import messageModel from "../models/message.model.js";

export async function createMessage({ chat, content, role, sources = [] }) {
  return await messageModel.create({ chat, content, role, sources });
}

export async function findMessagesByChatId(chatId) {
  return await messageModel.find({ chat: chatId }).sort({ createdAt: 1 });
}

export async function findLastMessage(chatId) {
  return await messageModel.findOne({ chat: chatId }).sort({ createdAt: -1 });
}

export async function deleteMessageById(messageId) {
  return await messageModel.findOneAndDelete({ _id: messageId });
}
