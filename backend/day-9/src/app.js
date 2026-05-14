const express = require("express");
const authRouter = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

/**
 * /api/auth/register
 */

app.use("/api/auth", authRouter);
module.exports = app;
