import { verifyAccessToken } from "../services/auth.service.js";

/**
 * Socket.io middleware to authenticate connections using cookie JWT
 * @param {Object} socket - Socket.io socket connection object
 * @param {function} next - Callback function to transition to connection handler or fail
 * @returns {void}
 */
export function socketAuth(socket, next) {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("Unauthorized"));
    }

    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((cookie) => {
        const [key, value] = cookie.trim().split("=");
        return [key, decodeURIComponent(value || "")];
      }),
    );

    const decoded = verifyAccessToken(cookies.token);

    socket.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
}
