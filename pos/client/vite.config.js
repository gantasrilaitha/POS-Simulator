import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ensure this external option is correctly defined or remove it if not needed
      external: [['react', 'react-dom']], // Specify external dependencies here or remove this line if you want everything bundled
    },
  },
});
