// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from "@astrojs/cloudflare";
import { site } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  site: site.url,
  adapter: cloudflare(),
  integrations: [
    sitemap()
  ],
  server: {
    host: true
  }
});