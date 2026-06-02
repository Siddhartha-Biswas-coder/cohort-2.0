import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/auth/", authRouter);
app.use("/api/chats/", chatRouter);

app.use(errorHandler);

export default app;
