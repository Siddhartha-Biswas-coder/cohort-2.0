/**
 * Manages the mapping between user IDs and their socket connections, enabling
 * real-time communication with specific users.
 *
 * Simple Map registry that links userIds to their active socket.ids so controllers can map requests to socket streams.
 */

const userSockets = new Map();

/**
 * Registers a user's active socket ID mapping in the registry
 * @param {string} userId - The ID of the authenticated user
 * @param {string} socketId - The socket ID string
 * @returns {void}
 */
export function addUserSocket(userId, socketId) {
  userSockets.set(userId, socketId);
}

/**
 * Removes a user's socket mapping from the registry on disconnect
 * @param {string} userId - The ID of the disconnected user
 * @returns {boolean} - True if mapping existed and was deleted, false otherwise
 */
export function removeUserSocket(userId) {
  return userSockets.delete(userId);
}

/**
 * Retrieves the active socket ID mapped to a specific user
 * @param {string} userId - The ID of the user to look up
 * @returns {string|undefined} - The active socket ID, or undefined if not found
 */
export function getUserSocket(userId) {
  return userSockets.get(userId);
}
