import "dotenv/config";

import {ChatOpenAI} from "@langchain/openai";
import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import {createReactAgent} from "@langchain/langgraph/prebuilt";
import {TavilySearch} from "@langchain/tavily";
import { MemorySaver } from "@langchain/langgraph";
import {HumanMessage} from "@langchain/core/messages";

const TAVILY_KEY = process.env.TAVILY_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const retriever = new TavilySearchAPIRetriever({
  k: 3,
  apiKey: TAVILY_KEY
});

const tools = new TavilySearch({
  maxResults: 1,
  tavilyApiKey:  TAVILY_KEY
})
const agentModel = new ChatOpenAI({ temperature: 0, model: "gpt-3.5-turbo", apiKey: OPENAI_API_KEY})

const res = await tools.invoke({
  query: "What is the capital of France?",
})
const agentCheckpointer = new MemorySaver();
const agent = createReactAgent({
  llm: agentModel,
  tools: [tools],
  checkpointSaver: agentCheckpointer
})


const agentFinalState = await agent.invoke(
  { messages: [new HumanMessage("what is the current weather in sf")] },
  { configurable: { thread_id: "42" } },
);


console.log(await agentFinalState.messages[agentFinalState.messages.length - 1].content)
const agentNextState = await agent.invoke(
  { messages: [new HumanMessage("what about ny")] },
  { configurable: { thread_id: "42" } },
);
console.log(
  agentNextState.messages[agentNextState.messages.length - 1].content,
);