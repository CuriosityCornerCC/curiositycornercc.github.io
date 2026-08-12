import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    type: z.enum(['article', 'recipe']).default('article'),
    title: z.string().max(70, "Keep titles under 70 characters for best SEO display"),
    description: z.string().max(160, "Keep descriptions under 160 characters for search results").optional().nullable(),
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

    // Recipe-specific fields (supports nulls from CMS)
    servings: z.number().or(z.string()).optional().nullable(),
    totalCalories: z.number().or(z.string()).optional().nullable(),
    prepTime: z.string().optional().nullable(),
    cookTime: z.string().optional().nullable(),
    ingredients: z.array(z.string()).optional().default([]),
    instructions: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { blog };