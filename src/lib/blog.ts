import { getCollection } from "astro:content";

export async function getBlogPosts() {
  const blogs = await getCollection('blog', ({ data }) => !data.draft);

  return blogs.sort((a, b) => b.data.pubDate.valueOf() - a .data.pubDate.valueOf());
}