// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { site } from './src/config/site';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: site.url,
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [sitemap(), mdx()],
  server: {
    host: true,
  },
});
