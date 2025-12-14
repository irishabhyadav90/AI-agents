import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const editorTool = createTool({
    id: "editor-tool",
    description: "Calls the editor agent to edit blog post copy.",
    inputSchema: z.object({
        copy: z.string(),
    }),
    outputSchema: z.object({
        copy: z.string(),
    }),
    execute: async ({ context, mastra }) => {
        const { copy } = context;

        const agent = mastra!.getAgent("editorAgent");
        const result = await agent.generate(
            `Make this clearer and more concise (1-2 lines max): ${copy}`,
        );

        return {
            copy: result.text,
        };
    },
});