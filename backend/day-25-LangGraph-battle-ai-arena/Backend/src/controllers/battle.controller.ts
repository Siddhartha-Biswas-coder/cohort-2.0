import runGraph from "../ai/graph.ai.js";
import { type Request, type Response } from "express";

export const runBattleController = async (req: Request, res: Response) => {
    try {
        const { problem } = req.body

        if (!problem || typeof problem !== "string") {
            return res.status(400).json({
                error: "A valid problem string is required"
            })
        }

        console.log(`Running battle for challenge: "${problem}"`)

        const result = await runGraph(problem)

        res.status(200).json({
            success: true,
            message: "Battle completed successfully",
            results: result
        })

    } catch (error) {
        console.error("Error in executing LangGraph:", error)
        res.status(500).json({
            error: "An error occured while executing the LangGraph battle",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}