import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    canonicalURL: z.string().url().optional(),
  }),
});

export const collections = { blog };
