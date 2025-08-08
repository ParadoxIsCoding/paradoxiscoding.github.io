import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  base: "/", // For user/org GitHub Pages (paradoxiscoding.github.io)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "docs", // Output build files to /docs for GitHub Pages
    emptyOutDir: true, // Clears old build files before building
  },
});
