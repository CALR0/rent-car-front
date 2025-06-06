import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    modules: true,
    preprocessorOptions: {
    },
    postcss: {
    },
  },
  resolve: {
    alias: {
      '@designs-css': '/src/designs-css',
    },
  },
})
