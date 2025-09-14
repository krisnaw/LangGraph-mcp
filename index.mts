import "dotenv/config";

import {ChatOpenAI} from "@langchain/openai";
import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import {createReactAgent} from "@langchain/langgraph/prebuilt";
import {TavilySearch} from "@langchain/tavily";
import { MemorySaver } from "@langchain/langgraph";
import {HumanMessage} from "@langchain/core/messages";
import { mcpClient } from "./lib/mcp-client.mjs";

const { client, mcpTools } = await mcpClient()

const TAVILY_KEY = process.env.TAVILY_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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

const firstState = await agent.invoke(
  { messages: [new HumanMessage("select * from public.profiles")] },
  { configurable: { thread_id: "41" } },
);

const firstResponse = firstState.messages[firstState.messages.length - 1].content;

const analysisPrompt = `Based on the previous query results, please analyze the data and provide insights. 
    Previous result: ${firstResponse}
    
    Please provide:
    1. Summary of the data structure
    2. Key observations
    3. Any patterns or trends you notice`;

const secondState = await agent.invoke(
  { messages: [new HumanMessage(analysisPrompt)] },
  { configurable: { thread_id: "41" } },
);

const secondResponse = secondState.messages[secondState.messages.length - 1].content;

const thirdState = await agent.invoke(
  { messages: [new HumanMessage("who is from ireland?")] },
  { configurable: { thread_id: "41" } },
);

const thirdResponse = thirdState.messages[thirdState.messages.length - 1].content;
console.log(thirdResponse);

