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

  return content;
}

export async function getAllLabContent() {
  const labs = await getCollection('lab');

  return [
    ...labs.map((lab) => ({
      ...lab,
      path: `/lab/${lab.id}`,
    })),
  ];
}

export function getAllContentTags(allContent: any) {
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

  return [
    ...contentTags,
    ...traversalNodeTags,
    ...milestoneTags,
    ...projectTags,
    ...skillTags,
  ].filter((tag, index, tags) => tags.findIndex((t) => t.slug === tag.slug) === index);
}

export async function getBlogPosts() {
  const blogs = await getCollection('blog', ({ data }) => !data.draft);

  return blogs.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
