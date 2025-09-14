# Langi - LangGraph Prompt Chain Examples

A demonstration application showcasing a simple prompt chain pattern using LangGraph, OpenAI, and Supabase MCP (Model Context Protocol) tools.

## 🚀 Overview

This application serves as a Proof of Concept (PoC) to demonstrate how to build an AI Agent using LangGraph. It showcases the integration of a Supabase MCP server as a data source and leverages OpenAI's LLM for the agent's reasoning capabilities. The primary goal is to illustrate a simple, yet powerful, implementation of a prompt chain that can interact with a database and perform tasks based on the retrieved data.

## ⚙️ Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd langi
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
SUPABASE_PROJECT_ID=your_supabase_project_id
SUPABASE_TOKEN=your_supabase_access_token

# Optional: Tavily Search API (for web search functionality)
TAVILY_API_KEY=your_tavily_api_key_here
```

### 3. Database Setup

Ensure your Supabase project has a `profiles` table in the `public` schema. Example structure:

```sql
CREATE TABLE public.profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert some sample data
INSERT INTO public.profiles (name, email, country) VALUES
('John Doe', 'john@example.com', 'Ireland'),
('Jane Smith', 'jane@example.com', 'USA'),
('Bob Johnson', 'bob@example.com', 'Canada');
```

### 4. Quick Start - Run All Examples

```bash
npm run dev
```

This runs the main `index.mts` file which demonstrates a basic three-step prompt chain.

## 🛠️ Features

- **LangGraph Integration**: Uses LangGraph's `createReactAgent` for agent orchestration
- **OpenAI GPT-3.5-turbo**: Language model for agent reasoning
- **Supabase MCP Tools**: Database interaction through Model Context Protocol
- **Memory Management**: Persistent conversation state with `MemorySaver`
- **TypeScript Support**: Full TypeScript implementation with proper types

## 📋 Prerequisites

Before running this application, ensure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- OpenAI API key
- Supabase project with:
  - Project ID
  - Access token
  - A `profiles` table in the `public` schema

## 🧪 Testing the Application

The application provides a way to test the simple prompt chain pattern:

### Simple Prompt Chain
```bash
npm run simple
```
Tests a basic two-state prompt chain with context preservation.

## 📊 Understanding the Examples

### 1. Simple Prompt Chain (`simple-prompt-chain.mts`)

```typescript
// State 1: Data Retrieval
const firstState = await agent.invoke(
  { messages: [new HumanMessage("select * from public.profiles limit 3")] },
  { configurable: { thread_id: threadId } }
);

// State 2: Data Analysis (using context from State 1)
const secondState = await agent.invoke(
  { messages: [new HumanMessage(analysisPrompt)] },
  { configurable: { thread_id: threadId } }
);
```

**Key Features:**
- Uses same thread ID for both states
- Maintains conversation context
- Passes data between states

## 🔍 Expected Output

When running the application, you should see output similar to:

```
🚀 Simple Prompt Chain with 2 Agent States

📊 AGENT STATE 1: Getting data from database
==================================================
First State Result: [Database query results showing profiles]

🔍 AGENT STATE 2: Analyzing the data
==================================================
Second State Result: [AI analysis of the data with insights]

✅ Prompt Chain Completed Successfully!
```

## 🛠️ Available Scripts

- `npm run dev` - Run the main application (index.mts)
- `npm run simple` - Run simple prompt chain example
- `npm test` - Currently shows placeholder message

## 🏗️ Project Structure

```
langi/
├── index.mts                 # Main application entry point
├── simple-prompt-chain.mts   # Simple two-state chain example
├── lib/
│   └── mcp-client.mts       # MCP client configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🔧 Troubleshooting

### Common Issues

1. **Environment Variables Not Found**
   ```
   Error: SUPABASE_PROJECT_ID is required
   ```
   **Solution**: Ensure your `.env` file is in the root directory and contains all required variables.

2. **MCP Tools Not Loading**
   ```
   Error: mcpTools failed to load
   ```
   **Solution**: Verify your Supabase credentials and ensure the MCP server can connect.

3. **Database Connection Issues**
   ```
   Error: select * from public.profiles
   ```
   **Solution**: Ensure your Supabase project has the `profiles` table and proper permissions.

### Debug Mode

Add console logging to see detailed execution flow:

```typescript
console.log("Available MCP Tools:", mcpTools?.map((tool: any) => tool.name) || []);
```

## 📚 Additional Resources

- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [MCP (Model Context Protocol)](https://modelcontextprotocol.io/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Happy Prompt Chaining! 🎉**