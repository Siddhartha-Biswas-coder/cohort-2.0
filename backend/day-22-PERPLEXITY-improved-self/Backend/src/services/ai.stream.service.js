/**
 * AI stream service for streaming AI responses to the client.
 *
 * Uses LangChain's model.stream() to stream tokens and sends each chunk to the client via the onChunk callback.
 */

import { AIMessage, HumanMessage, SystemMessage } from "langchain";

import { agent, mistralModel } from "./ai.service.js";

/**
 * Streams AI responses chunk by chunk to the client
 * @param {Object[]} messages - Array of messages
 * @param {string} systemPrompt - System prompt
 * @param {function} onChunk - Callback to send each chunk to the client
 * @returns {Promise<string>} - Full response from AI
 */
export async function streamResponse({ messages, systemPrompt, onChunk }) {
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

  const stream = await mistralModel.stream([
    new SystemMessage(systemPrompt), ...formattedMessages,
  ]);

  let fullResponse = "";

  for await (const chunk of stream) {

    // const content = chunk?.model_request?.messages?.[0]?.content;

    const content = chunk.content;

    if (!content) continue;

    fullResponse += content;

    onChunk(content);
  }
  return fullResponse;
}
