import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { authors, categories, labType, status } from './config/content';

const contentPattern = '**/[^_]*.@(md|mdx)';
const common = {
  title: z.string(),
  description: z.string().optional(),
  author: z.enum(authors),
  pubDate: z.coerce.date(),
  category: z.enum(categories),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

const blog = defineCollection({
  loader: glob({
    pattern: contentPattern,
    base: 'src/content/blogs',
  }),
  schema: z.object({
    ...common,
    updatedDate: z.coerce.date().optional(),
  }),
});

const lab = defineCollection({
  loader: glob({
    pattern: contentPattern,
    base: 'src/content/labs',
  }),
  schema: z.object({
    ...common,
    type: z.enum(labType),
    updatedDate: z.coerce.date().optional(),
    status: z.enum(status).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: contentPattern,
    base: 'src/content/projects',
  }),
  schema: z.object({
    ...common,
    links: z
      .object({
        site: z.url().optional(),
        repository: z.url().optional(),
      })
      .optional(),
  }),
});

export const collections = { blog, lab, projects };
