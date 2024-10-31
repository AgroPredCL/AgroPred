/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Esto permite que Vite escuche en todas las interfaces
    proxy: {
      // Esto redirige las solicitudes de /api a tu servidor backend
      '/apiGestion': {
        target: 'http://localhost:3000', // Cambia esto a la URL de tu servidor backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiGestion/, ''), // Opcional: reescribe el path
      },
      '/apiModelos': {
        target: 'http://localhost:8000', // Cambia esto a la URL de tu servidor backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiModelos/, ''), // Opcional: reescribe el path
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
