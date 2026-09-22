import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Replaces __SITE_URL__ in index.html with VITE_SITE_URL. If it is not set, canonical/og:url/og:image tags are dropped
// instead of shipping a wrong URL.
const siteUrl = (mode) => {
  const url = (loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL || '').replace(/\/+$/, '');
  return {
    name: 'site-url',
    transformIndexHtml: (html) =>
      url ? html.replaceAll('__SITE_URL__', url) : html.split('\n').filter((l) => !l.includes('__SITE_URL__')).join('\n'),
  };
};
export default defineConfig(({ mode }) => ({ plugins: [react(), siteUrl(mode)], build: { target: 'es2020', sourcemap: false } }));
