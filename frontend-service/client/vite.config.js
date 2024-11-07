/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Importa dotenv para cargar las variables de entorno
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/apiGestion': {
        target: process.env.VITE_API_URL_3000, // Ahora usa process.env
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiGestion/, ''),
      },
      '/apiModelos': {
        target: process.env.VITE_API_URL_8000, // Ahora usa process.env
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiModelos/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@adapters': path.resolve(__dirname, 'src/adapters'),
      '@utils': path.resolve(__dirname, 'src/utilities'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@interceptors': path.resolve(__dirname, 'src/interceptors'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@redux': path.resolve(__dirname, 'src/redux'),
    },
  },
});
