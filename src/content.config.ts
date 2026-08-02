import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { authors, categories, status } from './config/content';

const contentPattern = '**/[^_]*.md';
const common = {
	title: z.string(),
	pubDate: z.coerce.date(),
	description: z.string(),
	author: z.enum(authors),
	category: z.enum(categories),
	tags: z.array(z.string()).default([]),
	updatedDate: z.coerce.date().optional(),
};

const blog = defineCollection({
	loader: glob({
		pattern: contentPattern,
		base: 'src/content/blogs',
	}),
	schema: z.object({
		...common,
		draft: z.boolean().default(false),
	}),
});

const lab = defineCollection({
	loader: glob({
		pattern: contentPattern,
		base: 'src/content/labs',
	}),
	schema: z.object({
		...common,
		status: z.enum(status),
	}),
});

// To-do add project collection

export const collections = { blog, lab };
