import { Agent } from "@mastra/core/agent";

export const copywriterAgent = new Agent({
    name: "copywriter-agent",
    instructions: "You are a copywriter agent. Write VERY brief 1-2 line responses only. Please only call the Editor agent once, I just want to test the Editor agent, There should be multuple call to the Editor Agent.",
    model: "groq/llama-3.3-70b-versatile",
});