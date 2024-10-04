import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src/client/presentation',
  build: {
    outDir: '../dist/client',
  },
  resolve: {
    alias: {
      '@': 'src',
    },
  },
});
