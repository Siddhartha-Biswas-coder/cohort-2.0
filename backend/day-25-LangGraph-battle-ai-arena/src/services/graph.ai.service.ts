import { HumanMessage } from "@langchain/core/messages";
import {
  StateSchema,
  MessagesValue,
  ReducedValue,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";
import { MistralModel, CohereModel, GoogleModel } from "./models.service.js";
import { createAgent, providerStrategy } from "langchain";
import { z } from "zod";

const State = new StateSchema({
  messages: MessagesValue,
  solution_1: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => {
      return next;
    },
  }),
  solution_2: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => {
      return next;
    },
  }),
  judge_recommendation: new ReducedValue(
    z
      .object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
      })
      .default({ solution_1_score: 0, solution_2_score: 0 }),
    {
      reducer: (current, next) => {
        return next;
      },
    },
  ),
});

const solutionNode: typeof State.Node = async (state) => {
  const firstMessage = state.messages[0];
  if (!firstMessage) {
    throw new Error("No messages found in state");
  }

  const query =
    typeof firstMessage.content === "string"
      ? firstMessage.content
      : JSON.stringify(firstMessage.content);

  const [mistral_solution, cohere_solution] = await Promise.all([
    MistralModel.invoke(query),
    CohereModel.invoke(query),
  ]);

  return {
    solution_1:
      typeof mistral_solution.content === "string"
        ? mistral_solution.content
        : JSON.stringify(mistral_solution.content),
    solution_2:
      typeof cohere_solution.content === "string"
        ? cohere_solution.content
        : JSON.stringify(cohere_solution.content),
  };
};

const judgeNode: typeof State.Node = async (state) => {
  const { solution_1, solution_2 } = state;

  const judge = createAgent({
    model: GoogleModel,
    tools: [],
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
      }),
    ),
  });

  const judgeResponse = await judge.invoke({
    messages: [
      new HumanMessage(
        `You are a judge tasked with evaluating the quality of two solutions to a problem. The problem is: ${state.messages[0]?.text}. The first solution is: ${solution_1}. The second solution is: ${solution_2}. Provide your scores between 0 to 10 for both solutions, where 0 means the solution is perfect and fully addresses the problem.`,
      ),
    ],
  });

  const result = judgeResponse.structuredResponse;

  return {
    judge_recommendation: result,
  };
};

const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

export default async function (userMessage: string) {
  const result = await graph.invoke({
    messages: [new HumanMessage(userMessage)],
  });

  console.log(result);

  return result.messages;
}
