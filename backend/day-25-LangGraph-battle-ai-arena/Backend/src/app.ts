import express from "express";
import cors from "cors"
import aiRouter from "./routes/ai.routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}))

app.use(express.json())


app.use("/api", aiRouter)


app.get("/health", (req, res) => {

    res.json({ status: "ok" })
})



export default app