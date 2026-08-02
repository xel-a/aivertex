import { getCollection } from 'astro:content';

export async function getAllPosts() {
	const blogs = await getCollection('blog');
	const labs = await getCollection('lab');
	const posts = [
		...blogs.map((blog) => ({
			...blog,
			type: 'blog',
		})),
		...labs.map((lab) => ({
			...lab,
			type: 'lab',
		})),
	];

	return posts;
}
