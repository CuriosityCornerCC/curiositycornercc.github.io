import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    type: z.enum(['article', 'recipe']).default('article'),
    title: z.string(),
    description: z.string().optional().nullable(),
    pubDate: z.string().or(z.date()),
    updatedDate: z.string().or(z.date()).optional().nullable(),
    image: z.string().default('/images/pic01.jpg'),
    author: z.string().default('Curiosity Corner'),
    category: z.string().default('General'),
    featured: z.boolean().optional().nullable(),

    // Google Business Card Schema
    location: z.object({
      name: z.string(),
      category: z.string().optional().nullable(),
      rating: z.number().optional().nullable(),
      reviewsCount: z.number().optional().nullable(),
      address: z.string().optional().nullable(),
      locatedIn: z.string().optional().nullable(),
      phone: z.string().optional().nullable(),
      website: z.string().optional().nullable(),
      menu: z.string().optional().nullable(),
      hours: z.string().optional().nullable(),
      serviceOptions: z.array(z.string()).optional().nullable(),
      googleMapsUrl: z.string().optional().nullable(),
      mapEmbedUrl: z.string().optional().nullable(),
    }).optional().nullable(),

    // Top-level Recipe fields
    servings: z.number().or(z.string()).optional().nullable(),
    totalCalories: z.number().or(z.string()).optional().nullable(),
    prepTime: z.string().optional().nullable(),
    cookTime: z.string().optional().nullable(),
    ingredients: z.array(z.string()).optional().default([]),
    instructions: z.array(z.string()).optional().default([]),

    // Nested Recipe object schema for CMS compatibility
    recipeInfo: z.object({
      servings: z.number().or(z.string()).optional().nullable(),
      totalCalories: z.number().or(z.string()).optional().nullable(),
      prepTime: z.string().optional().nullable(),
      cookTime: z.string().optional().nullable(),
      ingredients: z.array(z.string()).optional().default([]),
      instructions: z.array(z.string()).optional().default([]),
    }).optional().nullable(),
  }),
});

export const collections = { blog };