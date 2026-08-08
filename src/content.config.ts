import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.string().or(z.date()),
    description: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
    category: z.string().default('General'), // Added category with fallback
  }),
});

export const collections = { blog };