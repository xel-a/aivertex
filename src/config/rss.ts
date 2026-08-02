import { getCollection } from 'astro:content';
import { getAllPosts } from '../lib/post';

export async function getRSSItems() {
	const posts = await getAllPosts();

	return posts.map((post) => ({
		title: post.data.title,
		pubDate: post.data.pubDate,
		description: post.data.description,
		link: `${post.collection}s/${post.id}/`,
	}));
}
