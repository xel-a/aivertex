import { getCollection } from 'astro:content';
import { getAllContent } from '../lib/content';

export async function getRSSItems() {
	const posts = await getAllContent();

	return posts.map((post) => ({
		title: post.data.title,
		pubDate: post.data.pubDate,
		description: post.data.description,
		link: `${post.collection}s/${post.id}/`,
	}));
}
