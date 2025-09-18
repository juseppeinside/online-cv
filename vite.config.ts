import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const IMAGE_REGEX = /png|jpe?g|svg|gif|tiff|bmp|ico/i;
const FONT_REGEX = /woff2?|eot|ttf|otf/i;
const SVG_REGEX = /\.svg$/i;

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap', '@gsap/react'],
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
          ],
        },
        assetFileNames: (assetInfo) => {
          const originalName = assetInfo.originalFileNames?.[0] ?? '';
          const ext = path.extname(originalName).slice(1).toLowerCase();

          if (SVG_REGEX.test(originalName)) {
            return 'icons/[name][extname]';
          }

          if (IMAGE_REGEX.test(ext)) {
            return 'images/[name]-[hash][extname]';
          }

          if (FONT_REGEX.test(ext)) {
            return 'fonts/[name]-[hash][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
