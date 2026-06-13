import { Router } from "express";
import { runBattleController } from "../controllers/battle.controller.js";
const aiRouter = Router()

aiRouter.get("health", (req, res) => {
    res.json({ status: "Ok" })
})

aiRouter.post("/ai-battle", runBattleController)


export default aiRouter;