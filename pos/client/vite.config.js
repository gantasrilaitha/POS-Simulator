import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['chart.js', 'react-chartjs-2'], // Pre-bundle these dependencies during dev
  },
  build: {
    rollupOptions: {
      // Ensure this external option is correctly defined or remove it if not needed
      external: [['react', 'react-dom','chart','react-chartjs-2']], // Specify external dependencies here or remove this line if you want everything bundled
    },
  },
});
