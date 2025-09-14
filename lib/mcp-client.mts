import "dotenv/config";
import { MultiServerMCPClient } from "@langchain/mcp-adapters";

const SUPABASE_TOKEN = process.env.SUPABASE_TOKEN;
const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID;


export const mcpClient = (async () => {

  let client : MultiServerMCPClient  | null = null;
  let mcpTools : any | null = null;

  try {
    client = new MultiServerMCPClient(
      {
        // Global tool configuration options
        // Whether to throw on errors if a tool fails to load (optional, default: true)
        throwOnLoadError: true,
        defaultToolTimeout: undefined,
        mcpServers: {
          supabase: {
            command: "npx",
            args: [
              "-y",
              "@supabase/mcp-server-supabase",
              "--read-only",
              `--project-ref=${SUPABASE_PROJECT_ID!}`
            ],
            env: {
              SUPABASE_ACCESS_TOKEN: SUPABASE_TOKEN!
            }
          }
        },
        outputHandling: undefined,
        useStandardContentBlocks: undefined,
        // Whether to prefix tool names with the server name (optional, default: false)
        prefixToolNameWithServerName: false,
        // Optional additional prefix for tool names (optional, default: "")
        additionalToolNamePrefix: ""
      }
    );
  } catch (error) {
    console.error(error);
    client = null;
    mcpTools = null;
    return { client, mcpTools };
  }

  if (client) {
    try {
      mcpTools = await client.getTools();

      console.log("mcpTools successfully loaded");
    } catch (error) {
      console.error(error);
      mcpTools = null;
    }
  }

  return { client, mcpTools };
})



