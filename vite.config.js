import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      three: 'three'
    }
  },
  optimizeDeps: {
    include: ['three', 'three/examples/jsm/loaders/GLTFLoader', 'three/examples/jsm/loaders/DRACOLoader', 'three/examples/jsm/loaders/RGBELoader']
  },
  server: {
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // Inline small assets < 4kb
    // Optimise chunks for performance
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@splinetool/react-spline'],
          'framer-motion': ['framer-motion']
        }
      }
    }
  }
})
