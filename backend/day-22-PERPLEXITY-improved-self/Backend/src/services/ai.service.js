import { ChatMistralAI } from "@langchain/mistralai";
import {
  AIMessage,
  createAgent,
  HumanMessage,
  SystemMessage,
  tool,
} from "langchain";
import * as z from "zod";
import env from "../config/env.js";
import { searchInternet } from "./internet.service.js";

export const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: env.MISTRAL_API_KEY,
});

export const SEARCH_PROMPT = `
You are a helpful AI search assistant.

When answering:

- Give concise answers.
- Be direct.
- Use bullet points when helpful.
- Keep responses relatively short.
- Do NOT include a Sources section.
- Sources are shown separately by the application.
`;

export const RESEARCH_PROMPT = `
You are an advanced AI research assistant.

When answering:

- Produce a structured report.
- Use markdown headings.
- Explain topics in depth.
- Include:
  Overview
  Key Findings
  Analysis
  Conclusion

- Use information from tools whenever possible.
- Do NOT include a Sources section.
- Sources are shown separately by the application.
`;

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description: "Use this tool to get the latest information from the internet",
  schema: z.object({
    query: z.string().describe("The search query to look up on the internet"),
  }),
});

export const agent = createAgent({
  model: mistralModel,
  tools: [searchInternetTool],
});

/**
 * Generates a full AI response along with retrieved search sources
 * @param {Object[]} messages - Array of messages representing chat history
 * @param {string} [mode="search"] - Search mode ("search" or "research")
 * @returns {Promise<{ content: string, sources: Object[] }>} - The generated AI message content and search sources
 */
export async function generateResponse(messages, mode = "search") {
  const formattedMessages = messages
    .map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      }
      if (msg.role === "ai") {
        return new AIMessage(msg.content);
      }
      return null;
    })
    .filter(Boolean);

  const SYSTEM_PROMPT = mode === "search" ? SEARCH_PROMPT : RESEARCH_PROMPT;

  const response = await agent.invoke({
    messages: [new SystemMessage(SYSTEM_PROMPT), ...formattedMessages],
  });

  const finalMessage = response.messages[response.messages.length - 1];

  const toolMessage = response.messages.find((msg) => msg.type === "tool");

  let sources = [];

  if (toolMessage) {
    const searchData = JSON.parse(toolMessage.content);

    sources = searchData.results.map((result) => ({
      title: result.title,
      url: result.url,
    }));
  }

  return {
    content: finalMessage.content,
    sources,
  };
}

/**
 * Generates a concise title for a chat conversation based on the first message
 * @param {string} message - The first user message in the chat
 * @returns {Promise<string>} - The generated 2-4 word chat title
 */
export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(
      `You are a helpful assistant that generated concise and descriptive titles for chat conversations,
      
      
      User will provide you with the first message of a chat conversation, and you will generate a title that csptures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.
      `,
    ),

    new HumanMessage(`
      Generate a title for a chat conversation based on the following first message: 

      "${message}"
      `),
  ]);

  return response.content.replace(/^"|"$/g, "").trim();
}
