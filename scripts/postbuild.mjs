/**
 * Static hosts (Vercel, `serve`) answer unknown paths with /404.html. The SPA
 * fallback shell hydrates into the router's catch-all route, which renders
 * the not-invited page, so it doubles as the 404.
 */
import { copyFile } from 'node:fs/promises';

const dir = new URL('../build/client/', import.meta.url);
await copyFile(new URL('__spa-fallback.html', dir), new URL('404.html', dir));
console.log('postbuild: wrote 404.html');
