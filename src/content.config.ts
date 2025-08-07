import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        readtime: z.string(),
        tags: z.object({
          language: z.array(z.string()),
          field: z.array(z.string()),
          type: z.array(z.string()),
        }),
        repo: z.string().url().optional(),
      }),
    }),
  },
});
