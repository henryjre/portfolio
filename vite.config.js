import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-progress', '@radix-ui/react-slot', 'vaul'],
          'carousel': ['embla-carousel-react', 'embla-carousel-autoplay'],
        },
      },
    },
  },
});
