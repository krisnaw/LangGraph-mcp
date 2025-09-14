# Langi - LangGraph Prompt Chain Examples

A demonstration application showcasing different prompt chain patterns using LangGraph, OpenAI, and Supabase MCP (Model Context Protocol) tools.

## 🚀 Overview

This application demonstrates how to create sophisticated prompt chains with multiple agent states using LangGraph. It includes several examples showing different patterns for chaining AI agent interactions:

- **Simple Prompt Chains**: Basic two-state chains with context preservation
- **Sequential Chains**: Independent agent states with different threads
- **Conditional Chains**: Dynamic branching based on previous results
- **Advanced State Management**: Sophisticated state tracking and organization

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
- **Multiple Chain Patterns**: Four different implementation approaches
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

The application provides multiple ways to test different prompt chain patterns:

### Individual Component Testing

#### 1. Simple Prompt Chain
```bash
npm run simple
```
Tests a basic two-state prompt chain with context preservation.

#### 2. Advanced Prompt Chains
```bash
npm run chains
```
Runs all four advanced prompt chain examples:
- Simple Chain
- Sequential Chain
- Conditional Chain
- Advanced Chain with State Management

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

### 2. Advanced Prompt Chains (`prompt-chains.mts`)

#### Pattern 1: Simple Chain
- Two states with context preservation
- Data retrieval followed by analysis

#### Pattern 2: Sequential Chain
- Independent threads for each state
- No context sharing between states
- Good for parallel processing

#### Pattern 3: Conditional Chain
- Dynamic branching based on results
- Data validation before processing
- Implements business logic

#### Pattern 4: Advanced State Management
- Custom state management class
- Tracks all states and results
- Better organization and debugging

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
- `npm run chains` - Run all advanced prompt chain examples
- `npm test` - Currently shows placeholder message

## 🏗️ Project Structure

```
langi/
├── index.mts                 # Main application entry point
├── simple-prompt-chain.mts   # Simple two-state chain example
├── prompt-chains.mts         # Advanced chain patterns
├── lib/
│   └── mcp-client.mts       # MCP client configuration
├── prompt-chain-examples.md  # Implementation guide
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

## 🚀 Advanced Usage

### Custom Chain Implementation

Create your own prompt chain by following the patterns in `prompt-chains.mts`:

```typescript
async function myCustomChain() {
  const threadId = "custom-" + Date.now();
  
  // Your custom logic here
  const state1 = await agent.invoke(
    { messages: [new HumanMessage("your prompt")] },
    { configurable: { thread_id: threadId } }
  );
  
  // Continue with additional states...
}
```

### Adding New MCP Tools

Extend the MCP client in `lib/mcp-client.mts` to include additional tools:

```typescript
mcpServers: {
  supabase: { /* existing config */ },
  yourTool: {
    command: "your-command",
    args: ["your-args"],
    env: { YOUR_ENV_VAR: "value" }
  }
}
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
