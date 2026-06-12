import express from "express";
import useGraph from "./services/graph.ai.service.js";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/use-graph", async (req, res) => {
  try {
    const result = await useGraph("Write a factorial function in Javascript.");
    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default app;
