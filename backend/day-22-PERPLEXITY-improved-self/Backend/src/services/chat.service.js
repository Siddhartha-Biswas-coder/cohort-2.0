import chatModel from "../models/chat.model.js";
import ApiError from "../errors/ApiError.js";

export async function renameChatById({ chatId, title, userId }) {
  const chat = await chatModel.findOne({
    _id: chatId,
    user: userId,
  });

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  if (!title?.trim()) {
    throw new ApiError(400, "Chat title is required");
  }

  chat.title = title;

  await chat.save();

  return chat;
}
