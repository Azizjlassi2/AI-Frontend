// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/AIplus/',  // <-- Add this line
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [react()],
})
