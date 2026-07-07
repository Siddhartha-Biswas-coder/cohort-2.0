import express from "express";

const app = express();

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

app.get("/api/users",(req,res)=>{
  res.status(200).json([
    {
      id:1,
      name:"Siddharth"
    },
    {
      id:2,
      name:"Vishwakarma"
    }
  ])
})

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});


export default app;
