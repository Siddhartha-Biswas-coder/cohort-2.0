import chatModel from "../models/chat.model.js";
import ApiError from "../errors/ApiError.js";

/**
 * Renames a chat by its ID after validating ownership and title validity
 * @param {Object} params - The parameters object
 * @param {string} params.chatId - The ID of the chat to rename
 * @param {string} params.title - The new title for the chat
 * @param {string} params.userId - The ID of the user owning the chat
 * @returns {Promise<Object>} - The updated chat document
 */
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
