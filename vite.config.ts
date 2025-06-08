// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/AI-Frontend/',  // <-- Add this line
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [react()],
})
