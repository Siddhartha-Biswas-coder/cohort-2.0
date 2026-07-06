import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from backend" });
});

app.get("/api/data", (req, res) => {
  const data = {
    id: 1,
    name: "Sample Data",
    description: "This is a simple data response from the API.",
  };
  res.status(200).json(data);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
