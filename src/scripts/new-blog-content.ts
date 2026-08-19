import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { input, select } from '@inquirer/prompts';
import { categories } from '../config/content';
import { slugify } from '../utils/strings';

const [, , type] = process.argv;

const blogContentDir = './src/content/blogs';
const blogTemplateDir = './templates/blog.mdx';

if (!type || !(type === 'blog')) {
  console.error('Usage: make blog | lab | project');
  process.exit(1);
}

async function main() {
  const title = await input({
    message: 'Title:',
    validate: (value) => value.trim().length > 0 || 'Title is required',
  });

  const description = await input({
    message: 'Description:',
  });

  const author = await input({
    message: 'Author:',
    default: 'Axel Ignacio',
  });

  const category = await select({
    message: 'Category:',
    choices: [...categories],
  });

  const tagsInput = await input({
    message: 'Tags (comma separated):',
  });

  const tags = tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const tagsYaml = tags.map((tag) => `  - ${tag}`).join('\n');

  const slug = slugify(title);

  const template = await readFile(blogTemplateDir, 'utf8');

  const content = template
    .replaceAll('{{title}}', title)
    .replaceAll('{{description}}', description)
    .replaceAll('{{category}}', category)
    .replaceAll('{{author}}', author)
    .replaceAll('{{pubDate}}', new Date().toISOString())
    .replaceAll('{{tags}}', tagsYaml);

  const contentPath = path.join(blogContentDir, `${slug}.mdx`);

  await mkdir(blogContentDir, {
    recursive: true,
  });

  await writeFile(contentPath, content, 'utf8');

  console.log();
  console.log(`✓ Created ${contentPath}`);
}

main().catch((error) => {
  if (error?.name === 'ExitPromptError') {
    console.log('\nCancelled.');
    process.exit(0);
  }

  console.error('\nFailed to create content:');
  console.error(error);

  process.exit(1);
});
