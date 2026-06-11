import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import configConst from "../config/config.js";

export const GoogleModel = new ChatGoogle({
  model: "gemini-flask-latest",
  apiKey: configConst.GOOGLE_API_KEY,
});

export const MistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: configConst.MISTRAL_API_KEY,
});

export const CohereModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: configConst.COHERE_API_KEY,
});
