import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert"; // Import the plugin

export default defineConfig({
  plugins: [react(), mkcert()],
  build: {
    chunkSizeWarningLimit: 1500,
  },
});
