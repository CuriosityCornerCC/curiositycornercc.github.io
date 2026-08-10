import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    type: z.enum(['article', 'recipe']).default('article'),
    title: z.string().max(70, "Keep titles under 70 characters for best SEO display"),
    description: z.string().max(160, "Keep descriptions under 160 characters for search results").optional(),
    pubDate: z.string().or(z.date()),
    updatedDate: z.string().or(z.date()).optional(),
    image: z.string().default('/images/pic01.jpg'),
    author: z.string().default('Curiosity Corner'),
    category: z.string().default('General'),
    featured: z.boolean().optional(),

    // Recipe-specific fields
    servings: z.number().or(z.string()).optional(),
    totalCalories: z.number().or(z.string()).optional(),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    ingredients: z.array(z.string()).optional().default([]),
    instructions: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { blog };