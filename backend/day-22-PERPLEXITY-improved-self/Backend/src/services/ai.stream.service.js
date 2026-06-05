import { AIMessage, HumanMessage, SystemMessage } from "langchain";

import { agent, mistralModel } from "./ai.service.js";

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
