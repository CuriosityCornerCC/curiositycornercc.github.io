import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.string().optional(),
    featured: z.boolean().optional(),
    // Allow numbers or fall back gracefully if an empty object/null is received
    servings: z.union([z.number(), z.record(z.unknown())]).optional().nullable(),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    totalCalories: z.union([z.number(), z.record(z.unknown())]).optional().nullable(),
    ingredients: z.array(z.string()).optional(),
    instructions: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };