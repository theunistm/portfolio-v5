import { z, defineCollection } from 'astro:content';

// Define schema for project entries based on screenshot design
const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    icon: z.string(), // SVG content or path
    categories: z.array(z.string()),
    year: z.number(), // Or use duration if you want to keep start/end support
    ongoing: z.boolean().optional(),
    summary: z.string(),
    caseStudy: z.string(), // HTML content for modal
    theme: z.object({
      color: z.string(), // Hex color code, e.g. "#4D8B31" for the green in the screenshot
    }),
    flows: z.array(
      z.object({
        page: z.string(),
        interactions: z.string(), // e.g. "23 interaction points"
        challenge: z.string(), // Short text for the tooltip
        solution: z.string(), // Short text for the tooltip
        media: z.object({
          type: z.enum(['video', 'image']),
          src: z.string(),
          poster: z.string().optional(),
        }),
      })
    ),
    // Optional metadata fields
    featured: z.boolean().optional().default(false),
    sortOrder: z.number().optional().default(999),
  }),
});

// Export collections
export const collections = {
  'projects': projectCollection,
};
