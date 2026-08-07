import { getCollection } from 'astro:content';

export async function getAllContent() {
  const blogs = await getCollection('blog');
  const labs = await getCollection('lab');
  const content = [
    ...blogs.map((blog) => ({
      ...blog,
      type: 'blog',
      parent: 'blogs',
      path: `/blogs/${blog.id}`,
    })),
    ...labs.map((lab) => ({
      ...lab,
      type: 'lab',
      parent: 'lab',
      path: `/lab/${lab.id}`,
    })),
  ];

  return content;
}

export async function getBlogPosts() {
  const blogs = await getCollection('blog', ({ data }) => !data.draft);

  return blogs.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
