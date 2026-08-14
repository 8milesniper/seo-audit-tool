import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Real SEO audit backend (server/) - see server/.env.example.
      "/api": {
        target: process.env.AUDIT_API_URL || "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
})

