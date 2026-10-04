import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Rutas relativas: permite publicar el build dentro de GitHub Pages.
  base: './',
});
