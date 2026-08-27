import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { input, select } from '@inquirer/prompts';
import { categories } from '../config/content';
import { slugify } from '../utils/strings';

const blogContentDir = './src/content/blogs';
const blogTemplateDir = './templates/blog.mdx';

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

  const pubDate = await input({
    message: 'Date published:',
    validate: (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) || 'Date format should be yyyy-mm-dd',
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
    .replaceAll('{{pubDate}}', pubDate || new Date().toISOString().slice(0, 10))
    .replaceAll('{{tags}}', tagsYaml);

  const contentPath = path.join(blogContentDir, `${slug}.mdx`);

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
