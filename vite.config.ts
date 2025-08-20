import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // For Electron file:// support
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
    strictPort: false,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-tiptap': ['@tiptap/core', '@tiptap/react', '@tiptap/starter-kit'],
          'vendor-tiptap-extensions': [
            '@tiptap/extension-highlight',
            '@tiptap/extension-link', 
            '@tiptap/extension-table',
            '@tiptap/extension-table-row',
            '@tiptap/extension-table-cell',
            '@tiptap/extension-table-header',
            '@tiptap/extension-color',
            '@tiptap/extension-text-style',
            '@tiptap/extension-underline',
            '@tiptap/extension-font-family',
            '@tiptap/extension-image',
            '@tiptap/extension-youtube'
          ],
          'vendor-ui': ['lucide-react'],
          'vendor-store': ['zustand']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
})
