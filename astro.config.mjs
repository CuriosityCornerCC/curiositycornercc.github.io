import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// import keystatic from '@keystatic/astro'; // <-- Comment out or remove

export default defineConfig({
  site: 'https://curiositycornercc.github.io',
  output: 'static', // Explicitly enforce static output
  integrations: [
      react(),
      sitemap(),
    ],
    redirects: {
      // We will add your 4 Blogger redirects here (see Part 2)
    },
});