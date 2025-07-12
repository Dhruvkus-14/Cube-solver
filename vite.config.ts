import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['rubiks-cube-solver'],
  },
  define: {
    global: 'globalThis',
  },
  build: {
    commonjsOptions: {
      include: [/rubiks-cube-solver/, /node_modules/],
    },
  },
});