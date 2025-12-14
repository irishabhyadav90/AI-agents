import { Agent } from "@mastra/core/agent";

export const editorAgent = new Agent({
    name: "Editor",
    instructions: "You are an editor agent. Edit text to be clearer and more concise. Keep responses very brief (1-2 lines).",
    model: "groq/llama-3.3-70b-versatile",
});