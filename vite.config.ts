import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://app-server:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: true 
  }
});
