import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(70, "Keep titles under 70 characters for best SEO display"),
    description: z.string().max(160, "Keep descriptions under 160 characters for search results"),
    pubDate: z.date().or(z.string().transform((str) => new Date(str))),
    updatedDate: z.date().or(z.string().transform((str) => new Date(str))).optional(),
    image: z.string().default('/images/pic01.jpg'),
    author: z.string().default('Curiosity Corner'),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };