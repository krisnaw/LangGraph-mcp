import "dotenv/config";

import {ChatOpenAI} from "@langchain/openai";
import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import {createReactAgent} from "@langchain/langgraph/prebuilt";
import {TavilySearch} from "@langchain/tavily";
import { MemorySaver } from "@langchain/langgraph";
import {HumanMessage} from "@langchain/core/messages";
import { mcpClient } from "./lib/mcp-client.mjs";

const { client, mcpTools } = await mcpClient()

console.log(mcpTools);


const TAVILY_KEY = process.env.TAVILY_API_KEY;
const OPENAI_API_KEY = "process.env.OPENAI_API_KEY"


const tools = new TavilySearch({
  maxResults: 1,
  tavilyApiKey:  TAVILY_KEY
})
const agentModel = new ChatOpenAI({ temperature: 0, model: "gpt-3.5-turbo", apiKey: OPENAI_API_KEY})


const agentCheckpointer = new MemorySaver();
const agent = createReactAgent({
  llm: agentModel,
  tools: mcpTools,
  checkpointSaver: agentCheckpointer
})


const getnFirstState = await agent.invoke(
  { messages: [new HumanMessage("select * from public.profiles")] },
  { configurable: { thread_id: "41" } },
);


const agentNextState = await agent.invoke(
  { messages: [new HumanMessage("select * from public.profiles")] },
  { configurable: { thread_id: "41" } },
);





// const agentNextState = await agent.invoke(
//   { messages: [new HumanMessage("what about ny")] },
//   { configurable: { thread_id: "42" } },
// );
// console.log(
//   agentNextState.messages[agentNextState.messages.length - 1].content,
// );