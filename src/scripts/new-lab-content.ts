import { readFile, writeFile } from 'node:fs/promises';
import { input, select } from '@inquirer/prompts';
import { categories, labType, labStatus } from '../config/content';
import { slugify } from '../utils/strings';
import path from 'node:path';

const labContentDir = './src/content/labs';
const labTemplateDir = './templates/lab.mdx';

async function main() {
  const type = await select({
    message: 'Lab Type:',
    choices: labType,
  });

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

  const contentStatus = await select({
    message: 'Status:',
    choices: labStatus,
  });

  const tags = tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const tagsYaml = tags.map((tag) => `  - ${tag}`).join('\n');

  const slug = slugify(title);

  const template = await readFile(labTemplateDir, 'utf8');

  const content = template
    .replaceAll('{{title}}', title)
    .replaceAll('{{description}}', description)
    .replaceAll('{{type}}', type)
    .replaceAll('{{category}}', category)
    .replaceAll('{{author}}', author)
    .replaceAll('{{pubDate}}', pubDate || new Date().toISOString().slice(0, 10))
    .replaceAll('{{tags}}', tagsYaml)
    .replaceAll('{{status}}', contentStatus);

  const contentPath = path.join(labContentDir, `${type}s`, `${slug}.mdx`);

  await writeFile(contentPath, content, 'utf-8');

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
