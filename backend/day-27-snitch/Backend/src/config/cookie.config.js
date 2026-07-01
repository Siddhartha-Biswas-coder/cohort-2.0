import config from "./config.js";

const cookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: config.COOKIE_MAX_AGE,
};

export default cookieOptions;
