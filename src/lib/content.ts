import { getCollection } from 'astro:content';
import { traversalNodes } from '../data/current-traversal';
import { milestones } from '../data/milestones';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { slugify } from '../utils/strings';

export async function getAllContent() {
  const blogs = await getCollection('blog');
  const labs = await getCollection('lab');
  const projects = await getCollection('projects');

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

  return content.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getAllContentTags(contents: any) {
  const allContent = contents;

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

  const projectTags = projects.flatMap((project) =>
    project.tags.map((tag) => ({
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

  const tags = [
    ...contentTags,
    ...traversalNodeTags,
    ...milestoneTags,
    ...projectTags,
    ...skillTags,
  ];

  return [...new Map(tags.map((tag) => [tag.slug, tag])).values()];
}

export async function getAllContentTagsWithPosts() {
  const allContent = await getAllContent();

  const tags = allContent
    .flatMap((post: any) => post.data.tags)
    .map((tag: any) => ({
      name: tag,
      slug: slugify(tag),
    }));

  return [...new Map(tags.map((tag) => [tag.slug, tag])).values()];
}

export async function getTagIndexLength(tagName: string) {
  const allContent = await getAllContent();

  return allContent.filter((content) =>
    content.data.tags.some((tag) => tag.toLowerCase() === tagName.toLowerCase())
  ).length;
}

export async function getBlogPosts() {
  const blogs = await getCollection('blog', ({ data }) => !data.draft);

  return blogs
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((blog) => ({
      ...blog,
      type: 'blog',
      path: `/blogs/${blog.id}`,
    }));
}

export async function getLabPosts() {
  const labs = await getCollection('lab');

  return [
    ...labs.map((lab) => ({
      ...lab,
      type: 'lab',
      path: `/lab/${lab.id}`,
    })),
  ];
}
