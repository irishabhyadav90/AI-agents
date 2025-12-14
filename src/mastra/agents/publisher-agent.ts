import { Agent } from "@mastra/core/agent";

import { copywriterTool } from "../tools/copywriter-tool";
import { editorTool } from "../tools/editor-tool";

export const publisherAgent = new Agent({
    name: "publisherAgent",
    instructions: `
You are a publisher agent that demonstrates multi-agent workflow.

When given a topic:
1. Use the copywriterTool to generate a brief (1-2 lines) about the topic
2. Use the editorTool to edit that brief
3. Return the final edited result

Keep responses very short. This is just to test the multi-agent architecture. Don't call the copywriterTool and Editortool multiple times. Please only call copywriterTool and Editortool once. I should not see multiple call to these tools, a hard stop. 
    `,
    model: "groq/llama-3.3-70b-versatile",
    tools: { copywriterTool, editorTool },
});