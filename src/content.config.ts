import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    type: z.enum(['article', 'recipe']).default('article'),
    title: z.string().max(70, "Keep titles under 70 characters for best SEO display"),
    description: z
      .string()
      .max(160, "Keep descriptions under 160 characters for search results")
      .optional()
      .nullable()
      .transform((val) => val ?? ''),
    pubDate: z.string().or(z.date()).or(z.coerce.date()),
    updatedDate: z.string().or(z.date()).or(z.coerce.date()).optional().nullable(),

    // Robust Image Handler: Accepts string, null, or undefined, and falls back to default if empty
    image: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (val && val.trim() !== '' ? val : '/images/pic01.jpg')),

    author: z.string().default('Curiosity Corner'),
    category: z.string().default('General'),
    featured: z.boolean().optional().nullable().default(false),

    // Recipe-specific fields (tolerates numbers, strings, nulls, or empty CMS objects)
    servings: z.union([z.number(), z.string(), z.record(z.unknown())]).optional().nullable(),
    totalCalories: z.union([z.number(), z.string(), z.record(z.unknown())]).optional().nullable(),
    prepTime: z.string().optional().nullable().default(''),
    cookTime: z.string().optional().nullable().default(''),
    ingredients: z.array(z.string()).optional().nullable().default([]),
    instructions: z.array(z.string()).optional().nullable().default([]),
  }),
});

export const collections = { blog };