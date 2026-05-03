// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * GitHub Actions sets GITHUB_REPOSITORY=owner/repo. Project sites are served at
 * https://owner.github.io/repo/ — Astro needs matching `base` or assets and routes break.
 * Local dev: no env → base "/" and a stable public URL for SEO fallbacks.
 */
function pagesConfig() {
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
