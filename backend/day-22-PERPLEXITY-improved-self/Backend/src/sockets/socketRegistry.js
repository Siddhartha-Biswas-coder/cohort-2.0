const userSockets = new Map();

export function addUserSocket(userId, socketId) {
  userSockets.set(userId, socketId);
}

export function removeUserSocket(userId) {
  userSockets.delete(userId);
}

export function getUserSocket(userId) {
  return userSockets.get(userId);
}
