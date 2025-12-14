import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const copywriterTool = createTool({
    id: "copywriter-tool",
    description: "Calls the copywriter agent to write blog post copy.",
    inputSchema: z.object({
        topic: z.string(),
    }),
    outputSchema: z.object({
        copy: z.string(),
    }),
    execute: async ({ context, mastra }) => {
        const { topic } = context;

        const agent = mastra!.getAgent("copywriterAgent");
        const result = await agent!.generate(`Write 1-2 brief lines about: ${topic}`);

        return {
            copy: result.text,
        };
    },
});