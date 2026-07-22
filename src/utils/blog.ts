import { getCollection } from "astro:content";

export async function getBlogPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return posts.sort((a, b) => b.data.pubDate.valueOf() - a .data.pubDate.valueOf());
}