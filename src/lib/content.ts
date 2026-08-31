import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { traversalNodes } from '../data/current-traversal';
import { milestones } from '../data/milestones';
import { skills } from '../data/skills';
import { slugify } from '../utils/strings';

export async function getAllPosts() {
  const blogs = await getCollection('blog');
  const labs = await getCollection('lab');
  const projects = await getCollection('project');

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
    ...projects.map((project) => ({
      ...project,
      type: 'project',
      parent: 'projects',
      path: `/projects/${project.id}`,
    })),
  ];

  return content
    .filter((post) => !post.data.draft && post.body)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPostsByType<T extends CollectionKey>(
  type: T
): Promise<(CollectionEntry<T> & { path: string })[]> {
  const posts = await getCollection(type, ({ data }) => !data.draft);

  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({
      ...post,
      path: `/${post.collection}${post.collection === 'lab' ? '' : 's'}/${post.id}`,
    }));
}

export async function getAllTags({
  excludeTagsWithoutPosts = false,
}: {
  excludeTagsWithoutPosts?: boolean;
} = {}) {
  const allContent = await getAllPosts();

  const contentTags = allContent
    .flatMap((post: any) => post.data.tags)
    .map((tag: any) => ({ name: tag, slug: slugify(tag) }));

  const traversalNodeTags = traversalNodes.flatMap((node) =>
    node.topics.map((topic) => ({
      name: topic.name,
      slug: slugify(topic.name),
    }))
  );

  const milestoneTags = milestones.flatMap((milestone) =>
    milestone.tags.map((tag) => ({
      name: tag,
      slug: slugify(tag),
    }))
  );

  const skillTags = skills.flatMap((skill) =>
    skill.tags.map((tag) => ({
      name: tag,
      slug: slugify(tag),
    }))
  );

  const tags = [...contentTags, ...traversalNodeTags, ...milestoneTags, ...skillTags];

  if (excludeTagsWithoutPosts) {
    return [...new Map(contentTags.map((tag) => [tag.slug, tag])).values()];
  }

  // you might be wondering what is this for. to avoid duplicate tags!
  return [...new Map(tags.map((tag) => [tag.slug, tag])).values()];
}

export async function getTagSizeByTagName(tagName: string) {
  const allContent = await getAllPosts();

  return allContent.filter((content) =>
    content.data.tags.some((tag: any) => tag.toLowerCase() === tagName.toLowerCase())
  ).length;
}
