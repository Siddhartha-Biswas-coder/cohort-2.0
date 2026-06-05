import { verifyAccessToken } from "../services/auth.service.js";

export function socketAuth(socket, next) {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("Unauthorized"));
    }

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key, value];
      }),
    );

    const decoded = verifyAccessToken(cookies.token);

    socket.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
}
