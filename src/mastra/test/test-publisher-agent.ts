import "dotenv/config";

import { mastra } from "./agent";

const agent = mastra.getAgent("publisherAgent");

const response = await agent.generate(
  "Write a blog post about React JavaScript frameworks. Only return the final edited copy.",
);

console.log(response.text);