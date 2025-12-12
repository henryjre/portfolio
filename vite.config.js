import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const repoName = 'portfolio';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: `/${repoName}/`,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
