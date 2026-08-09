import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import keystatic from '@keystatic/astro'; // <-- Comment out or remove

export default defineConfig({
  site: 'https://curiositycornercc.github.io',
  output: 'static', // Explicitly enforce static output
  integrations: [
    react(),
    // keystatic(), // <-- Comment out or remove
  ],
});