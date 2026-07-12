import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/api/health", (req, res) => {
  res.status(200).json({ msg: "success" });
});

app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "bob" },
    { id: 3, name: "charlie" },
  ];
  res.status(200).json({ users });
});

app.get("*name", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

app.get("/api/hello", (req, res) => {
  res.status(200).json({ msg: "Hello" });
});

export default app;
