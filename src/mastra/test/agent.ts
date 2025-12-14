import { Mastra } from "@mastra/core/mastra";

import { publisherAgent } from "../agents/publisher-agent";
import { copywriterAgent } from "../agents/copywriter-agent";
import { editorAgent } from "../agents/editor-agent";

export const mastra = new Mastra({
  agents: { copywriterAgent, editorAgent, publisherAgent },
});