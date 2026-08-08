import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
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