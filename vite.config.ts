import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    viteCompression(),
    visualizer({ open: true })
  ],
  build: {
    target: 'esnext',
    minify: 'terser', // Use Terser instead of esbuild if you want more control
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
        drop_debugger: true, // Remove debugger statements
        passes: 5 // Number of optimization passes
      },
      format: {
        comments: false // Remove comments
      }
    },
    cssCodeSplit: true, // Split CSS into separate files for each chunk
    chunkSizeWarningLimit: 500, // Increase the chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Splits vendor libraries to reduce main bundle size
          'react-vendor': ['react', 'react-dom', 'react-select', 'react-apexcharts']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  server: {
    port: 5173
  },
})
