import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
export default defineConfig({
   envPrefix: 'VITE_',
   server: { open: '/', port: 3000 },
   plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
   ],
   resolve: {
      alias: {
         '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
         '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
         '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      },
   },
   optimizeDeps: {
      include: [
         '@reduxjs/toolkit',
         'axios',
         'react',
         'react-dom',
         'react-redux',
         'react-router',
      ],
   },
   build: {
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      emptyOutDir: true,
      manifest: true,
      minify: 'oxc',
      outDir: 'dist',
      sourcemap: false,
      target: 'esnext',
      rolldownOptions: {
         output: {
            assetFileNames: 'assets/[name].[hash].[ext]',
            chunkFileNames: 'assets/[name].[hash].js',
            entryFileNames: 'assets/[name].[hash].js',
            minify: { compress: { dropConsole: true } },
            manualChunks(id: string) {
               if (!id.includes('node_modules')) {
                  return;
               }
               if (
                  id.includes('react') ||
                  id.includes('react-dom') ||
                  id.includes('jsx-runtime')
               ) {
                  return 'react-core';
               }
               if (id.includes('react-router')) {
                  return 'react-router';
               }
               // if (id.includes('recharts')) {
               //    return 'vendor-charts';
               // }
               // if (id.includes('@floating-ui')) {
               //    return 'vendor-ui';
               // }
               // if (id.includes('exceljs') || id.includes('@react-pdf')) {
               //    return 'vendor-heavy';
               // }
               if (
                  id.includes('axios') ||
                  id.includes('zod') ||
                  id.includes('i18next')
               ) {
                  return 'vendor-utils';
               }
               // if (id.includes('@tiptap')) {
               //    return 'vendor-editors';
               // }
            },
         },
      },
   },
});
