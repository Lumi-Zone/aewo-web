// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * GitHub Pages serves project sites from /repo/, but custom domains are served
 * from /. The deploy workflow sets CUSTOM_DOMAIN so Astro emits root-relative
 * asset URLs for aevo-ada-pruefung.de.
 */
function pagesConfig() {
  const customDomain = process.env.CUSTOM_DOMAIN;
  if (customDomain) {
    return { site: `https://${customDomain}`, base: '/' };
  }

  const full = process.env.GITHUB_REPOSITORY;
  if (!full?.includes('/')) {
    return { site: 'https://aevo-ada-pruefung.de', base: '/' };
  }

  const [owner, repo] = full.split('/');
  return {
    site: `https://${owner}.github.io`,
    // Trailing slash so import.meta.env.BASE_URL joins correctly (e.g. favicon path).
    base: `/${repo}/`,
  };
}

const { site, base } = pagesConfig();

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
