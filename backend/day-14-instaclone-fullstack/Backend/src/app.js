const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://siddhartha-instaclone.vercel.app",
    ],
  }),
);

/**
 * require routes
 */

const authRouter = require("./routes/auth.routes.js");
const postRouter = require("./routes/post.routes.js");
const userRouter = require("./routes/user.routes.js");

/**
 * use routes
 */
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("InstaClone Backend API is running successfully");
});
module.exports = app;
