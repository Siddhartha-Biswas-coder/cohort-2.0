import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogle } from "@langchain/google";
import { AIMessage, HumanMessage, SystemMessage } from "langchain";

const googleModel = new ChatGoogle({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  const newMessages = messages.map((msg) => {
    if (msg.role == "user") {
      return new HumanMessage(msg.content);
    } else {
      return new AIMessage(msg.content);
    }
  });

  const response = await googleModel.invoke(newMessages);

  return response.content;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(
      `You are a helpful assistant that generated concise and descriptive titles for chat conversations,
      
      
      User will provide you with the first message of a chat conversation, and you will generate a title that csptures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.`,
    ),

    new HumanMessage(`
      Generate a title for a chat conversation based on the following first message: 

      "${message}"
      `),
  ]);

  return response.content;
}
