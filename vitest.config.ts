import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { canonOverrides } from './vite.canon-overrides.ts';

export default defineConfig({
  plugins: [canonOverrides()],
  resolve: {
    alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
